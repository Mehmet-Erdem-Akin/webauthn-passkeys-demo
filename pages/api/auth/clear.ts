import type { NextApiRequest, NextApiResponse } from 'next'
import { userChallenges, authChallenges, users, getStorageStats } from '../../../lib/webauthn-storage'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ success: boolean; message: string; before?: any; after?: any }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' })
    }

    try {
        // Storage durumunu kaydet
        const before = getStorageStats()

        // Tüm storage'ı temizle
        userChallenges.clear()
        authChallenges.clear()
        users.clear()

        // Temizleme sonrası durum
        const after = getStorageStats()

        console.log(`[DEBUG] Storage cleared - Before: ${JSON.stringify(before)}, After: ${JSON.stringify(after)}`)

        return res.status(200).json({
            success: true,
            message: 'All WebAuthn storage cleared successfully',
            before,
            after
        })

    } catch (error: any) {
        console.error('Storage clear failed:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to clear storage'
        })
    }
} 