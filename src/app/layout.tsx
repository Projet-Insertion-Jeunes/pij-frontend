import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projet Insertion des Jeunes Simandou 2040 | Ministère de la Jeunesse et des Sports',
  description: 'Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère',
  keywords: 'insertion jeunes, emploi guinée, formation professionnelle, simandou 2040',
  authors: [{ name: 'Ministère de la Jeunesse et des Sports - République de Guinée' }],
  creator: 'République de Guinée',
  publisher: 'Ministère de la Jeunesse et des Sports',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Projet Insertion des Jeunes Simandou 2040',
    description: 'Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère',
    url: 'http://localhost:3000',
    siteName: 'PIJ Simandou 2040',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Projet Insertion des Jeunes Simandou 2040',
      },
    ],
    locale: 'fr_GN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projet Insertion des Jeunes Simandou 2040',
    description: 'Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère',
    images: ['/images/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#B8202E' },
    { media: '(prefers-color-scheme: dark)', color: '#B8202E' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
