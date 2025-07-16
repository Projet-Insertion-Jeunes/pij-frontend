'use client'

import { useState } from 'react'
import { Formation } from '../../types/formations'

interface FormationHistoryProps {
  formations: Formation[]
  onUpdateFormations: (formations: Formation[]) => void
}

export default function FormationHistory({ formations, onUpdateFormations }: FormationHistoryProps) {
  const [filter, setFilter] = useState<string>('all')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#009460'
      case 'in_progress': return '#FCD116'
      case 'planned': return '#666'
      default: return '#666'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé'
      case 'in_progress': return 'En cours'
      case 'planned': return 'Planifié'
      default: return 'Inconnu'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'parcours': return '🎯'
      case 'technique': return '🔧'
      case 'certification': return '🏆'
      case 'module': return '📚'
      default: return '📖'
    }
  }

  const filteredFormations = filter === 'all' 
    ? formations 
    : formations.filter(f => f.type === filter)

  return (
    <div className="form-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title">🎓 Historique des formations</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Toutes les formations</option>
            <option value="parcours">Parcours Simandou</option>
            <option value="technique">Formations techniques</option>
            <option value="certification">Certifications</option>
            <option value="module">Modules complémentaires</option>
          </select>
        </div>
      </div>

      <div className="formations-timeline">
        <div className="timeline-line"></div>
        
        {filteredFormations.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px dashed #ddd'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
            <h4>Aucune formation trouvée</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              {filter === 'all' 
                ? 'Votre historique de formations apparaîtra ici au fur et à mesure de vos parcours.'
                : 'Aucune formation de ce type dans votre historique.'
              }
            </p>
          </div>
        ) : (
          filteredFormations.map((formation) => (
            <div key={formation.id} className="experience-item">
              <div className="experience-header">
                <div>
                  <div className="experience-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {getTypeIcon(formation.type)} {formation.title}
                  </div>
                  <div className="experience-company">{formation.institution}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                  <div className="experience-period">
                    {formatDate(formation.startDate)} - {formation.endDate ? formatDate(formation.endDate) : 'En cours'}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'white',
                    backgroundColor: getStatusColor(formation.status)
                  }}>
                    {getStatusText(formation.status)}
                  </div>
                </div>
              </div>
              
              <div className="experience-description">
                {formation.description}
              </div>
              
              {formation.certificate && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  backgroundColor: '#f0f9f0', 
                  border: '1px solid #c3e6cb',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}>
                  <strong>🏆 Certificat obtenu : </strong>{formation.certificate}
                </div>
              )}
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  👁️ Voir détails
                </button>
                {formation.certificate && (
                  <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    📄 Télécharger certificat
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistiques des formations */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '10px',
        border: '1px solid #e1e1e1'
      }}>
        <h4 style={{ color: '#CE1126', marginBottom: '15px' }}>📊 Statistiques de formation</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#009460' }}>
              {formations.filter(f => f.status === 'completed').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Formations terminées</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD116' }}>
              {formations.filter(f => f.status === 'in_progress').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>En cours</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#CE1126' }}>
              {formations.filter(f => f.type === 'parcours').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Parcours Simandou</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
              {formations.filter(f => f.certificate).length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Certificats obtenus</div>
          </div>
        </div>
      </div>
    </div>
  )
} 