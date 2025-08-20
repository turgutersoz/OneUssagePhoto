'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const toastTypes = {
  success: {
    icon: CheckCircleIcon,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    textColor: 'text-green-800 dark:text-green-200',
    iconColor: 'text-green-400 dark:text-green-500',
    progressColor: 'bg-green-500'
  },
  error: {
    icon: XCircleIcon,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-700',
    textColor: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-400 dark:text-red-500',
    progressColor: 'bg-red-500'
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-700',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-400 dark:text-yellow-500',
    progressColor: 'bg-yellow-500'
  },
  info: {
    icon: InformationCircleIcon,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    textColor: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-400 dark:text-blue-500',
    progressColor: 'bg-blue-500'
  }
}

export default function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  
  const toastStyle = toastTypes[type]
  const Icon = toastStyle.icon

  useEffect(() => {
    // Toast'u yavaşça göster
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    // Progress bar'ı başlat
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(progressInterval)
          return 0
        }
        return prev - (100 / (duration / 100))
      })
    }, 100)

    // Otomatik kapatma
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300)
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearInterval(progressInterval)
    }
  }, [id, duration, onClose])

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`relative max-w-sm w-full ${toastStyle.bgColor} border ${toastStyle.borderColor} rounded-lg shadow-lg overflow-hidden`}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full ${toastStyle.progressColor} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${toastStyle.iconColor}`} />
            </div>
            <div className="ml-3 flex-1">
              <h3 className={`text-sm font-medium ${toastStyle.textColor}`}>
                {title}
              </h3>
              {message && (
                <p className={`mt-1 text-sm ${toastStyle.textColor} opacity-90`}>
                  {message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(() => onClose(id), 300)
                }}
                className={`inline-flex ${toastStyle.textColor} hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current rounded-md transition-opacity`}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
