export interface UtilisateurInterface {
  id: string
  email: string
  nom: string
  prenom: string
  typeUtilisateur: 'jeune' | 'entreprise' | 'conseiller' | 'admin'
  telephone?: string
  dateCreation: string
  dernierConnexion?: string
  estActif: boolean
  estVerifie: boolean
}

export interface ConnexionInterface {
  email: string
  motDePasse: string
}

export interface InscriptionJeuneInterface {
  nom: string
  prenom: string
  email: string
  telephone: string
  motDePasse: string
  confirmationMotDePasse: string
  dateNaissance: string
  lieuNaissance: string
  region: string
  sexe: 'masculin' | 'feminin'
  niveauFormation?: string
  secteurInteret?: string
  pieceIdentite: File | null
  cv?: File | null
  accepteConditions: boolean
}

export interface InscriptionEntrepriseInterface {
  nomEntreprise: string
  emailContact: string
  telephoneContact: string
  secteurActivite: string
  tailleEntreprise: string
  adresse: string
  ville: string
  motDePasse: string
  confirmationMotDePasse: string
  numeroRegistreCommerce?: string
  siteWeb?: string
  description?: string
  accepteConditions: boolean
}

export interface ReponseAuth {
  access: string
  refresh: string
  utilisateur: UtilisateurInterface
  message: string
}
