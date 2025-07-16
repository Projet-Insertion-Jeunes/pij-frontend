import { 
  DashboardEntrepriseInterface, 
  CandidaturesATraiterInterface,
  RapportRecrutementInterface
} from '@/types/dashboard-entreprise'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceDashboardEntreprise {
  private baseURL = `${API_BASE_URL}/tableau-bord/entreprise`

  private obtenirToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  }

  private obtenirEntetes(): HeadersInit {
    const token = this.obtenirToken()
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  async obtenirDashboard(): Promise<DashboardEntrepriseInterface> {
    const response = await fetch(`${this.baseURL}/dashboard/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement du dashboard')
    }

    return await response.json()
  }

  async obtenirCandidaturesATraiter(): Promise<CandidaturesATraiterInterface> {
    const response = await fetch(`${this.baseURL}/candidatures-a-traiter/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des candidatures à traiter')
    }

    return await response.json()
  }

  async obtenirRapportRecrutement(periode: string = '30'): Promise<RapportRecrutementInterface> {
    const response = await fetch(`${this.baseURL}/rapport-recrutement/?periode=${periode}`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement du rapport')
    }

    return await response.json()
  }
}

export const serviceDashboardEntreprise = new ServiceDashboardEntreprise()
