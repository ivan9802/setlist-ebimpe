// Client HTTP unique du navigateur (architecture §4.2, ADR-007 et ADR-008).
// Pas de supabase-js côté public : les 4 fonctions de lecture passent par fetch.
// Toute réponse devient un Result ; aucun message brut du serveur n'atteint l'interface.
import {
  isErrorCode,
  type ApiErrorBody,
  type ErrorCode,
  type ErrorField,
} from '../../shared/errors.ts'
import { env } from './env.ts'

export type ApiError = {
  code: ErrorCode
  /** Statut HTTP, ou null si la requête n'a pas abouti (réseau, délai, annulation). */
  status: number | null
  fields?: Partial<Record<ErrorField, string>>
  items?: { trackIds?: number[]; guestIds?: number[] }
  requestId?: string
  /** Vrai si l'appelant a annulé la requête (démontage) : rien à afficher. */
  aborted?: boolean
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: ApiError }

export type RequestOptions = { signal?: AbortSignal; timeoutMs?: number }

/** Fonctions SQL accessibles avec la clé publishable (architecture §5.3). */
export type PublicRpc = 'get_catalog' | 'get_stats' | 'get_public_playlist' | 'increment_share'

export const DEFAULT_TIMEOUT_MS = 10_000

const fail = (code: ErrorCode, status: number | null): Result<never> => ({
  ok: false,
  error: { code, status },
})

function isApiErrorBody(body: unknown): body is ApiErrorBody {
  if (typeof body !== 'object' || body === null || !('error' in body)) return false
  const error: unknown = body.error
  return typeof error === 'object' && error !== null && 'code' in error && isErrorCode(error.code)
}

/** Traduit une réponse en échec : corps normalisé du Worker, sinon déduction par statut. */
export function toApiError(status: number, body: unknown): ApiError {
  if (isApiErrorBody(body)) {
    const { code, fields, items, requestId } = body.error
    return {
      code,
      status,
      ...(fields ? { fields } : {}),
      ...(items ? { items } : {}),
      ...(requestId ? { requestId } : {}),
    }
  }
  if (status === 404) return { code: 'not_found', status }
  if (status === 502 || status === 503 || status === 504) return { code: 'unavailable', status }
  return { code: 'internal', status }
}

async function readJson(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return null
  }
}

async function request<T>(
  url: string,
  init: RequestInit,
  { signal, timeoutMs = DEFAULT_TIMEOUT_MS }: RequestOptions,
): Promise<Result<T>> {
  const controller = new AbortController()
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeoutMs)
  const forwardAbort = () => controller.abort()
  if (signal?.aborted) controller.abort()
  else signal?.addEventListener('abort', forwardAbort, { once: true })

  try {
    const res = await fetch(url, { ...init, signal: controller.signal })
    const body = await readJson(res)
    return res.ok
      ? { ok: true, value: body as T }
      : { ok: false, error: toApiError(res.status, body) }
  } catch {
    if (timedOut) return fail('unavailable', null)
    if (signal?.aborted)
      return { ok: false, error: { code: 'network', status: null, aborted: true } }
    return fail('network', null)
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', forwardAbort)
  }
}

/** Appel d'une fonction SQL publique via PostgREST, avec la clé publishable (RLS fait foi). */
export function rpc<T>(
  fn: PublicRpc,
  args: Record<string, unknown> = {},
  options: RequestOptions = {},
): Promise<Result<T>> {
  if (!env.supabaseUrl) return Promise.resolve(fail('unavailable', null))
  return request<T>(
    `${env.supabaseUrl}/rest/v1/rpc/${fn}`,
    {
      method: 'POST',
      headers: { apikey: env.supabasePublishableKey, 'content-type': 'application/json' },
      body: JSON.stringify(args),
    },
    options,
  )
}

/** Appel du Worker de la même origine (`/api/*`), avec un identifiant de corrélation. */
export function apiPost<T>(
  path: `/api/${string}`,
  body: unknown,
  options: RequestOptions = {},
): Promise<Result<T>> {
  return request<T>(
    path,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-request-id': crypto.randomUUID() },
      body: JSON.stringify(body),
    },
    options,
  )
}
