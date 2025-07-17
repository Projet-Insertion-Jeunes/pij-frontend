'use client'

import { Bell, Search, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

interface EnTeteDashboardProps {
  typeUtilisateur: 'admin' | 'conseiller' | 'entreprise' | 'jeune'
}

export function EnTeteDashboard({ typeUtilisateur }: EnTeteDashboardProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const getUserInfo = () => {
    switch (typeUtilisateur) {
      case 'admin':
        return {
          name: 'Administrateur PIJ',
          email: 'admin@simandou.gn',
          role: 'Administrateur Système'
        }
      case 'conseiller':
        return {
          name: 'Conseiller PIJ',
          email: 'conseiller@simandou.gn',
          role: 'Conseiller d\'Insertion'
        }
      case 'entreprise':
        return {
          name: 'Entreprise',
          email: 'entreprise@example.com',
          role: 'Recruteur'
        }
      case 'jeune':
        return {
          name: 'Jeune PIJ',
          email: 'jeune@example.com',
          role: 'Candidat'
        }
      default:
        return {
          name: 'Utilisateur',
          email: 'user@example.com',
          role: 'Utilisateur'
        }
    }
  }

  const userInfo = getUserInfo()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo et titre */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PIJ</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Plateforme d'Insertion des Jeunes
              </h1>
              <p className="text-sm text-gray-600">Simandou 2040</p>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              {/* Badge de notification */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Dropdown notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm text-gray-800">Nouveau profil jeune en attente de validation</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 5 minutes</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm text-gray-800">Entreprise ABC a publié une nouvelle offre</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 1 heure</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">Rapport hebdomadaire disponible</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profil utilisateur */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {userInfo.name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                <p className="text-xs text-gray-600">{userInfo.role}</p>
              </div>
            </button>

            {/* Dropdown profil */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{userInfo.name}</p>
                  <p className="text-sm text-gray-600">{userInfo.email}</p>
                  <p className="text-xs text-gray-500 mt-1">{userInfo.role}</p>
                </div>
                <div className="py-2">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 