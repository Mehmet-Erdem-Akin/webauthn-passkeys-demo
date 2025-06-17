// Basit in-memory storage (production'da database kullanın)
// Bu dosya tüm WebAuthn endpoint'leri tarafından paylaşılır

export interface StoredCredential {
    credentialID: string
    credentialPublicKey: Uint8Array
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string[]
}

export interface StoredUser {
    id: string
    credentials: StoredCredential[]
    createdAt: Date
}

// Global storage maps (persistence across hot reloads)
declare global {
    var __webauthn_storage__: {
        userChallenges: Map<string, string>
        authChallenges: Map<string, string>
        users: Map<string, StoredUser>
    } | undefined
}

if (!global.__webauthn_storage__) {
    global.__webauthn_storage__ = {
        userChallenges: new Map<string, string>(),
        authChallenges: new Map<string, string>(),
        users: new Map<string, StoredUser>()
    }
}

// Storage maps
export const userChallenges = global.__webauthn_storage__.userChallenges
export const authChallenges = global.__webauthn_storage__.authChallenges
export const users = global.__webauthn_storage__.users

// Helper functions
export const getUserByCredentialID = (credentialID: string): { username: string; user: StoredUser; credential: StoredCredential } | null => {
    for (const [username, user] of Array.from(users.entries())) {
        const credential = user.credentials.find(cred => cred.credentialID === credentialID)
        if (credential) {
            return { username, user, credential }
        }
    }
    return null
}

export const addUserCredential = (username: string, credential: StoredCredential): void => {
    const existingUser = users.get(username)
    if (existingUser) {
        existingUser.credentials.push(credential)
    } else {
        users.set(username, {
            id: username,
            credentials: [credential],
            createdAt: new Date()
        })
    }
}

export const updateCredentialCounter = (credentialID: string, newCounter: number): void => {
    const result = getUserByCredentialID(credentialID)
    if (result) {
        result.credential.counter = newCounter
    }
}

// Debug helper
export const getStorageStats = () => ({
    totalUsers: users.size,
    totalCredentials: Array.from(users.values()).reduce((acc, user) => acc + user.credentials.length, 0),
    activeChallenges: userChallenges.size + authChallenges.size
}) 