// Compteur « 12 / 20 » en rouge (DA §5, maquettes 02 et 03) : annoncé poliment aux lecteurs d'écran à chaque changement,
// avec une courte animation du chiffre (coupée si les animations sont réduites).
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'

type Props = {
  value: number
  max: number
  /** Nom des éléments comptés, pour l'annonce : « titres », « guests ». */
  noun: string
  className?: string
}

export function Counter({ value, max, noun, className }: Props) {
  return (
    <p
      aria-live="polite"
      aria-atomic="true"
      className={cx(
        'font-display text-display-m leading-none font-black whitespace-nowrap text-signal',
        className,
      )}
    >
      <span aria-hidden="true">
        <span key={value} className="inline-block motion-safe:animate-bump">
          {value}
        </span>
        <span> / {max}</span>
      </span>
      <span className="sr-only">{t.counter.sr(value, max, noun)}</span>
    </p>
  )
}
