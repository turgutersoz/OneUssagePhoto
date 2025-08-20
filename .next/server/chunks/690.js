"use strict";exports.id=690,exports.ids=[690],exports.modules={5522:(a,b,c)=>{c.d(b,{m:()=>e});var d=c(8301);let e=()=>{(0,d.useEffect)(()=>{if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){let a=a=>{if(a.touches.length>1)return a.preventDefault(),a.stopPropagation(),!1},b=a=>(a.preventDefault(),a.stopPropagation(),!1),c=a=>(a.preventDefault(),a.stopPropagation(),!1),d=a=>(a.preventDefault(),a.stopPropagation(),!1);document.addEventListener("touchstart",a,{passive:!1}),document.addEventListener("touchmove",a,{passive:!1}),document.addEventListener("touchend",a,{passive:!1}),document.addEventListener("contextmenu",b,{passive:!1}),document.addEventListener("selectstart",c,{passive:!1}),document.addEventListener("copy",d,{passive:!1}),document.addEventListener("cut",d,{passive:!1}),document.addEventListener("paste",d,{passive:!1}),/iPhone|iPad|iPod/i.test(navigator.userAgent)?(()=>{let a=()=>{let a=document.querySelectorAll("img, video, canvas"),b=document.querySelectorAll(".photo-container, .image-wrapper");a.forEach(a=>{a.style.filter="blur(20px) brightness(0)",a.style.opacity="0",a.style.transform="scale(0.1)",a.style.visibility="hidden"}),b.forEach(a=>{a.style.filter="blur(20px) brightness(0)",a.style.opacity="0",a.style.visibility="hidden"});let c=document.createElement("div");c.id="mobile-screenshot-warning",c.innerHTML=`
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
              <h3>⚠️ G\xfcvenlik Uyarısı</h3>
              <p>Mobil ekran g\xf6r\xfcnt\xfcs\xfc tespit edildi!</p>
              <p>İ\xe7erik korunuyor.</p>
            </div>
          `,document.body.appendChild(c)},b=()=>{setTimeout(()=>{let a=document.querySelectorAll("img, video, canvas"),b=document.querySelectorAll(".photo-container, .image-wrapper");a.forEach(a=>{a.style.filter="none",a.style.opacity="1",a.style.transform="scale(1)",a.style.visibility="visible"}),b.forEach(a=>{a.style.filter="none",a.style.opacity="1",a.style.visibility="visible"});let c=document.getElementById("mobile-screenshot-warning");c&&c.remove()},200)};document.addEventListener("visibilitychange",()=>{document.hidden?a():b()}),window.addEventListener("blur",a),window.addEventListener("focus",b);let c=Date.now();setInterval(()=>{let d=Date.now();d-c>500&&(a(),setTimeout(b,100)),c=d},100)})():/Android/i.test(navigator.userAgent)&&(()=>{let a=()=>{let a=document.querySelectorAll("img, video, canvas"),b=document.querySelectorAll(".photo-container, .image-wrapper");a.forEach(a=>{a.style.filter="blur(20px) brightness(0)",a.style.opacity="0",a.style.transform="scale(0.1)",a.style.visibility="hidden",a.style.display="none"}),b.forEach(a=>{a.style.filter="blur(20px) brightness(0)",a.style.opacity="0",a.style.visibility="hidden"});let c=document.createElement("div");c.id="android-screenshot-warning",c.innerHTML=`
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
              <h3>🚫 Android G\xfcvenlik</h3>
              <p>Ekran g\xf6r\xfcnt\xfcs\xfc tespit edildi!</p>
              <p>İ\xe7erik gizlendi.</p>
            </div>
          `,document.body.appendChild(c)},b=()=>{setTimeout(()=>{let a=document.querySelectorAll("img, video, canvas"),b=document.querySelectorAll(".photo-container, .image-wrapper");a.forEach(a=>{a.style.filter="none",a.style.opacity="1",a.style.transform="scale(1)",a.style.visibility="visible",a.style.display="block"}),b.forEach(a=>{a.style.filter="none",a.style.opacity="1",a.style.visibility="visible"});let c=document.getElementById("android-screenshot-warning");c&&c.remove()},300)};document.addEventListener("visibilitychange",()=>{document.hidden?a():b()}),window.addEventListener("blur",a),window.addEventListener("focus",b),document.addEventListener("freeze",a),document.addEventListener("resume",b);let c=!1;setInterval(()=>{document.hidden&&!c?(c=!0,a()):!document.hidden&&c&&(c=!1,b())},100);let d=document.createElement("style");d.textContent=`
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
        `,document.head.appendChild(d)})();let e=document.createElement("style");return e.textContent=`
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
          
          /* Screenshot detection i\xe7in invisible watermark */
          body::after {
            content: "\xa9 Mobil G\xfcvenli İ\xe7erik - Kopyalanamaz - " attr(data-timestamp);
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
        
        /* iOS Safari i\xe7in \xf6zel ayarlar */
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
      `,document.head.appendChild(e),()=>{document.removeEventListener("touchstart",a),document.removeEventListener("touchmove",a),document.removeEventListener("touchend",a),document.removeEventListener("contextmenu",b),document.removeEventListener("selectstart",c),document.removeEventListener("copy",d),document.removeEventListener("cut",d),document.removeEventListener("paste",d),e.parentNode&&e.parentNode.removeChild(e)}}},[])}},6599:(a,b,c)=>{c.d(b,{d:()=>e});var d=c(8301);let e=()=>{(0,d.useEffect)(()=>{if(/Windows|Win64|Win32/i.test(navigator.userAgent)){let a=a=>{if("PrintScreen"===a.key||"F12"===a.key||"S"===a.key&&a.shiftKey&&a.metaKey||"R"===a.key&&a.shiftKey&&a.metaKey||"G"===a.key&&a.metaKey||"PrintScreen"===a.key&&a.metaKey)return a.preventDefault(),a.stopPropagation(),!1},b=a=>(a.preventDefault(),a.stopPropagation(),!1),c=a=>(a.preventDefault(),a.stopPropagation(),!1),d=a=>(a.preventDefault(),a.stopPropagation(),!1),e=a=>(a.preventDefault(),a.stopPropagation(),!1),f=()=>{let a=document.querySelectorAll("img, video, canvas"),b=document.querySelectorAll(".photo-container, .image-wrapper");a.forEach(a=>{a.style.filter="none",a.style.opacity="1",a.style.transform="scale(1)"}),b.forEach(a=>{a.style.filter="none",a.style.opacity="1"});let c=document.getElementById("screenshot-warning");c&&c.remove()};document.addEventListener("keydown",a,{passive:!1}),document.addEventListener("contextmenu",b,{passive:!1}),document.addEventListener("copy",c,{passive:!1}),document.addEventListener("selectstart",d,{passive:!1}),document.addEventListener("dragstart",e,{passive:!1}),(()=>{let a="",b="";void 0!==document.hidden?(a="hidden",b="visibilitychange"):void 0!==document.msHidden?(a="msHidden",b="msvisibilitychange"):void 0!==document.webkitHidden&&(a="webkitHidden",b="webkitvisibilitychange"),void 0!==document.addEventListener&&void 0!==a&&document.addEventListener(b,()=>{document[a]?(()=>{let a=document.querySelectorAll("img, video, canvas"),b=document.querySelectorAll(".photo-container, .image-wrapper");a.forEach(a=>{a.style.filter="blur(20px) brightness(0)",a.style.opacity="0",a.style.transform="scale(0.1)"}),b.forEach(a=>{a.style.filter="blur(20px) brightness(0)",a.style.opacity="0"});let c=document.createElement("div");c.id="screenshot-warning",c.innerHTML=`
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
            <h3>⚠️ G\xfcvenlik Uyarısı</h3>
            <p>Ekran g\xf6r\xfcnt\xfcs\xfc tespit edildi!</p>
            <p>İ\xe7erik koruma altına alındı.</p>
          </div>
        `,document.body.appendChild(c)})():setTimeout(f,100)},!1)})(),document.addEventListener("keydown",a=>{if(a.shiftKey&&a.metaKey&&"S"===a.key)return a.preventDefault(),a.stopPropagation(),!1},{passive:!1}),document.addEventListener("keydown",a=>{if(a.shiftKey&&a.metaKey&&"R"===a.key)return a.preventDefault(),a.stopPropagation(),!1},{passive:!1});let g=document.createElement("style");return g.textContent=`
        /* Windows i\xe7in \xf6zel g\xfcvenlik stilleri */
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
          
          /* Screenshot detection i\xe7in invisible watermark */
          body::before {
            content: "\xa9 2024 - Windows G\xfcvenli İ\xe7erik - Kopyalanamaz";
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
            content: "Bu i\xe7erik yazdırılamaz veya kaydedilemez!" !important;
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
      `,document.head.appendChild(g),()=>{document.removeEventListener("keydown",a),document.removeEventListener("contextmenu",b),document.removeEventListener("copy",c),document.removeEventListener("selectstart",d),document.removeEventListener("dragstart",e),g.parentNode&&g.parentNode.removeChild(g)}}},[])}}};