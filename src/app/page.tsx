'use client'
import { useState, useEffect } from 'react'
import PhotoUploader from '@/components/PhotoUploader'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)
  
  const handlePhotoUploaded = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Güvenlik önlemleri
  useEffect(() => {
    // Sağ tık menüsünü engelle
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Klavye kısayollarını engelle
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+S, Ctrl+Shift+S, F12, Ctrl+Shift+I, Ctrl+U
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Drag & Drop engelle
    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Copy engelle
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Select engelle
    const preventSelect = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Event listener'ları ekle
    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('keydown', preventKeyboardShortcuts)
    document.addEventListener('dragstart', preventDrag)
    document.addEventListener('copy', preventCopy)
    document.addEventListener('selectstart', preventSelect)

    // CSS ile ek güvenlik
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'
    ;(document.body.style as any).msUserSelect = 'none'
    ;(document.body.style as any).mozUserSelect = 'none'

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('keydown', preventKeyboardShortcuts)
      document.removeEventListener('dragstart', preventDrag)
      document.removeEventListener('copy', preventCopy)
      document.removeEventListener('selectstart', preventSelect)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kullanımlık Fotoğraf Yükleme
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fotoğraflarınızı güvenli bir şekilde paylaşın. Her fotoğraf sadece bir kez görüntülenebilir.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <PhotoUploader onPhotoUploaded={handlePhotoUploaded} />
        </div>
      </div>
    </main>
  )
}
