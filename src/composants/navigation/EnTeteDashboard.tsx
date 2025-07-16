'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings,
  Menu,
  X
} from 'lucide-react'

interface EnTeteDashboardProps {
  typeUtilisateur: 'jeune' | 'entreprise' | 'admin'
}

export function EnTeteDashboard({ typeUtilisateur }: EnTeteDashboardProps) {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [notificationsOuvertes, setNotificationsOuvertes] = useState(false)

  const getTitreUtilisateur = () => {
    switch (typeUtilisateur) {
      case 'jeune':
        return 'Espace Jeune'
      case 'entreprise':
        return 'Espace Entreprise'
      case 'admin':
        return 'Administration'
      default:
        return 'Tableau de Bord'
    }
  }

  const getCouleurUtilisateur = () => {
    switch (typeUtilisateur) {
      case 'jeune':
        return 'from-guinea-green to-guinea-yellow'
      case 'entreprise':
        return 'from-guinea-blue to-guinea-red'
      case 'admin':
        return 'from-guinea-red to-guinea-yellow'
      default:
        return 'from-guinea-red to-guinea-yellow'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${getCouleurUtilisateur()} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
              {typeUtilisateur.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-dark-gray">{getTitreUtilisateur()}</h1>
              <p className="text-sm text-text-gray">Projet Insertion des Jeunes Simandou 2040</p>
            </div>
          </div>

          {/* Actions de droite */}
          <div className="flex items-center gap-4">
            {/* Barre de recherche */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOuvertes(!notificationsOuvertes)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-guinea-red text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Dropdown notifications */}
              {notificationsOuvertes && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-dark-gray">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-dark-gray">Nouvelle offre d'emploi</p>
                      <p className="text-xs text-text-gray">Une offre correspondant à votre profil est disponible</p>
                      <p className="text-xs text-gray-400 mt-1">Il y a 2 heures</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-dark-gray">Candidature acceptée</p>
                      <p className="text-xs text-text-gray">Votre candidature a été acceptée pour un entretien</p>
                      <p className="text-xs text-gray-400 mt-1">Il y a 1 jour</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-dark-gray">Formation disponible</p>
                      <p className="text-xs text-text-gray">Une nouvelle formation est disponible dans votre parcours</p>
                      <p className="text-xs text-gray-400 mt-1">Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profil utilisateur */}
            <div className="relative">
              <button
                onClick={() => setMenuOuvert(!menuOuvert)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center text-white font-medium text-sm">
                  M
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-dark-gray">Mamadou Diallo</p>
                  <p className="text-xs text-text-gray">mamadou@example.com</p>
                </div>
              </button>

              {/* Dropdown profil */}
              {menuOuvert && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/tableau-de-bord/jeune/profil"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} />
                      Mon Profil
                    </Link>
                    <Link
                      href="/tableau-de-bord/jeune/parametres"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings size={16} />
                      Paramètres
                    </Link>
                    <hr className="my-2" />
                    <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                      <LogOut size={16} />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Menu mobile */}
            <button
              onClick={() => setMenuOuvert(!menuOuvert)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {menuOuvert ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOuvert && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <Link
                href="/tableau-de-bord/jeune/profil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Mon Profil
              </Link>
              <Link
                href="/tableau-de-bord/jeune/parametres"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Paramètres
              </Link>
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 