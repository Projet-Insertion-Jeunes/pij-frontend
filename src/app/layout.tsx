import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projet Insertion des Jeunes Simandou 2040 | Ministère de la Jeunesse et des Sports',
  description: 'Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère',
  keywords: 'insertion jeunes, emploi guinée, formation professionnelle, simandou 2040',
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
