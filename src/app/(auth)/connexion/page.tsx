'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { serviceAuth } from '@/services/auth'
import { ConnexionInterface } from '@/types/auth'

export default function PageConnexion() {
  const router = useRouter()
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  const [donneesFormulaire, setDonneesFormulaire] = useState<ConnexionInterface>({
    email: '',
    motDePasse: ''
  })

  const gererChangement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonneesFormulaire({
      ...donneesFormulaire,
      [e.target.name]: e.target.value
    })
  }

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    setChargement(true)
    setErreur('')
   try {
     const reponse = await serviceAuth.connexion(donneesFormulaire)
     
     // Redirection selon le type d'utilisateur
     switch (reponse.utilisateur.typeUtilisateur) {
       case 'jeune':
         router.push('/tableau-de-bord/jeune')
         break
       case 'entreprise':
         router.push('/tableau-de-bord/entreprise')
         break
       case 'conseiller':
         router.push('/tableau-de-bord/conseiller')
         break
       case 'admin':
         router.push('/tableau-de-bord/admin')
         break
     }
   } catch (error) {
     setErreur(error instanceof Error ? error.message : 'Erreur de connexion')
   } finally {
     setChargement(false)
   }
 }

 return (
   <div className="min-h-screen gradient-guinea flex items-center justify-center py-12 px-4">
     <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
       {/* Logo et titre */}
       <div className="text-center mb-8">
         <div className="w-20 h-20 bg-gradient-to-br from-guinea-red to-guinea-yellow rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
           PIJ
         </div>
         <h1 className="text-2xl font-bold text-guinea-red">Connexion</h1>
         <p className="text-text-gray mt-2">Accédez à votre espace personnel</p>
       </div>

       {/* Formulaire */}
       <form onSubmit={gererSoumission} className="space-y-6">
         {erreur && (
           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
             {erreur}
           </div>
         )}

         <div>
           <label htmlFor="email" className="block text-sm font-medium text-dark-gray mb-2">
             Adresse email
           </label>
           <input
             type="email"
             id="email"
             name="email"
             required
             value={donneesFormulaire.email}
             onChange={gererChangement}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent transition-all duration-200"
             placeholder="votre@email.com"
           />
         </div>

         <div>
           <label htmlFor="motDePasse" className="block text-sm font-medium text-dark-gray mb-2">
             Mot de passe
           </label>
           <input
             type="password"
             id="motDePasse"
             name="motDePasse"
             required
             value={donneesFormulaire.motDePasse}
             onChange={gererChangement}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-guinea-red focus:border-transparent transition-all duration-200"
             placeholder="••••••••"
           />
         </div>

         <button
           type="submit"
           disabled={chargement}
           className="w-full bg-guinea-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary-red disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
         >
           {chargement ? 'Connexion...' : 'Se connecter'}
         </button>
       </form>

       {/* Liens utiles */}
       <div className="mt-6 text-center space-y-2">
         <Link href="/mot-de-passe-oublie" className="text-guinea-red hover:underline text-sm">
           Mot de passe oublié ?
         </Link>
         <div className="text-text-gray text-sm">
           Pas encore de compte ?{' '}
           <Link href="/inscription" className="text-guinea-red hover:underline font-medium">
             S'inscrire
           </Link>
         </div>
       </div>
     </div>
   </div>
 )
}
