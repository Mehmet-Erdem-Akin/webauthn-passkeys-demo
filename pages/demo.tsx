import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
    Shield,
    Fingerprint,
    CheckCircle,
    XCircle,
    ArrowLeft,
    User,
    Smartphone,
    Lock
} from 'lucide-react'
import {
    checkWebAuthnSupport,
    registerPasskey,
    authenticateWithPasskey,
    getPlatformInfo,
    getWebAuthnErrorMessage,
    type WebAuthnSupport
} from '../lib/webauthn-client'

interface DemoState {
    step: 'start' | 'register' | 'authenticate' | 'success'
    username: string
    isLoading: boolean
    error: string | null
    webAuthnSupport: WebAuthnSupport | null
    platformInfo: string
    lastOperation: string
}

export default function Demo() {
    const [state, setState] = useState<DemoState>({
        step: 'start',
        username: '',
        isLoading: false,
        error: null,
        webAuthnSupport: null,
        platformInfo: '',
        lastOperation: ''
    })

    useEffect(() => {
        // WebAuthn desteğini kontrol et
        const checkSupport = async () => {
            try {
                const support = await checkWebAuthnSupport()
                const platform = getPlatformInfo()
                setState(prev => ({
                    ...prev,
                    webAuthnSupport: support,
                    platformInfo: platform
                }))
            } catch (error) {
                console.error('WebAuthn support check failed:', error)
            }
        }

        checkSupport()
    }, [])

    const handleRegister = async () => {
        if (!state.username.trim()) {
            setState(prev => ({ ...prev, error: 'Lütfen kullanıcı adı girin' }))
            return
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }))

        try {
            const result = await registerPasskey(state.username)

            if (result.success) {
                setState(prev => ({
                    ...prev,
                    step: 'success',
                    isLoading: false,
                    lastOperation: 'Passkey kaydı'
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: result.error || 'Kayıt işlemi başarısız oldu'
                }))
            }
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: getWebAuthnErrorMessage(error)
            }))
        }
    }

    const handleAuthenticate = async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        try {
            const result = await authenticateWithPasskey()

            if (result.success) {
                // Authentication başarılı - kullanıcı bilgisini sakla ve dashboard'a yönlendir
                localStorage.setItem('authUser', result.user || 'Unknown User')
                localStorage.setItem('authTime', new Date().toISOString())

                setState(prev => ({
                    ...prev,
                    step: 'success',
                    isLoading: false,
                    lastOperation: 'Passkey doğrulaması'
                }))

                // Dashboard'a yönlendirme seçeneği sunalım
                setTimeout(() => {
                    if (confirm('🎉 Giriş başarılı! Dashboard\'a gitmek ister misiniz?')) {
                        window.location.href = '/dashboard'
                    }
                }, 1500)
            } else {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: result.error || 'Kimlik doğrulama başarısız oldu'
                }))
            }
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: getWebAuthnErrorMessage(error)
            }))
        }
    }

    const resetDemo = () => {
        setState(prev => ({
            step: 'start',
            username: '',
            isLoading: false,
            error: null,
            webAuthnSupport: prev.webAuthnSupport,
            platformInfo: prev.platformInfo,
            lastOperation: ''
        }))
    }

    const clearAllPasskeys = async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }))

            const response = await fetch('/api/auth/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const result = await response.json()

            if (result.success) {
                alert(`✅ Server storage temizlendi!\n\nÖnceki: ${result.before.totalUsers} kullanıcı, ${result.before.totalCredentials} credential\nSonrası: ${result.after.totalUsers} kullanıcı, ${result.after.totalCredentials} credential\n\n⚠️ Cihazınızdaki passkey'leri de temizlemek için:\n• iOS/macOS: Ayarlar > Face ID ve Kod > Kaydedilen Parolalar\n• Android: Ayarlar > Google > Autofill > Parolalar\n• Chrome: chrome://settings/passkeys\n• Edge: edge://settings/passkeys`)
                resetDemo()
            } else {
                setState(prev => ({ ...prev, error: result.message }))
            }
        } catch (error: any) {
            setState(prev => ({ ...prev, error: 'Clear işlemi başarısız oldu' }))
        } finally {
            setState(prev => ({ ...prev, isLoading: false }))
        }
    }

    const isWebAuthnSupported = state.webAuthnSupport?.isSupported

    return (
        <>
            <Head>
                <title>WebAuthn Passkeys Demo</title>
                <meta name="description" content="WebAuthn canlı demo" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Ana Sayfa
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">WebAuthn Demo</h1>
                            <button
                                onClick={clearAllPasskeys}
                                disabled={state.isLoading}
                                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
                            >
                                🧹 Clear All
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Browser Support Check */}
                    <div className="mb-8 p-4 rounded-lg border bg-white">
                        <h3 className="font-semibold text-gray-900 mb-3">🔍 WebAuthn Durum Kontrolü</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                {isWebAuthnSupported ? (
                                    <>
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                        <span className="text-green-800">WebAuthn destekleniyor</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                                        <span className="text-red-800">WebAuthn desteklenmiyor</span>
                                    </>
                                )}
                            </div>
                            {state.webAuthnSupport && (
                                <>
                                    <div className="flex items-center">
                                        {state.webAuthnSupport.supportsPlatform ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                                <span className="text-green-800">Platform authenticator mevcut ({state.platformInfo})</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                                                <span className="text-red-800">Platform authenticator mevcut değil</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        {state.webAuthnSupport.hasAuthenticator ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                                <span className="text-green-800">Authenticator mevcut</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-orange-600 mr-2" />
                                                <span className="text-orange-800">Authenticator durumu belirsiz</span>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Demo Steps */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {state.step === 'start' && (
                            <div className="text-center">
                                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    WebAuthn Demo'ya Hoş Geldiniz
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Gerçek passkey kaydı veya kimlik doğrulama işlemini deneyimleyin
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, step: 'register' }))}
                                        className="p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!isWebAuthnSupported}
                                    >
                                        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">Yeni Kayıt</h3>
                                        <p className="text-gray-600">Passkey oluştur</p>
                                    </button>

                                    <button
                                        onClick={() => setState(prev => ({ ...prev, step: 'authenticate' }))}
                                        className="p-6 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!isWebAuthnSupported}
                                    >
                                        <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">Giriş Yap</h3>
                                        <p className="text-gray-600">Passkey ile doğrula</p>
                                    </button>
                                </div>

                                {!isWebAuthnSupported && (
                                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-yellow-800">
                                            ⚠️ Tarayıcınız WebAuthn desteklemiyor. Modern bir tarayıcı kullanın (Chrome 67+, Firefox 60+, Safari 14+)
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {state.step === 'register' && (
                            <div className="max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <Fingerprint className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Passkey Kaydı
                                    </h2>
                                    <p className="text-gray-600">
                                        Kullanıcı adınızı girin ve gerçek passkey oluşturun
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kullanıcı Adı
                                        </label>
                                        <input
                                            type="text"
                                            value={state.username}
                                            onChange={(e) => setState(prev => ({ ...prev, username: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="kullanici@example.com"
                                            disabled={state.isLoading}
                                        />
                                    </div>

                                    {state.error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                            <p className="text-red-800 text-sm">{state.error}</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleRegister}
                                        disabled={state.isLoading || !isWebAuthnSupported}
                                        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${state.isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {state.isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <Smartphone className="h-5 w-5 mr-2 biometric-pulse" />
                                                Biyometrik doğrulama bekleniyor...
                                            </div>
                                        ) : (
                                            'Gerçek Passkey Oluştur'
                                        )}
                                    </button>

                                    <button
                                        onClick={resetDemo}
                                        className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Geri Dön
                                    </button>
                                </div>
                            </div>
                        )}

                        {state.step === 'authenticate' && (
                            <div className="max-w-md mx-auto text-center">
                                <Fingerprint className="h-16 w-16 text-green-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Kimlik Doğrulama
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Kayıtlı passkey ile gerçek giriş yapın
                                </p>

                                {state.error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
                                        <p className="text-red-800 text-sm">{state.error}</p>
                                    </div>
                                )}

                                <button
                                    onClick={handleAuthenticate}
                                    disabled={state.isLoading || !isWebAuthnSupported}
                                    className={`w-full py-3 px-4 rounded-md font-medium transition-colors mb-4 ${state.isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                >
                                    {state.isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <Smartphone className="h-5 w-5 mr-2 biometric-pulse" />
                                            Biyometrik doğrulama bekleniyor...
                                        </div>
                                    ) : (
                                        'Gerçek Passkey ile Giriş Yap'
                                    )}
                                </button>

                                <button
                                    onClick={resetDemo}
                                    className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Geri Dön
                                </button>
                            </div>
                        )}

                        {state.step === 'success' && (
                            <div className="text-center">
                                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6 success-bounce" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Başarılı! 🎉
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Gerçek WebAuthn işlemi başarıyla tamamlandı
                                </p>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                                    <p className="text-green-800">
                                        <strong>Kullanıcı:</strong> {state.username || 'Demo Kullanıcı'}
                                    </p>
                                    <p className="text-green-800">
                                        <strong>İşlem:</strong> {state.lastOperation}
                                    </p>
                                    <p className="text-green-800">
                                        <strong>Durum:</strong> Gerçek WebAuthn - Başarılı ✅
                                    </p>
                                    <p className="text-green-800">
                                        <strong>Platform:</strong> {state.platformInfo}
                                    </p>
                                </div>

                                <button
                                    onClick={resetDemo}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Yeniden Dene
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Info Panel */}
                    <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-3">
                            ✅ Gerçek WebAuthn Demo
                        </h3>
                        <ul className="text-green-800 space-y-2">
                            <li>• Bu demo <strong>gerçek WebAuthn API'lerini</strong> kullanır</li>
                            <li>• Biyometrik doğrulama (TouchID/FaceID/Fingerprint) gerçek</li>
                            <li>• HTTPS gereklidir (localhost'ta test için HTTP kabul edilir)</li>
                            <li>• Passkey'ler tarayıcıda/cihazda gerçekten saklanır</li>
                            <li>• Platform: {state.platformInfo}</li>
                        </ul>
                    </div>
                </main>
            </div>
        </>
    )
} 