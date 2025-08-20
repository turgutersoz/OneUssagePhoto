'use client'

import { useState, useEffect } from 'react'
import { useToastContext } from './ToastProvider'
import ConfirmModal from './ConfirmModal'
import { Photo } from '@/lib/supabase'

export default function PhotoList() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; photoId: string | null }>({
    isOpen: false,
    photoId: null
  })
  const { showSuccess, showError, showInfo } = useToastContext()

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data.photos)
      }
    } catch (error) {
      console.error('Fotoğraflar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showSuccess('Link Kopyalandı!', 'Paylaşım linki panoya kopyalandı.')
    }).catch(() => {
      showError('Kopyalama Hatası', 'Link kopyalanamadı!')
    })
  }

  const openDeleteModal = (photoId: string) => {
    setDeleteModal({ isOpen: true, photoId })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, photoId: null })
  }

  const deletePhoto = async () => {
    if (!deleteModal.photoId) return

    try {
      const response = await fetch(`/api/photos/${deleteModal.photoId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPhotos(photos.filter(photo => photo.id !== deleteModal.photoId))
        showSuccess('Fotoğraf Silindi!', 'Fotoğraf başarıyla silindi.')
      } else {
        showError('Silme Hatası', 'Fotoğraf silinirken hata oluştu!')
      }
    } catch (error) {
      showError('Bağlantı Hatası', 'Fotoğraf silinirken hata oluştu!')
    }
    
    closeDeleteModal()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR')
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Fotoğraflar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Yüklenen Fotoğraflar
        </h2>

        {photos.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl text-gray-400 mb-4">📸</div>
            <p className="text-gray-600 dark:text-gray-400">
              Henüz fotoğraf yüklenmemiş. İlk fotoğrafınızı yükleyin!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  photo.status 
                    ? 'border-gray-200 dark:border-gray-700' 
                    : 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {photo.original_name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Boyut: {formatFileSize(photo.size)}</span>
                      <span>Yüklenme: {formatDate(photo.uploaded_at)}</span>
                      <span>Görüntülenme: {photo.view_count}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        photo.status 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                      }`}>
                        {photo.status ? 'Aktif' : 'Görüntülendi'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/photo/${photo.id}`)}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Link Kopyala
                    </button>
                    <button
                      onClick={() => openDeleteModal(photo.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={deletePhoto}
        title="Fotoğrafı Sil"
        message="Bu fotoğrafı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        confirmText="Evet, Sil"
        cancelText="İptal"
        type="danger"
      />
    </>
  )
}
