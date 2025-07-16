'use client'
import { NavigationAdmin } from '@/composants/navigation/NavigationAdmin'
import { EnTeteDashboard } from '@/composants/navigation/EnTeteDashboard'

export default function LayoutDashboardAdmin({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <div className="min-h-screen bg-gray-50">
     <EnTeteDashboard typeUtilisateur="admin" />
     <div className="flex">
       <NavigationAdmin />
       <main className="flex-1 p-6">
         {children}
       </main>
     </div>
   </div>
 )
}
