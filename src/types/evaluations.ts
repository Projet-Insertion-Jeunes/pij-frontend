export interface CritereEvaluationInterface {
 id: string
 nom: string
 description: string
 poids: number
 categorie: 'technique' | 'comportement' | 'adaptation' | 'communication' | 'initiative'
}

export interface DetailEvaluationInterface {
 critere: CritereEvaluationInterface
 critereId: string
 note: number
 commentaire: string
}

export interface CompetenceEvalueeInterface {
 nomCompetence: string
 niveauAttendu: 'debutant' | 'intermediaire' | 'avance' | 'expert'
 niveauObserve: 'insuffisant' | 'debutant' | 'intermediaire' | 'avance' | 'expert'
 commentaire: string
 niveauAtteint: boolean
}

export interface RecommandationEmployeurInterface {
 categorie: 'formation' | 'experience' | 'comportement' | 'technique' | 'autre'
 description: string
 priorite: 'faible' | 'moyenne' | 'haute' | 'critique'
}

export interface EvaluationEmployeurInterface {
 id: string
 jeuneNom: string
 entrepriseNom: string
 intitulePoste: string
 periodeType: 'stage' | 'essai' | 'mission' | 'cdd' | 'cdi' | 'formation'
 dateDebut: string
 dateFin: string
 dureeJours: number
 dureeFormattee: string
 noteGlobale: number
 noteGlobalePourcentage: number
 recommandation: 'fortement_recommande' | 'recommande' | 'recommande_avec_reserves' | 'non_recommande'
 pointsForts: string
 axesAmelioration: string
 commentaireLibre: string
 conseilFuturEmployeur: string
 evaluateurNom: string
 evaluateurFonction: string
 dateEvaluation: string
 estValidee: boolean
 estPublique: boolean
 jeuneALu: boolean
 reponseJeune: string
 details: DetailEvaluationInterface[]
 competences: CompetenceEvalueeInterface[]
 recommandations: RecommandationEmployeurInterface[]
 tempsEcoule: string
}

export interface StatistiqueEvaluationInterface {
 nombreEvaluations: number
 noteMoyenne: number
 noteMediane: number
 fortementRecommandeCount: number
 recommandeCount: number
 recommandeReservesCount: number
 nonRecommandeCount: number
 joursExperienceTotale: number
 pourcentageRecommande: number
 experienceFormattee: string
 derniereMaj: string
}

export interface CreerEvaluationInterface {
 jeuneId: string
 candidatureId?: string
 intitulePoste: string
 periodeType: string
 dateDebut: string
 dateFin: string
 noteGlobale: number
 recommandation: string
 pointsForts: string
 axesAmelioration: string
 commentaireLibre: string
 conseilFuturEmployeur: string
 evaluateurNom: string
 evaluateurFonction: string
 estPublique: boolean
 detailsData: Array<{critereId: string, note: number, commentaire: string}>
 competencesData: CompetenceEvalueeInterface[]
 recommandationsData: RecommandationEmployeurInterface[]
}
