// Catalogue unique des codes d'erreur (architecture §5.5, ADR-008).
// La base produit des codes HUTE_*, le Worker les traduit en ErrorCode, le navigateur en texte
// (lib/messages.fr.ts). Aucun texte destiné à l'humain ne vit ici.

export const ERROR_CODES = [
  'validation',
  'nickname_blocked',
  'verification',
  'closed',
  'inactive_items',
  'notice_outdated',
  'payload_too_large',
  'forbidden_origin',
  'not_found',
  'unavailable',
  'network',
  'internal',
] as const

export type ErrorCode = (typeof ERROR_CODES)[number]

/** Champs d'une soumission qui peuvent porter une erreur (clés de message, pas du texte). */
export type ErrorField = 'nickname' | 'trackIds' | 'guestIds'

/** Corps unique d'une réponse d'erreur de l'API (architecture §5.5.1). */
export type ApiErrorBody = {
  error: {
    code: ErrorCode
    fields?: Partial<Record<ErrorField, string>>
    items?: { trackIds?: number[]; guestIds?: number[] }
    requestId: string
  }
}

/** Statut HTTP de chaque code. `network` n'existe que côté navigateur. */
export const HTTP_STATUS: Record<Exclude<ErrorCode, 'network'>, number> = {
  validation: 400,
  nickname_blocked: 400,
  verification: 403,
  closed: 409,
  inactive_items: 409,
  notice_outdated: 409,
  payload_too_large: 413,
  forbidden_origin: 403,
  not_found: 404,
  unavailable: 503,
  internal: 500,
}

/** Codes levés par PostgreSQL (`RAISE EXCEPTION 'HUTE_…'`) et leur traduction. */
export const SQL_ERROR_MAP: Readonly<Record<string, ErrorCode>> = {
  HUTE_CLOSED: 'closed',
  HUTE_NICKNAME_INVALID: 'validation',
  HUTE_NICKNAME_BLOCKED: 'nickname_blocked',
  HUTE_TRACKS_INVALID: 'validation',
  HUTE_GUESTS_INVALID: 'validation',
  HUTE_INACTIVE_ITEMS: 'inactive_items',
  HUTE_NOTICE_OUTDATED: 'notice_outdated',
}

const CODES: ReadonlySet<string> = new Set(ERROR_CODES)

export function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === 'string' && CODES.has(value)
}
