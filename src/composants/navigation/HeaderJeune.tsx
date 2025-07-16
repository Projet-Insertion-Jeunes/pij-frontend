'use client'

import { Search } from 'lucide-react'

export function HeaderJeune() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm p-5 rounded-lg mb-6">
      <div className="flex justify-between items-center">
        <div className="page-title flex items-center gap-4">
          <h1 className="text-2xl font-bold text-guinea-red">👤 Mon Profil</h1>
          <div className="breadcrumb text-sm text-gray-600">
            🏠 Accueil › 👤 Mon Profil › ✏️ Modifier
          </div>
        </div>
        <div className="profile-completion flex items-center gap-4 bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border border-green-300">
          <div className="completion-circle relative">
            <svg width="50" height="50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#e1e1e1" strokeWidth="4"></circle>
              <circle cx="25" cy="25" r="20" fill="none" stroke="#009460" strokeWidth="4" strokeDasharray="126" strokeDashoffset="31.5"></circle>
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-sm">75%</div>
          </div>
          <div>
            <strong>Profil à 75% complété</strong>
            <p className="text-sm text-gray-600">Ajoutez votre CV et vos compétences pour améliorer votre visibilité</p>
          </div>
        </div>
      </div>
    </header>
  )
}