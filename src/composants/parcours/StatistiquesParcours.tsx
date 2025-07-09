import { BookOpen, Award, TrendingUp, CheckCircle } from 'lucide-react'
import { StatistiquesParcoursInterface } from '@/types/parcours'

interface StatistiquesParcoursProps {
 statistiques: StatistiquesParcoursInterface
}

export function StatistiquesParcours({ statistiques }: StatistiquesParcoursProps) {
 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     <div className="bg-guinea-red/10 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <BookOpen className="h-6 w-6 text-guinea-red" />
       </div>
       <div className="text-2xl font-bold text-guinea-red">{statistiques.totalParcours}</div>
       <div className="text-sm text-text-gray">Parcours suivis</div>
     </div>

     <div className="bg-guinea-green/10 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <CheckCircle className="h-6 w-6 text-guinea-green" />
       </div>
       <div className="text-2xl font-bold text-guinea-green">{statistiques.parcoursTermines}</div>
       <div className="text-sm text-text-gray">Parcours terminés</div>
     </div>

     <div className="bg-guinea-yellow/10 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <TrendingUp className="h-6 w-6 text-guinea-yellow" />
       </div>
       <div className="text-2xl font-bold text-guinea-yellow">{statistiques.progressionMoyenne}%</div>
       <div className="text-sm text-text-gray">Progression moyenne</div>
     </div>

     <div className="bg-purple-100 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <Award className="h-6 w-6 text-purple-600" />
       </div>
       <div className="text-2xl font-bold text-purple-600">{statistiques.certificatsObtenus}</div>
       <div className="text-sm text-text-gray">Certificats obtenus</div>
     </div>
   </div>
 )
}
