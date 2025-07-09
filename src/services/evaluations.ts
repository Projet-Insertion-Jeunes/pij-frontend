import { 
 EvaluationEmployeurInterface, 
 CreerEvaluationInterface,
 StatistiqueEvaluationInterface,
 CritereEvaluationInterface
} from '@/types/evaluations'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceEvaluations {
 private baseURL = `${API_BASE_URL}/evaluations`

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

 async obtenirMesEvaluations(filtres?: Record<string, any>): Promise<EvaluationEmployeurInterface[]> {
   const params = new URLSearchParams()
   if (filtres) {
     Object.entries(filtres).forEach(([cle, valeur]) => {
       if (valeur !== undefined && valeur !== null && valeur !== '') {
         params.append(cle, valeur.toString())
       }
     })
   }

   const response = await fetch(`${this.baseURL}/mes-evaluations/?${params}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des évaluations')
   }

   const data = await response.json()
   return data.results || data
 }

 async obtenirEvaluationsDonnees(filtres?: Record<string, any>): Promise<EvaluationEmployeurInterface[]> {
   const params = new URLSearchParams()
   if (filtres) {
     Object.entries(filtres).forEach(([cle, valeur]) => {
       if (valeur !== undefined && valeur !== null && valeur !== '') {
         params.append(cle, valeur.toString())
       }
     })
   }

   const response = await fetch(`${this.baseURL}/donnees/?${params}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des évaluations données')
   }

   const data = await response.json()
   return data.results || data
 }

 async creerEvaluation(donnees: CreerEvaluationInterface): Promise<EvaluationEmployeurInterface> {
   const response = await fetch(`${this.baseURL}/creer/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify(donnees)
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.message || 'Erreur lors de la création de l\'évaluation')
   }

   return await response.json()
 }

 async obtenirDetailEvaluation(id: string): Promise<EvaluationEmployeurInterface> {
   const response = await fetch(`${this.baseURL}/detail/${id}/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Évaluation non trouvée')
   }

   return await response.json()
 }

 async obtenirCriteresEvaluation(): Promise<CritereEvaluationInterface[]> {
   const response = await fetch(`${this.baseURL}/criteres/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des critères')
   }

   return await response.json()
 }

 async obtenirMesStatistiques(): Promise<StatistiqueEvaluationInterface> {
   const response = await fetch(`${this.baseURL}/mes-statistiques/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des statistiques')
   }

   return await response.json()
 }

 async marquerEvaluationLue(evaluationId: string): Promise<void> {
   const response = await fetch(`${this.baseURL}/${evaluationId}/marquer-lue/`, {
     method: 'POST',
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du marquage de lecture')
   }
 }

 async repondreEvaluation(evaluationId: string, reponse: string): Promise<EvaluationEmployeurInterface> {
   const response = await fetch(`${this.baseURL}/${evaluationId}/repondre/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify({ reponse })
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.error || 'Erreur lors de l\'envoi de la réponse')
   }

   const data = await response.json()
   return data.evaluation
 }

async obtenirEvaluationsPubliquesJeune(jeuneId: string): Promise<{
   jeune: { id: string; nom: string; email: string }
   statistiques: {
     nombreEvaluations: number
     noteMoyenne: number
     pourcentageRecommande: number
     experienceTotaleJours: number
   }
   evaluations: EvaluationEmployeurInterface[]
 }> {
   const response = await fetch(`${this.baseURL}/publiques/${jeuneId}/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des évaluations publiques')
   }

   return await response.json()
 }
}

export const serviceEvaluations = new ServiceEvaluations()
