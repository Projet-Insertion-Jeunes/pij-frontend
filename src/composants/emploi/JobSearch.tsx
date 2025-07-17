'use client'

import { useState, useRef } from 'react'

interface JobOffer {
  id: string
  title: string
  company: string
  location: string
  region: string
  sector: string
  contractType: 'CDI' | 'CDD' | 'Stage' | 'Freelance'
  salary?: string
  description: string
  requirements: string[]
  postedDate: string
  deadline: string
  isUrgent: boolean
  isFeatured: boolean
  logo?: string
  tags: string[]
  // Détails étendus pour la modal
  fullDescription?: string
  benefits?: string[]
  workSchedule?: string
  experienceRequired?: string
  educationRequired?: string
  applicationProcess?: string[]
  companyInfo?: {
    description: string
    size: string
    website?: string
    founded?: string
  }
  contact?: {
    name: string
    email: string
    phone?: string
  }
}

interface JobFilters {
  search: string
  sector: string
  region: string
  contractType: string
  salaryRange: string
  experienceLevel: string
}

export default function JobSearch() {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    sector: '',
    region: '',
    contractType: '',
    salaryRange: '',
    experienceLevel: ''
  })

  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Données d'exemple d'offres d'emploi
  const [jobOffers] = useState<JobOffer[]>([
    {
      id: '1',
      title: 'Ouvrier Spécialisé en Construction',
      company: 'Simandou Infrastructure SARL',
      location: 'Beyla',
      region: 'Nzérékoré',
      sector: 'BTP & Construction',
      contractType: 'CDI',
      salary: '800 000 - 1 200 000 GNF',
      description: 'Nous recherchons un ouvrier spécialisé pour participer à la construction d\'infrastructures dans le cadre du projet Simandou 2040.',
      requirements: ['Expérience en maçonnerie', 'Formation en BTP', 'Capacité de travail en équipe'],
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      isUrgent: true,
      isFeatured: true,
      tags: ['Simandou 2040', 'Construction', 'Infrastructure'],
      fullDescription: 'Nous recherchons un ouvrier spécialisé expérimenté pour rejoindre notre équipe de construction dans le cadre du prestigieux projet Simandou 2040. Ce poste offre une opportunité unique de participer à la construction d\'infrastructures modernes qui transformeront la région de Nzérékoré. Vous travaillerez sur des projets variés incluant la construction de bâtiments résidentiels, d\'installations communautaires et d\'infrastructures de soutien.',
      benefits: ['Assurance santé complète', 'Transport fourni', 'Repas sur site', 'Formation continue', 'Prime de performance', 'Congés payés'],
      workSchedule: 'Lundi au Vendredi, 7h30-16h30 avec pause déjeuner',
      experienceRequired: 'Minimum 2 ans d\'expérience en construction',
      educationRequired: 'Certificat de formation en BTP ou équivalent',
      applicationProcess: ['Envoi du CV et lettre de motivation', 'Entretien téléphonique', 'Test pratique sur site', 'Entretien final avec le chef de projet'],
      companyInfo: {
        description: 'Simandou Infrastructure SARL est une entreprise leader dans la construction d\'infrastructures en Guinée, spécialisée dans les projets de développement communautaire.',
        size: '150-200 employés',
        website: 'www.simandou-infra.gn',
        founded: '2020'
      },
      contact: {
        name: 'Amadou BARRY',
        email: 'recrutement@simandou-infra.gn',
        phone: '+224 628 XX XX XX'
      }
    },
    {
      id: '2',
      title: 'Technicien Maintenance Industrielle',
      company: 'Rio Tinto Simandou',
      location: 'Simandou',
      region: 'Nzérékoré',
      sector: 'Maintenance industrielle',
      contractType: 'CDI',
      salary: '1 500 000 - 2 000 000 GNF',
      description: 'Poste de technicien maintenance pour équipements industriels lourds sur le site minier de Simandou.',
      requirements: ['Formation technique', 'Expérience maintenance', 'Connaissance équipements miniers'],
      postedDate: '2024-01-10',
      deadline: '2024-02-28',
      isUrgent: false,
      isFeatured: true,
      tags: ['Rio Tinto', 'Maintenance', 'Minier'],
      fullDescription: 'Rejoignez l\'équipe de maintenance de Rio Tinto Simandou en tant que technicien spécialisé dans la maintenance d\'équipements industriels lourds. Ce poste stratégique vous permettra de travailler avec des technologies de pointe dans l\'industrie minière tout en contribuant à un projet d\'envergure mondiale.',
      benefits: ['Salaire compétitif', 'Assurance vie et santé', 'Formation technique avancée', 'Opportunités d\'évolution', 'Logement fourni', 'Transport quotidien'],
      workSchedule: 'Rotation 2 semaines sur site / 1 semaine repos',
      experienceRequired: '3-5 ans d\'expérience en maintenance industrielle',
      educationRequired: 'Diplôme technique en maintenance ou électromécanique',
      applicationProcess: ['Candidature en ligne', 'Test technique', 'Entretien RH', 'Visite médicale', 'Formation sécurité'],
      companyInfo: {
        description: 'Rio Tinto est une multinationale leader dans l\'industrie minière, engagée dans l\'extraction responsable et le développement durable.',
        size: '1000+ employés en Guinée',
        website: 'www.riotinto.com/simandou',
        founded: '1873'
      },
      contact: {
        name: 'Sarah JOHNSON',
        email: 'careers.simandou@riotinto.com',
        phone: '+224 620 XX XX XX'
      }
    },
    {
      id: '3',
      title: 'Aide-Cuisiner Restaurant Collectif',
      company: 'Catering Services Guinée',
      location: 'Kindia',
      region: 'Kindia',
      sector: 'Services',
      contractType: 'CDD',
      salary: '600 000 - 800 000 GNF',
      description: 'Aide-cuisinier pour restaurant collectif desservant les équipes du projet Simandou.',
      requirements: ['Formation culinaire de base', 'Hygiène alimentaire', 'Travail en équipe'],
      postedDate: '2024-01-12',
      deadline: '2024-02-10',
      isUrgent: false,
      isFeatured: false,
      tags: ['Restauration', 'Services', 'Collectif']
    },
    {
      id: '4',
      title: 'Chauffeur Poids Lourd',
      company: 'Transport & Logistique SA',
      location: 'Conakry',
      region: 'Conakry',
      sector: 'Logistique & Transport',
      contractType: 'CDI',
      salary: '1 000 000 - 1 400 000 GNF',
      description: 'Chauffeur expérimenté pour transport de matériaux et équipements vers les sites de construction.',
      requirements: ['Permis poids lourd', '3 ans d\'expérience minimum', 'Connaissance routes guinéennes'],
      postedDate: '2024-01-08',
      deadline: '2024-02-20',
      isUrgent: true,
      isFeatured: false,
      tags: ['Transport', 'Logistique', 'Poids lourd']
    },
    {
      id: '5',
      title: 'Stage Développement Communautaire',
      company: 'ONG Développement Local',
      location: 'Beyla',
      region: 'Nzérékoré',
      sector: 'Développement social',
      contractType: 'Stage',
      salary: '300 000 GNF',
      description: 'Stage de 6 mois en développement communautaire pour accompagner les projets sociaux locaux.',
      requirements: ['Formation en sciences sociales', 'Connaissance terrain', 'Langues locales'],
      postedDate: '2024-01-05',
      deadline: '2024-01-30',
      isUrgent: false,
      isFeatured: false,
      tags: ['Stage', 'ONG', 'Développement']
    }
  ])

  const filteredJobs = jobOffers.filter(job => {
    return (
      (!filters.search || job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
       job.company.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.sector || job.sector === filters.sector) &&
      (!filters.region || job.region === filters.region) &&
      (!filters.contractType || job.contractType === filters.contractType)
    )
  })

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case 'company':
        return a.company.localeCompare(b.company)
      case 'salary':
        return b.salary?.localeCompare(a.salary || '') || 0
      default:
        return 0
    }
  })

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId])
    // Ici on pourrait ouvrir un modal de candidature
    alert('Candidature envoyée avec succès !')
  }

  const openJobModal = (job: JobOffer) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeJobModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="job-search-container">
      <div className="top-bar">
        <div className="page-title">
          <h1>🔍 Recherche d'offres d'emploi</h1>
          <div className="breadcrumb">
            🏠 Accueil › 🔍 Recherche d'offres › {filteredJobs.length} offres trouvées
          </div>
        </div>
        <div className="search-stats">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ 
              background: 'linear-gradient(45deg, #e8f5e8, #f0f9ff)', 
              padding: '10px 15px', 
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              <strong>{filteredJobs.length}</strong> offres disponibles
            </div>
            <div style={{ 
              background: 'linear-gradient(45deg, #fef9f9, #fff9e6)', 
              padding: '10px 15px', 
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              <strong>{savedJobs.length}</strong> offres sauvegardées
            </div>
          </div>
        </div>
      </div>

      <div className="search-content">
        {/* Filtres de recherche */}
        <div className="search-filters">
          <div className="filters-header">
            <h3>🎯 Filtres de recherche</h3>
            <button 
              className="btn btn-outline"
              onClick={() => setFilters({
                search: '', sector: '', region: '', contractType: '', salaryRange: '', experienceLevel: ''
              })}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              🔄 Réinitialiser
            </button>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label>🔍 Recherche par mots-clés</label>
              <input
                type="text"
                placeholder="Poste, entreprise, compétences..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>🏭 Secteur d'activité</label>
              <select
                value={filters.sector}
                onChange={(e) => handleFilterChange('sector', e.target.value)}
              >
                <option value="">Tous les secteurs</option>
                <option value="BTP & Construction">BTP & Construction</option>
                <option value="Maintenance industrielle">Maintenance industrielle</option>
                <option value="Logistique & Transport">Logistique & Transport</option>
                <option value="Services">Services</option>
                <option value="Développement social">Développement social</option>
                <option value="Agro-industrie">Agro-industrie</option>
              </select>
            </div>

            <div className="filter-group">
              <label>📍 Région</label>
              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              >
                <option value="">Toutes les régions</option>
                <option value="Kindia">Kindia</option>
                <option value="Conakry">Conakry</option>
                <option value="Nzérékoré">Nzérékoré</option>
                <option value="Boké">Boké</option>
                <option value="Labé">Labé</option>
              </select>
            </div>

            <div className="filter-group">
              <label>📋 Type de contrat</label>
              <select
                value={filters.contractType}
                onChange={(e) => handleFilterChange('contractType', e.target.value)}
              >
                <option value="">Tous les contrats</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Barre d'outils */}
        <div className="toolbar">
          <div className="sort-controls">
            <label>Trier par :</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Plus récent</option>
              <option value="deadline">Date limite</option>
              <option value="company">Entreprise</option>
              <option value="salary">Salaire</option>
            </select>
          </div>
          
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grille
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰ Liste
            </button>
          </div>
        </div>

        {/* Liste des offres */}
        <div className={`jobs-container ${viewMode}`}>
          {sortedJobs.length === 0 ? (
            <div className="no-jobs">
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <h3>Aucune offre trouvée</h3>
              <p>Essayez de modifier vos critères de recherche ou consultez toutes les offres disponibles.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setFilters({
                  search: '', sector: '', region: '', contractType: '', salaryRange: '', experienceLevel: ''
                })}
              >
                Voir toutes les offres
              </button>
            </div>
          ) : (
            sortedJobs.map((job) => (
              <div key={job.id} className={`job-card ${job.isFeatured ? 'featured' : ''}`}>
                {job.isUrgent && (
                  <div className="urgent-badge">🚨 URGENT</div>
                )}
                {job.isFeatured && (
                  <div className="featured-badge">⭐ À LA UNE</div>
                )}

                <div className="job-header">
                  <div className="job-logo">
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} />
                    ) : (
                      <div className="logo-placeholder">
                        {job.company.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="job-info">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company">{job.company}</div>
                    <div className="job-location">📍 {job.location}, {job.region}</div>
                  </div>
                  <div className="job-actions">
                    <button
                      className={`save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                      onClick={() => toggleSaveJob(job.id)}
                      title={savedJobs.includes(job.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      {savedJobs.includes(job.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>

                <div className="job-details">
                  <div className="job-tags">
                    <span className="contract-tag">{job.contractType}</span>
                    <span className="sector-tag">{job.sector}</span>
                    {job.salary && <span className="salary-tag">💰 {job.salary}</span>}
                  </div>

                  <div className="job-description">
                    {job.description}
                  </div>

                  <div className="job-requirements">
                    <h4>Compétences requises :</h4>
                    <div className="requirements-list">
                      {job.requirements.map((req, index) => (
                        <span key={index} className="requirement-tag">
                          ✓ {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="job-footer">
                  <div className="job-meta">
                    <span className="posted-date">📅 Publié le {formatDate(job.postedDate)}</span>
                    <span className={`deadline ${getDaysUntilDeadline(job.deadline) <= 7 ? 'urgent' : ''}`}>
                      ⏰ Expire dans {getDaysUntilDeadline(job.deadline)} jours
                    </span>
                  </div>
                  
                  <div className="job-buttons">
                    <button 
                      className="btn btn-outline"
                      onClick={() => openJobModal(job)}
                    >
                      👁️ Voir détails
                    </button>
                    <button 
                      className={`btn ${appliedJobs.includes(job.id) ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? '✅ Candidature envoyée' : '📝 Postuler'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {sortedJobs.length > 0 && (
          <div className="pagination">
            <button className="btn btn-outline">← Précédent</button>
            <span>Page 1 sur 1</span>
            <button className="btn btn-outline">Suivant →</button>
          </div>
        )}
      </div>

      {/* Modal détails de l'offre */}
      {isModalOpen && selectedJob && (
        <div className="job-modal-overlay" onClick={closeJobModal}>
          <div className="job-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-job-logo">
                  {selectedJob.logo ? (
                    <img src={selectedJob.logo} alt={selectedJob.company} />
                  ) : (
                    <div className="logo-placeholder">
                      {selectedJob.company.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="modal-job-title">{selectedJob.title}</h2>
                  <div className="modal-job-company">{selectedJob.company}</div>
                  <div className="modal-job-location">📍 {selectedJob.location}, {selectedJob.region}</div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className={`save-btn ${savedJobs.includes(selectedJob.id) ? 'saved' : ''}`}
                  onClick={() => toggleSaveJob(selectedJob.id)}
                >
                  {savedJobs.includes(selectedJob.id) ? '❤️' : '🤍'}
                </button>
                <button className="close-btn" onClick={closeJobModal}>
                  ✕
                </button>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-tags">
                <span className="contract-tag">{selectedJob.contractType}</span>
                <span className="sector-tag">{selectedJob.sector}</span>
                {selectedJob.salary && <span className="salary-tag">💰 {selectedJob.salary}</span>}
                {selectedJob.isUrgent && <span className="urgent-tag">🚨 URGENT</span>}
                {selectedJob.isFeatured && <span className="featured-tag">⭐ À LA UNE</span>}
              </div>

              <div className="modal-sections">
                <div className="modal-section">
                  <h3>📋 Description du poste</h3>
                  <p>{selectedJob.fullDescription || selectedJob.description}</p>
                </div>

                <div className="modal-section">
                  <h3>🎯 Compétences requises</h3>
                  <div className="requirements-grid">
                    {selectedJob.requirements.map((req, index) => (
                      <div key={index} className="requirement-item">
                        <span className="check-icon">✓</span>
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedJob.benefits && (
                  <div className="modal-section">
                    <h3>🎁 Avantages</h3>
                    <div className="benefits-grid">
                      {selectedJob.benefits.map((benefit, index) => (
                        <div key={index} className="benefit-item">
                          <span className="benefit-icon">✨</span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-section">
                  <h3>ℹ️ Informations pratiques</h3>
                  <div className="info-grid">
                    {selectedJob.workSchedule && (
                      <div className="info-item">
                        <strong>🕒 Horaires :</strong> {selectedJob.workSchedule}
                      </div>
                    )}
                    {selectedJob.experienceRequired && (
                      <div className="info-item">
                        <strong>💼 Expérience :</strong> {selectedJob.experienceRequired}
                      </div>
                    )}
                    {selectedJob.educationRequired && (
                      <div className="info-item">
                        <strong>🎓 Formation :</strong> {selectedJob.educationRequired}
                      </div>
                    )}
                    <div className="info-item">
                      <strong>📅 Date limite :</strong> 
                      <span className={getDaysUntilDeadline(selectedJob.deadline) <= 7 ? 'deadline urgent' : 'deadline'}>
                        {formatDate(selectedJob.deadline)} ({getDaysUntilDeadline(selectedJob.deadline)} jours restants)
                      </span>
                    </div>
                  </div>
                </div>

                {selectedJob.applicationProcess && (
                  <div className="modal-section">
                    <h3>📝 Processus de candidature</h3>
                    <div className="process-steps">
                      {selectedJob.applicationProcess.map((step, index) => (
                        <div key={index} className="process-step">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-content">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedJob.companyInfo && (
                  <div className="modal-section">
                    <h3>🏢 À propos de l'entreprise</h3>
                    <div className="company-info">
                      <p>{selectedJob.companyInfo.description}</p>
                      <div className="company-details">
                        <div className="company-detail">
                          <strong>👥 Taille :</strong> {selectedJob.companyInfo.size}
                        </div>
                        {selectedJob.companyInfo.founded && (
                          <div className="company-detail">
                            <strong>📅 Fondée en :</strong> {selectedJob.companyInfo.founded}
                          </div>
                        )}
                        {selectedJob.companyInfo.website && (
                          <div className="company-detail">
                            <strong>🌐 Site web :</strong> 
                            <a href={`https://${selectedJob.companyInfo.website}`} target="_blank" rel="noopener noreferrer">
                              {selectedJob.companyInfo.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedJob.contact && (
                  <div className="modal-section">
                    <h3>📞 Contact</h3>
                    <div className="contact-info">
                      <div className="contact-item">
                        <strong>👤 Responsable recrutement :</strong> {selectedJob.contact.name}
                      </div>
                      <div className="contact-item">
                        <strong>📧 Email :</strong> 
                        <a href={`mailto:${selectedJob.contact.email}`}>{selectedJob.contact.email}</a>
                      </div>
                      {selectedJob.contact.phone && (
                        <div className="contact-item">
                          <strong>📱 Téléphone :</strong> 
                          <a href={`tel:${selectedJob.contact.phone}`}>{selectedJob.contact.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <div className="modal-meta">
                  <span>📅 Publié le {formatDate(selectedJob.postedDate)}</span>
                </div>
                <div className="modal-buttons">
                  <button 
                    className={`btn ${appliedJobs.includes(selectedJob.id) ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={appliedJobs.includes(selectedJob.id)}
                  >
                    {appliedJobs.includes(selectedJob.id) ? '✅ Candidature envoyée' : '📝 Postuler maintenant'}
                  </button>
                  <button className="btn btn-outline" onClick={closeJobModal}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 