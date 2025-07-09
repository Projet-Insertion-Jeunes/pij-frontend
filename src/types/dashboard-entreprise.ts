export interface StatistiquesEntrepriseInterface {
  offresActives: number
  totalCandidatures: number
  candidaturesCeMois: number
  candidaturesCetteSemaine: number
  candidaturesNonVues: number
  entretiensProgrammes: number
  evaluationsDonnees: number
}

export interface EvolutionCandidatureInterface {
  date: string
  candidatures: number
}

export interface CandidaturesParStatutInterface {
  [key: string]: {
    label: string
    count: number
  }
}

export interface OffrePopulaireInterface {
  id: string
  titre: string
  candidatures: number
  dateCreation: string
  estActive: boolean
}

export interface PerformanceRecrutementInterface {
  tauxConversion: number
  tempsMoyenReponse: number
  totalCandidatures: number
  candidaturesAcceptees: number
}

export interface EvaluationRecenteInterface {
  id: string
  jeuneNom: string
  poste: string
  note: number
  date: string
}

export interface DashboardEntrepriseInterface {
  statistiquesGenerales: StatistiquesEntrepriseInterface
  candidaturesEvolution: EvolutionCandidatureInterface[]
  candidaturesParStatut: CandidaturesParStatutInterface
  offresPopulaires: OffrePopulaireInterface[]
  candidaturesRecentes: any[] // CandidatureInterface from candidatures types
  performance: PerformanceRecrutementInterface
  evaluationsRecentes: EvaluationRecenteInterface[]
}

export interface CandidaturesATraiterInterface {
  nonVues: any[]
  sansReponse: any[]
  entretiensAProgrammer: any[]
  resume: {
    totalATraiter: number
    nonVuesCount: number
    sansReponseCount: number
    entretiensCount: number
  }
}

export interface RapportRecrutementInterface {
  periode: string
  metriquesPrincipales: {
    totalCandidatures: number
    candidaturesVues: number
    candidaturesPreselectionne: number
    candidaturesEntretien: number
    candidaturesAcceptees: number
    candidaturesRefusees: number
  }
  tauxConversion: {
    tauxOuverture: number
    tauxPreselection: number
    tauxEntretien: number
    tauxEmbauche: number
  }
  sourcesCandidatures: Record<string, {label: string, count: number, pourcentage: number}>
  profilsCandidats: {
    parRegion: Record<string, {label: string, count: number}>
    parNiveauEtude: Record<string, {label: string, count: number}>
    parExperience: Record<string, {label: string, count: number}>
  }
  tempsReponseMoyen: number
  recommandations: {
    ameliorerTauxOuverture: boolean
    accelererReponses: boolean
    diversifierSources: boolean
  }
}
