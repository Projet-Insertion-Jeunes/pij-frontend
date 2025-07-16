'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Calendar
} from 'lucide-react'

interface Candidature {
  id: string
  titre: string
  entreprise: string
  date: string
  statut: 'en_attente' | 'acceptee' | 'refusee' | 'entretien'
  score?: number
}

interface ListeCandidaturesProps {
  limite?: number
}

export function ListeCandidatures({ limite = 5 }: ListeCandidaturesProps) {
  const [candidatures, setCandidatures] = useState<Candidature[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setCandidatures([
        {
          id: '1',
          titre: 'Développeur Full Stack',
          entreprise: 'Tech Solutions Guinée',
          date: '2024-01-15',
          statut: 'entretien',
          score: 85
        },
        {
          id: '2',
          titre: 'Assistant Marketing',
          entreprise: 'Marketing Pro Conakry',
          date: '2024-01-12',
          statut: 'en_attente',
          score: 72
        },
        {
          id: '3',
          titre: 'Comptable Junior',
          entreprise: 'Cabinet Comptable Alpha',
          date: '2024-01-10',
          statut: 'acceptee',
          score: 90
        },
        {
          id: '4',
          titre: 'Vendeur Commercial',
          entreprise: 'Distribution Plus',
          date: '2024-01-08',
          statut: 'refusee',
          score: 45
        },
        {
          id: '5',
          titre: 'Technicien Informatique',
          entreprise: 'IT Services Guinée',
          date: '2024-01-05',
          statut: 'en_attente',
          score: 78
        }
      ])
      setChargement(false)
    }, 800)
  }, [])

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'acceptee':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'refusee':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'entretien':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'acceptee':
        return 'Acceptée'
      case 'refusee':
        return 'Refusée'
      case 'entretien':
        return 'Entretien'
      default:
        return 'En attente'
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'acceptee':
        return 'text-green-600 bg-green-50'
      case 'refusee':
        return 'text-red-600 bg-red-50'
      case 'entretien':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    })
  }

  if (chargement) {
    return (
      <div className="space-y-3">
        {[...Array(limite)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  const candidaturesAffichees = candidatures.slice(0, limite)

  return (
    <div className="space-y-3">
      {candidaturesAffichees.length === 0 ? (
        <div className="text-center py-8">
          <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aucune candidature pour le moment</p>
          <Link 
            href="/tableau-de-bord/jeune/candidatures"
            className="inline-block mt-3 px-4 py-2 bg-guinea-red text-white rounded-lg hover:bg-guinea-red/90 transition-colors"
          >
            Voir les offres
          </Link>
        </div>
      ) : (
        <>
          {candidaturesAffichees.map((candidature) => (
            <div 
              key={candidature.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-medium text-dark-gray truncate">
                    {candidature.titre}
                  </h3>
                  {candidature.score && (
                    <span className="text-xs bg-guinea-yellow/20 text-guinea-yellow px-2 py-1 rounded-full">
                      {candidature.score}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-gray mb-2">{candidature.entreprise}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(candidature.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatutIcon(candidature.statut)}
                    <span className={getStatutColor(candidature.statut)}>
                      {getStatutLabel(candidature.statut)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/tableau-de-bord/jeune/candidatures/${candidature.id}`}
                  className="p-2 text-gray-400 hover:text-guinea-red hover:bg-red-50 rounded-lg transition-colors"
                  title="Voir les détails"
                >
                  <Eye className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
          
          {candidatures.length > limite && (
            <div className="text-center pt-4">
              <Link 
                href="/tableau-de-bord/jeune/candidatures"
                className="text-guinea-red hover:text-guinea-red/80 font-medium text-sm"
              >
                Voir toutes les candidatures ({candidatures.length})
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
} 