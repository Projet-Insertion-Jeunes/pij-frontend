export function SectionMinistre() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-guinea-red font-bold text-xl flex-shrink-0">
          MJS
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">Keamou Bogola Haba</h3>
          <p className="text-white/80 text-sm">Ministre de la Jeunesse et des Sports</p>
        </div>
      </div>
      
      <blockquote className="border-l-4 border-guinea-yellow pl-6 italic">
        <p className="text-white text-lg leading-relaxed mb-4">
          "Le projet Simandou 2040 représente une opportunité historique pour la jeunesse guinéenne. 
          Cette plateforme d'insertion professionnelle s'inscrit dans notre vision de développement durable 
          et d'autonomisation des jeunes."
        </p>
        <p className="text-white/90 leading-relaxed">
          En rejoignant cette initiative, vous participez activement à la construction d'une Guinée prospère 
          et moderne, où chaque jeune trouve sa place dans l'économie nationale. 
          Ensemble, construisons l'avenir de notre pays !
        </p>
      </blockquote>
    </div>
  )
} 