'use client'
import { useState, useEffect } from 'react'
import { Bell, Filter, CheckCheck, Settings, BarChart3 } from 'lucide-react'
import { NotificationInterface, StatistiquesNotificationsInterface } from '@/types/notifications'
import { serviceNotifications } from '@/services/notifications'
import { CarteNotification } from '@/composants/notifications/CarteNotification'
import { StatistiquesNotifications } from '@/composants/notifications/StatistiquesNotifications'
import { FiltresNotifications } from '@/composants/notifications/FiltresNotifications'

export default function PageNotifications() {
  const [notifications, setNotifications] = useState<NotificationInterface[]>([])
  const [statistiques, setStatistiques] = useState<StatistiquesNotificationsInterface | null>(null)
  const [chargement, setChargement] = useState(true)
  const [filtres, setFiltres] = useState<Record<string, any>>({})
  const [afficherFiltres, setAfficherFiltres] = useState(false)
  const [ongletActif, setOngletActif] = useState<'toutes' | 'non_lues'>('toutes')

  const chargerDonnees = async () => {
    setChargement(true)
    try {
      const filtresAvecOnglet = {
        ...filtres,
        ...(ongletActif === 'non_lues' && { nonLues: true })
      }

      const [notificationsData, statsData] = await Promise.all([
        serviceNotifications.obtenirMesNotifications(filtresAvecOnglet),
        serviceNotifications.obtenirStatistiques()
      ])
      
      setNotifications(notificationsData)
      setStatistiques(statsData)
    } catch (error) {
      console.error('Erreur chargement:', error)
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => {
    chargerDonnees()
  }, [filtres, ongletActif])

  const gererChangementFiltres = (nouveauxFiltres: Record<string, any>) => {
    setFiltres(nouveauxFiltres)
  }

  const marquerToutesLues = async () => {
    try {
      await serviceNotifications.marquerToutesLues()
      chargerDonnees()
    } catch (error) {
      console.error('Erreur marquage global:', error)
      alert('Erreur lors du marquage des notifications')
    }
  }

  if (chargement) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-guinea-red"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-gray mb-2">Notifications</h1>
            <p className="text-text-gray">
              Restez informé de toutes vos activités sur la plateforme PIJ
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setAfficherFiltres(!afficherFiltres)}
              className="bg-white border border-gray-300 text-dark-gray px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres
            </button>
            
            {statistiques && statistiques.nonLues > 0 && (
              <button
                onClick={marquerToutesLues}
                className="bg-guinea-green text-white px-4 py-2 rounded-lg hover:bg-secondary-green transition-colors flex items-center gap-2"
              >
                <CheckCheck className="h-4 w-4" />
                Tout marquer lu
              </button>
            )}
          </div>
        </div>

        {/* Statistiques simplifiées pour l'instant */}
        {statistiques && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-guinea-red/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-guinea-red">{statistiques.total}</div>
              <div className="text-sm text-text-gray">Total notifications</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{statistiques.nonLues}</div>
              <div className="text-sm text-text-gray">Non lues</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{statistiques.cetteSemaine}</div>
              <div className="text-sm text-text-gray">Cette semaine</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(((statistiques.total - statistiques.nonLues) / Math.max(statistiques.total, 1)) * 100)}%
              </div>
              <div className="text-sm text-text-gray">Taux de lecture</div>
            </div>
          </div>
        )}
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setOngletActif('toutes')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                ongletActif === 'toutes'
                  ? 'border-guinea-red text-guinea-red'
                  : 'border-transparent text-text-gray hover:text-dark-gray'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Toutes les notifications
                {statistiques && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {statistiques.total}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setOngletActif('non_lues')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                ongletActif === 'non_lues'
                  ? 'border-guinea-red text-guinea-red'
                  : 'border-transparent text-text-gray hover:text-dark-gray'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Non lues
                {statistiques && statistiques.nonLues > 0 && (
                  <span className="bg-guinea-red text-white px-2 py-1 rounded-full text-xs">
                    {statistiques.nonLues}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>

        {/* Liste des notifications */}
        <div className="p-6">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dark-gray">{notification.titre}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      notification.statut === 'lu' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {notification.statutDisplay}
                    </span>
                  </div>
                  <p className="text-text-gray text-sm mb-3">{notification.message}</p>
                  <div className="flex justify-between items-center text-xs text-text-gray">
                    <span>{notification.tempsEcoule}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{notification.canalDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="mx-auto h-16 w-16 text-text-gray mb-4" />
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                {ongletActif === 'non_lues' ? 'Aucune notification non lue' : 'Aucune notification'}
              </h3>
              <p className="text-text-gray">
                {ongletActif === 'non_lues' 
                  ? 'Toutes vos notifications ont été lues !' 
                  : 'Vous recevrez ici toutes vos notifications PIJ'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lien vers les préférences */}
      <div className="bg-gradient-to-r from-guinea-yellow to-guinea-green rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">⚙️ Personnalisez vos notifications</h2>
            <p className="opacity-90">
              Configurez quand et comment vous souhaitez être notifié selon vos préférences
            </p>
          </div>
          
          <button className="bg-white text-dark-gray px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-medium">
            <Settings className="h-5 w-5" />
            Gérer les préférences
          </button>
        </div>
      </div>
    </div>
  )
}
