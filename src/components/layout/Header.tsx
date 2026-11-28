import { Link, NavLink } from 'react-router'
import { t } from '../../lib/messages.fr.ts'

/**
 * En-tête minimal (DA §6, maquette 01) : « HIMRA ULTRA » à gauche, « Résultats » discret à droite.
 * Au-dessus du halo de l'accueil, qui remonte derrière lui.
 */
export function Header() {
  return (
    <header className="gutter-x relative z-10 flex min-h-16 items-center justify-between gap-4">
      <Link
        to="/"
        aria-label={t.header.brandLabel}
        className="font-display text-[1.25rem] leading-none font-black uppercase"
      >
        {t.header.brand}
      </Link>
      <nav aria-label={t.header.nav}>
        <NavLink
          to="/resultats"
          className="-mr-2 inline-flex min-h-12 items-center px-2 text-[0.9375rem] font-semibold text-muted underline-offset-4 hover:text-paper hover:underline aria-[current=page]:text-paper"
        >
          {t.header.results}
        </NavLink>
      </nav>
    </header>
  )
}
