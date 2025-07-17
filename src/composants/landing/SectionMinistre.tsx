export function SectionMinistre() {
  return (
    <section className="ministre-section" id="ministre">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Message du Ministre</h2>
          <p style={{fontSize: '1.1rem', color: 'var(--text-gray)', maxWidth: '800px', margin: '0 auto'}}>
            Keamou Bogola Haba, Ministre de la Jeunesse et des Sports, présente le projet Simandou 2040
          </p>
        </div>

        <div className="ministre-card">
          <div className="ministre-header">
            <div className="ministre-avatar">
              <div className="ministry-logo">MJS</div>
            </div>
            <div className="ministre-info">
              <h3 className="ministre-name">Keamou Bogola Haba</h3>
              <p className="ministre-title">Ministre de la Jeunesse et des Sports</p>
              <p className="ministre-context">République de Guinée</p>
            </div>
          </div>
          
          <blockquote className="ministre-quote">
            <p className="quote-text">
              "Le projet Simandou 2040 représente une opportunité historique pour la jeunesse guinéenne. 
              Cette plateforme d'insertion professionnelle s'inscrit dans notre vision de développement durable 
              et d'autonomisation des jeunes."
            </p>
            <p className="quote-continuation">
              En rejoignant cette initiative, vous participez activement à la construction d'une Guinée prospère 
              et moderne, où chaque jeune trouve sa place dans l'économie nationale. 
              <strong> Ensemble, construisons l'avenir de notre pays !</strong>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
} 