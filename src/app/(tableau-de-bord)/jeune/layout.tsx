'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import '../../../styles/profile-management.css'
import ExperienceManager from '../../../composants/profile/ExperienceManager'
import FormationHistory from '../../../composants/profile/FormationHistory'
import { Formation } from '../../../types/formations'

export default function LayoutDashboardJeune({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState('personal')
  const [skills, setSkills] = useState([
    'Maçonnerie', 'Coffrage', 'Soudure', 'Électricité de base'
  ])
  const [softSkills, setSoftSkills] = useState([
    'Travail en équipe', 'Ponctualité', 'Adaptabilité'
  ])
  const [experiences, setExperiences] = useState([
    {
      id: '1',
      title: 'Ouvrier en construction',
      company: 'Entreprise KABA & Fils',
      startDate: '2023-03-01',
      endDate: '2023-09-01',
      description: 'Participation à la construction de bâtiments résidentiels. Maçonnerie, coffrage, et finitions. Travail en équipe sur des chantiers de 10 à 20 ouvriers.'
    },
    {
      id: '2',
      title: 'Stage en électricité',
      company: 'SOTELGUI (Stage)',
      startDate: '2022-07-01',
      endDate: '2022-09-01',
      description: 'Stage de découverte des métiers de l\'électricité. Installation de câblages, maintenance d\'équipements électriques, respect des normes de sécurité.'
    }
  ])
  const [formations, setFormations] = useState<Formation[]>([
    {
      id: '1',
      title: 'Parcours D - Formation Civique et Citoyenne',
      type: 'parcours' as const,
      status: 'completed' as const,
      startDate: '2023-01-15',
      endDate: '2023-03-30',
      description: 'Formation sur les valeurs citoyennes, les droits et devoirs civiques, et l\'engagement communautaire.',
      institution: 'Centre de Formation Simandou 2040',
      certificate: 'Certificat de Formation Civique - Niveau 1'
    },
    {
      id: '2',
      title: 'Formation Technique Spécialisée - BTP',
      type: 'technique' as const,
      status: 'completed' as const,
      startDate: '2023-04-01',
      endDate: '2023-06-15',
      description: 'Formation spécialisée dans les techniques de construction, maçonnerie avancée, et gestion de chantier.',
      institution: 'Institut Technique de Kindia',
      certificate: 'Certificat Technique BTP - Niveau 2'
    },
    {
      id: '3',
      title: 'Parcours A - Formation Savoir-être',
      type: 'parcours' as const,
      status: 'in_progress' as const,
      startDate: '2023-09-01',
      description: 'Développement des compétences comportementales et relationnelles en milieu professionnel.',
      institution: 'Centre de Formation Simandou 2040'
    },
    {
      id: '4',
      title: 'Certification Ministérielle - Sécurité au Travail',
      type: 'certification' as const,
      status: 'planned' as const,
      startDate: '2024-01-15',
      description: 'Certification officielle en sécurité et hygiène au travail délivrée par le Ministère du Travail.',
      institution: 'Ministère du Travail de Guinée'
    }
  ])
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [documents, setDocuments] = useState({
    id: true,
    cv: true,
    diplomes: false,
    certificates: false,
    attestations: false,
    autres: false
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)

  const router = useRouter()
  const skillInputRef = useRef<HTMLInputElement>(null)
  const softSkillInputRef = useRef<HTMLInputElement>(null)

  // Fonction pour gérer l'affichage des onglets
  const showTab = (tabName: string) => {
    setActiveTab(tabName)
  }

  // Fonction pour ajouter une compétence
  const addSkill = (skill: string, isSkill: boolean = true) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill) {
      if (isSkill) {
        setSkills([...skills, trimmedSkill])
      } else {
        setSoftSkills([...softSkills, trimmedSkill])
      }
      showSaveIndicatorTemp()
    }
  }

  // Fonction pour supprimer une compétence
  const removeSkill = (index: number, isSkill: boolean = true) => {
    if (isSkill) {
      setSkills(skills.filter((_, i) => i !== index))
    } else {
      setSoftSkills(softSkills.filter((_, i) => i !== index))
    }
    showSaveIndicatorTemp()
  }

  // Fonction pour gérer l'upload de photo
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La photo est trop volumineuse. Taille maximum : 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string)
        showSaveIndicatorTemp()
      }
      reader.readAsDataURL(file)
    }
  }

  // Fonction pour gérer l'upload de documents
  const handleDocumentUpload = (documentType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setDocuments(prev => ({
        ...prev,
        [documentType]: true
      }))
      showSaveIndicatorTemp()
    }
  }

  // Fonction pour afficher l'indicateur de sauvegarde
  const showSaveIndicatorTemp = () => {
    setShowSaveIndicator(true)
    setTimeout(() => setShowSaveIndicator(false), 2000)
  }

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    showSaveIndicatorTemp()
    setTimeout(() => {
      alert('Informations personnelles sauvegardées avec succès !')
    }, 1000)
  }

  // Fonction pour calculer le pourcentage de completion du profil
  const calculateProfileCompletion = () => {
    let completion = 50 // Base
    
    if (profilePhoto) completion += 10
    if (skills.length > 4) completion += 10
    if (softSkills.length > 2) completion += 10
    
    const uploadedDocsCount = Object.values(documents).filter(Boolean).length
    completion += uploadedDocsCount * 5
    
    return Math.min(100, completion)
  }

  const profileCompletion = calculateProfileCompletion()

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Nettoyer les données de session/localStorage si nécessaire
    localStorage.clear()
    sessionStorage.clear()
    
    // Rediriger vers la page d'accueil
    router.push('/')
  }

  // Fonction pour toggle la sidebar sur mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="user-avatar">
            <span>👨‍🎓</span>
            <div className="status-indicator"></div>
          </div>
          <h3>Mamadou DIALLO</h3>
          <p>Jeune Simandou 2040</p>
          
          <div className="progress-ring">
            <svg className="progress-circle">
              <circle className="progress-bg" cx="30" cy="30" r="20"></circle>
              <circle 
                className="progress-bar" 
                cx="30" 
                cy="30" 
                r="20"
                style={{
                  strokeDashoffset: 126 - (profileCompletion / 100) * 126
                }}
              ></circle>
            </svg>
            <div className="progress-text">{profileCompletion}%</div>
          </div>
          <p style={{fontSize: '0.8rem', opacity: 0.8}}>Profil complété</p>
        </div>
        
        <ul className="nav-menu">
          <li><Link href="#"><span className="icon">📊</span> Tableau de bord</Link></li>
          <li><Link href="#" className="active"><span className="icon">👤</span> Mon profil</Link></li>
          <li><Link href="#"><span className="icon">🔍</span> Rechercher des offres</Link></li>
          <li><Link href="#"><span className="icon">📝</span> Mes candidatures</Link></li>
          <li><Link href="#"><span className="icon">🎓</span> Mon parcours</Link></li>
          <li><Link href="#"><span className="icon">⭐</span> Mes évaluations</Link></li>
          <li><Link href="#"><span className="icon">🔔</span> Notifications</Link></li>
          <li><Link href="#"><span className="icon">💬</span> Messages</Link></li>
          <li><Link href="#"><span className="icon">⚙️</span> Paramètres</Link></li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <span className="icon">🚪</span> Déconnexion
            </button>
          </li>
        </ul>
      </div>
      
      {/* Contenu principal */}
      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
            <h1>👤 Mon Profil</h1>
            <div className="breadcrumb">
              🏠 Accueil › 👤 Mon profil › ✏️ Modifier
            </div>
          </div>
          <div className="profile-completion">
            <div className="completion-circle">
              <svg width="50" height="50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#e1e1e1" strokeWidth="4"></circle>
                <circle 
                  cx="25" 
                  cy="25" 
                  r="20" 
                  fill="none" 
                  stroke="#009460" 
                  strokeWidth="4"
                  strokeDasharray="126" 
                  strokeDashoffset={126 - (profileCompletion / 100) * 126}
                  transform="rotate(-90 25 25)"
                ></circle>
              </svg>
              <div style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                fontWeight: 600, 
                fontSize: '0.9rem'
              }}>
                {profileCompletion}%
              </div>
            </div>
            <div>
              <strong>Profil à {profileCompletion}% complété</strong>
              <p style={{fontSize: '0.9rem', color: '#666', margin: 0}}>
                Ajoutez votre CV et vos compétences pour améliorer votre visibilité
              </p>
            </div>
          </div>
        </div>
        
        <div className="profile-grid">
          {/* Sidebar du profil */}
          <div className="profile-sidebar">
            {/* Photo et stats */}
            <div className="profile-card">
              <div className="profile-photo-section">
                <div className="profile-photo">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Photo de profil" />
                  ) : (
                    <div className="photo-placeholder">👨‍🎓</div>
                  )}
                </div>
                <button 
                  className="photo-upload-btn" 
                  onClick={() => document.getElementById('photoUpload')?.click()}
                >
                  📷 Changer la photo
                </button>
                <input 
                  type="file" 
                  id="photoUpload" 
                  accept="image/*" 
                  style={{display: 'none'}}
                  onChange={handlePhotoUpload}
                />
              </div>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Candidatures</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">En cours</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.2</span>
                  <span className="stat-label">Note moyenne</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Formations</span>
                </div>
              </div>
            </div>
            
            {/* Badges */}
            <div className="profile-card">
              <div className="badges-section">
                <h4>🏆 Mes badges</h4>
                <div className="badges-grid">
                  <div className="badge-item earned" title="Première candidature">
                    <span className="badge-icon">🚀</span>
                    <span className="badge-name">Débutant</span>
                  </div>
                  <div className="badge-item earned" title="Profil complété">
                    <span className="badge-icon">✅</span>
                    <span className="badge-name">Profil Pro</span>
                  </div>
                  <div className="badge-item" title="5 candidatures">
                    <span className="badge-icon">📝</span>
                    <span className="badge-name">Actif</span>
                  </div>
                  <div className="badge-item" title="Première embauche">
                    <span className="badge-icon">💼</span>
                    <span className="badge-name">Employé</span>
                  </div>
                  <div className="badge-item earned" title="Formation Parcours D">
                    <span className="badge-icon">🎓</span>
                    <span className="badge-name">Civique</span>
                  </div>
                  <div className="badge-item" title="Excellent évaluations">
                    <span className="badge-icon">⭐</span>
                    <span className="badge-name">Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal du profil */}
          <div className="profile-main">
            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => showTab('personal')}
                >
                  👤 Informations personnelles
                </button>
                <button 
                  className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => showTab('experience')}
                >
                  💼 Expérience
                </button>
                <button 
                  className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => showTab('skills')}
                >
                  🎯 Compétences
                </button>
                <button 
                  className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => showTab('documents')}
                >
                  📄 Documents
                </button>
                <button 
                  className={`tab-button ${activeTab === 'formations' ? 'active' : ''}`}
                  onClick={() => showTab('formations')}
                >
                  🎓 Formations
                </button>
              </div>
              
              {/* Onglet Informations personnelles */}
              <div className={`tab-content ${activeTab === 'personal' ? 'active' : ''}`}>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-section">
                    <h3 className="section-title">📋 Informations de base</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nom</label>
                        <input type="text" name="nom" defaultValue="DIALLO" readOnly />
                      </div>
                      <div className="form-group">
                        <label>Prénom</label>
                        <input type="text" name="prenom" defaultValue="Mamadou" readOnly />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" defaultValue="mamadou.diallo@gmail.com" readOnly />
                      </div>
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input type="tel" name="telephone" defaultValue="+224 628 12 34 56" />
                      </div>
                      <div className="form-group">
                        <label>Date de naissance</label>
                        <input type="date" name="date_naissance" defaultValue="1998-03-15" readOnly />
                      </div>
                      <div className="form-group">
                        <label>Région</label>
                        <select name="region" defaultValue="kindia">
                          <option value="kindia">Kindia</option>
                          <option value="conakry">Conakry</option>
                          <option value="boke">Boké</option>
                          <option value="labe">Labé</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h3 className="section-title">🎓 Formation et aspirations</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Niveau d&apos;éducation</label>
                        <select name="niveau_education" defaultValue="lycee">
                          <option value="lycee">Lycée</option>
                          <option value="universitaire">Universitaire</option>
                          <option value="formation_pro">Formation professionnelle</option>
                          <option value="college">Collège</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Secteur d&apos;intérêt principal</label>
                        <select name="secteur_interesse" defaultValue="btp">
                          <option value="btp">BTP & Construction</option>
                          <option value="agro">Agro-industrie</option>
                          <option value="numerique">Services numériques</option>
                          <option value="logistique">Logistique & Transport</option>
                          <option value="maintenance">Maintenance industrielle</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Disponibilité</label>
                        <select name="disponibilite" defaultValue="immediat">
                          <option value="immediat">Immédiatement</option>
                          <option value="1_mois">Dans 1 mois</option>
                          <option value="3_mois">Dans 3 mois</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Mobilité géographique</label>
                        <select name="mobilite" defaultValue="region">
                          <option value="region">Dans ma région</option>
                          <option value="nationale">National</option>
                          <option value="limitee">Limitée</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>Aspirations professionnelles</label>
                      <textarea 
                        name="aspirations" 
                        rows={4} 
                        placeholder="Décrivez vos objectifs de carrière, le type de poste que vous recherchez..."
                        defaultValue="Je souhaite me spécialiser dans le BTP, particulièrement dans la construction d'infrastructures. Mon objectif est de devenir chef de chantier dans les 5 prochaines années."
                      />
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button type="submit" className="btn btn-primary">
                      💾 Sauvegarder les modifications
                    </button>
                    <button type="button" className="btn btn-outline">
                      🔄 Annuler
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Onglet Expérience */}
              <div className={`tab-content ${activeTab === 'experience' ? 'active' : ''}`}>
                <ExperienceManager 
                  experiences={experiences}
                  onUpdateExperiences={setExperiences}
                />
              </div>
              
              {/* Onglet Compétences */}
              <div className={`tab-content ${activeTab === 'skills' ? 'active' : ''}`}>
                <div className="form-section">
                  <h3 className="section-title">🎯 Compétences techniques</h3>
                  <div className="skills-input" onClick={() => skillInputRef.current?.focus()}>
                    {skills.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        {skill}
                        <button 
                          className="skill-remove" 
                          onClick={() => removeSkill(index, true)}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <input 
                      ref={skillInputRef}
                      type="text" 
                      className="skill-input-field" 
                      placeholder="Tapez une compétence et appuyez sur Entrée..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addSkill(e.currentTarget.value, true)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                  <div style={{fontSize: '0.85rem', color: '#666', marginTop: '8px'}}>
                    💡 Ajoutez vos compétences techniques, logiciels maîtrisés, certifications...
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="section-title">💪 Compétences comportementales</h3>
                  <div className="skills-input" onClick={() => softSkillInputRef.current?.focus()}>
                    {softSkills.map((skill, index) => (
                      <div key={index} className="skill-tag" style={{background: 'linear-gradient(45deg, #009460, #00b070)'}}>
                        {skill}
                        <button 
                          className="skill-remove" 
                          onClick={() => removeSkill(index, false)}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <input 
                      ref={softSkillInputRef}
                      type="text" 
                      className="skill-input-field" 
                      placeholder="Tapez une compétence comportementale..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addSkill(e.currentTarget.value, false)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="section-title">🗣️ Langues</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Français</label>
                      <select name="niveau_francais" defaultValue="courant">
                        <option value="courant">Courant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="debutant">Débutant</option>
                        <option value="natif">Natif</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Anglais</label>
                      <select name="niveau_anglais" defaultValue="debutant">
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="courant">Courant</option>
                        <option value="natif">Natif</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Langue nationale principale</label>
                      <select name="langue_nationale" defaultValue="malinke">
                        <option value="malinke">Malinké</option>
                        <option value="soussou">Soussou</option>
                        <option value="poular">Poular</option>
                        <option value="guerze">Guerzé</option>
                        <option value="toma">Toma</option>
                        <option value="kissi">Kissi</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Autres langues</label>
                      <input type="text" name="autres_langues" placeholder="Arabe, Espagnol..." />
                    </div>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button type="button" className="btn btn-primary">
                    💾 Sauvegarder les compétences
                  </button>
                </div>
              </div>
              
              {/* Onglet Documents */}
              <div className={`tab-content ${activeTab === 'documents' ? 'active' : ''}`}>
                <div className="form-section">
                  <h3 className="section-title">📄 Mes documents</h3>
                  <div className="documents-section">
                    <p style={{marginBottom: '15px', color: '#666'}}>
                      Téléchargez vos documents pour améliorer votre profil et augmenter vos chances de recrutement.
                    </p>
                    
                    <div className="documents-grid">
                      <div className={`document-card ${documents.id ? 'uploaded' : ''}`}>
                        {documents.id && (
                          <div className="document-actions">
                            <button className="doc-action-btn btn-view" title="Voir">👁️</button>
                            <button className="doc-action-btn btn-delete" title="Supprimer">🗑️</button>
                          </div>
                        )}
                        <span className="document-icon">🆔</span>
                        <div className="document-name">Pièce d&apos;identité</div>
                        <div className="document-status" style={{color: documents.id ? '#009460' : '#666'}}>
                          {documents.id ? '✅ Téléchargé' : '📤 Cliquez pour télécharger'}
                        </div>
                      </div>
                      
                      <div className={`document-card ${documents.cv ? 'uploaded' : ''}`}>
                        {documents.cv && (
                          <div className="document-actions">
                            <button className="doc-action-btn btn-view" title="Voir">👁️</button>
                            <button className="doc-action-btn btn-delete" title="Supprimer">🗑️</button>
                          </div>
                        )}
                        <span className="document-icon">📋</span>
                        <div className="document-name">CV</div>
                        <div className="document-status" style={{color: documents.cv ? '#009460' : '#666'}}>
                          {documents.cv ? '✅ cv_mamadou.pdf' : '📤 Cliquez pour télécharger'}
                        </div>
                      </div>
                      
                      <div className="document-card" onClick={() => document.getElementById('diplomesUpload')?.click()}>
                        <span className="document-icon">🎓</span>
                        <div className="document-name">Diplômes</div>
                        <div className="document-status">📤 Cliquez pour télécharger</div>
                        <input 
                          type="file" 
                          id="diplomesUpload" 
                          accept=".pdf,.jpg,.png" 
                          multiple 
                          style={{display: 'none'}}
                          onChange={(e) => handleDocumentUpload('diplomes', e)}
                        />
                      </div>
                      
                      <div className="document-card" onClick={() => document.getElementById('certificatsUpload')?.click()}>
                        <span className="document-icon">🏆</span>
                        <div className="document-name">Certificats</div>
                        <div className="document-status">📤 Cliquez pour télécharger</div>
                        <input 
                          type="file" 
                          id="certificatsUpload" 
                          accept=".pdf,.jpg,.png" 
                          multiple 
                          style={{display: 'none'}}
                          onChange={(e) => handleDocumentUpload('certificates', e)}
                        />
                      </div>
                      
                      <div className="document-card" onClick={() => document.getElementById('attestationsUpload')?.click()}>
                        <span className="document-icon">📜</span>
                        <div className="document-name">Attestations</div>
                        <div className="document-status">📤 Cliquez pour télécharger</div>
                        <input 
                          type="file" 
                          id="attestationsUpload" 
                          accept=".pdf,.jpg,.png" 
                          multiple 
                          style={{display: 'none'}}
                          onChange={(e) => handleDocumentUpload('attestations', e)}
                        />
                      </div>
                      
                      <div className="document-card" onClick={() => document.getElementById('autresUpload')?.click()}>
                        <span className="document-icon">📁</span>
                        <div className="document-name">Autres documents</div>
                        <div className="document-status">📤 Cliquez pour télécharger</div>
                        <input 
                          type="file" 
                          id="autresUpload" 
                          accept=".pdf,.jpg,.png,.doc,.docx" 
                          multiple 
                          style={{display: 'none'}}
                          onChange={(e) => handleDocumentUpload('autres', e)}
                        />
                      </div>
                    </div>
                    
                    <div style={{
                      background: '#e8f5e8', 
                      border: '1px solid #c3e6cb', 
                      borderRadius: '8px', 
                      padding: '15px', 
                      marginTop: '20px'
                    }}>
                      <h4 style={{
                        color: '#155724', 
                        marginBottom: '10px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px'
                      }}>
                        💡 Conseils pour vos documents
                      </h4>
                      <ul style={{color: '#155724', fontSize: '0.9rem', marginLeft: '20px'}}>
                        <li>Formats acceptés : PDF, JPG, PNG, DOC, DOCX</li>
                        <li>Taille maximum : 10MB par fichier</li>
                        <li>Assurez-vous que vos documents sont lisibles</li>
                        <li>Un CV à jour augmente vos chances de 70%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Onglet Formations */}
              <div className={`tab-content ${activeTab === 'formations' ? 'active' : ''}`}>
                <FormationHistory 
                  formations={formations}
                  onUpdateFormations={setFormations}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicateur de sauvegarde */}
      <div className={`save-indicator ${showSaveIndicator ? 'show' : ''}`}>
        <span>💾</span>
        <span>Modifications sauvegardées automatiquement</span>
      </div>
      
      {/* Bouton menu mobile */}
      <button 
        className="mobile-menu-btn"
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1002,
          background: '#CE1126',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '6px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'none'
        }}
      >
        ☰
      </button>
      
      {children}
    </div>
  )
}
