import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { supabase } from '@/lib/supabase'

// Fotoğrafların saklanacağı dizin
const UPLOAD_DIR = join(process.cwd(), 'uploads')

export async function DELETE(
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
    
    // Fotoğraf dosyasını sil
    const photoFilePath = join(UPLOAD_DIR, photoData.filename)
    
    try {
      await unlink(photoFilePath)
    } catch (error) {
      console.error('Error deleting photo file:', error)
    }
    
    // Supabase'den fotoğraf kaydını sil
    const { error: deleteError } = await supabase
      .from('photos')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting from database:', deleteError)
      return NextResponse.json(
        { message: 'Veritabanından silinirken hata oluştu' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      message: 'Fotoğraf başarıyla silindi'
    })
    
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json(
      { message: 'Fotoğraf silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
