'use client'
import { useState, useRef, useCallback } from 'react'
import { Upload, X, Check, AlertCircle, File, Trash2 } from 'lucide-react'
import { serviceFichiers, type FichierInterface, type ProgressionUploadInterface } from '@/services/fichiers'

interface UploadFichierProps {
  dossier?: string
  multiple?: boolean
  tailleMax?: number // en MB
  typesAutorises?: string[]
  extensionsAutorisees?: string[]
  onUploadTermine?: (fichiers: FichierInterface[]) => void
  onErreur?: (erreur: string) => void
  className?: string
}

export function UploadFichier({
  dossier = 'general',
  multiple = false,
  tailleMax = 10,
  typesAutorises = [],
  extensionsAutorisees = [],
  onUploadTermine,
  onErreur,
  className = ''
}: UploadFichierProps) {
  const [fichiers, setFichiers] = useState<File[]>([])
  const [fichiersUploades, setFichiersUploades] = useState<FichierInterface[]>([])
  const [progression, setProgression] = useState<Record<string, ProgressionUploadInterface>>({})
  const [enCoursUpload, setEnCoursUpload] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const gererSelectionFichier = (nouveauxFichiers: FileList | null) => {
    if (!nouveauxFichiers) return

    const fichiersArray = Array.from(nouveauxFichiers)
    const fichiersValides: File[] = []
    const erreurs: string[] = []

    fichiersArray.forEach(fichier => {
      const validation = serviceFichiers.validerFichier(fichier, {
        tailleMax,
        typesAutorises,
        extensionsAutorisees
      })

      if (validation.valide) {
        fichiersValides.push(fichier)
      } else {
        erreurs.push(`${fichier.name}: ${validation.erreur}`)
      }
    })

    if (erreurs.length > 0) {
      onErreur?.(erreurs.join('\n'))
    }

    if (multiple) {
      setFichiers(prev => [...prev, ...fichiersValides])
    } else {
      setFichiers(fichiersValides.slice(0, 1))
    }
  }

  const supprimerFichier = (index: number) => {
    setFichiers(prev => prev.filter((_, i) => i !== index))
  }

  const commencerUpload = async () => {
    if (fichiers.length === 0) return

    setEnCoursUpload(true)
    const nouveauxFichiersUploades: FichierInterface[] = []

    try {
      for (const fichier of fichiers) {
        const fichierUploade = await serviceFichiers.uploaderFichier(
          fichier,
          dossier,
          (prog) => {
            setProgression(prev => ({
              ...prev,
              [fichier.name]: prog
            }))
          }
        )
        nouveauxFichiersUploades.push(fichierUploade)
      }

      setFichiersUploades(prev => [...prev, ...nouveauxFichiersUploades])
      setFichiers([])
      setProgression({})
      onUploadTermine?.(nouveauxFichiersUploades)
    } catch (error) {
      onErreur?.(error instanceof Error ? error.message : 'Erreur d\'upload')
    } finally {
      setEnCoursUpload(false)
    }
  }

  const gererDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    gererSelectionFichier(e.dataTransfer.files)
  }, [])

  const gererDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const gererDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone de drop */}
      <div
        onDrop={gererDrop}
        onDragOver={gererDragOver}
        onDragLeave={gererDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-guinea-red bg-guinea-red/5'
            : 'border-gray-300 hover:border-guinea-red hover:bg-gray-50'
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-dark-gray mb-2">
          {multiple ? 'Glissez vos fichiers ici' : 'Glissez votre fichier ici'}
        </h3>
        <p className="text-text-gray mb-4">
          ou cliquez pour sélectionner {multiple ? 'des fichiers' : 'un fichier'}
        </p>
        <div className="text-sm text-text-gray">
          <p>Taille max: {tailleMax}MB</p>
          {extensionsAutorisees.length > 0 && (
            <p>Formats: {extensionsAutorisees.join(', ')}</p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={typesAutorises.join(',')}
        onChange={(e) => gererSelectionFichier(e.target.files)}
        className="hidden"
      />

      {/* Liste des fichiers sélectionnés */}
      {fichiers.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-dark-gray">Fichiers sélectionnés:</h4>
          {fichiers.map((fichier, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {serviceFichiers.obtenirIconeFichier(fichier.type)}
                </span>
                <div>
                  <p className="font-medium text-sm">{fichier.name}</p>
                  <p className="text-xs text-text-gray">
                    {serviceFichiers.formaterTaille(fichier.size)}
                  </p>
                </div>
              </div>
              
              {progression[fichier.name] ? (
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-guinea-red h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progression[fichier.name].progression}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-gray">
                    {progression[fichier.name].progression}%
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => supprimerFichier(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  disabled={enCoursUpload}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          
          <button
            onClick={commencerUpload}
            disabled={enCoursUpload || fichiers.length === 0}
            className="w-full bg-guinea-red text-white py-3 rounded-lg hover:bg-secondary-red disabled:opacity-50 transition-colors font-medium"
          >
            {enCoursUpload ? 'Upload en cours...' : `Uploader ${fichiers.length} fichier${fichiers.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {/* Fichiers uploadés avec succès */}
      {fichiersUploades.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-green-600 flex items-center gap-2">
            <Check className="h-4 w-4" />
            Fichiers uploadés avec succès:
          </h4>
          {fichiersUploades.map((fichier) => (
            <div key={fichier.id} className="flex items-center justify-between bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {serviceFichiers.obtenirIconeFichier(fichier.type)}
                </span>
                <div>
                  <p className="font-medium text-sm">{fichier.nom}</p>
                  <p className="text-xs text-text-gray">
                    {serviceFichiers.formaterTaille(fichier.taille)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600">Uploadé</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
