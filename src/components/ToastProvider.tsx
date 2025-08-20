'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useToast, ToastMessage } from './ToastContainer'
import ToastContainer from './ToastContainer'

interface ToastContextType {
  showSuccess: (title: string, message?: string, duration?: number) => string
  showError: (title: string, message?: string, duration?: number) => string
  showWarning: (title: string, message?: string, duration?: number) => string
  showInfo: (title: string, message?: string, duration?: number) => string
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const toast = useToast()

  const contextValue: ToastContextType = {
    showSuccess: toast.showSuccess,
    showError: toast.showError,
    showWarning: toast.showWarning,
    showInfo: toast.showInfo
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </ToastContext.Provider>
  )
}
