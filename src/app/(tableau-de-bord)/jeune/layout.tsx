'use client'
import { NavigationJeune } from '@/composants/navigation/NavigationJeune'
import { EnTeteDashboard } from '@/composants/navigation/EnTeteDashboard'

export default function LayoutDashboardJeune({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnTeteDashboard typeUtilisateur="jeune" />
      <div className="flex">
        <NavigationJeune />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
