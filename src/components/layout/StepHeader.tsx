// En-tête d'étape du parcours (DA §5, maquettes 02 et 10) : flèche retour et « 1 / 3 · MORCEAUX ».
// Sur ordinateur, le nom de l'application s'ajoute à gauche et l'étape passe au centre.
// La liste des étapes (avec aria-current="step") n'est lue que par les lecteurs d'écran.
import { Link } from 'react-router'
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
    <header className="gutter-x grid min-h-14 grid-cols-[auto_1fr] items-center gap-x-2 pt-2 lg:min-h-20 lg:grid-cols-[1fr_auto_1fr]">
      <div className="flex items-center gap-2">
        <Link
          to={previous ? previous.path : '/'}
          aria-label={backLabel}
          className="-ml-3 grid size-12 place-items-center"
        >
          <Icon name="arrowLeft" size={24} />
        </Link>
        <span
          aria-hidden="true"
          className="hidden font-display text-[1.375rem] leading-none font-black uppercase lg:inline"
        >
          {t.header.brand}
        </span>
      </div>
      <p
        aria-hidden="true"
        className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase"
      >
        {t.steps.label(step, total, current?.name ?? '')}
      </p>
      <nav aria-label={t.steps.nav} className="sr-only">
        <ol>
          {COMPOSE_STEPS.map((s, i) => (
            <li key={s.path} aria-current={i + 1 === step ? 'step' : undefined}>
              {t.steps.srCurrent(i + 1, total, s.name)}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  )
}
