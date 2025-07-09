'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Play, Users, TrendingUp } from 'lucide-react'

export function Heros() {
 const [statistiqueAnimee, setStatistiqueAnimee] = useState(0)

 useEffect(() => {
   const timer = setInterval(() => {
     setStatistiqueAnimee(prev => (prev < 1247 ? prev + 13 : 1247))
   }, 50)
   
   setTimeout(() => clearInterval(timer), 5000)
   return () => clearInterval(timer)
 }, [])

 return (
   <section className="gradient-guinea py-20 px-4 text-white relative overflow-hidden">
     {/* Animations de fond */}
     <div className="absolute inset-0 opacity-10">
       {[...Array(20)].map((_, i) => (
         <div
           key={i}
           className="absolute animate-pulse"
           style={{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 3}s`
           }}
         >
           ⭐
         </div>
       ))}
     </div>

     <div className="container mx-auto text-center relative z-10">
       {/* Titre principal */}
       <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-floating">
         Simandou 2040
       </h1>
       
       <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-4xl mx-auto">
         Former la jeunesse, renforcer le capital humain et bâtir une Guinée prospère
       </p>

       {/* Badge national */}
       <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/30">
         <div className="flex w-8 h-5 border border-white/30 rounded-sm overflow-hidden">
           <div className="flex-1 bg-guinea-red"></div>
           <div className="flex-1 bg-guinea-yellow"></div>
           <div className="flex-1 bg-guinea-green"></div>
         </div>
         <span className="font-semibold">Un pont vers la prospérité ! 🇬🇳</span>
       </div>

       {/* Statistiques animées */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
         <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
           <div className="text-4xl font-bold mb-2">{statistiqueAnimee.toLocaleString()}+</div>
           <div className="text-white/80">Jeunes à former</div>
         </div>
         
         <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
           <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
             <Users className="h-8 w-8" />
             4
           </div>
           <div className="text-white/80">Parcours personnalisés</div>
         </div>
         
         <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
           <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
             <TrendingUp className="h-8 w-8" />
             89%
           </div>
           <div className="text-white/80">Taux de réussite</div>
         </div>
       </div>

       {/* Boutons d'action */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
         <Link
           href="/inscription"
           className="bg-white text-guinea-red px-8 py-4 rounded-full font-bold text-lg hover:bg-guinea-yellow hover:text-dark-gray transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2"
         >
           Rejoindre le programme
           <ChevronRight className="h-5 w-5" />
         </Link>
         
         <button className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
           <Play className="h-5 w-5" />
           Voir la vidéo
         </button>
       </div>

       {/* Citation */}
       <div className="mt-16 max-w-2xl mx-auto">
         <blockquote className="text-xl italic text-white/90 mb-4">
           "La jeunesse est notre plus grande richesse. Investir dans sa formation, 
           c'est construire l'avenir de la Guinée."
         </blockquote>
         <cite className="text-white/70">- Vision Simandou 2040</cite>
       </div>
     </div>
   </section>
 )
}
