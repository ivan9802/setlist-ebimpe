import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DRAFT_KEY, loadDraft, serializeDraft } from '../../src/features/draft/persistence.ts'
import { createDraft } from '../../src/features/draft/rules.ts'
import { createDraftStore } from '../../src/features/draft/store.ts'
import { createSafeStorage, type SafeStorage } from '../../src/lib/storage.ts'

const LIMITS = { maxTracks: 20, maxGuests: 5 }
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

function memoryBackend() {
  const data = new Map<string, string>()
  const backend = {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: vi.fn((k: string, v: string) => void data.set(k, v)),
    removeItem: (k: string) => void data.delete(k),
  }
  return { data, backend, storage: createSafeStorage(() => backend as unknown as Storage) }
}

let uuidCount = 0
const uuid = () => `00000000-0000-4000-8000-${String(++uuidCount).padStart(12, '0')}`
const make = (storage: SafeStorage, now = () => 1_000) =>
  createDraftStore({ storage, now, uuid, persistDelayMs: 300 })

beforeEach(() => {
  vi.useFakeTimers()
  uuidCount = 0
})
afterEach(() => vi.useRealTimers())

describe('persistance (RG-BRO-01, architecture §4.4)', () => {
  it('fait l’aller-retour d’un brouillon valide', () => {
    const d = { ...createDraft(uuid()), trackIds: [3, 1], guestIds: [2], nickname: 'Fan_Test' }
    expect(loadDraft(serializeDraft(d))).toEqual(d)
  })

  it('abandonne sans erreur un brouillon illisible ou d’une autre version', () => {
    const d = createDraft(uuid())
    expect(loadDraft(null)).toBeNull()
    expect(loadDraft('{pas du json')).toBeNull()
    expect(loadDraft(JSON.stringify({ ...d, v: 2 }))).toBeNull()
    expect(loadDraft(JSON.stringify({ ...d, trackIds: [1, 1] }))).toBeNull()
    expect(loadDraft(JSON.stringify({ ...d, trackIds: [0] }))).toBeNull()
    expect(
      loadDraft(JSON.stringify({ ...d, trackIds: Array.from({ length: 21 }, (_, i) => i + 1) })),
    ).toBeNull()
    expect(loadDraft(JSON.stringify({ ...d, idempotencyKey: 'abc' }))).toBeNull()
  })

  it('accepte un brouillon écrit avant l’ajout du drapeau keyUsed', () => {
    const older: Record<string, unknown> = { ...createDraft(uuid()) }
    delete older.keyUsed
    expect(loadDraft(JSON.stringify(older))?.keyUsed).toBe(false)
  })
})

describe('store du brouillon', () => {
  it('écrit au plus une fois toutes les 300 ms', () => {
    const { backend, storage } = memoryBackend()
    const store = make(storage)
    store.addTrack(1, LIMITS.maxTracks)
    store.addTrack(2, LIMITS.maxTracks)
    store.setNickname('Fan')
    expect(backend.setItem).not.toHaveBeenCalledWith(DRAFT_KEY, expect.anything())
    vi.advanceTimersByTime(300)
    const writes = backend.setItem.mock.calls.filter(([k]) => k === DRAFT_KEY)
    expect(writes).toHaveLength(1)
    expect(loadDraft(writes[0]?.[1] ?? null)?.trackIds).toEqual([1, 2])
  })

  it('restaure le brouillon après un rechargement de la page (UC-08)', () => {
    const { storage } = memoryBackend()
    const first = make(storage)
    first.addTrack(5, LIMITS.maxTracks)
    first.toggleGuest(2, LIMITS.maxGuests)
    first.setNickname('Fan_Test')
    first.flush()
    const reloaded = make(storage).getSnapshot()
    expect(reloaded.trackIds).toEqual([5])
    expect(reloaded.guestIds).toEqual([2])
    expect(reloaded.nickname).toBe('Fan_Test')
    expect(reloaded.idempotencyKey).toBe(first.getSnapshot().idempotencyKey)
  })

  it('fonctionne en mémoire si le stockage est interdit (navigation privée)', () => {
    const storage = createSafeStorage(() => {
      throw new DOMException('denied', 'SecurityError')
    })
    const store = make(storage)
    expect(store.persistent).toBe(false)
    expect(store.addTrack(1, LIMITS.maxTracks).ok).toBe(true)
    vi.advanceTimersByTime(300)
    expect(store.getSnapshot().trackIds).toEqual([1])
  })

  it('prévient les abonnés à chaque changement, pas lors d’un refus', () => {
    const store = make(memoryBackend().storage)
    const listener = vi.fn()
    store.subscribe(listener)
    store.addTrack(1, LIMITS.maxTracks)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(store.addTrack(1, LIMITS.maxTracks)).toEqual({ ok: false, reason: 'duplicate' })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('note l’instant d’entrée dans la composition une seule fois (D-2)', () => {
    let now = 5_000
    const store = make(memoryBackend().storage, () => now)
    expect(store.getSnapshot().startedAt).toBe(0)
    store.markStarted()
    now = 9_000
    store.markStarted()
    expect(store.getSnapshot().startedAt).toBe(5_000)
  })

  it('après une validation confirmée : brouillon effacé, nouvelle clé (RG-BRO-02)', () => {
    const { data, storage } = memoryBackend()
    const store = make(storage)
    store.addTrack(1, LIMITS.maxTracks)
    store.flush()
    const before = store.getSnapshot().idempotencyKey
    store.reset()
    expect(data.has(DRAFT_KEY)).toBe(false)
    expect(store.getSnapshot().trackIds).toEqual([])
    expect(store.getSnapshot().idempotencyKey).not.toBe(before)
    expect(store.getSnapshot().idempotencyKey).toMatch(UUID)
  })

  it('garde la même clé pour un simple « Réessayer » (CA-12, CA-13)', () => {
    const store = make(memoryBackend().storage)
    store.addTrack(1, LIMITS.maxTracks)
    const key = store.getSnapshot().idempotencyKey
    store.markKeyUsed()
    store.markKeyUsed()
    expect(store.getSnapshot().idempotencyKey).toBe(key)
  })

  it('change de clé si le brouillon est modifié après un envoi peut-être parti', () => {
    const store = make(memoryBackend().storage)
    store.addTrack(1, LIMITS.maxTracks)
    const key = store.getSnapshot().idempotencyKey
    store.markKeyUsed()
    store.addTrack(2, LIMITS.maxTracks)
    const next = store.getSnapshot()
    expect(next.idempotencyKey).not.toBe(key)
    expect(next.keyUsed).toBe(false)
  })

  it('retire les éléments devenus inactifs et dit lesquels', () => {
    const store = make(memoryBackend().storage)
    store.addTrack(1, LIMITS.maxTracks)
    store.addTrack(2, LIMITS.maxTracks)
    const removed = store.purge({ trackIds: new Set([2]), guestIds: new Set() })
    expect(removed).toEqual({ removedTrackIds: [1], removedGuestIds: [] })
    expect(store.getSnapshot().trackIds).toEqual([2])
  })

  it('réordonne avec les boutons Monter et Descendre', () => {
    const store = make(memoryBackend().storage)
    for (const id of [1, 2, 3]) store.addTrack(id, LIMITS.maxTracks)
    store.moveTrack(2, 1)
    expect(store.getSnapshot().trackIds).toEqual([1, 3, 2])
  })
})
