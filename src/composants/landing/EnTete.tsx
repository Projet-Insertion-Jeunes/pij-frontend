'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function EnTete() {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)

  const liens = [
    { href: '#accueil', texte: 'Accueil' },
    { href: '#inscription', texte: 'Inscription' },
    { href: '#parcours', texte: 'Parcours' },
    { href: '#composantes', texte: 'Composantes' },
    { href: '#partenaires', texte: 'Partenaires' },
    { href: '#contact', texte: 'Contact' },
    { href: '/connexion', texte: 'Se connecter', isButton: true, buttonType: 'outline' },
    { href: '/inscription', texte: 'S\'inscrire', isButton: true, buttonType: 'filled' },
  ]

  const toggleMobileMenu = () => {
    setMenuMobileOuvert(!menuMobileOuvert)
  }

  const closeMobileMenu = () => {
    setMenuMobileOuvert(false)
  }

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
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-start gap-2 md:gap-4">
          {/* Logo et titre - Compact */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-guinea-red to-guinea-yellow rounded-full flex items-center justify-center text-white font-bold text-lg">
              MJS
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-guinea-red leading-tight">Simandou 2040</h1>
              <p className="text-xs text-text-gray uppercase leading-tight">Projet Insertion des Jeunes</p>
            </div>
          </Link>

          {/* Navigation desktop - Tout sur une ligne */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1">
            <ul className="flex items-center gap-1 lg:gap-2">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link 
                    href={lien.href}
                    className={lien.isButton 
                      ? lien.buttonType === 'filled'
                        ? "bg-guinea-red text-white px-4 lg:px-6 py-2.5 rounded-lg font-semibold hover:bg-guinea-red/90 transition-all duration-300 border-2 border-guinea-red hover:bg-transparent hover:text-guinea-red text-sm lg:text-base whitespace-nowrap"
                        : "bg-transparent text-guinea-red px-4 lg:px-6 py-2.5 rounded-lg font-semibold hover:bg-guinea-red hover:text-white transition-all duration-300 border-2 border-guinea-red text-sm lg:text-base whitespace-nowrap"
                      : "text-dark-gray hover:text-guinea-red hover:bg-guinea-red/10 px-2 lg:px-3 py-2 rounded-lg transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap"
                    }
                  >
                    {lien.texte}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 ml-auto"
          >
            {menuMobileOuvert ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuMobileOuvert && (
          <div className="md:hidden mt-3 pb-4 border-t border-gray-200">
            <ul className="space-y-1 pt-3 px-3">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className={lien.isButton 
                      ? lien.buttonType === 'filled'
                        ? "block w-full bg-guinea-red text-white text-center px-4 py-2.5 rounded-lg font-semibold hover:bg-guinea-red/90 transition-all duration-300 text-sm"
                        : "block w-full bg-transparent text-guinea-red text-center px-4 py-2.5 rounded-lg font-semibold hover:bg-guinea-red hover:text-white transition-all duration-300 border-2 border-guinea-red text-sm"
                      : "block px-3 py-2 text-dark-gray hover:bg-guinea-red hover:text-white rounded-lg transition-all duration-300 text-sm"
                    }
                    onClick={closeMobileMenu}
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
