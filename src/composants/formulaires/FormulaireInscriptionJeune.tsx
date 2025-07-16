'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { serviceAuth } from '@/services/auth'
import { InscriptionJeuneInterface } from '@/types/auth'
import { useRouter } from 'next/navigation'

const schemaInscriptionJeune = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide'),
  motDePasse: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmationMotDePasse: z.string(),
  dateNaissance: z.string().min(1, 'Date de naissance requise'),
  lieuNaissance: z.string().min(2, 'Lieu de naissance requis'),
  region: z.string().min(1, 'Région requise'),
  sexe: z.enum(['masculin', 'feminin']),
  accepteConditions: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions')
}).refine((data) => data.motDePasse === data.confirmationMotDePasse, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmationMotDePasse"],
})

type FormData = z.infer<typeof schemaInscriptionJeune>

// Ajouter cette fonction de validation avant le composant
const validerTelephoneGuinee = (telephone: string): string => {
  // Nettoyer le numéro
  let clean = telephone.replace(/[\s\-\+]/g, '')
  
  // Si commence par 224, l'enlever
  if (clean.startsWith('224')) {
    clean = clean.substring(3)
  }
  
  // Vérifier le format guinéen (9 chiffres commençant par 6)
  if (clean.length !== 9 || !clean.startsWith('6') || !/^\d+$/.test(clean)) {
    throw new Error('Numéro de téléphone invalide. Format attendu: 6XX XXX XXX')
  }
  
  return clean
}

export function FormulaireInscriptionJeune() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schemaInscriptionJeune)
  })

  // Modifier la fonction onSubmit
  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setMessage('')
    
    try {
      alert('🚀 DÉBUT SOUMISSION FORMULAIRE')
      
      // Valider et formater le téléphone
      const telephoneValide = validerTelephoneGuinee(data.telephone)
      alert('📞 Téléphone validé: ' + telephoneValide)
      
      const inscriptionData: InscriptionJeuneInterface = {
        ...data,
        telephone: telephoneValide,
        pieceIdentite: null,
        cv: null,
        niveauFormation: '',
        secteurInteret: ''
      }
      
      console.log('📞 Téléphone validé:', telephoneValide)
      console.log('📋 Données complètes:', inscriptionData)
      
      const response = await serviceAuth.inscriptionJeune(inscriptionData)
      
      alert('✅ RETOUR SERVICE AUTH: ' + JSON.stringify(response))
      
      setMessage('Inscription réussie ! Vérifiez votre email pour valider votre compte.')
      
      setTimeout(() => {
        router.push('/connexion')
      }, 2000)
      
    } catch (error: any) {
      alert('❌ ERREUR CAPTURÉE: ' + error.message)
      console.error('❌ Erreur inscription:', error)
      setMessage(error.message || 'Erreur lors de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-guinea-red mb-2">Inscription - Jeune</h3>
        <p className="text-gray-600">Créez votre compte pour accéder aux opportunités</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('réussie') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
            <input
              {...register('nom')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="Votre nom"
            />
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
            <input
              {...register('prenom')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="Votre prénom"
            />
            {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            placeholder="votre@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
          <input
            {...register('telephone')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            placeholder="+224 XXX XXX XXX"
          />
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
            <input
              {...register('dateNaissance')}
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            />
            {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sexe *</label>
            <select
              {...register('sexe')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              <option value="masculin">Masculin</option>
              <option value="feminin">Féminin</option>
            </select>
            {errors.sexe && <p className="text-red-500 text-sm mt-1">{errors.sexe.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lieu de naissance *</label>
            <input
              {...register('lieuNaissance')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
              placeholder="Ville de naissance"
            />
            {errors.lieuNaissance && <p className="text-red-500 text-sm mt-1">{errors.lieuNaissance.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Région *</label>
            <select
              {...register('region')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent"
            >
              <option value="">Sélectionner une région</option>
              <option value="conakry">Conakry</option>
              <option value="kankan">Kankan</option>
              <option value="faranah">Faranah</option>
              <option value="nzerekore">N'Zérékoré</option>
              <option value="boke">Boké</option>
              <option value="kindia">Kindia</option>
              <option value="labe">Labé</option>
              <option value="mamou">Mamou</option>
            </select>
            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
          </div>
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
          {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
        </button>
      </form>
    </div>
  )
}
