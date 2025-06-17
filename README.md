# 🔐 WebAuthn Passkeys Demo & Sunum

Bu proje, WebAuthn ve Passkeys teknolojisini ekibinize tanıtmak için hazırlanmış kapsamlı bir demo ve sunum materyali içerir.

## 📁 Proje İçeriği

```
webauthn-passkeys-demo/
├── 📋 sunum/               # Sunum materyalleri
│   ├── webauthn-sunum.md  # Ana sunum dökümanı
│   └── demo-senaryosu.md  # Demo adımları
├── 🚀 pages/              # Next.js sayfaları
├── 🧩 components/         # React bileşenleri
├── 📚 lib/               # WebAuthn helper'ları
├── 🔌 api/               # Backend API endpoints
└── 📖 docs/              # Dokümantasyon
```

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

### 3. Demo'yu Açın
Tarayıcınızda http://localhost:3000 adresine gidin.

## 🎯 Demo Senaryoları

### 1. Temel Kayıt (Registration)
- Kullanıcı adı/email ile kayıt
- Passkey oluşturma
- Biometric doğrulama

### 2. Giriş (Authentication)
- Sadece passkey ile giriş
- Cross-device authentication
- Conditional UI demo

### 3. Gelişmiş Özellikler
- Multiple passkeys
- Device management
- Fallback options

## 🔧 Teknik Gereksinimler

- Node.js 16+
- Modern tarayıcı (Chrome 67+, Firefox 60+, Safari 14+)
- HTTPS (production için)
- Desteklenen authenticator (TouchID, FaceID, Windows Hello, vb.)

## 📱 Desteklenen Platformlar

- ✅ iOS 16+ (TouchID, FaceID)
- ✅ Android 9+ (Fingerprint, Face unlock)
- ✅ Windows 10+ (Windows Hello)
- ✅ macOS (TouchID)
- ✅ Hardware keys (YubiKey, vb.)

## 🎤 Sunum Yapma

1. `sunum/webauthn-sunum.md` dosyasını inceleyin
2. `demo-senaryosu.md` adımlarını takip edin
3. Canlı demo için localhost:3000'i kullanın

## 🔍 Önemli Notlar

- Demo localhost'ta çalışır (WebAuthn geliştirme için)
- Production'da HTTPS zorunlu
- Her platform farklı UX deneyimi sunar
- Fallback authentication önemli

## 📚 Kaynaklar

- [WebAuthn Specification](https://www.w3.org/TR/webauthn/)
- [SimpleWebAuthn Documentation](https://simplewebauthn.dev/)
- [Passkeys Developer Guide](https://developers.google.com/identity/passkeys)

---

**Demo Hazırlığı:** Sunum öncesi demo'yu test edin ve farklı cihazlarda deneyin! 