// Silhouettes de chargement (DA §5) : sans scintillement si les animations sont réduites.
// La liste annonce « Chargement… » une fois, les blocs eux-mêmes sont muets.
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx('rounded-control bg-stage motion-safe:animate-skeleton', className)}
    />
  )
}

/** Lignes de 64 px (TrackRow) : 8 par défaut, comme l'état de chargement de l'étape Morceaux. */
export function SkeletonList({ rows = 8, label = t.loading }: { rows?: number; label?: string }) {
  return (
    <div role="status" className="flex flex-col gap-2">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-16" />
      ))}
    </div>
  )
}
