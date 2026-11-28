import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../src/lib/env.ts', () => ({
  env: {
    supabaseUrl: 'https://sb.test',
    supabasePublishableKey: 'sb_publishable_test',
    turnstileSiteKey: '',
    sentryDsn: '',
    appVersion: 'test',
  },
}))

const { rpc, apiPost, toApiError } = await import('../../src/lib/api.ts')

const json = (body: unknown, status = 200) =>
  new Response(body === undefined ? '' : JSON.stringify(body), { status })

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('rpc (PostgREST, clé publishable)', () => {
  it('appelle la fonction en POST avec la clé dans apikey', async () => {
    fetchMock.mockResolvedValue(json({ computedAt: 'x' }))
    const res = await rpc('get_stats')
    expect(res).toEqual({ ok: true, value: { computedAt: 'x' } })
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://sb.test/rest/v1/rpc/get_stats')
    expect(init.method).toBe('POST')
    expect(init.headers).toMatchObject({ apikey: 'sb_publishable_test' })
  })

  it('renvoie null quand la fonction ne renvoie rien (set-list introuvable)', async () => {
    fetchMock.mockResolvedValue(json(null))
    expect(await rpc('get_public_playlist', { p_code: 'K7QM2XH9PA' })).toEqual({
      ok: true,
      value: null,
    })
  })

  it('accepte une réponse vide (increment_share)', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }))
    expect(await rpc('increment_share', { p_channel: 'copy' })).toEqual({ ok: true, value: null })
  })

  it('ne transmet jamais le message brut de PostgREST', async () => {
    fetchMock.mockResolvedValue(
      json({ code: '42501', message: 'permission denied for table' }, 401),
    )
    const res = await rpc('get_catalog')
    expect(res).toEqual({ ok: false, error: { code: 'internal', status: 401 } })
  })

  it('traduit une panne réseau en `network`', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
    expect(await rpc('get_catalog')).toEqual({
      ok: false,
      error: { code: 'network', status: null },
    })
  })

  it('traduit un délai dépassé en `unavailable`', async () => {
    vi.useFakeTimers()
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new DOMException('', 'AbortError')))
        }),
    )
    const pending = rpc('get_catalog', {}, { timeoutMs: 50 })
    await vi.advanceTimersByTimeAsync(60)
    expect(await pending).toEqual({ ok: false, error: { code: 'unavailable', status: null } })
  })

  it('signale une annulation par l’appelant sans la confondre avec une panne', async () => {
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new DOMException('', 'AbortError')))
        }),
    )
    const controller = new AbortController()
    const pending = rpc('get_catalog', {}, { signal: controller.signal })
    controller.abort()
    const res = await pending
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.error.aborted).toBe(true)
  })
})

describe('apiPost (Worker, même origine)', () => {
  it('reprend le corps d’erreur normalisé du Worker', async () => {
    fetchMock.mockResolvedValue(
      json(
        {
          error: {
            code: 'inactive_items',
            items: { trackIds: [3] },
            requestId: 'abc',
          },
        },
        409,
      ),
    )
    const res = await apiPost('/api/submit', {})
    expect(res).toEqual({
      ok: false,
      error: { code: 'inactive_items', status: 409, items: { trackIds: [3] }, requestId: 'abc' },
    })
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('/api/submit')
    expect(init.headers).toHaveProperty('x-request-id')
  })
})

describe('toApiError', () => {
  it('déduit le code du statut quand le corps est inconnu', () => {
    expect(toApiError(404, null).code).toBe('not_found')
    expect(toApiError(503, '<html>').code).toBe('unavailable')
    expect(toApiError(500, null).code).toBe('internal')
  })

  it('ignore un code inconnu dans le corps', () => {
    expect(toApiError(400, { error: { code: 'HUTE_CLOSED' } }).code).toBe('internal')
  })
})
