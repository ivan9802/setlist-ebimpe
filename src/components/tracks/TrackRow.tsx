// Ligne du catalogue (DA §5 « TrackRow », maquettes 02, 02b, 10) : pochette ou monogramme du
// projet, titre en capitales, type ou « feat. », bouton « + Ajouter » / « ✓ Ajouté ». L'état ne
// passe pas que par la couleur : icône, libellé et aria-pressed. Set-list pleine : bouton
// désactivé avec la raison écrite.
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'
import { Icon } from '../ui/Icon.tsx'

export type TrackRowProps = {
  title: string
  subtitle: string
  /** Initiales du projet, affichées quand il n'y a pas de pochette autorisée. */
  monogram: string
  coverUrl: string | null
  coverAlt: string
  added: boolean
  /** Set-list pleine : on ne peut plus ajouter, mais on peut retirer. */
  full: boolean
  onToggle: () => void
}

const PILL =
  'relative inline-flex h-9 min-w-24 shrink-0 items-center justify-center gap-1 rounded-pill px-4 ' +
  "text-[0.9375rem] font-semibold whitespace-nowrap before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-['']"

export function TrackRow({
  title,
  subtitle,
  monogram,
  coverUrl,
  coverAlt,
  added,
  full,
  onToggle,
}: TrackRowProps) {
  const blocked = full && !added
  return (
    <li className="flex min-h-[4.25rem] items-center gap-4 border-b border-concrete py-2.5">
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={coverAlt}
          width={48}
          height={48}
          loading="lazy"
          className="size-12 shrink-0 rounded-paper object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-paper bg-stage font-display text-[1.125rem] font-extrabold text-muted uppercase"
        >
          {monogram}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[1rem] leading-tight font-semibold uppercase">{title}</p>
        <p className="mt-0.5 text-[0.875rem] leading-tight text-muted">{subtitle}</p>
      </div>
      <button
        type="button"
        aria-pressed={added}
        aria-disabled={blocked || undefined}
        onClick={() => {
          if (!blocked) onToggle()
        }}
        className={cx(
          PILL,
          added && 'bg-signal text-ink motion-safe:active:scale-[.98]',
          !added && !blocked && 'border border-paper text-paper motion-safe:active:scale-[.98]',
          blocked && 'cursor-not-allowed bg-concrete text-muted',
        )}
      >
        {added ? (
          <>
            <Icon name="check" size={16} />
            {t.tracks.added}
          </>
        ) : blocked ? (
          t.tracks.full
        ) : (
          <>
            <Icon name="plus" size={16} />
            {t.tracks.add}
          </>
        )}
        <span className="sr-only"> {title}</span>
      </button>
    </li>
  )
}

/** Silhouette d'une ligne pendant le chargement (maquette 02b). */
export function TrackRowSkeleton() {
  return (
    <li aria-hidden="true" className="flex min-h-[4.25rem] items-center gap-4 py-2.5">
      <span className="size-12 shrink-0 rounded-paper bg-stage motion-safe:animate-skeleton" />
      <span className="flex flex-1 flex-col gap-2">
        <span className="h-3 w-3/5 rounded-pill bg-stage motion-safe:animate-skeleton" />
        <span className="h-2.5 w-2/5 rounded-pill bg-stage motion-safe:animate-skeleton" />
      </span>
    </li>
  )
}
