'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function DashboardJeune() {
  const [activeTab, setActiveTab] = useState('personal')
  const [skills, setSkills] = useState(['Maçonnerie', 'Coffrage', 'Soudure', 'Électricité de base'])
  const [softSkills, setSoftSkills] = useState(['Travail en équipe', 'Ponctualité', 'Adaptabilité'])
  const [experiences, setExperiences] = useState([
    { title: 'Ouvrier en construction', company: 'Entreprise KABA & Fils', period: 'Mars 2023 - Septembre 2023', description: 'Participation à la construction de bâtiments résidentiels...' },
    { title: 'Stage en électricité', company: 'SOTELGUI (Stage)', period: 'Juillet 2022 - Septembre 2022', description: 'Stage de découverte des métiers de l\'électricité...' },
  ])
  const [documents, setDocuments] = useState([
    { name: 'Pièce d\'identité', status: '✅ Téléchargé', uploaded: true },
    { name: 'CV', status: '✅ cv_mamadou.pdf', uploaded: true },
    { name: 'Diplômes', status: '📤 Cliquez pour télécharger', uploaded: false },
    { name: 'Certificats', status: '📤 Cliquez pour télécharger', uploaded: false },
    { name: 'Attestations', status: '📤 Cliquez pour télécharger', uploaded: false },
    { name: 'Autres documents', status: '📤 Cliquez pour télécharger', uploaded: false },
  ])
  const [saveIndicator, setSaveIndicator] = useState(false)

  const addExperience = () => {
    setExperiences([...experiences, { title: '', company: '', period: '', description: '' }])
  }

  const saveExperience = (index: number, data: any) => {
    const newExperiences = [...experiences]
    newExperiences[index] = data
    setExperiences(newExperiences)
    setSaveIndicator(true)
    setTimeout(() => setSaveIndicator(false), 2000)
  }

  const addSkill = (value: string, isTechnical: boolean) => {
    if (value) {
      if (isTechnical) setSkills([...skills, value])
      else setSoftSkills([...softSkills, value])
      setSaveIndicator(true)
      setTimeout(() => setSaveIndicator(false), 2000)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const input = document.querySelector('input:focus')
        if (input?.id === 'skillInput') addSkill(input.value, true)
        if (input?.id === 'softSkillInput') addSkill(input.value, false)
        input!.value = ''
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [skills, softSkills])

  return (
    <div className="grid gap-6">
      <div className="profile-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="profile-sidebar space-y-6">
          <Card className="profile-card">
            <CardContent className="p-6">
              <div className="profile-photo-section text-center p-6 bg-gradient-to-br from-red-50 to-blue-50">
                <div className="profile-photo w-30 h-30 rounded-full mx-auto relative overflow-hidden border-4 border-white shadow-md">
                  <div className="photo-placeholder w-full h-full bg-gradient-to-br from-guinea-red to-guinea-green flex items-center justify-center text-4xl">
                    👨‍🎓
                  </div>
                </div>
                <Button className="photo-upload-btn mt-4 bg-guinea-red text-white rounded-full hover:bg-red-700">
                  📷 Changer la photo
                </Button>
              </div>
              <div className="stats-grid grid grid-cols-2 gap-4 p-4">
                <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
                  <span className="stat-number text-2xl font-bold text-guinea-red">8</span>
                  <span className="stat-label text-sm text-gray-600">Candidatures</span>
                </div>
                <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
                  <span className="stat-number text-2xl font-bold text-guinea-red">3</span>
                  <span className="stat-label text-sm text-gray-600">En cours</span>
                </div>
                <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
                  <span className="stat-number text-2xl font-bold text-guinea-red">4.2</span>
                  <span className="stat-label text-sm text-gray-600">Note moyenne</span>
                </div>
                <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
                  <span className="stat-number text-2xl font-bold text-guinea-red">2</span>
                  <span className="stat-label text-sm text-gray-600">Formations</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="profile-card">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-guinea-red flex items-center gap-2 mb-4">🏆 Mes badges</h4>
              <div className="badges-grid grid grid-cols-3 gap-2">
                {['Débutant', 'Profil Pro', 'Civique'].map((badge) => (
                  <Badge key={badge} className="badge-item earned bg-gradient-to-br from-yellow-400 to-yellow-200 text-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                    <span className="badge-icon">{badge === 'Débutant' ? '🚀' : badge === 'Profil Pro' ? '✅' : '🎓'}</span>
                    <span className="badge-name text-xs font-semibold">{badge}</span>
                  </Badge>
                ))}
                {['Actif', 'Employé', 'Expert'].map((badge) => (
                  <Badge key={badge} className="badge-item bg-gray-50 text-gray-600 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                    <span className="badge-icon">{badge === 'Actif' ? '📝' : badge === 'Employé' ? '💼' : '⭐'}</span>
                    <span className="badge-name text-xs font-semibold">{badge}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="profile-main col-span-2">
          <Card className="tabs-container">
            <CardContent>
              <div className="tabs-header flex bg-gray-50 border-b border-gray-200">
                {['personal', 'experience', 'skills', 'documents'].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? 'default' : 'ghost'}
                    className={cn(
                      'tab-button flex-1 p-4 font-semibold text-gray-600 hover:text-guinea-red transition-colors',
                      activeTab === tab && 'text-guinea-red border-b-2 border-guinea-red bg-white'
                    )}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'personal' && '👤 Informations personnelles'}
                    {tab === 'experience' && '💼 Expérience'}
                    {tab === 'skills' && '🎯 Compétences'}
                    {tab === 'documents' && '📄 Documents'}
                  </Button>
                ))}
              </div>
              <div className="tab-content p-6">
                {activeTab === 'personal' && (
                  <form id="personalForm" className="space-y-6">
                    <div className="form-section">
                      <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                        📋 Informations de base
                      </h3>
                      <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Nom', 'Prénom', 'Email', 'Téléphone', 'Date de naissance', 'Région'].map((field) => (
                          <div key={field} className="form-group">
                            <label className="block mb-2 font-semibold text-gray-700">{field}</label>
                            <input
                              type={field === 'Email' ? 'email' : field === 'Téléphone' ? 'tel' : field === 'Date de naissance' ? 'date' : 'text'}
                              defaultValue={field === 'Nom' ? 'DIALLO' : field === 'Prénom' ? 'Mamadou' : field === 'Email' ? 'mamadou.diallo@gmail.com' : field === 'Téléphone' ? '+224 628 12 34 56' : field === 'Date de naissance' ? '1998-03-15' : 'Kindia'}
                              readOnly={field === 'Nom' || field === 'Prénom' || field === 'Email' || field === 'Date de naissance'}
                              className="w-full p-3 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-guinea-red focus:bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="form-section">
                      <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                        🎓 Formation et aspirations
                      </h3>
                      <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Niveau d\'éducation', 'Secteur d\'intérêt principal', 'Disponibilité', 'Mobilité géographique'].map((field) => (
                          <div key={field} className="form-group">
                            <label className="block mb-2 font-semibold text-gray-700">{field}</label>
                            <select
                              defaultValue={field === 'Niveau d\'éducation' ? 'Lycée' : field === 'Secteur d\'intérêt principal' ? 'BTP & Construction' : field === 'Disponibilité' ? 'Immédiatement' : 'Dans ma région'}
                              className="w-full p-3 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-guinea-red focus:bg-white"
                            >
                              {field === 'Niveau d\'éducation' && (
                                <>
                                  <option value="Lycée">Lycée</option>
                                  <option value="Universitaire">Universitaire</option>
                                  <option value="Formation professionnelle">Formation professionnelle</option>
                                  <option value="Collège">Collège</option>
                                </>
                              )}
                              {field === 'Secteur d\'intérêt principal' && (
                                <>
                                  <option value="BTP & Construction">BTP & Construction</option>
                                  <option value="Agro-industrie">Agro-industrie</option>
                                  <option value="Services numériques">Services numériques</option>
                                  <option value="Logistique & Transport">Logistique & Transport</option>
                                  <option value="Maintenance industrielle">Maintenance industrielle</option>
                                </>
                              )}
                              {field === 'Disponibilité' && (
                                <>
                                  <option value="Immédiatement">Immédiatement</option>
                                  <option value="Dans 1 mois">Dans 1 mois</option>
                                  <option value="Dans 3 mois">Dans 3 mois</option>
                                  <option value="Flexible">Flexible</option>
                                </>
                              )}
                              {field === 'Mobilité géographique' && (
                                <>
                                  <option value="Dans ma région">Dans ma région</option>
                                  <option value="National">National</option>
                                  <option value="Limitée">Limitée</option>
                                </>
                              )}
                            </select>
                          </div>
                        ))}
                        <div className="form-group col-span-2">
                          <label className="block mb-2 font-semibold text-gray-700">Aspirations professionnelles</label>
                          <textarea
                            defaultValue="Je souhaite me spécialiser dans le BTP, particulièrement dans la construction d'infrastructures. Mon objectif est de devenir chef de chantier dans les 5 prochaines années."
                            className="w-full p-3 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-guinea-red focus:bg-white h-24 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="action-buttons flex gap-4 pt-4 border-t border-gray-200">
                      <Button className="btn btn-primary bg-guinea-red text-white hover:bg-red-700">
                        💾 Sauvegarder les modifications
                      </Button>
                      <Button variant="outline" className="btn btn-outline border-2 border-guinea-red text-guinea-red hover:bg-guinea-red hover:text-white">
                        🔄 Annuler
                      </Button>
                    </div>
                  </form>
                )}
                {activeTab === 'experience' && (
                  <div className="form-section space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                        💼 Expérience professionnelle
                      </h3>
                      <Button className="btn btn-primary bg-guinea-red text-white hover:bg-red-700" onClick={addExperience}>
                        ➕ Ajouter une expérience
                      </Button>
                    </div>
                    <div className="experience-timeline relative pl-8">
                      <div className="timeline-line absolute left-3 top-0 bottom-0 w-1 bg-gray-300"></div>
                      {experiences.map((exp, index) => (
                        <div key={index} className="experience-item bg-white border border-gray-300 rounded-lg p-4 mb-4 relative">
                          <div className="experience-header flex justify-between items-start mb-2">
                            <div>
                              <div className="experience-title font-semibold text-guinea-red">{exp.title || 'Nouveau poste'}</div>
                              <div className="experience-company text-gray-600">{exp.company || 'Entreprise'}</div>
                            </div>
                            <div className="experience-period text-sm text-gray-600 bg-gray-50 p-1 rounded-full">
                              {exp.period || 'Date à définir'}
                            </div>
                          </div>
                          <div className="experience-description text-gray-700">{exp.description || 'Description...'}</div>
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" className="btn btn-outline border-2 border-guinea-red text-guinea-red hover:bg-guinea-red hover:text-white p-1.5 text-sm">
                              ✏️ Modifier
                            </Button>
                            <Button variant="secondary" className="btn btn-secondary bg-gray-600 text-white p-1.5 text-sm">
                              🗑️ Supprimer
                            </Button>
                          </div>
                          {exp.title === '' && (
                            <>
                              <input
                                type="text"
                                placeholder="Titre du poste"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                onChange={(e) => {
                                  const newExp = [...experiences]
                                  newExp[index].title = e.target.value
                                  setExperiences(newExp)
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Entreprise"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                onChange={(e) => {
                                  const newExp = [...experiences]
                                  newExp[index].company = e.target.value
                                  setExperiences(newExp)
                                }}
                              />
                              <input
                                type="date"
                                placeholder="Date de début"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                onChange={(e) => {
                                  const newExp = [...experiences]
                                  newExp[index].period = e.target.value
                                  setExperiences(newExp)
                                }}
                              />
                              <textarea
                                placeholder="Description"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                onChange={(e) => {
                                  const newExp = [...experiences]
                                  newExp[index].description = e.target.value
                                  setExperiences(newExp)
                                }}
                              />
                              <div className="mt-2 flex gap-2">
                                <Button
                                  className="btn btn-primary bg-guinea-red text-white p-1.5 text-sm"
                                  onClick={() => saveExperience(index, experiences[index])}
                                >
                                  💾 Sauvegarder
                                </Button>
                                <Button
                                  variant="secondary"
                                  className="btn btn-secondary bg-gray-600 text-white p-1.5 text-sm"
                                  onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}
                                >
                                  ❌ Annuler
                                </Button>
                              </div>
                            </>
                          )}
                          <div className="absolute -left-10 top-4 w-3 h-3 bg-guinea-red rounded-full border-2 border-white"></div>
                        </div>
                      ))}
                      <div className="experience-item border-2 border-dashed border-guinea-red bg-red-50 text-center p-4">
                        <div className="text-3xl mb-2">➕</div>
                        <div className="font-semibold text-guinea-red mb-1">Ajouter une nouvelle expérience</div>
                        <div className="text-sm text-gray-600">Même les expériences informelles comptent !</div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'skills' && (
                  <div className="form-section space-y-6">
                    <div>
                      <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                        🎯 Compétences techniques
                      </h3>
                      <div className="skills-input flex flex-wrap gap-2 p-4 border-2 border-gray-300 rounded-xl bg-gray-50 min-h-[120px]">
                        {skills.map((skill) => (
                          <div key={skill} className="skill-tag bg-gradient-to-br from-guinea-red to-guinea-green text-white p-2 rounded-full flex items-center gap-2">
                            {skill}
                            <button
                              className="skill-remove text-white"
                              onClick={() => setSkills(skills.filter((s) => s !== skill))}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          id="skillInput"
                          placeholder="Tapez une compétence et appuyez sur Entrée..."
                          className="skill-input-field flex-1 p-2 border-none bg-transparent outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && addSkill(e.currentTarget.value, true)}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">💡 Ajoutez vos compétences techniques, logiciels maîtrisés, certifications...</p>
                    </div>
                    <div>
                      <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                        💪 Compétences comportementales
                      </h3>
                      <div className="skills-input flex flex-wrap gap-2 p-4 border-2 border-gray-300 rounded-xl bg-gray-50 min-h-[120px]">
                        {softSkills.map((skill) => (
                          <div key={skill} className="skill-tag bg-gradient-to-br from-guinea-green to-green-400 text-white p-2 rounded-full flex items-center gap-2">
                            {skill}
                            <button
                              className="skill-remove text-white"
                              onClick={() => setSoftSkills(softSkills.filter((s) => s !== skill))}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          id="softSkillInput"
                          placeholder="Tapez une compétence comportementale..."
                          className="skill-input-field flex-1 p-2 border-none bg-transparent outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && addSkill(e.currentTarget.value, false)}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                        🗣️ Langues
                      </h3>
                      <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Français', 'Anglais', 'Langue nationale principale', 'Autres langues'].map((field) => (
                          <div key={field} className="form-group">
                            <label className="block mb-2 font-semibold text-gray-700">{field}</label>
                            <select
                              defaultValue={
                                field === 'Français' ? 'Courant' :
                                field === 'Anglais' ? 'Débutant' :
                                field === 'Langue nationale principale' ? 'Malinké' : ''
                              }
                              className="w-full p-3 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-guinea-red focus:bg-white"
                            >
                              {field === 'Français' && (
                                <>
                                  <option value="Natif">Natif</option>
                                  <option value="Courant">Courant</option>
                                  <option value="Intermédiaire">Intermédiaire</option>
                                  <option value="Débutant">Débutant</option>
                                </>
                              )}
                              {field === 'Anglais' && (
                                <>
                                  <option value="Natif">Natif</option>
                                  <option value="Courant">Courant</option>
                                  <option value="Intermédiaire">Intermédiaire</option>
                                  <option value="Débutant">Débutant</option>
                                </>
                              )}
                              {field === 'Langue nationale principale' && (
                                <>
                                  <option value="Malinké">Malinké</option>
                                  <option value="Soussou">Soussou</option>
                                  <option value="Poular">Poular</option>
                                  <option value="Guerzé">Guerzé</option>
                                  <option value="Toma">Toma</option>
                                  <option value="Kissi">Kissi</option>
                                </>
                              )}
                              {field === 'Autres langues' && <option value="">Arabe, Espagnol...</option>}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="action-buttons flex gap-4 pt-4 border-t border-gray-200">
                      <Button className="btn btn-primary bg-guinea-red text-white hover:bg-red-700">
                        💾 Sauvegarder les compétences
                      </Button>
                    </div>
                  </div>
                )}
                {activeTab === 'documents' && (
                  <div className="form-section space-y-6">
                    <h3 className="section-title text-xl font-semibold text-guinea-red flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                      📄 Mes documents
                    </h3>
                    <div className="documents-section bg-gray-50 border border-gray-300 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Téléchargez vos documents pour améliorer votre profil et augmenter vos chances de recrutement.
                      </p>
                      <div className="documents-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {documents.map((doc, index) => (
                          <div
                            key={index}
                            className={cn(
                              'document-card p-4 text-center rounded-lg border border-gray-300 cursor-pointer hover:border-guinea-red hover:shadow-md transition-all',
                              doc.uploaded && 'uploaded bg-green-50 border-green-300'
                            )}
                          >
                            {doc.uploaded && (
                              <div className="document-actions absolute top-2 right-2 flex gap-1">
                                <Button variant="ghost" size="sm" className="btn-view bg-blue-500 text-white rounded-full p-1">
                                  👁️
                                </Button>
                                <Button variant="ghost" size="sm" className="btn-delete bg-red-500 text-white rounded-full p-1">
                                  🗑️
                                </Button>
                              </div>
                            )}
                            <span className="document-icon text-3xl mb-2 block">
                              {doc.name === 'Pièce d\'identité' && '🆔'}
                              {doc.name === 'CV' && '📋'}
                              {doc.name === 'Diplômes' && '🎓'}
                              {doc.name === 'Certificats' && '🏆'}
                              {doc.name === 'Attestations' && '📜'}
                              {doc.name === 'Autres documents' && '📁'}
                            </span>
                            <div className="document-name font-semibold">{doc.name}</div>
                            <div className="document-status text-sm text-gray-600">{doc.status}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-4">
                        <h4 className="text-green-800 font-semibold flex items-center gap-2 mb-2">💡 Conseils pour vos documents</h4>
                        <ul className="text-green-800 text-sm list-disc pl-5">
                          <li>Formats acceptés : PDF, JPG, PNG, DOC, DOCX</li>
                          <li>Taille maximum : 10MB par fichier</li>
                          <li>Assurez-vous que vos documents sont lisibles</li>
                          <li>Un CV à jour augmente vos chances de 70%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {saveIndicator && (
        <div className="save-indicator fixed bottom-5 right-5 bg-guinea-green text-white p-3 rounded-full flex items-center gap-2 shadow-lg z-50">
          <span>💾</span>
          <span>Modifications sauvegardées automatiquement</span>
        </div>
      )}
    </div>
  )
}