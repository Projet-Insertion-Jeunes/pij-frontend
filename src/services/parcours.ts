import { 
  TypeParcoursInterface, 
  InscriptionParcoursInterface,
  ProgressionModuleInterface,
  StatistiquesParcoursInterface
} from '@/types/parcours'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceParcours {
  private baseURL = `${API_BASE_URL}/parcours`

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

  async obtenirTypesParcours(): Promise<TypeParcoursInterface[]> {
    const response = await fetch(`${this.baseURL}/types/`)
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des types de parcours')
    }

    const data = await response.json()
    return data.results || data
  }

  async obtenirDetailTypeParcours(id: string): Promise<TypeParcoursInterface> {
    const response = await fetch(`${this.baseURL}/types/${id}/`)
    
    if (!response.ok) {
      throw new Error('Type de parcours non trouvé')
    }

    return await response.json()
  }

  async obtenirMesParcours(): Promise<InscriptionParcoursInterface[]> {
    const response = await fetch(`${this.baseURL}/inscriptions/mes-inscriptions/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement de vos parcours')
    }

    const data = await response.json()
    return data.results || data
  }

  async inscrireParcours(typeParcoursId: string): Promise<InscriptionParcoursInterface> {
    const response = await fetch(`${this.baseURL}/types/${typeParcoursId}/sinscrire/`, {
      method: 'POST',
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || 'Erreur lors de l\'inscription')
    }

    return await response.json()
  }

  async obtenirDetailMonParcours(id: string): Promise<InscriptionParcoursInterface> {
    const response = await fetch(`${this.baseURL}/inscriptions/${id}/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Parcours non trouvé')
    }

    return await response.json()
  }

  async commencerModule(moduleId: string): Promise<{
    message: string
    progression: ProgressionModuleInterface
  }> {
    const response = await fetch(`${this.baseURL}/modules/${moduleId}/commencer/`, {
      method: 'POST',
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.error || 'Erreur lors du démarrage du module')
    }

    return await response.json()
  }

  async terminerModule(progressionId: string, note: number): Promise<{
    message: string
    progression: ProgressionModuleInterface
    parcoursProgression: number
  }> {
    const response = await fetch(`${this.baseURL}/progressions/${progressionId}/terminer/`, {
      method: 'POST',
      headers: this.obtenirEntetes(),
      body: JSON.stringify({ note })
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.error || 'Erreur lors de la finalisation du module')
    }

    return await response.json()
  }

  async obtenirStatistiques(): Promise<StatistiquesParcoursInterface> {
    const response = await fetch(`${this.baseURL}/statistiques/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des statistiques')
    }

    return await response.json()
  }
}

export const serviceParcours = new ServiceParcours()
