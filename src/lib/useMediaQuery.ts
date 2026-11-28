// Requête média lue dans React (useSyncExternalStore). Sert à n'afficher qu'une seule version
// d'un bloc (tiroir mobile ou panneau ordinateur) plutôt que deux copies dont une masquée.
// Sans matchMedia (tests, très vieux navigateurs), la version mobile est retenue.
import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => (typeof window !== 'undefined' && window.matchMedia?.(query).matches) || false,
    () => false,
  )
}

/** Composition en deux zones à partir de 1024 px (DA §9). */
export const DESKTOP_QUERY = '(min-width: 64rem)'
