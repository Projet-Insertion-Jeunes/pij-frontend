'use client'

interface PaginationProps {
  total: number
  page: number
  onChangementPage: (page: number) => void
}

export function Pagination({ total, page, onChangementPage }: PaginationProps) {
  const totalPages = Math.ceil(total / 20) // 20 items par page
  
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onChangementPage(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        Précédent
      </button>
      
      <span className="px-3 py-2 text-sm text-gray-700">
        Page {page} sur {totalPages}
      </span>
      
      <button
        onClick={() => onChangementPage(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  )
}
