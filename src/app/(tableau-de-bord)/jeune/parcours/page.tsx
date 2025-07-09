'use client'
import { useState, useEffect } from 'react'
import { BookOpen, Clock, Award, Users, TrendingUp } from 'lucide-react'
import { TypeParcoursInterface, StatistiquesParcoursInterface } from '@/types/parcours'
import { serviceParcours } from '@/services/parcours'
import { CarteParcours } from '@/composants/parcours/CarteParcours'
import { StatistiquesParcours } from '@/composants/parcours/StatistiquesParcours'

export default function PageParcours() {
  const [typesParcours, setTypesParcours] = useState<TypeParcoursInterface[]>([])
  const [statistiques, setStatistiques] = useState<StatistiquesParcoursInterface | null>(null)
  const [chargement, setChargement] = useState(true)

  const chargerDonnees = async () => {
    setChargement(true)
    try {
      const [typesData, statsData] = await Promise.all([
        serviceParcours.obtenirTypesParcours(),
        serviceParcours.obtenirStatistiques()
      ])
      setTypesParcours(typesData)
      setStatistiques(statsData)
      } catch (error) {
     console.error('Erreur chargement:', error)
   } finally {
     setChargement(false)
   }
 }

 useEffect(() => {
   chargerDonnees()
 }, [])

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
       <h1 className="text-3xl font-bold text-dark-gray mb-4">Parcours de Formation</h1>
       <p className="text-text-gray mb-6">
         Développez vos compétences avec nos parcours personnalisés adaptés à votre profil et vos objectifs professionnels
       </p>

       {/* Statistiques */}
       {statistiques && <StatistiquesParcours statistiques={statistiques} />}
     </div>

     {/* Guide des parcours */}
     <div className="bg-gradient-to-r from-guinea-green to-guinea-yellow rounded-xl p-6 text-white">
       <h2 className="text-2xl font-bold mb-4">🎯 Guide des Parcours</h2>
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="bg-white/20 rounded-lg p-4">
           <div className="text-2xl font-bold mb-2">A</div>
           <div className="text-sm">Insertion Immédiate</div>
           <div className="text-xs opacity-90">Pour les profils opérationnels</div>
         </div>
         <div className="bg-white/20 rounded-lg p-4">
           <div className="text-2xl font-bold mb-2">B</div>
           <div className="text-sm">Mise à Niveau</div>
           <div className="text-xs opacity-90">Compléter vos compétences</div>
         </div>
         <div className="bg-white/20 rounded-lg p-4">
           <div className="text-2xl font-bold mb-2">C</div>
           <div className="text-sm">Reconversion</div>
           <div className="text-xs opacity-90">Nouvelle orientation professionnelle</div>
         </div>
         <div className="bg-white/20 rounded-lg p-4">
           <div className="text-2xl font-bold mb-2">D</div>
           <div className="text-sm">Savoir-être</div>
           <div className="text-xs opacity-90">Compétences comportementales</div>
         </div>
       </div>
     </div>

     {/* Liste des parcours */}
     <div className="grid lg:grid-cols-2 gap-6">
       {typesParcours.map((parcours) => (
         <CarteParcours 
           key={parcours.typeParcours} 
           parcours={parcours}
           onInscription={chargerDonnees}
         />
       ))}
     </div>

     {/* Informations complémentaires */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
         <BookOpen className="h-5 w-5 text-guinea-red" />
         Comment ça fonctionne ?
       </h2>
       
       <div className="grid md:grid-cols-3 gap-6">
         <div className="text-center">
           <div className="w-12 h-12 bg-guinea-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
             <span className="text-guinea-red font-bold text-xl">1</span>
           </div>
           <h3 className="font-semibold mb-2">Évaluation</h3>
           <p className="text-sm text-text-gray">
             Nos conseillers évaluent votre profil et vous orientent vers le parcours adapté
           </p>
         </div>
         
         <div className="text-center">
           <div className="w-12 h-12 bg-guinea-yellow/10 rounded-full flex items-center justify-center mx-auto mb-3">
             <span className="text-guinea-yellow font-bold text-xl">2</span>
           </div>
           <h3 className="font-semibold mb-2">Formation</h3>
           <p className="text-sm text-text-gray">
             Suivez les modules de formation à votre rythme avec un accompagnement personnalisé
           </p>
         </div>
         
         <div className="text-center">
           <div className="w-12 h-12 bg-guinea-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
             <span className="text-guinea-green font-bold text-xl">3</span>
           </div>
           <h3 className="font-semibold mb-2">Certification</h3>
           <p className="text-sm text-text-gray">
             Obtenez votre certificat officiel et accédez aux opportunités d'emploi
           </p>
         </div>
       </div>
     </div>
   </div>
 )
}
