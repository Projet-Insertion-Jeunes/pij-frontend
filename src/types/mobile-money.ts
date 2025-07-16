export interface OperateurMobileMoneyInterface {
  id: string
  nom: string
  code: string
  logo?: string
  couleurPrincipale: string
  fraisPourcentage: number
  montantMinimum: number
  montantMaximum: number
}

export interface CompteMobileMoneyInterface {
  id: string
  operateur: OperateurMobileMoneyInterface
  numeroTelephone: string
  nomTitulaire: string
  statut: 'en_attente' | 'verifie' | 'suspendu' | 'ferme'
  estPrincipal: boolean
  dateCreation: string
}

export interface TransactionMobileMoneyInterface {
  id: string
  compte: CompteMobileMoneyInterface
  utilisateurNom: string
  typeTransaction: 'paiement_commission' | 'paiement_formation' | 'paiement_service' | 'remboursement' | 'bonus'
  typeTransactionDisplay: string
  direction: 'entrant' | 'sortant'
  directionDisplay: string
  montant: number
  frais: number
  montantTotal: number
  devise: string
  referenceInterne: string
  referenceOperateur?: string
  statut: 'en_attente' | 'en_cours' | 'reussie' | 'echouee' | 'annulee' | 'remboursee'
  statutDisplay: string
  messageStatut?: string
  description: string
  dateCreation: string
  dateCompletion?: string
  tempsEcoule: string
}

export interface CreerTransactionInterface {
  compteId: string
  typeTransaction: string
  montant: number
  description: string
  referenceExterne?: string
  metadata?: Record<string, any>
}

export interface StatistiquesMobileMoneyInterface {
  totalTransactions: number
  totalDepense: number
  totalRecu: number
  transactionsReussies: number
  transactionsEnCours: number
  transactionsEchouees: number
  fraisTotal: number
  transactionMoyenne: number
  operateurPrefere?: string
  derniereTransaction?: string
}

export interface ConfigurationMobileMoneyInterface {
  modeMaintenance: boolean
  messageMaintenance?: string
  limites: {
    quotidienne: number
    mensuelle: number
  }
  operateursDisponibles: OperateurMobileMoneyInterface[]
}
