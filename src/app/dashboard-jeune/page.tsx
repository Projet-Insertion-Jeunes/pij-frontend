'use client'

import { useEffect, useState } from 'react'
import { serviceAuth } from '@/services/auth'
import { useRouter } from 'next/navigation'

export default function DashboardJeune() {
  const [utilisateur, setUtilisateur] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = serviceAuth.obtenirUtilisateurActuel()
    if (!user || user.typeUtilisateur !== 'jeune') {
      router.push('/')
      return
    }
    setUtilisateur(user)
    setLoading(false)
  }, [router])

  const handleDeconnexion = async () => {
    await serviceAuth.deconnexion()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Jeune
              </h1>
              <p className="text-gray-600">
                Bienvenue, {utilisateur?.prenom} {utilisateur?.nom}
              </p>
            </div>
            <button
              onClick={handleDeconnexion}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte Statistiques */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Score Global
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        0.0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Candidatures */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📝</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Candidatures
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Offres */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">💼</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Offres Disponibles
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ajoutez ici d'autres composants ou sections du dashboard */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bienvenue sur votre espace jeune !</h2>
            <p className="text-gray-600">
              Vous pourrez bientôt suivre vos candidatures, vos parcours, vos notifications et bien plus encore.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 