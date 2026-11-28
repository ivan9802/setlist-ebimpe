// Écran de repli (architecture §5.5.2) : une ErrorBoundary par zone affiche « Recharger » et
// envoie l'erreur à Sentry. Elle couvre aussi l'échec de chargement d'une page à la demande
// (ancien module retiré après un déploiement). Le brouillon est en stockage local : recharger
// ne le perd pas.
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '../components/ui/Button.tsx'
import { t } from '../lib/messages.fr.ts'
import { reportError } from '../lib/observability.ts'

export function ErrorScreen() {
  return (
    <main id="contenu" className="gutter-x flex min-h-dvh flex-col justify-center gap-6 py-12">
      <h1 className="font-display text-display-l font-black uppercase">{t.errorBoundary.title}</h1>
      <p className="max-w-[48ch] text-muted">{t.errorBoundary.text}</p>
      <div>
        <Button onClick={() => window.location.reload()}>{t.errorBoundary.action}</Button>
      </div>
    </main>
  )
}

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  override componentDidCatch(error: unknown, info: ErrorInfo) {
    reportError(error, { zone: 'app', componentStack: info.componentStack ?? '' })
  }

  override render() {
    return this.state.failed ? <ErrorScreen /> : this.props.children
  }
}
