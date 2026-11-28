// Accès React au brouillon. Les actions sont les méthodes du store (références stables) ;
// les limites viennent du catalogue et sont passées par la page, qui compose les features.
import { useEffect, useSyncExternalStore } from 'react'
import { draftStore, type DraftStore } from './store.ts'

export function useDraft(store: DraftStore = draftStore) {
  const draft = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
  return { draft, store }
}

/** À l'entrée d'une étape de composition : note le début du brouillon (D-2). */
export function useMarkDraftStarted(store: DraftStore = draftStore): void {
  useEffect(() => store.markStarted(), [store])
}
