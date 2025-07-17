'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, Clock, Eye, MessageCircle, Phone, MapPin, Building, ChevronRight, TrendingUp, CheckCircle, XCircle, AlertCircle, Briefcase } from 'lucide-react'

interface CandidatureInterface {
  id: string
  poste: string
  entreprise: string
  lieu: string
  datePostulation: string
  statut: 'en_attente' | 'vue' | 'entretien' | 'acceptee' | 'refusee'
  typeContrat: string
  salaire?: string
  description: string
  responsableRH: string
  contactRH: string
  dateReponse?: string
  prochainRdv?: {
    date: string
    heure: string
    lieu: string
  }
  feedback?: string
}

interface StatistiquesCandidatures {
  total: number
  enAttente: number
  vues: number
  entretiens: number
  acceptees: number
  refusees: number
  tauxReussite: number
  tempsReponse: number
}

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState<CandidatureInterface[]>([
    {
      id: '1',
      poste: 'Ouvrier en construction',
      entreprise: 'Entreprise KABA & Fils',
      lieu: 'Kindia, Guinée',
      datePostulation: '2024-02-08',
      statut: 'entretien',
      typeContrat: 'CDI',
      salaire: '1,200,000 GNF/mois',
      description: 'Recherche d\'un ouvrier qualifié pour travaux de construction résidentielle et commerciale.',
      responsableRH: 'Mme Fatoumata KABA',
      contactRH: '+224 628 45 67 89',
      dateReponse: '2024-02-10',
      prochainRdv: {
        date: '2024-02-15',
        heure: '10:00',
        lieu: 'Siège social KABA & Fils'
      }
    },
    {
      id: '2',
      poste: 'Technicien en électricité',
      entreprise: 'SOTELGUI',
      lieu: 'Conakry, Guinée',
      datePostulation: '2024-02-06',
      statut: 'acceptee',
      typeContrat: 'Stage',
      salaire: '500,000 GNF/mois',
      description: 'Stage de 6 mois en électricité industrielle avec possibilité d\'embauche.',
      responsableRH: 'M. Ibrahima DIALLO',
      contactRH: '+224 628 12 34 56',
      dateReponse: '2024-02-12',
      feedback: 'Candidature retenue. Excellent profil technique et motivation remarquable.'
    },
    {
      id: '3',
      poste: 'Aide-mécanicien',
      entreprise: 'Guinée Mines SA',
      lieu: 'Boké, Guinée',
      datePostulation: '2024-02-05',
      statut: 'vue',
      typeContrat: 'CDD',
      salaire: '800,000 GNF/mois',
      description: 'Poste d\'aide-mécanicien pour maintenance d\'équipements miniers.',
      responsableRH: 'Mme Aminata SYLLA',
      contactRH: '+224 628 98 76 54',
      dateReponse: '2024-02-07'
    },
    {
      id: '4',
      poste: 'Maçon',
      entreprise: 'BTP Guinée',
      lieu: 'Labé, Guinée',
      datePostulation: '2024-02-03',
      statut: 'refusee',
      typeContrat: 'CDI',
      salaire: '1,000,000 GNF/mois',
      description: 'Recherche maçon expérimenté pour projets de construction.',
      responsableRH: 'M. Ousmane BARRY',
      contactRH: '+224 628 11 22 33',
      dateReponse: '2024-02-09',
      feedback: 'Profil intéressant mais manque d\'expérience pour ce poste.'
    },
    {
      id: '5',
      poste: 'Soudeur',
      entreprise: 'Métallurgie Guinée',
      lieu: 'Kindia, Guinée',
      datePostulation: '2024-02-01',
      statut: 'en_attente',
      typeContrat: 'CDI',
      salaire: '1,500,000 GNF/mois',
      description: 'Poste de soudeur qualifié pour travaux métallurgiques.',
      responsableRH: 'M. Mamadou CAMARA',
      contactRH: '+224 628 55 66 77'
    }
  ])

  const [statistiques, setStatistiques] = useState<StatistiquesCandidatures>({
    total: 5,
    enAttente: 1,
    vues: 1,
    entretiens: 1,
    acceptees: 1,
    refusees: 1,
    tauxReussite: 20,
    tempsReponse: 3
  })

  const [filtreStatut, setFiltreStatut] = useState<string>('tous')
  const [recherche, setRecherche] = useState('')
  const [afficherFiltres, setAfficherFiltres] = useState(false)
  const [candidatureSelectionnee, setCandidatureSelectionnee] = useState<CandidatureInterface | null>(null)

  const candidaturesFiltrees = candidatures.filter(candidature => {
    const matchRecherche = candidature.poste.toLowerCase().includes(recherche.toLowerCase()) ||
                          candidature.entreprise.toLowerCase().includes(recherche.toLowerCase())
    const matchStatut = filtreStatut === 'tous' || candidature.statut === filtreStatut
    return matchRecherche && matchStatut
  })

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'vue':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'entretien':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'acceptee':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'refusee':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return <Clock className="h-4 w-4" />
      case 'vue':
        return <Eye className="h-4 w-4" />
      case 'entretien':
        return <Calendar className="h-4 w-4" />
      case 'acceptee':
        return <CheckCircle className="h-4 w-4" />
      case 'refusee':
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatutTexte = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'En attente'
      case 'vue':
        return 'Vue'
      case 'entretien':
        return 'Entretien'
      case 'acceptee':
        return 'Acceptée'
      case 'refusee':
        return 'Refusée'
      default:
        return 'Inconnu'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateCourt = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="candidatures-container">
      {/* En-tête */}
      <div className="candidatures-header">
        <div className="header-content">
          <h1 className="candidatures-title">
            <Briefcase className="h-8 w-8 text-guinea-red" />
            Mes Candidatures
          </h1>
          <p className="candidatures-subtitle">
            Suivez l'évolution de vos candidatures et gérez vos postulations
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{statistiques.total}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock className="h-6 w-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{statistiques.enAttente}</div>
            <div className="stat-label">En attente</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon interview">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{statistiques.entretiens}</div>
            <div className="stat-label">Entretiens</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon accepted">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{statistiques.acceptees}</div>
            <div className="stat-label">Acceptées</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success-rate">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{statistiques.tauxReussite}%</div>
            <div className="stat-label">Taux de réussite</div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="search-filter-bar">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par poste ou entreprise..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <select
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
            className="filter-select"
          >
            <option value="tous">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="vue">Vues</option>
            <option value="entretien">Entretiens</option>
            <option value="acceptee">Acceptées</option>
            <option value="refusee">Refusées</option>
          </select>

          <button
            onClick={() => setAfficherFiltres(!afficherFiltres)}
            className="filter-button"
          >
            <Filter className="h-5 w-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="candidatures-grid">
        {candidaturesFiltrees.map((candidature) => (
          <div key={candidature.id} className="candidature-card">
            {/* En-tête de la carte */}
            <div className="card-header">
              <div className="card-title-section">
                <h3 className="card-title">{candidature.poste}</h3>
                <div className="card-company">
                  <Building className="h-4 w-4" />
                  {candidature.entreprise}
                </div>
              </div>
              <div className={`statut-badge ${getStatutColor(candidature.statut)}`}>
                {getStatutIcon(candidature.statut)}
                {getStatutTexte(candidature.statut)}
              </div>
            </div>

            {/* Détails de la candidature */}
            <div className="card-details">
              <div className="detail-item">
                <MapPin className="h-4 w-4" />
                <span>{candidature.lieu}</span>
              </div>
              <div className="detail-item">
                <Calendar className="h-4 w-4" />
                <span>Postulé le {formatDate(candidature.datePostulation)}</span>
              </div>
              {candidature.salaire && (
                <div className="detail-item">
                  <span className="salary-badge">{candidature.salaire}</span>
                </div>
              )}
            </div>

            {/* Informations spéciales selon le statut */}
            {candidature.statut === 'entretien' && candidature.prochainRdv && (
              <div className="rdv-info">
                <div className="rdv-header">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="rdv-title">Prochain entretien</span>
                </div>
                <div className="rdv-details">
                  <div className="rdv-date">
                    {formatDate(candidature.prochainRdv.date)} à {candidature.prochainRdv.heure}
                  </div>
                  <div className="rdv-lieu">{candidature.prochainRdv.lieu}</div>
                </div>
              </div>
            )}

            {candidature.feedback && (
              <div className="feedback-section">
                <p className="feedback-text">"{candidature.feedback}"</p>
              </div>
            )}

            {/* Actions */}
            <div className="card-actions">
              <button
                onClick={() => setCandidatureSelectionnee(candidature)}
                className="action-btn primary"
              >
                <Eye className="h-4 w-4" />
                Détails
              </button>
              
              {candidature.statut === 'entretien' && (
                <button className="action-btn success">
                  <Phone className="h-4 w-4" />
                  Contacter RH
                </button>
              )}
              
              {candidature.statut === 'acceptee' && (
                <button className="action-btn success">
                  <CheckCircle className="h-4 w-4" />
                  Voir contrat
                </button>
              )}
              
              <button className="action-btn outline">
                <MessageCircle className="h-4 w-4" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {candidaturesFiltrees.length === 0 && (
        <div className="empty-state">
          <Briefcase className="empty-icon" />
          <h3 className="empty-title">Aucune candidature trouvée</h3>
          <p className="empty-description">
            {recherche || filtreStatut !== 'tous' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Vous n\'avez pas encore de candidatures. Commencez par explorer les offres d\'emploi.'
            }
          </p>
          <button className="empty-action">
            Découvrir les offres
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Modal détails candidature */}
      {candidatureSelectionnee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Détails de la candidature</h3>
              <button
                onClick={() => setCandidatureSelectionnee(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h4 className="section-title">Informations générales</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Poste</label>
                    <span>{candidatureSelectionnee.poste}</span>
                  </div>
                  <div className="info-item">
                    <label>Entreprise</label>
                    <span>{candidatureSelectionnee.entreprise}</span>
                  </div>
                  <div className="info-item">
                    <label>Lieu</label>
                    <span>{candidatureSelectionnee.lieu}</span>
                  </div>
                  <div className="info-item">
                    <label>Type de contrat</label>
                    <span>{candidatureSelectionnee.typeContrat}</span>
                  </div>
                  {candidatureSelectionnee.salaire && (
                    <div className="info-item">
                      <label>Salaire</label>
                      <span>{candidatureSelectionnee.salaire}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <label>Date de postulation</label>
                    <span>{formatDate(candidatureSelectionnee.datePostulation)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h4 className="section-title">Description du poste</h4>
                <p className="description-text">{candidatureSelectionnee.description}</p>
              </div>

              <div className="modal-section">
                <h4 className="section-title">Contact RH</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-label">Responsable :</span>
                    <span>{candidatureSelectionnee.responsableRH}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Téléphone :</span>
                    <span>{candidatureSelectionnee.contactRH}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                onClick={() => setCandidatureSelectionnee(null)}
                className="btn btn-outline"
              >
                Fermer
              </button>
              <button className="btn btn-primary">
                <Phone className="h-4 w-4" />
                Contacter RH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 