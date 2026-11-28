// Accès sûr au stockage local (architecture §4.2). En navigation privée ou si le stockage est
// plein, le parcours continue avec un repli en mémoire (UC-08, alternative 1b).

export type SafeStorage = {
  get(key: string): string | null
  /** Renvoie false si la valeur n'a pu être gardée qu'en mémoire. */
  set(key: string, value: string): boolean
  remove(key: string): void
  /** Vrai si les données survivent à un rechargement de la page. */
  readonly persistent: boolean
}

const PROBE_KEY = 'hute:probe'

export function createSafeStorage(getBackend: () => Storage | undefined): SafeStorage {
  const memory = new Map<string, string>()
  let backend: Storage | undefined
  try {
    backend = getBackend()
    backend?.setItem(PROBE_KEY, '1')
    backend?.removeItem(PROBE_KEY)
  } catch {
    backend = undefined
  }

  return {
    get persistent() {
      return backend !== undefined
    },
    get(key) {
      if (memory.has(key)) return memory.get(key) ?? null
      try {
        return backend?.getItem(key) ?? null
      } catch {
        return null
      }
    },
    set(key, value) {
      try {
        if (backend) {
          backend.setItem(key, value)
          memory.delete(key)
          return true
        }
      } catch {
        // Quota dépassé ou stockage retiré en cours de route : on garde en mémoire.
      }
      memory.set(key, value)
      return false
    },
    remove(key) {
      memory.delete(key)
      try {
        backend?.removeItem(key)
      } catch {
        // Rien à faire : la valeur n'existe plus côté mémoire.
      }
    },
  }
}

export const safeStorage: SafeStorage = createSafeStorage(() =>
  typeof window === 'undefined' ? undefined : window.localStorage,
)
