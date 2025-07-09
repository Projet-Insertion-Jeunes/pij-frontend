const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface FichierInterface {
 id: string
 nom: string
 taille: number
 type: string
 url: string
 dateUpload: string
 estPublic: boolean
 proprietaire: string
}

export interface ProgressionUploadInterface {
 progression: number
 vitesse: number
 tempsRestant: number
 estTermine: boolean
 erreur?: string
}

class ServiceFichiers {
 private baseURL = `${API_BASE_URL}/fichiers`

 private obtenirToken(): string | null {
   return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
 }

 private obtenirEntetes(): HeadersInit {
   const token = this.obtenirToken()
   return {
     'Authorization': `Bearer ${token}`
   }
 }

 async uploaderFichier(
   fichier: File,
   dossier: string = 'general',
   onProgression?: (progression: ProgressionUploadInterface) => void
 ): Promise<FichierInterface> {
   return new Promise((resolve, reject) => {
     const formData = new FormData()
     formData.append('fichier', fichier)
     formData.append('dossier', dossier)

     const xhr = new XMLHttpRequest()
     const debutUpload = Date.now()

     // Gestion de la progression
     xhr.upload.addEventListener('progress', (event) => {
       if (event.lengthComputable && onProgression) {
         const tempsEcoule = (Date.now() - debutUpload) / 1000
         const vitesse = event.loaded / tempsEcoule // bytes/sec
         const tempsRestant = (event.total - event.loaded) / vitesse
         
         onProgression({
           progression: Math.round((event.loaded / event.total) * 100),
           vitesse: Math.round(vitesse / 1024), // KB/s
           tempsRestant: Math.round(tempsRestant),
           estTermine: false
         })
       }
     })

     // Gestion de la réponse
     xhr.addEventListener('load', () => {
       if (xhr.status === 200 || xhr.status === 201) {
         try {
           const response = JSON.parse(xhr.responseText)
           if (onProgression) {
             onProgression({
               progression: 100,
               vitesse: 0,
               tempsRestant: 0,
               estTermine: true
             })
           }
           resolve(response)
         } catch (error) {
           reject(new Error('Erreur de parsing de la réponse'))
         }
       } else {
         const erreur = xhr.responseText || 'Erreur lors de l\'upload'
         reject(new Error(erreur))
       }
     })

     // Gestion des erreurs
     xhr.addEventListener('error', () => {
       reject(new Error('Erreur réseau lors de l\'upload'))
     })

     xhr.addEventListener('abort', () => {
       reject(new Error('Upload annulé'))
     })

     // Configuration de la requête
     xhr.open('POST', `${this.baseURL}/upload/`)
     
     const token = this.obtenirToken()
     if (token) {
       xhr.setRequestHeader('Authorization', `Bearer ${token}`)
     }

     // Envoi
     xhr.send(formData)
   })
 }

 async uploaderMultiplesFichiers(
   fichiers: FileList | File[],
   dossier: string = 'general',
   onProgressionGlobale?: (progression: number, fichierActuel: string) => void
 ): Promise<FichierInterface[]> {
   const resultats: FichierInterface[] = []
   const fichiersArray = Array.from(fichiers)
   
   for (let i = 0; i < fichiersArray.length; i++) {
     const fichier = fichiersArray[i]
     
     try {
       const resultat = await this.uploaderFichier(
         fichier,
         dossier,
         (progression) => {
           if (onProgressionGlobale) {
             const progressionGlobale = Math.round(
               ((i * 100) + progression.progression) / fichiersArray.length
             )
             onProgressionGlobale(progressionGlobale, fichier.name)
           }
         }
       )
       resultats.push(resultat)
     } catch (error) {
       console.error(`Erreur upload ${fichier.name}:`, error)
       throw error
     }
   }
   
   return resultats
 }

 async obtenirMesFichiers(dossier?: string): Promise<FichierInterface[]> {
   const params = new URLSearchParams()
   if (dossier) params.append('dossier', dossier)

   const response = await fetch(`${this.baseURL}/?${params}`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du chargement des fichiers')
   }

   return await response.json()
 }

 async supprimerFichier(fichierId: string): Promise<void> {
   const response = await fetch(`${this.baseURL}/${fichierId}/`, {
     method: 'DELETE',
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors de la suppression')
   }
 }

 async telechargerFichier(fichierId: string, nom?: string): Promise<void> {
   const response = await fetch(`${this.baseURL}/${fichierId}/download/`, {
     headers: this.obtenirEntetes()
   })

   if (!response.ok) {
     throw new Error('Erreur lors du téléchargement')
   }

   const blob = await response.blob()
   const url = window.URL.createObjectURL(blob)
   const a = document.createElement('a')
   a.href = url
   a.download = nom || 'fichier'
   document.body.appendChild(a)
   a.click()
   document.body.removeChild(a)
   window.URL.revokeObjectURL(url)
 }

 validerFichier(fichier: File, options: {
   tailleMax?: number // en MB
   typesAutorises?: string[]
   extensionsAutorisees?: string[]
 } = {}): { valide: boolean; erreur?: string } {
   const {
     tailleMax = 10, // 10MB par défaut
     typesAutorises = [],
     extensionsAutorisees = []
   } = options

   // Vérification de la taille
   const tailleMB = fichier.size / (1024 * 1024)
   if (tailleMB > tailleMax) {
     return {
       valide: false,
       erreur: `Le fichier est trop volumineux (${tailleMB.toFixed(1)}MB). Taille maximum : ${tailleMax}MB`
     }
   }

   // Vérification du type MIME
   if (typesAutorises.length > 0 && !typesAutorises.includes(fichier.type)) {
     return {
       valide: false,
       erreur: `Type de fichier non autorisé : ${fichier.type}`
     }
   }

   // Vérification de l'extension
   if (extensionsAutorisees.length > 0) {
     const extension = fichier.name.split('.').pop()?.toLowerCase()
     if (!extension || !extensionsAutorisees.includes(extension)) {
       return {
         valide: false,
         erreur: `Extension de fichier non autorisée : .${extension}`
       }
     }
   }

   return { valide: true }
 }

 formaterTaille(bytes: number): string {
   const sizes = ['Bytes', 'KB', 'MB', 'GB']
   if (bytes === 0) return '0 Bytes'
   
   const i = Math.floor(Math.log(bytes) / Math.log(1024))
   return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
 }

 obtenirIconeFichier(type: string): string {
   const iconesTypes: Record<string, string> = {
     'application/pdf': '📄',
     'application/msword': '📝',
     'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
     'application/vnd.ms-excel': '📊',
     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
     'application/vnd.ms-powerpoint': '📈',
     'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📈',
     'image/jpeg': '🖼️',
     'image/png': '🖼️',
     'image/gif': '🖼️',
     'image/svg+xml': '🖼️',
     'video/mp4': '🎥',
     'video/mpeg': '🎥',
     'audio/mpeg': '🎵',
     'audio/wav': '🎵',
     'application/zip': '🗜️',
     'application/x-rar-compressed': '🗜️',
     'text/plain': '📄',
     'text/csv': '📊'
   }

   return iconesTypes[type] || '📁'
 }
}

export const serviceFichiers = new ServiceFichiers()
