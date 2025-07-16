'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { serviceAuth } from '@/services/auth'
import { InscriptionEntrepriseInterface } from '@/types/auth'
import { useRouter } from 'next/navigation'

const schemaInscriptionEntreprise = z.object({
  nomEntreprise: z.string().min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères'),
  emailContact: z.string().email('Email invalide'),
  telephoneContact: z.string().min(8, 'Numéro de téléphone invalide'),
  secteurActivite: z.string().min(1, 'Secteur d\'activité requis'),
  tailleEntreprise: z.string().min(1, 'Taille de l\'entreprise requise'),
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
  motDePasse: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmationMotDePasse: z.string(),
  accepteConditions: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions')
}).refine((data) => data.motDePasse === data.confirmationMotDePasse, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmationMotDePasse"],
})

type FormData = z.infer<typeof schemaInscriptionEntreprise>

export function FormulaireInscriptionEntreprise() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schemaInscriptionEntreprise)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const inscriptionData: InscriptionEntrepriseInterface = {
        ...data,
        numeroRegistreCommerce: '',
        siteWeb: '',
        description: ''
      }
      
      const response = await serviceAuth.inscriptionEntreprise(inscriptionData)
      setMessage('Inscription réussie ! Vérifiez votre email pour valider votre compte.')
      
      setTimeout(() => {
        router.push('/connexion')
      }, 2000)
      
    } catch (error: any) {
      setMessage(error.message || 'Erreur lors de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-guinea-red mb-2">Inscription - Entreprise</h3>
        <p className="text-gray-600">Rejoignez la plateforme pour recruter des talents</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('réussie') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise *</label>
          <input
            {...register('nomEntreprise')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            placeholder="Nom de votre entreprise"
          />
          {errors.nomEntreprise && <p className="text-red-500 text-sm mt-1">{errors.nomEntreprise.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email de contact *</label>
            <input
              {...register('emailContact')}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="contact@entreprise.com"
            />
            {errors.emailContact && <p className="text-red-500 text-sm mt-1">{errors.emailContact.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
            <input
              {...register('telephoneContact')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="+224 XXX XXX XXX"
            />
            {errors.telephoneContact && <p className="text-red-500 text-sm mt-1">{errors.telephoneContact.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité *</label>
            <select
              {...register('secteurActivite')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            >
              <option value="">Sélectionner un secteur</option>
              <option value="mines">Mines et Métallurgie</option>
              <option value="agriculture">Agriculture</option>
              <option value="commerce">Commerce</option>
              <option value="transport">Transport</option>
              <option value="construction">Construction/BTP</option>
              <option value="services">Services</option>
              <option value="technologie">Technologie</option>
              <option value="sante">Santé</option>
              <option value="education">Éducation</option>
              <option value="tourisme">Tourisme</option>
            </select>
            {errors.secteurActivite && <p className="text-red-500 text-sm mt-1">{errors.secteurActivite.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Taille de l'entreprise *</label>
            <select
              {...register('tailleEntreprise')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              <option value="tres_petite">Très petite (1-9 employés)</option>
              <option value="petite">Petite (10-49 employés)</option>
              <option value="moyenne">Moyenne (50-249 employés)</option>
              <option value="grande">Grande (250+ employés)</option>
            </select>
            {errors.tailleEntreprise && <p className="text-red-500 text-sm mt-1">{errors.tailleEntreprise.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
          <input
            {...register('adresse')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            placeholder="Adresse complète de l'entreprise"
          />
          {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
          <select
            {...register('ville')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
          >
            <option value="">Sélectionner une ville</option>
            <option value="conakry">Conakry</option>
            <option value="kankan">Kankan</option>
            <option value="labe">Labé</option>
            <option value="nzerekore">N'Zérékoré</option>
            <option value="kindia">Kindia</option>
            <option value="boke">Boké</option>
            <option value="faranah">Faranah</option>
            <option value="mamou">Mamou</option>
          </select>
          {errors.ville && <p className="text-red-500 text-sm mt-1">{errors.ville.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
            <input
              {...register('motDePasse')}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="Minimum 8 caractères"
            />
            {errors.motDePasse && <p className="text-red-500 text-sm mt-1">{errors.motDePasse.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe *</label>
            <input
              {...register('confirmationMotDePasse')}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="Répéter le mot de passe"
            />
            {errors.confirmationMotDePasse && <p className="text-red-500 text-sm mt-1">{errors.confirmationMotDePasse.message}</p>}
          </div>
        </div>

        <div className="flex items-start">
          <input
            {...register('accepteConditions')}
            type="checkbox"
            className="mt-1 mr-3"
          />
          <label className="text-sm text-gray-700">
            J'accepte les <a href="#" className="text-guinea-red hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-guinea-red hover:underline">politique de confidentialité</a> *
          </label>
        </div>
        {errors.accepteConditions && <p className="text-red-500 text-sm">{errors.accepteConditions.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-guinea-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Inscription en cours...' : 'Créer mon compte entreprise'}
        </button>
      </form>
    </div>
  )
}
