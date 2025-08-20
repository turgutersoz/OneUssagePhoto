'use client'

import { useState } from 'react'
import PhotoUploader from '@/components/PhotoUploader'
import PhotoList from '@/components/PhotoList'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handlePhotoUploaded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kullanımlık Fotoğraf Yükleme
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fotoğraflarınızı güvenli bir şekilde paylaşın. Her fotoğraf sadece bir kez görüntülenebilir, 
            sonrasında otomatik olarak silinir.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <PhotoUploader onPhotoUploaded={handlePhotoUploaded} />
          <PhotoList key={refreshKey} />
        </div>
      </div>
    </main>
  )
}
