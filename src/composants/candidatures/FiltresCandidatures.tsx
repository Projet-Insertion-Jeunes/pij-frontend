'use client'

import { useState } from 'react'
import { Search, Filter, X, Calendar, MapPin, Building } from 'lucide-react'

interface FiltresCandidaturesProps {
  onFilterChange: (filters: any) => void
  totalCandidatures: number
}

export function FiltresCandidatures({ onFilterChange, totalCandidatures }: FiltresCandidaturesProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('tous')
  const [selectedRegion, setSelectedRegion] = useState('toutes')
  const [selectedSecteur, setSelectedSecteur] = useState('tous')
  const [dateRange, setDateRange] = useState('tous')
  const [showFilters, setShowFilters] = useState(false)

  const statusOptions = [
    { value: 'tous', label: 'Tous les statuts' },
    { value: 'en_attente', label: 'En attente' },
    { value: 'acceptee', label: 'Acceptée' },
    { value: 'rejetee', label: 'Rejetée' },
    { value: 'en_cours', label: 'En cours d\'examen' }
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

  const secteurOptions = [
    { value: 'tous', label: 'Tous les secteurs' },
    { value: 'mines', label: 'Mines et Extraction' },
    { value: 'construction', label: 'Construction' },
    { value: 'transport', label: 'Transport et Logistique' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'services', label: 'Services' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'industrie', label: 'Industrie' },
    { value: 'technologie', label: 'Technologie' }
  ]

  const dateRangeOptions = [
    { value: 'tous', label: 'Toutes les dates' },
    { value: 'aujourd_hui', label: 'Aujourd\'hui' },
    { value: 'cette_semaine', label: 'Cette semaine' },
    { value: 'ce_mois', label: 'Ce mois' },
    { value: 'trimestre', label: 'Ce trimestre' }
  ]

  const handleFilterChange = () => {
    const filters = {
      searchTerm,
      status: selectedStatus,
      region: selectedRegion,
      secteur: selectedSecteur,
      dateRange
    }
    onFilterChange(filters)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedStatus('tous')
    setSelectedRegion('toutes')
    setSelectedSecteur('tous')
    setDateRange('tous')
    onFilterChange({
      searchTerm: '',
      status: 'tous',
      region: 'toutes',
      secteur: 'tous',
      dateRange: 'tous'
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedStatus !== 'tous') count++
    if (selectedRegion !== 'toutes') count++
    if (selectedSecteur !== 'tous') count++
    if (dateRange !== 'tous') count++
    return count
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtres de Candidatures</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {totalCandidatures} candidatures trouvées
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
          placeholder="Rechercher par nom, email ou poste..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map((option) => (
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

            {/* Secteur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline h-4 w-4 mr-1" />
                Secteur
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

            {/* Période */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Période
              </label>
              <select
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value)
                  handleFilterChange()
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRangeOptions.map((option) => (
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
            {selectedStatus !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Statut: {statusOptions.find(s => s.value === selectedStatus)?.label}
                <button
                  onClick={() => {
                    setSelectedStatus('tous')
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
            {selectedSecteur !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Secteur: {secteurOptions.find(s => s.value === selectedSecteur)?.label}
                <button
                  onClick={() => {
                    setSelectedSecteur('tous')
                    handleFilterChange()
                  }}
                  className="hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {dateRange !== 'tous' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                Période: {dateRangeOptions.find(d => d.value === dateRange)?.label}
                <button
                  onClick={() => {
                    setDateRange('tous')
                    handleFilterChange()
                  }}
                  className="hover:text-red-600"
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