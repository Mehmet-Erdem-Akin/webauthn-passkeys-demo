import type { NextApiRequest, NextApiResponse } from 'next'
import {
    generateAuthenticationOptions
} from '@simplewebauthn/server'
import type {
    PublicKeyCredentialRequestOptionsJSON
} from '@simplewebauthn/typescript-types'
import { authChallenges, users } from '../../../../lib/webauthn-storage'

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PublicKeyCredentialRequestOptionsJSON | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { rpID } = getRpConfig(req)

        // Kayıtlı kullanıcıların credential'larını topla
        const allowCredentials: Array<{
            id: string
            type: 'public-key'
            transports?: AuthenticatorTransport[]
        }> = []

        // Tüm kayıtlı kullanıcıların credential'larını ekle
        users.forEach((user) => {
            user.credentials.forEach((cred) => {
                if (cred.credentialID) {
                    allowCredentials.push({
                        id: cred.credentialID,
                        type: 'public-key' as const,
                        transports: cred.transports as AuthenticatorTransport[],
                    })
                }
            })
        })

        const opts = {
            rpID,
            // Boş array = tüm credentials'a izin ver (passwordless)
            allowCredentials: [],
            userVerification: 'required' as const,
            timeout: 60000,
        }

        const options = await generateAuthenticationOptions(opts)

        // Challenge'ı sakla (genel challenge, kullanıcı-specific değil)
        authChallenges.set('current', options.challenge)

        return res.status(200).json(options)

    } catch (error: any) {
        console.error('Authentication options generation failed:', error)
        return res.status(500).json({
            error: 'Failed to generate authentication options'
        })
    }
} 