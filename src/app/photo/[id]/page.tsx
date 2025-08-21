'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useMobileSecurity } from '@/hooks/useMobileSecurity'
import { useWindowsSecurity } from '@/hooks/useWindowsSecurity'

interface PhotoData {
  id: string
  filename: string
  originalName: string
  size: number
  uploadedAt: string
  imageData?: string
  mimeType?: string
}

export default function PhotoPage() {
  const params = useParams()
  const [photo, setPhoto] = useState<PhotoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [showCountdown, setShowCountdown] = useState(false)

  // Mobil güvenlik hook'unu kullan
  useMobileSecurity()
  
  // Windows güvenlik hook'unu kullan
  useWindowsSecurity()

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

  useEffect(() => {
    if (params.id) {
      fetchPhoto(params.id as string)
    }
  }, [params.id])

  // Geri sayım useEffect'i
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // 5 saniye sonra sayfayı kapat
            setTimeout(() => {
              // Birden fazla yöntem dene
              try {
                // Yöntem 1: window.close()
                if (window.opener) {
                  window.close()
                } else {
                  // Yöntem 2: History API ile geri git
                  if (window.history.length > 1) {
                    window.history.back()
                  } else {
                    // Yöntem 3: Ana sayfaya yönlendir
                    window.location.href = '/'
                  }
                }
              } catch (e) {
                // Yöntem 4: Fallback olarak ana sayfaya yönlendir
                window.location.href = '/'
              }
            }, 1000)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showCountdown, countdown])

  const fetchPhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/photos/${id}/view`)
      if (response.ok) {
        const data = await response.json()
        setPhoto(data.photo)
        setHasBeenViewed(true)
        // Fotoğraf yüklendikten sonra geri sayımı başlat
        setShowCountdown(true)
      } else if (response.status === 404) {
        setError('Fotoğraf bulunamadı veya zaten silinmiş.')
      } else if (response.status === 410) {
        setError('Bu fotoğraf artık görüntülenemez.')
      } else {
        setError('Fotoğraf yüklenirken bir hata oluştu.')
      }
    } catch (error) {
      setError('Fotoğraf yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Fotoğraf yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="text-6xl text-red-400 mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Hata Oluştu
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    )
  }

  if (!photo) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {hasBeenViewed && (
            <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="text-yellow-600 dark:text-yellow-400 mr-3">⚠️</div>
                <div>
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    Bu fotoğraf bir kez görüntülendi ve artık erişilemez!
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                    Fotoğraf artık görüntülenemez.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {photo.originalName}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Yüklenme: {new Date(photo.uploadedAt).toLocaleString('tr-TR')}</span>
                <span>Boyut: {(photo.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            
                         <div className="p-6">
               {photo.imageData ? (
                 <div className="text-center photo-container">
                   <img
                     src={`data:${photo.mimeType};base64,${photo.imageData}`}
                     alt={photo.originalName}
                     className="max-w-full h-auto mx-auto rounded-lg shadow-lg image-wrapper"
                     style={{ maxHeight: '70vh' }}
                     draggable="false"
                     onContextMenu={(e) => e.preventDefault()}
                   />
                   
                   {/* Geri Sayım Sayaç */}
                   {showCountdown && (
                     <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                                                <div className="text-center">
                           <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                             ⏰ {countdown} Saniye
                           </div>
                                                   <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                              style={{ width: `${(countdown / 5) * 100}%` }}
                            ></div>
                          </div>
                                                   <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
                            Sayfa 5 saniye sonra otomatik olarak kapanacak
                          </p>
                           
                           {/* Manuel Kapatma Butonu */}
                           <button
                             onClick={() => {
                               try {
                                 if (window.opener) {
                                   window.close()
                                 } else if (window.history.length > 1) {
                                   window.history.back()
                                 } else {
                                   window.location.href = '/'
                                 }
                               } catch (e) {
                                 window.location.href = '/'
                               }
                             }}
                             className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                           >
                             🚪 Sayfayı Şimdi Kapat
                           </button>
                       </div>
                     </div>
                   )}
                   
                                       {/* Fotoğraf Altı Timecounter */}
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          ⏱️ Kalan Süre
                        </div>
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                          {countdown}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-linear"
                            style={{ width: `${(countdown / 5) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                          Saniye sonra sayfa kapanacak
                        </p>
                        
                        {/* Manuel Kapatma Butonu */}
                        <button
                          onClick={() => {
                            try {
                              if (window.opener) {
                                window.close()
                              } else if (window.history.length > 1) {
                                window.history.back()
                              } else {
                                window.location.href = '/'
                              }
                            } catch (e) {
                              window.location.href = '/'
                            }
                          }}
                          className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          🚪 Sayfayı Şimdi Kapat
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                      Bu fotoğraf bir kez görüntülendi ve artık erişilemez.
                    </p>
                 </div>
               ) : (
                 <div className="text-center">
                   <div className="text-6xl text-gray-400 mb-4">🖼️</div>
                   <p className="text-gray-400 dark:text-gray-400">
                     Bu fotoğraf artık görüntülenemez çünkü bir kez erişildi.
                   </p>
                 </div>
               )}
             </div>
          </div>
          
          <div className="text-center mt-8">
            <a
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Yeni Fotoğraf Yükle
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
