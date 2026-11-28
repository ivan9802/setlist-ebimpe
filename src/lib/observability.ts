// Erreurs du navigateur (architecture §4.2). Sentry est chargé APRÈS le premier rendu et
// seulement si un DSN est configuré. Les erreurs survenues avant sont gardées en tampon.
// Aucune donnée personnelle : ni pseudo, ni IP, ni corps de requête (CA-NF-06).
import { env } from './env.ts'

type Context = Record<string, string>
type Sentry = typeof import('./sentry.ts')

const MAX_BUFFER = 20
let buffer: { error: unknown; context?: Context }[] = []
let sentry: Sentry | null = null

export function reportError(error: unknown, context?: Context): void {
  if (import.meta.env.DEV) console.error(error, context)
  if (sentry) {
    sentry.captureException(error, context ? { extra: context } : undefined)
  } else if (buffer.length < MAX_BUFFER) {
    buffer.push(context ? { error, context } : { error })
  }
}

let earlyCaptureInstalled = false

/** Garde les erreurs non interceptées survenues avant le chargement de Sentry. */
export function installEarlyErrorCapture(target: Window = window): void {
  if (earlyCaptureInstalled) return
  earlyCaptureInstalled = true
  target.addEventListener('error', (e) => {
    if (!sentry) reportError(e.error ?? e.message)
  })
  target.addEventListener('unhandledrejection', (e) => {
    if (!sentry) reportError(e.reason)
  })
}

/** À appeler après le premier rendu. Sans DSN, le tampon est simplement vidé. */
export async function initObservability(dsn: string = env.sentryDsn): Promise<void> {
  if (!dsn) {
    buffer = []
    return
  }
  const Sentry = await import('./sentry.ts')
  Sentry.init({
    dsn,
    release: env.appVersion,
    // Sentry 11 : `dataCollection` remplace `sendDefaultPii`. Rien d'identifiant n'est collecté.
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
    },
    beforeSend(event) {
      delete event.user
      if (event.request) delete event.request.data
      return event
    },
  })
  sentry = Sentry
  const pending = buffer
  buffer = []
  for (const { error, context } of pending) reportError(error, context)
}
