import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()
    
    // Supabase'de fotoğraf durumunu güncelle
    const { data: photoData, error: updateError } = await supabase
      .from('photos')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating photo status:', updateError)
      return NextResponse.json(
        { message: 'Fotoğraf durumu güncellenirken hata oluştu' },
        { status: 500 }
      )
    }

    if (!photoData) {
      return NextResponse.json(
        { message: 'Fotoğraf bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Fotoğraf durumu başarıyla güncellendi',
      photo: photoData
    })
    
  } catch (error) {
    console.error('Error toggling photo status:', error)
    return NextResponse.json(
      { message: 'Fotoğraf durumu güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
