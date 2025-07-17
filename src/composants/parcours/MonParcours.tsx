'use client'

import { useState } from 'react'

interface ParcoursData {
  id: string
  letter: 'A' | 'B' | 'C' | 'D'
  title: string
  description: string
  profile: string
  duration: string
  support: string
  color: string
  icon: string
  isAssigned?: boolean
  isCompleted?: boolean
  progress?: number
}

interface EvaluationData {
  date: string
  evaluator: string
  technicalSkills: number
  employability: number
  softSkills: number
  recommendation: string
  assignedParcours: 'A' | 'B' | 'C' | 'D'
  nextSteps: string[]
}

export default function MonParcours() {
  const [selectedParcours, setSelectedParcours] = useState<ParcoursData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Données d'évaluation de l'utilisateur
  const evaluationData: EvaluationData = {
    date: '2024-01-15',
    evaluator: 'Comité d\'évaluation Régional - Kindia',
    technicalSkills: 7.5,
    employability: 8.0,
    softSkills: 6.5,
    recommendation: 'Candidat avec de bonnes bases techniques mais nécessitant un renforcement des compétences comportementales avant insertion directe.',
    assignedParcours: 'B',
    nextSteps: [
      'Formation technique complémentaire en BTP (2 mois)',
      'Module savoir-être professionnel (2 semaines)', 
      'Stage d\'immersion en entreprise (3 mois)',
      'Suivi post-insertion (6 mois)'
    ]
  }

  // Données des parcours
  const parcoursData: ParcoursData[] = [
    {
      id: 'parcours-a',
      letter: 'A',
      title: 'Insertion immédiate',
      description: 'Destiné aux jeunes avec compétences essentielles (techniques/académiques) et savoir-être compatible, immédiatement opérationnels.',
      profile: 'Jeunes diplômés de filières professionnelles/universitaires maîtrisant les bases, ou issus de l\'apprentissage/informel avec compétences pratiques solides. Peuvent intégrer un poste ou stage sans formation complémentaire.',
      duration: 'Stage d\'immersion de 3 à 12 mois',
      support: 'Référent pour suivi, lien entreprise/administration. Appui financier (transport, indemnité) possible.',
      color: '#009460',
      icon: '🚀',
      isAssigned: false,
      isCompleted: false
    },
    {
      id: 'parcours-b',
      letter: 'B',
      title: 'Mise à niveau technique',
      description: 'Pour jeunes dont les compétences sont partiellement adéquates, avec des lacunes techniques ou comportementales. Objectif : renforcer ces aspects via une formation courte et ciblée.',
      profile: 'Jeunes avec base théorique sans application concrète, ou expérience pratique informelle nécessitant structuration. Potentiel d\'employabilité à court terme avec appui complémentaire.',
      duration: 'Formation courte (1 à 3 mois) incluant modules pratiques, simulations',
      support: 'Assuré par structures partenaires (centres de formation professionnelle, ASCAD).',
      color: '#007bff',
      icon: '🔧',
      isAssigned: true,
      isCompleted: false,
      progress: 25
    },
    {
      id: 'parcours-c',
      letter: 'C',
      title: 'Reconversion approfondie',
      description: 'Pour les jeunes sans qualification suffisante ou éloignés du marché du travail, nécessitant une reconversion complète.',
      profile: 'Jeunes n\'ayant pas de compétences correspondant aux besoins du marché ou des aspirations.',
      duration: 'Formation longue et certifiante (6 à 12 mois)',
      support: 'Formation dispensée par centres de formation agréés avec stages pratiques et suivi intensif.',
      color: '#f57c00',
      icon: '🎯',
      isAssigned: false,
      isCompleted: false
    },
    {
      id: 'parcours-d',
      letter: 'D',
      title: 'Savoir-être et Civique',
      description: 'Pour les jeunes nécessitant un renforcement des compétences non techniques essentielles (soft skills, comportement professionnel, citoyenneté).',
      profile: 'Tous les jeunes intégrant le dispositif, ou spécifiquement ceux identifiés par le comité d\'évaluation comme ayant besoin de développer leurs compétences interpersonnelles et leur compréhension des codes professionnels et sociaux.',
      duration: 'Modules de formation courts et interactifs (1 à 2 semaines)',
      support: 'Ateliers pratiques, simulations, études de cas pour développer la ponctualité, l\'esprit d\'équipe, la communication, le respect des normes, etc.',
      color: '#CE1126',
      icon: '🤝',
      isAssigned: false,
      isCompleted: true
    }
  ]

  const openParcoursModal = (parcours: ParcoursData) => {
    setSelectedParcours(parcours)
    setIsModalOpen(true)
  }

  const closeParcoursModal = () => {
    setIsModalOpen(false)
    setSelectedParcours(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return '#009460'
    if (score >= 6) return '#FCD116'
    return '#CE1126'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="parcours-container">
      <div className="top-bar">
        <div className="page-title">
          <h1>🎓 Mon Parcours d'Insertion</h1>
          <div className="breadcrumb">
            🏠 Accueil › 🎓 Mon parcours › Parcours personnalisés Simandou 2040
          </div>
        </div>
        <div className="parcours-stats">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ 
              background: 'linear-gradient(45deg, #e8f5e8, #f0f9ff)', 
              padding: '10px 15px', 
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              <strong>Parcours {evaluationData.assignedParcours}</strong> recommandé
            </div>
            <div style={{ 
              background: 'linear-gradient(45deg, #fef9f9, #fff9e6)', 
              padding: '10px 15px', 
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              <strong>1/4</strong> parcours complété
            </div>
          </div>
        </div>
      </div>

      <div className="parcours-content">
        {/* Section Évaluation */}
        <div className="evaluation-section">
          <div className="section-header">
            <h2>📊 Mon Évaluation</h2>
            <div className="evaluation-date">
              Évaluée le {formatDate(evaluationData.date)}
            </div>
          </div>

          <div className="evaluation-card">
            <div className="evaluation-header">
              <div className="evaluator-info">
                <h3>Évaluation par le Comité Public-Privé</h3>
                <p>{evaluationData.evaluator}</p>
              </div>
              <div className="recommendation-badge">
                <span className="recommended-label">Parcours recommandé</span>
                <div className="recommended-parcours">
                  <span className="parcours-letter" style={{ background: parcoursData.find(p => p.letter === evaluationData.assignedParcours)?.color }}>
                    {evaluationData.assignedParcours}
                  </span>
                  <span>{parcoursData.find(p => p.letter === evaluationData.assignedParcours)?.title}</span>
                </div>
              </div>
            </div>

            <div className="scores-grid">
              <div className="score-item">
                <div className="score-circle">
                  <svg width="80" height="80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#e1e1e1" strokeWidth="6"></circle>
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="30" 
                      fill="none" 
                      stroke={getScoreColor(evaluationData.technicalSkills)} 
                      strokeWidth="6"
                      strokeDasharray="188" 
                      strokeDashoffset={188 - (evaluationData.technicalSkills / 10) * 188}
                      transform="rotate(-90 40 40)"
                    ></circle>
                  </svg>
                  <div className="score-text">{evaluationData.technicalSkills}/10</div>
                </div>
                <div className="score-label">🔧 Compétences Techniques</div>
              </div>

              <div className="score-item">
                <div className="score-circle">
                  <svg width="80" height="80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#e1e1e1" strokeWidth="6"></circle>
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="30" 
                      fill="none" 
                      stroke={getScoreColor(evaluationData.employability)} 
                      strokeWidth="6"
                      strokeDasharray="188" 
                      strokeDashoffset={188 - (evaluationData.employability / 10) * 188}
                      transform="rotate(-90 40 40)"
                    ></circle>
                  </svg>
                  <div className="score-text">{evaluationData.employability}/10</div>
                </div>
                <div className="score-label">💼 Employabilité</div>
              </div>

              <div className="score-item">
                <div className="score-circle">
                  <svg width="80" height="80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#e1e1e1" strokeWidth="6"></circle>
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="30" 
                      fill="none" 
                      stroke={getScoreColor(evaluationData.softSkills)} 
                      strokeWidth="6"
                      strokeDasharray="188" 
                      strokeDashoffset={188 - (evaluationData.softSkills / 10) * 188}
                      transform="rotate(-90 40 40)"
                    ></circle>
                  </svg>
                  <div className="score-text">{evaluationData.softSkills}/10</div>
                </div>
                <div className="score-label">🤝 Savoir-être</div>
              </div>
            </div>

            <div className="recommendation-section">
              <h4>📝 Recommandation du comité</h4>
              <p>{evaluationData.recommendation}</p>
            </div>

            <div className="next-steps-section">
              <h4>🗺️ Prochaines étapes recommandées</h4>
              <div className="steps-list">
                {evaluationData.nextSteps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Parcours */}
        <div className="parcours-section">
          <div className="section-header">
            <h2>🛤️ Parcours Disponibles</h2>
            <p>Découvrez les 4 parcours personnalisés du programme Simandou 2040</p>
          </div>

          <div className="parcours-grid">
            {parcoursData.map((parcours) => (
              <div 
                key={parcours.id} 
                className={`parcours-card ${parcours.isAssigned ? 'assigned' : ''} ${parcours.isCompleted ? 'completed' : ''}`}
                onClick={() => openParcoursModal(parcours)}
              >
                {parcours.isAssigned && (
                  <div className="assigned-badge">📌 Mon parcours</div>
                )}
                {parcours.isCompleted && (
                  <div className="completed-badge">✅ Terminé</div>
                )}

                <div className="parcours-header">
                  <div className="parcours-icon" style={{ background: parcours.color }}>
                    <span className="parcours-letter">{parcours.letter}</span>
                    <span className="parcours-emoji">{parcours.icon}</span>
                  </div>
                  <div className="parcours-info">
                    <h3>Parcours {parcours.letter}</h3>
                    <h4>{parcours.title}</h4>
                  </div>
                </div>

                <div className="parcours-description">
                  {parcours.description}
                </div>

                <div className="parcours-meta">
                  <div className="duration-info">
                    <span className="meta-icon">⏱️</span>
                    <span>{parcours.duration}</span>
                  </div>
                </div>

                {parcours.progress !== undefined && (
                  <div className="progress-section">
                    <div className="progress-label">
                      Progression : {parcours.progress}%
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ 
                          width: `${parcours.progress}%`,
                          background: parcours.color 
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="parcours-footer">
                  <button className="btn btn-outline">
                    👁️ Voir détails
                  </button>
                  {parcours.isAssigned && !parcours.isCompleted && (
                    <button className="btn btn-primary">
                      📚 Continuer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal détails du parcours */}
      {isModalOpen && selectedParcours && (
        <div className="parcours-modal-overlay" onClick={closeParcoursModal}>
          <div className="parcours-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-parcours-icon" style={{ background: selectedParcours.color }}>
                  <span className="parcours-letter">{selectedParcours.letter}</span>
                  <span className="parcours-emoji">{selectedParcours.icon}</span>
                </div>
                <div>
                  <h2>Parcours {selectedParcours.letter}</h2>
                  <h3>{selectedParcours.title}</h3>
                  {selectedParcours.isAssigned && (
                    <div className="assigned-indicator">📌 Votre parcours recommandé</div>
                  )}
                </div>
              </div>
              <button className="close-btn" onClick={closeParcoursModal}>
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-section">
                <h4>📋 Description</h4>
                <p>{selectedParcours.description}</p>
              </div>

              <div className="modal-section">
                <h4>👥 Profil ciblé</h4>
                <p>{selectedParcours.profile}</p>
              </div>

              <div className="modal-section">
                <h4>⏱️ Durée</h4>
                <p>{selectedParcours.duration}</p>
              </div>

              <div className="modal-section">
                <h4>🤝 Accompagnement</h4>
                <p>{selectedParcours.support}</p>
              </div>

              {selectedParcours.isAssigned && (
                <div className="modal-section highlight">
                  <h4>🎯 Pourquoi ce parcours vous est-il recommandé ?</h4>
                  <p>
                    Basé sur votre évaluation, ce parcours correspond parfaitement à votre profil actuel et vous permettra 
                    de développer les compétences nécessaires pour une insertion réussie dans le projet Simandou 2040.
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="modal-buttons">
                {selectedParcours.isAssigned && !selectedParcours.isCompleted && (
                  <button className="btn btn-primary">
                    📚 Commencer/Continuer
                  </button>
                )}
                <button className="btn btn-outline" onClick={closeParcoursModal}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 