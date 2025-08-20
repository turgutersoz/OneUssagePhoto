# Kullanımlık Fotoğraf Yükleme Uygulaması

Bu uygulama, Next.js ve Supabase kullanılarak geliştirilmiş güvenli fotoğraf paylaşım platformudur. Kullanıcılar fotoğraf yükleyebilir ve her fotoğraf için benzersiz bir bağlantı oluşturulur. Bu bağlantı bir kez tıklandığında fotoğraf artık görüntülenemez hale gelir.

## Özellikler

- 🖼️ **Güvenli Fotoğraf Yükleme**: Sadece resim dosyaları kabul edilir
- 🔗 **Benzersiz Bağlantılar**: Her fotoğraf için UUID tabanlı benzersiz link
- 🚫 **Tek Kullanımlık**: Fotoğraf bir kez görüntülendikten sonra erişilemez
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu arayüz
- 🌙 **Dark/Light Tema**: Otomatik tema desteği
- 📊 **Fotoğraf Yönetimi**: Yüklenen fotoğrafları listeleme ve silme
- 📋 **Link Kopyalama**: Paylaşım linklerini kolayca kopyalama
- 🎯 **Modern UI**: Toast notification'lar ve modal'lar
- 🗄️ **Supabase Veritabanı**: Güvenli ve ölçeklenebilir veri saklama

## Teknolojiler

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **File Handling**: Node.js fs/promises
- **UUID Generation**: uuid paketi
- **Icons**: Heroicons

## Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd OneUssagePhoto
npm install
```

### 2. Supabase Kurulumu
1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. SQL Editor'da `supabase-schema.sql` dosyasındaki kodu çalıştırın
4. Project Settings > API'den URL ve anon key'i alın

### 3. Environment Değişkenleri
`.env.local` dosyasını oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Uygulamayı Başlatın
```bash
npm run dev
```

### 5. Tarayıcınızda Açın
```
http://localhost:3000
```

## Kullanım

### Fotoğraf Yükleme
1. Ana sayfada fotoğraf yükleme alanına tıklayın veya dosyayı sürükleyin
2. Desteklenen formatlar: PNG, JPG, GIF, WebP
3. Maksimum dosya boyutu: 10MB
4. Yükleme tamamlandığında paylaşım linki otomatik olarak kopyalanır

### Fotoğraf Paylaşımı
1. Yüklenen fotoğraflar ana sayfada listelenir
2. "Link Kopyala" butonuna tıklayarak paylaşım linkini kopyalayın
3. Linki başkalarıyla paylaşın

### Fotoğraf Görüntüleme
1. Paylaşılan linke tıklandığında fotoğraf görüntülenir
2. Fotoğraf bir kez görüntülendikten sonra status false olur
3. Tekrar erişim denemelerinde "Bu fotoğraf artık görüntülenemez" mesajı gösterilir

## Veritabanı Şeması

### Photos Tablosu
```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  size BIGINT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  status BOOLEAN DEFAULT TRUE, -- true: görüntülenebilir, false: görüntülenemez
  user_id UUID, -- gelecekte kullanıcı sistemi için
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

- `POST /api/upload` - Fotoğraf yükleme
- `GET /api/photos` - Tüm fotoğrafları listeleme
- `GET /api/photos/[id]/view` - Fotoğraf görüntüleme (status false yapar)
- `DELETE /api/photos/[id]` - Fotoğraf silme

## Dosya Yapısı

```
src/
├── app/
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── photos/
│   │       ├── route.ts
│   │       └── [id]/
│   │           ├── route.ts
│   │           └── view/
│   │               └── route.ts
│   ├── photo/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── PhotoUploader.tsx
│   ├── PhotoList.tsx
│   ├── Toast.tsx
│   ├── ToastContainer.tsx
│   ├── ToastProvider.tsx
│   └── ConfirmModal.tsx
├── lib/
│   └── supabase.ts
uploads/          # Yüklenen fotoğraflar (otomatik oluşturulur)
```

## Güvenlik Özellikleri

- Sadece resim dosyaları kabul edilir
- Dosya boyutu sınırlaması (10MB)
- Benzersiz dosya adları (UUID)
- Supabase RLS (Row Level Security)
- Status tabanlı erişim kontrolü

## Toast Notification Sistemi

### Toast Türleri
- **🟢 Success**: Başarılı işlemler
- **🔴 Error**: Hata durumları
- **🟡 Warning**: Uyarı mesajları
- **🔵 Info**: Bilgi mesajları

### Kullanım
```typescript
const { showSuccess, showError, showWarning, showInfo } = useToastContext()

showSuccess('Başarılı!', 'İşlem tamamlandı')
showError('Hata!', 'Bir hata oluştu')
```

## Geliştirme

### Yeni Özellik Ekleme
1. Gerekli bileşenleri `src/components/` dizinine ekleyin
2. API route'ları `src/app/api/` dizinine ekleyin
3. Sayfa bileşenlerini `src/app/` dizinine ekleyin
4. Veritabanı şemasını `supabase-schema.sql`'de güncelleyin

### Stil Değişiklikleri
- Tailwind CSS kullanarak `src/app/globals.css` dosyasını düzenleyin
- Bileşenlere doğrudan Tailwind sınıfları ekleyin

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Destek

Herhangi bir sorun yaşarsanız, lütfen GitHub Issues bölümünde bildirin.
