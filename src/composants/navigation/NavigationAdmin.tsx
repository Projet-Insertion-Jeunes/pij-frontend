'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield,
  CheckCircle,
  AlertTriangle,
  Award
} from 'lucide-react'

export function NavigationAdmin() {
  const pathname = usePathname()

  const navigationItems = [
    {
      href: '/tableau-de-bord/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      exactMatch: true
    },
    {
      href: '/tableau-de-bord/admin/validations',
      label: 'Validations',
      icon: CheckCircle,
      badge: 'urgent'
    },
    {
      href: '/tableau-de-bord/admin/utilisateurs',
      label: 'Utilisateurs',
      icon: Users
    },
    {
      href: '/tableau-de-bord/admin/entreprises',
      label: 'Entreprises',
      icon: Building2
    },
    {
      href: '/tableau-de-bord/admin/offres',
      label: 'Offres d\'emploi',
      icon: FileText
    },
    {
      href: '/tableau-de-bord/admin/rapports',
      label: 'Rapports',
      icon: BarChart3
    },
    {
      href: '/tableau-de-bord/admin/parcours',
      label: 'Parcours',
      icon: Award
    },
    {
      href: '/tableau-de-bord/admin/monitoring',
      label: 'Monitoring',
      icon: AlertTriangle
    },
    {
      href: '/tableau-de-bord/admin/configuration',
      label: 'Configuration',
      icon: Settings
    }
  ]

  const isActiveLink = (href: string, exactMatch = false) => {
    if (exactMatch) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-green-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Admin PIJ</h2>
            <p className="text-sm text-gray-600">Simandou 2040</p>
          </div>
        </div>
      </div>

      <div className="py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = isActiveLink(item.href, item.exactMatch)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge === 'urgent' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  !
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Administrateur</p>
            <p className="text-xs text-gray-600">admin@simandou.gn</p>
          </div>
        </div>
      </div>
    </nav>
  )
} 