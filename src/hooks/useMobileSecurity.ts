'use client'
import { useEffect } from 'react'

export const useMobileSecurity = () => {
  useEffect(() => {
    // Mobil cihaz tespit et
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Mobil güvenlik önlemleri
      
      // Touch events'i engelle
      const preventTouch = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      }

      // Long press engelle
      const preventLongPress = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Gesture engelle
      const preventGesture = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // iOS için özel önlemler
      const preventiOSScreenshot = () => {
        // iOS'ta ekran görüntüsü alındığında tetiklenen event'ler
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            // Sayfa gizlendiğinde içeriği gizle
            document.body.style.filter = 'blur(10px)'
            document.body.style.opacity = '0.1'
          } else {
            // Sayfa görünür olduğunda içeriği göster
            setTimeout(() => {
              document.body.style.filter = 'none'
              document.body.style.opacity = '1'
            }, 100)
          }
        })
      }

      // Android için özel önlemler
      const preventAndroidScreenshot = () => {
        // Android'de ekran görüntüsü engellemek için
        const style = document.createElement('style')
        style.textContent = `
          @media screen {
            body {
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
              user-select: none !important;
            }
          }
          
          @media print {
            body * {
              visibility: hidden !important;
            }
            body::before {
              content: "Bu içerik yazdırılamaz veya kaydedilemez!" !important;
              visibility: visible !important;
              position: absolute !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) !important;
              font-size: 24px !important;
              color: red !important;
            }
          }
        `
        document.head.appendChild(style)
      }

      // Clipboard API'yi engelle
      const preventClipboard = (e: ClipboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Event listener'ları ekle
      document.addEventListener('touchstart', preventTouch, { passive: false })
      document.addEventListener('touchmove', preventTouch, { passive: false })
      document.addEventListener('touchend', preventTouch, { passive: false })
      document.addEventListener('contextmenu', preventLongPress, { passive: false })
      document.addEventListener('selectstart', preventGesture, { passive: false })
      document.addEventListener('copy', preventClipboard, { passive: false })
      document.addEventListener('cut', preventClipboard, { passive: false })
      document.addEventListener('paste', preventClipboard, { passive: false })

      // Platform'a özel önlemler
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        preventiOSScreenshot()
      } else if (/Android/i.test(navigator.userAgent)) {
        preventAndroidScreenshot()
      }

      // CSS ile mobil güvenlik
      const mobileSecurityStyle = document.createElement('style')
      mobileSecurityStyle.textContent = `
        * {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          -webkit-tap-highlight-color: transparent !important;
          pointer-events: auto !important;
        }
        
        img, video {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          pointer-events: none !important;
        }
        
        input, textarea, select {
          -webkit-user-select: text !important;
          pointer-events: auto !important;
        }
        
        /* Screenshot detection için invisible watermark */
        body::after {
          content: "© Güvenli İçerik - Kopyalanamaz";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          opacity: 0.01;
          font-size: 1px;
          color: transparent;
        }
      `
      document.head.appendChild(mobileSecurityStyle)

      // Cleanup function
      return () => {
        document.removeEventListener('touchstart', preventTouch)
        document.removeEventListener('touchmove', preventTouch)
        document.removeEventListener('touchend', preventTouch)
        document.removeEventListener('contextmenu', preventLongPress)
        document.removeEventListener('selectstart', preventGesture)
        document.removeEventListener('copy', preventClipboard)
        document.removeEventListener('cut', preventClipboard)
        document.removeEventListener('paste', preventClipboard)
        
        if (mobileSecurityStyle.parentNode) {
          mobileSecurityStyle.parentNode.removeChild(mobileSecurityStyle)
        }
      }
    }
  }, [])
}
