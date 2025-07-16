'use client'

export function GraphiqueProgression() {
  const donnees = [
    { mois: 'Jan', score: 3.2 },
    { mois: 'Fév', score: 3.8 },
    { mois: 'Mar', score: 4.1 },
    { mois: 'Avr', score: 4.3 },
    { mois: 'Mai', score: 4.2 },
  ]

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-5 gap-4 h-32">
        {donnees.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-end">
            <div
              className="w-8 bg-guinea-red rounded-t"
              style={{ height: `${(item.score / 5) * 100}%` }}
            ></div>
            <span className="text-xs text-text-gray mt-2">{item.mois}</span>
            <span className="text-xs font-bold text-guinea-red">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
