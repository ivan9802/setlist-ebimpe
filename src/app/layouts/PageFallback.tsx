import { t } from '../../lib/messages.fr.ts'

/** Affiché pendant le chargement d'une page à la demande (connexion lente). */
export function PageFallback() {
  return (
    <p role="status" className="gutter-x py-12 text-muted">
      {t.loading}
    </p>
  )
}
