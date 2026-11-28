// Store du brouillon (architecture §4.4) : store externe lu par useSyncExternalStore, persistance
// dans le stockage local écrite au plus toutes les 300 ms, et forcée quand la page est quittée.
// Le brouillon reste sur l'appareil du fan (RG-BRO-01) et n'est jamais compté (RG-BRO-03).
import { safeStorage, type SafeStorage } from '../../lib/storage.ts'
import { DRAFT_KEY, loadDraft, serializeDraft } from './persistence.ts'
import {
  addTrack,
  contentChanged,
  createDraft,
  moveTrack,
  purgeInactive,
  removeTrack,
  toggleGuest,
  type Draft,
  type Outcome,
} from './rules.ts'

export const PERSIST_DELAY_MS = 300

type Options = {
  storage: SafeStorage
  now: () => number
  uuid: () => string
  persistDelayMs?: number
}

export type DraftStore = ReturnType<typeof createDraftStore>

export function createDraftStore({
  storage,
  now,
  uuid,
  persistDelayMs = PERSIST_DELAY_MS,
}: Options) {
  let draft: Draft = loadDraft(storage.get(DRAFT_KEY)) ?? createDraft(uuid())
  const listeners = new Set<() => void>()
  let timer: ReturnType<typeof setTimeout> | null = null

  const write = () => {
    timer = null
    storage.set(DRAFT_KEY, serializeDraft(draft))
  }

  const commit = (next: Draft) => {
    if (next === draft) return
    // Contenu modifié après un envoi peut-être parti : nouvelle clé (voir Draft.keyUsed).
    const rotate = draft.keyUsed && contentChanged(draft, next)
    draft = {
      ...next,
      ...(rotate ? { idempotencyKey: uuid(), keyUsed: false } : {}),
      updatedAt: now(),
    }
    timer ??= setTimeout(write, persistDelayMs)
    for (const listener of listeners) listener()
  }

  const apply = (outcome: Outcome): Outcome => {
    if (outcome.ok) commit(outcome.draft)
    return outcome
  }

  return {
    getSnapshot: (): Draft => draft,
    subscribe(listener: () => void): () => void {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    /** Vrai si le brouillon survit à un rechargement (faux en navigation privée). */
    get persistent(): boolean {
      return storage.persistent
    },

    addTrack: (trackId: number, maxTracks: number) => apply(addTrack(draft, trackId, maxTracks)),
    removeTrack: (trackId: number) => commit(removeTrack(draft, trackId)),
    moveTrack: (from: number, to: number) => commit(moveTrack(draft, from, to)),
    toggleGuest: (guestId: number, maxGuests: number) =>
      apply(toggleGuest(draft, guestId, maxGuests)),
    setNickname: (nickname: string) => {
      if (nickname !== draft.nickname) commit({ ...draft, nickname })
    },

    /** D-2 : instant d'entrée dans /composer, noté une seule fois par brouillon. */
    markStarted: () => {
      if (draft.startedAt === 0) commit({ ...draft, startedAt: now() })
    },
    /** Juste avant un envoi : la clé courante a peut-être été enregistrée par le serveur. */
    markKeyUsed: () => {
      if (!draft.keyUsed) commit({ ...draft, keyUsed: true })
    },
    purge(active: { trackIds: ReadonlySet<number>; guestIds: ReadonlySet<number> }) {
      const { draft: next, removedTrackIds, removedGuestIds } = purgeInactive(draft, active)
      commit(next)
      return { removedTrackIds, removedGuestIds }
    },
    /** RG-BRO-02 : après une validation confirmée, brouillon effacé et nouvelle clé. */
    reset: () => {
      if (timer) clearTimeout(timer)
      timer = null
      storage.remove(DRAFT_KEY)
      draft = createDraft(uuid())
      for (const listener of listeners) listener()
    },
    /** Écrit tout de suite ce qui attend (page quittée, onglet masqué). */
    flush: () => {
      if (!timer) return
      clearTimeout(timer)
      write()
    },
  }
}

/** Instance de l'application, créée au premier chargement du module (chunk du parcours). */
export const draftStore: DraftStore = createDraftStore({
  storage: safeStorage,
  now: Date.now,
  uuid: () => crypto.randomUUID(),
})

if (typeof window !== 'undefined') {
  // Ne rien perdre si l'onglet est fermé ou passe en arrière-plan avant l'écriture différée.
  window.addEventListener('pagehide', draftStore.flush)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') draftStore.flush()
  })
}
