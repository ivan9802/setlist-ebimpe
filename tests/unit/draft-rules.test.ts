import { describe, expect, it } from 'vitest'
import {
  addTrack,
  canContinue,
  createDraft,
  moveTrack,
  purgeInactive,
  removeTrack,
  toggleGuest,
  type Draft,
} from '../../src/features/draft/rules.ts'

const LIMITS = { maxTracks: 20, maxGuests: 5 }
const KEY = '3f2b8c1e-9d4a-4b6f-8a2e-1c5d7e9f0a3b'
const empty = () => createDraft(KEY)
const withTracks = (...ids: number[]): Draft => ({ ...empty(), trackIds: ids })
const withGuests = (...ids: number[]): Draft => ({ ...empty(), guestIds: ids })

describe('morceaux (RG-TRK)', () => {
  it('ajoute un nouveau morceau en dernière position (RG-TRK-04)', () => {
    const r = addTrack(withTracks(4, 9), 2, LIMITS.maxTracks)
    expect(r.ok && r.draft.trackIds).toEqual([4, 9, 2])
  })

  it('refuse un morceau déjà présent (RG-TRK-03)', () => {
    expect(addTrack(withTracks(4, 9), 9, LIMITS.maxTracks)).toEqual({
      ok: false,
      reason: 'duplicate',
    })
  })

  it('refuse le 21e morceau, la set-list reste à 20 (CA-03, RG-TRK-02)', () => {
    const full = withTracks(...Array.from({ length: 20 }, (_, i) => i + 1))
    expect(addTrack(full, 21, LIMITS.maxTracks)).toEqual({ ok: false, reason: 'full' })
  })

  it('applique la limite réglée par l’admin', () => {
    expect(addTrack(withTracks(1, 2, 3), 4, 3)).toEqual({ ok: false, reason: 'full' })
  })

  it('renumérote sans trou après un retrait (RG-TRK-05)', () => {
    expect(removeTrack(withTracks(4, 9, 2), 9).trackIds).toEqual([4, 2])
  })

  it('déplace un morceau ; l’ordre affiché est l’ordre gardé (RG-TRK-06)', () => {
    expect(moveTrack(withTracks(1, 2, 3, 4), 3, 0).trackIds).toEqual([4, 1, 2, 3])
    expect(moveTrack(withTracks(1, 2, 3, 4), 0, 2).trackIds).toEqual([2, 3, 1, 4])
  })

  it('ignore un déplacement hors limites', () => {
    const d = withTracks(1, 2, 3)
    expect(moveTrack(d, 0, -1)).toBe(d)
    expect(moveTrack(d, 2, 3)).toBe(d)
    expect(moveTrack(d, 1, 1)).toBe(d)
  })

  it('ne laisse pas continuer avec une set-list vide (CA-04, RG-TRK-01)', () => {
    expect(canContinue(empty(), LIMITS)).toBe(false)
    expect(canContinue(withTracks(7), LIMITS)).toBe(true)
  })

  it('ne laisse pas continuer au-delà d’une limite abaissée entre-temps', () => {
    expect(canContinue(withTracks(1, 2, 3, 4), { maxTracks: 3, maxGuests: 5 })).toBe(false)
  })
})

describe('guests (RG-GST)', () => {
  it('sélectionne puis désélectionne', () => {
    const on = toggleGuest(empty(), 3, LIMITS.maxGuests)
    expect(on.ok && on.draft.guestIds).toEqual([3])
    const off = on.ok ? toggleGuest(on.draft, 3, LIMITS.maxGuests) : on
    expect(off.ok && off.draft.guestIds).toEqual([])
  })

  it('refuse le 6e guest (CA-06, RG-GST-01)', () => {
    expect(toggleGuest(withGuests(1, 2, 3, 4, 5), 6, LIMITS.maxGuests)).toEqual({
      ok: false,
      reason: 'full',
    })
  })

  it('laisse retirer un guest même quand la sélection est pleine', () => {
    const r = toggleGuest(withGuests(1, 2, 3, 4, 5), 2, LIMITS.maxGuests)
    expect(r.ok && r.draft.guestIds).toEqual([1, 3, 4, 5])
  })

  it('accepte une participation sans guest (CA-07)', () => {
    expect(canContinue(withTracks(1), LIMITS)).toBe(true)
  })
})

describe('éléments devenus inactifs (UC-08, alternative 1a)', () => {
  it('les retire du brouillon et dit lesquels', () => {
    const d = { ...withTracks(1, 2, 3), guestIds: [5, 6] }
    const r = purgeInactive(d, { trackIds: new Set([1, 3]), guestIds: new Set([6]) })
    expect(r.draft.trackIds).toEqual([1, 3])
    expect(r.draft.guestIds).toEqual([6])
    expect(r.removedTrackIds).toEqual([2])
    expect(r.removedGuestIds).toEqual([5])
  })

  it('rend le même brouillon si rien n’a changé', () => {
    const d = withTracks(1)
    expect(purgeInactive(d, { trackIds: new Set([1]), guestIds: new Set() }).draft).toBe(d)
  })
})
