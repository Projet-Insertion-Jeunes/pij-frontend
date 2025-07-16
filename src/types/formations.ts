export interface Formation {
  id: string
  title: string
  type: 'parcours' | 'technique' | 'certification' | 'module'
  status: 'completed' | 'in_progress' | 'planned'
  startDate: string
  endDate?: string
  description: string
  institution: string
  certificate?: string
} 