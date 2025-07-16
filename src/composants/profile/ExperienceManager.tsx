'use client'

import { useState } from 'react'

interface Experience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceManagerProps {
  experiences: Experience[]
  onUpdateExperiences: (experiences: Experience[]) => void
}

export default function ExperienceManager({ experiences, onUpdateExperiences }: ExperienceManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({})

  const handleAddExperience = () => {
    const id = Date.now().toString()
    setEditingId(id)
    setNewExperience({
      id,
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  const handleSaveExperience = () => {
    if (newExperience.title && newExperience.company) {
      const updatedExperiences = [...experiences, newExperience as Experience]
      onUpdateExperiences(updatedExperiences)
      setEditingId(null)
      setNewExperience({})
    } else {
      alert('Veuillez remplir au moins le titre du poste et l\'entreprise')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setNewExperience({})
  }

  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id)
    onUpdateExperiences(updatedExperiences)
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    if (!startDate) return ''
    const start = new Date(startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    const end = endDate ? new Date(endDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Présent'
    return `${start} - ${end}`
  }

  return (
    <div className="form-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title">💼 Expérience professionnelle</h3>
        <button className="btn btn-primary" onClick={handleAddExperience}>
          ➕ Ajouter une expérience
        </button>
      </div>

      <div className="experience-timeline">
        <div className="timeline-line"></div>

        {experiences.map((experience) => (
          <div key={experience.id} className="experience-item">
            <div className="experience-header">
              <div>
                <div className="experience-title">{experience.title}</div>
                <div className="experience-company">{experience.company}</div>
              </div>
              <div className="experience-period">
                {formatDateRange(experience.startDate, experience.endDate)}
              </div>
            </div>
            <div className="experience-description">{experience.description}</div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                ✏️ Modifier
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => handleDeleteExperience(experience.id)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}

        {editingId && (
          <div className="experience-item" style={{ background: '#f8f9fa', border: '2px dashed #CE1126' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Titre du poste"
                value={newExperience.title || ''}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <input
                type="text"
                placeholder="Entreprise"
                value={newExperience.company || ''}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <input
                type="date"
                placeholder="Date de début"
                value={newExperience.startDate || ''}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <input
                type="date"
                placeholder="Date de fin"
                value={newExperience.endDate || ''}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              />
            </div>
            <textarea
              placeholder="Description de vos missions et réalisations..."
              rows={3}
              value={newExperience.description || ''}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                marginBottom: '15px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-primary" 
                style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                onClick={handleSaveExperience}
              >
                💾 Sauvegarder
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                onClick={handleCancelEdit}
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        )}

        <div className="experience-item" style={{ border: '2px dashed #CE1126', background: '#fef9f9' }}>
          <div style={{ textAlign: 'center', color: '#CE1126', padding: '20px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>➕</div>
            <div style={{ fontWeight: 600, marginBottom: '5px' }}>Ajouter une nouvelle expérience</div>
            <div style={{ fontSize: '0.9rem' }}>Même les expériences informelles comptent !</div>
          </div>
        </div>
      </div>
    </div>
  )
} 