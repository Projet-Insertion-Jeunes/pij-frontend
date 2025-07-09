'use client'
import { useState, useEffect, useRef } from 'react'
import { TrendingDown, AlertTriangle, Building, FileText } from 'lucide-react'

export function StatistiquesHighlight() {
 const [statistiques, setStatistiques] = useState({
   jeunes_vulnerables: 0,
   sans_emploi: 0,
   secteur_informel: 0,
   sans_contrat: 0
 })
 
 const sectionRef = useRef<HTMLDivElement>(null)
 const [estVisible, setEstVisible] = useState(false)

 // Animation des compteurs
 useEffect(() => {
   const observer = new IntersectionObserver(
     ([entry]) => {
       if (entry.isIntersecting && !estVisible) {
         setEstVisible(true)
         
         // Animation des statistiques
         const targets = {
           jeunes_vulnerables: 64,
           sans_emploi: 24,
           secteur_informel: 90,
           sans_contrat: 2
         }
         
         const duration = 2000 // 2 secondes
         const steps = 60
         const stepDuration = duration / steps
         
         let currentStep = 0
         const timer = setInterval(() => {
           currentStep++
           const progress = currentStep / steps
           
           setStatistiques({
             jeunes_vulnerables: Math.round(targets.jeunes_vulnerables * progress),
             sans_emploi: Math.round(targets.sans_emploi * progress),
             secteur_informel: Math.round(targets.secteur_informel * progress),
             sans_contrat: Math.round(targets.sans_contrat * progress)
           })
           
           if (currentStep >= steps) {
             clearInterval(timer)
             setStatistiques(targets)
           }
         }, stepDuration)
         
         return () => clearInterval(timer)
       }
     },
     { threshold: 0.3 }
   )

   if (sectionRef.current) {
     observer.observe(sectionRef.current)
   }

   return () => observer.disconnect()
 }, [estVisible])

 const statsData = [
   {
     valeur: statistiques.jeunes_vulnerables,
     texte: "des jeunes (15-35 ans) en situation de vulnérabilité professionnelle",
     icone: AlertTriangle,
     couleur: "text-red-600"
   },
   {
     valeur: statistiques.sans_emploi,
     texte: "des jeunes sans emploi ou sous-employés",
     icone: TrendingDown,
     couleur: "text-orange-600"
   },
   {
     valeur: statistiques.secteur_informel,
     texte: "du marché dominé par le secteur informel",
     icone: Building,
     couleur: "text-yellow-600"
   },
   {
     valeur: statistiques.sans_contrat,
     texte: "seulement des actifs avec contrat écrit",
     icone: FileText,
     couleur: "text-blue-600"
   }
 ]

 return (
   <section ref={sectionRef} className="bg-gradient-to-r from-guinea-red via-guinea-yellow to-guinea-green py-16">
     <div className="container mx-auto px-4">
       <div className="text-center mb-12">
         <h2 className="text-4xl font-bold text-white mb-6">
           Le Défi de la Jeunesse Guinéenne
         </h2>
         <p className="text-xl text-white/90 max-w-3xl mx-auto">
           Des chiffres qui illustrent l'urgence d'agir pour l'insertion professionnelle 
           des jeunes en République de Guinée
         </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {statsData.map((stat, index) => {
           const IconeComponent = stat.icone
           
           return (
             <div
               key={index}
               className="bg-white/15 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/25 transition-all duration-300"
             >
               <div className="flex justify-center mb-4">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                   <IconeComponent className="h-8 w-8 text-white" />
                 </div>
               </div>
               
               <div className="text-5xl font-bold text-white mb-3 font-mono">
                 {stat.valeur}%
               </div>
               
               <p className="text-white/90 text-sm leading-relaxed">
                 {stat.texte}
               </p>
             </div>
           )
         })}
       </div>

       {/* Message d'espoir */}
       <div className="mt-16 text-center">
         <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto border border-white/30">
           <h3 className="text-2xl font-bold text-white mb-4">
             🌟 Transformons ce défi en opportunité !
           </h3>
           <p className="text-white/90 text-lg leading-relaxed">
             Le projet Simandou 2040 est conçu pour inverser ces tendances en offrant 
             à chaque jeune guinéen les outils, la formation et l'accompagnement nécessaires 
             pour réussir son insertion professionnelle et contribuer au développement du pays.
           </p>
         </div>
       </div>
     </div>
   </section>
 )
}
