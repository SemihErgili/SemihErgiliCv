# 🚀 İnteraktif & AI Destekli CV Portföyü

Bu proje, Next.js, Tailwind CSS ve ShadCN UI kullanılarak oluşturulmuş, modern ve tamamen özelleştirilebilir bir interaktif CV portföyüdür. Google'ın Genkit'i ile entegre edilmiş yapay zeka destekli bir CV özelleştirme özelliği içerir.

![Proje Ekran Görüntüsü](https://placehold.co/800x400.png)
*Projenin canlı halinden bir ekran görüntüsü ekleyebilirsiniz.*

## ✨ Temel Özellikler

- **📝 Tamamen Yönetilebilir İçerik:** Tüm metinleri, projeleri, deneyimleri ve yetenekleri şifre korumalı bir admin panelinden düzenleyin.
- **🤖 AI ile CV Özelleştirme:** Ziyaretçiler, bir iş tanımına göre profilinizi anında özelleştirilmiş bir formatta görüntüleyebilir. Bu özellik, adayın belirli bir pozisyona uygunluğunu vurgular.
- **🐱 Dinamik GitHub Projeleri:** Projeler bölümü, belirttiğiniz GitHub kullanıcısının herkese açık depolarından otomatik olarak çekilir ve yıldız sayısına göre sıralanır.
- **🎨 Modern ve Duyarlı Tasarım:** Next.js, Tailwind CSS ve ShadCN UI ile oluşturulmuş şık ve tüm cihazlarla uyumlu bir arayüz.
- **🔒 Güvenli:** Admin giriş bilgileri ve API anahtarları, çevre değişkenleri (`.env.local`) kullanılarak güvende tutulur.

## 🛠️ Kullanılan Teknolojiler

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Stil:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Kütüphanesi:** [ShadCN UI](https://ui.shadcn.com/)
- **Yapay Zeka:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Form Yönetimi:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Başlarken

Bu projeyi kendi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin.

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/KULLANICI_ADINIZ/PROJE_ADINIZ.git
cd PROJE_ADINIZ
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarlayın

Projenin çalışması için bazı çevre değişkenlerini ayarlamanız gerekmektedir. `.env` dosyasını kopyalayarak `.env.local` adında yeni bir dosya oluşturun:

```bash
cp .env .env.local
```

Şimdi `.env.local` dosyasını açın ve aşağıdaki değişkenleri kendi bilgilerinizle doldurun:

```env
# Admin paneli için giriş bilgileri
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin

# Google AI (Gemini) API Anahtarı
# https://aistudio.google.com/app/apikey adresinden alabilirsiniz.
GEMINI_API_KEY=YAPAY_ZEKA_API_ANAHTARINIZ
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:9002](http://localhost:9002) adresini açarak projeyi görüntüleyebilirsiniz.

## 🎛️ Admin Paneli

İçeriği yönetmek için `/admin` yolunu ziyaret edin (örn: `http://localhost:9002/admin`). Giriş yapmak için `.env.local` dosyasında belirlediğiniz e-posta ve şifreyi kullanın.

Panel üzerinden aşağıdaki sayfaların içeriğini düzenleyebilirsiniz:
- Hakkımda
- Deneyim
- Projeler (GitHub kullanıcı adı)
- Yetenekler
- İletişim

## 🤝 Katkıda Bulunma

Katkılarınız projeyi daha da ileriye taşıyacaktır! Lütfen bir "pull request" açmaktan veya "issue" oluşturmaktan çekinmeyin.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
