// La feuille de papier, variante figée (DA §5 « SetlistSheet », maquette 01 séquence 2) :
// numéros au marqueur, titres en capitales, « feat. » en bas de casse, bloc « Mon casting »,
// bandes de gaffer. Servira aussi au récapitulatif, à la confirmation et à la page publique.
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'
import { Tape } from '../ui/Tape.tsx'

export type SheetTrack = { title: string; featuredArtists?: string | null }

type Props = {
  /** En-tête de la feuille : « EXEMPLE » ou le pseudo. */
  heading: string
  tracks: SheetTrack[]
  guests?: string[]
  className?: string
  /** Classe d'animation des bandes de gaffer (entrée au défilement sur l'accueil). */
  tapeClassName?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

export function SetlistSheet({ heading, tracks, guests = [], className, tapeClassName }: Props) {
  return (
    <figure className={cx('paper relative px-5 pt-7 pb-5', className)}>
      <Tape variant={0} className={cx('absolute -top-2 left-3 -rotate-3', tapeClassName)} />
      <Tape variant={1} className={cx('absolute -top-3 right-1 rotate-2', tapeClassName)} />
      <figcaption className="font-display text-[1.375rem] leading-none font-black uppercase">
        {heading}
      </figcaption>
      <ol className="mt-3 flex flex-col gap-2">
        {tracks.map((track, i) => (
          <li key={`${i}-${track.title}`} className="grid grid-cols-[2rem_1fr] items-baseline">
            <span
              aria-hidden="true"
              className="inline-block -rotate-2 font-display text-[1.375rem] leading-none font-black text-signal-ink"
            >
              {pad(i + 1)}
            </span>
            <span className="text-[0.9375rem] leading-tight">
              <span className="font-semibold uppercase">{track.title}</span>
              {track.featuredArtists && (
                <span>
                  {' · '}
                  {t.playlist.feat(track.featuredArtists)}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
      {guests.length > 0 && (
        <div className="mt-4 border-t border-ink/30 pt-2">
          <p className="text-[0.6875rem] font-semibold tracking-[0.08em] text-signal-ink uppercase">
            {t.playlist.castingLabel}
          </p>
          <p className="mt-1 font-display text-[1.25rem] leading-none font-black uppercase">
            {guests.join(' · ')}
          </p>
        </div>
      )}
    </figure>
  )
}
