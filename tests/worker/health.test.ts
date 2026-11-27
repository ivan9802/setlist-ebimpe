import { describe, expect, it } from 'vitest'
import worker from '../../worker/index.ts'
import type { Env } from '../../worker/env.ts'

const env = {
  APP_VERSION: 'test',
  SUPABASE_URL: 'http://localhost',
  ALLOWED_ORIGINS: 'http://localhost',
  ASSETS: { fetch: async () => new Response('spa') },
} as unknown as Env

const call = (path: string, method = 'GET') =>
  worker.fetch(new Request(`https://hute.test${path}`, { method }), env)

describe('Worker', () => {
  it('répond à /api/health sans mise en cache', async () => {
    const res = await call('/api/health')
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(await res.json()).toEqual({ status: 'ok', version: 'test' })
  })

  it('renvoie 404 JSON sur une route API inconnue', async () => {
    const res = await call('/api/inconnue')
    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ code: 'NOT_FOUND' })
  })

  it('laisse la SPA répondre sur /t/:code en attendant le sprint 3', async () => {
    const res = await call('/t/K7QM2')
    expect(await res.text()).toBe('spa')
  })
})
