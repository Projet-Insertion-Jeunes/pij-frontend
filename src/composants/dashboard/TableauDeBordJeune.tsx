'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, TrendingUp, Target, MessageCircle, Phone, MapPin, Bell, ChevronRight, Star, Briefcase, GraduationCap, Award, Quote } from 'lucide-react'

interface RendezVousInterface {
  id: string
  date: string
  heure: string
  conseiller: string
  type: 'evaluation' | 'suivi' | 'orientation'
  statut: 'confirme' | 'en_attente' | 'termine'
  lieu: string
  description: string
}

interface StatistiquesDashboard {
  candidatures: {
    total: number
    enCours: number
    acceptees: number
    refusees: number
  }
  formations: {
    terminees: number
    enCours: number
    planifiees: number
  }
  evaluations: {
    moyenne: number
    total: number
    derniereNote: number
  }
  profil: {
    completude: number
    vues: number
    favoris: number
  }
}

interface NotificationInterface {
  id: string
  type: 'rdv' | 'candidature' | 'formation' | 'evaluation'
  titre: string
  message: string
  date: string
  lu: boolean
}

interface CreneauInterface {
  id: string
  date: string
  heure: string
  disponible: boolean
}

interface ConseillerInterface {
  id: string
  nom: string
  specialite: string
  creneaux: CreneauInterface[]
}

interface TemoignageInterface {
  id: string
  employeur: string
  poste: string
  note: number
  commentaire: string
  date: string
  jeune: string
}

