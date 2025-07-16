'use client'
import { useState, useEffect } from 'react'
import { Filter, Search, Calendar, TrendingUp, Briefcase, Clock } from 'lucide-react'
import { CandidatureInterface, StatistiquesCandidaturesInterface } from '@/types/candidatures'
import { serviceCandidatures } from '@/services/candidatures'
import { CarteCandidature } from '@/composants/candidatures/CarteCandidature'
import { FiltresCandidatures } from '@/composants/candidatures/FiltresCandidatures'
import { StatistiquesCandidatures } from '@/composants/candidatures/StatistiquesCandidatures'

export default function PageCandidatures() {
 const [candidatures, setCandidatures] = useState<CandidatureInterface[]>([])
 const [statistiques, setStatistiques] = useState<StatistiquesCandidaturesInterface | null>(null)
 const [chargement, setChargement] = useState(true)
 const [filtres, setFiltres] = useState<Record<string, any>>({})
 const [afficherFiltres, setAfficherFiltres] = useState(false)
 const [recherche, setRecherche] = useState('')

 const chargerDonnees = async () => {
   setChargement(true)
   try {
     const [candidaturesData, statsData] = await Promise.all([
       serviceCandidatures.obtenirMesCandidatures(filtres),
       serviceCandidatures.obtenirStatistiques()
     ])
     setCandidatures(candidaturesData)
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

 const gererRecherche = () => {
   const nouveauxFiltres = { ...filtres, search: recherche }
   setFiltres(nouveauxFiltres)
 }

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
       <h1 className="text-3xl font-bold text-dark-gray mb-4">Mes Candidatures</h1>
       <p className="text-text-gray mb-6">
         Suivez l'état de vos candidatures et gérez vos postulations
       </p>

       {/* Barre de recherche et filtres */}
       <div className="flex gap-4 mb-6">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray h-5 w-5" />
           <input
             type="text"
             placeholder="Rechercher par titre d'offre ou entreprise..."
             value={recherche}
             onChange={(e) => setRecherche(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && gererRecherche()}
             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
           />
         </div>
         <button
           onClick={gererRecherche}
           className="bg-guinea-red text-white px-6 py-3 rounded-lg hover:bg-secondary-red transition-colors"
         >
           Rechercher
         </button>
         <button
           onClick={() => setAfficherFiltres(!afficherFiltres)}
           className="bg-white border border-gray-300 text-dark-gray px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
         >
           <Filter className="h-5 w-5" />
           Filtres
         </button>
       </div>

       {/* Statistiques */}
       {statistiques && <StatistiquesCandidatures statistiques={statistiques} />}
     </div>

     {/* Filtres */}
     {afficherFiltres && (
       <FiltresCandidatures
         filtres={filtres}
         onChangementFiltres={gererChangementFiltres}
         onFermer={() => setAfficherFiltres(false)}
       />
     )}

     {/* Liste des candidatures */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <h2 className="text-xl font-semibold text-dark-gray mb-6 flex items-center gap-2">
         <Briefcase className="h-5 w-5 text-guinea-red" />
         Toutes mes candidatures ({candidatures.length})
       </h2>

       {candidatures.length > 0 ? (
         <div className="space-y-4">
           {candidatures.map((candidature) => (
             <CarteCandidature 
               key={candidature.id} 
               candidature={candidature}
               onMiseAJour={chargerDonnees}
             />
           ))}
         </div>
       ) : (
         <div className="text-center py-12">
           <Briefcase className="mx-auto h-16 w-16 text-text-gray mb-4" />
           <h3 className="text-xl font-semibold text-dark-gray mb-2">Aucune candidature</h3>
           <p className="text-text-gray mb-6">
             Vous n'avez pas encore postulé à des offres
           </p>
           <button className="bg-guinea-red text-white px-6 py-3 rounded-lg hover:bg-secondary-red transition-colors">
             Découvrir les offres
           </button>
         </div>
       )}
     </div>
   </div>
 )
}
