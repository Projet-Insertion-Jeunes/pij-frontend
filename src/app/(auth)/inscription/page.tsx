'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FormulaireInscriptionJeune } from '@/composants/formulaires/FormulaireInscriptionJeune'
import { FormulaireInscriptionEntreprise } from '@/composants/formulaires/FormulaireInscriptionEntreprise'
import { SectionMinistre } from '@/composants/auth/SectionMinistre'
import '@/styles/auth.css'

type TypeInscription = 'jeune' | 'entreprise'

export default function PageInscription() {
 const [typeSelectionne, setTypeSelectionne] = useState<TypeInscription>('jeune')

 return (
   <div className="min-h-screen gradient-guinea py-12 px-4">
     <div className="max-w-4xl mx-auto">
       {/* En-tête */}
       <div className="text-center mb-8">
         <Link href="/" className="inline-flex items-center gap-3 mb-6">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-guinea-red font-bold text-xl">
             PIJ
           </div>
           <span className="text-white text-xl font-semibold">Retour à l'accueil</span>
         </Link>
         <h1 className="text-4xl font-bold text-white mb-4">Rejoindre Simandou 2040</h1>
         <p className="text-white/90 text-lg max-w-2xl mx-auto">
           Choisissez votre profil pour créer votre compte et accéder aux opportunités d'insertion professionnelle
         </p>
       </div>

       {/* Sélecteur de type */}
       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
         <h2 className="text-white text-xl font-semibold mb-4 text-center">Je suis :</h2>
         <div className="grid md:grid-cols-2 gap-4">
           <button
             onClick={() => setTypeSelectionne('jeune')}
             className={`p-6 rounded-xl border-2 transition-all duration-300 ${
               typeSelectionne === 'jeune'
                 ? 'bg-white text-guinea-red border-white shadow-lg'
                 : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
             }`}
           >
             <div className="text-4xl mb-3">🎓</div>
             <h3 className="text-xl font-semibold mb-2">Jeune (15-35 ans)</h3>
             <p className="text-sm opacity-90">
               À la recherche d'un emploi, stage ou formation professionnelle
             </p>
           </button>

           <button
             onClick={() => setTypeSelectionne('entreprise')}
             className={`p-6 rounded-xl border-2 transition-all duration-300 ${
               typeSelectionne === 'entreprise'
                 ? 'bg-white text-guinea-red border-white shadow-lg'
                 : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
             }`}
           >
             <div className="text-4xl mb-3">🏢</div>
             <h3 className="text-xl font-semibold mb-2">Entreprise</h3>
             <p className="text-sm opacity-90">
               Recruter des jeunes talents et publier des offres
             </p>
           </button>
         </div>
       </div>

       {/* Section du Ministre */}
       <SectionMinistre />

       {/* Formulaire d'inscription */}
       <div className="bg-white rounded-xl shadow-2xl p-8">
         {typeSelectionne === 'jeune' ? (
           <FormulaireInscriptionJeune />
         ) : (
           <FormulaireInscriptionEntreprise />
         )}
       </div>

       {/* Lien de connexion */}
       <div className="text-center mt-8">
         <p className="text-white">
           Déjà un compte ?{' '}
           <Link href="/connexion" className="text-guinea-yellow hover:underline font-semibold">
             Se connecter
           </Link>
         </p>
       </div>
     </div>
   </div>
 )
}
