'use client'
import { useState, useEffect } from 'react'
import { useToastContext } from '@/components/ToastProvider'
import ConfirmModal from '@/components/ConfirmModal'
import { Photo } from '@/lib/supabase'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; photoId: string | null }>({
    isOpen: false,
    photoId: null
  })
  
  const { showSuccess, showError, showInfo } = useToastContext()

  // Basit admin kimlik doğrulama (gerçek uygulamada daha güvenli olmalı)
  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true)
      showSuccess('Giriş Başarılı!', 'Admin paneline hoş geldiniz.')
      fetchPhotos()
    } else {
      showError('Giriş Başarısız', 'Kullanıcı adı veya şifre hatalı!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    setPhotos([])
    showInfo('Çıkış Yapıldı', 'Güvenli çıkış yapıldı.')
  }

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data.photos || [])
      } else {
        showError('Hata', 'Fotoğraflar yüklenirken hata oluştu!')
      }
    } catch (error) {
      showError('Bağlantı Hatası', 'Sunucuya bağlanırken hata oluştu!')
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('tr-TR')
  }

  // Giriş yapılmamışsa login formu göster
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Girişi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Yönetim paneline erişmek için giriş yapın
            </p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="admin123"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Giriş Yap
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Ana Sayfaya Dön
            </a>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
              <strong>Test Bilgileri:</strong><br />
              Kullanıcı: admin<br />
              Şifre: admin123
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Admin paneli
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Paneli
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Tüm fotoğrafları yönetin ve izleyin
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchPhotos}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? 'Yükleniyor...' : 'Yenile'}
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Fotoğraf Listesi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Yüklenen Fotoğraflar ({photos.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Fotoğraflar yükleniyor...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-400 mb-4">📷</div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Henüz fotoğraf yüklenmemiş
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
                      
                      {/* Paylaşım Linki */}
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={`${window.location.origin}/photo/${photo.id}`}
                            readOnly
                            className="flex-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300"
                          />
                          <button
                            onClick={() => copyToClipboard(`${window.location.origin}/photo/${photo.id}`)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
                          >
                            Kopyala
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
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
      </div>

      {/* Silme Onay Modalı */}
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
    </div>
  )
}