export default function TableauDeBordJeune() {
  const [rendezVous, setRendezVous] = useState<RendezVousInterface[]>([
    {
      id: '1',
      date: '2024-02-15',
      heure: '14:00',
      conseiller: 'Mme Fatoumata CAMARA',
      type: 'evaluation',
      statut: 'confirme',
      lieu: 'Maison des Jeunes de Kindia',
      description: 'Évaluation initiale pour orientation parcours'
    },
    {
      id: '2',
      date: '2024-02-10',
      heure: '10:30',
      conseiller: 'M. Ibrahima DIALLO',
      type: 'suivi',
      statut: 'termine',
      lieu: 'En ligne',
      description: 'Suivi progression formation BTP'
    }
  ])

  const [statistiques, setStatistiques] = useState<StatistiquesDashboard>({
    candidatures: {
      total: 12,
      enCours: 3,
      acceptees: 2,
      refusees: 7
    },
    formations: {
      terminees: 2,
      enCours: 1,
      planifiees: 1
    },
    evaluations: {
      moyenne: 4.2,
      total: 8,
      derniereNote: 4.5
    },
    profil: {
      completude: 78,
      vues: 45,
      favoris: 8
    }
  })

  const [notifications, setNotifications] = useState<NotificationInterface[]>([
    {
      id: '1',
      type: 'rdv',
      titre: 'Nouveau rendez-vous disponible',
      message: 'Votre conseiller vous invite à prendre un rendez-vous pour une évaluation',
      date: '2024-02-08',
      lu: false
    },
    {
      id: '2',
      type: 'candidature',
      titre: 'Candidature acceptée',
      message: 'Votre candidature pour le poste de maçon a été acceptée',
      date: '2024-02-07',
      lu: false
    },
    {
      id: '3',
      type: 'formation',
      titre: 'Formation terminée',
      message: 'Félicitations ! Vous avez terminé la formation BTP avec succès',
      date: '2024-02-06',
      lu: true
    }
  ])

  const [showRendezVousForm, setShowRendezVousForm] = useState(false)
  const [nouveauRdv, setNouveauRdv] = useState({
    date: '',
    heure: '',
    conseiller: '',
    type: 'evaluation' as const,
    lieu: 'Maison des Jeunes de Kindia',
    description: '',
    creneauId: ''
  })
  const [conseillerSelectionne, setConseillerSelectionne] = useState<ConseillerInterface | null>(null)
  const [creneauxDisponibles, setCreneauxDisponibles] = useState<CreneauInterface[]>([])
  const [notificationCount, setNotificationCount] = useState(0)

  const conseillers: ConseillerInterface[] = [
    { 
      id: '1', 
      nom: 'Mme Fatoumata CAMARA', 
      specialite: 'Orientation professionnelle',
      creneaux: [
        { id: '1', date: '2024-02-15', heure: '09:00', disponible: true },
        { id: '2', date: '2024-02-15', heure: '10:30', disponible: true },
        { id: '3', date: '2024-02-15', heure: '14:00', disponible: false },
        { id: '4', date: '2024-02-16', heure: '09:00', disponible: true },
        { id: '5', date: '2024-02-16', heure: '11:00', disponible: true },
        { id: '6', date: '2024-02-19', heure: '08:30', disponible: true },
        { id: '7', date: '2024-02-19', heure: '15:00', disponible: true }
      ]
    },
    { 
      id: '2', 
      nom: 'M. Ibrahima DIALLO', 
      specialite: 'Formation technique',
      creneaux: [
        { id: '8', date: '2024-02-15', heure: '08:00', disponible: true },
        { id: '9', date: '2024-02-15', heure: '13:30', disponible: true },
        { id: '10', date: '2024-02-16', heure: '10:00', disponible: false },
        { id: '11', date: '2024-02-16', heure: '14:30', disponible: true },
        { id: '12', date: '2024-02-17', heure: '09:30', disponible: true },
        { id: '13', date: '2024-02-20', heure: '11:00', disponible: true }
      ]
    },
    { 
      id: '3', 
      nom: 'Mme Aminata SYLLA', 
      specialite: 'Accompagnement social',
      creneaux: [
        { id: '14', date: '2024-02-15', heure: '10:00', disponible: true },
        { id: '15', date: '2024-02-15', heure: '16:00', disponible: true },
        { id: '16', date: '2024-02-16', heure: '08:30', disponible: true },
        { id: '17', date: '2024-02-16', heure: '13:00', disponible: false },
        { id: '18', date: '2024-02-18', heure: '09:00', disponible: true },
        { id: '19', date: '2024-02-19', heure: '14:00', disponible: true }
      ]
    }
  ]

  const temoignages: TemoignageInterface[] = [
    {
      id: '1',
      employeur: 'Entreprise KABA & Fils',
      poste: 'Ouvrier en construction',
      note: 5,
      commentaire: 'Mamadou a fait preuve d\'une grande professionnalisme et d\'une excellente adaptation sur le chantier. Son travail en équipe est remarquable.',
      date: '2024-01-15',
      jeune: 'Mamadou DIALLO'
    },
    {
      id: '2',
      employeur: 'SOTELGUI',
      poste: 'Technicien électricité',
      note: 4,
      commentaire: 'Très bon stagiaire, motivé et appliqué. Il a rapidement assimilé les techniques de base en électricité industrielle.',
      date: '2024-01-08',
      jeune: 'Mamadou DIALLO'
    },
    {
      id: '3',
      employeur: 'Guinée Mines SA',
      poste: 'Aide-mécanicien',
      note: 5,
      commentaire: 'Excellent comportement professionnel. Mamadou respecte les consignes de sécurité et montre une grande volonté d\'apprendre.',
      date: '2023-12-20',
      jeune: 'Mamadou DIALLO'
    }
  ]

  const prochainRendezVous = rendezVous
    .filter(rdv => rdv.statut === 'confirme' && new Date(rdv.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  // Calculer le nombre de notifications non lues
  useEffect(() => {
    const nonLues = notifications.filter(n => !n.lu).length
    setNotificationCount(nonLues)
  }, [notifications])

  // Gérer la sélection d'un conseiller
  const handleConseillerChange = (conseillerId: string) => {
    const conseiller = conseillers.find(c => c.id === conseillerId)
    setConseillerSelectionne(conseiller || null)
    setCreneauxDisponibles(conseiller ? conseiller.creneaux.filter(c => c.disponible) : [])
    setNouveauRdv({
      ...nouveauRdv,
      conseiller: conseiller ? conseiller.nom : '',
      date: '',
      heure: '',
      creneauId: ''
    })
  }

  // Gérer la sélection d'un créneau
  const handleCreneauChange = (creneauId: string) => {
    const creneau = creneauxDisponibles.find(c => c.id === creneauId)
    if (creneau) {
      setNouveauRdv({
        ...nouveauRdv,
        date: creneau.date,
        heure: creneau.heure,
        creneauId: creneauId
      })
    }
  }

  const handlePrendreRendezVous = () => {
    if (nouveauRdv.date && nouveauRdv.heure && nouveauRdv.conseiller && nouveauRdv.creneauId) {
      const rdv: RendezVousInterface = {
        id: Date.now().toString(),
        date: nouveauRdv.date,
        heure: nouveauRdv.heure,
        conseiller: nouveauRdv.conseiller,
        type: nouveauRdv.type,
        statut: 'en_attente',
        lieu: nouveauRdv.lieu,
        description: nouveauRdv.description
      }
      
      setRendezVous([...rendezVous, rdv])
      
      // Marquer le créneau comme non disponible
      if (conseillerSelectionne) {
        const conseillerIndex = conseillers.findIndex(c => c.id === conseillerSelectionne.id)
        if (conseillerIndex !== -1) {
          const creneauIndex = conseillers[conseillerIndex].creneaux.findIndex(c => c.id === nouveauRdv.creneauId)
          if (creneauIndex !== -1) {
            conseillers[conseillerIndex].creneaux[creneauIndex].disponible = false
          }
        }
      }
      
      setShowRendezVousForm(false)
      setNouveauRdv({
        date: '',
        heure: '',
        conseiller: '',
        type: 'evaluation',
        lieu: 'Maison des Jeunes de Kindia',
        description: '',
        creneauId: ''
      })
      setConseillerSelectionne(null)
      setCreneauxDisponibles([])
      
      // Ajouter une notification de confirmation
      const notification: NotificationInterface = {
        id: Date.now().toString(),
        type: 'rdv',
        titre: 'Rendez-vous demandé',
        message: 'Votre demande de rendez-vous a été envoyée. Vous recevrez une confirmation.',
        date: new Date().toISOString().split('T')[0],
        lu: false
      }
      setNotifications([notification, ...notifications])
    }
  }

  const marquerCommeLu = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, lu: true } : notif
    ))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'evaluation':
        return <Star className="h-4 w-4 text-guinea-yellow" />
      case 'suivi':
        return <TrendingUp className="h-4 w-4 text-guinea-green" />
      case 'orientation':
        return <Target className="h-4 w-4 text-guinea-red" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'confirme':
        return 'bg-green-100 text-green-800'
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'termine':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="dashboard-jeune">
      {/* En-tête avec statistiques rapides */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-title">
            <span className="icon">📊</span>
            Tableau de Bord
          </h1>
          <p className="dashboard-subtitle">
            Bienvenue Mamadou ! Voici un aperçu de votre parcours professionnel
          </p>
        </div>
        
        <div className="stats-quick-view">
          <div className="stat-quick">
            <div className="stat-number">{statistiques.candidatures.total}</div>
            <div className="stat-label">Candidatures</div>
          </div>
          <div className="stat-quick">
            <div className="stat-number">{statistiques.formations.terminees}</div>
            <div className="stat-label">Formations terminées</div>
          </div>
          <div className="stat-quick">
            <div className="stat-number">{statistiques.evaluations.moyenne}</div>
            <div className="stat-label">Note moyenne</div>
          </div>
          <div className="stat-quick">
            <div className="stat-number">{statistiques.profil.completude}%</div>
            <div className="stat-label">Profil complété</div>
          </div>
        </div>
        
        {/* Cloche de notification */}
        <div className="notification-bell">
          <Bell className="h-6 w-6 text-guinea-red" />
          {notificationCount > 0 && (
            <div className="notification-badge-header">
              {notificationCount}
            </div>
          )}
        </div>
      </div>

      {/* Grille principale */}
      <div className="dashboard-grid">
        {/* Bloc principal - Prochain rendez-vous */}
        <div className="dashboard-card main-card">
          <div className="card-header">
            <h2 className="card-title">
              <Calendar className="h-5 w-5 text-guinea-red" />
              Prochain Rendez-vous
            </h2>
            <button
              onClick={() => setShowRendezVousForm(true)}
              className="btn btn-primary"
            >
              <Calendar className="h-4 w-4" />
              Prendre RDV
            </button>
          </div>
          
          {prochainRendezVous ? (
            <div className="rdv-card">
              <div className="rdv-header">
                <div className="rdv-date">
                  <div className="date-large">
                    {new Date(prochainRendezVous.date).getDate()}
                  </div>
                  <div className="date-month">
                    {new Date(prochainRendezVous.date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                </div>
                <div className="rdv-info">
                  <div className="rdv-time">
                    <Clock className="h-4 w-4" />
                    {prochainRendezVous.heure}
                  </div>
                  <div className="rdv-conseiller">
                    <User className="h-4 w-4" />
                    {prochainRendezVous.conseiller}
                  </div>
                  <div className="rdv-lieu">
                    <MapPin className="h-4 w-4" />
                    {prochainRendezVous.lieu}
                  </div>
                </div>
              </div>
              
              <div className="rdv-details">
                <div className="rdv-type">
                  {getTypeIcon(prochainRendezVous.type)}
                  <span className="capitalize">{prochainRendezVous.type}</span>
                </div>
                <p className="rdv-description">{prochainRendezVous.description}</p>
              </div>
              
              <div className="rdv-actions">
                <button className="btn btn-success">
                  <Phone className="h-4 w-4" />
                  Appeler
                </button>
                <button className="btn btn-outline">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-gray-600 mb-2">Aucun rendez-vous planifié</h3>
              <p className="text-gray-500 mb-4">
                Prenez rendez-vous avec un conseiller pour votre évaluation
              </p>
              <button
                onClick={() => setShowRendezVousForm(true)}
                className="btn btn-primary"
              >
                Prendre un rendez-vous
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <Bell className="h-5 w-5 text-guinea-red" />
              Notifications
            </h2>
            <span className="notification-count">
              {notifications.filter(n => !n.lu).length}
            </span>
          </div>
          
          <div className="notifications-list">
            {notifications.slice(0, 4).map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.lu ? 'unread' : ''}`}
                onClick={() => marquerCommeLu(notification.id)}
              >
                <div className="notification-icon">
                  {notification.type === 'rdv' && <Calendar className="h-4 w-4" />}
                  {notification.type === 'candidature' && <Briefcase className="h-4 w-4" />}
                  {notification.type === 'formation' && <GraduationCap className="h-4 w-4" />}
                  {notification.type === 'evaluation' && <Star className="h-4 w-4" />}
                </div>
                <div className="notification-content">
                  <h4 className="notification-title">{notification.titre}</h4>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-date">{notification.date}</span>
                </div>
                {!notification.lu && <div className="notification-badge"></div>}
              </div>
            ))}
          </div>
          
          <div className="card-footer">
            <button className="btn btn-outline w-full">
              Voir toutes les notifications
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Statistiques Candidatures */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <Briefcase className="h-5 w-5 text-guinea-red" />
              Mes Candidatures
            </h2>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{statistiques.candidatures.total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-value text-blue-600">{statistiques.candidatures.enCours}</div>
              <div className="stat-label">En cours</div>
            </div>
            <div className="stat-item">
              <div className="stat-value text-green-600">{statistiques.candidatures.acceptees}</div>
              <div className="stat-label">Acceptées</div>
            </div>
            <div className="stat-item">
              <div className="stat-value text-red-600">{statistiques.candidatures.refusees}</div>
              <div className="stat-label">Refusées</div>
            </div>
          </div>
          
          <div className="progress-bar">
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${(statistiques.candidatures.acceptees / statistiques.candidatures.total) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Taux de réussite : {Math.round((statistiques.candidatures.acceptees / statistiques.candidatures.total) * 100)}%
            </div>
          </div>
        </div>

        {/* Mes Formations */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <GraduationCap className="h-5 w-5 text-guinea-red" />
              Mes Formations
            </h2>
          </div>
          
          <div className="formations-progress">
            <div className="formation-item">
              <div className="formation-info">
                <h4>Formations terminées</h4>
                <span className="formation-count">{statistiques.formations.terminees}</span>
              </div>
              <div className="formation-badge completed">Terminées</div>
            </div>
            
            <div className="formation-item">
              <div className="formation-info">
                <h4>Formation en cours</h4>
                <span className="formation-count">{statistiques.formations.enCours}</span>
              </div>
              <div className="formation-badge in-progress">En cours</div>
            </div>
            
            <div className="formation-item">
              <div className="formation-info">
                <h4>Formations planifiées</h4>
                <span className="formation-count">{statistiques.formations.planifiees}</span>
              </div>
              <div className="formation-badge planned">Planifiées</div>
            </div>
          </div>
        </div>

        {/* Mes Évaluations */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <Star className="h-5 w-5 text-guinea-red" />
              Mes Évaluations
            </h2>
          </div>
          
          <div className="evaluation-summary">
            <div className="evaluation-main">
              <div className="evaluation-score">
                <div className="score-circle">
                  <div className="score-number">{statistiques.evaluations.moyenne}</div>
                  <div className="score-max">/5</div>
                </div>
              </div>
              <div className="evaluation-info">
                <h4>Note moyenne</h4>
                <p>{statistiques.evaluations.total} évaluations</p>
              </div>
            </div>
            
            <div className="evaluation-details">
              <div className="evaluation-item">
                <span>Dernière évaluation</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < statistiques.evaluations.derniereNote
                          ? 'text-guinea-yellow fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Témoignages d'Employeurs */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <Quote className="h-5 w-5 text-guinea-red" />
              Témoignages d'Employeurs
            </h2>
          </div>
          
          <div className="temoignages-list">
            {temoignages.slice(0, 2).map((temoignage) => (
              <div key={temoignage.id} className="temoignage-card">
                <div className="temoignage-header">
                  <div className="temoignage-info">
                    <h4 className="temoignage-employeur">{temoignage.employeur}</h4>
                    <p className="temoignage-poste">{temoignage.poste}</p>
                  </div>
                  <div className="temoignage-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < temoignage.note
                              ? 'text-guinea-yellow fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="temoignage-comment">"{temoignage.commentaire}"</p>
                <div className="temoignage-date">
                  {new Date(temoignage.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-footer">
            <button className="btn btn-outline w-full">
              Voir tous les témoignages
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de prise de rendez-vous */}
      {showRendezVousForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Prendre un rendez-vous</h3>
              <button
                onClick={() => setShowRendezVousForm(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Type de rendez-vous</label>
                <select
                  value={nouveauRdv.type}
                  onChange={(e) => setNouveauRdv({...nouveauRdv, type: e.target.value as any})}
                  className="form-control"
                >
                  <option value="evaluation">Évaluation initiale</option>
                  <option value="suivi">Suivi de parcours</option>
                  <option value="orientation">Orientation professionnelle</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Conseiller</label>
                <select
                  value={conseillerSelectionne?.id || ''}
                  onChange={(e) => handleConseillerChange(e.target.value)}
                  className="form-control"
                >
                  <option value="">Sélectionner un conseiller</option>
                  {conseillers.map((conseiller) => (
                    <option key={conseiller.id} value={conseiller.id}>
                      {conseiller.nom} - {conseiller.specialite}
                    </option>
                  ))}
                </select>
              </div>
              
              {conseillerSelectionne && (
                <div className="form-group">
                  <label>Créneaux disponibles</label>
                  <div className="creneaux-grid">
                    {creneauxDisponibles.length > 0 ? (
                      creneauxDisponibles.map((creneau) => (
                        <div
                          key={creneau.id}
                          className={`creneau-item ${
                            nouveauRdv.creneauId === creneau.id ? 'selected' : ''
                          }`}
                          onClick={() => handleCreneauChange(creneau.id)}
                        >
                          <div className="creneau-date">
                            {new Date(creneau.date).toLocaleDateString('fr-FR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="creneau-heure">{creneau.heure}</div>
                        </div>
                      ))
                    ) : (
                      <p className="no-creneaux">Aucun créneau disponible pour ce conseiller</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <label>Lieu</label>
                <select
                  value={nouveauRdv.lieu}
                  onChange={(e) => setNouveauRdv({...nouveauRdv, lieu: e.target.value})}
                  className="form-control"
                >
                  <option value="Maison des Jeunes de Kindia">Maison des Jeunes de Kindia</option>
                  <option value="Mairie Pilote de Kindia">Mairie Pilote de Kindia</option>
                  <option value="Centre de Formation Simandou">Centre de Formation Simandou</option>
                  <option value="En ligne">En ligne (visioconférence)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Message (optionnel)</label>
                <textarea
                  value={nouveauRdv.description}
                  onChange={(e) => setNouveauRdv({...nouveauRdv, description: e.target.value})}
                  className="form-control"
                  rows={3}
                  placeholder="Précisez le motif de votre rendez-vous..."
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                onClick={() => setShowRendezVousForm(false)}
                className="btn btn-outline"
              >
                Annuler
              </button>
              <button
                onClick={handlePrendreRendezVous}
                className="btn btn-primary"
              >
                Confirmer le rendez-vous
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 