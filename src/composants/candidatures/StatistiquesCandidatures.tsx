import { TrendingUp, Briefcase, Calendar, Award } from 'lucide-react'
import { StatistiquesCandidaturesInterface } from '@/types/candidatures'

interface StatistiquesCandidaturesProps {
 statistiques: StatistiquesCandidaturesInterface
}

export function StatistiquesCandidatures({ statistiques }: StatistiquesCandidaturesProps) {
 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     <div className="bg-guinea-red/10 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <Briefcase className="h-6 w-6 text-guinea-red" />
       </div>
       <div className="text-2xl font-bold text-guinea-red">{statistiques.totalCandidatures}</div>
       <div className="text-sm text-text-gray">Total candidatures</div>
     </div>

     <div className="bg-guinea-green/10 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <TrendingUp className="h-6 w-6 text-guinea-green" />
       </div>
       <div className="text-2xl font-bold text-guinea-green">{statistiques.tauxReponse}%</div>
       <div className="text-sm text-text-gray">Taux de réponse</div>
     </div>

     <div className="bg-guinea-yellow/10 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <Calendar className="h-6 w-6 text-guinea-yellow" />
       </div>
       <div className="text-2xl font-bold text-guinea-yellow">{statistiques.entretiensObtenus}</div>
       <div className="text-sm text-text-gray">Entretiens obtenus</div>
     </div>

     <div className="bg-green-100 rounded-lg p-4 text-center">
       <div className="flex items-center justify-center mb-2">
         <Award className="h-6 w-6 text-green-600" />
       </div>
       <div className="text-2xl font-bold text-green-600">{statistiques.candidaturesAcceptees}</div>
       <div className="text-sm text-text-gray">Candidatures acceptées</div>
     </div>
   </div>
 )
}
