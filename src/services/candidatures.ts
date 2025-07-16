import { 
 CandidatureInterface, 
 CreerCandidatureInterface,
 EntretienInterface,
 NotificationCandidatureInterface,
 StatistiquesCandidaturesInterface
} from '@/types/candidatures'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceCandidatures {
 private baseURL = `${API_BASE_URL}/jobs`

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

 async obtenirMesCandidatures(filtres?: Record<string, any>): Promise<CandidatureInterface[]> {
   const params = new URLSearchParams()
   if (filtres) {
     Object.entries(filtres).forEach(([cle, valeur]) => {
       if (valeur !== undefined && valeur !== null && valeur !== '') {
         params.append(cle, valeur.toString())
       }
     })
   }

   const response = await fetch(`${this.baseURL}/candidatures/mes-candidatures/?${params}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des candidatures')
   }

   const data = await response.json()
   return data.results || data
 }

 async creerCandidature(donnees: CreerCandidatureInterface): Promise<CandidatureInterface> {
   const response = await fetch(`${this.baseURL}/offres/${donnees.offreId}/candidater/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${this.obtenirToken()}`
     },
     body: JSON.stringify({
       lettre_motivation: donnees.lettreMotivation
     })
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.message || 'Erreur lors de la candidature')
   }

   return await response.json()
 }

 async obtenirDetailCandidature(id: string): Promise<CandidatureInterface> {
   const response = await fetch(`${this.baseURL}/candidatures/${id}/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Candidature non trouvée')
   }

   return await response.json()
 }

 async modifierCandidature(id: string, donnees: Partial<CandidatureInterface>): Promise<CandidatureInterface> {
   const response = await fetch(`${this.baseURL}/candidatures/${id}/`, {
     method: 'PATCH',
     headers: this.obtenirEntetes(),
     body: JSON.stringify(donnees)
   })

   if (!response.ok) {
     throw new Error('Erreur lors de la modification')
   }

   return await response.json()
 }

 async obtenirMesEntretiens(): Promise<EntretienInterface[]> {
   const response = await fetch(`${this.baseURL}/entretiens/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des entretiens')
   }

   const data = await response.json()
   return data.results || data
 }

 async obtenirNotifications(): Promise<NotificationCandidatureInterface[]> {
   const response = await fetch(`${API_BASE_URL}/notifications/notifications/mes-notifications/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des notifications')
   }

   const data = await response.json()
   return data.results || data
 }

 async obtenirStatistiques(): Promise<StatistiquesCandidaturesInterface> {
   const response = await fetch(`${this.baseURL}/statistiques/candidat/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des statistiques')
   }

   return await response.json()
 }

 async marquerFavoris(candidatureId: string, estFavoris: boolean): Promise<void> {
   await fetch(`${this.baseURL}/candidatures/${candidatureId}/`, {
     method: 'PATCH',
     headers: this.obtenirEntetes(),
     body: JSON.stringify({ est_favorite_jeune: estFavoris })
   })
 }
}

export const serviceCandidatures = new ServiceCandidatures()
