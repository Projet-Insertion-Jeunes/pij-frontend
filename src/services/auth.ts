import { ConnexionInterface, InscriptionJeuneInterface, InscriptionEntrepriseInterface, ReponseAuth } from '@/types/auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceAuth {
  // CORRECTION : URL correcte pour l'authentification
  private baseURL = `${API_BASE_URL}/auth`

  async connexion(donnees: ConnexionInterface): Promise<ReponseAuth> {
    console.log('🔍 Tentative de connexion:', donnees.email)
    
    const response = await fetch(`${this.baseURL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: donnees.email,
        password: donnees.motDePasse
      }),
    })

    console.log(' Response status:', response.status)

    if (!response.ok) {
      const erreur = await response.json()
      console.log('🚨 Erreur connexion:', erreur)
      throw new Error(erreur.error || erreur.non_field_errors?.[0] || 'Erreur de connexion')
    }

    const donnéesReponse = await response.json()
    console.log('✅ Connexion réussie:', donnéesReponse)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', donnéesReponse.tokens.access)
      localStorage.setItem('refresh_token', donnéesReponse.tokens.refresh)
      localStorage.setItem('utilisateur', JSON.stringify(donnéesReponse.user))
    }

    return {
      access: donnéesReponse.tokens.access,
      refresh: donnéesReponse.tokens.refresh,
      utilisateur: donnéesReponse.user,
      message: donnéesReponse.message
    }
  }

  async inscriptionJeune(donnees: InscriptionJeuneInterface): Promise<ReponseAuth> {
    console.log('🔍 Données reçues:', donnees);

    // ENVOYER SEULEMENT LES CHAMPS ATTENDUS PAR LE BACKEND !
    const donneesBackend = {
      first_name: donnees.prenom,
      last_name: donnees.nom,
      email: donnees.email,
      phone_number: donnees.telephone,
      password: donnees.motDePasse,
      password_confirm: donnees.confirmationMotDePasse,
      user_type: 'jeune',
      date_of_birth: donnees.dateNaissance
    };

    console.log('🔍 Données envoyées au backend:', donneesBackend);

    const response = await fetch(`${API_BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donneesBackend),
    })

    console.log('🔍 Response status:', response.status)
    console.log('🔍 Response ok:', response.ok)

    const responseText = await response.text()
    console.log('🔍 RÉPONSE BRUTE:', responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log('🚨 ERREUR PARSING JSON:', e.message)
      throw new Error('Réponse invalide du serveur')
    }

    if (!response.ok) {
      console.log('🚨 Erreur backend:', data)
      throw new Error(data.message || Object.values(data)[0] || 'Erreur d\'inscription')
    }

    console.log('✅ Réponse backend:', data)
    
    return {
      access: '',
      refresh: '',
      utilisateur: data,
      message: data.message || 'Inscription réussie'
    }
  }

  async inscriptionEntreprise(donnees: InscriptionEntrepriseInterface): Promise<ReponseAuth> {
    const response = await fetch(`${API_BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: donnees.nomEntreprise,
        last_name: 'Entreprise',
        email: donnees.emailContact,
        phone_number: donnees.telephoneContact,
        password: donnees.motDePasse,
        password_confirm: donnees.confirmationMotDePasse,
        user_type: 'entreprise'
      }),
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || Object.values(erreur)[0] || 'Erreur d\'inscription')
    }

    const data = await response.json()
    return {
      access: '',
      refresh: '',
      utilisateur: data,
      message: data.message
    }
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

    const response = await fetch(`${this.baseURL}/token/refresh/`, {
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
