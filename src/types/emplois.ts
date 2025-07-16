export interface OffreEmploiInterface {
 id: string
 titre: string
 description: string
 competencesRequises: string
 typeOffre: 'emploi' | 'stage' | 'formation' | 'apprentissage'
 typeContrat: 'cdi' | 'cdd' | 'stage' | 'freelance' | 'apprentissage'
 categorie: string
 categorieNom: string
 region: string
 ville: string
 adresse: string
 travailDistance: boolean
 salaireMin: number | null
 salaireMax: number | null
 devise: string
 niveauExperience: string
 niveauEtude: string
 dateCreation: string
 dateExpiration: string
 estActive: boolean
 nombrePostes: number
 nombreCandidatures: number
 nombreVues: number
 entrepriseNom: string
 competences: CompetenceRequiseInterface[]
 avantages: AvantageOffreInterface[]
 estExpiree: boolean
}

export interface CompetenceRequiseInterface {
 id: string
 nom: string
 niveauRequis: 'debutant' | 'intermediaire' | 'avance' | 'expert'
 estObligatoire: boolean
}

export interface AvantageOffreInterface {
 id: string
 titre: string
 description: string
 icone: string
}

export interface CategorieEmploiInterface {
 id: string
 nom: string
 description: string
 icone: string
 couleur: string
}

export interface FiltresOffreInterface {
 typeOffre?: string
 typeContrat?: string
 region?: string
 niveauExperience?: string
 niveauEtude?: string
 categorie?: string
 salaireMin?: number
 salaireMax?: number
 travailDistance?: boolean
 recherche?: string
}

export interface StatistiquesEmploisInterface {
 totalOffresActives: number
 offresParType: Record<string, { label: string; count: number }>
 offresParRegion: Record<string, { label: string; count: number }>
 entreprisesActives: number
}
