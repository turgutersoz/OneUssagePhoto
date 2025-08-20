'use client'

import { useState, useRef } from 'react'
import { useToastContext } from './ToastProvider'

interface PhotoUploaderProps {
  onPhotoUploaded: () => void
}

export default function PhotoUploader({ onPhotoUploaded }: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showSuccess, showError, showInfo } = useToastContext()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showError('Geçersiz Dosya Türü', 'Lütfen sadece resim dosyası yükleyin!')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      showError('Dosya Çok Büyük', 'Dosya boyutu 10MB\'dan küçük olmalıdır!')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('photo', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        const shareLink = `${window.location.origin}/photo/${result.id}`
        
        showSuccess(
          'Fotoğraf Başarıyla Yüklendi!', 
          'Paylaşım linki kopyalandı.',
          8000
        )
        
        // Linki panoya kopyala
        navigator.clipboard.writeText(shareLink).then(() => {
          showInfo('Link Kopyalandı', 'Paylaşım linki panoya kopyalandı!')
        }).catch(() => {
          showInfo('Link Kopyalanamadı', `Manuel olarak kopyalayın: ${shareLink}`)
        })
        
        onPhotoUploaded()
        setUploadProgress(0)
      } else {
        const error = await response.json()
        showError('Yükleme Hatası', error.message)
      }
    } catch (error) {
      showError('Bağlantı Hatası', 'Yükleme sırasında bir hata oluştu!')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Fotoğraf Yükle
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-6xl text-gray-400">📷</div>
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              Fotoğrafınızı buraya sürükleyin veya tıklayın
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF (Maksimum 10MB)
            </p>
          </div>
          
          <button
            onClick={openFileDialog}
            disabled={isUploading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {isUploading ? 'Yükleniyor...' : 'Dosya Seç'}
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Yükleniyor... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  )
}
