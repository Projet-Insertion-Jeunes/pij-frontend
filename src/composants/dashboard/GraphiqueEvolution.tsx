'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface DataPoint {
  date: string
  value: number
  label?: string
}

interface GraphiqueEvolutionProps {
  data: DataPoint[]
  title?: string
  color?: string
  fillColor?: string
  height?: number
  showArea?: boolean
}

export function GraphiqueEvolution({ 
  data, 
  title = "Évolution", 
  color = "#ef4444", 
  fillColor = "#fef2f2",
  height = 300,
  showArea = true 
}: GraphiqueEvolutionProps) {
  
  const donneesDefaut: DataPoint[] = [
    { date: '01/01', value: 10 },
    { date: '02/01', value: 15 },
    { date: '03/01', value: 12 },
    { date: '04/01', value: 20 },
    { date: '05/01', value: 25 },
    { date: '06/01', value: 22 },
    { date: '07/01', value: 30 },
    { date: '08/01', value: 35 },
    { date: '09/01', value: 32 },
    { date: '10/01', value: 40 },
    { date: '11/01', value: 45 },
    { date: '12/01', value: 42 },
    { date: '13/01', value: 50 },
    { date: '14/01', value: 55 },
    { date: '15/01', value: 52 },
    { date: '16/01', value: 60 },
    { date: '17/01', value: 65 },
    { date: '18/01', value: 62 },
    { date: '19/01', value: 70 },
    { date: '20/01', value: 75 },
    { date: '21/01', value: 72 },
    { date: '22/01', value: 80 },
    { date: '23/01', value: 85 },
    { date: '24/01', value: 82 },
    { date: '25/01', value: 90 },
    { date: '26/01', value: 95 },
    { date: '27/01', value: 92 },
    { date: '28/01', value: 100 },
    { date: '29/01', value: 105 },
    { date: '30/01', value: 102 }
  ]

  const chartData = data && data.length > 0 ? data : donneesDefaut

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Date: ${label}`}</p>
          <p style={{ color: payload[0].color }} className="text-sm">
            {`${payload[0].name || 'Valeur'}: ${payload[0].value}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {showArea ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
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
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                name="Valeur"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Valeur"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Statistiques résumées */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-900">
            {chartData[chartData.length - 1]?.value || 0}
          </p>
          <p className="text-sm text-gray-600">Valeur actuelle</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-900">
            {Math.max(...chartData.map(d => d.value))}
          </p>
          <p className="text-sm text-gray-600">Maximum</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-900">
            {Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length)}
          </p>
          <p className="text-sm text-gray-600">Moyenne</p>
        </div>
      </div>
    </div>
  )
} 