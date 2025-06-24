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
                            <li>• <strong className="text-red-300">47%</strong> parola unuttuğu için satın almayı terk ediyor</li>
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
        title: "Passkey Nedir?",
        subtitle: "Temel tanım ve özellikler",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-blue-600 mb-8">🔑 Passkey Teknolojisi</h2>
                <div className="space-y-6">
                    <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-300 mb-4">Passkey Nedir?</h3>
                        <p className="text-lg text-gray-200 mb-4">
                            Passkey'ler, <strong className="text-blue-300">parola tabanlı kimlik doğrulamanın yerini alan</strong>,
                            WebAuthn standardı ve FIDO2 teknik özelliklerine dayanan güçlü ve kullanıcı dostu bir kimlik doğrulama yöntemidir.
                        </p>
                        <p className="text-lg text-gray-200">
                            Temelinde <strong className="text-green-300">açık anahtarlı kriptografi</strong> (public-key cryptography) bulunur.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-green-900 bg-opacity-20 border border-green-400 p-4 rounded-lg">
                            <h4 className="text-xl font-bold text-green-300 mb-3">🔐 Kriptografi Temeli</h4>
                            <div className="flex items-center justify-between">
                                <div className="text-center text-gray-200">
                                    <Lock className="h-12 w-12 text-red-400 mx-auto mb-2" />
                                    <p className="font-bold text-sm">Private Key</p>
                                    <p className="text-xs">Cihazınızda</p>
                                </div>
                                <div className="text-2xl text-white">+</div>
                                <div className="text-center text-gray-200">
                                    <Key className="h-12 w-12 text-green-400 mx-auto mb-2" />
                                    <p className="font-bold text-sm">Public Key</p>
                                    <p className="text-xs">Sunucuda</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900 bg-opacity-20 border border-purple-400 p-4 rounded-lg">
                            <h4 className="text-xl font-bold text-purple-300 mb-3">⚡ Temel Özellikler</h4>
                            <ul className="text-sm text-gray-200 space-y-1">
                                <li>• Biyometrik doğrulama</li>
                                <li>• Cihazlar arası senkronizasyon</li>
                                <li>• Cross-platform uyumluluk</li>
                                <li>• Bulut tabanlı yedekleme</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Passkey Nasıl Üretiliyor?",
        subtitle: "3 adımlı teknik süreç",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-green-600 mb-8">🔧 Passkey Üretim Süreci</h2>
                <div className="space-y-6">
                    <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-blue-300 mb-4">1️⃣ Sunucudan Challenge Talebi (Challenge Request)</h3>
                        <div className="text-gray-200">
                            <p className="mb-2">• Kullanıcının tarayıcısı, passkey oluşturma talebini web sitesinin sunucusuna iletir</p>
                            <p className="mb-2">• Sunucu, <strong className="text-yellow-300">kriptografik olarak rastgele bir challenge</strong> oluşturur</p>
                            <p>• Bu challenge, <strong className="text-red-300">saldırıların önlenmesi</strong> için kritik önem taşır</p>
                        </div>
                    </div>
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-green-300 mb-4">2️⃣ Anahtar Çifti Oluşturma (Key Pair Generation)</h3>
                        <div className="text-gray-200">
                            <p className="mb-2">• İstemci, <code className="bg-gray-800 px-2 py-1 rounded">navigator.credentials.create()</code> API'sini çağırır</p>
                            <p className="mb-2">• Cihazda bir <strong className="text-green-300">açık anahtar (public key)</strong> ve <strong className="text-red-300">özel anahtar (private key)</strong> çifti oluşturulur</p>
                            <p className="mb-2">• Özel anahtar, <strong className="text-blue-300">güvenli donanım modüllerinde</strong> saklanır</p>
                            <p>• Kullanıcıdan <strong className="text-purple-300">biyometrik doğrulama</strong> istenir</p>
                        </div>
                    </div>
                    <div className="bg-purple-900 bg-opacity-20 border border-purple-400 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-purple-300 mb-4">3️⃣ Açık Anahtarın Kayıt Edilmesi</h3>
                        <div className="text-gray-200">
                            <p className="mb-2">• Cihaz, <strong className="text-green-300">açık anahtarı</strong> ve <strong className="text-blue-300">özel anahtarla imzalanmış zorluğu</strong> sunucuya gönderir</p>
                            <p className="mb-2">• Sunucu, açık anahtarı <strong className="text-yellow-300">kullanıcının hesabı ile ilişkilendirir</strong></p>
                            <p>• Zorluğun <strong className="text-red-300">doğru imzalanıp imzalanmadığını</strong> açık anahtar ile doğrular</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Passkey'ler Nasıl Saklanıyor?",
        subtitle: "Güvenli depolama mekanizmaları",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-purple-600 mb-8">🔒 Güvenli Depolama</h2>
                <div className="space-y-6">
                    <div className="bg-red-900 bg-opacity-20 border border-red-400 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-red-300 mb-4">⚠️ Önemli: Özel Anahtar Hiçbir Zaman Sunucuda Saklanmaz!</h3>
                        <p className="text-lg text-gray-200">
                            Passkey'ler (özel anahtarlar) kesinlikle sunucularda saklanmaz.
                            Bu, <strong className="text-green-300">toplu veri ihlallerine karşı en büyük koruma</strong>dır.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-blue-300 mb-4">🔧 Donanım Güvenliği</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Shield className="h-8 w-8 text-blue-400 mr-3" />
                                    <div className="text-gray-200">
                                        <p className="font-bold">TPM (Trusted Platform Module)</p>
                                        <p className="text-sm">Windows ve Linux cihazlarda</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Lock className="h-8 w-8 text-green-400 mr-3" />
                                    <div className="text-gray-200">
                                        <p className="font-bold">Secure Enclave</p>
                                        <p className="text-sm">iOS ve macOS cihazlarda</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 mt-3">
                                    Bu modüller <strong className="text-yellow-300">kurcalamaya dayanıklı</strong> özel çiplerdir
                                </p>
                            </div>
                        </div>
                        <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-green-300 mb-4">🔐 Biyometrik Koruma</h3>
                            <div className="space-y-3">
                                <div className="text-gray-200">
                                    <p className="mb-2">• <strong className="text-blue-300">Parmak izi tanıma</strong></p>
                                    <p className="mb-2">• <strong className="text-purple-300">Yüz tanıma</strong></p>
                                    <p className="mb-2">• <strong className="text-yellow-300">PIN/Desen</strong> ile ek koruma</p>
                                </div>
                                <div className="bg-green-800 bg-opacity-30 p-3 rounded">
                                    <p className="text-sm text-green-200">
                                        <strong>Güvenlik:</strong> Cihaz çalınsa bile passkey kullanılamaz!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-purple-900 bg-opacity-20 border border-purple-400 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-purple-300 mb-4">☁️ Bulut Senkronizasyonu</h3>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <Smartphone className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                                <p className="font-bold text-blue-300">Apple iCloud</p>
                                <p className="text-sm text-gray-200">Anahtar Zinciri</p>
                            </div>
                            <div className="text-center">
                                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                                <p className="font-bold text-green-300">Google</p>
                                <p className="text-sm text-gray-200">Password Manager</p>
                            </div>
                            <div className="text-center">
                                <Lock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                                <p className="font-bold text-purple-300">Microsoft</p>
                                <p className="text-sm text-gray-200">Authenticator + Hesap</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-purple-800 bg-opacity-30 p-3 rounded">
                            <p className="text-sm text-purple-200">
                                <strong>🔐 Uçtan Uca Şifreleme:</strong> Hizmet sağlayıcısı dahi anahtarların içeriğine erişemez
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: "Güvenlik Mekanizmaları",
        subtitle: "Nasıl bu kadar güvenli?",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-red-600 mb-8">🛡️ Güvenlik Mekanizmaları</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-blue-300 mb-3">🔐 Açık Anahtarlı Kriptografi</h3>
                            <div className="text-gray-200 space-y-2">
                                <p>• Her giriş işleminde sunucunun <strong className="text-yellow-300">challenge'ını</strong> özel anahtar ile imzalanır</p>
                                <p>• Sunucu bu imzayı <strong className="text-green-300">açık anahtar ile doğrular</strong></p>
                                <p>• <strong className="text-red-300">Özel anahtar hiçbir zaman gönderilmez</strong></p>
                                <p>• Sunucu ihlali durumunda bile özel anahtarlar güvende</p>
                            </div>
                        </div>
                        <div className="bg-red-900 bg-opacity-20 border border-red-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-red-300 mb-3">🎯 Kimlik Avına Direnç</h3>
                            <div className="text-gray-200 space-y-2">
                                <p>• Passkey'ler <strong className="text-blue-300">belirli alan adı</strong> ile ilişkilidir</p>
                                <p>• Sahte (phishing) siteye yönlendirilseniz bile <strong className="text-green-300">passkey çalışmaz</strong></p>
                                <p>• Anahtar sadece <strong className="text-yellow-300">oluşturulduğu gerçek alan adı</strong> için geçerli</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-green-300 mb-3">🛠️ Donanım Güvenliği</h3>
                            <div className="text-gray-200 space-y-2">
                                <p>• <strong className="text-blue-300">TPM/Secure Enclave</strong> özel anahtarları fiziksel saldırılara karşı korur</p>
                                <p>• Anahtarın <strong className="text-red-300">yetkisiz kopyalanmasını</strong> zorlaştırır</p>
                                <p>• <strong className="text-purple-300">Kurcalamaya dayanıklı</strong> donanım modülleri</p>
                            </div>
                        </div>
                        <div className="bg-purple-900 bg-opacity-20 border border-purple-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-purple-300 mb-3">👤 Kullanıcı Doğrulaması</h3>
                            <div className="text-gray-200 space-y-2">
                                <p>• <strong className="text-green-300">Biyometrik veya PIN</strong> ile kullanıcı doğrulaması</p>
                                <p>• Cihaza fiziksel erişim sağlayan biri bile <strong className="text-yellow-300">passkey'i kullanamaz</strong></p>
                                <p>• <strong className="text-blue-300">Çok faktörlü güvenlik</strong> (cihaz + biyometrik)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">🔄 Ek Güvenlik Avantajları</h3>
                    <div className="grid grid-cols-3 gap-6 text-gray-200">
                        <div>
                            <p className="font-bold text-green-300">Replay Attack Koruması</p>
                            <p className="text-sm">Her işlemde benzersiz challenge</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-300">Veri İhlali Koruması</p>
                            <p className="text-sm">Sunucuda sadece public key</p>
                        </div>
                        <div>
                            <p className="font-bold text-purple-300">Toplu Saldırı Direnci</p>
                            <p className="text-sm">Merkezi parola veritabanı yok</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 7,
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
                                <td className="p-4 font-bold">Phishing Saldırısı</td>
                                <td className="p-4 text-center text-red-600">✅ Kolay</td>
                                <td className="p-4 text-center text-green-600">❌ İmkansız</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Veri İhlali Riski</td>
                                <td className="p-4 text-center text-red-600">✅ Yüksek</td>
                                <td className="p-4 text-center text-green-600">❌ Yok</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Replay Attack</td>
                                <td className="p-4 text-center text-red-600">✅ Mümkün</td>
                                <td className="p-4 text-center text-green-600">❌ Korumalı</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Hatırlamak</td>
                                <td className="p-4 text-center text-red-600">😰 Zor</td>
                                <td className="p-4 text-center text-green-600">😊 Gerekmiyor</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Cihaz Kaybı</td>
                                <td className="p-4 text-center text-red-600">🔓 Erişim riski</td>
                                <td className="p-4 text-center text-green-600">🔒 Biyometrik korumalı</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        id: 8,
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
                            <li>✅ Apple ID ile giriş yap</li>
                            <li>✅ iCloud Keychain'den otomatik gelir</li>
                            <li>✅ Hiçbir şey kaybetmezsiniz</li>
                        </ul>
                        <div className="mt-3 bg-blue-800 bg-opacity-30 p-2 rounded">
                            <p className="text-xs text-blue-200">
                                <strong>Gerekli:</strong> iOS 16+ ve iCloud Keychain aktif
                            </p>
                        </div>
                    </div>
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-green-300 mb-3">Android Kaybı</h3>
                        <ul className="text-gray-200 space-y-2">
                            <li>✅ Yeni Android al</li>
                            <li>✅ Google hesabıyla giriş yap</li>
                            <li>✅ Password Manager otomatik sync</li>
                            <li>⚠️ Bazen manuel sync gerekebilir</li>
                        </ul>
                        <div className="mt-3 bg-blue-800 bg-opacity-30 p-2 rounded">
                            <p className="text-xs text-blue-200">
                                <strong>Gerekli:</strong> Android 13+ ve Google Password Manager aktif
                            </p>
                        </div>
                    </div>
                    <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-green-300 mb-3">Windows Kaybı</h3>
                        <ul className="text-gray-200 space-y-2">
                            <li>✅ Yeni Windows PC al</li>
                            <li>✅ Microsoft hesabıyla giriş</li>
                            <li>✅ Microsoft Authenticator'dan gelir</li>
                            <li>✅ Bulut senkronizasyonu mevcut</li>
                        </ul>
                        <div className="mt-3 bg-blue-800 bg-opacity-30 p-2 rounded">
                            <p className="text-xs text-blue-200">
                                <strong>Not:</strong> Windows 11 22H2+ ve Microsoft hesabı gerekli
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 9,
        title: "Passkey Başarı İstatistikleri",
        subtitle: "Gerçek dünyadan veriler",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-green-600 mb-8">📊 Passkey'lerin Kanıtlanmış Başarısı</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-red-900 bg-opacity-20 border border-red-400 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-red-300 mb-4">🛡️ Güvenlik İstatistikleri</h3>
                            <div className="space-y-4">
                                <div className="bg-red-800 bg-opacity-30 p-4 rounded">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">Microsoft Deneyimi</span>
                                        <span className="text-3xl font-bold text-green-300">99.9%</span>
                                    </div>
                                    <p className="text-sm text-gray-200 mt-2">Phishing saldırıları ve hesap ele geçirme azalması</p>
                                </div>
                                <div className="bg-blue-800 bg-opacity-30 p-4 rounded">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">Veri İhlali Koruması</span>
                                        <span className="text-3xl font-bold text-green-300">100%</span>
                                    </div>
                                    <p className="text-sm text-gray-200 mt-2">Sunucuda private key saklanmadığı için tam koruma</p>
                                </div>
                                <div className="bg-purple-800 bg-opacity-30 p-4 rounded">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">Phishing Direnci</span>
                                        <span className="text-3xl font-bold text-green-300">∞</span>
                                    </div>
                                    <p className="text-sm text-gray-200 mt-2">Domain-specific çalışma, sahte sitelerde imkansız</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-green-300 mb-4">⚡ Performans İstatistikleri</h3>
                            <div className="space-y-4">
                                <div className="bg-green-800 bg-opacity-30 p-4 rounded">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">Google: Giriş Hızı</span>
                                        <span className="text-3xl font-bold text-blue-300">2x</span>
                                    </div>
                                    <p className="text-sm text-gray-200 mt-2">Parola + SMS OTP'ye göre daha hızlı</p>
                                </div>
                                <div className="bg-blue-800 bg-opacity-30 p-4 rounded">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">Başarı Oranı</span>
                                        <span className="text-3xl font-bold text-green-300">4x</span>
                                    </div>
                                    <p className="text-sm text-gray-200 mt-2">Geleneksel yöntemlere göre daha yüksek</p>
                                </div>
                                <div className="bg-yellow-800 bg-opacity-30 p-4 rounded">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">KAYAK: Süre Azalması</span>
                                        <span className="text-3xl font-bold text-green-300">50%</span>
                                    </div>
                                    <p className="text-sm text-gray-200 mt-2">Kayıt ve giriş sürelerinde iyileşme</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-blue-300 mb-4">🏢 Kurumsal Benimseme</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-300">87%</div>
                                    <p className="text-sm text-gray-200">İşletme passkey dağıtmış</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-300">95%</div>
                                    <p className="text-sm text-gray-200">GitHub 2FA artışı</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900 bg-opacity-20 border border-purple-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-purple-300 mb-4">👥 Kullanıcı Algısı</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-300">54%</div>
                                    <p className="text-sm text-gray-200">Daha kullanışlı buluyor</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-300">53%</div>
                                    <p className="text-sm text-gray-200">Daha güvenli buluyor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-yellow-900 bg-opacity-20 border border-yellow-400 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4">🌍 Yaygınlık ve Hazırlık</h3>
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-green-300">75%</div>
                            <p className="text-sm text-gray-200">Dünya geneli cihazlar passkey-ready</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-300">48%</div>
                            <p className="text-sm text-gray-200">En popüler 100 sitede destek</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-300">47%</div>
                            <p className="text-sm text-gray-200">Kullanıcı parola unuttuğu için satın almayı terk ediyor</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 10,
        title: "Passkey Kullanım Alanları",
        subtitle: "Authentication'dan Payment'a kadar",
        content: (
            <div>
                <h2 className="text-4xl font-bold text-purple-600 mb-8">🚀 Passkey'lerin Farklı Kullanım Alanları</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-blue-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">🔐 Kimlik Doğrulama (Authentication)</h3>
                            <div className="space-y-3">
                                <div className="bg-blue-800 bg-opacity-30 p-3 rounded">
                                    <h4 className="font-bold text-blue-200">Parolasız Giriş</h4>
                                    <p className="text-sm text-gray-200">Kullanıcı adı/şifre yerine sadece biyometrik doğrulama</p>
                                </div>
                                <div className="bg-green-800 bg-opacity-30 p-3 rounded">
                                    <h4 className="font-bold text-green-200">Daha Güçlü Güvenlik</h4>
                                    <p className="text-sm text-gray-200">FIDO standartları, phishing koruması, donanım güvenliği</p>
                                </div>
                                <div className="bg-purple-800 bg-opacity-30 p-3 rounded">
                                    <h4 className="font-bold text-purple-200">Çapraz Cihaz Desteği</h4>
                                    <p className="text-sm text-gray-200">iCloud, Google, 1Password ile senkronizasyon</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-900 bg-opacity-20 border border-yellow-400 p-4 rounded-lg">
                            <h4 className="text-lg font-bold text-yellow-300 mb-2">📈 Kullanım Örnekleri</h4>
                            <ul className="text-sm text-gray-200 space-y-1">
                                <li>• Web siteleri ve uygulamalara giriş</li>
                                <li>• Enterprise sistemler (SSO)</li>
                                <li>• Sosyal medya platformları</li>
                                <li>• E-devlet servisleri</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-green-900 bg-opacity-20 border border-green-400 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-green-300 mb-4">💳 Ödeme İşlemleri (Payment)</h3>
                            <div className="space-y-3">
                                <div className="bg-green-800 bg-opacity-30 p-3 rounded">
                                    <h4 className="font-bold text-green-200">Güvenli Kart Bilgisi Erişimi</h4>
                                    <p className="text-sm text-gray-200">Kart bilgilerini girmeden güvenli ödeme onayı</p>
                                </div>
                                <div className="bg-blue-800 bg-opacity-30 p-3 rounded">
                                    <h4 className="font-bold text-blue-200">"Kartsız" Güvenli Ödemeler</h4>
                                    <p className="text-sm text-gray-200">Sadece biyometrik onay ile ödeme tamamlama</p>
                                </div>
                                <div className="bg-purple-800 bg-opacity-30 p-3 rounded">
                                    <h4 className="font-bold text-purple-200">PSD2/SCA Uyumluluğu</h4>
                                    <p className="text-sm text-gray-200">Avrupa güçlü müşteri doğrulama standartları</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-900 bg-opacity-20 border border-red-400 p-4 rounded-lg">
                            <h4 className="text-lg font-bold text-red-300 mb-2">💰 Ödeme Avantajları</h4>
                            <ul className="text-sm text-gray-200 space-y-1">
                                <li>• Sahteciliği %90+ azaltır</li>
                                <li>• Ödeme süresini 3-5 saniyeye düşürür</li>
                                <li>• PCI-DSS uyumluluk yükünü azaltır</li>
                                <li>• Abandoned cart oranını düşürür</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 bg-gradient-to-r from-blue-900 to-green-900 bg-opacity-20 border border-blue-400 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">🌟 Gelecek Vizyonu</h3>
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl mb-2">🔒</div>
                            <p className="font-bold text-blue-300">Kimlik Doğrulama</p>
                            <p className="text-sm text-gray-200">Parolasız dijital kimlik</p>
                        </div>
                        <div>
                            <div className="text-3xl mb-2">💳</div>
                            <p className="font-bold text-green-300">Ödeme Sistemleri</p>
                            <p className="text-sm text-gray-200">Tek dokunuşla güvenli ödeme</p>
                        </div>
                        <div>
                            <div className="text-3xl mb-2">🌐</div>
                            <p className="font-bold text-purple-300">IoT & Web3</p>
                            <p className="text-sm text-gray-200">Her cihazda güvenli erişim</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 11,
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
        id: 12,
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