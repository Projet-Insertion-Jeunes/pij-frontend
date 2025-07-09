'use client'
import { useState, useEffect } from 'react'
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar,
  Eye,
  Clock,
  Star,
  AlertCircle,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { DashboardEntrepriseInterface, CandidaturesATraiterInterface } from '@/types/dashboard-entreprise'
import { serviceDashboardEntreprise } from '@/services/dashboard-entreprise'
import { CarteStatistique } from '@/composants/ui/CarteStatistique'
import { GraphiqueEvolution } from '@/composants/dashboard/GraphiqueEvolution'
import { TableauCandidaturesRecentes } from '@/composants/dashboard/TableauCandidaturesRecentes'

export default function DashboardEntreprise() {
  const [dashboard, setDashboard] = useState<DashboardEntrepriseInterface | null>(null)
  const [candidaturesATraiter, setCandidaturesATraiter] = useState<CandidaturesATraiterInterface | null>(null)
  const [chargement, setChargement] = useState(true)

  const chargerDonnees = async () => {
    setChargement(true)
    try {
      const [dashboardData, candidaturesData] = await Promise.all([
        serviceDashboardEntreprise.obtenirDashboard(),
        serviceDashboardEntreprise.obtenirCandidaturesATraiter()
      ])
      setDashboard(dashboardData)
      setCandidaturesATraiter(candidaturesData)
    } catch (error) {
      console.error('Erreur chargement dashboard:', error)
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => {
    chargerDonnees()
  }, [])

  if (chargement) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-guinea-red"></div>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="text-center py-12">
        <p className="text-text-gray">Erreur lors du chargement du dashboard</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-guinea-red to-guinea-yellow rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Tableau de Bord Entreprise 🏢</h1>
        <p className="text-white/90">
          Gérez vos offres, suivez vos candidatures et analysez vos performances de recrutement
        </p>
      </div>

      {/* Alertes et actions prioritaires */}
      {candidaturesATraiter && candidaturesATraiter.resume.totalATraiter > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-orange-800">
              Actions requises ({candidaturesATraiter.resume.totalATraiter})
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {candidaturesATraiter.resume.nonVuesCount > 0 && (
              <Link 
                href="/tableau-de-bord/entreprise/candidatures?filtre=non_vues"
                className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {candidaturesATraiter.resume.nonVuesCount}
                    </div>
                    <div className="text-sm text-orange-700">Candidatures non vues</div>
                  </div>
                  <Eye className="h-8 w-8 text-orange-500" />
                </div>
              </Link>
            )}
            
            {candidaturesATraiter.resume.sansReponseCount > 0 && (
              <Link 
                href="/tableau-de-bord/entreprise/candidatures?filtre=sans_reponse"
                className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {candidaturesATraiter.resume.sansReponseCount}
                    </div>
                    <div className="text-sm text-orange-700">Sans réponse (>7j)</div>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </Link>
            )}
            
            {candidaturesATraiter.resume.entretiensCount > 0 && (
              <Link 
                href="/tableau-de-bord/entreprise/entretiens"
                className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {candidaturesATraiter.resume.entretiensCount}
                    </div>
                    <div className="text-sm text-orange-700">Entretiens à programmer</div>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatistique
          titre="Offres Actives"
          valeur={dashboard.statistiquesGenerales.offresActives.toString()}
          changement={`${dashboard.statistiquesGenerales.candidaturesCetteSemaine} candidatures cette semaine`}
          tendancePositive={dashboard.statistiquesGenerales.candidaturesCetteSemaine > 0}
          icone={<Briefcase className="h-8 w-8" />}
          couleur="guinea-red"
        />
        
        <CarteStatistique
          titre="Candidatures"
          valeur={dashboard.statistiquesGenerales.totalCandidatures.toString()}
          changement={`+${dashboard.statistiquesGenerales.candidaturesCeMois} ce mois`}
          tendancePositive={dashboard.statistiquesGenerales.candidaturesCeMois > 0}
          icone={<Users className="h-8 w-8" />}
          couleur="guinea-yellow"
        />
        
        <CarteStatistique
          titre="Taux de Conversion"
          valeur={`${dashboard.performance.tauxConversion}%`}
          changement={`${dashboard.performance.candidaturesAcceptees} embauches`}
          tendancePositive={dashboard.performance.tauxConversion > 10}
          icone={<TrendingUp className="h-8 w-8" />}
          couleur="guinea-green"
        />
        
        <CarteStatistique
          titre="Temps de Réponse"
          valeur={`${dashboard.performance.tempsMoyenReponse}j`}
          changement={dashboard.performance.tempsMoyenReponse <= 7 ? "Excellent" : "À améliorer"}
          tendancePositive={dashboard.performance.tempsMoyenReponse <= 7}
          icone={<Clock className="h-8 w-8" />}
          couleur="guinea-red"
        />
      </div>

      {/* Contenu principal en deux colonnes */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Graphique d'évolution */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-guinea-green" />
            Évolution des Candidatures (30 derniers jours)
          </h2>
          <GraphiqueEvolution donnees={dashboard.candidaturesEvolution} />
        </div>

        {/* Top offres populaires */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-guinea-yellow" />
            Offres Populaires
          </h2>
          <div className="space-y-3">
            {dashboard.offresPopulaires.slice(0, 5).map((offre) => (
              <div key={offre.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-dark-gray truncate">
                    {offre.titre}
                  </h3>
                  <p className="text-xs text-text-gray">
                  {offre.candidatures} candidature{offre.candidatures > 1 ? 's' : ''}
                 </p>
               </div>
               <Link 
                 href={`/tableau-de-bord/entreprise/offres/${offre.id}`}
                 className="text-guinea-red hover:text-secondary-red"
               >
                 <ChevronRight className="h-4 w-4" />
               </Link>
             </div>
           ))}
           
           {dashboard.offresPopulaires.length === 0 && (
             <p className="text-center text-text-gray py-4">
               Aucune offre active
             </p>
           )}
         </div>
         
         <Link 
           href="/tableau-de-bord/entreprise/offres"
           className="block text-center mt-4 text-guinea-red hover:text-secondary-red font-medium text-sm"
         >
           Voir toutes les offres →
         </Link>
       </div>
     </div>

     {/* Candidatures récentes et évaluations */}
     <div className="grid lg:grid-cols-2 gap-6">
       {/* Candidatures récentes */}
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <Users className="h-5 w-5 text-guinea-red" />
           Candidatures Récentes ({dashboard.candidaturesRecentes.length})
         </h2>
         <TableauCandidaturesRecentes candidatures={dashboard.candidaturesRecentes} />
         
         <Link 
           href="/tableau-de-bord/entreprise/candidatures"
           className="block text-center mt-4 text-guinea-red hover:text-secondary-red font-medium text-sm"
         >
           Voir toutes les candidatures →
         </Link>
       </div>

       {/* Évaluations récentes */}
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <Star className="h-5 w-5 text-guinea-yellow" />
           Évaluations Données
         </h2>
         
         <div className="space-y-3">
           {dashboard.evaluationsRecentes.map((evaluation) => (
             <div key={evaluation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <div className="flex-1">
                 <h3 className="font-medium text-sm text-dark-gray">
                   {evaluation.jeuneNom}
                 </h3>
                 <p className="text-xs text-text-gray">{evaluation.poste}</p>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1">
                   <Star className="h-4 w-4 text-yellow-500 fill-current" />
                   <span className="text-sm font-medium">{evaluation.note}/5</span>
                 </div>
               </div>
             </div>
           ))}
           
           {dashboard.evaluationsRecentes.length === 0 && (
             <p className="text-center text-text-gray py-4">
               Aucune évaluation donnée récemment
             </p>
           )}
         </div>
         
         <Link 
           href="/tableau-de-bord/entreprise/evaluations"
           className="block text-center mt-4 text-guinea-red hover:text-secondary-red font-medium text-sm"
         >
           Voir toutes les évaluations →
         </Link>
       </div>
     </div>

     {/* Actions rapides */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <h2 className="text-xl font-semibold text-dark-gray mb-4">Actions Rapides</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Link
           href="/tableau-de-bord/entreprise/offres/creer"
           className="p-4 border-2 border-dashed border-guinea-red/30 rounded-lg hover:border-guinea-red/60 hover:bg-guinea-red/5 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">📝</div>
           <div className="font-medium text-dark-gray group-hover:text-guinea-red">Créer une offre</div>
           <div className="text-sm text-text-gray">Publier un nouveau poste</div>
         </Link>
         
         <Link
           href="/tableau-de-bord/entreprise/candidatures?filtre=non_vues"
           className="p-4 border-2 border-dashed border-guinea-yellow/30 rounded-lg hover:border-guinea-yellow/60 hover:bg-guinea-yellow/5 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">👀</div>
           <div className="font-medium text-dark-gray group-hover:text-guinea-yellow">Examiner les candidatures</div>
           <div className="text-sm text-text-gray">Traiter les nouvelles candidatures</div>
         </Link>
         
         <Link
           href="/tableau-de-bord/entreprise/rapports"
           className="p-4 border-2 border-dashed border-guinea-green/30 rounded-lg hover:border-guinea-green/60 hover:bg-guinea-green/5 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">📊</div>
           <div className="font-medium text-dark-gray group-hover:text-guinea-green">Voir les rapports</div>
           <div className="text-sm text-text-gray">Analyser les performances</div>
         </Link>
       </div>
     </div>
   </div>
 )
}
