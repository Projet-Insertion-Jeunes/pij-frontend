import { 
 DashboardAdminInterface, 
 ValidationsEnAttenteInterface,
 RapportActiviteInterface
} from '@/types/dashboard-admin'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceDashboardAdmin {
 private baseURL = `${API_BASE_URL}/tableau-bord/admin`

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

 async obtenirDashboardGlobal(): Promise<DashboardAdminInterface> {
   const response = await fetch(`${this.baseURL}/dashboard-global/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement du dashboard')
   }

   return await response.json()
 }

 async obtenirValidationsEnAttente(): Promise<ValidationsEnAttenteInterface> {
   const response = await fetch(`${this.baseURL}/validations-en-attente/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des validations')
   }

   return await response.json()
 }

 async validerProfilJeune(jeuneId: string, action: 'valider' | 'rejeter', commentaire?: string): Promise<{ message: string }> {
   const response = await fetch(`${this.baseURL}/valider-profil-jeune/${jeuneId}/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify({ action, commentaire })
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.error || 'Erreur lors de la validation')
   }

   return await response.json()
 }

 async validerProfilEntreprise(entrepriseId: string, action: 'valider' | 'rejeter', commentaire?: string): Promise<{ message: string }> {
   const response = await fetch(`${this.baseURL}/valider-profil-entreprise/${entrepriseId}/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify({ action, commentaire })
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.error || 'Erreur lors de la validation')
   }

   return await response.json()
 }

 async obtenirRapportActivite(periode: string = '30'): Promise<RapportActiviteInterface> {
   const response = await fetch(`${this.baseURL}/rapport-activite/?periode=${periode}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement du rapport')
   }

   return await response.json()
 }
}

export const serviceDashboardAdmin = new ServiceDashboardAdmin()
