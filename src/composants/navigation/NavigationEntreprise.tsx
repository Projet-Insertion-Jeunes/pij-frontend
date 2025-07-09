'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
 Home, 
 Briefcase, 
 Users, 
 Star,
 BarChart3,
 Settings,
 MessageSquare,
 Calendar,
 ChevronLeft,
 ChevronRight,
 Plus
} from 'lucide-react'

const liens = [
 { href: '/tableau-de-bord/entreprise', label: 'Tableau de bord', icone: Home },
 { href: '/tableau-de-bord/entreprise/offres', label: 'Mes Offres', icone: Briefcase },
 { href: '/tableau-de-bord/entreprise/candidatures', label: 'Candidatures', icone: Users },
 { href: '/tableau-de-bord/entreprise/entretiens', label: 'Entretiens', icone: Calendar },
 { href: '/tableau-de-bord/entreprise/evaluations', label: 'Évaluations', icone: Star },
 { href: '/tableau-de-bord/entreprise/rapports', label: 'Rapports', icone: BarChart3 },
 { href: '/tableau-de-bord/entreprise/messages', label: 'Messages', icone: MessageSquare },
 { href: '/tableau-de-bord/entreprise/parametres', label: 'Paramètres', icone: Settings },
]

export function NavigationEntreprise() {
 const [reduite, setReduite] = useState(false)
 const cheminActuel = usePathname()

 return (
   <nav className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${reduite ? 'w-16' : 'w-64'}`}>
     {/* Bouton de réduction */}
     <div className="p-4 border-b border-gray-200">
       <button
         onClick={() => setReduite(!reduite)}
         className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
       >
         {reduite ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
       </button>
     </div>

     {/* Logo/Titre */}
     {!reduite && (
       <div className="p-4 border-b border-gray-200">
         <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-gradient-to-br from-guinea-red to-guinea-yellow rounded-lg flex items-center justify-center text-white font-bold">
             E
           </div>
           <div>
             <h2 className="font-semibold text-dark-gray">Espace Entreprise</h2>
             <p className="text-xs text-text-gray">Recrutement & RH</p>
           </div>
         </div>
       </div>
     )}

     {/* Bouton créer offre */}
     <div className="p-4">
       <Link
         href="/tableau-de-bord/entreprise/offres/creer"
         className={`flex items-center gap-3 bg-guinea-red text-white px-4 py-3 rounded-lg hover:bg-secondary-red transition-all duration-200 ${
           reduite ? 'justify-center' : ''
         }`}
       >
         <Plus size={20} />
         {!reduite && <span className="font-medium">Créer une offre</span>}
       </Link>
     </div>

     {/* Menu de navigation */}
     <ul className="py-2">
       {liens.map((lien) => {
         const IconeComponent = lien.icone
         const estActif = cheminActuel === lien.href

         return (
           <li key={lien.href}>
             <Link
               href={lien.href}
               className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                 estActif
                   ? 'bg-guinea-red text-white shadow-md'
                   : 'text-dark-gray hover:bg-gray-100'
               }`}
             >
               <IconeComponent size={20} />
               {!reduite && <span className="font-medium">{lien.label}</span>}
             </Link>
           </li>
         )
       })}
     </ul>

     {/* Profil entreprise en bas */}
     {!reduite && (
       <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
         <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-guinea-green rounded-full flex items-center justify-center text-white font-bold">
             E
           </div>
           <div className="flex-1 min-w-0">
             <p className="font-medium text-dark-gray truncate">Mon Entreprise SARL</p>
             <p className="text-xs text-text-gray truncate">entreprise@example.com</p>
           </div>
         </div>
       </div>
     )}
   </nav>
 )
}
