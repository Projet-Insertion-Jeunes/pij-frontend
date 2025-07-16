'use client'
import { useState } from 'react'
import { Bell, ExternalLink, Check } from 'lucide-react'
import { NotificationInterface } from '@/types/notifications'
import { serviceNotifications } from '@/services/notifications'

interface CarteNotificationProps {
  notification: NotificationInterface
  onMiseAJour: () => void
}

export function CarteNotification({ notification, onMiseAJour }: CarteNotificationProps) {
  const [chargement, setChargement] = useState(false)

  const getPrioriteColor = (priorite: string) => {
    const colors = {
      faible: 'bg-gray-100 text-gray-600',
      normale: 'bg-blue-100 text-blue-600',
      haute: 'bg-orange-100 text-orange-600',
      urgente: 'bg-red-100 text-red-600'
    }
    return colors[priorite as keyof typeof colors] || colors.normale
  }

  const getStatutColor = (statut: string) => {
    const colors = {
      en_attente: 'bg-yellow-100 text-yellow-600',
      envoye: 'bg-blue-100 text-blue-600',
      delivre: 'bg-green-100 text-green-600',
      lu: 'bg-gray-100 text-gray-600',
      echec: 'bg-red-100 text-red-600'
    }
    return colors[statut as keyof typeof colors] || colors.envoye
  }

  const marquerLue = async () => {
    if (notification.statut === 'lu') return
    
    setChargement(true)
    try {
      await serviceNotifications.marquerNotificationLue(notification.id)
      onMiseAJour()
    } catch (error) {
      console.error('Erreur marquage:', error)
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${
      notification.statut === 'lu' 
        ? 'border-gray-200 bg-white' 
        : 'border-guinea-red/30 bg-guinea-red/5 shadow-sm'
    }`}>
      {/* En-tête */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            notification.statut === 'lu' ? 'bg-gray-100' : 'bg-guinea-red/10'
          }`}>
            <Bell className={`h-4 w-4 ${
              notification.statut === 'lu' ? 'text-gray-500' : 'text-guinea-red'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-dark-gray">{notification.titre}</h3>
            <p className="text-xs text-text-gray">{notification.typeNotification.nom}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioriteColor(notification.priorite)}`}>
            {notification.prioriteDisplay}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(notification.statut)}`}>
            {notification.statutDisplay}
          </span>
        </div>
      </div>

      {/* Message */}
      <p className="text-text-gray text-sm mb-4">{notification.message}</p>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-xs text-text-gray">
          <span>{notification.tempsEcoule}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{notification.canalDisplay}</span>
        </div>

        <div className="flex gap-2">
          {notification.urlAction && (
            
              href={notification.urlAction}
              className="text-guinea-red hover:text-secondary-red text-sm font-medium flex items-center gap-1"
            >
              {notification.boutonActionTexte || 'Voir'}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          
          {notification.statut !== 'lu' && (
            <button
              onClick={marquerLue}
              disabled={chargement}
              className="text-guinea-green hover:text-green-700 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
            >
              <Check className="h-3 w-3" />
              {chargement ? 'Marquage...' : 'Marquer lu'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
