'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  User, 
  Briefcase, 
  BookOpen, 
  TrendingUp, 
  Star,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const liens = [
  { href: '/tableau-de-bord/jeune', label: 'Tableau de bord', icone: Home },
  { href: '/tableau-de-bord/jeune/profil', label: 'Mon Profil', icone: User },
  { href: '/tableau-de-bord/jeune/candidatures', label: 'Candidatures', icone: Briefcase },
  { href: '/tableau-de-bord/jeune/formations', label: 'Formations', icone: BookOpen },
  { href: '/tableau-de-bord/jeune/progression', label: 'Progression', icone: TrendingUp },
  { href: '/tableau-de-bord/jeune/evaluations', label: 'Évaluations', icone: Star },
  { href: '/tableau-de-bord/jeune/messages', label: 'Messages', icone: MessageSquare },
  { href: '/tableau-de-bord/jeune/parametres', label: 'Paramètres', icone: Settings },
]

export function NavigationJeune() {
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
              J
            </div>
            <div>
              <h2 className="font-semibold text-dark-gray">Espace Jeune</h2>
              <p className="text-xs text-text-gray">Insertion Professionnelle</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu de navigation */}
      <ul className="py-4">
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

      {/* Profil utilisateur en bas */}
      {!reduite && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-guinea-green rounded-full flex items-center justify-center text-white font-bold">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-dark-gray truncate">Mamadou Diallo</p>
              <p className="text-xs text-text-gray truncate">mamadou@example.com</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
