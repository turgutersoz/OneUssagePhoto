exports.id=966,exports.ids=[966],exports.modules={1135:()=>{},1472:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>j,metadata:()=>h,viewport:()=>i});var d=c(5338),e=c(8039),f=c.n(e);c(1135);var g=c(4677);let h={title:"Kullanımlık Fotoğraf Y\xfckleme",description:"Fotoğraflarınızı g\xfcvenli bir şekilde paylaşın - sadece bir kez g\xf6r\xfcnt\xfclenebilir"},i={width:"device-width",initialScale:1,userScalable:!1};function j({children:a}){return(0,d.jsxs)("html",{lang:"tr",suppressHydrationWarning:!0,children:[(0,d.jsxs)("head",{children:[(0,d.jsx)("meta",{name:"format-detection",content:"telephone=no"}),(0,d.jsx)("meta",{name:"format-detection",content:"date=no"}),(0,d.jsx)("meta",{name:"format-detection",content:"address=no"}),(0,d.jsx)("meta",{name:"format-detection",content:"email=no"}),(0,d.jsx)("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),(0,d.jsx)("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),(0,d.jsx)("meta",{name:"apple-touch-fullscreen",content:"yes"}),(0,d.jsx)("meta",{name:"mobile-web-app-capable",content:"yes"}),(0,d.jsx)("meta",{name:"theme-color",content:"#000000"}),(0,d.jsx)("meta",{name:"referrer",content:"no-referrer"}),(0,d.jsx)("meta",{httpEquiv:"Content-Security-Policy",content:"default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; img-src 'self' data: https:; media-src 'self' data:;"}),(0,d.jsx)("meta",{name:"screen-capture",content:"disabled"}),(0,d.jsx)("meta",{name:"screenshot",content:"disabled"}),(0,d.jsx)("meta",{name:"save-image",content:"disabled"}),(0,d.jsx)("meta",{name:"disable-screenshot",content:"true"}),(0,d.jsx)("style",{dangerouslySetInnerHTML:{__html:`
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
              
              /* Mobil screenshot engellemek i\xe7in overlay */
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
          `}})]}),(0,d.jsx)("body",{className:f().className,suppressHydrationWarning:!0,children:(0,d.jsx)(g.default,{children:a})})]})}},2966:(a,b,c)=>{"use strict";c.d(b,{default:()=>p,Y:()=>o});var d=c(1124),e=c(8301),f=c(6236),g=c(6192),h=c(2073),i=c(1518),j=c(6817);let k={success:{icon:f.A,bgColor:"bg-green-50 dark:bg-green-900/20",borderColor:"border-green-200 dark:border-green-700",textColor:"text-green-800 dark:text-green-200",iconColor:"text-green-400 dark:text-green-500",progressColor:"bg-green-500"},error:{icon:g.A,bgColor:"bg-red-50 dark:bg-red-900/20",borderColor:"border-red-200 dark:border-red-700",textColor:"text-red-800 dark:text-red-200",iconColor:"text-red-400 dark:text-red-500",progressColor:"bg-red-500"},warning:{icon:h.A,bgColor:"bg-yellow-50 dark:bg-yellow-900/20",borderColor:"border-yellow-200 dark:border-yellow-700",textColor:"text-yellow-800 dark:text-yellow-200",iconColor:"text-yellow-400 dark:text-yellow-500",progressColor:"bg-yellow-500"},info:{icon:i.A,bgColor:"bg-blue-50 dark:bg-blue-900/20",borderColor:"border-blue-200 dark:border-blue-700",textColor:"text-blue-800 dark:text-blue-200",iconColor:"text-blue-400 dark:text-blue-500",progressColor:"bg-blue-500"}};function l({id:a,type:b,title:c,message:f,duration:g=5e3,onClose:h}){let[i,l]=(0,e.useState)(!1),[m,n]=(0,e.useState)(100),o=k[b],p=o.icon;return(0,d.jsx)("div",{className:`transform transition-all duration-300 ease-in-out ${i?"translate-x-0 opacity-100":"translate-x-full opacity-0"}`,children:(0,d.jsxs)("div",{className:`relative max-w-sm w-full ${o.bgColor} border ${o.borderColor} rounded-lg shadow-lg overflow-hidden`,children:[(0,d.jsx)("div",{className:"absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700",children:(0,d.jsx)("div",{className:`h-full ${o.progressColor} transition-all duration-100 ease-linear`,style:{width:`${m}%`}})}),(0,d.jsx)("div",{className:"p-4",children:(0,d.jsxs)("div",{className:"flex items-start",children:[(0,d.jsx)("div",{className:"flex-shrink-0",children:(0,d.jsx)(p,{className:`h-6 w-6 ${o.iconColor}`})}),(0,d.jsxs)("div",{className:"ml-3 flex-1",children:[(0,d.jsx)("h3",{className:`text-sm font-medium ${o.textColor}`,children:c}),f&&(0,d.jsx)("p",{className:`mt-1 text-sm ${o.textColor} opacity-90`,children:f})]}),(0,d.jsx)("div",{className:"ml-4 flex-shrink-0",children:(0,d.jsx)("button",{onClick:()=>{l(!1),setTimeout(()=>h(a),300)},className:`inline-flex ${o.textColor} hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current rounded-md transition-opacity`,children:(0,d.jsx)(j.A,{className:"h-4 w-4"})})})]})})]})})}function m({toasts:a,onClose:b}){return(0,d.jsx)("div",{className:"fixed top-4 right-4 z-50 space-y-3",children:a.map(a=>(0,d.jsx)(l,{...a,onClose:b},a.id))})}let n=(0,e.createContext)(void 0),o=()=>{let a=(0,e.useContext)(n);if(!a)throw Error("useToastContext must be used within a ToastProvider");return a};function p({children:a}){let b=(()=>{let[a,b]=(0,e.useState)([]),c=(0,e.useCallback)(a=>{let c=Math.random().toString(36).substr(2,9),d={...a,id:c};return b(a=>[...a,d]),c},[]),d=(0,e.useCallback)(a=>{b(b=>b.filter(b=>b.id!==a))},[]),f=(0,e.useCallback)((a,b,d)=>c({type:"success",title:a,message:b,duration:d}),[c]),g=(0,e.useCallback)((a,b,d)=>c({type:"error",title:a,message:b,duration:d}),[c]),h=(0,e.useCallback)((a,b,d)=>c({type:"warning",title:a,message:b,duration:d}),[c]),i=(0,e.useCallback)((a,b,d)=>c({type:"info",title:a,message:b,duration:d}),[c]);return{toasts:a,addToast:c,removeToast:d,showSuccess:f,showError:g,showWarning:h,showInfo:i}})(),c={showSuccess:b.showSuccess,showError:b.showError,showWarning:b.showWarning,showInfo:b.showInfo};return(0,d.jsxs)(n.Provider,{value:c,children:[a,(0,d.jsx)(m,{toasts:b.toasts,onClose:b.removeToast})]})}},4677:(a,b,c)=>{"use strict";c.d(b,{default:()=>e});var d=c(7954);(0,d.registerClientReference)(function(){throw Error("Attempted to call useToastContext() from the server but useToastContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\RoyRoyFx\\Desktop\\OneUssagePhoto\\src\\components\\ToastProvider.tsx","useToastContext");let e=(0,d.registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\RoyRoyFx\\\\Desktop\\\\OneUssagePhoto\\\\src\\\\components\\\\ToastProvider.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\RoyRoyFx\\Desktop\\OneUssagePhoto\\src\\components\\ToastProvider.tsx","default")},5346:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,4160,23)),Promise.resolve().then(c.t.bind(c,1603,23)),Promise.resolve().then(c.t.bind(c,8495,23)),Promise.resolve().then(c.t.bind(c,5170,23)),Promise.resolve().then(c.t.bind(c,7526,23)),Promise.resolve().then(c.t.bind(c,8922,23)),Promise.resolve().then(c.t.bind(c,9234,23)),Promise.resolve().then(c.t.bind(c,2263,23)),Promise.resolve().then(c.bind(c,2146))},5428:(a,b,c)=>{Promise.resolve().then(c.bind(c,4677))},5594:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,1170,23)),Promise.resolve().then(c.t.bind(c,3597,23)),Promise.resolve().then(c.t.bind(c,6893,23)),Promise.resolve().then(c.t.bind(c,9748,23)),Promise.resolve().then(c.t.bind(c,6060,23)),Promise.resolve().then(c.t.bind(c,7184,23)),Promise.resolve().then(c.t.bind(c,9576,23)),Promise.resolve().then(c.t.bind(c,3041,23)),Promise.resolve().then(c.t.bind(c,1384,23))},8580:(a,b,c)=>{Promise.resolve().then(c.bind(c,2966))}};