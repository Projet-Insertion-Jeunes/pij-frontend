'use client'
import { useState } from 'react'
import { 
 Star, 
 Building2, 
 Calendar, 
 Clock, 
 Eye, 
 EyeOff, 
 MessageSquare,
 ThumbsUp,
 ThumbsDown,
 TrendingUp,
 Award
} from 'lucide-react'
import { EvaluationEmployeurInterface } from '@/types/evaluations'
import { serviceEvaluations } from '@/services/evaluations'

interface CarteEvaluationProps {
 evaluation: EvaluationEmployeurInterface
 onMiseAJour: () => void
}

export function CarteEvaluation({ evaluation, onMiseAJour }: CarteEvaluationProps) {
 const [afficherDetails, setAfficherDetails] = useState(false)
 const [reponse, setReponse] = useState(evaluation.reponseJeune || '')
 const [chargement, setChargement] = useState(false)

 const getRecommandationStyle = (recommandation: string) => {
   const styles = {
     fortement_recommande: 'bg-green-100 text-green-700 border-green-200',
     recommande: 'bg-blue-100 text-blue-700 border-blue-200',
     recommande_avec_reserves: 'bg-yellow-100 text-yellow-700 border-yellow-200',
     non_recommande: 'bg-red-100 text-red-700 border-red-200'
   }
   return styles[recommandation as keyof typeof styles] || styles.recommande
 }

 const getRecommandationLabel = (recommandation: string) => {
   const labels = {
     fortement_recommande: 'Fortement recommandé',
     recommande: 'Recommandé',
     recommande_avec_reserves: 'Recommandé avec réserves',
     non_recommande: 'Non recommandé'
   }
   return labels[recommandation as keyof typeof labels] || recommandation
 }

 const getRecommandationIcon = (recommandation: string) => {
   if (recommandation === 'fortement_recommande') return <ThumbsUp className="h-4 w-4" />
   if (recommandation === 'recommande') return <ThumbsUp className="h-4 w-4" />
   if (recommandation === 'non_recommande') return <ThumbsDown className="h-4 w-4" />
   return <TrendingUp className="h-4 w-4" />
 }

 const getNoteColor = (note: number) => {
   if (note >= 4.5) return 'text-green-600'
   if (note >= 3.5) return 'text-blue-600'
   if (note >= 2.5) return 'text-yellow-600'
   return 'text-red-600'
 }

 const marquerCommeLue = async () => {
   if (evaluation.jeuneALu) return
   
   try {
     await serviceEvaluations.marquerEvaluationLue(evaluation.id)
     onMiseAJour()
   } catch (error) {
     console.error('Erreur marquage lecture:', error)
   }
 }

 const envoyerReponse = async () => {
   if (!reponse.trim()) return
   
   setChargement(true)
   try {
     await serviceEvaluations.repondreEvaluation(evaluation.id, reponse)
     onMiseAJour()
   } catch (error) {
     console.error('Erreur envoi réponse:', error)
     alert(error instanceof Error ? error.message : 'Erreur lors de l\'envoi')
   } finally {
     setChargement(false)
   }
 }

 return (
   <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
     {/* En-tête */}
     <div className="p-6 border-b border-gray-100">
       <div className="flex justify-between items-start mb-4">
         <div className="flex-1">
           <div className="flex items-center gap-3 mb-2">
             <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
                 <Star
                   key={i}
                   className={`h-5 w-5 ${
                     i < Math.floor(evaluation.noteGlobale)
                       ? 'text-yellow-500 fill-current'
                       : 'text-gray-300'
                   }`}
                 />
               ))}
               <span className={`ml-2 text-xl font-bold ${getNoteColor(evaluation.noteGlobale)}`}>
                 {evaluation.noteGlobale.toFixed(1)}/5
               </span>
             </div>
             
             {!evaluation.jeuneALu && (
               <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                 Nouveau
               </span>
             )}
           </div>
           
           <h3 className="text-xl font-semibold text-dark-gray mb-1">
             {evaluation.intitulePoste}
           </h3>
           
           <div className="flex items-center gap-4 text-text-gray text-sm">
             <div className="flex items-center gap-1">
               <Building2 className="h-4 w-4" />
               <span>{evaluation.entrepriseNom}</span>
             </div>
             <div className="flex items-center gap-1">
               <Calendar className="h-4 w-4" />
               <span>{evaluation.tempsEcoule}</span>
             </div>
             <div className="flex items-center gap-1">
               <Clock className="h-4 w-4" />
               <span>{evaluation.dureeFormattee}</span>
             </div>
           </div>
         </div>

         <div className="flex flex-col items-end gap-2">
           <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getRecommandationStyle(evaluation.recommandation)}`}>
             {getRecommandationIcon(evaluation.recommandation)}
             {getRecommandationLabel(evaluation.recommandation)}
           </div>
           
           <div className="flex items-center gap-1 text-text-gray text-sm">
             {evaluation.estPublique ? (
               <>
                 <Eye className="h-4 w-4" />
                 <span>Publique</span>
               </>
             ) : (
               <>
                 <EyeOff className="h-4 w-4" />
                 <span>Privée</span>
               </>
             )}
           </div>
         </div>
       </div>

       {/* Points forts (aperçu) */}
       <div className="bg-green-50 rounded-lg p-3 mb-3">
         <h4 className="font-medium text-green-800 mb-1 flex items-center gap-1">
           <Award className="h-4 w-4" />
           Points forts
         </h4>
         <p className="text-green-700 text-sm">{evaluation.pointsForts}</p>
       </div>

       {/* Axes d'amélioration */}
       {evaluation.axesAmelioration && (
         <div className="bg-yellow-50 rounded-lg p-3 mb-3">
           <h4 className="font-medium text-yellow-800 mb-1">Axes d'amélioration</h4>
           <p className="text-yellow-700 text-sm">{evaluation.axesAmelioration}</p>
         </div>
       )}
     </div>

     {/* Actions */}
     <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
       <div className="text-sm text-text-gray">
         Évaluateur : <span className="font-medium">{evaluation.evaluateurNom}</span>
         {evaluation.evaluateurFonction && (
           <span> - {evaluation.evaluateurFonction}</span>
         )}
       </div>

       <div className="flex gap-2">
         {!evaluation.jeuneALu && (
           <button
             onClick={marquerCommeLue}
             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
           >
             Marquer comme lu
           </button>
         )}
         
         <button
           onClick={() => setAfficherDetails(!afficherDetails)}
           className="bg-white border border-gray-300 text-dark-gray px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
         >
           {afficherDetails ? 'Masquer détails' : 'Voir détails'}
         </button>
       </div>
     </div>

     {/* Détails complets */}
     {afficherDetails && (
       <div className="px-6 py-4 border-t border-gray-100 space-y-4">
         {/* Commentaire libre */}
         {evaluation.commentaireLibre && (
           <div>
             <h4 className="font-medium text-dark-gray mb-2">Commentaire détaillé</h4>
             <p className="text-text-gray text-sm bg-gray-50 rounded-lg p-3">
               {evaluation.commentaireLibre}
             </p>
           </div>
         )}

         {/* Conseil futur employeur */}
         {evaluation.conseilFuturEmployeur && (
           <div>
             <h4 className="font-medium text-dark-gray mb-2">Conseil pour les futurs employeurs</h4>
             <p className="text-text-gray text-sm bg-blue-50 rounded-lg p-3">
               {evaluation.conseilFuturEmployeur}
             </p>
           </div>
         )}

         {/* Évaluations détaillées par critère */}
         {evaluation.details && evaluation.details.length > 0 && (
           <div>
             <h4 className="font-medium text-dark-gray mb-3">Évaluation par critère</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {evaluation.details.map((detail, index) => (
                 <div key={index} className="bg-gray-50 rounded-lg p-3">
                   <div className="flex justify-between items-center mb-1">
                     <span className="font-medium text-sm">{detail.critere.nom}</span>
                     <div className="flex items-center gap-1">
                       {[...Array(5)].map((_, i) => (
                         <Star
                           key={i}
                           className={`h-3 w-3 ${
                             i < detail.note
                               ? 'text-yellow-500 fill-current'
                               : 'text-gray-300'
                           }`}
                         />
                       ))}
                       <span className="ml-1 text-sm font-bold">{detail.note}/5</span>
                     </div>
                   </div>
                   {detail.commentaire && (
                     <p className="text-xs text-text-gray">{detail.commentaire}</p>
                   )}
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Section réponse */}
         <div className="border-t border-gray-100 pt-4">
           <h4 className="font-medium text-dark-gray mb-3 flex items-center gap-2">
             <MessageSquare className="h-4 w-4" />
             Votre réponse
           </h4>
           
           {evaluation.reponseJeune ? (
             <div className="bg-guinea-green/10 rounded-lg p-3">
               <p className="text-guinea-green text-sm">{evaluation.reponseJeune}</p>
             </div>
           ) : (
             <div className="space-y-3">
               <textarea
                 value={reponse}
                 onChange={(e) => setReponse(e.target.value)}
                 placeholder="Répondez à cette évaluation (optionnel)..."
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent resize-none"
                 rows={3}
               />
               <button
                 onClick={envoyerReponse}
                 disabled={!reponse.trim() || chargement}
                 className="bg-guinea-red text-white px-4 py-2 rounded-lg hover:bg-secondary-red disabled:opacity-50 transition-colors text-sm"
               >
                 {chargement ? 'Envoi...' : 'Envoyer la réponse'}
               </button>
             </div>
           )}
         </div>
       </div>
     )}
   </div>
 )
}
