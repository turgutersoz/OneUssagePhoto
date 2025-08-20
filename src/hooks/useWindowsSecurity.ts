'use client'
import { useEffect } from 'react'

export const useWindowsSecurity = () => {
  useEffect(() => {
    // Windows tespit et
    const isWindows = /Windows|Win64|Win32/i.test(navigator.userAgent)
    
    if (isWindows) {
      // Windows güvenlik önlemleri
      
      // Print Screen tuşunu engelle
      const preventPrintScreen = (e: KeyboardEvent) => {
        if (e.key === 'PrintScreen' || e.key === 'F12') {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
        
        // Windows + Shift + S (Snipping Tool)
        if (e.key === 'S' && e.shiftKey && e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
        
        // Windows + Shift + R (Game Bar)
        if (e.key === 'R' && e.shiftKey && e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
        
        // Windows + G (Game Bar)
        if (e.key === 'G' && e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
        
        // Windows + PrtScn
        if (e.key === 'PrintScreen' && e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      }

      // Mouse sağ tık menüsünü engelle
      const preventContextMenu = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Copy engelle
      const preventCopy = (e: ClipboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Select engelle
      const preventSelect = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Drag & Drop engelle
      const preventDrag = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Windows screenshot detection
      const detectScreenshot = () => {
        // Visibility change detection
        let hidden: string = ''
        let visibilityChange: string = ''
        
        if (typeof document.hidden !== 'undefined') {
          hidden = 'hidden'
          visibilityChange = 'visibilitychange'
        } else if (typeof (document as any).msHidden !== 'undefined') {
          hidden = 'msHidden'
          visibilityChange = 'msvisibilitychange'
        } else if (typeof (document as any).webkitHidden !== 'undefined') {
          hidden = 'webkitHidden'
          visibilityChange = 'webkitvisibilitychange'
        }

        const handleVisibilityChange = () => {
          if ((document as any)[hidden]) {
            // Sayfa gizlendiğinde (screenshot alındığında)
            hideContent()
          } else {
            // Sayfa görünür olduğunda
            setTimeout(showContent, 100)
          }
        }

        if (typeof document.addEventListener !== 'undefined' && typeof hidden !== 'undefined') {
          document.addEventListener(visibilityChange, handleVisibilityChange, false)
        }
      }

      // İçeriği gizle
      const hideContent = () => {
        const images = document.querySelectorAll('img, video, canvas')
        const containers = document.querySelectorAll('.photo-container, .image-wrapper')
        
        images.forEach((img: any) => {
          img.style.filter = 'blur(20px) brightness(0)'
          img.style.opacity = '0'
          img.style.transform = 'scale(0.1)'
        })
        
        containers.forEach((container: any) => {
          const containerElement = container as HTMLElement
          containerElement.style.filter = 'blur(20px) brightness(0)'
          containerElement.style.opacity = '0'
        })
        
        // Body'ye screenshot uyarısı ekle
        const warning = document.createElement('div')
        warning.id = 'screenshot-warning'
        warning.innerHTML = `
          <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 9999;
            font-size: 18px;
            text-align: center;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
          ">
            <h3>⚠️ Güvenlik Uyarısı</h3>
            <p>Ekran görüntüsü tespit edildi!</p>
            <p>İçerik koruma altına alındı.</p>
          </div>
        `
        document.body.appendChild(warning)
      }

      // İçeriği göster
      const showContent = () => {
        const images = document.querySelectorAll('img, video, canvas')
        const containers = document.querySelectorAll('.photo-container, .image-wrapper')
        
        images.forEach((img: any) => {
          img.style.filter = 'none'
          img.style.opacity = '1'
          img.style.transform = 'scale(1)'
        })
        
        containers.forEach((container: any) => {
          const containerElement = container as HTMLElement
          containerElement.style.filter = 'none'
          containerElement.style.opacity = '1'
        })
        
        // Uyarıyı kaldır
        const warning = document.getElementById('screenshot-warning')
        if (warning) {
          warning.remove()
        }
      }

      // Windows Game Bar ve Snipping Tool engelleme
      const preventWindowsTools = () => {
        // Windows + Shift + S engellemek için
        const preventSnippingTool = (e: KeyboardEvent) => {
          if (e.shiftKey && e.metaKey && e.key === 'S') {
            e.preventDefault()
            e.stopPropagation()
            return false
          }
        }

        // Windows + Shift + R engellemek için
        const preventGameBar = (e: KeyboardEvent) => {
          if (e.shiftKey && e.metaKey && e.key === 'R') {
            e.preventDefault()
            e.stopPropagation()
            return false
          }
        }

        document.addEventListener('keydown', preventSnippingTool, { passive: false })
        document.addEventListener('keydown', preventGameBar, { passive: false })
      }

      // Event listener'ları ekle
      document.addEventListener('keydown', preventPrintScreen, { passive: false })
      document.addEventListener('contextmenu', preventContextMenu, { passive: false })
      document.addEventListener('copy', preventCopy, { passive: false })
      document.addEventListener('selectstart', preventSelect, { passive: false })
      document.addEventListener('dragstart', preventDrag, { passive: false })

      // Windows özel önlemler
      detectScreenshot()
      preventWindowsTools()

      // CSS ile Windows güvenlik
      const windowsSecurityStyle = document.createElement('style')
      windowsSecurityStyle.textContent = `
        /* Windows için özel güvenlik stilleri */
        @media screen {
          * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
          }
          
          input, textarea, select {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
          }
          
          img, video, canvas {
            -webkit-user-drag: none !important;
            -moz-user-drag: none !important;
            -ms-user-drag: none !important;
            user-drag: none !important;
            pointer-events: none !important;
          }
          
          /* Screenshot detection için invisible watermark */
          body::before {
            content: "© 2024 - Windows Güvenli İçerik - Kopyalanamaz";
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
            background: transparent;
          }
        }
        
        /* Print media query ile yazdırma engelleme */
        @media print {
          * {
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
            background: white !important;
            padding: 20px !important;
            border: 2px solid red !important;
          }
        }
      `
      document.head.appendChild(windowsSecurityStyle)

      // Cleanup function
      return () => {
        document.removeEventListener('keydown', preventPrintScreen)
        document.removeEventListener('contextmenu', preventContextMenu)
        document.removeEventListener('copy', preventCopy)
        document.removeEventListener('selectstart', preventSelect)
        document.removeEventListener('dragstart', preventDrag)
        
        if (windowsSecurityStyle.parentNode) {
          windowsSecurityStyle.parentNode.removeChild(windowsSecurityStyle)
        }
      }
    }
  }, [])
}
