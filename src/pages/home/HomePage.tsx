// Accueil (maquettes 01, 01b, 01c ; DA §7.1) : récit en 5 séquences, lu au défilement.
// Campagne close : l'ouverture devient « Les set-lists sont closes » et met en avant les
// résultats ; seules la tribune et le pied de page suivent (RG-CAM-02).
import { useRef } from 'react'
import { useCatalog } from '../../features/catalog/useCatalog.ts'
import { useStats } from '../../features/results/useStats.ts'
import { t } from '../../lib/messages.fr.ts'
import { CastingSection } from './CastingSection.tsx'
import { Opening } from './Opening.tsx'
import { RecallSection } from './RecallSection.tsx'
import { SheetSection } from './SheetSection.tsx'
import { StickyCta } from './StickyCta.tsx'
import { TribuneSection } from './TribuneSection.tsx'

export function HomePage() {
  const { catalog } = useCatalog()
  const { data: stats } = useStats()
  const opening = useRef<HTMLElement>(null)

  const closed = catalog?.campaign.isOpen === false
  const participations = stats?.totals.participations ?? null
  const guests = catalog?.guests ?? []

  return (
    <>
      <Opening
        ref={opening}
        closed={closed}
        eventLabel={catalog?.campaign.eventLabel ?? t.home.eventLabel}
        participations={participations}
      />
      {!closed && <SheetSection catalog={catalog} />}
      <TribuneSection stats={stats} />
      {!closed && guests.length > 0 && <CastingSection guests={guests} />}
      {!closed && <RecallSection />}
      {!closed && <StickyCta watch={opening} participations={participations} />}
    </>
  )
}
