'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface ProgressionData {
  date: string
  score: number
  evaluation: string
}

interface CompetenceData {
  competence: string
  score: number
  fullMark: number
}

interface GraphiqueProgressionProps {
  progressionData: ProgressionData[]
  competencesData: CompetenceData[]
  type?: 'line' | 'radar'
  title?: string
  height?: number
}

export function GraphiqueProgression({ 
  progressionData, 
  competencesData, 
  type = 'line',
  title = "Progression des Évaluations",
  height = 400 
}: GraphiqueProgressionProps) {
  
  const progressionDefaut: ProgressionData[] = [
    { date: '15/01', score: 6.5, evaluation: 'Évaluation Initiale' },
    { date: '22/01', score: 7.2, evaluation: 'Technique de Base' },
    { date: '29/01', score: 7.8, evaluation: 'Mise en Situation' },
    { date: '05/02', score: 8.1, evaluation: 'Compétences Avancées' },
    { date: '12/02', score: 8.5, evaluation: 'Évaluation Pratique' },
    { date: '19/02', score: 8.9, evaluation: 'Évaluation Finale' }
  ]

  const competencesDefaut: CompetenceData[] = [
    { competence: 'Technique', score: 85, fullMark: 100 },
    { competence: 'Communication', score: 78, fullMark: 100 },
    { competence: 'Travail d\'équipe', score: 82, fullMark: 100 },
    { competence: 'Résolution de problèmes', score: 76, fullMark: 100 },
    { competence: 'Adaptabilité', score: 80, fullMark: 100 },
    { competence: 'Leadership', score: 72, fullMark: 100 }
  ]

  const dataProgression = progressionData && progressionData.length > 0 ? progressionData : progressionDefaut
  const dataCompetences = competencesData && competencesData.length > 0 ? competencesData : competencesDefaut

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}${type === 'line' ? '/10' : '%'}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0].payload.competence}</p>
          <p className="text-sm text-blue-600">Score: {payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => type = 'line'}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              type === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Progression
          </button>
          <button
            onClick={() => type = 'radar'}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              type === 'radar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Compétences
          </button>
        </div>
      </div>

      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={dataProgression} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#1d4ed8' }}
                name="Score"
              />
            </LineChart>
          ) : (
            <RadarChart data={dataCompetences} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                angle={90}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Statistiques résumées */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {type === 'line' ? (
          <>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {dataProgression[dataProgression.length - 1]?.score || 0}/10
              </p>
              <p className="text-sm text-blue-700">Score Actuel</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                +{((dataProgression[dataProgression.length - 1]?.score || 0) - (dataProgression[0]?.score || 0)).toFixed(1)}
              </p>
              <p className="text-sm text-green-700">Progression</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {dataProgression.length}
              </p>
              <p className="text-sm text-purple-700">Évaluations</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(dataCompetences.reduce((sum, c) => sum + c.score, 0) / dataCompetences.length)}%
              </p>
              <p className="text-sm text-blue-700">Score Moyen</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {Math.max(...dataCompetences.map(c => c.score))}%
              </p>
              <p className="text-sm text-green-700">Meilleure Compétence</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.min(...dataCompetences.map(c => c.score))}%
              </p>
              <p className="text-sm text-orange-700">À Améliorer</p>
            </div>
          </>
        )}
      </div>

      {/* Détails des évaluations récentes */}
      {type === 'line' && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Évaluations Récentes</h4>
          <div className="space-y-2">
            {dataProgression.slice(-3).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.evaluation}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{item.score}/10</p>
                  <p className="text-sm text-gray-600">
                    {item.score >= 8 ? 'Excellent' : item.score >= 6 ? 'Bon' : 'À améliorer'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 