'use client'
import { useState, useEffect } from 'react'
import { 
 Users, 
 Building2, 
 TrendingUp, 
 Award,
 AlertTriangle,
 CheckCircle,
 Clock,
 BarChart3,
 UserCheck,
 FileText
} from 'lucide-react'
import Link from 'next/link'
import { DashboardAdminInterface, ValidationsEnAttenteInterface } from '@/types/dashboard-admin'
import { serviceDashboardAdmin } from '@/services/dashboard-admin'
import { CarteStatistique } from '@/composants/ui/CarteStatistique'
import { GraphiqueEvolutionInscriptions } from '@/composants/dashboard/GraphiqueEvolutionInscriptions'
import { CarteValidations } from '@/composants/dashboard/CarteValidations'

export default function DashboardAdmin() {
 const [dashboard, setDashboard] = useState<DashboardAdminInterface | null>(null)
 const [validations, setValidations] = useState<ValidationsEnAttenteInterface | null>(null)
 const [chargement, setChargement] = useState(true)

 const chargerDonnees = async () => {
   setChargement(true)
   try {
     const [dashboardData, validationsData] = await Promise.all([
       serviceDashboardAdmin.obtenirDashboardGlobal(),
       serviceDashboardAdmin.obtenirValidationsEnAttente()
     ])
     setDashboard(dashboardData)
     setValidations(validationsData)
   } catch (error) {
     console.error('Erreur chargement dashboard admin:', error)
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
     <div className="bg-gradient-to-r from-guinea-red to-guinea-green rounded-xl p-6 text-white">
       <h1 className="text-3xl font-bold mb-2">Administration PIJ Simandou 2040 🛡️</h1>
       <p className="text-white/90">
         Pilotez la plateforme, supervisez les validations et analysez les performances globales
       </p>
     </div>

     {/* Alertes de validation */}
     {validations && validations.resume.totalValidations > 0 && (
       <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
         <div className="flex items-center gap-3 mb-4">
           <AlertTriangle className="h-6 w-6 text-orange-600" />
           <h2 className="text-xl font-semibold text-orange-800">
             Validations en attente ({validations.resume.totalValidations})
           </h2>
         </div>
         
         <div className="grid md:grid-cols-4 gap-4">
           {validations.resume.profilsJeunesCount > 0 && (
             <Link 
               href="/tableau-de-bord/admin/validations?type=jeunes"
               className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
             >
               <div className="flex items-center justify-between">
                 <div>
                   <div className="text-2xl font-bold text-orange-600">
                     {validations.resume.profilsJeunesCount}
                   </div>
                   <div className="text-sm text-orange-700">Profils jeunes</div>
                 </div>
                 <Users className="h-8 w-8 text-orange-500" />
               </div>
             </Link>
           )}
           
           {validations.resume.profilsEntreprisesCount > 0 && (
             <Link 
               href="/tableau-de-bord/admin/validations?type=entreprises"
               className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
             >
               <div className="flex items-center justify-between">
                 <div>
                   <div className="text-2xl font-bold text-orange-600">
                     {validations.resume.profilsEntreprisesCount}
                   </div>
                   <div className="text-sm text-orange-700">Entreprises</div>
                 </div>
                 <Building2 className="h-8 w-8 text-orange-500" />
               </div>
             </Link>
           )}
           
           {validations.resume.offresCount > 0 && (
             <Link 
               href="/tableau-de-bord/admin/validations?type=offres"
               className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
             >
               <div className="flex items-center justify-between">
                 <div>
                   <div className="text-2xl font-bold text-orange-600">
                     {validations.resume.offresCount}
                   </div>
                   <div className="text-sm text-orange-700">Offres d'emploi</div>
                 </div>
                 <FileText className="h-8 w-8 text-orange-500" />
               </div>
             </Link>
           )}
           
           {validations.resume.evaluationsCount > 0 && (
             <Link 
               href="/tableau-de-bord/admin/validations?type=evaluations"
               className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-orange-200"
             >
               <div className="flex items-center justify-between">
                 <div>
                   <div className="text-2xl font-bold text-orange-600">
                     {validations.resume.evaluationsCount}
                   </div>
                   <div className="text-sm text-orange-700">Évaluations</div>
                 </div>
                 <CheckCircle className="h-8 w-8 text-orange-500" />
               </div>
             </Link>
           )}
         </div>
       </div>
     )}

     {/* Statistiques principales */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <CarteStatistique
         titre="Jeunes Inscrits"
         valeur={dashboard.statistiquesGenerales.totalJeunes.toString()}
         changement={`+${dashboard.statistiquesGenerales.nouveauxJeunesSemaine} cette semaine`}
         tendancePositive={dashboard.statistiquesGenerales.nouveauxJeunesSemaine > 0}
         icone={<Users className="h-8 w-8" />}
         couleur="guinea-red"
       />
       
       <CarteStatistique
         titre="Entreprises"
         valeur={dashboard.statistiquesGenerales.totalEntreprises.toString()}
         changement={`${dashboard.statistiquesGenerales.entreprisesActives} actives`}
         tendancePositive={dashboard.statistiquesGenerales.entreprisesActives > 0}
         icone={<Building2 className="h-8 w-8" />}
         couleur="guinea-yellow"
       />
       
       <CarteStatistique
         titre="Taux de Placement"
         valeur={`${dashboard.performance.tauxPlacementGlobal}%`}
         changement={`${dashboard.performance.candidaturesAcceptees} embauches`}
         tendancePositive={dashboard.performance.tauxPlacementGlobal > 15}
         icone={<TrendingUp className="h-8 w-8" />}
         couleur="guinea-green"
       />
       
       <CarteStatistique
         titre="Certificats"
         valeur={dashboard.statistiquesGenerales.certificatsDelivres.toString()}
         changement={`${dashboard.statistiquesGenerales.parcoursTermines} parcours terminés`}
         tendancePositive={dashboard.statistiquesGenerales.certificatsDelivres > 0}
         icone={<Award className="h-8 w-8" />}
         couleur="guinea-red"
       />
     </div>

     {/* Contenu principal */}
     <div className="grid lg:grid-cols-3 gap-6">
       {/* Graphique d'évolution */}
       <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <BarChart3 className="h-5 w-5 text-guinea-green" />
           Évolution des Inscriptions (30 derniers jours)
         </h2>
         <GraphiqueEvolutionInscriptions donnees={dashboard.inscriptionsEvolution} />
       </div>

       {/* Jeunes nécessitant une attention */}
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <AlertTriangle className="h-5 w-5 text-orange-600" />
           Points d'Attention
         </h2>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
             <div>
               <div className="font-medium text-red-800 text-sm">Profils non validés</div>
               <div className="text-red-600 text-xs">Action requise</div>
             </div>
             <div className="text-xl font-bold text-red-600">
               {dashboard.jeunesAttention.profilsNonValides}
             </div>
           </div>
           
           <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
             <div>
               <div className="font-medium text-yellow-800 text-sm">Sans candidature</div>
               <div className="text-yellow-600 text-xs">À accompagner</div>
             </div>
             <div className="text-xl font-bold text-yellow-600">
               {dashboard.jeunesAttention.sansCandidature}
             </div>
           </div>
           
           <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
             <div>
               <div className="font-medium text-orange-800 text-sm">Abandons parcours</div>
               <div className="text-orange-600 text-xs">Identifier causes</div>
             </div>
             <div className="text-xl font-bold text-orange-600">
               {dashboard.jeunesAttention.abandonsParcours}
             </div>
           </div>
           
           <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
             <div>
               <div className="font-medium text-purple-800 text-sm">Notes faibles</div>
               <div className="text-purple-600 text-xs">Formation requise</div>
             </div>
             <div className="text-xl font-bold text-purple-600">
               {dashboard.jeunesAttention.notesFaibles}
             </div>
           </div>
         </div>
         
         <Link 
           href="/tableau-de-bord/admin/suivi-jeunes"
           className="block text-center mt-4 text-guinea-red hover:text-secondary-red font-medium text-sm"
         >
           Voir le suivi détaillé →
         </Link>
       </div>
     </div>

     {/* Progression des parcours */}
     <div className="grid lg:grid-cols-2 gap-6">
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <Award className="h-5 w-5 text-guinea-yellow" />
           Répartition par Parcours
         </h2>
         
         <div className="grid grid-cols-2 gap-4">
           <div className="text-center p-4 bg-green-50 rounded-lg">
             <div className="text-3xl font-bold text-green-600">
               {dashboard.progressionParcours.A}
             </div>
             <div className="text-sm text-green-700">Parcours A</div>
             <div className="text-xs text-green-600">Insertion Immédiate</div>
           </div>
           
           <div className="text-center p-4 bg-blue-50 rounded-lg">
             <div className="text-3xl font-bold text-blue-600">
               {dashboard.progressionParcours.B}
             </div>
             <div className="text-sm text-blue-700">Parcours B</div>
             <div className="text-xs text-blue-600">Mise à Niveau</div>
           </div>
           
           <div className="text-center p-4 bg-purple-50 rounded-lg">
             <div className="text-3xl font-bold text-purple-600">
               {dashboard.progressionParcours.C}
             </div>
             <div className="text-sm text-purple-700">Parcours C</div>
             <div className="text-xs text-purple-600">Reconversion</div>
           </div>
           
           <div className="text-center p-4 bg-orange-50 rounded-lg">
             <div className="text-3xl font-bold text-orange-600">
               {dashboard.progressionParcours.D}
             </div>
             <div className="text-sm text-orange-700">Parcours D</div>
             <div className="text-xs text-orange-600">Savoir-être</div>
           </div>
         </div>
       </div>

       {/* Répartition géographique */}
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h2 className="text-xl font-semibold text-dark-gray mb-4 flex items-center gap-2">
           <Users className="h-5 w-5 text-guinea-red" />
           Répartition par Région
         </h2>
         
         <div className="space-y-2 max-h-80 overflow-y-auto">
           {Object.entries(dashboard.jeunesParRegion)
             .sort(([,a], [,b]) => b.count - a.count)
             .map(([region, data]) => (
               <div key={region} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                 <span className="text-sm font-medium">{data.label}</span>
                 <div className="flex items-center gap-2">
                   <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-guinea-red rounded-full"
                       style={{ 
                         width: `${(data.count / dashboard.statistiquesGenerales.totalJeunes) * 100}%` 
                       }}
                     ></div>
                   </div>
                   <span className="text-sm font-bold text-guinea-red w-8 text-right">
                     {data.count}
                   </span>
                 </div>
               </div>
             ))
           }
         </div>
       </div>
     </div>

     {/* Actions rapides administrateur */}
     <div className="bg-white rounded-xl shadow-lg p-6">
       <h2 className="text-xl font-semibold text-dark-gray mb-4">Actions Administrateur</h2>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Link
           href="/tableau-de-bord/admin/validations"
           className="p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">✅</div>
           <div className="font-medium text-dark-gray group-hover:text-orange-600">Validations</div>
           <div className="text-sm text-text-gray">Profils et contenus</div>
         </Link>
         
         <Link
           href="/tableau-de-bord/admin/rapports"
           className="p-4 border-2 border-dashed border-guinea-green/30 rounded-lg hover:border-guinea-green/60 hover:bg-guinea-green/5 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">📊</div>
           <div className="font-medium text-dark-gray group-hover:text-guinea-green">Rapports</div>
           <div className="text-sm text-text-gray">Analytics avancées</div>
         </Link>
         
         <Link
           href="/tableau-de-bord/admin/utilisateurs"
           className="p-4 border-2 border-dashed border-guinea-red/30 rounded-lg hover:border-guinea-red/60 hover:bg-guinea-red/5 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">👥</div>
           <div className="font-medium text-dark-gray group-hover:text-guinea-red">Utilisateurs</div>
           <div className="text-sm text-text-gray">Gestion des comptes</div>
         </Link>
         
         <Link
           href="/tableau-de-bord/admin/configuration"
           className="p-4 border-2 border-dashed border-guinea-yellow/30 rounded-lg hover:border-guinea-yellow/60 hover:bg-guinea-yellow/5 transition-all duration-200 text-center group"
         >
           <div className="text-3xl mb-2">⚙️</div>
           <div className="font-medium text-dark-gray group-hover:text-guinea-yellow">Configuration</div>
           <div className="text-sm text-text-gray">Paramètres système</div>
         </Link>
       </div>
     </div>
   </div>
 )
}
