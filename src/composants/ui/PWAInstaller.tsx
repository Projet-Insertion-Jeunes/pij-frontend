'use client'
import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

export function PWAInstaller() {
 const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
 const [showInstallPrompt, setShowInstallPrompt] = useState(false)

 useEffect(() => {
   const handler = (e: Event) => {
     e.preventDefault()
     setDeferredPrompt(e)
     setShowInstallPrompt(true)
   }

   window.addEventListener('beforeinstallprompt', handler)

   return () => window.removeEventListener('beforeinstallprompt', handler)
 }, [])

 const handleInstall = async () => {
   if (!deferredPrompt) return

   deferredPrompt.prompt()
   const { outcome } = await deferredPrompt.userChoice
   
   if (outcome === 'accepted') {
     setDeferredPrompt(null)
     setShowInstallPrompt(false)
   }
 }

 const handleDismiss = () => {
   setShowInstallPrompt(false)
   // Cache pour 7 jours
   localStorage.setItem('pwa-install-dismissed', Date.now().toString())
 }

 // Vérifier si déjà installé ou récemment refusé
 useEffect(() => {
   const dismissed = localStorage.getItem('pwa-install-dismissed')
   if (dismissed) {
     const dismissedTime = parseInt(dismissed)
     const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
     if (dismissedTime > weekAgo) {
       setShowInstallPrompt(false)
       return
     }
   }

   // Vérifier si déjà en mode standalone
   if (window.matchMedia('(display-mode: standalone)').matches) {
     setShowInstallPrompt(false)
   }
 }, [])

 if (!showInstallPrompt || !deferredPrompt) return null

 return (
   <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50">
     <div className="flex items-start gap-3">
       <div className="w-12 h-12 bg-gradient-to-br from-guinea-red to-guinea-yellow rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
         PIJ
       </div>
       
       <div className="flex-1 min-w-0">
         <h3 className="font-semibold text-dark-gray text-sm">
           Installer PIJ Simandou 2040
         </h3>
         <p className="text-xs text-text-gray mt-1">
           Accédez rapidement à vos candidatures et offres d'emploi
         </p>
         
         <div className="flex gap-2 mt-3">
           <button
             onClick={handleInstall}
             className="bg-guinea-red text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-secondary-red transition-colors flex items-center gap-1"
           >
             <Download className="h-3 w-3" />
             Installer
           </button>
           <button
             onClick={handleDismiss}
             className="text-text-gray hover:text-dark-gray px-2 py-2 rounded-lg text-xs transition-colors"
           >
             Plus tard
           </button>
         </div>
       </div>
       
       <button
         onClick={handleDismiss}
         className="text-text-gray hover:text-dark-gray p-1 flex-shrink-0"
       >
         <X className="h-4 w-4" />
       </button>
     </div>
   </div>
 )
}
