export interface StatistiquesGeneralesAdminInterface {
 totalJeunes: number
 jeunesActifsMois: number
 nouveauxJeunesSemaine: number
 totalEntreprises: number
 entreprisesActives: number
 offresActives: number
 candidaturesTotales: number
 candidaturesCeMois: number
 inscriptionsParcours: number
 parcoursTermines: number
 certificatsDelivres: number
 evaluationsDonnees: number
 noteMoyenneGlobale: number
}

export interface EvolutionInscriptionInterface {
 date: string
 jeunes: number
 entreprises: number
}

export interface JeunesParRegionInterface {
 [key: string]: {
   label: string
   count: number
 }
}

export interface ProgressionParcoursInterface {
 A: number
 B: number
 C: number
 D: number
}

export interface JeunesAttentionInterface {
 profilsNonValides: number
 sansCandidature: number
 abandonsParcours: number
 notesFaibles: number
}

export interface DashboardAdminInterface {
 statistiquesGenerales: StatistiquesGeneralesAdminInterface
 inscriptionsEvolution: EvolutionInscriptionInterface[]
 jeunesParRegion: JeunesParRegionInterface
 secteursEntreprises: Record<string, number>
 performance: {
   tauxPlacementGlobal: number
   totalCandidatures: number
   candidaturesAcceptees: number
 }
 progressionParcours: ProgressionParcoursInterface
 jeunesAttention: JeunesAttentionInterface
}

export interface ProfilJeuneValidationInterface {
 id: string
 nom: string
 email: string
 region: string
 dateInscription: string
 pieceIdentite: string | null
}

export interface ProfilEntrepriseValidationInterface {
 id: string
 nomEntreprise: string
 email: string
 secteur: string
 ville: string
 dateInscription: string
}

export interface OffreValidationInterface {
 id: string
 titre: string
 entreprise: string
 typeOffre: string
 region: string
 dateCreation: string
}

export interface EvaluationValidationInterface {
 id: string
 jeune: string
 entreprise: string
 poste: string
 note: number
 dateEvaluation: string
}

export interface ValidationsEnAttenteInterface {
 profilsJeunes: ProfilJeuneValidationInterface[]
 profilsEntreprises: ProfilEntrepriseValidationInterface[]
 offres: OffreValidationInterface[]
 evaluations: EvaluationValidationInterface[]
 resume: {
   totalValidations: number
   profilsJeunesCount: number
   profilsEntreprisesCount: number
   offresCount: number
   evaluationsCount: number
 }
}

export interface RapportActiviteInterface {
 periode: string
 metriquesAdoption: {
   nouveauxJeunes: number
   nouvellesEntreprises: number
   jeunesActifs: number
   entreprisesActives: number
 }
 metriquesEngagement: {
   candidaturesSoumises: number
   candidaturesVues: number
   entretiensProgrammes: number
   embauches Reussies: number
   tauxConversion: number
 }
 metriquesFormation: {
   inscriptionsParcours: number
   parcoursEnCours: number
   parcoursTermines: number
   certificatsDelivres: number
   tauxCompletion: number
 }
 defisIdentifies: {
   profilsNonValides: number
   entreprisesInactives: number
   jeunesSansActivite: number
   tempsReponseLong: number
 }
 recommandations: {
   accelererValidations: boolean
   sensibiliserEntreprises: boolean
   accompagnerJeunes: boolean
   ameliorerReactivite: boolean
 }
}
