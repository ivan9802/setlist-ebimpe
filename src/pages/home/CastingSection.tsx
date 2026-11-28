// Séquence 4 · Le casting (maquette 01) : les guests en banderole de tribune, sur deux lignes qui
// glissent en sens inverse AU RYTHME du défilement, jamais toutes seules. Animations réduites :
// statique, toujours sur 2 lignes (les noms débordent). La banderole est décorative : la liste
// complète est donnée en texte aux lecteurs d'écran. Les guests restent des souhaits (RG-GST-05).
import type { CatalogGuest } from '../../../shared/api-types.ts'
import { ButtonLink } from '../../components/ui/Button.tsx'
import { t } from '../../lib/messages.fr.ts'

const SEPARATOR = ' · '

export function CastingSection({ guests }: { guests: CatalogGuest[] }) {
  const names = guests.map((g) => g.name)
  const half = Math.ceil(names.length / 2)
  // Chaque ligne est répétée pour couvrir la largeur pendant le glissement.
  const line1 = [...names.slice(0, half), ...names.slice(0, half)].join(SEPARATOR)
  const line2 = [...names.slice(half), ...names.slice(half)].join(SEPARATOR) || line1

  return (
    <section aria-labelledby="sequence-casting" className="pt-14">
      <div className="gutter-x">
        <p className="eyebrow">{t.home.castingEyebrow}</p>
        <h2 id="sequence-casting" className="mt-2 font-display text-section font-black uppercase">
          {t.home.castingTitle}
        </h2>
      </div>

      <div
        aria-hidden="true"
        className="casting-timeline mt-6 overflow-hidden font-display text-[3.5rem] leading-[1.1] font-black whitespace-nowrap uppercase"
      >
        <p className="marquee-forward -ml-8">{line1}</p>
        <p className="marquee-backward -ml-24 text-tape">{line2}</p>
      </div>
      <p className="sr-only">{t.home.castingSr(names.join(', '))}</p>

      <div className="gutter-x mt-6 flex max-w-[calc(28rem+2*var(--gutter))] flex-col gap-4">
        <p className="text-[0.9375rem] text-muted">{t.home.castingNote}</p>
        <ButtonLink to="/composer/guests" variant="secondary" fullWidth>
          {t.home.castingCta}
        </ButtonLink>
      </div>
    </section>
  )
}
