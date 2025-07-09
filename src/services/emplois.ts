import { OffreEmploiInterface, CategorieEmploiInterface, FiltresOffreInterface, StatistiquesEmploisInterface } from '@/types/emplois'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceEmplois {
 private baseURL = `${API_BASE_URL}/emplois`

 async obtenirOffres(filtres?: FiltresOffreInterface): Promise<{
   results: OffreEmploiInterface[]
   count: number
   next: string | null
   previous: string | null
 }> {
   const params = new URLSearchParams()
   
   if (filtres) {
     Object.entries(filtres).forEach(([cle, valeur]) => {
       if (valeur !== undefined && valeur !== null && valeur !== '') {
         params.append(cle, valeur.toString())
       }
     })
   }

   const response = await fetch(`${this.baseURL}/liste/?${params}`)
   
   if (!response.ok) {
     throw new Error('Erreur lors du chargement des offres')
   }

   return await response.json()
 }

 async obtenirOffreParId(id: string): Promise<OffreEmploiInterface> {
   const response = await fetch(`${this.baseURL}/detail/${id}/`)
   
   if (!response.ok) {
     throw new Error('Offre non trouvée')
   }

   return await response.json()
 }

 async creerOffre(donneesOffre: Partial<OffreEmploiInterface>): Promise<OffreEmploiInterface> {
   const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
   
   const response = await fetch(`${this.baseURL}/creer/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify(donneesOffre)
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.message || 'Erreur lors de la création de l\'offre')
   }

   return await response.json()
 }

 async obtenirMesOffres(): Promise<OffreEmploiInterface[]> {
   const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
   
   const response = await fetch(`${this.baseURL}/mes-offres/`, {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement de vos offres')
   }

   return await response.json()
 }

 async obtenirCategories(): Promise<CategorieEmploiInterface[]> {
   const response = await fetch(`${this.baseURL}/categories/`)
   
   if (!response.ok) {
     throw new Error('Erreur lors du chargement des catégories')
   }

   return await response.json()
 }

 async obtenirStatistiques(): Promise<StatistiquesEmploisInterface> {
   const response = await fetch(`${this.baseURL}/statistiques/`)
   
   if (!response.ok) {
     throw new Error('Erreur lors du chargement des statistiques')
   }

   return await response.json()
 }
}

export const serviceEmplois = new ServiceEmplois()
