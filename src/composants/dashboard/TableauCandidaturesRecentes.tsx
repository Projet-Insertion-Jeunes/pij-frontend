'use client'

import { Clock, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Candidature {
  id: string
  candidatNom: string
  candidatEmail: string
  offreTitle: string
  datePostulation: string
  statut: 'en_attente' | 'acceptee' | 'rejetee' | 'en_cours'
  score?: number
}

interface TableauCandidaturesRecentesProps {
  candidatures: Candidature[]
  limit?: number
}

export function TableauCandidaturesRecentes({ candidatures, limit = 10 }: TableauCandidaturesRecentesProps) {
  const candidaturesDefaut: Candidature[] = [
    {
      id: '1',
      candidatNom: 'Mamadou Diallo',
      candidatEmail: 'mamadou.diallo@example.com',
      offreTitle: 'Technicien de Maintenance',
      datePostulation: '2024-01-15T10:30:00',
      statut: 'en_attente',
      score: 85
    },
    {
      id: '2',
      candidatNom: 'Fatoumata Camara',
      candidatEmail: 'fatoumata.camara@example.com',
      offreTitle: 'Ouvrier de Construction',
      datePostulation: '2024-01-14T14:20:00',
      statut: 'acceptee',
      score: 92
    },
    {
      id: '3',
      candidatNom: 'Ibrahima Bah',
      candidatEmail: 'ibrahima.bah@example.com',
      offreTitle: 'Chauffeur Poids Lourd',
      datePostulation: '2024-01-14T09:15:00',
      statut: 'en_cours',
      score: 78
    },
    {
      id: '4',
      candidatNom: 'Aissatou Kaba',
      candidatEmail: 'aissatou.kaba@example.com',
      offreTitle: 'Aide-Cuisinier',
      datePostulation: '2024-01-13T16:45:00',
      statut: 'rejetee',
      score: 65
    },
    {
      id: '5',
      candidatNom: 'Moussa Conde',
      candidatEmail: 'moussa.conde@example.com',
      offreTitle: 'Stage Développement Communautaire',
      datePostulation: '2024-01-13T11:30:00',
      statut: 'en_attente',
      score: 88
    }
  ]

  const data = candidatures && candidatures.length > 0 ? candidatures : candidaturesDefaut
  const displayData = data.slice(0, limit)

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'acceptee':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejetee':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'en_cours':
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'En attente'
      case 'acceptee':
        return 'Acceptée'
      case 'rejetee':
        return 'Rejetée'
      case 'en_cours':
        return 'En cours'
      default:
        return 'Inconnu'
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'acceptee':
        return 'bg-green-100 text-green-800'
      case 'rejetee':
        return 'bg-red-100 text-red-800'
      case 'en_cours':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Il y a 1 jour'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Candidatures Récentes</h3>
        <p className="text-sm text-gray-600 mt-1">
          {displayData.length} candidatures sur {data.length} au total
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Offre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData.map((candidature) => (
              <tr key={candidature.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidature.candidatNom}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidature.candidatEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidature.offreTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(candidature.datePostulation)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidature.score && (
                    <div className="text-sm text-gray-900">
                      <span className={`font-semibold ${
                        candidature.score >= 80 ? 'text-green-600' :
                        candidature.score >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {candidature.score}%
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(candidature.statut)}`}>
                    {getStatutIcon(candidature.statut)}
                    {getStatutLabel(candidature.statut)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye className="h-4 w-4" />
                  </button>
                  {candidature.statut === 'en_attente' && (
                    <>
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > limit && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir toutes les candidatures ({data.length - limit} de plus)
          </button>
        </div>
      )}
    </div>
  )
} 