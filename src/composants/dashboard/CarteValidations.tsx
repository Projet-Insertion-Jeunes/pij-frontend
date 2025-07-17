'use client'

import { Users, Building2, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface ValidationItem {
  id: string
  type: 'jeune' | 'entreprise' | 'offre' | 'evaluation'
  nom: string
  email?: string
  dateSubmission: string
  priorite: 'haute' | 'moyenne' | 'basse'
  statut: 'en_attente' | 'en_cours' | 'validee' | 'rejetee'
}

interface CarteValidationsProps {
  validations: ValidationItem[]
  type: 'jeune' | 'entreprise' | 'offre' | 'evaluation'
  titre: string
  total: number
}

export function CarteValidations({ validations, type, titre, total }: CarteValidationsProps) {
  const getIcon = () => {
    switch (type) {
      case 'jeune':
        return <Users className="h-5 w-5" />
      case 'entreprise':
        return <Building2 className="h-5 w-5" />
      case 'offre':
        return <FileText className="h-5 w-5" />
      case 'evaluation':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getColorClass = () => {
    switch (type) {
      case 'jeune':
        return 'border-red-200 bg-red-50 text-red-700'
      case 'entreprise':
        return 'border-blue-200 bg-blue-50 text-blue-700'
      case 'offre':
        return 'border-green-200 bg-green-50 text-green-700'
      case 'evaluation':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700'
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700'
    }
  }

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'haute':
        return 'bg-red-100 text-red-700'
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-700'
      case 'basse':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
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

  // Données par défaut si aucune validation n'est fournie
  const validationsDefaut: ValidationItem[] = [
    {
      id: '1',
      type: 'jeune',
      nom: 'Mamadou Diallo',
      email: 'mamadou.diallo@example.com',
      dateSubmission: '2024-01-15',
      priorite: 'haute',
      statut: 'en_attente'
    },
    {
      id: '2',
      type: 'entreprise',
      nom: 'Société Minière ABC',
      email: 'contact@abc-mining.com',
      dateSubmission: '2024-01-14',
      priorite: 'moyenne',
      statut: 'en_attente'
    },
    {
      id: '3',
      type: 'offre',
      nom: 'Technicien de Maintenance',
      dateSubmission: '2024-01-13',
      priorite: 'basse',
      statut: 'en_cours'
    }
  ]

  const data = validations && validations.length > 0 ? validations : validationsDefaut

  return (
    <div className={`rounded-lg border-2 ${getColorClass()} p-6`}>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getIcon()}
          <h3 className="text-lg font-semibold">{titre}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{total}</span>
          {total > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              En attente
            </span>
          )}
        </div>
      </div>

      {/* Liste des validations */}
      {data.length > 0 ? (
        <div className="space-y-3 mb-4">
          {data.slice(0, 3).map((validation) => (
            <div 
              key={validation.id} 
              className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">{validation.nom}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPrioriteColor(validation.priorite)}`}>
                      {validation.priorite}
                    </span>
                  </div>
                  {validation.email && (
                    <p className="text-xs text-gray-600 mb-1">{validation.email}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      {formatDate(validation.dateSubmission)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Valider
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {data.length > 3 && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ... et {data.length - 3} autres validations
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Aucune validation en attente</p>
          <p className="text-sm text-gray-500">Toutes les validations sont à jour</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link 
          href={`/tableau-de-bord/admin/validations?type=${type}`}
          className="text-sm font-medium hover:underline"
        >
          Voir toutes les validations →
        </Link>
        {total > 0 && (
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Traiter par lot
          </button>
        )}
      </div>
    </div>
  )
} 