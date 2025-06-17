# 🎮 WebAuthn Demo Senaryosu

## 📋 Sunum Öncesi Hazırlık Checklist

### Teknik Hazırlık
- [ ] **localhost:3000** açık ve çalışıyor
- [ ] **Chrome/Safari güncel** sürümde
- [ ] **TouchID/FaceID** aktif ve test edilmiş
- [ ] **iCloud Keychain** açık (macOS/iOS)
- [ ] **Demo sayfası** test edilmiş
- [ ] **İnternet bağlantısı** stabil

### Sunum Hazırlığı
- [ ] **Projektör/ekran** test edilmiş
- [ ] **Demo sayfası** projeksiyonda görünüyor
- [ ] **Backup cihaz** hazır (telefon)
- [ ] **Timeline** gözden geçirilmiş (15 dk)

---

## 🚀 Demo Senaryosu (15 dakika)

### Senaryo 1: WebAuthn Desteği Kontrolü (1 dk)

**Ekranda göster:**
```
✅ WebAuthn destekleniyor
```

**Anlatım:**
> "Gördüğünüz gibi, modern tarayıcımız WebAuthn'yi destekliyor. Bu, şifresiz kimlik doğrulama için gerekli temel altyapıya sahip olduğumuz anlamına geliyor."

---

### Senaryo 2: Passkey Kaydı (5 dk)

#### Adım 1: Kayıt Başlangıcı
**Ekranda göster:** Ana demo sayfası

**Yapılacaklar:**
1. **"Yeni Kayıt"** butonuna tıkla
2. **Kullanıcı adı gir:** `demo@example.com`

**Anlatım:**
> "Şimdi geleneksel bir kayıt işlemini simüle edeceğiz. Ancak şifre girmek yerine, sadece kullanıcı adımızı giriyoruz ve passkey oluşturacağız."

#### Adım 2: Passkey Oluşturma
**Yapılacaklar:**
1. **"Passkey Oluştur"** butonuna tıkla
2. **TouchID/FaceID** ile doğrula

**Anlatım:**
> "Şimdi cihazımızın biyometrik özelliğini kullanarak passkey oluşturuyoruz. Bu işlem sırasında:
> - Cihazda bir private key oluşturuluyor
> - Public key server'a gönderiliyor
> - Private key hiçbir zaman cihazdan çıkmıyor"

**Beklenen sonuç:**
```
✅ Başarılı! 
Kullanıcı: demo@example.com
İşlem: Passkey kaydı
Durum: Başarılı ✅
```

#### Adım 3: Arkasında Ne Oluyor?
**Anlatım:**
> "Bu işlem sırasında arka planda:
> 1. Browser, authenticator'dan (TouchID) key pair oluşturmasını istedi
> 2. Public key server'a kaydedildi
> 3. Private key güvenli olarak cihazda saklandı
> 4. Kullanıcı artık bu site için passkey'e sahip"

---

### Senaryo 3: Şifresiz Giriş (5 dk)

#### Adım 1: Demo Sıfırlama
**Yapılacaklar:**
1. **"Yeniden Dene"** butonuna tıkla
2. Ana sayfaya dön

**Anlatım:**
> "Şimdi kayıt işlemimizi tamamladığımıza göre, şifresiz giriş deneyimini gösterelim."

#### Adım 2: Giriş İşlemi
**Yapılacaklar:**
1. **"Giriş Yap"** butonuna tıkla
2. **TouchID/FaceID** ile doğrula

**Anlatım:**
> "Dikkat edin - hiçbir kullanıcı adı veya şifre girmedik. Sadece 'Giriş Yap' dedik ve cihazımız otomatik olarak:
> - Bu site için kayıtlı passkey'i buldu
> - Biyometrik doğrulama istedi
> - Authentication işlemini tamamladı"

**Beklenen sonuç:**
```
✅ Başarılı!
Kullanıcı: Demo Kullanıcı  
İşlem: Passkey doğrulaması
Durum: Başarılı ✅
```

