import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'

/**
 * Mention d'indépendance (RG-JUR-01) : pied de chaque page publique et chaque carte.
 * La version courte figure sous le bouton de l'ouverture (maquettes 01 et 01c) ; la version
 * complète reste dans le pied de page de la même page.
 */
export function IndependenceNote({
  className,
  short = false,
}: {
  className?: string
  short?: boolean
}) {
  return (
    <p className={cx('text-caption text-muted', className)}>
      {short ? t.independenceShort : t.independence}
    </p>
  )
}
