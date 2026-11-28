import { Link, NavLink } from 'react-router'
import { t } from '../../lib/messages.fr.ts'

/** En-tête minimal (DA §6) : nom de la campagne à gauche, « Résultats » à droite. */
export function Header() {
  return (
    <header className="gutter-x flex min-h-14 items-center justify-between gap-4 py-2">
      <Link
        to="/"
        aria-label={t.header.brandLabel}
        className="font-display text-title font-black tracking-wide uppercase"
      >
        {t.header.brand}
      </Link>
      <nav aria-label={t.header.nav}>
        <NavLink
          to="/resultats"
          className="label-caps inline-flex min-h-12 items-center px-2 underline-offset-4 hover:underline aria-[current=page]:text-signal"
        >
          {t.header.results}
        </NavLink>
      </nav>
    </header>
  )
}
