'use client'

export default function LayoutDashboardJeune({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Bonjour, Mamadou
        </h1>
        {children}
      </div>
    </div>
  )
}
