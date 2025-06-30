import { ReactNode } from 'react'

interface CarteStatistiqueProps {
  titre: string
  valeur: string
  changement: string
  tendancePositive: boolean
  icone: ReactNode
  couleur: 'guinea-red' | 'guinea-yellow' | 'guinea-green'
}

export function CarteStatistique({ 
  titre, 
  valeur, 
  changement, 
  tendancePositive, 
  icone, 
  couleur 
}: CarteStatistiqueProps) {
  const couleurClasses = {
    'guinea-red': 'text-guinea-red bg-guinea-red/10',
    'guinea-yellow': 'text-guinea-yellow bg-guinea-yellow/10',
    'guinea-green': 'text-guinea-green bg-guinea-green/10'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-gray uppercase tracking-wide">{titre}</h3>
        <div className={`p-2 rounded-lg ${couleurClasses[couleur]}`}>
          {icone}
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-3xl font-bold text-dark-gray">{valeur}</span>
      </div>
      
      <div className={`text-sm ${tendancePositive ? 'text-green-600' : 'text-red-600'}`}>
        <span className="mr-1">{tendancePositive ? '↗' : '↘'}</span>
        {changement}
      </div>
    </div>
  )
}
