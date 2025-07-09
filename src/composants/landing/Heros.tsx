'use client'
import Link from 'next/link'

export function Heros() {
  return (
    <section className="gradient-guinea text-white py-16 px-4" id="accueil">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-floating">
            Projet Insertion des Jeunes Simandou 2040
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère
          </p>
          <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-4 mb-8 inline-block border-2 border-white/30">
            <span className="text-lg font-bold">Un pont vers la prospérité ! 🇬🇳</span>
          </div>
          <Link
            href="/inscription"
            className="inline-block bg-white text-guinea-red px-8 py-4 rounded-full text-lg font-bold hover:bg-guinea-yellow hover:text-dark-gray transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Rejoindre le programme
          </Link>
        </div>
      </div>
    </section>
  )
}
