export interface ProfilJeuneInterface {
  id: string
  utilisateur: {
    id: string
    email: string
    nom: string
    prenom: string
    telephone: string
  }
  dateNaissance: string
  lieuNaissance: string
  sexe: 'masculin' | 'feminin'
  region: string
  niveauFormation: string
  secteurInteret: string
  pieceIdentite: string
  cv?: string
  estValide: boolean
  dateValidation?: string
}

export interface ParcoursInterface {
  id: string
  type: 'A' | 'B' | 'C' | 'D'
  nom: string
  description: string
  duree: string
  statut: 'en_attente' | 'en_cours' | 'termine' | 'abandonne'
  dateDebut?: string
  dateFin?: string
  progression: number
  noteFinale?: number
}

export interface FormationInterface {
  id: string
  titre: string
  description: string
  duree: string
  lieu: string
  dateDebut: string
  dateFin: string
  statut: 'inscrit' | 'en_cours' | 'termine' | 'annule'
  note?: number
  certificat?: string
}

export interface EvaluationEmployeurInterface {
  id: string
  entreprise: string
  poste: string
  dateMission: string
  qualiteTravail: number
  ponctualite: number
  comportementProfessionnel: number
  motivation: number
  commentaire: string
  recommande: boolean
}

export interface CandidatureInterface {
  id: string
  offre: {
    id: string
    titre: string
    entreprise: string
    type: 'emploi' | 'stage' | 'formation'
    lieu: string
  }
  dateCandidature: string
  statut: 'soumise' | 'vue' | 'presente' | 'acceptee' | 'refusee'
  messageMotivation: string
}

export interface StatistiquesJeuneInterface {
  nombreCandidatures: number
  nombreEntretiens: number
  tauxReussite: number
  scoreGlobal: number
  nombreFormations: number
  nombreCertifications: number
}
