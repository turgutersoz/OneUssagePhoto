import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('photo') as File
    
    if (!file) {
      return NextResponse.json(
        { message: 'Fotoğraf dosyası bulunamadı' },
        { status: 400 }
      )
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Sadece resim dosyaları kabul edilir' },
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Dosya boyutu 10MB\'dan küçük olmalıdır' },
        { status: 400 }
      )
    }

    const fileId = uuidv4()
    const fileExtension = file.name.split('.').pop()
    const filename = `${fileId}.${fileExtension}`

    // Dosyayı Base64'e çevir
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')

    // Supabase'e fotoğraf bilgilerini kaydet
    const { data: photoData, error: dbError } = await supabase
      .from('photos')
      .insert([
        {
          id: fileId,
          filename,
          original_name: file.name,
          size: file.size,
          status: true,
          view_count: 0,
          image_data: base64Data, // Base64 veriyi sakla
          mime_type: file.type
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
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
