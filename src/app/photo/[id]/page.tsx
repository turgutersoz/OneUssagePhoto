'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

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

  useEffect(() => {
    if (params.id) {
      fetchPhoto(params.id as string)
    }
  }, [params.id])

  const fetchPhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/photos/${id}/view`)
      
      if (response.ok) {
        const data = await response.json()
        setPhoto(data.photo)
        setHasBeenViewed(true)
      } else if (response.status === 404) {
        setError('Fotoğraf bulunamadı veya zaten silinmiş.')
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Fotoğraf yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md mx-4">
          <div className="text-6xl text-red-400 mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Hata
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
                    Fotoğraf otomatik olarak sunucudan silindi.
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
                <div className="text-center">
                  <img
                    src={`data:${photo.mimeType};base64,${photo.imageData}`}
                    alt={photo.originalName}
                    className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                    style={{ maxHeight: '70vh' }}
                  />
                  <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                    Bu fotoğraf bir kez görüntülendi ve sunucudan silindi.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl text-gray-400 mb-4">🖼️</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu fotoğraf artık görüntülenemez çünkü bir kez erişildi ve silindi.
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