---

### Senaryo 4: Cross-Device Demo (isteğe bağlı - 3 dk)

#### Eğer Zaman Varsa
**Yapılacaklar:**
1. **Telefonda** aynı siteyi aç
2. **QR kod** senaryosunu göster
3. **Cross-device** authentication

**Anlatım:**
> "Passkeys'in güzel yanı, farklı cihazlar arasında sync olması. iPhone'umda kaydettiğim passkey, Mac'imde de çalışıyor."

---

### Senaryo 5: Teknik Detaylar (1 dk)

**Ekranda göster:** Demo bilgileri paneli

**Anlatım:**
> "Demo hakkında önemli notlar:
> - Bu simüle edilmiş işlemler gerçek WebAuthn protokolünü taklit ediyor
> - Production'da HTTPS zorunlu
> - Her platform farklı UX deneyimi sunabilir
> - Fallback authentication seçenekleri önemli"

---

## 🔧 Muhtemel Sorunlar ve Çözümler

### Problem 1: TouchID/FaceID Çalışmıyor
**Çözüm:**
- Sistem Preferences > Touch ID kontrol et
- Chrome://settings/content/biometricAuthentication aktif mi?
- Backup olarak hardware key kullan

### Problem 2: WebAuthn Desteklenmiyor  
**Çözüm:**
- Chrome güncel sürüm kullan
- Farklı browser dene
- Feature detection'ı göster

### Problem 3: Demo Yanıt Vermiyor
**Çözüm:**
- Sayfayı yenile (F5)
- Developer Console kontrol et
- Backup demo URL'i kullan

---

## 🎯 Demo Sonrası Sorular

### Beklenen Sorular ve Cevaplar

**Q: Bu güvenli mi? Private key nerede?**
A: Private key cihazınızın güvenli alanında (Secure Enclave, TPM) saklanıyor. Hiçbir zaman dışarı çıkmıyor.

**Q: Cihaz kaybedilirse ne olur?**
A: Passkeys cloud'da sync ediliyor. Yeni cihazda Apple ID/Google hesabıyla giriş yaptığınızda otomatik restore.

**Q: Eski kullanıcılar için ne olacak?**
A: Progressive enhancement. Eski sistemler şifre kullanmaya devam ederken, yeni kullanıcılar passkey kullanabilir.

**Q: Enterprise ortamda nasıl yönetilir?**
A: MDM policies, Azure AD entegrasyonu ve grup yönetimi mevcut.

**Q: Performans etkisi?**
A: Minimal. Cryptographic işlemler hardware-accelerated ve çok hızlı.

---

## 📊 Demo Timing

| Senaryo | Süre | Toplam |
|---------|------|--------|
| Destek kontrolü | 1 dk | 1 dk |
| Passkey kaydı | 5 dk | 6 dk |
| Şifresiz giriş | 5 dk | 11 dk |
| Cross-device (opsiyonel) | 3 dk | 14 dk |
| Teknik detaylar | 1 dk | 15 dk |

---

## 💡 Demo Sunum İpuçları

### Sunum Sırasında
- **Yavaş hareket et** - İzleyiciler takip edebilsin
- **Her adımı açıkla** - "Şimdi TouchID'ye dokunuyorum"
- **Bekle** - Biyometrik doğrulama zaman alabilir
- **Hatalar normal** - Canlı demo, beklenmedik durumlar olabilir

### Etkili Anlatım
- **Karşılaştır** - "Şifre girmek yerine..."
- **Vurgula** - "Hiçbir şifre hatırlamıyoruz"
- **Tekrarla** - Ana mesajları birkaç kez söyle
- **İzleyicileri dahil et** - "Kim iPhone kullanıyor?"

---

**🎯 Demo sonunda:** Sorular, tartışma ve implementation planı için zaman ayır!

*Bu doküman demo sırasında referans olarak kullanılabilir.* 