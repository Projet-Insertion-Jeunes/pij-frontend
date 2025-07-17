'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface EvolutionData {
  date: string
  jeunes: number
  entreprises: number
  offres: number
}

interface GraphiqueEvolutionInscriptionsProps {
  donnees: EvolutionData[]
}

export function GraphiqueEvolutionInscriptions({ donnees }: GraphiqueEvolutionInscriptionsProps) {
  // Données par défaut si aucune donnée n'est fournie
  const donneesDefaut: EvolutionData[] = [
    { date: '01/01', jeunes: 120, entreprises: 15, offres: 25 },
    { date: '02/01', jeunes: 135, entreprises: 18, offres: 32 },
    { date: '03/01', jeunes: 158, entreprises: 22, offres: 28 },
    { date: '04/01', jeunes: 172, entreprises: 25, offres: 35 },
    { date: '05/01', jeunes: 195, entreprises: 28, offres: 42 },
    { date: '06/01', jeunes: 210, entreprises: 32, offres: 38 },
    { date: '07/01', jeunes: 228, entreprises: 35, offres: 45 },
    { date: '08/01', jeunes: 245, entreprises: 38, offres: 52 },
    { date: '09/01', jeunes: 260, entreprises: 42, offres: 48 },
    { date: '10/01', jeunes: 278, entreprises: 45, offres: 55 },
    { date: '11/01', jeunes: 295, entreprises: 48, offres: 62 },
    { date: '12/01', jeunes: 312, entreprises: 52, offres: 58 },
    { date: '13/01', jeunes: 328, entreprises: 55, offres: 65 },
    { date: '14/01', jeunes: 345, entreprises: 58, offres: 72 },
    { date: '15/01', jeunes: 362, entreprises: 62, offres: 68 },
    { date: '16/01', jeunes: 378, entreprises: 65, offres: 75 },
    { date: '17/01', jeunes: 395, entreprises: 68, offres: 82 },
    { date: '18/01', jeunes: 412, entreprises: 72, offres: 78 },
    { date: '19/01', jeunes: 428, entreprises: 75, offres: 85 },
    { date: '20/01', jeunes: 445, entreprises: 78, offres: 92 },
    { date: '21/01', jeunes: 462, entreprises: 82, offres: 88 },
    { date: '22/01', jeunes: 478, entreprises: 85, offres: 95 },
    { date: '23/01', jeunes: 495, entreprises: 88, offres: 102 },
    { date: '24/01', jeunes: 512, entreprises: 92, offres: 98 },
    { date: '25/01', jeunes: 528, entreprises: 95, offres: 105 },
    { date: '26/01', jeunes: 545, entreprises: 98, offres: 112 },
    { date: '27/01', jeunes: 562, entreprises: 102, offres: 108 },
    { date: '28/01', jeunes: 578, entreprises: 105, offres: 115 },
    { date: '29/01', jeunes: 595, entreprises: 108, offres: 122 },
    { date: '30/01', jeunes: 612, entreprises: 112, offres: 118 }
  ]

  const data = donnees && donnees.length > 0 ? donnees : donneesDefaut

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      {/* En-tête avec légende */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Jeunes inscrits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Entreprises</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Offres d'emploi</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Tendance sur 30 jours</p>
          <p className="text-xs text-green-600 font-medium">+24% d'inscriptions</p>
        </div>
      </div>

      {/* Graphique principal */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorJeunes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEntreprises" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOffres" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="jeunes"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorJeunes)"
              name="Jeunes"
            />
            <Area
              type="monotone"
              dataKey="entreprises"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEntreprises)"
              name="Entreprises"
            />
            <Area
              type="monotone"
              dataKey="offres"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOffres)"
              name="Offres"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Statistiques résumées */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">
            {data[data.length - 1]?.jeunes || 0}
          </p>
          <p className="text-sm text-red-700">Total jeunes</p>
          <p className="text-xs text-red-600 mt-1">
            +{((data[data.length - 1]?.jeunes || 0) - (data[0]?.jeunes || 0))} ce mois
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data[data.length - 1]?.entreprises || 0}
          </p>
          <p className="text-sm text-blue-700">Total entreprises</p>
          <p className="text-xs text-blue-600 mt-1">
            +{((data[data.length - 1]?.entreprises || 0) - (data[0]?.entreprises || 0))} ce mois
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {data[data.length - 1]?.offres || 0}
          </p>
          <p className="text-sm text-green-700">Total offres</p>
          <p className="text-xs text-green-600 mt-1">
            +{((data[data.length - 1]?.offres || 0) - (data[0]?.offres || 0))} ce mois
          </p>
        </div>
      </div>
    </div>
  )
} 