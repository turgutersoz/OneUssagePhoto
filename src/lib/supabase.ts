import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Photo {
  id: string
  filename: string
  original_name: string
  size: number
  uploaded_at: string
  view_count: number
  status: boolean // true: görüntülenebilir, false: görüntülenemez
  user_id?: string
  image_data?: string // Base64 encoded image data
  mime_type?: string // MIME type
}

export interface PhotoUpload {
  filename: string
  original_name: string
  size: number
  status: boolean
  user_id?: string
  image_data?: string
  mime_type?: string
}
