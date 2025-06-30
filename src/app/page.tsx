import { EnTete } from '@/composants/landing/EnTete'
import { Heros } from '@/composants/landing/Heros'
import { SectionInscription } from '@/composants/landing/SectionInscription'
import { StatistiquesHighlight } from '@/composants/landing/StatistiquesHighlight'
import { SectionContexte } from '@/composants/landing/SectionContexte'
import { SectionObjectifs } from '@/composants/landing/SectionObjectifs'
import { SectionParcours } from '@/composants/landing/SectionParcours'
import { SectionComposantes } from '@/composants/landing/SectionComposantes'
import { SectionPartenaires } from '@/composants/landing/SectionPartenaires'
import { SectionContact } from '@/composants/landing/SectionContact'
import { PiedDePage } from '@/composants/landing/PiedDePage'
import { DiviseurCouleurs } from '@/composants/ui/DiviseurCouleurs'

export default function PageAccueil() {
  return (
    <main className="min-h-screen">
      <EnTete />
      <DiviseurCouleurs />
      <Heros />
      <SectionInscription />
      <StatistiquesHighlight />
      <SectionContexte />
      <SectionObjectifs />
      <SectionParcours />
      <SectionComposantes />
      <SectionPartenaires />
      <SectionContact />
      <PiedDePage />
    </main>
  )
}
