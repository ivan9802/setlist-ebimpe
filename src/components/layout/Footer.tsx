import { Fragment } from 'react'
import { Link } from 'react-router'
import { t } from '../../lib/messages.fr.ts'
import { IndependenceNote } from './IndependenceNote.tsx'

const LEGAL_LINKS = [
  { to: '/mentions-legales', label: t.footer.legal },
  { to: '/confidentialite', label: t.footer.privacy },
  { to: '/conditions', label: t.footer.termsShort },
] as const

/**
 * Pied de page public (DA §6, maquette 01) : fond Plateau, mention d'indépendance complète
 * (RG-JUR-01), liens légaux en ligne, nom complet de l'expérience.
 */
export function Footer() {
  return (
    <footer className="gutter-x mt-14 flex flex-col gap-5 bg-stage pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <IndependenceNote className="max-w-[48ch]" />
      <nav aria-label={t.footer.legalNav}>
        <ul className="flex flex-wrap items-center text-[0.9375rem]">
          {LEGAL_LINKS.map((link, i) => (
            <Fragment key={link.to}>
              {i > 0 && (
                <li aria-hidden="true" className="px-1 text-muted">
                  ·
                </li>
              )}
              <li>
                <Link
                  to={link.to}
                  className="inline-flex min-h-12 items-center underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>
      <p className="font-display text-[1.25rem] leading-none font-extrabold text-muted uppercase">
        {t.footer.fullName}
      </p>
    </footer>
  )
}
