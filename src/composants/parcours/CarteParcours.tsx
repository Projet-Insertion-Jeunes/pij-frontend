'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Clock, BookOpen, Award, ChevronRight, CheckCircle } from 'lucide-react'
import { TypeParcoursInterface } from '@/types/parcours'
import { serviceParcours } from '@/services/parcours'

interface CarteParcoursProps {
 parcours: TypeParcoursInterface
 onInscription: () => void
}

export function CarteParcours({ parcours, onInscription }: CarteParcoursProps) {
 const [chargement, setChargement] = useState(false)
 const [inscrit, setInscrit] = useState(false)

 const getCouleurParcours = (type: string) => {
   const couleurs = {
     'A': 'border-green-500 bg-green-50',
     'B': 'border-blue-500 bg-blue-50',
     'C': 'border-purple-500 bg-purple-50',
     'D': 'border-orange-500 bg-orange-50'
   }
   return couleurs[type as keyof typeof couleurs] || couleurs.A
 }

 const getIconeParcours = (type: string) => {
   const icones = {
     'A': '🚀',
     'B': '🔧',
     'C': '🔄',
     'D': '👤'
   }
   return icones[type as keyof typeof icones] || '📚'
 }

 const gererInscription = async () => {
   setChargement(true)
   try {
     await serviceParcours.inscrireParcours(parcours.typeParcours)
     setInscrit(true)
     onInscription()
   } catch (error) {
     console.error('Erreur inscription:', error)
     alert(error instanceof Error ? error.message : 'Erreur lors de l\'inscription')
   } finally {
     setChargement(false)
   }
 }

 return (
   <div className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${getCouleurParcours(parcours.typeParcours)}`}>
     {/* En-tête */}
     <div className="flex items-start justify-between mb-4">
       <div className="flex items-center gap-3">
         <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
           {getIconeParcours(parcours.typeParcours)}
         </div>
         <div>
           <h3 className="text-xl font-bold text-dark-gray">
             Parcours {parcours.typeParcours}
           </h3>
           <p className="text-sm font-medium text-text-gray">{parcours.nom}</p>
         </div>
       </div>
       
       {parcours.estObligatoire && (
         <span className="bg-guinea-red text-white px-2 py-1 rounded-full text-xs font-medium">
           Obligatoire
         </span>
       )}
     </div>

     {/* Description */}
     <p className="text-text-gray text-sm mb-4 line-clamp-3">
       {parcours.description}
     </p>

     {/* Détails */}
     <div className="grid grid-cols-2 gap-4 mb-4">
       <div className="flex items-center gap-2 text-sm">
         <Clock className="h-4 w-4 text-guinea-red" />
         <span>{parcours.dureeFormattee}</span>
       </div>
       
       <div className="flex items-center gap-2 text-sm">
         <BookOpen className="h-4 w-4 text-guinea-red" />
         <span>{parcours.nombreModules} modules</span>
       </div>
     </div>

     {/* Objectifs (aperçu) */}
     <div className="bg-white/50 rounded-lg p-3 mb-4">
       <h4 className="font-medium text-sm mb-2">🎯 Objectifs :</h4>
       <p className="text-xs text-text-gray line-clamp-2">
         {parcours.objectifs}
       </p>
     </div>

     {/* Compétences cibles */}
     <div className="bg-white/50 rounded-lg p-3 mb-4">
       <h4 className="font-medium text-sm mb-2">💪 Compétences développées :</h4>
       <p className="text-xs text-text-gray line-clamp-2">
         {parcours.competencesCibles}
       </p>
     </div>

     {/* Actions */}
     <div className="flex gap-3">
       <Link
         href={`/tableau-de-bord/jeune/parcours/${parcours.typeParcours}`}
         className="flex-1 bg-white border border-gray-300 text-dark-gray px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
       >
         Voir détails
         <ChevronRight className="h-4 w-4" />
       </Link>
       
       {inscrit ? (
         <div className="flex-1 bg-green-100 text-green-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
           <CheckCircle className="h-4 w-4" />
           Inscrit
         </div>
       ) : (
         <button
           onClick={gererInscription}
           disabled={chargement}
           className="flex-1 bg-guinea-red text-white px-4 py-2 rounded-lg hover:bg-secondary-red disabled:opacity-50 transition-colors text-sm font-medium"
         >
           {chargement ? 'Inscription...' : 'S\'inscrire'}
         </button>
       )}
     </div>
   </div>
 )
}
