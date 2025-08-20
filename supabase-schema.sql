-- Photos tablosu oluştur
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  size BIGINT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  status BOOLEAN DEFAULT TRUE, -- true: görüntülenebilir, false: görüntülenemez
  user_id UUID, -- gelecekte kullanıcı sistemi için
  image_data TEXT, -- Base64 encoded image data
  mime_type TEXT, -- MIME type (image/jpeg, image/png, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler oluştur
CREATE INDEX idx_photos_status ON photos(status);
CREATE INDEX idx_photos_uploaded_at ON photos(uploaded_at DESC);
CREATE INDEX idx_photos_user_id ON photos(user_id);

-- RLS (Row Level Security) etkinleştir
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Tüm kullanıcıların fotoğrafları okuyabilmesi için policy
CREATE POLICY "Photos are viewable by everyone" ON photos
  FOR SELECT USING (true);

-- Tüm kullanıcıların fotoğraf ekleyebilmesi için policy
CREATE POLICY "Photos are insertable by everyone" ON photos
  FOR INSERT WITH CHECK (true);

-- Tüm kullanıcıların fotoğraf güncelleyebilmesi için policy
CREATE POLICY "Photos are updatable by everyone" ON photos
  FOR UPDATE USING (true);

-- Tüm kullanıcıların fotoğraf silebilmesi için policy
CREATE POLICY "Photos are deletable by everyone" ON photos
  FOR DELETE USING (true);

-- updated_at alanını otomatik güncellemek için trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_photos_updated_at
  BEFORE UPDATE ON photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
