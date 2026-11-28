// Lecture et écriture du brouillon dans le stockage local (architecture §4.4).
// Un brouillon illisible, d'une autre version ou incohérent est abandonné sans erreur bloquante.
// La vérification est écrite à la main : Zod reste hors de ce module, utilisé dès l'accueil.
import { MAX_GUESTS, MAX_TRACKS } from '../../../shared/constants.ts'
import type { Draft } from './rules.ts'

export const DRAFT_KEY = 'hute:draft:v1'

/** Longueur maximale tolérée pour la saisie brute du pseudo (le champ en limite déjà à 24). */
const RAW_NICKNAME_MAX = 64
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isIdList = (value: unknown, max: number): value is number[] =>
  Array.isArray(value) &&
  value.length <= max &&
  value.every((id) => Number.isSafeInteger(id) && (id as number) > 0) &&
  new Set(value).size === value.length

const isTime = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0

export function loadDraft(raw: string | null): Draft | null {
  if (!raw) return null
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof data !== 'object' || data === null) return null
  const d = data as Record<string, unknown>
  if (
    d.v !== 1 ||
    !isIdList(d.trackIds, MAX_TRACKS) ||
    !isIdList(d.guestIds, MAX_GUESTS) ||
    typeof d.nickname !== 'string' ||
    d.nickname.length > RAW_NICKNAME_MAX ||
    typeof d.idempotencyKey !== 'string' ||
    !UUID_V4.test(d.idempotencyKey) ||
    !isTime(d.startedAt) ||
    !isTime(d.updatedAt) ||
    (d.keyUsed !== undefined && typeof d.keyUsed !== 'boolean')
  ) {
    return null
  }
  return {
    v: 1,
    trackIds: d.trackIds,
    guestIds: d.guestIds,
    nickname: d.nickname,
    idempotencyKey: d.idempotencyKey,
    startedAt: d.startedAt,
    updatedAt: d.updatedAt,
    keyUsed: d.keyUsed === true,
  }
}

export function serializeDraft(draft: Draft): string {
  return JSON.stringify(draft)
}
