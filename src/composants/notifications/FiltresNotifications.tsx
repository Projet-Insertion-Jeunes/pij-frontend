import { X } from 'lucide-react'

interface FiltresNotificationsProps {
  filtres: Record<string, any>
  onChangementFiltres: (filtres: Record<string, any>) => void
  onFermer: () => void
}

export function FiltresNotifications({ filtres, onChangementFiltres, onFermer }: FiltresNotificationsProps) {
  const gererChangement = (cle: string, valeur: string) => {
    onChangementFiltres({
      ...filtres,
      [cle]: valeur || undefined
    })
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-dark-gray">Filtrer les notifications</h3>
        <button
          onClick={onFermer}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">Canal</label>
          <select
            value={filtres.canal || ''}
            onChange={(e) => gererChangement('canal', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
          >
            <option value="">Tous les canaux</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
            <option value="interne">Interne</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">Statut</label>
          <select
            value={filtres.statut || ''}
            onChange={(e) => gererChangement('statut', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="envoye">Envoyé</option>
            <option value="delivre">Délivré</option>
            <option value="lu">Lu</option>
            <option value="echec">Échec</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">Priorité</label>
          <select
            value={filtres.priorite || ''}
            onChange={(e) => gererChangement('priorite', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
          >
            <option value="">Toutes les priorités</option>
            <option value="faible">Faible</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
      </div>
    </div>
  )
}
