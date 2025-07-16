'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Play,
  Calendar,
  Award,
  Users
} from 'lucide-react'

interface Formation {
  id: string
  titre: string
  type: 'parcours_a' | 'parcours_b' | 'parcours_c' | 'parcours_d' | 'formation_technique' | 'savoir_etre'
  statut: 'en_cours' | 'terminee' | 'a_venir'
  progression: number
  dateDebut: string
  dateFin?: string
  formateur?: string
  participants?: number
}

interface ListeFormationsProps {
  limite?: number
}

export function ListeFormations({ limite = 3 }: ListeFormationsProps) {
  const [formations, setFormations] = useState<Formation[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setFormations([
        {
          id: '1',
          titre: 'Parcours B - Mise à Niveau Technique',
          type: 'parcours_b',
          statut: 'en_cours',
          progression: 75,
          dateDebut: '2024-01-10',
          dateFin: '2024-02-10',
          formateur: 'M. Diallo',
          participants: 15
        },
        {
          id: '2',
          titre: 'Formation Savoir-Être et Civique',
          type: 'savoir_etre',
          statut: 'a_venir',
          progression: 0,
          dateDebut: '2024-02-15',
          formateur: 'Mme Camara',
          participants: 20
        },
        {
          id: '3',
          titre: 'Développement Web Frontend',
          type: 'formation_technique',
          statut: 'terminee',
          progression: 100,
          dateDebut: '2023-12-01',
          dateFin: '2023-12-31',
          formateur: 'M. Bah',
          participants: 12
        },
        {
          id: '4',
          titre: 'Gestion de Projet Agile',
          type: 'formation_technique',
          statut: 'en_cours',
          progression: 30,
          dateDebut: '2024-01-20',
          dateFin: '2024-03-20',
          formateur: 'Mme Keita',
          participants: 18
        }
      ])
      setChargement(false)
    }, 600)
  }, [])

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'parcours_a':
        return 'Parcours A'
      case 'parcours_b':
        return 'Parcours B'
      case 'parcours_c':
        return 'Parcours C'
      case 'parcours_d':
        return 'Parcours D'
      case 'formation_technique':
        return 'Formation Technique'
      case 'savoir_etre':
        return 'Savoir-Être'
      default:
        return 'Formation'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'parcours_a':
        return 'bg-blue-100 text-blue-600'
      case 'parcours_b':
        return 'bg-green-100 text-green-600'
      case 'parcours_c':
        return 'bg-yellow-100 text-yellow-600'
      case 'parcours_d':
        return 'bg-purple-100 text-purple-600'
      case 'formation_technique':
        return 'bg-orange-100 text-orange-600'
      case 'savoir_etre':
        return 'bg-pink-100 text-pink-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'terminee':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'en_cours':
        return <Play className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'terminee':
        return 'Terminée'
      case 'en_cours':
        return 'En cours'
      default:
        return 'À venir'
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
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  const formationsAffichees = formations.slice(0, limite)

  return (
    <div className="space-y-3">
      {formationsAffichees.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aucune formation en cours</p>
          <Link 
            href="/tableau-de-bord/jeune/formations"
            className="inline-block mt-3 px-4 py-2 bg-guinea-green text-white rounded-lg hover:bg-guinea-green/90 transition-colors"
          >
            Voir les formations
          </Link>
        </div>
      ) : (
        <>
          {formationsAffichees.map((formation) => (
            <div 
              key={formation.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-dark-gray truncate mb-1">
                    {formation.titre}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(formation.type)}`}>
                      {getTypeLabel(formation.type)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {getStatutIcon(formation.statut)}
                      <span>{getStatutLabel(formation.statut)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barre de progression */}
              {formation.statut === 'en_cours' && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progression</span>
                    <span>{formation.progression}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-guinea-green h-2 rounded-full transition-all duration-300"
                      style={{ width: `${formation.progression}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Informations supplémentaires */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(formation.dateDebut)}
                </div>
                {formation.formateur && (
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {formation.formateur}
                  </div>
                )}
                {formation.participants && (
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {formation.participants} participants
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {formations.length > limite && (
            <div className="text-center pt-4">
              <Link 
                href="/tableau-de-bord/jeune/formations"
                className="text-guinea-green hover:text-guinea-green/80 font-medium text-sm"
              >
                Voir toutes les formations ({formations.length})
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
} 