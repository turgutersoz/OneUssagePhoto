import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kullanımlık Fotoğraf Yükleme',
  description: 'Fotoğraflarınızı güvenli bir şekilde paylaşın - sadece bir kez görüntülenebilir',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
