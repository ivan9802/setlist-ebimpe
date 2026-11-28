// Point d'entrée unique de Sentry, chargé à la demande par observability.ts.
// Les imports nommés permettent d'écarter du bundle ce qui n'est pas utilisé (Replay, Feedback…).
export { captureException, init } from '@sentry/browser'
