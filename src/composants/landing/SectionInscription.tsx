'use client'
import { useState } from 'react'

export function SectionInscription() {
  const [profil, setProfil] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Merci pour votre inscription ! Notre équipe vous contactera bientôt.')
  }

  return (
    <section className="bg-white py-16" id="inscription">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Rejoindre le Programme</h2>
          <p className="text-xl text-text-gray max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant pour bénéficier du programme d'insertion Simandou 2040
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-t-4 border-guinea-red">
          <div className="space-y-6">
            <div>
              <label htmlFor="profil" className="block text-sm font-medium text-guinea-red mb-2">
                Votre profil :
              </label>
              <select
                id="profil"
                value={profil}
                onChange={(e) => setProfil(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent transition-all"
              >
                <option value="">Sélectionnez votre profil</option>
                <option value="jeune_diplome">Jeune diplômé 🎓</option>
                <option value="formation_pro">Formation professionnelle 👷</option>
                <option value="sans_qualification">Sans qualification formelle 📚</option>
                <option value="reconversion">En reconversion 🔄</option>
                <option value="entreprise">Entreprise partenaire 🏢</option>
                <option value="institution">Institution publique 🏛️</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom complet *"
                required
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email *"
                required
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              />
            </div>

            <input
              type="tel"
              placeholder="Téléphone *"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            />

            <textarea
              placeholder="Message (optionnel)"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent resize-none"
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-5 h-5 text-guinea-red focus:ring-guinea-red border-gray-300 rounded"
              />
              <span className="text-sm text-text-gray">
                J'accepte les <strong>conditions d'utilisation</strong> et la <strong>politique de confidentialité</strong> du Projet Insertion des Jeunes Simandou 2040 *
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-guinea-red text-white py-4 rounded-lg font-bold text-lg hover:bg-secondary-red transition-colors"
            >
              Rejoindre Simandou 2040 ! 🚀
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
