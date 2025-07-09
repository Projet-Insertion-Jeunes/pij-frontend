'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
 MapPin, 
 Clock, 
 Briefcase, 
 Building2, 
 Heart,
 ExternalLink,
 Calendar,
 Star,
 MessageSquare,
 Edit,
 Eye
} from 'lucide-react'
import { CandidatureInterface } from '@/types/candidatures'
import { serviceCandidatures } from '@/services/candidatures'

interface CarteCandidatureProps {
 candidature: CandidatureInterface
 onMiseAJour: () => void
}

export function CarteCandidature({ candidature, onMiseAJour }: CarteCandidatureProps) {
 const [chargement, setChargement] = useState(false)

 const getStatutStyle = (statut: string) => {
   const styles = {
     soumise: 'bg-blue-100 text-blue-600',
     vue: 'bg-yellow-100 text-yellow-600',
     preselectionne: 'bg-purple-100 text-purple-600',
     entretien_programme: 'bg-orange-100 text-orange-600',
     en_attente_decision: 'bg-gray-100 text-gray-600',
     acceptee: 'bg-green-100 text-green-600',
     refusee: 'bg-red-100 text-red-600',
     retiree: 'bg-gray-100 text-gray-500'
   }
   return styles[statut as keyof typeof styles] || styles.soumise
 }

 const getStatutLabel = (statut: string) => {
   const labels = {
     soumise: 'Soumise',
     vue: 'Vue',
     preselectionne: 'Pré-sélectionné',
     entretien_programme: 'Entretien programmé',
     en_attente_decision: 'En attente',
     acceptee: 'Acceptée ✅',
     refusee: 'Refusée',
     retiree: 'Retirée'
   }
   return labels[statut as keyof typeof labels] || statut
 }

 const gererFavoris = async () => {
   setChargement(true)
   try {
     await serviceCandidatures.marquerFavoris(candidature.id, !candidature.estFavoriteJeune)
     onMiseAJour()
   } catch (error) {
     console.error('Erreur favoris:', error)
   } finally {
     setChargement(false)
   }
 }

 return (
   <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-white">
     {/* En-tête */}
     <div className="flex justify-between items-start mb-4">
       <div className="flex-1">
         <div className="flex items-center gap-3 mb-2">
           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutStyle(candidature.statut)}`}>
             {getStatutLabel(candidature.statut)}
           </span>
           {candidature.noteCandidature && (
             <div className="flex items-center gap-1">
               <Star className="h-4 w-4 text-yellow-500 fill-current" />
               <span className="text-sm font-medium">{candidature.noteCandidature}/5</span>
             </div>
           )}
         </div>
         
         <h3 className="text-xl font-semibold text-dark-gray mb-1">
           <Link href={`/offres/${candidature.offre.id}`} className="hover:text-guinea-red">
             {candidature.offre.titre}
           </Link>
         </h3>
         
         <div className="flex items-center gap-2 text-text-gray text-sm">
           <Building2 className="h-4 w-4" />
           <span className="font-medium">{candidature.offre.entrepriseNom}</span>
           <span>•</span>
           <MapPin className="h-4 w-4" />
           <span>{candidature.offre.ville}, {candidature.offre.region}</span>
         </div>
       </div>

       <button
         onClick={gererFavoris}
         disabled={chargement}
         className={`p-2 rounded-full transition-colors ${
           candidature.estFavoriteJeune 
             ? 'bg-red-100 text-red-500' 
             : 'bg-gray-100 text-text-gray hover:bg-red-100 hover:text-red-500'
         }`}
       >
         <Heart className={`h-5 w-5 ${candidature.estFavoriteJeune ? 'fill-current' : ''}`} />
       </button>
     </div>

     {/* Lettre de motivation (aperçu) */}
     <div className="mb-4">
       <p className="text-text-gray text-sm line-clamp-2">
         <span className="font-medium">Lettre de motivation:</span> {candidature.lettreMotivation}
       </p>
     </div>

     {/* Détails */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
       <div className="flex items-center gap-2 text-text-gray">
         <Calendar className="h-4 w-4" />
         <span>Postulé {candidature.tempsEcoule}</span>
       </div>
       
       {candidature.dateVueEntreprise && (
         <div className="flex items-center gap-2 text-text-gray">
           <Eye className="h-4 w-4" />
           <span>Vue par l'entreprise</span>
         </div>
       )}
       
       {candidature.dateReponse && (
         <div className="flex items-center gap-2 text-text-gray">
           <Clock className="h-4 w-4" />
           <span>Réponse reçue</span>
         </div>
       )}
       
       <div className="flex items-center gap-2 text-text-gray">
         <Briefcase className="h-4 w-4" />
         <span>{candidature.offre.typeOffre}</span>
       </div>
     </div>

     {/* Commentaire entreprise */}
     {candidature.commentaireEntreprise && (
       <div className="bg-gray-50 rounded-lg p-3 mb-4">
         <div className="flex items-center gap-2 mb-2">
           <MessageSquare className="h-4 w-4 text-guinea-red" />
           <span className="font-medium text-sm">Commentaire de l'entreprise :</span>
         </div>
         <p className="text-sm text-text-gray">{candidature.commentaireEntreprise}</p>
       </div>
     )}

     {/* Actions */}
     <div className="flex justify-between items-center">
       <div className="text-sm text-text-gray">
         Type : <span className="font-medium">{candidature.offre.typeOffre}</span>
       </div>

       <div className="flex gap-2">
         <Link
           href={`/tableau-de-bord/jeune/candidatures/${candidature.id}`}
           className="bg-white border border-guinea-red text-guinea-red px-4 py-2 rounded-lg hover:bg-guinea-red hover:text-white transition-colors flex items-center gap-2 text-sm"
         >
           <Eye className="h-4 w-4" />
           Voir détails
         </Link>
         
         {candidature.peutEtreModifiee && (
           <Link
             href={`/tableau-de-bord/jeune/candidatures/${candidature.id}/modifier`}
             className="bg-guinea-yellow text-dark-gray px-4 py-2 rounded-lg hover:bg-secondary-yellow transition-colors flex items-center gap-2 text-sm"
           >
             <Edit className="h-4 w-4" />
             Modifier
           </Link>
         )}
       </div>
     </div>
   </div>
 )
}
