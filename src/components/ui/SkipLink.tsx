import { t } from '../../lib/messages.fr.ts'

/** Lien d'évitement, visible au focus (DA §5, §10). Le contenu principal porte l'id `contenu`. */
export function SkipLink() {
  return (
    <a
      href="#contenu"
      className="label-caps sr-only z-50 rounded-control bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      {t.skipLink}
    </a>
  )
}
