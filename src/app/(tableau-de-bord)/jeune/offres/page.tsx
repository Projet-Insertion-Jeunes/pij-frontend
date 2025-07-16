'use client'
import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Clock, Briefcase, Building2 } from 'lucide-react'
import { OffreEmploiInterface, FiltresOffreInterface } from '@/types/emplois'
import { serviceEmplois } from '@/services/emplois'
import { CarteOffre } from '@/composants/emplois/CarteOffre'
import { FiltresOffres } from '@/composants/emplois/FiltresOffres'
import { Pagination } from '@/composants/ui/Pagination'

export default function PageOffres() {
 const [offres, setOffres] = useState<OffreEmploiInterface[]>([])
 const [chargement, setChargement] = useState(true)
 const [filtres, setFiltres] = useState<FiltresOffreInterface>({})
 const [afficherFiltres, setAfficherFiltres] = useState(false)
 const [rechercheTexte, setRechercheTexte] = useState('')
 const [pagination, setPagination] = useState({
   total: 0,
   page: 1,
   suivant: null,
   precedent: null
 })

 const chargerOffres = async (nouveauxFiltres?: FiltresOffreInterface) => {
   setChargement(true)
   try {
     const filtresAUtiliser = nouveauxFiltres || filtres
     const reponse = await serviceEmplois.obtenirOffres(filtresAUtiliser)
     setOffres(reponse.results)
     setPagination({
       total: reponse.count,
       page: 1,
       suivant: reponse.next,
       precedent: reponse.previous
     })
   } catch (error) {
     console.error('Erreur chargement offres:', error)
   } finally {
     setChargement(false)
   }
 }

 useEffect(() => {
   chargerOffres()
 }, [])

 const gererRecherche = () => {
   const nouveauxFiltres = { ...filtres, recherche: rechercheTexte }
   setFiltres(nouveauxFiltres)
   chargerOffres(nouveauxFiltres)
 }

 const gererChangementFiltres = (nouveauxFiltres: FiltresOffreInterface) => {
   setFiltres(nouveauxFiltres)
   chargerOffres(nouveauxFiltres)
 }

 return (
   <div className="space-y-6">
     {/* En-tête */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <h1 className="text-3xl font-bold text-dark-gray mb-4">Offres d'Emploi</h1>
       <p className="text-text-gray mb-6">
         Découvrez les opportunités d'emploi, de stage et de formation adaptées à votre profil
       </p>

       {/* Barre de recherche */}
       <div className="flex gap-4 mb-4">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray h-5 w-5" />
           <input
             type="text"
             placeholder="Rechercher par titre, entreprise, compétences..."
             value={rechercheTexte}
             onChange={(e) => setRechercheTexte(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && gererRecherche()}
             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
           />
         </div>
         <button
           onClick={gererRecherche}
           className="bg-guinea-red text-white px-6 py-3 rounded-lg hover:bg-secondary-red transition-colors flex items-center gap-2"
         >
           <Search className="h-5 w-5" />
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

       {/* Statistiques rapides */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-guinea-red/10 rounded-lg p-4 text-center">
           <div className="text-2xl font-bold text-guinea-red">{pagination.total}</div>
           <div className="text-sm text-text-gray">Offres disponibles</div>
         </div>
         <div className="bg-guinea-yellow/10 rounded-lg p-4 text-center">
           <div className="text-2xl font-bold text-guinea-yellow">142</div>
           <div className="text-sm text-text-gray">Entreprises actives</div>
         </div>
         <div className="bg-guinea-green/10 rounded-lg p-4 text-center">
           <div className="text-2xl font-bold text-guinea-green">89%</div>
           <div className="text-sm text-text-gray">Taux de matching</div>
         </div>
         <div className="bg-blue-100 rounded-lg p-4 text-center">
           <div className="text-2xl font-bold text-blue-600">24h</div>
           <div className="text-sm text-text-gray">Temps de réponse moyen</div>
         </div>
       </div>
     </div>

     {/* Filtres */}
     {afficherFiltres && (
       <FiltresOffres
         filtres={filtres}
         onChangementFiltres={gererChangementFiltres}
         onFermer={() => setAfficherFiltres(false)}
       />
     )}

     {/* Liste des offres */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       {chargement ? (
         <div className="flex items-center justify-center h-64">
           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-guinea-red"></div>
         </div>
       ) : offres.length > 0 ? (
         <div className="space-y-4">
           {offres.map((offre) => (
             <CarteOffre key={offre.id} offre={offre} />
           ))}
         </div>
       ) : (
         <div className="text-center py-12">
           <Briefcase className="mx-auto h-16 w-16 text-text-gray mb-4" />
           <h3 className="text-xl font-semibold text-dark-gray mb-2">Aucune offre trouvée</h3>
           <p className="text-text-gray">
             Essayez de modifier vos critères de recherche ou vos filtres
           </p>
         </div>
       )}

       {/* Pagination */}
       {offres.length > 0 && (
         <div className="mt-8">
           <Pagination
             total={pagination.total}
             page={pagination.page}
             onChangementPage={(nouvellePage) => {
               // Logique de pagination à implémenter
             }}
           />
         </div>
       )}
     </div>
   </div>
 )
}
