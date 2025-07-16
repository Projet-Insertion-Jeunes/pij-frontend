export interface TypeNotificationInterface {
 code: string
 nom: string
 description: string
 typeNotification: 'candidature' | 'evaluation' | 'parcours' | 'offre' | 'entretien' | 'formation' | 'systeme' | 'marketing'
 prioriteDefaut: 'faible' | 'normale' | 'haute' | 'urgente'
 emailActifDefaut: boolean
 smsActifDefaut: boolean
 pushActifDefaut: boolean
 peutEtreDesactive: boolean
}

export interface PreferenceNotificationInterface {
 typeNotification: TypeNotificationInterface
 typeNotificationCode: string
 emailActif: boolean
 smsActif: boolean
 pushActif: boolean
 frequence: 'immediat' | 'quotidien' | 'hebdomadaire' | 'jamais'
 heureEnvoi: string
}

export interface NotificationInterface {
 id: string
 typeNotification: TypeNotificationInterface
 titre: string
 message: string
 donneesContexte: Record<string, any>
 urlAction: string
 boutonActionTexte: string
 canal: 'email' | 'sms' | 'push' | 'interne'
 canalDisplay: string
 statut: 'en_attente' | 'envoye' | 'delivre' | 'lu' | 'echec' | 'annule'
 statutDisplay: string
 priorite: 'faible' | 'normale' | 'haute' | 'urgente'
 prioriteDisplay: string
 dateCreation: string
 dateProgrammee?: string
 dateEnvoi?: string
 dateDelivre?: string
 dateLu?: string
 tempsEcoule: string
}

export interface StatistiquesNotificationsInterface {
 total: number
 nonLues: number
 parCanal: Record<string, { label: string; count: number }>
 parType: Record<string, { nom: string; count: number }>
 parPriorite: Record<string, { label: string; count: number }>
 cetteSemaine: number
}

export interface CreerNotificationInterface {
 destinataireId: string
 typeNotificationCode: string
 titre: string
 message: string
 donneesContexte?: Record<string, any>
 urlAction?: string
 boutonActionTexte?: string
 canal: 'email' | 'sms' | 'push' | 'interne'
 priorite?: 'faible' | 'normale' | 'haute' | 'urgente'
 dateProgrammee?: string
}
