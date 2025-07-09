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

    return await response.json()
  }

  async obtenirDetailTypeParcours(type: string): Promise<TypeParcoursInterface> {
    const response = await fetch(`${this.baseURL}/types/${type}/`)
    
    if (!response.ok) {
      throw new Error('Type de parcours non trouvé')
    }

    return await response.json()
  }

  async obtenirMesParcours(): Promise<InscriptionParcoursInterface[]> {
    const response = await fetch(`${this.baseURL}/mes-parcours/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement de vos parcours')
    }

    return await response.json()
  }

  async inscrireParcours(typeParcours: string): Promise<InscriptionParcoursInterface> {
    const response = await fetch(`${this.baseURL}/inscrire/`, {
      method: 'POST',
      headers: this.obtenirEntetes(),
      body: JSON.stringify({ type_parcours_id: typeParcours })
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || 'Erreur lors de l\'inscription')
    }

    return await response.json()
  }

  async obtenirDetailMonParcours(id: string): Promise<InscriptionParcoursInterface> {
    const response = await fetch(`${this.baseURL}/detail/${id}/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Parcours non trouvé')
    }

    return await response.json()
  }

  async commencerModule(parcoursId: string, moduleId: string): Promise<{
    message: string
    progression: ProgressionModuleInterface
  }> {
    const response = await fetch(`${this.baseURL}/${parcoursId}/modules/${moduleId}/commencer/`, {
      method: 'POST',
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.error || 'Erreur lors du démarrage du module')
    }

    return await response.json()
  }

  async terminerModule(parcoursId: string, moduleId: string, note: number): Promise<{
    message: string
    progression: ProgressionModuleInterface
    parcoursProgression: number
  }> {
    const response = await fetch(`${this.baseURL}/${parcoursId}/modules/${moduleId}/terminer/`, {
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
