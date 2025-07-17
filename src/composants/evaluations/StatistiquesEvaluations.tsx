'use client'

import { TrendingUp, TrendingDown, Award, Users, Calendar, Star } from 'lucide-react'

interface StatistiquesEvaluationsProps {
  totalEvaluations: number
  moyenneGenerale: number
  evaluationsTerminees: number
  evaluationsEnCours: number
  tendanceMoisDernier: number
  meilleuresPerformances: number
  evaluationsParCategorie?: {
    techniques: number
    comportementales: number
    pratiques: number
  }
}

export function StatistiquesEvaluations({
  totalEvaluations = 145,
  moyenneGenerale = 7.8,
  evaluationsTerminees = 132,
  evaluationsEnCours = 13,
  tendanceMoisDernier = 12,
  meilleuresPerformances = 89,
  evaluationsParCategorie = {
    techniques: 45,
    comportementales: 52,
    pratiques: 48
  }
}: StatistiquesEvaluationsProps) {

  const tauxReussite = Math.round((meilleuresPerformances / totalEvaluations) * 100)
  const tauxCompletion = Math.round((evaluationsTerminees / totalEvaluations) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Évaluations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Évaluations</p>
            <p className="text-3xl font-bold text-gray-900">{totalEvaluations}</p>
            <div className="flex items-center mt-2">
              {tendanceMoisDernier > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                tendanceMoisDernier > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {tendanceMoisDernier > 0 ? '+' : ''}{tendanceMoisDernier}% ce mois
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Moyenne Générale */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Moyenne Générale</p>
            <p className="text-3xl font-bold text-gray-900">{moyenneGenerale}<span className="text-lg text-gray-500">/10</span></p>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-600">
                {moyenneGenerale >= 8 ? 'Excellent' : moyenneGenerale >= 6 ? 'Bon' : 'À améliorer'}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Taux de Réussite */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Taux de Réussite</p>
            <p className="text-3xl font-bold text-gray-900">{tauxReussite}<span className="text-lg text-gray-500">%</span></p>
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-gray-600">
                {meilleuresPerformances} performances excellentes
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Taux de Completion */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Taux de Completion</p>
            <p className="text-3xl font-bold text-gray-900">{tauxCompletion}<span className="text-lg text-gray-500">%</span></p>
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-gray-600">
                {evaluationsEnCours} en cours
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Répartition par Catégorie */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Répartition par Catégorie d'Évaluation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-blue-900">Compétences Techniques</h4>
              <span className="text-2xl font-bold text-blue-600">{evaluationsParCategorie.techniques}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(evaluationsParCategorie.techniques / totalEvaluations) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              {Math.round((evaluationsParCategorie.techniques / totalEvaluations) * 100)}% du total
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-green-900">Compétences Comportementales</h4>
              <span className="text-2xl font-bold text-green-600">{evaluationsParCategorie.comportementales}</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(evaluationsParCategorie.comportementales / totalEvaluations) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-green-700 mt-1">
              {Math.round((evaluationsParCategorie.comportementales / totalEvaluations) * 100)}% du total
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-purple-900">Évaluations Pratiques</h4>
              <span className="text-2xl font-bold text-purple-600">{evaluationsParCategorie.pratiques}</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(evaluationsParCategorie.pratiques / totalEvaluations) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-purple-700 mt-1">
              {Math.round((evaluationsParCategorie.pratiques / totalEvaluations) * 100)}% du total
            </p>
          </div>
        </div>
      </div>

      {/* Analyses Rapides */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyses Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round((evaluationsParCategorie.techniques / totalEvaluations) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Évaluations Techniques</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Math.round(moyenneGenerale * 10)}%
            </div>
            <p className="text-sm text-gray-600">Performance Globale</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round((evaluationsTerminees / totalEvaluations) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Évaluations Complétées</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {Math.round((meilleuresPerformances / totalEvaluations) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Excellentes Performances</p>
          </div>
        </div>
      </div>
    </div>
  )
} 