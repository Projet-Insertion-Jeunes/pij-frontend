'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  User, 
  Search, 
  FileText, 
  GraduationCap, 
  Star, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react'

interface NavigationItem {
  name: string
  href?: string
  icon: any
}

const navigation: NavigationItem[] = [
  { name: 'Tableau de bord', href: '/dashboard-jeune', icon: LayoutDashboard },
  { name: 'Mon profil', href: '/dashboard-jeune/profil', icon: User },
  { name: 'Rechercher des offres', href: '/dashboard-jeune/offres', icon: Search },
  { name: 'Mes candidatures', href: '/dashboard-jeune/candidatures', icon: FileText },
  { name: 'Mon parcours', href: '/dashboard-jeune/parcours', icon: GraduationCap },
  { name: 'Mes évaluations', href: '/dashboard-jeune/evaluations', icon: Star },
  { name: 'Notifications', href: '/dashboard-jeune/notifications', icon: Bell },
  { name: 'Messages', href: '/dashboard-jeune/messages', icon: MessageSquare },
  { name: 'Paramètres', href: '/dashboard-jeune/settings', icon: Settings },
  { name: 'Déconnexion', href: '/dashboard-jeune/logout', icon: LogOut },
]

export function SidebarJeune() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="w-72 bg-gradient-to-b from-guinea-red to-guinea-green text-white fixed h-screen shadow-md z-50 transition-transform duration-300 ease-in-out">
      <div className="sidebar-header p-6 border-b border-white/10 text-center">
        <div className="user-avatar w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md relative">
          <span className="text-3xl">👨‍🎓</span>
          <div className="status-indicator w-5 h-5 bg-guinea-green rounded-full border-2 border-white absolute bottom-1 right-1"></div>
        </div>
        <h3 className="text-lg font-semibold">Mamadou DIALLO</h3>
        <p className="text-sm opacity-80">Jeune Simandou 2040</p>
        <div className="progress-ring mt-4 relative">
          <svg className="progress-circle w-15 h-15">
            <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6"></circle>
            <circle cx="30" cy="30" r="20" fill="none" stroke="#FCD116" strokeWidth="6" strokeDasharray="126" strokeDashoffset="31.5"></circle>
          </svg>
          <div className="progress-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">75%</div>
        </div>
        <p className="text-xs opacity-80 mt-1">Profil complété</p>
      </div>
      <ul className="nav-menu p-5 space-y-2">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href || '#'}
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg text-white hover:bg-white/10 border-l-4 border-transparent transition-all duration-300',
                isActive(item.href || '') && 'bg-white/10 border-l-guinea-yellow'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Bouton mobile (ajouté dynamiquement si nécessaire) */}
      <button
        className="fixed top-5 left-5 bg-guinea-red text-white p-2 rounded-md md:hidden z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </nav>
  )
}