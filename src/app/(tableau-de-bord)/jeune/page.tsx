'use client'
import { useState, useEffect } from 'react'
import { CarteStatistique } from '@/composants/ui/CarteStatistique'
import { GraphiqueProgression } from '@/composants/ui/GraphiqueProgression'
import { ListeCandidatures } from '@/composants/tableau-de-bord/ListeCandidatures'
import { ListeFormations } from '@/composants/tableau-de-bord/ListeFormations'
import { AlertesNotifications } from '@/composants/ui/AlertesNotifications'
import { StatistiquesJeuneInterface } from '@/types/dashboard-jeune'
import { User, BookOpen, TrendingUp, Award, Briefcase, Calendar } from 'lucide-react'

export default function DashboardJeune() {
  const [statistiques, setStatistiques] = useState<StatistiquesJeuneInterface | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setStatistiques({
        nombreCandidatures: 8,
        nombreEntretiens: 3,
        tauxReussite: 75,
        scoreGlobal: 4.2,
        nombreFormations: 2,
        nombreCertifications: 1
      })
      setChargement(false)
    }, 1000)
  }, [])

  if (chargement) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-guinea-red"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-guinea-red to-guinea-yellow rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Bonjour, Mamadou ! 👋</h1>
        <p className="text-white/90">
          Bienvenue sur votre tableau de bord. Suivez votre progression et découvrez de nouvelles opportunités.
        </p>
      </div>

      {/* Alertes et notifications */}
      <AlertesNotifications />

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CarteStatistique
          titre="Candidatures"
          valeur={statistiques?.nombreCandidatures.toString() || '0'}
          changement="+2 cette semaine"
          tendancePositive={true}
          icone={<Briefcase className="h-8 w-8" />}
          couleur="guinea-red"
        />
        <CarteStatistique
          titre="Score Global"
          valeur={`${statistiques?.scoreGlobal}/5`}
          changement="+0.3 ce mois"
          tendancePositive={true}
          icone={<Award className="h-8 w-8" />}
          couleur="guinea-yellow"
        />
        <CarteStatistique
          titre="Formations"
          valeur={statistiques?.nombreFormations.toString() || '0'}
          changement="Parcours B terminé"
          tendancePositive={true}
          icone={<BookOpen className="h-8 w-8" />}
          couleur="guinea-green"
        />
      </div>

      {/* Graphique de progression */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-guinea-red" />
          Votre Progression
        </h2>
        <GraphiqueProgression />
      </div>

      {/* Contenu principal en deux colonnes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Candidatures récentes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-guinea-red" />
            Candidatures Récentes
          </h2>
          <ListeCandidatures limite={5} />
        </div>

        {/* Formations en cours */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-guinea-green" />
            Formations en Cours
          </h2>
          <ListeFormations limite={3} />
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-dark-gray mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-guinea-red/30 rounded-lg hover:border-guinea-red/60 hover:bg-guinea-red/5 transition-all duration-200 text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-medium text-dark-gray">Postuler à une offre</div>
            <div className="text-sm text-text-gray">Trouvez votre prochaine opportunité</div>
          </button>
          
          <button className="p-4 border-2 border-dashed border-guinea-yellow/30 rounded-lg hover:border-guinea-yellow/60 hover:bg-guinea-yellow/5 transition-all duration-200 text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-medium text-dark-gray">S'inscrire à une formation</div>
            <div className="text-sm text-text-gray">Développez vos compétences</div>
          </button>
          
          <button className="p-4 border-2 border-dashed border-guinea-green/30 rounded-lg hover:border-guinea-green/60 hover:bg-guinea-green/5 transition-all duration-200 text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-medium text-dark-gray">Mettre à jour le profil</div>
            <div className="text-sm text-text-gray">Optimisez votre visibilité</div>
          </button>
        </div>
      </div>
    </div>
  )
}
