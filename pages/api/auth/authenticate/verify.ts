import type { NextApiRequest, NextApiResponse } from 'next'
import {
    verifyAuthenticationResponse
} from '@simplewebauthn/server'
import type {
    AuthenticationResponseJSON
} from '@simplewebauthn/typescript-types'
import { authChallenges, getUserByCredentialID, updateCredentialCounter } from '../../../../lib/webauthn-storage'

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
    res: NextApiResponse<{ verified: boolean; user?: string; message?: string; error?: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ verified: false, error: 'Method not allowed' })
    }

    try {
        const { rpID, origin } = getRpConfig(req)

        const { credential, challenge }: {
            credential: AuthenticationResponseJSON;
            challenge?: string;
        } = req.body

        if (!credential) {
            return res.status(400).json({
                verified: false,
                error: 'Credential is required'
            })
        }

        // Challenge'ı önce request body'den al, yoksa stored'dan al
        let expectedChallenge = challenge

        if (!expectedChallenge) {
            console.log(`[DEBUG] No challenge in request, looking for stored challenge`)
            expectedChallenge = authChallenges.get('current')
            if (!expectedChallenge) {
                console.log(`[DEBUG] No stored challenge found`)
                return res.status(400).json({
                    verified: false,
                    error: 'No challenge found'
                })
            }
            console.log(`[DEBUG] Found stored challenge`)
        } else {
            console.log(`[DEBUG] Using challenge from request body`)
        }

        // Credential'a sahip kullanıcıyı bul
        // Normalize credential ID to base64url format (consistent with storage)
        const normalizedCredentialId = credential.id
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
        console.log(`[DEBUG] Original credential ID: ${credential.id} (length: ${credential.id.length})`)
        console.log(`[DEBUG] Normalized to base64url: ${normalizedCredentialId} (length: ${normalizedCredentialId.length})`)

        const userResult = getUserByCredentialID(normalizedCredentialId)

        if (!userResult) {
            // Debug: Tüm kayıtlı credential'ları göster
            const { users } = await import('../../../../lib/webauthn-storage')
            console.log(`[DEBUG] Total users in storage: ${users.size}`)
            for (const [username, user] of Array.from(users.entries())) {
                console.log(`[DEBUG] User: ${username}, credentials: ${user.credentials.length}`)
                user.credentials.forEach((cred: any, index: number) => {
                    console.log(`[DEBUG]   Credential ${index}: ID=${cred.credentialID}, length=${cred.credentialID.length}`)
                })
            }

            return res.status(400).json({
                verified: false,
                error: 'Credential not found'
            })
        }

        console.log(`[DEBUG] Found credential for user: ${userResult.username}`)

        // Authentication'ı doğrula
        // Convert base64url back to base64 for Buffer.from()
        const base64CredentialId = userResult.credential.credentialID
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            + '='.repeat((4 - userResult.credential.credentialID.length % 4) % 4)
        console.log(`[DEBUG] Converted base64url to base64 for verification: ${base64CredentialId}`)

        const verification = await verifyAuthenticationResponse({
            response: credential,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            authenticator: {
                credentialID: Buffer.from(base64CredentialId, 'base64'),
                credentialPublicKey: userResult.credential.credentialPublicKey,
                counter: userResult.credential.counter,
                transports: userResult.credential.transports as AuthenticatorTransport[],
            },
            requireUserVerification: true,
        })

        if (verification.verified) {
            // Counter'ı güncelle
            updateCredentialCounter(normalizedCredentialId, verification.authenticationInfo.newCounter)

            // Challenge'ı temizle
            authChallenges.delete('current')

            return res.status(200).json({
                verified: true,
                user: userResult.username,
                message: 'Authentication successful'
            })
        } else {
            return res.status(400).json({
                verified: false,
                error: 'Authentication verification failed'
            })
        }

    } catch (error: any) {
        console.error('Authentication verification failed:', error)
        return res.status(500).json({
            verified: false,
            error: 'Authentication verification failed'
        })
    }
} 