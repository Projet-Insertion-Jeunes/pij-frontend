  'use client'

import { serviceAuth } from '@/services/auth'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionMinistre } from '@/composants/landing/SectionMinistre'
import '@/styles/landing.css'

export default function PageAccueil() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(false) // NOUVEAU : Mode connexion/inscription
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <>
      <header>
        <div className="header-top">
          <div className="container">
            <div className="gov-branding">
              <div className="guinea-flag">
                <div className="flag-red"></div>
                <div className="flag-yellow"></div>
                <div className="flag-green"></div>
              </div>
              <span>République de Guinée</span>
            </div>
            <div>Travail - Justice - Solidarité</div>
          </div>
        </div>
        <nav className="container">
          <div className="logo-section">
            <div className="ministry-logo">MJS</div>
            <div className="logo-text">
              <a href="#" className="logo-title">Simandou 2040</a>
              <span className="ministry-subtitle">Projet Insertion des Jeunes</span>
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#contexte">Contexte</a></li>
            <li><a href="#parcours">Parcours</a></li>
            <li><a href="#profil-suivi">Profil & Suivi</a></li>
            <li><a href="#modele-economique">Modèle Économique</a></li>
            <li><a href="#composantes">Composantes</a></li>
            <li><a href="#accessibilite">Accessibilité</a></li>
            <li><a href="#partenaires">Partenaires</a></li>
            <li><a href="#inscription">Inscription</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          {/* NOUVEAU : Bouton de connexion dans la navigation */}
          <div className="nav-auth-buttons">
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)} 
              className="btn-connexion"
            >
              {isLoginMode ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </div>
          <button className="mobile-menu-toggle" onClick={() => toggleMobileMenu()}>☰</button>
          <div className="mobile-nav" id="mobileNav">
            <ul>
              <li><a href="#accueil" onClick={() => closeMobileMenu()}>Accueil</a></li>
              <li><a href="#contexte" onClick={() => closeMobileMenu()}>Contexte</a></li>
              <li><a href="#parcours" onClick={() => closeMobileMenu()}>Parcours</a></li>
              <li><a href="#profil-suivi" onClick={() => closeMobileMenu()}>Profil & Suivi</a></li>
              <li><a href="#modele-economique" onClick={() => closeMobileMenu()}>Modèle Économique</a></li>
              <li><a href="#composantes" onClick={() => closeMobileMenu()}>Composantes</a></li>
              <li><a href="#accessibilite" onClick={() => closeMobileMenu()}>Accessibilité</a></li>
              <li><a href="#partenaires" onClick={() => closeMobileMenu()}>Partenaires</a></li>
              <li><a href="#inscription" onClick={() => closeMobileMenu()}>Inscription</a></li>
              <li><a href="#contact" onClick={() => closeMobileMenu()}>Contact</a></li>
              {/* NOUVEAU : Bouton connexion mobile */}
              <li><button onClick={() => { setIsLoginMode(!isLoginMode); closeMobileMenu(); }}>Se connecter</button></li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="guinea-colors-divider"></div>

      <section className="hero" id="accueil">
        <div className="container">
          <div className="hero-content">
            <h1 className="floating">Projet Insertion des Jeunes Simandou 2040</h1>
            <p className="hero-subtitle">
              Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère
            </p>
            <div className="national-motto">
              Un pont vers la prospérité ! 🇬🇳
            </div>
            <div className="hero-buttons">
              <a href="#inscription" className="cta-button pulse">Rejoindre le programme</a>
              {/* NOUVEAU : Bouton connexion dans le hero */}
              <button 
                onClick={() => setIsLoginMode(!isLoginMode)} 
                className="cta-button-secondary"
              >
                {isLoginMode ? 'S\'inscrire' : 'Accéder à mon espace'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <SectionMinistre />

      <section className="contact-section" id="inscription">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {isLoginMode ? 'Se Connecter' : 'Rejoindre le Programme'}
            </h2>
            <p style={{fontSize: '1.1rem', color: 'var(--text-gray)'}}>
              {isLoginMode 
                ? 'Accédez à votre espace personnel pour suivre votre progression'
                : 'Inscrivez-vous dès maintenant pour bénéficier du programme d\'insertion Simandou 2040'
              }
            </p>
            {/* NOUVEAU : Lien pour basculer entre modes */}
            <p style={{fontSize: '1rem', color: 'var(--text-gray)', marginTop: '0.5rem'}}>
              {isLoginMode ? (
                <>Pas encore de compte ? <button onClick={() => setIsLoginMode(false)} style={{color: 'var(--guinea-red)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer'}}>S'inscrire</button></>
              ) : (
                <>Déjà inscrit ? <button onClick={() => setIsLoginMode(true)} style={{color: 'var(--guinea-red)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer'}}>Se connecter</button></>
              )}
            </p>
          </div>

          {/* NOUVEAU : Formulaire dynamique */}
          {isLoginMode ? (
            // FORMULAIRE DE CONNEXION
            <form ref={formRef} className="contact-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email *</label>
                <input type="email" id="loginEmail" name="loginEmail" required />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Mot de passe *</label>
                <input type="password" id="loginPassword" name="loginPassword" required />
              </div>

              <button type="submit" disabled={isSubmitting} className="cta-button" style={{width: '100%'}}>
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
          ) : (
            // FORMULAIRE D'INSCRIPTION (existant)
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nom">Nom complet *</label>
                <input type="text" id="nom" name="nom" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone *</label>
                <input type="tel" id="telephone" name="telephone" required placeholder="622123456 (format guinéen)" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe *</label>
                <input type="password" id="password" name="password" required minLength={6} />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required minLength={6} />
                <small id="passwordError" style={{color: 'red', display: 'none'}}>Les mots de passe ne correspondent pas</small>
              </div>

              <div className="form-group">
                <label htmlFor="dateNaissance">Date de naissance *</label>
                <input type="date" id="dateNaissance" name="dateNaissance" required />
              </div>

              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                  <input type="checkbox" name="conditions" required />
                  <span style={{marginLeft: '0.5rem'}}>J'accepte les conditions d'utilisation *</span>
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className="cta-button" style={{width: '100%'}}>
                {isSubmitting ? 'Inscription en cours...' : 'Rejoindre Simandou 2040 ! 🚀'}
              </button>
            </form>
          )}
          
          {/* Section Autres Lieux d'Inscription */}
          <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '15px', marginTop: '2rem', textAlign: 'center'}}>
            <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>📍 Autres Lieux d'Inscription</h3>
            <p style={{marginBottom: '1rem'}}>L'inscription peut également se faire dans les centres suivants :</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <div style={{background: 'white', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--guinea-green)'}}>
                <h4>🏠 Maisons des Jeunes</h4>
                <p style={{fontSize: '0.9rem'}}>Dans toutes les régions administratives</p>
              </div>
              <div style={{background: 'white', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--guinea-yellow)'}}>
                <h4>🏛️ Mairies Pilotes</h4>
                <p style={{fontSize: '0.9rem'}}>Centres d'inscription désignés</p>
              </div>
            </div>
            <div style={{background: 'rgba(184, 32, 46, 0.1)', padding: '1rem', borderRadius: '8px', marginTop: '1rem'}}>
              <h4 style={{color: 'var(--guinea-red)'}}>🆔 Carte d'Identification Numérique</h4>
              <p style={{fontSize: '0.9rem'}}>Après validation, vous pourrez <strong>télécharger votre carte d'identification</strong> du programme depuis votre espace personnel. <em>Pas de carte physique pour l'instant.</em></p>
            </div>
          </div>
        </div>
      </section>



      <section className="content-section" id="contexte">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contexte et Justification</h2>
            <p style={{fontSize: '1.1rem', color: 'var(--text-gray)', maxWidth: '800px', margin: '0 auto'}}>
              Avec une population majoritairement jeune, la Guinée dispose d&apos;un potentiel humain considérable. 
              Toutefois, ce potentiel est freiné par un taux élevé de chômage et de sous-emploi.
            </p>
          </div>

          <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '15px', margin: '2rem 0', borderLeft: '5px solid var(--guinea-red)'}}>
            <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>🎯 Objectif Global du Projet</h3>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
              Renforcer durablement l&apos;employabilité des jeunes guinéens et soutenir leur insertion professionnelle 
              à travers des parcours alignés sur les besoins du marché, en s&apos;appuyant sur les dynamiques 
              économiques nationales, notamment les projets structurants tels que Simandou 2040.
            </p>
          </div>
        </div>
      </section>

      <section className="objectifs-section" id="objectifs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Objectifs Spécifiques</h2>
          </div>

          <div className="objectifs-grid">
            <div className="objectif-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--guinea-red)'}}>🎓</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Formation Alignée</h3>
              <p>Aligner l&apos;offre de formation des jeunes sur les besoins réels et évolutifs des entreprises et institutions publiques.</p>
            </div>

            <div className="objectif-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--guinea-yellow)'}}>🚀</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Insertion Rapide</h3>
              <p>Faciliter l&apos;insertion rapide des jeunes sur le marché du travail par des parcours individualisés dans les secteurs privé et public.</p>
            </div>

            <div className="objectif-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--guinea-green)'}}>💪</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Compétitivité</h3>
              <p>Renforcer la compétitivité économique en répondant efficacement aux besoins en compétences techniques clés.</p>
            </div>

            <div className="objectif-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem', color: 'var(--guinea-red)'}}>🔄</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Pérennité</h3>
              <p>Assurer la pérennité du dispositif via des mécanismes de financement hybrides et l&apos;implication durable des acteurs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="parcours-section" id="parcours">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">4 Parcours d&apos;Insertion Professionnelle</h2>
            <p style={{fontSize: '1.1rem', color: 'var(--text-gray)'}}>
              Quatre parcours personnalisés selon le profil et les besoins de chaque jeune
            </p>
          </div>

          <div className="parcours-container">
            <div className="parcours-card parcours-a">
              <div className="parcours-header">
                <div className="parcours-title">Parcours A</div>
                <div className="parcours-subtitle">Insertion Immédiate</div>
              </div>
              <div className="parcours-content">
                <p style={{marginBottom: '1rem'}}><strong>Public :</strong> Jeunes diplômés opérationnels</p>
                <div className="parcours-details">
                  <li><strong>Durée :</strong> 3 à 12 mois de stage</li>
                  <li><strong>Profil :</strong> Compétences techniques acquises</li>
                  <li><strong>Accompagnement :</strong> Référent désigné</li>
                  <li><strong>Support :</strong> Transport + subsistance</li>
                </div>
                <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                  Pour les jeunes prêts à intégrer immédiatement un poste sans formation complémentaire.
                </p>
              </div>
            </div>

            <div className="parcours-card parcours-b">
              <div className="parcours-header">
                <div className="parcours-title">Parcours B</div>
                <div className="parcours-subtitle">Mise à Niveau Technique</div>
              </div>
              <div className="parcours-content">
                <p style={{marginBottom: '1rem'}}><strong>Public :</strong> Compétences partiellement acquises</p>
                <div className="parcours-details">
                  <li><strong>Durée :</strong> 1 à 3 mois de formation</li>
                  <li><strong>Profil :</strong> Base théorique sans pratique</li>
                  <li><strong>Formation :</strong> Modules pratiques ciblés</li>
                  <li><strong>Progression :</strong> Vers Parcours A</li>
                </div>
                <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                  Formation courte pour combler les lacunes techniques et comportementales.
                </p>
              </div>
            </div>

            <div className="parcours-card parcours-c">
              <div className="parcours-header">
                <div className="parcours-title">Parcours C</div>
                <div className="parcours-subtitle">Reconversion Approfondie</div>
              </div>
              <div className="parcours-content">
                <p style={{marginBottom: '1rem'}}><strong>Public :</strong> Sans qualification formelle</p>
                <div className="parcours-details">
                  <li><strong>Durée :</strong> 1 à 6 mois de formation</li>
                  <li><strong>Profil :</strong> Déscolarisés, reconversion</li>
                  <li><strong>Formation :</strong> Base solide + savoir-être</li>
                  <li><strong>Suivi :</strong> Encadrement renforcé</li>
                </div>
                <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                  Formation complète pour repartir sur de nouvelles bases professionnelles.
                </p>
              </div>
            </div>

            <div className="parcours-card parcours-d">
              <div className="parcours-header">
                <div className="parcours-title">Parcours D</div>
                <div className="parcours-subtitle">Savoir-Être et Civique</div>
              </div>
              <div className="parcours-content">
                <p style={{marginBottom: '1rem'}}><strong>Public :</strong> Renforcement comportemental</p>
                <div className="parcours-details">
                  <li><strong>Durée :</strong> 2 à 4 mois de formation</li>
                  <li><strong>Focus :</strong> Discipline, ponctualité, éthique</li>
                  <li><strong>Modules :</strong> Civisme, leadership, communication</li>
                  <li><strong>Certification :</strong> Attestation ministérielle</li>
                </div>
                <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                  Formation aux valeurs républicaines et aux comportements professionnels attendus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="profil-suivi">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Profil & Suivi Personnel</h2>
            <p style={{fontSize: '1.1rem', color: 'var(--text-gray)'}}>
              Chaque jeune dispose d&apos;un profil complet avec historique des formations et évaluations employeurs
            </p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '3rem 0'}}>
            <div style={{background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(206, 17, 38, 0.1)', borderTop: '4px solid var(--guinea-red)'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📋</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Historique Formations</h3>
              <p style={{marginBottom: '1rem'}}>Le profil de chaque jeune affiche l&apos;ensemble des formations suivies :</p>
              <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                <li style={{marginBottom: '0.5rem'}}>✅ <strong>Parcours A, B, C ou D</strong> complétés</li>
                <li style={{marginBottom: '0.5rem'}}>✅ <strong>Savoir-être et Civique</strong> avec notes</li>
                <li style={{marginBottom: '0.5rem'}}>✅ <strong>Formations techniques</strong> spécialisées</li>
                <li style={{marginBottom: '0.5rem'}}>✅ <strong>Certifications</strong> ministérielles obtenues</li>
                <li style={{marginBottom: '0.5rem'}}>✅ <strong>Modules complémentaires</strong> suivis</li>
              </ul>
              <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                Transparence totale sur le parcours de formation du candidat
              </p>
            </div>

            <div style={{background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(252, 209, 22, 0.1)', borderTop: '4px solid var(--guinea-yellow)'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>⭐</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Évaluations Employeurs</h3>
              <p style={{marginBottom: '1rem'}}>À la fin de chaque mission, l&apos;employeur évalue le jeune sur :</p>
              <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                <li style={{marginBottom: '0.5rem'}}>🎯 <strong>Qualité du travail</strong> (note /5)</li>
                <li style={{marginBottom: '0.5rem'}}>⏰ <strong>Ponctualité</strong> (note /5)</li>
                <li style={{marginBottom: '0.5rem'}}>🤝 <strong>Comportement professionnel</strong> (note /5)</li>
                <li style={{marginBottom: '0.5rem'}}>💪 <strong>Motivation</strong> (note /5)</li>
                <li style={{marginBottom: '0.5rem'}}>📝 <strong>Commentaire détaillé</strong> libre</li>
              </ul>
              <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                Système de réputation professionnel transparent
              </p>
            </div>

            <div style={{background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0, 148, 96, 0.1)', borderTop: '4px solid var(--guinea-green)'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📈</div>
              <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>Progression Visible</h3>
              <p style={{marginBottom: '1rem'}}>Le profil montre l&apos;évolution du jeune dans le temps :</p>
              <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                <li style={{marginBottom: '0.5rem'}}>📊 <strong>Score global</strong> moyenné sur toutes les missions</li>
                <li style={{marginBottom: '0.5rem'}}>📈 <strong>Courbe de progression</strong> des évaluations</li>
                <li style={{marginBottom: '0.5rem'}}>🏆 <strong>Badges de réussite</strong> débloqués</li>
                <li style={{marginBottom: '0.5rem'}}>🎯 <strong>Recommandations</strong> futures formations</li>
                <li style={{marginBottom: '0.5rem'}}>💼 <strong>Témoignages</strong> d&apos;employeurs satisfaits</li>
              </ul>
              <p style={{fontStyle: 'italic', color: 'var(--text-gray)', marginTop: '1rem'}}>
                Motivation par la reconnaissance des efforts
              </p>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, rgba(184, 32, 46, 0.8), rgba(45, 134, 89, 0.8))', color: 'white', padding: '3rem', borderRadius: '15px', textAlign: 'center', margin: '3rem 0'}}>
            <h3 style={{fontSize: '2rem', marginBottom: '2rem'}}>💼 Modèle Économique Durable</h3>
            
            <div style={{background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '15px', textAlign: 'left', maxWidth: '600px', margin: '0 auto'}}>
              <h4 style={{marginBottom: '1rem', textAlign: 'center'}}>🎯 Autonomie Financière de la Plateforme</h4>
              
              <div style={{marginBottom: '1.5rem'}}>
                <h5>💰 Sources de Revenus :</h5>
                <ul style={{listStyle: 'none', paddingLeft: '1rem'}}>
                  <li>🏢 <strong>Commission Entreprises :</strong> 3% à 5% sur contrats signés</li>
                  <li>📺 <strong>Publicités Ciblées :</strong> Bannières entreprises et services</li>
                  <li>⭐ <strong>Services Premium :</strong> Fonctionnalités avancées optionnelles</li>
                  <li>🎫 <strong>Cartes d&apos;Identification :</strong> Génération cartes numériques</li>
                </ul>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <h5>📊 Projections 3 Ans :</h5>
                <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', margin: '0.5rem 0'}}>
                  <strong>Année 1 :</strong> 100M GNF | <strong>Année 2 :</strong> 300M GNF | <strong>Année 3 :</strong> 600M GNF
                </div>
              </div>

              <div>
                <h5>🇬🇳 Impact National :</h5>
                <p>✅ <strong>Gratuité totale pour les jeunes</strong> - Aucune commission<br />
                ✅ 70% des revenus réinvestis dans la plateforme et formations<br />
                ✅ 30% des bénéfices versés au Trésor Public guinéen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="accessibilite">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Accessibilité Pour Tous</h2>
            <p style={{fontSize: '1.1rem', color: 'var(--text-gray)'}}>
              Solution inclusive pour les personnes non-lettrées via chatbot intelligent multilingue
            </p>
          </div>

          <div style={{background: 'linear-gradient(135deg, var(--guinea-green), var(--guinea-yellow))', color: 'white', padding: '3rem', borderRadius: '15px', textAlign: 'center', margin: '2rem 0'}}>
            <h3 style={{fontSize: '2rem', marginBottom: '2rem'}}>🗣️ Assistant Vocal Intelligent</h3>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
              Notre chatbot intelligent permet aux personnes non-lettrées d&apos;accéder au programme 
              dans leur langue maternelle. L&apos;inscription se fait de manière autonome via reconnaissance vocale, 
              sans nécessiter d&apos;appels téléphoniques.
            </p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', margin: '2rem 0'}}>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px'}}>
                <h4>🇬🇳 Soussou</h4>
                <p style={{fontSize: '0.9rem'}}>Langue de la région côtière</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px'}}>
                <h4>🇬🇳 Malinké</h4>
                <p style={{fontSize: '0.9rem'}}>Langue de la Haute Guinée</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px'}}>
                <h4>🇬🇳 Poular</h4>
                <p style={{fontSize: '0.9rem'}}>Langue du Fouta Djalon</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px'}}>
                <h4>🇬🇳 Guerzé</h4>
                <p style={{fontSize: '0.9rem'}}>Langue forestière</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px'}}>
                <h4>🇬🇳 Toma</h4>
                <p style={{fontSize: '0.9rem'}}>Langue de la forêt</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px'}}>
                <h4>🇬🇳 Kissi</h4>
                <p style={{fontSize: '0.9rem'}}>Langue du sud-est</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="composantes-section" id="composantes">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">5 Composantes Complémentaires</h2>
          </div>

          <div className="composantes-grid">
            <div className="composante-card">
              <div className="composante-icon">💻</div>
              <h3 className="composante-title">Plateforme Numérique</h3>
              <p>Système centralisé de collecte des profils jeunes et des offres d&apos;emploi, avec évaluation automatisée et orientation vers les parcours adaptés.</p>
            </div>

            <div className="composante-card">
              <div className="composante-icon">🎯</div>
              <h3 className="composante-title">Parcours Structurés</h3>
              <p>Évaluation approfondie par comité public-privé et orientation vers les 4 parcours personnalisés (A, B, C ou D) selon le profil.</p>
            </div>

            <div className="composante-card">
              <div className="composante-icon">🤝</div>
              <h3 className="composante-title">Partenariats Public-Privé</h3>
              <p>Structure collaborative réunissant État, collectivités, CGE-GUI, CCIAG et entreprises pour un modèle d&apos;insertion durable.</p>
            </div>

            <div className="composante-card">
              <div className="composante-icon">💰</div>
              <h3 className="composante-title">Financement Hybride</h3>
              <p>Modèle diversifié combinant ressources publiques, RSE des entreprises et financements des bailleurs internationaux.</p>
            </div>

            <div className="composante-card">
              <div className="composante-icon">🌾</div>
              <h3 className="composante-title">Partenariat Agricole</h3>
              <p>Collaboration avec la Chambre d&apos;Agriculture de Guinée pour l&apos;insertion des jeunes dans les secteurs agricoles et agro-industriels.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="partenaires-section" id="partenaires">
        <div className="container">
          <h2 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>Écosystème de Partenaires</h2>
          
          <div className="partenaires-grid">
            <div className="partenaire-item">
              <h4 style={{marginBottom: '1rem'}}>🏛️ Institutions Publiques</h4>
              <ul style={{listStyle: 'none', textAlign: 'left'}}>
                <li>• Ministère de la Jeunesse</li>
                <li>• FONIJ</li>
                <li>• Collectivités locales</li>
                <li>• Services déconcentrés</li>
              </ul>
            </div>

            <div className="partenaire-item">
              <h4 style={{marginBottom: '1rem'}}>🏢 Secteur Privé</h4>
              <ul style={{listStyle: 'none', textAlign: 'left'}}>
                <li>• CGE-GUI</li>
                <li>• CCIAG</li>
                <li>• Entreprises locales</li>
                <li>• Multinationales</li>
              </ul>
            </div>

            <div className="partenaire-item">
              <h4 style={{marginBottom: '1rem'}}>🌍 Partenaires Internationaux</h4>
              <ul style={{listStyle: 'none', textAlign: 'left'}}>
                <li>• PNUD (partenaire principal)</li>
                <li>• Banque Mondiale</li>
                <li>• BAD</li>
                <li>• Coopération bilatérale</li>
              </ul>
            </div>

            <div className="partenaire-item">
              <h4 style={{marginBottom: '1rem'}}>🎓 Formation</h4>
              <ul style={{listStyle: 'none', textAlign: 'left'}}>
                <li>• Centres professionnels</li>
                <li>• ASCAD</li>
                <li>• Universités</li>
                <li>• Organismes agréés</li>
              </ul>
            </div>
          </div>

          <div style={{background: 'rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '15px', marginTop: '3rem'}}>
            <h3 style={{marginBottom: '1rem'}}>🎯 Gouvernance du Projet</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem'}}>
              <div>
                <h4>Comité de Pilotage</h4>
                <p>Orientations stratégiques, validation des plans de travail et rapports</p>
              </div>
              <div>
                <h4>Comité Technique</h4>
                <p>Coordination opérationnelle, suivi terrain et analyse des résultats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '15px', textAlign: 'center'}}>
            <h3 style={{color: 'var(--guinea-red)', marginBottom: '1rem'}}>📞 Contact Programme</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
              <div>
                <h4>Ministère de la Jeunesse et des Sports</h4>
                <p>📧 insertion.simandou2040@mjs.gov.gn</p>
                <p>📞 +224 XX XX XX XX</p>
              </div>
              <div>
                <h4>FONIJ</h4>
                <p>📧 contact@fonij.gov.gn</p>
                <p>📍 Almamya - Kaloum, Conakry</p>
              </div>
              <div>
                <h4>Partenaires</h4>
                <p>🌍 PNUD Guinée</p>
                <p>🏢 CGE-GUI | CCIAG</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Projet Simandou 2040</h3>
              <a href="#accueil">Accueil</a>
              <a href="#contexte">Contexte & Objectifs</a>
              <a href="#parcours">Parcours d&apos;Insertion</a>
              <a href="#profil-suivi">Profil & Suivi</a>
              <a href="#modele-economique">Modèle Économique</a>
              <a href="#composantes">Composantes</a>
              <a href="#accessibilite">Accessibilité</a>
              <a href="#partenaires">Partenaires</a>
              <a href="#inscription">Inscription</a>
            </div>
            <div className="footer-section">
              <h3>Ministère de la Jeunesse et des Sports</h3>
              <a href="#">Ministre Keamou Bogola HABA</a>
              <a href="#">FONIJ</a>
              <a href="#">Programmes jeunesse</a>
              <a href="#">Actualités ministérielles</a>
            </div>
            <div className="footer-section">
              <h3>République de Guinée</h3>
              <a href="#">Présidence de la République</a>
              <a href="#">Général Mamadi DOUMBOUYA</a>
              <a href="#">Vision Simandou 2040</a>
              <a href="#">Gouvernement de Transition</a>
            </div>
            <div className="footer-section">
              <h3>Partenaires</h3>
              <a href="#">PNUD Guinée</a>
              <a href="#">CGE-GUI</a>
              <a href="#">CCIAG</a>
              <a href="#">Banque Mondiale</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-gov-info">
              <div className="guinea-flag">
                <div className="flag-red"></div>
                <div className="flag-yellow"></div>
                <div className="flag-green"></div>
              </div>
              <span>&copy; 2025 République de Guinée - Projet Insertion des Jeunes Simandou 2040</span>
            </div>
            <div>
              <span style={{fontStyle: 'italic'}}>Travail - Justice - Solidarité</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )

  // NOUVEAU : Fonction de connexion
  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get('loginEmail') as string
    const password = formData.get('loginPassword') as string

    try {
      console.log('🔍 Tentative de connexion...')
      
      // CORRECTION : URL correcte pour l'authentification
      const response = await fetch('http://localhost:8000/api/v1/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      console.log(' Response status:', response.status)
      const text = await response.text()
      console.log('🔍 Response text:', text)

      // SI HTML = ERREUR SERVEUR
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        alert('❌ ERREUR: Le serveur Django ne répond pas. Redémarrez le backend !')
        return
      }

      const data = JSON.parse(text)

      if (response.ok) {
        console.log('✅ Connexion réussie:', data)
        
        // Sauvegarder les tokens
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', data.tokens.access)
          localStorage.setItem('refresh_token', data.tokens.refresh)
          localStorage.setItem('utilisateur', JSON.stringify(data.user))
        }

        alert('✅ CONNEXION RÉUSSIE ! Redirection vers votre espace...')
        
        // Redirection selon le type d'utilisateur
        const userType = data.user.user_type
        switch (userType) {
          case 'jeune':
            window.location.href = '/jeune'
            break
          case 'entreprise':
            window.location.href = '/entreprise'
            break
          case 'admin':
            window.location.href = '/admin'
            break
          default:
            window.location.href = '/jeune'
        }
      } else {
        console.log('🚨 Erreur connexion:', data)
        const errorMessage = data.error || data.non_field_errors?.[0] || 'Email ou mot de passe incorrect'
        alert('❌ ERREUR: ' + errorMessage)
      }

    } catch (error: any) {
      console.log('🚨 Exception connexion:', error)
      alert('❌ ERREUR: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction d'inscription existante (corrigée)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(event.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const telephone = formData.get('telephone') as string
    
    // Validation password
    if (password !== confirmPassword) {
      alert('❌ Les mots de passe ne correspondent pas')
      setIsSubmitting(false)
      return
    }
    
    // Validation téléphone guinéen  
    let cleanPhone = telephone.replace(/[\s\-\+]/g, '')
    if (cleanPhone.startsWith('224')) cleanPhone = cleanPhone.substring(3)
    if (!/^6\d{8}$/.test(cleanPhone)) {
      alert('❌ Téléphone invalide ! Format: 622123456')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: (formData.get('nom') as string).split(' ')[0],
          last_name: (formData.get('nom') as string).split(' ').slice(1).join(' ') || 'User',
          email: formData.get('email'),
          phone_number: cleanPhone,
          password: password,
          password_confirm: confirmPassword,
          user_type: 'jeune',
          date_of_birth: formData.get('dateNaissance')
        })
      })

      const text = await response.text()
      
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        alert('❌ ERREUR: Le serveur Django ne répond pas. Redémarrez le backend !')
        return
      }

      const data = JSON.parse(text)

      if (response.ok) {
        alert('✅ INSCRIPTION RÉUSSIE ! Vous pouvez maintenant vous connecter.')
        if (formRef.current) {
          formRef.current.reset()
        }
        // Basculer automatiquement vers le mode connexion
        setIsLoginMode(true)
      } else {
        alert('❌ ERREUR: ' + (data.phone_number?.[0] || data.email?.[0] || 'Erreur inconnue'))
      }

    } catch (error: any) {
      alert('❌ ERREUR: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
}

// Fonctions utilitaires
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav')
  mobileNav?.classList.toggle('active')
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav')
  mobileNav?.classList.remove('active')
}
