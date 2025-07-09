import { Bell, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { StatistiquesNotificationsInterface } from '@/types/notifications'

interface StatistiquesNotificationsProps {
  statistiques: StatistiquesNotificationsInterface
}

export function StatistiquesNotifications({ statistiques }: StatistiquesNotificationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-guinea-red/10 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Bell className="h-6 w-6 text-guinea-red" />
        </div>
        <div className="text-2xl font-bold text-guinea-red">{statistiques.total}</div>
        <div className="text-sm text-text-gray">Total notifications</div>
      </div>

      <div className="bg-orange-100 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Clock className="h-6 w-6 text-orange-600" />
        </div>
        <div className="text-2xl font-bold text-orange-600">{statistiques.nonLues}</div>
        <div className="text-sm text-text-gray">Non lues</div>
      </div>

      <div className="bg-blue-100 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>
        <div className="text-2xl font-bold text-blue-600">{statistiques.cetteSemaine}</div>
        <div className="text-sm text-text-gray">Cette semaine</div>
      </div>

      <div className="bg-green-100 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div className="text-2xl font-bold text-green-600">
          {Math.round(((statistiques.total - statistiques.nonLues) / Math.max(statistiques.total, 1)) * 100)}%
        </div>
        <div className="text-sm text-text-gray">Taux de lecture</div>
      </div>
    </div>
  )
}
