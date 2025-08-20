import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
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
        imageData: photoData.image_data, // Base64 data
        mimeType: photoData.mime_type || 'image/jpeg'
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
