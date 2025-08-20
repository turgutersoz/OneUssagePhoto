import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kullanımlık Fotoğraf Yükleme',
  description: 'Fotoğraflarınızı güvenli bir şekilde paylaşın - sadece bir kez görüntülenebilir',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Mobil güvenlik meta tag'leri */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        
        {/* iOS Safari için güvenlik */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Android için güvenlik */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        
        {/* Ekran görüntüsü engellemek için */}
        <meta name="referrer" content="no-referrer" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; img-src 'self' data: https:; media-src 'self' data:;" />
        
        {/* Mobil ekran görüntüsü engelleme */}
        <meta name="screen-capture" content="disabled" />
        <meta name="screenshot" content="disabled" />
        <meta name="save-image" content="disabled" />
        <meta name="disable-screenshot" content="true" />
        
        {/* CSS ile ek mobil güvenlik */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              * {
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-tap-highlight-color: transparent !important;
              }
              
              input, textarea {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
              }
              
              img {
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
                pointer-events: none !important;
                -webkit-touch-callout: none !important;
              }
              
              /* Mobil screenshot engellemek için overlay */
              body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                background: transparent;
                pointer-events: none;
              }
              
              /* Screenshot tespit edildiğinde gizle */
              .mobile-screenshot-active img,
              .mobile-screenshot-active video,
              .mobile-screenshot-active canvas {
                filter: blur(20px) brightness(0) !important;
                opacity: 0 !important;
                transform: scale(0.1) !important;
                visibility: hidden !important;
              }
              
              .mobile-screenshot-active .photo-container,
              .mobile-screenshot-active .image-wrapper {
                filter: blur(20px) brightness(0) !important;
                opacity: 0 !important;
                visibility: hidden !important;
              }
            }
          `
        }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
