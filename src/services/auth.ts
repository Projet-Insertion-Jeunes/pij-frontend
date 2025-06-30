import { ConnexionInterface, InscriptionJeuneInterface, InscriptionEntrepriseInterface, ReponseAuth } from '@/types/auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceAuth {
  private baseURL = `${API_BASE_URL}/auth`

  async connexion(donnees: ConnexionInterface): Promise<ReponseAuth> {
    const response = await fetch(`${this.baseURL}/connexion/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donnees),
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || 'Erreur de connexion')
    }

    const donnéesReponse = await response.json()
    
    // Stockage des tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', donnéesReponse.access)
      localStorage.setItem('refresh_token', donnéesReponse.refresh)
      localStorage.setItem('utilisateur', JSON.stringify(donnéesReponse.utilisateur))
    }

    return donnéesReponse
  }

  async inscriptionJeune(donnees: InscriptionJeuneInterface): Promise<ReponseAuth> {
    const formData = new FormData()
    
    // Ajout des données texte
    Object.entries(donnees).forEach(([cle, valeur]) => {
      if (cle !== 'pieceIdentite' && cle !== 'cv' && valeur !== null) {
        formData.append(cle, valeur.toString())
      }
    })

    // Ajout des fichiers
    if (donnees.pieceIdentite) {
      formData.append('pieceIdentite', donnees.pieceIdentite)
    }
    if (donnees.cv) {
      formData.append('cv', donnees.cv)
    }

    const response = await fetch(`${this.baseURL}/inscription/jeune/`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || 'Erreur d\'inscription')
    }

    return await response.json()
  }

  async inscriptionEntreprise(donnees: InscriptionEntrepriseInterface): Promise<ReponseAuth> {
    const response = await fetch(`${this.baseURL}/inscription/entreprise/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donnees),
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || 'Erreur d\'inscription')
    }

    return await response.json()
  }

  async deconnexion(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('utilisateur')
    }
  }

  async rafraichirToken(): Promise<string> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
    
    if (!refreshToken) {
      throw new Error('Token de rafraîchissement non trouvé')
    }

    const response = await fetch(`${this.baseURL}/token/rafraichir/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Impossible de rafraîchir le token')
    }

    const donnees = await response.json()
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', donnees.access)
    }

    return donnees.access
  }

  obtenirUtilisateurActuel() {
    if (typeof window !== 'undefined') {
      const utilisateurStr = localStorage.getItem('utilisateur')
      return utilisateurStr ? JSON.parse(utilisateurStr) : null
    }
    return null
  }

  estConnecte(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access_token')
    }
    return false
  }
}

export const serviceAuth = new ServiceAuth()
