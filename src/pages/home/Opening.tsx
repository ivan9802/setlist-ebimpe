// Séquence 1 · Ouverture (maquettes 01 et 01c). Le slogan, le compteur et le bouton principal
// sont visibles sans défiler à 360 px (CA-01). Un seul h1 : le titre de campagne.
import { useEffect, useState, type CSSProperties, type Ref } from 'react'
import { IndependenceNote } from '../../components/layout/IndependenceNote.tsx'
import { ButtonLink } from '../../components/ui/Button.tsx'
import { cx } from '../../lib/cx.ts'
import { formatNumber } from '../../lib/format.ts'
import { t } from '../../lib/messages.fr.ts'
import { isFirstVisitOfSession, markIntroSeen } from './intro.ts'
import { useCountUp } from './useCountUp.ts'

type Props = {
  ref?: Ref<HTMLElement>
  closed: boolean
  eventLabel: string
  /** null tant que le nombre n'est pas connu : « … » occupe la place, sans fausse valeur. */
  participations: number | null
}

/** Mots du titre, révélés l'un après l'autre à la première visite (ligne par ligne sur mobile). */
function HeroTitle({ text, intro, small }: { text: string; intro: boolean; small: boolean }) {
  const words = text.split(' ')
  return (
    // Nom accessible explicite : le découpage en mots (pour l'animation) ne doit pas gêner la lecture.
    <h1
      id="titre-campagne"
      aria-label={text}
      // Campagne close : titre plus long, à la taille du rappel (maquette 01c, 3 lignes à 360 px).
      className={cx(
        'hero-title font-display font-black uppercase',
        small ? 'text-recall' : 'text-hero',
      )}
    >
      {words.map((word, i) => (
        <span key={`${i}-${word}`}>
          {/* inline-block seulement pour l'animation : sinon « SET-LISTS » peut se couper au tiret. */}
          <span
            className={intro ? 'hero-word inline-block' : undefined}
            style={intro ? ({ '--i': i } as CSSProperties) : undefined}
          >
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </h1>
  )
}

function Counter({ value, label }: { value: number | null; label: (n: number) => string }) {
  const shown = useCountUp(value)
  return (
    <div className="mt-7 flex items-center gap-4">
      <p
        aria-hidden="true"
        className="min-w-[4ch] font-display text-figure font-black whitespace-nowrap text-signal"
      >
        {shown === null ? '…' : formatNumber(shown)}
      </p>
      <p aria-hidden="true" className="max-w-[11rem] text-[0.875rem] leading-tight text-muted">
        {label(value ?? 2)}
      </p>
      <p aria-live="polite" className="sr-only">
        {value === null ? '' : `${formatNumber(value)} ${label(value)}`}
      </p>
    </div>
  )
}

export function Opening({ ref, closed, eventLabel, participations }: Props) {
  // Lecture pure au rendu ; le drapeau de session est posé après l'affichage.
  const [intro] = useState(isFirstVisitOfSession)
  useEffect(markIntroSeen, [])

  return (
    <section
      ref={ref}
      aria-labelledby="titre-campagne"
      className="gutter-x relative isolate flex min-h-[calc(100svh-4rem)] flex-col pt-8 pb-14"
    >
      {!closed && (
        <div
          aria-hidden="true"
          className="spotlight hero-halo pointer-events-none absolute inset-x-0 -top-16 bottom-0 -z-10"
        />
      )}
      <p className="eyebrow">{eventLabel}</p>
      <div className="mt-2">
        <HeroTitle
          text={closed ? t.home.closedTitle : t.home.title}
          intro={intro && !closed}
          small={closed}
        />
      </div>
      {!closed && (
        <p className="mt-1 font-display text-[1.875rem] leading-none font-extrabold text-signal uppercase">
          {t.home.promise}
        </p>
      )}
      <p className={cx('max-w-[19rem] text-[1.125rem] leading-[1.4]', closed ? 'mt-20' : 'mt-6')}>
        {closed ? t.home.closedHook : t.home.hook}
      </p>
      <Counter
        value={participations}
        label={closed ? t.home.closedCounterLabel : t.home.counterLabel}
      />
      <div className="mt-6 flex max-w-md flex-col items-start gap-1">
        {closed ? (
          <ButtonLink to="/resultats" fullWidth>
            {t.home.results}
          </ButtonLink>
        ) : (
          <>
            <ButtonLink to="/composer/morceaux" fullWidth>
              {t.home.cta}
            </ButtonLink>
            <ButtonLink to="/resultats" variant="link">
              {t.home.results}
            </ButtonLink>
          </>
        )}
        <IndependenceNote className={closed ? 'mt-6' : 'mt-1'} short />
      </div>
    </section>
  )
}
