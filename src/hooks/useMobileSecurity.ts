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
        const hideContentOnScreenshot = () => {
          // Tüm resimleri gizle
          const images = document.querySelectorAll('img, video, canvas')
          const containers = document.querySelectorAll('.photo-container, .image-wrapper')
          
          images.forEach((img: any) => {
            img.style.filter = 'blur(20px) brightness(0)'
            img.style.opacity = '0'
            img.style.transform = 'scale(0.1)'
            img.style.visibility = 'hidden'
          })
          
          containers.forEach((container: any) => {
            const containerElement = container as HTMLElement
            containerElement.style.filter = 'blur(20px) brightness(0)'
            containerElement.style.opacity = '0'
            containerElement.style.visibility = 'hidden'
          })
          
          // Screenshot uyarısı ekle
          const warning = document.createElement('div')
          warning.id = 'mobile-screenshot-warning'
          warning.innerHTML = `
            <div style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(255, 0, 0, 0.95);
              color: white;
              padding: 15px;
              border-radius: 8px;
              z-index: 9999;
              font-size: 16px;
              text-align: center;
              box-shadow: 0 0 15px rgba(0,0,0,0.5);
              border: 2px solid white;
              max-width: 90%;
            ">
              <h3>⚠️ Güvenlik Uyarısı</h3>
              <p>Mobil ekran görüntüsü tespit edildi!</p>
              <p>İçerik korunuyor.</p>
            </div>
          `
          document.body.appendChild(warning)
        }
        
        const showContentAfterScreenshot = () => {
          setTimeout(() => {
            const images = document.querySelectorAll('img, video, canvas')
            const containers = document.querySelectorAll('.photo-container, .image-wrapper')
            
            images.forEach((img: any) => {
              img.style.filter = 'none'
              img.style.opacity = '1'
              img.style.transform = 'scale(1)'
              img.style.visibility = 'visible'
            })
            
            containers.forEach((container: any) => {
              const containerElement = container as HTMLElement
              containerElement.style.filter = 'none'
              containerElement.style.opacity = '1'
              containerElement.style.visibility = 'visible'
            })
            
            // Uyarıyı kaldır
            const warning = document.getElementById('mobile-screenshot-warning')
            if (warning) {
              warning.remove()
            }
          }, 200)
        }

        // Visibility change detection
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            hideContentOnScreenshot()
          } else {
            showContentAfterScreenshot()
          }
        })
        
        // iOS'ta screenshot detection için ek event'ler
        window.addEventListener('blur', hideContentOnScreenshot)
        window.addEventListener('focus', showContentAfterScreenshot)
        
        // Page freeze detection (iOS'ta screenshot alırken sayfa donabilir)
        let lastActiveTime = Date.now()
        const checkFreeze = () => {
          const now = Date.now()
          if (now - lastActiveTime > 500) {
            hideContentOnScreenshot()
            setTimeout(showContentAfterScreenshot, 100)
          }
          lastActiveTime = now
        }
        
        setInterval(checkFreeze, 100)
      }

      // Android için özel önlemler
      const preventAndroidScreenshot = () => {
        // Android'de screenshot detection için güçlendirilmiş yöntemler
        const hideContentOnAndroidScreenshot = () => {
          const images = document.querySelectorAll('img, video, canvas')
          const containers = document.querySelectorAll('.photo-container, .image-wrapper')
          
          images.forEach((img: any) => {
            img.style.filter = 'blur(20px) brightness(0)'
            img.style.opacity = '0'
            img.style.transform = 'scale(0.1)'
            img.style.visibility = 'hidden'
            img.style.display = 'none'
          })
          
          containers.forEach((container: any) => {
            const containerElement = container as HTMLElement
            containerElement.style.filter = 'blur(20px) brightness(0)'
            containerElement.style.opacity = '0'
            containerElement.style.visibility = 'hidden'
          })
          
          // Android screenshot uyarısı
          const warning = document.createElement('div')
          warning.id = 'android-screenshot-warning'
          warning.innerHTML = `
            <div style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(255, 0, 0, 0.95);
              color: white;
              padding: 15px;
              border-radius: 8px;
              z-index: 9999;
              font-size: 16px;
              text-align: center;
              box-shadow: 0 0 15px rgba(0,0,0,0.5);
              border: 2px solid white;
              max-width: 90%;
            ">
              <h3>🚫 Android Güvenlik</h3>
              <p>Ekran görüntüsü tespit edildi!</p>
              <p>İçerik gizlendi.</p>
            </div>
          `
          document.body.appendChild(warning)
        }
        
        const showContentAfterAndroidScreenshot = () => {
          setTimeout(() => {
            const images = document.querySelectorAll('img, video, canvas')
            const containers = document.querySelectorAll('.photo-container, .image-wrapper')
            
            images.forEach((img: any) => {
              img.style.filter = 'none'
              img.style.opacity = '1'
              img.style.transform = 'scale(1)'
              img.style.visibility = 'visible'
              img.style.display = 'block'
            })
            
            containers.forEach((container: any) => {
              const containerElement = container as HTMLElement
              containerElement.style.filter = 'none'
              containerElement.style.opacity = '1'
              containerElement.style.visibility = 'visible'
            })
            
            const warning = document.getElementById('android-screenshot-warning')
            if (warning) {
              warning.remove()
            }
          }, 300)
        }

        // Android'de visibility change detection
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            hideContentOnAndroidScreenshot()
          } else {
            showContentAfterAndroidScreenshot()
          }
        })
        
        // Android'de window focus/blur detection
        window.addEventListener('blur', hideContentOnAndroidScreenshot)
        window.addEventListener('focus', showContentAfterAndroidScreenshot)
        
        // Android'de page lifecycle events
        document.addEventListener('freeze', hideContentOnAndroidScreenshot)
        document.addEventListener('resume', showContentAfterAndroidScreenshot)
        
        // Android'de recent apps detection
        let isInBackground = false
        const backgroundDetection = () => {
          if (document.hidden && !isInBackground) {
            isInBackground = true
            hideContentOnAndroidScreenshot()
          } else if (!document.hidden && isInBackground) {
            isInBackground = false
            showContentAfterAndroidScreenshot()
          }
        }
        
        setInterval(backgroundDetection, 100)

        // Android CSS güvenlik
        const style = document.createElement('style')
        style.textContent = `
          @media screen and (max-width: 768px) {
            img, video, canvas {
              -webkit-touch-callout: none !important;
              -webkit-user-select: none !important;
              -webkit-user-drag: none !important;
              pointer-events: none !important;
              -webkit-tap-highlight-color: transparent !important;
            }
            
            /* Android'de screenshot alındığında gizle */
            .android-screenshot-detected img,
            .android-screenshot-detected video,
            .android-screenshot-detected canvas {
              filter: blur(20px) brightness(0) !important;
              opacity: 0 !important;
              transform: scale(0.1) !important;
              visibility: hidden !important;
              display: none !important;
            }
          }
          
          @media print {
            * {
              visibility: hidden !important;
            }
            body::before {
              content: "Android'de yazdırılamaz!" !important;
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
        @media (max-width: 768px), (hover: none), (pointer: coarse) {
          * {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -webkit-tap-highlight-color: transparent !important;
            pointer-events: auto !important;
          }
          
          img, video, canvas {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            pointer-events: none !important;
            -webkit-user-drag: none !important;
            user-drag: none !important;
          }
          
          input, textarea, select {
            -webkit-user-select: text !important;
            pointer-events: auto !important;
          }
          
          /* Screenshot tespit edildiğinde resimleri gizle */
          .mobile-screenshot-detected img,
          .mobile-screenshot-detected video,
          .mobile-screenshot-detected canvas {
            filter: blur(20px) brightness(0) !important;
            opacity: 0 !important;
            transform: scale(0.1) !important;
            visibility: hidden !important;
            display: none !important;
          }
          
          .mobile-screenshot-detected .photo-container,
          .mobile-screenshot-detected .image-wrapper {
            filter: blur(20px) brightness(0) !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
          
          /* Mobil screenshot uyarısı */
          #mobile-screenshot-warning,
          #android-screenshot-warning {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: rgba(255, 0, 0, 0.95) !important;
            color: white !important;
            padding: 15px !important;
            border-radius: 8px !important;
            z-index: 9999 !important;
            font-size: 16px !important;
            text-align: center !important;
            box-shadow: 0 0 15px rgba(0,0,0,0.5) !important;
            border: 2px solid white !important;
            max-width: 90% !important;
          }
          
          /* Screenshot detection için invisible watermark */
          body::after {
            content: "© Mobil Güvenli İçerik - Kopyalanamaz - " attr(data-timestamp);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.001;
            font-size: 1px;
            color: transparent;
          }
        }
        
        /* iOS Safari için özel ayarlar */
        @supports (-webkit-touch-callout: none) {
          body {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
          }
          
          img, video, canvas {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -webkit-user-drag: none !important;
          }
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
