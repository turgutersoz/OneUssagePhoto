'use client'

import { useState, useCallback } from 'react'
import Toast, { ToastProps } from './Toast'

export interface ToastMessage {
  id: string
  type: ToastProps['type']
  title: string
  message?: string
  duration?: number
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((title: string, message?: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration })
  }, [addToast])

  const showError = useCallback((title: string, message?: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration })
  }, [addToast])

  const showWarning = useCallback((title: string, message?: string, duration?: number) => {
    return addToast({ type: 'warning', title, message, duration })
  }, [addToast])

  const showInfo = useCallback((title: string, message?: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration })
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onClose: (id: string) => void
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  )
}
