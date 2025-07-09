import { 
  OperateurMobileMoneyInterface,
  CompteMobileMoneyInterface,
  TransactionMobileMoneyInterface,
  CreerTransactionInterface,
  StatistiquesMobileMoneyInterface,
  ConfigurationMobileMoneyInterface
} from '@/types/mobile-money'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ServiceMobileMoney {
  private baseURL = `${API_BASE_URL}/mobile-money`

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

  async obtenirOperateurs(): Promise<OperateurMobileMoneyInterface[]> {
    const response = await fetch(`${this.baseURL}/operateurs/`)
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des opérateurs')
    }

    return await response.json()
  }

  async obtenirConfiguration(): Promise<ConfigurationMobileMoneyInterface> {
    const response = await fetch(`${this.baseURL}/configuration/`)
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement de la configuration')
    }

    return await response.json()
  }

  async obtenirMesComptes(): Promise<CompteMobileMoneyInterface[]> {
    const response = await fetch(`${this.baseURL}/comptes/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des comptes')
    }

    return await response.json()
  }

  async ajouterCompte(donnees: {
    operateurId: string
    numeroTelephone: string
    nomTitulaire: string
  }): Promise<CompteMobileMoneyInterface> {
    const response = await fetch(`${this.baseURL}/comptes/`, {
      method: 'POST',
      headers: this.obtenirEntetes(),
      body: JSON.stringify({
        operateur_id: donnees.operateurId,
        numero_telephone: donnees.numeroTelephone,
        nom_titulaire: donnees.nomTitulaire
      })
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.message || 'Erreur lors de l\'ajout du compte')
    }

    return await response.json()
  }

  async supprimerCompte(compteId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/comptes/${compteId}/`, {
      method: 'DELETE',
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du compte')
    }
  }

  async definirComptePrincipal(compteId: string): Promise<CompteMobileMoneyInterface> {
    const response = await fetch(`${this.baseURL}/comptes/${compteId}/principal/`, {
      method: 'POST',
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.error || 'Erreur lors de la définition du compte principal')
    }

    const data = await response.json()
    return data.compte
  }

  async obtenirMesTransactions(filtres?: Record<string, any>): Promise<{
    results: TransactionMobileMoneyInterface[]
    count: number
  }> {
    const params = new URLSearchParams()
    if (filtres) {
      Object.entries(filtres).forEach(([cle, valeur]) => {
        if (valeur !== undefined && valeur !== null && valeur !== '') {
          params.append(cle, valeur.toString())
        }
      })
    }

    const response = await fetch(`${this.baseURL}/transactions/?${params}`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des transactions')
    }

    return await response.json()
  }

  async creerTransaction(donnees: CreerTransactionInterface): Promise<{
    success: boolean
    transactionId?: string
    paymentUrl?: string
    reference?: string
    montantTotal?: number
    message: string
    error?: string
  }> {
    const response = await fetch(`${this.baseURL}/transactions/creer/`, {
      method: 'POST',
      headers: this.obtenirEntetes(),
      body: JSON.stringify({
        compte_id: donnees.compteId,
        type_transaction: donnees.typeTransaction,
        montant: donnees.montant,
        description: donnees.description,
        reference_externe: donnees.referenceExterne,
        metadata: donnees.metadata
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Erreur lors de la création de la transaction')
    }

    return data
  }

  async verifierStatutTransaction(transactionId: string): Promise<{
    success: boolean
    transaction: TransactionMobileMoneyInterface
    verification: any
  }> {
    const response = await fetch(`${this.baseURL}/transactions/${transactionId}/verifier/`, {
      method: 'POST',
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      const erreur = await response.json()
      throw new Error(erreur.error || 'Erreur lors de la vérification')
    }

    return await response.json()
  }

  async obtenirDetailTransaction(transactionId: string): Promise<TransactionMobileMoneyInterface> {
    const response = await fetch(`${this.baseURL}/transactions/${transactionId}/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Transaction non trouvée')
    }

    return await response.json()
  }

  async obtenirStatistiques(): Promise<StatistiquesMobileMoneyInterface> {
    const response = await fetch(`${this.baseURL}/statistiques/`, {
      headers: this.obtenirEntetes()
    })

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des statistiques')
    }

    return await response.json()
  }

  // Méthodes utilitaires
  formaterMontant(montant: number, devise: string = 'GNF'): string {
    return new Intl.NumberFormat('fr-GN', {
      style: 'currency',
      currency: devise,
      minimumFractionDigits: 0
    }).format(montant)
  }

  calculerFrais(montant: number, pourcentage: number): number {
    const frais = (montant * pourcentage) / 100
    return Math.max(100, Math.min(frais, 5000)) // Entre 100 et 5000 GNF
  }
}

export const serviceMobileMoney = new ServiceMobileMoney()
