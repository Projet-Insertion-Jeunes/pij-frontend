import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PWAInstaller } from '@/composants/ui/PWAInstaller'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
 title: 'PIJ Simandou 2040 | Insertion Professionnelle des Jeunes',
 description: 'Plateforme d\'insertion professionnelle des jeunes guinéens - Former, accompagner, insérer',
 keywords: 'insertion jeunes, emploi guinée, formation professionnelle, simandou 2040',
 manifest: '/manifest.json',
 themeColor: '#B8202E',
 viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <html lang="fr">
     <head>
       <link rel="icon" href="/icons/icon-192x192.png" />
       <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
       <meta name="theme-color" content="#B8202E" />
     </head>
     <body className={inter.className}>
       {children}
       <PWAInstaller />
       <script
         dangerouslySetInnerHTML={{
           __html: `
             if ('serviceWorker' in navigator) {
               window.addEventListener('load', function() {
                 navigator.serviceWorker.register('/sw.js')
                   .then(function(registration) {
                     console.log('SW registered: ', registration);
                   })
                   .catch(function(registrationError) {
                     console.log('SW registration failed: ', registrationError);
                   });
               });
             }
           `,
         }}
       />
     </body>
   </html>
 )
}
