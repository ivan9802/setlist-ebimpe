// Séquence 2 · La feuille (maquette 01) : une set-list d'exemple, clairement étiquetée, qui se
// « scotche » en entrant à l'écran. Elle est tirée du catalogue réel (les 6 premiers titres et
// les 2 premiers guests) : rien n'est inventé (RG-CAT-07) et l'exemple suit les corrections.
import type { Catalog } from '../../../shared/api-types.ts'
import { SetlistSheet } from '../../components/playlist/SetlistSheet.tsx'
import { t } from '../../lib/messages.fr.ts'

const EXAMPLE_TRACKS = 6
const EXAMPLE_GUESTS = 2

export function SheetSection({ catalog }: { catalog: Catalog | undefined }) {
  const tracks = catalog?.tracks.slice(0, EXAMPLE_TRACKS) ?? []
  const guests = catalog?.guests.slice(0, EXAMPLE_GUESTS).map((g) => g.name) ?? []

  return (
    <section
      aria-labelledby="sequence-feuille"
      className="gutter-x grid gap-x-10 pt-14 lg:grid-cols-12 lg:items-center"
    >
      <div className="lg:col-span-7 lg:row-start-1">
        <p className="eyebrow">{t.home.sheetEyebrow}</p>
        <h2 id="sequence-feuille" className="mt-2 font-display text-section-l font-black uppercase">
          {t.home.sheetTitle[0]}
          <br />
          {t.home.sheetTitle[1]}
        </h2>
      </div>
      {tracks.length > 0 && (
        <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <SetlistSheet
            heading={t.home.sheetLabel}
            tracks={tracks}
            guests={guests}
            className="sheet-enter mx-auto w-full max-w-[17.5rem] -rotate-[1.5deg]"
            tapeClassName="tape-enter"
          />
        </div>
      )}
      <p className="mt-10 max-w-[40ch] text-[0.9375rem] text-muted lg:col-span-7 lg:row-start-2 lg:mt-6">
        {t.home.sheetNote}
      </p>
    </section>
  )
}
