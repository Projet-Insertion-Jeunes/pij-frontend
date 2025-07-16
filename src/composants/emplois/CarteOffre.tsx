'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
 MapPin, 
 Clock, 
 Briefcase, 
 Building2, 
 Eye, 
 Users, 
 Heart,
 ExternalLink,
 Calendar
} from 'lucide-react'
import { OffreEmploiInterface } from '@/types/emplois'

interface CarteOffreProps {
 offre: OffreEmploiInterface
}

export function CarteOffre({ offre }: CarteOffreProps) {
 const [estFavoris, setEstFavoris] = useState(false)

 const getTypeOffreStyle = (type: string) => {
   const styles = {
     emploi: 'bg-guinea-red/10 text-guinea-red',
     stage: 'bg-guinea-yellow/10 text-guinea-yellow',
     formation: 'bg-guinea-green/10 text-guinea-green',
     apprentissage: 'bg-blue-100 text-blue-600'
   }
   return styles[type as keyof typeof styles] || styles.emploi
 }

 const formaterSalaire = () => {
   if (!offre.salaireMin && !offre.salaireMax) return 'Salaire à négocier'
   
   if (offre.salaireMin && offre.salaireMax) {
     return `${offre.salaireMin.toLocaleString()} - ${offre.salaireMax.toLocaleString()} ${offre.devise}`
   }
   
   if (offre.salaireMin) {
     return `À partir de ${offre.salaireMin.toLocaleString()} ${offre.devise}`
   }
   
   return `Jusqu'à ${offre.salaireMax?.toLocaleString()} ${offre.devise}`
 }

 const obtenirTempsEcoule = () => {
   const maintenant = new Date()
   const dateCreation = new Date(offre.dateCreation)
   const diffTemps = maintenant.getTime() - dateCreation.getTime()
   const diffJours = Math.floor(diffTemps / (1000 * 3600 * 24))
   
   if (diffJours === 0) return 'Aujourd\'hui'
   if (diffJours === 1) return 'Hier'
   if (diffJours < 7) return `Il y a ${diffJours} jours`
   if (diffJours < 30) return `Il y a ${Math.floor(diffJours / 7)} semaines`
   return `Il y a ${Math.floor(diffJours / 30)} mois`
 }

 return (
   <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-white">
     {/* En-tête */}
     <div className="flex justify-between items-start mb-4">
       <div className="flex-1">
         <div className="flex items-center gap-3 mb-2">
           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeOffreStyle(offre.typeOffre)}`}>
             {offre.typeOffre.charAt(0).toUpperCase() + offre.typeOffre.slice(1)}
           </span>
           {offre.travailDistance && (
             <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
               🌐 Télétravail
             </span>
           )}
           {offre.estExpiree && (
             <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
               Expirée
             </span>
           )}
         </div>
         
         <h3 className="text-xl font-semibold text-dark-gray mb-1 hover:text-guinea-red cursor-pointer">
           <Link href={`/offres/${offre.id}`}>
             {offre.titre}
           </Link>
         </h3>
         
         <div className="flex items-center gap-2 text-text-gray text-sm">
           <Building2 className="h-4 w-4" />
           <span className="font-medium">{offre.entrepriseNom}</span>
           <span>•</span>
           <MapPin className="h-4 w-4" />
           <span>{offre.ville}, {offre.region}</span>
         </div>
       </div>

       <button
         onClick={() => setEstFavoris(!estFavoris)}
         className={`p-2 rounded-full transition-colors ${
           estFavoris 
             ? 'bg-red-100 text-red-500' 
             : 'bg-gray-100 text-text-gray hover:bg-red-100 hover:text-red-500'
         }`}
       >
         <Heart className={`h-5 w-5 ${estFavoris ? 'fill-current' : ''}`} />
       </button>
     </div>

     {/* Description */}
     <p className="text-text-gray text-sm mb-4 line-clamp-3">
       {offre.description}
     </p>

     {/* Détails */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
       <div className="flex items-center gap-2 text-text-gray">
         <Briefcase className="h-4 w-4" />
         <span>{offre.typeContrat.toUpperCase()}</span>
       </div>
       
       <div className="flex items-center gap-2 text-text-gray">
         <Clock className="h-4 w-4" />
         <span>{offre.niveauExperience}</span>
       </div>
       
       <div className="flex items-center gap-2 text-text-gray">
         <Users className="h-4 w-4" />
         <span>{offre.nombreCandidatures} candidatures</span>
       </div>
       
       <div className="flex items-center gap-2 text-text-gray">
         <Eye className="h-4 w-4" />
         <span>{offre.nombreVues} vues</span>
       </div>
     </div>

     {/* Salaire */}
     <div className="mb-4">
       <span className="text-lg font-semibold text-guinea-red">
         {formaterSalaire()}
       </span>
     </div>

     {/* Compétences (aperçu) */}
     {offre.competences && offre.competences.length > 0 && (
       <div className="mb-4">
         <div className="flex flex-wrap gap-2">
           {offre.competences.slice(0, 4).map((competence) => (
             <span
               key={competence.id}
               className="px-2 py-1 bg-gray-100 text-text-gray text-xs rounded"
             >
               {competence.nom}
             </span>
           ))}
           {offre.competences.length > 4 && (
             <span className="px-2 py-1 bg-gray-100 text-text-gray text-xs rounded">
               +{offre.competences.length - 4} autres
             </span>
           )}
         </div>
       </div>
     )}

     {/* Pied de carte */}
     <div className="flex justify-between items-center">
       <div className="flex items-center gap-2 text-text-gray text-sm">
         <Calendar className="h-4 w-4" />
         <span>Publié {obtenirTempsEcoule()}</span>
       </div>

       <div className="flex gap-2">
         <Link
           href={`/offres/${offre.id}`}
           className="bg-white border border-guinea-red text-guinea-red px-4 py-2 rounded-lg hover:bg-guinea-red hover:text-white transition-colors flex items-center gap-2 text-sm"
         >
           <ExternalLink className="h-4 w-4" />
           Voir détails
         </Link>
         
         <button className="bg-guinea-red text-white px-4 py-2 rounded-lg hover:bg-secondary-red transition-colors text-sm font-medium">
           Postuler
         </button>
       </div>
     </div>
   </div>
 )
}
