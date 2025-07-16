'use client'
import { useState, useEffect } from 'react'

interface PWAState {
 estInstallable: boolean
 estInstalle: boolean
 estHorsLigne: boolean
 peutInstaller: boolean
 installerApp: () => Promise<void>
 mettreAJourApp: () => void
}

export function usePWA(): PWAState {
 const [estInstallable, setEstInstallable] = useState(false)
 const [estInstalle, setEstInstalle] = useState(false)
 const [estHorsLigne, setEstHorsLigne] = useState(false)
 const [evenementInstallation, setEvenementInstallation] = useState<any>(null)

 useEffect(() => {
   // Vérifier si l'app est déjà installée
   const estDejaInstalle = window.matchMedia('(display-mode: standalone)').matches ||
                           (window.navigator as any).standalone ||
                           document.referrer.includes('android-app://')
   
   setEstInstalle(estDejaInstalle)

   // Écouter l'événement beforeinstallprompt
   const gererBeforeInstallPrompt = (e: Event) => {
     e.preventDefault()
     setEvenementInstallation(e)
     setEstInstallable(true)
   }

   // Écouter l'installation
   const gererAppInstalled = () => {
     setEstInstalle(true)
     setEstInstallable(false)
     setEvenementInstallation(null)
   }

   // État de connexion
   const mettreAJourStatutConnexion = () => {
     setEstHorsLigne(!navigator.onLine)
   }

   // Enregistrer les événements
   window.addEventListener('beforeinstallprompt', gererBeforeInstallPrompt)
   window.addEventListener('appinstalled', gererAppInstalled)
   window.addEventListener('online', mettreAJourStatutConnexion)
   window.addEventListener('offline', mettreAJourStatutConnexion)

   // État initial
   mettreAJourStatutConnexion()

   // Enregistrer le service worker
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js')
       .then((registration) => {
         console.log('Service Worker enregistré:', registration)
         
         // Vérifier les mises à jour
         registration.addEventListener('updatefound', () => {
           const nouveauWorker = registration.installing
           if (nouveauWorker) {
             nouveauWorker.addEventListener('statechange', () => {
               if (nouveauWorker.state === 'installed' && navigator.serviceWorker.controller) {
                 // Nouvelle version disponible
                 if (confirm('Une nouvelle version est disponible. Voulez-vous l\'installer ?')) {
                   nouveauWorker.postMessage({ type: 'SKIP_WAITING' })
                   window.location.reload()
                 }
               }
             })
           }
         })
       })
       .catch((error) => {
         console.log('Erreur enregistrement Service Worker:', error)
       })
   }

   return () => {
     window.removeEventListener('beforeinstallprompt', gererBeforeInstallPrompt)
     window.removeEventListener('appinstalled', gererAppInstalled)
     window.removeEventListener('online', mettreAJourStatutConnexion)
     window.removeEventListener('offline', mettreAJourStatutConnexion)
   }
 }, [])

 const installerApp = async (): Promise<void> => {
   if (!evenementInstallation) {
     throw new Error('Installation non disponible')
   }

   const resultat = await evenementInstallation.prompt()
   
   if (resultat.outcome === 'accepted') {
     setEstInstalle(true)
     setEstInstallable(false)
     setEvenementInstallation(null)
   }
 }

 const mettreAJourApp = () => {
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.getRegistration()
       .then((registration) => {
         if (registration) {
           registration.update()
         }
       })
   }
 }

 return {
   estInstallable,
   estInstalle,
   estHorsLigne,
   peutInstaller: estInstallable && !estInstalle,
   installerApp,
   mettreAJourApp
 }
}
