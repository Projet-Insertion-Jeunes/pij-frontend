'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function EnTete() {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)

  const liens = [
    { href: '#accueil', texte: 'Accueil' },
    { href: '#inscription', texte: 'Inscription' },
    { href: '#contexte', texte: 'Contexte' },
    { href: '#parcours', texte: 'Parcours' },
    { href: '#composantes', texte: 'Composantes' },
    { href: '#partenaires', texte: 'Partenaires' },
    { href: '#contact', texte: 'Contact' },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-guinea-red">
      {/* Bande gouvernementale */}
      <div className="bg-guinea-red text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-3">
            <div className="flex w-8 h-5 border border-white/30">
              <div className="flex-1 bg-guinea-red"></div>
              <div className="flex-1 bg-guinea-yellow"></div>
              <div className="flex-1 bg-guinea-green"></div>
            </div>
            <span>République de Guinée</span>
          </div>
          <div>Travail - Justice - Solidarité</div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo et titre */}
          <Link href="/" className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-guinea-red to-guinea-yellow rounded-full flex items-center justify-center text-white font-bold text-xl">
              MJS
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-guinea-red">Simandou 2040</h1>
              <p className="text-xs text-text-gray uppercase">Projet Insertion des Jeunes</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <ul className="hidden lg:flex items-center gap-8">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link 
                  href={lien.href}
                  className="text-dark-gray hover:text-guinea-red hover:bg-guinea-red/10 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                >
                  {lien.texte}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
            className="lg:hidden p-2"
          >
            {menuMobileOuvert ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuMobileOuvert && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <ul className="space-y-2 pt-4">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="block px-4 py-3 text-dark-gray hover:bg-guinea-red hover:text-white rounded-lg transition-all duration-300"
                    onClick={() => setMenuMobileOuvert(false)}
                  >
                    {lien.texte}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
