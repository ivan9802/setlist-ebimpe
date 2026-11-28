import type { ReactNode } from 'react'

/** Texte réservé aux lecteurs d'écran. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}
