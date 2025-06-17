// WebAuthn Client-side Helper Functions

import {
    startRegistration,
    startAuthentication,
    browserSupportsWebAuthn,
    platformAuthenticatorIsAvailable
} from '@simplewebauthn/browser'
import type {
    RegistrationResponseJSON,
    AuthenticationResponseJSON,
    PublicKeyCredentialCreationOptionsJSON,
    PublicKeyCredentialRequestOptionsJSON
} from '@simplewebauthn/typescript-types'

export interface WebAuthnSupport {
    isSupported: boolean
    hasAuthenticator: boolean
    supportsPlatform: boolean
    supportsRoaming: boolean
}

export interface RegistrationResult {
    success: boolean
    credential?: RegistrationResponseJSON
    error?: string
}

export interface AuthenticationResult {
    success: boolean
    assertion?: AuthenticationResponseJSON
    user?: string
    error?: string
}

/**
 * WebAuthn desteğini kontrol eder
 */
export const checkWebAuthnSupport = async (): Promise<WebAuthnSupport> => {
    const result: WebAuthnSupport = {
        isSupported: false,
        hasAuthenticator: false,
        supportsPlatform: false,
        supportsRoaming: false
    }

    // Temel WebAuthn desteği
    result.isSupported = browserSupportsWebAuthn()

    if (!result.isSupported) {
        return result
    }

    try {
        // Platform authenticator (TouchID, FaceID, Windows Hello) desteği
        result.supportsPlatform = await platformAuthenticatorIsAvailable()

        // Herhangi bir authenticator'ın varlığı (hardware keys dahil)
        result.hasAuthenticator = await PublicKeyCredential.isConditionalMediationAvailable?.() || false

        // Roaming authenticator (hardware keys) için genel kontrol
        result.supportsRoaming = true // Çoğu modern tarayıcı destekler
    } catch (error) {
        console.error('WebAuthn support check failed:', error)
    }

    return result
}

/**
 * Passkey kaydı başlatır
 */
export const registerPasskey = async (username: string): Promise<RegistrationResult> => {
    try {
        if (!browserSupportsWebAuthn()) {
            throw new Error('WebAuthn is not supported in this browser')
        }

        // Server'dan registration options al
        const optionsResponse = await fetch('/api/auth/register/begin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })

        if (!optionsResponse.ok) {
            throw new Error('Failed to get registration options')
        }

        const options: PublicKeyCredentialCreationOptionsJSON = await optionsResponse.json()

        // WebAuthn credential oluştur
        const attResp = await startRegistration(options)

        // Server'a credential'ı gönder
        const verificationResponse = await fetch('/api/auth/register/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                credential: attResp,
                challenge: options.challenge // Challenge'ı da gönder
            }),
        })

        if (!verificationResponse.ok) {
            throw new Error('Failed to verify registration')
        }

        const verificationResult = await verificationResponse.json()

        if (!verificationResult.verified) {
            throw new Error('Registration verification failed')
        }

        return {
            success: true,
            credential: attResp
        }

    } catch (error: any) {
        console.error('Registration failed:', error)

        let errorMessage = 'Registration failed'

        if (error.name === 'NotAllowedError') {
            errorMessage = 'User cancelled or denied the operation'
        } else if (error.name === 'NotSupportedError') {
            errorMessage = 'WebAuthn is not supported'
        } else if (error.name === 'SecurityError') {
            errorMessage = 'Security error - check HTTPS and domain'
        } else if (error.name === 'InvalidStateError') {
            errorMessage = 'Authenticator already registered'
        } else if (error.message) {
            errorMessage = error.message
        }

        return {
            success: false,
            error: errorMessage
        }
    }
}

/**
 * Passkey ile kimlik doğrulama
 */
export const authenticateWithPasskey = async (): Promise<AuthenticationResult> => {
    try {
        if (!browserSupportsWebAuthn()) {
            throw new Error('WebAuthn is not supported in this browser')
        }

        // Server'dan authentication options al
        const optionsResponse = await fetch('/api/auth/authenticate/begin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!optionsResponse.ok) {
            throw new Error('Failed to get authentication options')
        }

        const options: PublicKeyCredentialRequestOptionsJSON = await optionsResponse.json()

        // WebAuthn assertion oluştur
        const asseResp = await startAuthentication(options)

        // Server'da assertion'ı doğrula
        const verificationResponse = await fetch('/api/auth/authenticate/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credential: asseResp,
                challenge: options.challenge // Challenge'ı da gönder
            }),
        })

        if (!verificationResponse.ok) {
            throw new Error('Failed to verify authentication')
        }

        const verificationResult = await verificationResponse.json()

        if (!verificationResult.verified) {
            throw new Error('Authentication verification failed')
        }

        return {
            success: true,
            assertion: asseResp,
            user: verificationResult.user
        }

    } catch (error: any) {
        console.error('Authentication failed:', error)

        let errorMessage = 'Authentication failed'

        if (error.name === 'NotAllowedError') {
            errorMessage = 'User cancelled or no credentials available'
        } else if (error.name === 'NotSupportedError') {
            errorMessage = 'WebAuthn is not supported'
        } else if (error.name === 'SecurityError') {
            errorMessage = 'Security error - check HTTPS and domain'
        } else if (error.message) {
            errorMessage = error.message
        }

        return {
            success: false,
            error: errorMessage
        }
    }
}

/**
 * Platform bilgisi alır
 */
export const getPlatformInfo = (): string => {
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return 'iOS (TouchID/FaceID)'
    } else if (userAgent.includes('android')) {
        return 'Android (Fingerprint/Face)'
    } else if (userAgent.includes('windows')) {
        return 'Windows (Hello)'
    } else if (userAgent.includes('mac')) {
        return 'macOS (TouchID)'
    } else {
        return 'Unknown Platform'
    }
}

/**
 * Error handling utility
 */
export const getWebAuthnErrorMessage = (error: any): string => {
    const errorMap: Record<string, string> = {
        'NotAllowedError': 'Kullanıcı işlemi iptal etti veya kimlik doğrulama başarısız',
        'NotSupportedError': 'Bu tarayıcı WebAuthn desteklemiyor',
        'SecurityError': 'Güvenlik hatası - HTTPS gerekli',
        'InvalidStateError': 'Geçersiz durum - authenticator zaten kayıtlı olabilir',
        'ConstraintError': 'Kısıtlama hatası - gereksinimler karşılanamıyor',
        'UnknownError': 'Bilinmeyen hata oluştu'
    }

    return errorMap[error.name] || error.message || 'Beklenmeyen hata oluştu'
} 