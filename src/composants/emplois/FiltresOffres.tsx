'use client'

import { useState } from 'react'
import { Search, Filter, X, MapPin, Building, Calendar, DollarSign } from 'lucide-react'

interface FiltresOffresProps {
  onFilterChange: (filters: any) => void
  totalOffres: number
}

export function FiltresOffres({ onFilterChange, totalOffres }: FiltresOffresProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSecteur, setSelectedSecteur] = useState('tous')
  const [selectedRegion, setSelectedRegion] = useState('toutes')
  const [selectedTypeContrat, setSelectedTypeContrat] = useState('tous')
  const [selectedExperience, setSelectedExperience] = useState('tous')
  const [selectedSalaire, setSelectedSalaire] = useState('tous')
  const [showFilters, setShowFilters] = useState(false)

  const secteurOptions = [
    { value: 'tous', label: 'Tous les secteurs' },
    { value: 'mines', label: 'Mines et Extraction' },
    { value: 'construction', label: 'Construction' },
    { value: 'transport', label: 'Transport et Logistique' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'services', label: 'Services' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'industrie', label: 'Industrie' },
    { value: 'technologie', label: 'Technologie' },
    { value: 'sante', label: 'Santé' },
    { value: 'education', label: 'Éducation' }
  ]

  const regionOptions = [
    { value: 'toutes', label: 'Toutes les régions' },
    { value: 'conakry', label: 'Conakry' },
    { value: 'kindia', label: 'Kindia' },
    { value: 'boke', label: 'Boké' },
    { value: 'faranah', label: 'Faranah' },
    { value: 'kankan', label: 'Kankan' },
    { value: 'mamou', label: 'Mamou' },
    { value: 'labe', label: 'Labé' },
    { value: 'nzerekore', label: 'Nzérékoré' }
  ]

  const typeContratOptions = [
    { value: 'tous', label: 'Tous les types' },
    { value: 'cdi', label: 'CDI' },
    { value: 'cdd', label: 'CDD' },
    { value: 'stage', label: 'Stage' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'temporaire', label: 'Temporaire' }
  ]

  const experienceOptions = [
    { value: 'tous', label: 'Tous les niveaux' },
    { value: 'debutant', label: 'Débutant (0-1 an)' },
    { value: 'junior', label: 'Junior (1-3 ans)' },
    { value: 'intermediaire', label: 'Intermédiaire (3-5 ans)' },
    { value: 'senior', label: 'Senior (5+ ans)' },
    { value: 'expert', label: 'Expert (10+ ans)' }
  ]

  const salaireOptions = [
    { value: 'tous', label: 'Tous les salaires' },
    { value: '0-500000', label: '0 - 500,000 GNF' },
    { value: '500000-1000000', label: '500,000 - 1,000,000 GNF' },
    { value: '1000000-2000000', label: '1,000,000 - 2,000,000 GNF' },
    { value: '2000000-3000000', label: '2,000,000 - 3,000,000 GNF' },
    { value: '3000000+', label: '3,000,000+ GNF' }
  ]

  const handleFilterChange = () => {
    const filters = {
      searchTerm,
      secteur: selectedSecteur,
      region: selectedRegion,
      typeContrat: selectedTypeContrat,
      experience: selectedExperience,
      salaire: selectedSalaire
    }
    onFilterChange(filters)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedSecteur('tous')
    setSelectedRegion('toutes')
    setSelectedTypeContrat('tous')
    setSelectedExperience('tous')
    setSelectedSalaire('tous')
    onFilterChange({
      searchTerm: '',
      secteur: 'tous',
      region: 'toutes',
      typeContrat: 'tous',
      experience: 'tous',
      salaire: 'tous'
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedSecteur !== 'tous') count++
    if (selectedRegion !== 'toutes') count++
    if (selectedTypeContrat !== 'tous') count++
    if (selectedExperience !== 'tous') count++
    if (selectedSalaire !== 'tous') count++
    return count
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtres d'Offres</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {totalOffres} offres disponibles
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filtres
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-300 text-blue-800 px-2 py-1 rounded-full text-xs">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Barre de recherche principale */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par titre, entreprise ou mot-clé..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleFilterChange()
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filtres détaillés */}
      {showFilters && (
        <div className="space-y-4 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Secteur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline h-4 w-4 mr-1" />
                Secteur d'activité
              </label>
              <select
                value={selectedSecteur}
                onChange={(e) => {
                  setSelectedSecteur(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {secteurOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Région */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Région
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type de contrat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Type de contrat
              </label>
              <select
                value={selectedTypeContrat}
                onChange={(e) => {
                  setSelectedTypeContrat(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {typeContratOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Expérience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'expérience
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => {
                  setSelectedExperience(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {experienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Salaire */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Fourchette de salaire
              </label>
              <select
                value={selectedSalaire}
                onChange={(e) => {
                  setSelectedSalaire(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {salaireOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-4 w-4" />
              Réinitialiser tous les filtres
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={handleFilterChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtres actifs */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Recherche: "{searchTerm}"
                <button
                  onClick={() => {
                    setSearchTerm('')
                    handleFilterChange()
                  }}
                  className="hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSecteur !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Secteur: {secteurOptions.find(s => s.value === selectedSecteur)?.label}
                <button
                  onClick={() => {
                    setSelectedSecteur('tous')
                    handleFilterChange()
                  }}
                  className="hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedRegion !== 'toutes' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Région: {regionOptions.find(r => r.value === selectedRegion)?.label}
                <button
                  onClick={() => {
                    setSelectedRegion('toutes')
                    handleFilterChange()
                  }}
                  className="hover:text-purple-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedTypeContrat !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Contrat: {typeContratOptions.find(t => t.value === selectedTypeContrat)?.label}
                <button
                  onClick={() => {
                    setSelectedTypeContrat('tous')
                    handleFilterChange()
                  }}
                  className="hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedExperience !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                Expérience: {experienceOptions.find(e => e.value === selectedExperience)?.label}
                <button
                  onClick={() => {
                    setSelectedExperience('tous')
                    handleFilterChange()
                  }}
                  className="hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSalaire !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Salaire: {salaireOptions.find(s => s.value === selectedSalaire)?.label}
                <button
                  onClick={() => {
                    setSelectedSalaire('tous')
                    handleFilterChange()
                  }}
                  className="hover:text-yellow-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 