# 📖 WebAuthn Passkeys Demo - Basit Açıklama

Bu proje **WebAuthn Passkeys Demo** adında bir eğitim projesi. İşte hiç bilmeyen birine anlatır gibi özeti:

## 🤔 Bu proje ne amaçla yapılmış?

Bu proje, **"şifresiz gelecek"** teknolojisini ekibinize öğretmek için hazırlanmış bir eğitim materyali. Yani artık kullanıcıların "123456" gibi zayıf şifreler kullanması veya şifrelerini unutması gibi sorunları çözen yeni teknoloji.

## 🔐 Passkey nedir, ne yapıyor?

Basitçe:
- **Eskiden:** Kullanıcı → Şifre yazar → Sisteme giriş yapar
- **Şimdi:** Kullanıcı → Parmak izi/yüz tanıma → Sisteme giriş yapar

Passkey'ler telefonunuzdaki parmak izi okuyucu, MacBook'taki TouchID, ya da yüz tanıma gibi **biyometrik** özelliklerle çalışır.

## 🏗️ Proje nasıl çalışıyor?

### Teknoloji Yığını:
- **Next.js 14** (React tabanlı web framework)
- **TypeScript** (JavaScript'in tip güvenli versiyonu) 
- **Tailwind CSS** (modern UI tasarımı için)
- **SimpleWebAuthn** (WebAuthn implementasyonu)

### Proje Yapısı:
```
📁 pages/           → Web sayfaları (ana sayfa, demo sayfaları)
📁 components/      → Tekrar kullanılabilir UI parçaları
📁 lib/            → WebAuthn iş mantığı
📁 api/            → Backend fonksiyonları (kayıt/giriş)
📁 sunum/          → Sunum materyalleri
```

## 💾 Passkey'ler nerede saklanıyor?

**Şu anda (Geliştirme aşamasında):**
- Basit **in-memory storage** (RAM'de geçici olarak)
- Server restart edilince kaybolur
- Sadece test amaçlı

**Production'da olacak:**
- Gerçek **database** (PostgreSQL, MongoDB vb.)
- Kalıcı saklama
- Güvenli encryption

### Detay:
- Passkey bilgileri `lib/webauthn-storage.ts` dosyasında yönetiliyor
- Her kullanıcının birden fazla passkey'i olabilir
- Credential ID, public key, counter gibi bilgiler saklanıyor

## 🎯 Demo'da neler var?

Proje **3 farklı demo** içeriyor:

1. **Temel Demo** (`/demo`): 
   - Basit kayıt/giriş işlemi
   - Passkey oluşturma

2. **Progressive Demo** (`/progressive-register`):
   - Daha gelişmiş kayıt süreci
   - Adım adım UI

3. **Dashboard** (`/dashboard`):
   - Kullanıcı yönetimi
   - Çoklu passkey yönetimi

## 🎤 Sunum Materyalleri

```
📁 sunum/
├── webauthn-sunum.md    → Ana sunum dökümanı
└── demo-senaryosu.md    → Demo adımları kılavuzu
```

Ekibe sunum yaparken bu dökümanları kullanabilirsiniz.

## 🚀 Nasıl çalıştırılır?

```bash
npm install    # Bağımlılıkları yükle
npm run dev    # Geliştirme sunucusunu başlat
```

Sonra `http://localhost:3000` adresine gidip demo'yu test edebilirsiniz.

## 📱 Hangi cihazlarda çalışır?

- **iPhone:** TouchID, FaceID
- **Android:** Parmak izi, yüz tanıma  
- **Mac:** TouchID
- **Windows:** Windows Hello
- **Hardware:** YubiKey gibi fiziksel anahtarlar

---

**Özetle:** Bu proje, şifresiz kimlik doğrulama teknolojisini ekibinize öğretmek için hazırlanmış kapsamlı bir eğitim materyali. Modern güvenlik standartlarını pratik örneklerle gösteriyor. 