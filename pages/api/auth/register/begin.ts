import type { NextApiRequest, NextApiResponse } from 'next'
import {
    generateRegistrationOptions
} from '@simplewebauthn/server'
import type {
    PublicKeyCredentialCreationOptionsJSON
} from '@simplewebauthn/typescript-types'
import { userChallenges } from '../../../../lib/webauthn-storage'

// RP (Relying Party) yapılandırması helper function
const getRpConfig = (req: NextApiRequest) => {
    const host = req.headers.host || 'localhost:3000'

    // Netlify ve diğer production environment'lar için
    if (host.includes('netlify.app') || host.includes('vercel.app') || (!host.includes('localhost') && !host.includes('127.0.0.1'))) {
        return {
            rpID: host.split(':')[0], // Port'u kaldır
            origin: `https://${host}`
        }
    }

    // Development environment için
    return {
        rpID: 'localhost',
        origin: `http://${host}`
    }
}

const rpName = 'WebAuthn Demo'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PublicKeyCredentialCreationOptionsJSON | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ error: 'Username is required' })
        }

        const { rpID } = getRpConfig(req)

        // Kullanıcı için benzersiz ID oluştur
        const userID = username

        const opts = {
            rpName,
            rpID,
            userID,
            userName: username,
            userDisplayName: username,
            // Attestation type (production'da 'direct' veya 'indirect' kullanabilirsiniz)
            attestationType: 'none' as const,
            // Platform authenticator'ları tercih et (TouchID, FaceID, Windows Hello)
            authenticatorSelection: {
                authenticatorAttachment: 'platform' as const,
                userVerification: 'required' as const,
                residentKey: 'required' as const, // Passkeys için gerekli
            },
            // Desteklenen algoritma türleri
            supportedAlgorithmIDs: [-7, -257], // ES256, RS256
            // Zaman aşımı
            timeout: 60000,
            // Mevcut credential'ları hariç tut (eğer varsa)
            excludeCredentials: [],
        }

        const options = await generateRegistrationOptions(opts)

        // Challenge'ı sakla
        userChallenges.set(username, options.challenge)
        console.log(`[DEBUG] Challenge saved for user: ${username}, challenge: ${options.challenge.substring(0, 20)}...`)
        console.log(`[DEBUG] Current challenges map size: ${userChallenges.size}`)

        return res.status(200).json(options)

    } catch (error: any) {
        console.error('Registration options generation failed:', error)
        return res.status(500).json({
            error: 'Failed to generate registration options'
        })
    }
} 