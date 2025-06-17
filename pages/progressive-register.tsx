import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
    Shield,
    User,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    FormInput,
    Fingerprint,
    Clock,
    Building,
    Mail,
    Phone
} from 'lucide-react'
import {
    checkWebAuthnSupport,
    registerPasskey,
    getPlatformInfo,
    getWebAuthnErrorMessage,
    type WebAuthnSupport
} from '../lib/webauthn-client'

interface ProgressiveRegisterState {
    step: 'form' | 'passkey' | 'success'
    isLoading: boolean
    error: string | null
    webAuthnSupport: WebAuthnSupport | null
    formData: {
        firstName: string
        lastName: string
        email: string
        phone: string
        company: string
        department: string
    }
    passkeyCreated: boolean
}

export default function ProgressiveRegister() {
    const [state, setState] = useState<ProgressiveRegisterState>({
        step: 'form',
        isLoading: false,
        error: null,
        webAuthnSupport: null,
        formData: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            department: ''
        },
        passkeyCreated: false
    })

    useEffect(() => {
        // WebAuthn desteğini kontrol et
        const checkSupport = async () => {
            try {
                const support = await checkWebAuthnSupport()
                setState(prev => ({
                    ...prev,
                    webAuthnSupport: support
                }))
            } catch (error) {
                console.error('WebAuthn support check failed:', error)
            }
        }

        checkSupport()
    }, [])

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Form validasyonu
        const { firstName, lastName, email } = state.formData
        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            setState(prev => ({ ...prev, error: 'Ad, soyad ve e-posta zorunludur' }))
            return
        }

        // Email format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setState(prev => ({ ...prev, error: 'Geçerli bir e-posta adresi girin' }))
            return
        }

        // Form başarılı, passkey adımına geç
        setState(prev => ({
            ...prev,
            step: 'passkey',
            error: null
        }))
    }

    const handlePasskeyCreate = async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        try {
            // Email'i username olarak kullan
            const result = await registerPasskey(state.formData.email)

            if (result.success) {
                // Form bilgilerini localStorage'a kaydet
                localStorage.setItem('userFormData', JSON.stringify({
                    firstName: state.formData.firstName,
                    lastName: state.formData.lastName,
                    email: state.formData.email,
                    phone: state.formData.phone,
                    company: state.formData.company,
                    department: state.formData.department,
                    registrationDate: new Date().toISOString(),
                    passkeyCreated: true
                }))

                // Authentication bilgilerini de kaydet (dashboard için gerekli)
                localStorage.setItem('authUser', state.formData.email)
                localStorage.setItem('authTime', new Date().toISOString())

                setState(prev => ({
                    ...prev,
                    step: 'success',
                    isLoading: false,
                    passkeyCreated: true
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: result.error || 'Passkey oluşturma başarısız oldu'
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

    const handleSkipPasskey = () => {
        // Form bilgilerini localStorage'a kaydet (passkey olmadan)
        localStorage.setItem('userFormData', JSON.stringify({
            firstName: state.formData.firstName,
            lastName: state.formData.lastName,
            email: state.formData.email,
            phone: state.formData.phone,
            company: state.formData.company,
            department: state.formData.department,
            registrationDate: new Date().toISOString(),
            passkeyCreated: false
        }))

        // Authentication bilgilerini de kaydet (passkey olmadan sisteme giriş)
        localStorage.setItem('authUser', state.formData.email)
        localStorage.setItem('authTime', new Date().toISOString())

        setState(prev => ({
            ...prev,
            step: 'success',
            passkeyCreated: false
        }))
    }

    const resetDemo = () => {
        // localStorage'dan form bilgilerini temizle
        localStorage.removeItem('userFormData')

        setState(prev => ({
            step: 'form',
            isLoading: false,
            error: null,
            webAuthnSupport: prev.webAuthnSupport,
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                company: '',
                department: ''
            },
            passkeyCreated: false
        }))
    }

    const updateFormData = (field: keyof typeof state.formData, value: string) => {
        setState(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [field]: value
            },
            error: null
        }))
    }

    const isWebAuthnSupported = state.webAuthnSupport?.isSupported

    return (
        <>
            <Head>
                <title>Progressive Registration - WebAuthn Demo</title>
                <meta name="description" content="Aşamalı kayıt: Önce form, sonra passkey" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Ana Sayfa
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Progressive Registration</h1>
                            <div className="text-sm text-gray-500">
                                Adım {state.step === 'form' ? '1' : state.step === 'passkey' ? '2' : '✓'}/2
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center space-x-4">
                            <div className={`flex items-center ${state.step === 'form' ? 'text-blue-600' : 'text-green-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${state.step === 'form' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                                    }`}>
                                    {state.step === 'form' ? '1' : <CheckCircle className="h-5 w-5" />}
                                </div>
                                <span className="ml-2 font-medium">Kişisel Bilgiler</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-gray-300 mx-4">
                                <div className={`h-full transition-all duration-500 ${state.step !== 'form' ? 'bg-green-600 w-full' : 'bg-blue-600 w-0'
                                    }`}></div>
                            </div>
                            <div className={`flex items-center ${state.step === 'form' ? 'text-gray-400' :
                                state.step === 'passkey' ? 'text-blue-600' : 'text-green-600'
                                }`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${state.step === 'form' ? 'bg-gray-300 text-gray-500' :
                                    state.step === 'passkey' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                                    }`}>
                                    {state.step === 'success' ? <CheckCircle className="h-5 w-5" /> : '2'}
                                </div>
                                <span className="ml-2 font-medium">Güvenlik Kurulumu</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {state.step === 'form' && (
                            <div className="max-w-2xl mx-auto">
                                <div className="text-center mb-8">
                                    <FormInput className="h-16 w-16 text-green-600 mx-auto mb-4" />
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Hesap Oluşturun
                                    </h2>
                                    <p className="text-gray-600">
                                        Önce temel bilgilerinizi girin, sonra güvenlik için passkey ekleyeceğiz
                                    </p>
                                </div>

                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ad *
                                            </label>
                                            <input
                                                type="text"
                                                value={state.formData.firstName}
                                                onChange={(e) => updateFormData('firstName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Adınız"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Soyad *
                                            </label>
                                            <input
                                                type="text"
                                                value={state.formData.lastName}
                                                onChange={(e) => updateFormData('lastName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Soyadınız"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="h-4 w-4 inline mr-1" />
                                            E-posta Adresi *
                                        </label>
                                        <input
                                            type="email"
                                            value={state.formData.email}
                                            onChange={(e) => updateFormData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="ornek@email.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="h-4 w-4 inline mr-1" />
                                            Telefon
                                        </label>
                                        <input
                                            type="tel"
                                            value={state.formData.phone}
                                            onChange={(e) => updateFormData('phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="+90 5XX XXX XX XX"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Building className="h-4 w-4 inline mr-1" />
                                                Şirket
                                            </label>
                                            <input
                                                type="text"
                                                value={state.formData.company}
                                                onChange={(e) => updateFormData('company', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Şirket adı"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Departman
                                            </label>
                                            <input
                                                type="text"
                                                value={state.formData.department}
                                                onChange={(e) => updateFormData('department', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="İT, İK, Satış..."
                                            />
                                        </div>
                                    </div>

                                    {state.error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                            <p className="text-red-800 text-sm">{state.error}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                                    >
                                        <span>Devam Et</span>
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </button>
                                </form>

                                <div className="mt-6 text-center text-sm text-gray-500">
                                    * zorunlu alanlar
                                </div>
                            </div>
                        )}

                        {state.step === 'passkey' && (
                            <div className="max-w-md mx-auto text-center">
                                <Fingerprint className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Güvenlik Kurulumu
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Hesabınızı güvence altına almak için passkey oluşturun.
                                    Bu sayede şifre kullanmadan güvenli giriş yapabilirsiniz.
                                </p>

                                {/* User summary */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                                    <h3 className="font-medium text-gray-900 mb-2">Kayıt Bilgileri:</h3>
                                    <p className="text-sm text-gray-600">
                                        <User className="h-4 w-4 inline mr-1" />
                                        {state.formData.firstName} {state.formData.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <Mail className="h-4 w-4 inline mr-1" />
                                        {state.formData.email}
                                    </p>
                                    {state.formData.company && (
                                        <p className="text-sm text-gray-600">
                                            <Building className="h-4 w-4 inline mr-1" />
                                            {state.formData.company}
                                        </p>
                                    )}
                                </div>

                                {/* WebAuthn Support Check */}
                                {!isWebAuthnSupported && (
                                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-yellow-800 text-sm">
                                            ⚠️ Tarayıcınız passkey desteklemiyor.
                                            Bu adımı atlayabilir, daha sonra ekleyebilirsiniz.
                                        </p>
                                    </div>
                                )}

                                {state.error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
                                        <p className="text-red-800 text-sm">{state.error}</p>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <button
                                        onClick={handlePasskeyCreate}
                                        disabled={state.isLoading || !isWebAuthnSupported}
                                        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${state.isLoading ? 'bg-gray-400 cursor-not-allowed' :
                                            isWebAuthnSupported ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                                                'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {state.isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <Clock className="h-5 w-5 mr-2 animate-pulse" />
                                                Passkey oluşturuluyor...
                                            </div>
                                        ) : (
                                            'Passkey Oluştur (Önerilen)'
                                        )}
                                    </button>

                                    <button
                                        onClick={handleSkipPasskey}
                                        className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md"
                                    >
                                        Şimdilik Atla
                                    </button>
                                </div>

                                <p className="mt-4 text-xs text-gray-500">
                                    Passkey'i daha sonra güvenlik ayarlarından ekleyebilirsiniz
                                </p>
                            </div>
                        )}

                        {state.step === 'success' && (
                            <div className="text-center">
                                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Hesap Oluşturuldu! 🎉
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Hoş geldiniz, {state.formData.firstName}!
                                </p>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                                    <h3 className="font-semibold text-green-900 mb-3">Kayıt Özeti</h3>
                                    <div className="text-left space-y-2 text-green-800">
                                        <p><strong>Ad Soyad:</strong> {state.formData.firstName} {state.formData.lastName}</p>
                                        <p><strong>E-posta:</strong> {state.formData.email}</p>
                                        {state.formData.phone && <p><strong>Telefon:</strong> {state.formData.phone}</p>}
                                        {state.formData.company && <p><strong>Şirket:</strong> {state.formData.company}</p>}
                                        {state.formData.department && <p><strong>Departman:</strong> {state.formData.department}</p>}
                                        <p><strong>Passkey:</strong> {state.passkeyCreated ? '✅ Oluşturuldu' : '⏭️ Atlandı'}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href="/dashboard"
                                        className="inline-block w-full py-3 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard'a Git
                                    </Link>

                                    <button
                                        onClick={resetDemo}
                                        className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md"
                                    >
                                        Yeni Demo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Panel */}
                    <div className="mt-8 bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            🔄 Progressive Registration Yaklaşımı
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">1. Form-First Pattern</h4>
                                <ul className="space-y-1">
                                    <li>• Önce gerekli kullanıcı bilgileri toplanır</li>
                                    <li>• Kullanıcı deneyimi korunur</li>
                                    <li>• Mevcut form süreçleri korunur</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">2. Security Enhancement</h4>
                                <ul className="space-y-1">
                                    <li>• Passkey opsiyonel olarak eklenir</li>
                                    <li>• Geriye dönük uyumluluk sağlanır</li>
                                    <li>• Kullanıcı tercihi respekt edilir</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Back to main demo */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/demo"
                            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Temel Demo'ya Dön
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
} 