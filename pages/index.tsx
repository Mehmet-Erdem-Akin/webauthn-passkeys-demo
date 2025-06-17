import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Shield, Key, Smartphone, Globe, ArrowRight, FormInput } from 'lucide-react'

export default function Home() {
    const [features] = useState([
        {
            icon: Shield,
            title: 'Güvenli Kimlik Doğrulama',
            description: 'Passkeys ile şifresiz, phishing-resistant authentication'
        },
        {
            icon: Smartphone,
            title: 'Biyometrik Doğrulama',
            description: 'TouchID, FaceID, Windows Hello ile hızlı giriş'
        },
        {
            icon: Key,
            title: 'Cross-Device Sync',
            description: 'Apple Keychain, Google Password Manager ile senkronizasyon'
        },
        {
            icon: Globe,
            title: 'Evrensel Standart',
            description: 'W3C WebAuthn ve FIDO2 standardlarına uyumlu'
        }
    ])

    return (
        <>
            <Head>
                <title>WebAuthn Passkeys Demo</title>
                <meta name="description" content="WebAuthn ve Passkeys teknolojisi demo uygulaması" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <Shield className="h-8 w-8 text-blue-600" />
                                <h1 className="ml-2 text-2xl font-bold text-gray-900">WebAuthn Demo</h1>
                            </div>
                            <nav className="flex space-x-8">
                                <Link href="/demo" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Temel Demo
                                </Link>
                                <Link href="/progressive-register" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Progressive Demo
                                </Link>
                                <Link href="/presentation" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Sunum
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            <span className="text-blue-600">Passkeys</span> ile
                            <br />
                            Şifresiz Geleceğe
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            WebAuthn teknolojisi ile güvenli, hızlı ve kullanıcı dostu kimlik doğrulama deneyimi.
                            Artık şifre hatırlamaya gerek yok!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/demo"
                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Temel Demo
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/progressive-register"
                                className="inline-flex items-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                            >
                                <FormInput className="mr-2 h-5 w-5" />
                                Progressive Demo
                            </Link>
                            <Link
                                href="/presentation"
                                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Sunum İzle
                            </Link>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-24 bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Hazır mısınız?
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            WebAuthn ve Passkeys teknolojisini farklı senaryolarla deneyimleyin
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/demo"
                                className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Temel Demo
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </Link>
                            <Link
                                href="/progressive-register"
                                className="inline-flex items-center px-8 py-3 border border-blue-600 text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                            >
                                <FormInput className="mr-2 h-6 w-6" />
                                Progressive Demo
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center text-gray-600">
                            <p>&copy; 2024 WebAuthn Passkeys Demo. Ekip eğitimi için hazırlanmıştır.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
} 