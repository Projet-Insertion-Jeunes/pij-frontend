'use client'
import { Bell, X } from 'lucide-react'
import { useState } from 'react'

export function AlertesNotifications() {
  const [alertes] = useState([
    {
      id: 1,
      type: 'info',
      titre: 'Nouvelle fonctionnalité',
      message: 'Le système d\'évaluation par les employeurs est maintenant disponible !',
    },
    {
      id: 2,
      type: 'success', 
      titre: 'Candidature acceptée',
      message: 'Votre candidature chez TechCorp a été acceptée. Félicitations !',
    }
  ])

  if (alertes.length === 0) return null

  return (
    <div className="space-y-3">
      {alertes.map((alerte) => (
        <div
          key={alerte.id}
          className={`p-4 rounded-lg border-l-4 ${
            alerte.type === 'info' 
              ? 'bg-blue-50 border-blue-400 text-blue-800'
              : 'bg-green-50 border-green-400 text-green-800'
          }`}
        >
          <div className="flex items-start">
            <Bell className="h-5 w-5 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="font-medium">{alerte.titre}</h3>
              <p className="text-sm mt-1">{alerte.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
