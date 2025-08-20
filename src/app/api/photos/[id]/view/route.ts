import { NextRequest, NextResponse } from 'next/server'
import { readFile, unlink } from 'fs/promises'
import { join } from 'path'
import { supabase } from '@/lib/supabase'

// Fotoğrafların saklanacağı dizin
const UPLOAD_DIR = join(process.cwd(), 'uploads')

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Supabase'den fotoğraf bilgilerini çek
    const { data: photoData, error: fetchError } = await supabase
      .from('photos')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !photoData) {
      return NextResponse.json(
        { message: 'Fotoğraf bulunamadı' },
        { status: 404 }
      )
    }

    // Fotoğrafın durumunu kontrol et
    if (!photoData.status) {
      return NextResponse.json(
        { message: 'Bu fotoğraf artık görüntülenemez' },
        { status: 410 } // Gone - artık mevcut değil
      )
    }

    // Fotoğraf dosyasını oku
    const photoFilePath = join(UPLOAD_DIR, photoData.filename)
    let photoBuffer
    
    try {
      photoBuffer = await readFile(photoFilePath)
    } catch (error) {
      return NextResponse.json(
        { message: 'Fotoğraf dosyası bulunamadı' },
        { status: 404 }
      )
    }

    // Görüntüleme sayısını artır ve status'u false yap
    const { error: updateError } = await supabase
      .from('photos')
      .update({ 
        view_count: photoData.view_count + 1,
        status: false // Artık görüntülenemez
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating photo:', updateError)
    }

    // Fotoğraf bilgilerini döndür
    return NextResponse.json({
      message: 'Fotoğraf başarıyla görüntülendi',
      photo: {
        id: photoData.id,
        filename: photoData.filename,
        originalName: photoData.original_name,
        size: photoData.size,
        uploadedAt: photoData.uploaded_at,
        imageData: photoBuffer.toString('base64'),
        mimeType: getMimeType(photoData.filename)
      }
    })
    
  } catch (error) {
    console.error('Error viewing photo:', error)
    return NextResponse.json(
      { message: 'Fotoğraf görüntülenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Dosya uzantısına göre MIME türünü belirle
function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'gif':
      return 'image/gif'
    case 'webp':
      return 'image/webp'
    default:
      return 'image/jpeg'
  }
}
