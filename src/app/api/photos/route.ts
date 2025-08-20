import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Supabase'den tüm fotoğrafları çek
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('uploaded_at', { ascending: false })

    if (error) {
      console.error('Error fetching photos:', error)
      return NextResponse.json(
        { message: 'Fotoğraflar yüklenirken bir hata oluştu' },
        { status: 500 }
      )
    }

    return NextResponse.json({ photos: photos || [] })
    
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { message: 'Fotoğraflar yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
