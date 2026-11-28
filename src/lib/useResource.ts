// Lecture de données publiques (architecture §4.4) : cache mémoire par clé, durée de validité,
// annulation quand plus personne n'écoute. Remplace TanStack Query pour 4 lectures (§2.2).
// La dernière donnée reçue reste disponible même si un rafraîchissement échoue (UC-09, 2a).
import { useCallback, useEffect, useSyncExternalStore } from 'react'
import type { ApiError, Result } from './api.ts'

export type Fetcher<T> = (signal: AbortSignal) => Promise<Result<T>>

export type ResourceSnapshot<T> = {
  data: T | undefined
  error: ApiError | undefined
  /** Une requête est en cours (premier chargement ou rafraîchissement). */
  fetching: boolean
  /** Instant de la dernière réponse réussie (0 si aucune). */
  updatedAt: number
}

type Entry = {
  snapshot: ResourceSnapshot<unknown>
  listeners: Set<() => void>
  controller: AbortController | null
  fetcher: Fetcher<unknown> | null
}

const EMPTY: ResourceSnapshot<never> = {
  data: undefined,
  error: undefined,
  fetching: false,
  updatedAt: 0,
}
const cache = new Map<string, Entry>()

// Le cache n'est manipulé que par les fonctions du module, désignées par la clé.

function entryFor(key: string): Entry {
  let entry = cache.get(key)
  if (!entry) {
    entry = { snapshot: EMPTY, listeners: new Set(), controller: null, fetcher: null }
    cache.set(key, entry)
  }
  return entry
}

function update(entry: Entry, patch: Partial<ResourceSnapshot<unknown>>) {
  entry.snapshot = { ...entry.snapshot, ...patch }
  for (const listener of entry.listeners) listener()
}

function load(key: string) {
  const entry = entryFor(key)
  if (entry.controller || !entry.fetcher) return
  const controller = new AbortController()
  entry.controller = controller
  update(entry, { fetching: true })
  void entry.fetcher(controller.signal).then((result) => {
    if (entry.controller !== controller) return
    entry.controller = null
    if (result.ok) {
      update(entry, {
        data: result.value,
        error: undefined,
        fetching: false,
        updatedAt: Date.now(),
      })
    } else {
      update(entry, { error: result.error.aborted ? undefined : result.error, fetching: false })
    }
  })
}

function subscribe(key: string, listener: () => void): () => void {
  const entry = entryFor(key)
  entry.listeners.add(listener)
  return () => {
    entry.listeners.delete(listener)
    if (entry.listeners.size === 0 && entry.controller) {
      entry.controller.abort()
      entry.controller = null
      update(entry, { fetching: false })
    }
  }
}

function ensureFresh(key: string, fetcher: Fetcher<unknown>, staleTime: number) {
  const entry = entryFor(key)
  entry.fetcher = fetcher
  const { updatedAt } = entry.snapshot
  if (updatedAt === 0 || Date.now() - updatedAt > staleTime) load(key)
}

const snapshotOf = (key: string) => entryFor(key).snapshot

export function useResource<T>(
  key: string,
  fetcher: Fetcher<T>,
  { staleTime = 0 }: { staleTime?: number } = {},
): ResourceSnapshot<T> & { reload: () => void } {
  const snapshot = useSyncExternalStore(
    useCallback((listener: () => void) => subscribe(key, listener), [key]),
    () => snapshotOf(key),
    () => snapshotOf(key),
  ) as ResourceSnapshot<T>

  useEffect(() => {
    ensureFresh(key, fetcher as Fetcher<unknown>, staleTime)
  }, [key, fetcher, staleTime])

  const reload = useCallback(() => load(key), [key])

  return { ...snapshot, reload }
}

/** Vide le cache (tests uniquement). */
export function resetResourceCache(): void {
  for (const entry of cache.values()) entry.controller?.abort()
  cache.clear()
}
