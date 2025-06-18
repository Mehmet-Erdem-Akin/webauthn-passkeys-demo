import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
    Shield,
    ArrowLeft,
    ArrowRight,
    Key,
    Smartphone,
    Lock,
    CheckCircle,
    XCircle,
    Globe,
    User,
    AlertTriangle,
    Play,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const slides = [
    {
        id: 1,
        title: "WebAuthn Passkeys Demo",
        subtitle: "Şifresiz Geleceği Deneyimleyin",
        content: (
            <div className="text-center">
                <Shield className="h-32 w-32 text-blue-400 mx-auto mb-8 animate-pulse" />
                <h1 className="text-6xl font-bold text-white mb-6">
                    <span className="text-blue-300">Passkeys</span> ile
                    <br />
                    <span className="text-green-300">Şifresiz Geleceğe</span>
                </h1>
                <p className="text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                    WebAuthn teknolojisi ile güvenli, hızlı ve kullanıcı dostu kimlik doğrulama
                </p>
                <div className="flex justify-center space-x-8 mt-12">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-300">🔒</div>
                        <p className="text-sm text-gray-300 mt-2">Güvenli</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-300">⚡</div>
                        <p className="text-sm text-gray-300 mt-2">Hızlı</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-300">👆</div>
                        <p className="text-sm text-gray-300 mt-2">Kolay</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Şifre Problemi",
        subtitle: "Mevcut durumun fotoğrafı",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-red-400 mb-8">📊 Şifre Krizi</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-red-900 bg-opacity-20 border border-red-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-red-300 mb-4">İstatistikler</h3>
                        <ul className="text-lg text-gray-200 space-y-3">
                            <li>• <strong className="text-red-300">81%</strong> veri ihlali şifre tabanlı</li>
                            <li>• Ortalama <strong className="text-red-300">100+</strong> hesap per kullanıcı</li>
                            <li>• <strong className="text-red-300">64%</strong> aynı şifreyi tekrar kullanıyor</li>
                            <li>• <strong className="text-red-300">$5.2M</strong> ortalama veri ihlali maliyeti</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-yellow-300 mb-4">Kullanıcı Deneyimi</h3>
                        <ul className="text-lg text-gray-200 space-y-3">
                            <li>• Karmaşık şifre kuralları</li>
                            <li>• Sürekli şifre sıfırlama</li>
                            <li>• 2FA SMS güvenli değil</li>
                            <li>• Çoklu cihaz senkronizasyon</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Passkeys Nasıl Çalışır?",
        subtitle: "Temel kavramlar",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-blue-600 mb-8">🔑 Passkey Üretimi</h2>
                <div className="space-y-6">
                    <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-300 mb-4">1. Kayıt Sırasında</h3>
                        <div className="flex items-center justify-between">
                            <div className="text-center text-gray-200">
                                <Lock className="h-16 w-16 text-red-400 mx-auto mb-2" />
                                <p className="font-bold">Private Key</p>
                                <p className="text-sm">Cihazınızda kalır</p>
                            </div>
                            <div className="text-4xl text-white">+</div>
                            <div className="text-center text-gray-200">
                                <Key className="h-16 w-16 text-green-400 mx-auto mb-2" />
                                <p className="font-bold">Public Key</p>
                                <p className="text-sm">Web sitesine gönderilir</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-300 mb-4">2. Giriş Sırasında</h3>
                        <div className="text-lg text-gray-200">
                            <p>1. Site: "Bu challenge'ı imzala"</p>
                            <p>2. Cihaz: Private key ile imzalar</p>
                            <p>3. Site: Public key ile doğrular</p>
                            <p>4. ✅ Eşleşirse giriş başarılı!</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Nerede Saklanıyor?",
        subtitle: "Platform desteği",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-purple-600 mb-8">💾 Passkey Depolama</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-green-300 mb-4">✅ Tam Destek</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Smartphone className="h-6 w-6 text-blue-400 mr-3" />
                                <div className="text-gray-200">
                                    <p className="font-bold">iPhone/iPad</p>
                                    <p className="text-sm">iCloud Keychain sync</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Smartphone className="h-6 w-6 text-green-400 mr-3" />
                                <div className="text-gray-200">
                                    <p className="font-bold">Android</p>
                                    <p className="text-sm">Google Password Manager</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Shield className="h-6 w-6 text-blue-400 mr-3" />
                                <div className="text-gray-200">
                                    <p className="font-bold">Mac</p>
                                    <p className="text-sm">TouchID + iCloud sync</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4">🟡 Kısmi Destek</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Shield className="h-6 w-6 text-yellow-400 mr-3" />
                                <div className="text-gray-200">
                                    <p className="font-bold">Windows 11</p>
                                    <p className="text-sm">Sadece o PC'de</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Globe className="h-6 w-6 text-yellow-400 mr-3" />
                                <div className="text-gray-200">
                                    <p className="font-bold">Chrome 108+</p>
                                    <p className="text-sm">Tüm platformlarda</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Güvenlik: Passkey vs Şifre",
        subtitle: "Neden daha güvenli?",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-green-600 mb-8">🛡️ Güvenlik Karşılaştırması</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="border-b-2">
                                <th className="text-left p-4">Özellik</th>
                                <th className="text-center p-4">🔑 Şifre</th>
                                <th className="text-center p-4">🚀 Passkey</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-4">
                            <tr className="border-b">
                                <td className="p-4 font-bold">Kırma Süresi</td>
                                <td className="p-4 text-center text-red-600">1 saniye</td>
                                <td className="p-4 text-center text-green-600">Milyarlarca yıl</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Phishing</td>
                                <td className="p-4 text-center text-red-600">✅ Kolay</td>
                                <td className="p-4 text-center text-green-600">❌ İmkansız</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Sızıntı Riski</td>
                                <td className="p-4 text-center text-red-600">✅ Yüksek</td>
                                <td className="p-4 text-center text-green-600">❌ Yok</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Hatırlamak</td>
                                <td className="p-4 text-center text-red-600">😰 Zor</td>
                                <td className="p-4 text-center text-green-600">😊 Gerekmiyor</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: "Cihaz Kaybı Senaryosu",
        subtitle: "En çok merak edilen konu",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-orange-600 mb-8">📱 Cihazım Kaybolursa?</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-green-300 mb-3">iPhone Kaybı</h3>
                        <ul className="text-gray-200 space-y-2">
                            <li>✅ Yeni iPhone al</li>
                            <li>✅ iCloud hesabıyla giriş</li>
                            <li>✅ Passkey'ler otomatik gelir</li>
                            <li>✅ Hiçbir şey kaybetmezsiniz</li>
                        </ul>
                    </div>
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-green-300 mb-3">Android Kaybı</h3>
                        <ul className="text-gray-200 space-y-2">
                            <li>✅ Yeni Android al</li>
                            <li>✅ Google hesabıyla giriş</li>
                            <li>✅ Password Manager'dan gelir</li>
                            <li>✅ Sync otomatik</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                        <AlertTriangle className="h-12 w-12 text-yellow-400 mb-4" />
                        <h3 className="text-xl font-bold text-yellow-300 mb-3">Windows Kaybı</h3>
                        <ul className="text-gray-200 space-y-2">
                            <li>❌ Sadece o PC'de saklanır</li>
                            <li>⚠️ Backup authentication gerekir</li>
                            <li>💡 Birden fazla cihazda kaydedin</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 7,
        title: "Canlı Demo",
        subtitle: "Gerçek WebAuthn deneyimi",
        content: (
            <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-600 mb-8">🎮 Demo Zamanı!</h2>
                <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-8 rounded-lg mb-8">
                    <Play className="h-24 w-24 text-blue-400 mx-auto mb-6" />
                    <p className="text-xl text-gray-200 mb-6">
                        Şimdi gerçek WebAuthn deneyimini görelim
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <Link
                            href="/demo"
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold block text-center"
                        >
                            Temel Demo
                        </Link>
                        <Link
                            href="/progressive-register"
                            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold block text-center"
                        >
                            Gelişmiş Demo
                        </Link>
                    </div>
                </div>
                <div className="text-left bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4">Demo Adımları:</h3>
                    <ol className="text-gray-200 space-y-2">
                        <li>1. Email adresi girin (demo@example.com)</li>
                        <li>2. "Passkey Oluştur" butonuna basın</li>
                        <li>3. TouchID/FaceID ile onaylayın</li>
                        <li>4. "Giriş Yap" ile tekrar deneyin</li>
                        <li>5. Sadece biyometrik doğrulama! 🎉</li>
                    </ol>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Sonraki Adımlar",
        subtitle: "Implementasyon yol haritası",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-purple-600 mb-8">🚀 Şifresiz Gelecek Burada!</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-300 mb-4">Hemen Yapılacaklar</h3>
                        <ul className="text-gray-200 space-y-3">
                            <li>1. 👥 <strong>Ekip Eğitimi</strong> - Bu demo ile takımı eğitin</li>
                            <li>2. 🔬 <strong>Pilot Proje</strong> - Küçük projede deneyin</li>
                            <li>3. 🧪 <strong>User Testing</strong> - Kullanıcı deneyimi test edin</li>
                        </ul>
                    </div>
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-300 mb-4">Uzun Vadeli</h3>
                        <ul className="text-gray-200 space-y-3">
                            <li>4. 🚀 <strong>Production</strong> - Ana ürününüze entegre edin</li>
                            <li>5. 📈 <strong>Metrics</strong> - Conversion rate'leri ölçün</li>
                            <li>6. 🔄 <strong>Iteration</strong> - Sürekli geliştirin</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4">📞 Destek Kaynakları</h3>
                    <div className="grid grid-cols-3 gap-4 text-gray-200">
                        <div>
                            <p className="font-bold">Teknik Dokümantasyon</p>
                            <p>WebAuthn Spec, SimpleWebAuthn</p>
                        </div>
                        <div>
                            <p className="font-bold">Platform Kılavuzları</p>
                            <p>Apple, Google, Microsoft</p>
                        </div>
                        <div>
                            <p className="font-bold">Community</p>
                            <p>GitHub, Stack Overflow</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
]

export default function Presentation() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide((prev) => prev + 1)
        }
    }

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1)
        }
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault()
                nextSlide()
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                prevSlide()
            } else if (e.key === 'Home') {
                e.preventDefault()
                goToSlide(0)
            } else if (e.key === 'End') {
                e.preventDefault()
                goToSlide(slides.length - 1)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [currentSlide])

    return (
        <>
            <Head>
                <title>WebAuthn Passkeys Sunumu</title>
                <meta name="description" content="WebAuthn ve Passkeys teknolojisi sunumu" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
                {/* Header */}
                <header className="bg-black bg-opacity-30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <Link href="/" className="flex items-center text-white hover:text-blue-300">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Ana Sayfa
                            </Link>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm opacity-75">
                                    {currentSlide + 1} / {slides.length}
                                </span>
                                <div className="flex space-x-1">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide
                                                ? 'bg-blue-400'
                                                : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Slide */}
                <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-200px)]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-12 shadow-2xl">
                            <div className="text-white">
                                {slides[currentSlide].content}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Navigation */}
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-6 py-3">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        <span className="text-sm font-medium px-4">
                            {slides[currentSlide].title}
                        </span>

                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Keyboard Navigation Help */}
                <div className="fixed bottom-4 right-4 text-xs opacity-50 bg-black bg-opacity-30 px-3 py-2 rounded">
                    <p>← → Space: Navigate | Home/End: First/Last</p>
                </div>
            </div>
        </>
    )
} 