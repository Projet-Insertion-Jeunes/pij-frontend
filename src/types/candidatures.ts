export interface CandidatureInterface {
 id: string
 jeune: {
   id: string
   email: string
   firstName: string
   lastName: string
 }
 offre: {
   id: string
   titre: string
   entrepriseNom: string
   typeOffre: string
   ville: string
   region: string
 }
 lettreMotivation: string
 cvPersonnalise?: string
 documentsComplementaires?: string
 statut: 'soumise' | 'vue' | 'preselectionne' | 'entretien_programme' | 'en_attente_decision' | 'acceptee' | 'refusee' | 'retiree'
 dateCandidature: string
 dateDerniereModification: string
 dateVueEntreprise?: string
 dateReponse?: string
 commentaireEntreprise?: string
 noteCandidature?: number
 estFavoriteJeune: boolean
 estFavoriteEntreprise: boolean
 tempsEcoule: string
 peutEtreModifiee: boolean
}

export interface CreerCandidatureInterface {
 offreId: string
 lettreMotivation: string
 cvPersonnalise?: File
 documentsComplementaires?: File
}

export interface EntretienInterface {
 id: string
 candidature: CandidatureInterface
 dateEntretien: string
 dureePrevue: number
 typeEntretien: 'physique' | 'visio' | 'telephonique'
 lieuOuLien: string
 interviewers: string
 statut: 'programme' | 'confirme' | 'reporte' | 'realise' | 'annule'
 notesEntretien?: string
 evaluationCandidat?: number
 recommandations?: string
 tempsRestant?: string
}

export interface NotificationCandidatureInterface {
 id: string
 typeNotification: string
 titre: string
 message: string
 estLue: boolean
 dateCreation: string
 dateLecture?: string
 candidatureInfo: {
   id: string
   offreTitre: string
   entreprise: string
   statut: string
 }
 tempsEcoule: string
}

export interface StatistiquesCandidaturesInterface {
 totalCandidatures: number
 candidaturesParStatut: Record<string, { label: string; count: number }>
 tauxReponse: number
 entretiensObtenus: number
 candidaturesAcceptees: number
 candidaturesCeMois: number
}
