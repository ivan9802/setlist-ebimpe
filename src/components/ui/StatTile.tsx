// Grand chiffre et libellé (DA §5). Pendant le chargement, « … » occupe déjà la place :
// aucun décalage de mise en page à l'arrivée de la valeur (CLS, architecture §4.5).
import { cx } from '../../lib/cx.ts'
import { formatNumber } from '../../lib/format.ts'
import { t } from '../../lib/messages.fr.ts'

type Props = {
  /** null tant que la valeur n'est pas connue. */
  value: number | null
  label: string
  className?: string
}

export function StatTile({ value, label, className }: Props) {
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <p className="min-h-[1em] font-display text-display-l font-black text-signal">
        {value === null ? (
          <>
            <span aria-hidden="true">…</span>
            <span className="sr-only">{t.loading}</span>
          </>
        ) : (
          formatNumber(value)
        )}
      </p>
      <p className="text-caption text-muted">{label}</p>
    </div>
  )
}
