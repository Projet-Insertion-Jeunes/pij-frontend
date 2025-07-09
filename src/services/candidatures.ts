import { 
 CandidatureInterface, 
 CreerCandidatureInterface,
 EntretienInterface,
 NotificationCandidatureInterface,
 StatistiquesCandidaturesInterface
} from '@/types/candidatures'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceCandidatures {
 private baseURL = `${API_BASE_URL}/candidatures`

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

   const response = await fetch(`${this.baseURL}/mes-candidatures/?${params}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des candidatures')
   }

   const data = await response.json()
   return data.results || data
 }

 async creerCandidature(donnees: CreerCandidatureInterface): Promise<CandidatureInterface> {
   const formData = new FormData()
   formData.append('offre_id', donnees.offreId)
   formData.append('lettre_motivation', donnees.lettreMotivation)
   
   if (donnees.cvPersonnalise) {
     formData.append('cv_personnalise', donnees.cvPersonnalise)
   }
   
   if (donnees.documentsComplementaires) {
     formData.append('documents_complementaires', donnees.documentsComplementaires)
   }

   const token = this.obtenirToken()
   const response = await fetch(`${this.baseURL}/creer/`, {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`
     },
     body: formData
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.message || 'Erreur lors de la candidature')
   }

   return await response.json()
 }

 async obtenirDetailCandidature(id: string): Promise<CandidatureInterface> {
   const response = await fetch(`${this.baseURL}/detail/${id}/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Candidature non trouvée')
   }

   return await response.json()
 }

 async modifierCandidature(id: string, donnees: Partial<CandidatureInterface>): Promise<CandidatureInterface> {
   const response = await fetch(`${this.baseURL}/detail/${id}/`, {
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
   const response = await fetch(`${this.baseURL}/mes-entretiens/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des entretiens')
   }

   return await response.json()
 }

 async obtenirNotifications(): Promise<NotificationCandidatureInterface[]> {
   const response = await fetch(`${this.baseURL}/notifications/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des notifications')
   }

   const data = await response.json()
   return data.results || data
 }

 async obtenirStatistiques(): Promise<StatistiquesCandidaturesInterface> {
   const response = await fetch(`${this.baseURL}/statistiques/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des statistiques')
   }

   return await response.json()
 }

 async marquerFavoris(candidatureId: string, estFavoris: boolean): Promise<void> {
   await fetch(`${this.baseURL}/detail/${candidatureId}/`, {
     method: 'PATCH',
     headers: this.obtenirEntetes(),
     body: JSON.stringify({ est_favorite_jeune: estFavoris })
   })
 }
}

export const serviceCandidatures = new ServiceCandidatures()
