import type { NextApiRequest, NextApiResponse } from 'next'
import {
    verifyRegistrationResponse
} from '@simplewebauthn/server'
import type {
    RegistrationResponseJSON
} from '@simplewebauthn/typescript-types'
import { userChallenges, addUserCredential, type StoredCredential } from '../../../../lib/webauthn-storage'

// RP (Relying Party) yapılandırması
const rpID = 'localhost' // Production'da gerçek domain
const origin = 'http://localhost:3000' // Production'da https://yourdomain.com

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ verified: boolean; message?: string; error?: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ verified: false, error: 'Method not allowed' })
    }

    try {
        const { username, credential, challenge }: {
            username: string;
            credential: RegistrationResponseJSON;
            challenge?: string;
        } = req.body

        if (!username || !credential) {
            return res.status(400).json({
                verified: false,
                error: 'Username and credential are required'
            })
        }

        // Challenge'ı önce request body'den al, yoksa stored'dan al
        let expectedChallenge = challenge

        if (!expectedChallenge) {
            console.log(`[DEBUG] No challenge in request, looking for stored challenge for user: ${username}`)
            console.log(`[DEBUG] Current challenges map size: ${userChallenges.size}`)
            console.log(`[DEBUG] All challenges:`, Array.from(userChallenges.keys()))

            expectedChallenge = userChallenges.get(username)
            if (!expectedChallenge) {
                console.log(`[DEBUG] No challenge found for user: ${username}`)
                return res.status(400).json({
                    verified: false,
                    error: 'No challenge found for user'
                })
            }
            console.log(`[DEBUG] Found stored challenge for user: ${username}`)
        } else {
            console.log(`[DEBUG] Using challenge from request body for user: ${username}`)
        }

        // Registration'ı doğrula
        const verification = await verifyRegistrationResponse({
            response: credential,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            requireUserVerification: true,
        })

        if (verification.verified && verification.registrationInfo) {
            // Kullanıcıyı ve credential'ını kaydet
            // Use base64url format (consistent with WebAuthn spec)
            const credentialIdBase64url = Buffer.from(verification.registrationInfo.credentialID)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '')

            console.log(`[DEBUG] Saving credential with base64url ID: ${credentialIdBase64url}`)

            const newCredential: StoredCredential = {
                credentialID: credentialIdBase64url,
                credentialPublicKey: verification.registrationInfo.credentialPublicKey,
                counter: verification.registrationInfo.counter,
                credentialDeviceType: verification.registrationInfo.credentialDeviceType,
                credentialBackedUp: verification.registrationInfo.credentialBackedUp,
                transports: credential.response.transports,
            }

            addUserCredential(username, newCredential)

            // Debug: Storage durumunu kontrol et
            const { users } = await import('../../../../lib/webauthn-storage')
            console.log(`[DEBUG] After adding credential - Total users: ${users.size}`)
            console.log(`[DEBUG] User ${username} has ${users.get(username)?.credentials.length || 0} credentials`)

            // Challenge'ı temizle
            userChallenges.delete(username)

            return res.status(200).json({
                verified: true,
                message: 'Registration successful'
            })
        } else {
            return res.status(400).json({
                verified: false,
                error: 'Registration verification failed'
            })
        }

    } catch (error: any) {
        console.error('Registration verification failed:', error)
        return res.status(500).json({
            verified: false,
            error: 'Registration verification failed'
        })
    }
} 