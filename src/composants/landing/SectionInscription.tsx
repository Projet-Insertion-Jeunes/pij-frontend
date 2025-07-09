'use client'
import { useState } from 'react'
import Link from 'next/link'
import { User, Building2, UserCheck, Settings, ChevronRight, CheckCircle } from 'lucide-react'

export function SectionInscription() {
 const [profilSelectionne, setProfilSelectionne] = useState<string | null>(null)

 const profils = [
   {
     id: 'jeune',
     titre: 'Jeune (15-35 ans)',
     description: 'À la recherche d\'un emploi, stage ou formation professionnelle',
     icone: User,
     couleur: 'bg-guinea-red',
     avantages: [
       'Accès gratuit à toutes les formations',
       'Accompagnement personnalisé',
       'Certification officielle',
       'Mise en relation avec employeurs'
     ]
   },
   {
     id: 'entreprise',
     titre: 'Entreprise',
     description: 'Recruter des jeunes talents et publier des offres',
     icone: Building2,
     couleur: 'bg-guinea-yellow',
     avantages: [
       'Publication d\'offres illimitée',
       'Accès aux profils vérifiés',
       'Outils d\'évaluation intégrés',
       'Support dédié'
     ]
   },
   {
     id: 'conseiller',
     titre: 'Conseiller',
     description: 'Accompagner et orienter les jeunes',
     icone: UserCheck,
     couleur: 'bg-guinea-green',
     avantages: [
       'Tableau de bord complet',
       'Outils de suivi',
       'Formation continue',
       'Réseau professionnel'
     ]
   },
   {
     id: 'partenaire',
     titre: 'Partenaire',
     description: 'Soutenir le développement du programme',
     icone: Settings,
     couleur: 'bg-purple-600',
     avantages: [
       'Visibilité institutionnelle',
       'Rapports d\'impact',
       'Événements exclusifs',
       'Reconnaissance officielle'
     ]
   }
 ]

 return (
   <section id="inscription" className="py-20 bg-light-gray">
     <div className="container mx-auto px-4">
       <div className="text-center mb-16">
         <h2 className="section-title">Rejoindre le Programme</h2>
         <p className="text-xl text-text-gray max-w-3xl mx-auto">
           Choisissez votre profil pour accéder aux fonctionnalités adaptées à vos besoins 
           et commencer votre parcours dans l'écosystème Simandou 2040
         </p>
       </div>

       {/* Sélection de profil */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
         {profils.map((profil) => {
           const IconeComponent = profil.icone
           const estSelectionne = profilSelectionne === profil.id
           
           return (
             <div
               key={profil.id}
               onClick={() => setProfilSelectionne(profil.id)}
               className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                 estSelectionne 
                   ? 'border-guinea-red shadow-xl ring-4 ring-guinea-red/20' 
                   : 'border-gray-200 hover:border-guinea-red/50 hover:shadow-lg'
               }`}
             >
               <div className={`w-16 h-16 ${profil.couleur} rounded-xl flex items-center justify-center text-white mb-4 mx-auto`}>
                 <IconeComponent className="h-8 w-8" />
               </div>
               
               <h3 className="text-xl font-bold text-center mb-2">{profil.titre}</h3>
               <p className="text-text-gray text-center text-sm mb-4">{profil.description}</p>
               
               {estSelectionne && (
                 <div className="space-y-2">
                   {profil.avantages.map((avantage, index) => (
                     <div key={index} className="flex items-center gap-2 text-sm">
                       <CheckCircle className="h-4 w-4 text-guinea-green flex-shrink-0" />
                       <span>{avantage}</span>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           )
         })}
       </div>

       {/* Bouton d'inscription */}
       {profilSelectionne && (
         <div className="text-center animate-fadeIn">
           <div className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-lg border border-guinea-red/20">
             <h3 className="text-2xl font-bold text-guinea-red mb-4">
               Profil sélectionné : {profils.find(p => p.id === profilSelectionne)?.titre}
             </h3>
             
             <Link
               href={`/inscription?profil=${profilSelectionne}`}
               className="bg-guinea-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary-red transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full"
             >
               Créer mon compte
               <ChevronRight className="h-5 w-5" />
             </Link>
             
             <p className="text-text-gray text-sm mt-4">
               Inscription 100% gratuite • Validation sous 24h • Support dédié
             </p>
           </div>
         </div>
       )}

       {/* Processus d'inscription */}
       <div className="mt-16 bg-white rounded-xl p-8">
         <h3 className="text-2xl font-bold text-center text-dark-gray mb-8">
           Processus d'inscription en 3 étapes
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="text-center">
             <div className="w-16 h-16 bg-guinea-red rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
               1
             </div>
             <h4 className="font-semibold mb-2">Inscription</h4>
             <p className="text-text-gray text-sm">
               Remplissez le formulaire avec vos informations et téléchargez vos documents
             </p>
           </div>
           
           <div className="text-center">
             <div className="w-16 h-16 bg-guinea-yellow rounded-full flex items-center justify-center text-dark-gray font-bold text-2xl mx-auto mb-4">
               2
             </div>
             <h4 className="font-semibold mb-2">Validation</h4>
             <p className="text-text-gray text-sm">
               Nos équipes vérifient votre profil et valident votre compte sous 24h
             </p>
           </div>
           
           <div className="text-center">
             <div className="w-16 h-16 bg-guinea-green rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
               3
             </div>
             <h4 className="font-semibold mb-2">Activation</h4>
             <p className="text-text-gray text-sm">
               Accédez à votre tableau de bord et commencez votre parcours
             </p>
           </div>
         </div>
       </div>
     </div>
   </section>
 )
}
