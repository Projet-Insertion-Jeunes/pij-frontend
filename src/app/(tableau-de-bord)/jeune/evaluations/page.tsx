'use client'
import { useState, useEffect } from 'react'
import { Star, TrendingUp, Award, Eye, MessageSquare, Filter } from 'lucide-react'
import { EvaluationEmployeurInterface, StatistiqueEvaluationInterface } from '@/types/evaluations'
import { serviceEvaluations } from '@/services/evaluations'
import { CarteEvaluation } from '@/composants/evaluations/CarteEvaluation'
import { StatistiquesEvaluations } from '@/composants/evaluations/StatistiquesEvaluations'
import { GraphiqueProgression } from '@/composants/evaluations/GraphiqueProgression'

export default function PageEvaluations() {
 const [evaluations, setEvaluations] = useState<EvaluationEmployeurInterface[]>([])
 const [statistiques, setStatistiques] = useState<StatistiqueEvaluationInterface | null>(null)
 const [chargement, setChargement] = useState(true)
 const [filtres, setFiltres] = useState<Record<string, any>>({})
 const [afficherFiltres, setAfficherFiltres] = useState(false)

 const chargerDonnees = async () => {
   setChargement(true)
   try {
     const [evaluationsData, statsData] = await Promise.all([
       serviceEvaluations.obtenirMesEvaluations(filtres),
       serviceEvaluations.obtenirMesStatistiques()
     ])
     setEvaluations(evaluationsData)
     setStatistiques(statsData)
   } catch (error) {
     console.error('Erreur chargement:', error)
   } finally {
     setChargement(false)
   }
 }

 useEffect(() => {
   chargerDonnees()
 }, [filtres])

 const gererChangementFiltres = (nouveauxFiltres: Record<string, any>) => {
   setFiltres(nouveauxFiltres)
 }

 if (chargement) {
   return (
     <div className="flex items-center justify-center h-96">
       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-guinea-red"></div>
     </div>
   )
 }

 return (
   <div className="space-y-6">
     {/* En-tête */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <h1 className="text-3xl font-bold text-dark-gray mb-4">Mes Évaluations</h1>
       <p className="text-text-gray mb-6">
         Consultez les évaluations de vos employeurs et suivez l'évolution de votre réputation professionnelle
       </p>

       {/* Statistiques */}
       {statistiques && <StatistiquesEvaluations statistiques={statistiques} />}
     </div>

     {/* Barre d'actions */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold text-dark-gray flex items-center gap-2">
           <Star className="h-5 w-5 text-guinea-red" />
           Toutes mes évaluations ({evaluations.length})
         </h2>
         
         <button
           onClick={() => setAfficherFiltres(!afficherFiltres)}
           className="bg-white border border-gray-300 text-dark-gray px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
         >
           <Filter className="h-4 w-4" />
           Filtres
         </button>
       </div>

       {/* Filtres */}
       {afficherFiltres && (
         <div className="bg-gray-50 rounded-lg p-4 mb-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <select
               onChange={(e) => gererChangementFiltres({ ...filtres, periode_type: e.target.value })}
               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
             >
               <option value="">Tous les types de mission</option>
               <option value="stage">Stage</option>
               <option value="essai">Période d'essai</option>
               <option value="mission">Mission courte</option>
               <option value="cdd">CDD</option>
               <option value="cdi">CDI</option>
               <option value="formation">Formation</option>
             </select>

             <select
               onChange={(e) => gererChangementFiltres({ ...filtres, recommandation: e.target.value })}
               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
             >
               <option value="">Toutes les recommandations</option>
               <option value="fortement_recommande">Fortement recommandé</option>
               <option value="recommande">Recommandé</option>
               <option value="recommande_avec_reserves">Recommandé avec réserves</option>
               <option value="non_recommande">Non recommandé</option>
             </select>

             <select
               onChange={(e) => gererChangementFiltres({ ...filtres, est_publique: e.target.value })}
               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
             >
               <option value="">Toutes les évaluations</option>
               <option value="true">Publiques</option>
               <option value="false">Privées</option>
             </select>
           </div>
         </div>
       )}
     </div>

     {/* Graphique de progression */}
     {evaluations.length > 1 && (
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <TrendingUp className="h-5 w-5 text-guinea-green" />
           Évolution de vos notes
         </h2>
         <GraphiqueProgression evaluations={evaluations} />
       </div>
     )}

     {/* Liste des évaluations */}
     <div className="space-y-4">
       {evaluations.length > 0 ? (
         evaluations.map((evaluation) => (
           <CarteEvaluation 
             key={evaluation.id} 
             evaluation={evaluation}
             onMiseAJour={chargerDonnees}
           />
         ))
       ) : (
         <div className="bg-white rounded-xl shadow-lg p-12 text-center">
           <Star className="mx-auto h-16 w-16 text-text-gray mb-4" />
           <h3 className="text-xl font-semibold text-dark-gray mb-2">Aucune évaluation</h3>
           <p className="text-text-gray mb-6">
             Vous n'avez pas encore reçu d'évaluations de la part des employeurs
           </p>
           <button className="bg-guinea-red text-white px-6 py-3 rounded-lg hover:bg-secondary-red transition-colors">
             Découvrir les offres
           </button>
         </div>
       )}
     </div>

     {/* Conseils pour améliorer son profil */}
     {statistiques && statistiques.nombreEvaluations > 0 && (
       <div className="bg-gradient-to-r from-guinea-green to-guinea-yellow rounded-xl p-6 text-white">
         <h2 className="text-2xl font-bold mb-4">💡 Conseils pour améliorer votre profil</h2>
         <div className="grid md:grid-cols-2 gap-4">
           <div className="bg-white/20 rounded-lg p-4">
             <h3 className="font-semibold mb-2">📈 Améliorez votre note</h3>
             <p className="text-sm opacity-90">
               Votre note moyenne est de {statistiques.noteMoyenne.toFixed(1)}/5. 
               Concentrez-vous sur les axes d'amélioration mentionnés par vos employeurs.
             </p>
           </div>
           
           <div className="bg-white/20 rounded-lg p-4">
             <h3 className="font-semibold mb-2">🤝 Multipliez les expériences</h3>
             <p className="text-sm opacity-90">
               Plus vous avez d'évaluations, plus votre profil gagne en crédibilité. 
               Postulez à de nouvelles opportunités !
             </p>
           </div>
           
           {statistiques.pourcentageRecommande < 80 && (
             <div className="bg-white/20 rounded-lg p-4">
               <h3 className="font-semibold mb-2">⭐ Augmentez vos recommandations</h3>
               <p className="text-sm opacity-90">
                 {statistiques.pourcentageRecommande}% de recommandations positives. 
                 Travaillez sur le savoir-être et la communication.
               </p>
             </div>
           )}
           
           <div className="bg-white/20 rounded-lg p-4">
             <h3 className="font-semibold mb-2">💼 Diversifiez vos expériences</h3>
             <p className="text-sm opacity-90">
               Vous avez {statistiques.experienceFormattee} d'expérience au total. 
               Explorez différents secteurs pour enrichir votre profil.
             </p>
           </div>
         </div>
       </div>
     )}
   </div>
 )
}
