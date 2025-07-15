"use client"; 

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-guinea flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold mb-4">404</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Page non trouvée
        </h2>
        
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
          Retournez à l'accueil pour découvrir nos programmes d'insertion professionnelle.
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-guinea-red px-8 py-4 rounded-full font-bold text-lg hover:bg-guinea-yellow hover:text-dark-gray transition-all duration-300 shadow-lg"
          >
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-guinea-red transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Page précédente
          </button>
        </div>
        
        <div className="mt-12 text-sm opacity-75">
          <p>République de Guinée - Travail, Justice, Solidarité</p>
        </div>
      </div>
    </div>
  )
}
