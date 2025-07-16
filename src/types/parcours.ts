export interface TypeParcoursInterface {
  typeParcours: 'A' | 'B' | 'C' | 'D'
  nom: string
  description: string
  dureeMinimale: number
  dureeMaximale: number
  dureeFormattee: string
  objectifs: string
  competencesCibles: string
  estObligatoire: boolean
  nombreModules: number
  modules?: ParcoursModuleInterface[]
}

export interface ModuleFormationInterface {
  id: string
  nom: string
  description: string
  categorie: 'technique' | 'savoir_etre' | 'civique' | 'numerique' | 'entrepreneuriat' | 'langue'
  niveau: 'debutant' | 'intermediaire' | 'avance'
  objectifsApprentissage: string
  dureeHeures: number
  dureeHeuresFormattee: string
  formatCours: 'presentiel' | 'distanciel' | 'hybride' | 'autonome'
  estCertifiant: boolean
  certificatDelivre: string
}

export interface ParcoursModuleInterface {
  ordre: number
  estObligatoire: boolean
  module: ModuleFormationInterface
}

export interface InscriptionParcoursInterface {
  id: string
  typeParcours: TypeParcoursInterface
  dateInscription: string
  dateDebut?: string
  dateFinPrevue?: string
  dateFinReelle?: string
  statut: 'en_attente' | 'accepte' | 'en_cours' | 'suspendu' | 'termine' | 'abandonne' | 'echec'
  statutDisplay: string
  progressionPourcentage: number
  noteFinale?: number
  commentaireFinal?: string
  certificatObtenu: boolean
  numeroCertificat?: string
  progressionsModules: ProgressionModuleInterface[]
  tempsEcoule: string
}

export interface ProgressionModuleInterface {
  id: string
  module: ModuleFormationInterface
  statut: 'non_commence' | 'en_cours' | 'termine' | 'valide' | 'echec'
  progressionPourcentage: number
  dateDebut?: string
  dateFin?: string
  tempsPasseMinutes: number
  tempsPasseFormate: string
  noteObtenue?: number
  commentaireFormateur?: string
  nombreTentatives: number
  estReussi: boolean
}

export interface StatistiquesParcoursInterface {
  totalParcours: number
  parcoursTermines: number
  parcoursEnCours: number
  certificatsObtenus: number
  progressionMoyenne: number
  tempsCompletionMoyen: number
  modulesTotal: number
  modulesTermines: number
}
