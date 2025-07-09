import { 
 NotificationInterface, 
 TypeNotificationInterface,
 PreferenceNotificationInterface,
 StatistiquesNotificationsInterface,
 CreerNotificationInterface
} from '@/types/notifications'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceNotifications {
 private baseURL = `${API_BASE_URL}/notifications`

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

 async obtenirMesNotifications(filtres?: {
   canal?: string
   statut?: string
   priorite?: string
   nonLues?: boolean
 }): Promise<NotificationInterface[]> {
   const params = new URLSearchParams()
   
   if (filtres) {
     Object.entries(filtres).forEach(([cle, valeur]) => {
       if (valeur !== undefined && valeur !== null && valeur !== '') {
         params.append(cle, valeur.toString())
       }
     })
   }

   const response = await fetch(`${this.baseURL}/mes-notifications/?${params}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des notifications')
   }

   const data = await response.json()
   return data.results || data
 }

 async obtenirDetailNotification(id: string): Promise<NotificationInterface> {
   const response = await fetch(`${this.baseURL}/detail/${id}/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Notification non trouvée')
   }

   return await response.json()
 }

 async marquerNotificationLue(id: string): Promise<NotificationInterface> {
   const response = await fetch(`${this.baseURL}/${id}/marquer-lue/`, {
     method: 'POST',
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du marquage')
   }

   const data = await response.json()
   return data.notification
 }

 async marquerToutesLues(): Promise<{ message: string }> {
   const response = await fetch(`${this.baseURL}/marquer-toutes-lues/`, {
     method: 'POST',
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du marquage global')
   }

   return await response.json()
 }

 async obtenirTypesNotifications(): Promise<TypeNotificationInterface[]> {
   const response = await fetch(`${this.baseURL}/types/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des types')
   }

   return await response.json()
 }

 async obtenirMesPreferences(): Promise<PreferenceNotificationInterface[]> {
   const response = await fetch(`${this.baseURL}/preferences/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des préférences')
   }

   const data = await response.json()
   return data.results || data
 }

 async creerPreference(preference: Partial<PreferenceNotificationInterface>): Promise<PreferenceNotificationInterface> {
   const response = await fetch(`${this.baseURL}/preferences/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify(preference)
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.message || 'Erreur lors de la création de la préférence')
   }

   return await response.json()
 }

 async modifierPreference(id: number, preference: Partial<PreferenceNotificationInterface>): Promise<PreferenceNotificationInterface> {
   const response = await fetch(`${this.baseURL}/preferences/${id}/`, {
     method: 'PATCH',
     headers: this.obtenirEntetes(),
     body: JSON.stringify(preference)
   })

   if (!response.ok) {
     throw new Error('Erreur lors de la modification')
   }

   return await response.json()
 }

 async creerNotification(donnees: CreerNotificationInterface): Promise<NotificationInterface> {
   const response = await fetch(`${this.baseURL}/creer/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify(donnees)
   })

   if (!response.ok) {
     const erreur = await response.json()
     throw new Error(erreur.message || 'Erreur lors de la création')
   }

   return await response.json()
 }

 async obtenirStatistiques(): Promise<StatistiquesNotificationsInterface> {
   const response = await fetch(`${this.baseURL}/statistiques/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des statistiques')
   }

   return await response.json()
 }

 async testerNotification(canal: 'email' | 'sms' | 'push'): Promise<{
   message: string
   reussi: boolean
   notificationId: string
 }> {
   const response = await fetch(`${this.baseURL}/tester/`, {
     method: 'POST',
     headers: this.obtenirEntetes(),
     body: JSON.stringify({ canal })
   })

   if (!response.ok) {
     throw new Error('Erreur lors du test')
   }

   return await response.json()
 }

 // Méthodes utilitaires
 async compterNotificationsNonLues(): Promise<number> {
   const notifications = await this.obtenirMesNotifications({ nonLues: true })
   return notifications.length
 }

 // Polling pour les notifications en temps réel
 demarrerPolling(callback: (notifications: NotificationInterface[]) => void, intervalMs = 30000) {
   const poll = async () => {
     try {
       const notifications = await this.obtenirMesNotifications({ nonLues: true })
       callback(notifications)
     } catch (error) {
       console.error('Erreur polling notifications:', error)
     }
   }

   // Poll initial
   poll()

   // Poll périodique
   const interval = setInterval(poll, intervalMs)
   
   return () => clearInterval(interval)
 }
}

export const serviceNotifications = new ServiceNotifications()
