// Règles du brouillon (cadrage §8.3, §8.4 et §8.7), en fonctions pures : chaque action rend un
// nouveau brouillon ou un refus expliqué. Les limites sont appliquées AVANT l'action (§4.7).
import type { CampaignLimits } from '../../../shared/api-types.ts'

/** Brouillon persisté (architecture §4.4, `hute:draft:v1`). */
export type Draft = {
  v: 1
  /** Ordre du tableau = position dans la set-list ; la position 1 est le titre d'ouverture. */
  trackIds: number[]
  guestIds: number[]
  /** Saisie brute ; la normalisation est faite à la validation (shared/, puis la base). */
  nickname: string
  /** Clé d'idempotence (RG-VAL-03), renouvelée après une validation confirmée. */
  idempotencyKey: string
  /** Entrée dans /composer (D-2) ; 0 tant que le fan n'a pas commencé. */
  startedAt: number
  updatedAt: number
  /**
   * La clé a servi à un envoi dont la réponse n'est peut-être pas arrivée. Si le brouillon change
   * ensuite, une nouvelle clé est tirée : sinon le serveur renverrait le code de l'ancien envoi.
   * Ajout compatible avec la version 1 (absent = false).
   */
  keyUsed: boolean
}

export type Refusal = 'full' | 'duplicate'
export type Outcome = { ok: true; draft: Draft } | { ok: false; reason: Refusal }

export function createDraft(idempotencyKey: string): Draft {
  return {
    v: 1,
    trackIds: [],
    guestIds: [],
    nickname: '',
    idempotencyKey,
    startedAt: 0,
    updatedAt: 0,
    keyUsed: false,
  }
}

/** RG-TRK-02 à 04 : une fois au plus, à la fin, dans la limite. */
export function addTrack(draft: Draft, trackId: number, maxTracks: number): Outcome {
  if (draft.trackIds.includes(trackId)) return { ok: false, reason: 'duplicate' }
  if (draft.trackIds.length >= maxTracks) return { ok: false, reason: 'full' }
  return { ok: true, draft: { ...draft, trackIds: [...draft.trackIds, trackId] } }
}

/** RG-TRK-05 : les positions suivantes remontent, sans trou. */
export function removeTrack(draft: Draft, trackId: number): Draft {
  if (!draft.trackIds.includes(trackId)) return draft
  return { ...draft, trackIds: draft.trackIds.filter((id) => id !== trackId) }
}

/** RG-TRK-06 : déplace le morceau de la position `from` à `to` (index à partir de 0). */
export function moveTrack(draft: Draft, from: number, to: number): Draft {
  const n = draft.trackIds.length
  if (from === to || from < 0 || to < 0 || from >= n || to >= n) return draft
  const trackIds = [...draft.trackIds]
  const [moved] = trackIds.splice(from, 1)
  if (moved === undefined) return draft
  trackIds.splice(to, 0, moved)
  return { ...draft, trackIds }
}

/** RG-GST-01 et 02 : sélection facultative, une fois au plus, dans la limite ; retirer reste possible. */
export function toggleGuest(draft: Draft, guestId: number, maxGuests: number): Outcome {
  if (draft.guestIds.includes(guestId)) {
    return {
      ok: true,
      draft: { ...draft, guestIds: draft.guestIds.filter((id) => id !== guestId) },
    }
  }
  if (draft.guestIds.length >= maxGuests) return { ok: false, reason: 'full' }
  return { ok: true, draft: { ...draft, guestIds: [...draft.guestIds, guestId] } }
}

/** RG-TRK-01 : au moins 1 morceau, et rien au-delà des limites en vigueur. */
export function canContinue(draft: Draft, limits: CampaignLimits): boolean {
  return (
    draft.trackIds.length >= 1 &&
    draft.trackIds.length <= limits.maxTracks &&
    draft.guestIds.length <= limits.maxGuests
  )
}

export type Purge = { draft: Draft; removedTrackIds: number[]; removedGuestIds: number[] }

/** UC-08 (1a) : retire ce qui n'est plus actif au catalogue et dit quoi, pour en informer le fan. */
export function purgeInactive(
  draft: Draft,
  active: { trackIds: ReadonlySet<number>; guestIds: ReadonlySet<number> },
): Purge {
  const removedTrackIds = draft.trackIds.filter((id) => !active.trackIds.has(id))
  const removedGuestIds = draft.guestIds.filter((id) => !active.guestIds.has(id))
  if (removedTrackIds.length === 0 && removedGuestIds.length === 0) {
    return { draft, removedTrackIds, removedGuestIds }
  }
  return {
    draft: {
      ...draft,
      trackIds: draft.trackIds.filter((id) => active.trackIds.has(id)),
      guestIds: draft.guestIds.filter((id) => active.guestIds.has(id)),
    },
    removedTrackIds,
    removedGuestIds,
  }
}

/** Vrai si le contenu soumis change (morceaux, ordre, guests ou pseudo). */
export function contentChanged(a: Draft, b: Draft): boolean {
  const same = (x: number[], y: number[]) => x.length === y.length && x.every((v, i) => v === y[i])
  return !same(a.trackIds, b.trackIds) || !same(a.guestIds, b.guestIds) || a.nickname !== b.nickname
}
