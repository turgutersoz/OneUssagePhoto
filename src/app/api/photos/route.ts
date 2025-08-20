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

    const response = NextResponse.json({ photos: photos || [] })
    
    // Keep-alive ve cache headers ekle
    response.headers.set('Connection', 'keep-alive')
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
    
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { message: 'Fotoğraflar yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
