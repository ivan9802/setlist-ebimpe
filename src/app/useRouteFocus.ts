// Changement de page ou d'étape (DA §10) : retour en haut de page, puis focus sur le h1 de la
// nouvelle page, pour que les lecteurs d'écran annoncent où l'on est. Rien ne bouge au premier
// chargement. Avec « Précédent » du navigateur (POP), la position de défilement est laissée.
import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

/** Délai maximal d'attente d'une page chargée à la demande (connexion lente). */
const WAIT_FOR_HEADING_MS = 10_000

// Partagé entre les mises en page : passer de l'accueil au parcours démonte la première.
let lastPathname: string | null = null

function focusHeading(): boolean {
  const heading = document.querySelector<HTMLElement>('#contenu h1')
  if (!heading) return false
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  heading.focus({ preventScroll: true })
  return true
}

export function useRouteFocus(): void {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (lastPathname === null || lastPathname === pathname) {
      lastPathname = pathname
      return
    }
    lastPathname = pathname
    if (navigationType !== 'POP') window.scrollTo(0, 0)
    if (focusHeading()) return

    // La page est encore en cours de chargement (React.lazy) : on attend que son titre apparaisse.
    const main = document.getElementById('contenu')
    if (!main) return
    const observer = new MutationObserver(() => {
      if (focusHeading()) observer.disconnect()
    })
    observer.observe(main, { childList: true, subtree: true })
    const timer = setTimeout(() => observer.disconnect(), WAIT_FOR_HEADING_MS)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [pathname, navigationType])
}
