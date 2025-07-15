'use client'
// import { NavigationJeune } from '@/composants/navigation/NavigationJeune'
// import { EnTeteDashboard } from '@/composants/navigation/EnTeteDashboard'
import { HeaderJeune } from '@/composants/navigation/HeaderJeune'
import { SidebarJeune } from '@/composants/navigation/SidebarJeune'

export default function LayoutDashboardJeune({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <EnTeteDashboard typeUtilisateur="jeune" /> */}
      <HeaderJeune/>
      <div className="flex">
        {/* <NavigationJeune /> */}
        <SidebarJeune/>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
