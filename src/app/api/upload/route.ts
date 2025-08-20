import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'

// Fotoğrafların saklanacağı dizin
const UPLOAD_DIR = join(process.cwd(), 'uploads')

export async function POST(request: NextRequest) {
  try {
    // Uploads dizinini oluştur
    await mkdir(UPLOAD_DIR, { recursive: true })

    const formData = await request.formData()
    const file = formData.get('photo') as File

    if (!file) {
      return NextResponse.json(
        { message: 'Fotoğraf dosyası bulunamadı' },
        { status: 400 }
      )
    }

    // Dosya türünü kontrol et
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Sadece resim dosyaları kabul edilir' },
        { status: 400 }
      )
    }

    // Dosya boyutunu kontrol et (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Dosya boyutu 10MB\'dan küçük olmalıdır' },
        { status: 400 }
      )
    }

    // Benzersiz dosya adı oluştur
    const fileId = uuidv4()
    const fileExtension = file.name.split('.').pop()
    const filename = `${fileId}.${fileExtension}`
    const filePath = join(UPLOAD_DIR, filename)

    // Dosyayı kaydet
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Supabase'e fotoğraf bilgilerini kaydet
    const { data: photoData, error: dbError } = await supabase
      .from('photos')
      .insert([
        {
          id: fileId,
          filename,
          original_name: file.name,
          size: file.size,
          status: true, // Başlangıçta görüntülenebilir
          view_count: 0
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Dosyayı sil
      try {
        await writeFile(filePath, '')
      } catch (error) {
        console.error('Error deleting file:', error)
      }
      
      return NextResponse.json(
        { message: 'Veritabanı hatası oluştu' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Fotoğraf başarıyla yüklendi',
      id: fileId,
      filename,
      originalName: file.name
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Fotoğraf yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
