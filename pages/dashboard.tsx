import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
    Shield,
    User,
    Clock,
    Settings,
    LogOut,
    Key,
    Smartphone,
    Globe,
    CheckCircle,
    FileText,
    CreditCard,
    Lock
} from 'lucide-react'

interface UserSession {
    username: string
    authTime: string
    isAuthenticated: boolean
}

interface UserData {
    personalInfo: {
        name: string
        email: string
        phone: string
        company?: string
        department?: string
    }
    securityInfo: {
        lastLogin: string
        passkeysCount: number
        securityLevel: 'High' | 'Medium' | 'Low'
    }
    accountInfo: {
        accountType: string
        memberSince: string
        status: 'Active' | 'Inactive'
    }
}

export default function Dashboard() {
    const [session, setSession] = useState<UserSession | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Authentication durumunu kontrol et
        const authUser = localStorage.getItem('authUser')
        const authTime = localStorage.getItem('authTime')

        if (!authUser || !authTime) {
            // Authenticated değilse demo sayfasına yönlendir
            window.location.href = '/demo'
            return
        }

        const sessionData: UserSession = {
            username: authUser,
            authTime,
            isAuthenticated: true
        }

        // Progressive register'dan gelen form bilgilerini kontrol et
        const storedFormData = localStorage.getItem('userFormData')
        let formData = null
        if (storedFormData) {
            try {
                formData = JSON.parse(storedFormData)
            } catch (error) {
                console.error('Form data parse error:', error)
            }
        }

        // Passkey sayısını belirle (demo'da register edilenler 1, basic demo'da da 1, progressive'de skip edilenler 0)
        let passkeyCount = 1 // default: normal register/authentication durumu
        if (formData && formData.passkeyCreated === false) {
            // Progressive register'da passkey atlandıysa
            passkeyCount = 0
        }

        // User data oluştur (progressive register bilgileri varsa kullan, yoksa mock data)
        const mockUserData: UserData = {
            personalInfo: {
                name: formData ? `${formData.firstName} ${formData.lastName}` :
                    (authUser.includes('@') ? authUser.split('@')[0] : authUser),
                email: formData ? formData.email :
                    (authUser.includes('@') ? authUser : `${authUser}@example.com`),
                phone: formData ? formData.phone || '+90 5XX XXX XX XX' : '+90 5XX XXX XX XX',
                company: formData ? formData.company : undefined,
                department: formData ? formData.department : undefined
            },
            securityInfo: {
                lastLogin: new Date(authTime).toLocaleString('tr-TR'),
                passkeysCount: passkeyCount,
                securityLevel: passkeyCount > 0 ? 'High' : 'Medium'
            },
            accountInfo: {
                accountType: formData && formData.company ? 'Corporate User' : 'Premium User',
                memberSince: formData && formData.registrationDate ?
                    new Date(formData.registrationDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' }) :
                    'Ocak 2024',
                status: 'Active'
            }
        }

        setSession(sessionData)
        setUserData(mockUserData)
        setIsLoading(false)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('authUser')
        localStorage.removeItem('authTime')
        localStorage.removeItem('userFormData')
        window.location.href = '/demo'
    }

    const simulateSecureAction = (action: string) => {
        alert(`🔐 Güvenli İşlem: "${action}"\n\nGerçek uygulamada bu işlem için:\n• Tekrar passkey doğrulaması\n• İşlem onayı\n• Audit log kaydı\ngerçekleştirilirdi.`)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-600">Kullanıcı bilgileri yükleniyor...</p>
                </div>
            </div>
        )
    }

    if (!session?.isAuthenticated) {
        return null
    }

    return (
        <>
            <Head>
                <title>Dashboard - WebAuthn Demo</title>
                <meta name="description" content="Passkey authentication sonrası kullanıcı dashboard'u" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">SecureApp Dashboard</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Giriş: {new Date(session.authTime).toLocaleTimeString('tr-TR')}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Çıkış
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                            <div className="flex items-center">
                                <User className="h-12 w-12 mr-4" />
                                <div>
                                    <h2 className="text-2xl font-bold">Hoş geldiniz, {userData?.personalInfo.name}!</h2>
                                    <p className="text-blue-100">Passkey ile güvenli giriş yapıldı ✅</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Güvenlik Durumu</p>
                                    <p className="text-2xl font-bold text-gray-900">{userData?.securityInfo.securityLevel}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <Key className="h-8 w-8 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Kayıtlı Passkey</p>
                                    <p className="text-2xl font-bold text-gray-900">{userData?.securityInfo.passkeysCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <Globe className="h-8 w-8 text-purple-500 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Hesap Türü</p>
                                    <p className="text-2xl font-bold text-gray-900">{userData?.accountInfo.accountType}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* User Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                Kullanıcı Bilgileri
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">E-posta</label>
                                    <p className="text-gray-900">{userData?.personalInfo.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Telefon</label>
                                    <p className="text-gray-900">{userData?.personalInfo.phone}</p>
                                </div>
                                {userData?.personalInfo.company && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Şirket</label>
                                        <p className="text-gray-900">{userData.personalInfo.company}</p>
                                    </div>
                                )}
                                {userData?.personalInfo.department && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Departman</label>
                                        <p className="text-gray-900">{userData.personalInfo.department}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Üyelik Tarihi</label>
                                    <p className="text-gray-900">{userData?.accountInfo.memberSince}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Son Giriş</label>
                                    <p className="text-gray-900">{userData?.securityInfo.lastLogin}</p>
                                </div>
                            </div>
                        </div>

                        {/* Security Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Lock className="h-5 w-5 mr-2" />
                                Güvenlik İşlemleri
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => simulateSecureAction('Şifre Değiştirme')}
                                    className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <Settings className="h-4 w-4 text-gray-500 mr-3" />
                                        <span>Güvenlik Ayarları</span>
                                    </div>
                                    <span className="text-sm text-gray-400">→</span>
                                </button>

                                <button
                                    onClick={() => simulateSecureAction('Yeni Passkey Ekleme')}
                                    className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <Smartphone className="h-4 w-4 text-gray-500 mr-3" />
                                        <span>Yeni Passkey Ekle</span>
                                    </div>
                                    <span className="text-sm text-gray-400">→</span>
                                </button>

                                <button
                                    onClick={() => simulateSecureAction('Hesap Silme')}
                                    className="w-full flex items-center justify-between p-3 text-left border border-red-200 rounded-md hover:bg-red-50 text-red-600"
                                >
                                    <div className="flex items-center">
                                        <LogOut className="h-4 w-4 mr-3" />
                                        <span>Hesabı Sil</span>
                                    </div>
                                    <span className="text-sm text-red-400">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Application Scenarios */}
                    <div className="mt-8 bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            🚀 Passkey ile Yapabilecekleriniz
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <FileText className="h-6 w-6 text-blue-500 mb-2" />
                                <h4 className="font-medium mb-1">Belge İmzalama</h4>
                                <p className="text-sm text-gray-600">Dijital belgeler için güvenli imza</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <CreditCard className="h-6 w-6 text-green-500 mb-2" />
                                <h4 className="font-medium mb-1">Ödeme Onayı</h4>
                                <p className="text-sm text-gray-600">Finansal işlemler için doğrulama</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <Settings className="h-6 w-6 text-purple-500 mb-2" />
                                <h4 className="font-medium mb-1">Yönetim Paneli</h4>
                                <p className="text-sm text-gray-600">Sistem ayarları ve konfigürasyon</p>
                            </div>
                        </div>
                    </div>

                    {/* Back to Demo */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/demo"
                            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Demo Sayfasına Dön
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
} 