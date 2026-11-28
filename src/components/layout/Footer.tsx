import { Link } from 'react-router'
import { t } from '../../lib/messages.fr.ts'
import { IndependenceNote } from './IndependenceNote.tsx'

const LEGAL_LINKS = [
  { to: '/mentions-legales', label: t.footer.legal },
  { to: '/confidentialite', label: t.footer.privacy },
  { to: '/conditions', label: t.footer.terms },
] as const

/** Pied de page public : mention d'indépendance et pages légales (DA §6, RG-JUR-01). */
export function Footer() {
  return (
    <footer className="gutter-x mt-16 flex flex-col gap-4 border-t border-concrete py-8">
      <IndependenceNote />
      <nav aria-label={t.footer.legalNav}>
        <ul className="flex flex-wrap gap-x-4">
          {LEGAL_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="inline-flex min-h-12 items-center text-caption text-paper underline underline-offset-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
