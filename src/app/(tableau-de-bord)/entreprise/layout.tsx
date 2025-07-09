'use client'
import { NavigationEntreprise } from '@/composants/navigation/NavigationEntreprise'
import { EnTeteDashboard } from '@/composants/navigation/EnTeteDashboard'

export default function LayoutDashboardEntreprise({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnTeteDashboard typeUtilisateur="entreprise" />
      <div className="flex">
        <NavigationEntreprise />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
