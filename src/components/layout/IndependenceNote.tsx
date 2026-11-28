import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'

/** Mention d'indépendance (RG-JUR-01) : pied de chaque page publique et chaque carte. */
export function IndependenceNote({ className }: { className?: string }) {
  return <p className={cx('text-caption text-muted', className)}>{t.independence}</p>
}
