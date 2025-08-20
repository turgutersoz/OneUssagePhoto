'use client'

import { Fragment } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Onayla',
  cancelText = 'İptal',
  type = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: 'text-red-400',
          confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          icon: ExclamationTriangleIcon
        }
      case 'warning':
        return {
          iconColor: 'text-yellow-400',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          icon: ExclamationTriangleIcon
        }
      case 'info':
        return {
          iconColor: 'text-blue-400',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          icon: ExclamationTriangleIcon
        }
      default:
        return {
          iconColor: 'text-red-400',
          confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          icon: ExclamationTriangleIcon
        }
    }
  }

  const styles = getTypeStyles()
  const Icon = styles.icon

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
                <Icon className={`h-6 w-6 ${styles.iconColor}`} />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {message}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${styles.confirmButton} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800`}
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={onClose}
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
