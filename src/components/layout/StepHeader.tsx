// En-tête d'étape du parcours (DA §5) : bouton retour, « 1 / 3 » et nom de l'étape, plus une
// barre de 3 segments. L'étape courante porte aria-current="step".
import { Link } from 'react-router'
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'
import { Icon } from '../ui/Icon.tsx'

export const COMPOSE_STEPS = [
  { path: '/composer/morceaux', name: t.steps.names[0] },
  { path: '/composer/guests', name: t.steps.names[1] },
  { path: '/composer/recap', name: t.steps.names[2] },
] as const

/** `step` vaut 1, 2 ou 3. Le retour mène à l'étape précédente, ou à l'accueil depuis la 1. */
export function StepHeader({ step }: { step: 1 | 2 | 3 }) {
  const total = COMPOSE_STEPS.length
  const current = COMPOSE_STEPS[step - 1]
  const previous = step > 1 ? COMPOSE_STEPS[step - 2] : undefined
  const backLabel = previous ? t.steps.backTo(previous.name) : t.backHome

  return (
    <header className="gutter-x flex flex-col gap-2 pt-2 pb-3">
      <div className="flex items-center gap-2">
        <Link
          to={previous ? previous.path : '/'}
          aria-label={backLabel}
          className="-ml-3 grid size-12 place-items-center"
        >
          <Icon name="chevronLeft" />
        </Link>
        <p aria-hidden="true" className="label-caps">
          <span className="text-signal">{t.steps.counter(step, total)}</span> {current?.name}
        </p>
      </div>
      <nav aria-label={t.steps.nav}>
        <ol className="grid grid-cols-3 gap-1">
          {COMPOSE_STEPS.map((s, i) => (
            <li
              key={s.path}
              aria-current={i + 1 === step ? 'step' : undefined}
              className={cx('h-1 rounded-pill', i + 1 <= step ? 'bg-signal' : 'bg-concrete')}
            >
              <span className="sr-only">{t.steps.srCurrent(i + 1, total, s.name)}</span>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  )
}
