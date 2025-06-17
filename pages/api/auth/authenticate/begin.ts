import type { NextApiRequest, NextApiResponse } from 'next'
import {
    generateAuthenticationOptions
} from '@simplewebauthn/server'
import type {
    PublicKeyCredentialRequestOptionsJSON
} from '@simplewebauthn/typescript-types'
import { authChallenges, users } from '../../../../lib/webauthn-storage'

// RP (Relying Party) yapılandırması
const rpID = 'localhost' // Production'da gerçek domain

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PublicKeyCredentialRequestOptionsJSON | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
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