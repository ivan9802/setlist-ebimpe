// Serveur de données fictives pour `npm run dev:mock` : le front avance sans Supabase, avec les
// mêmes contrats que la vraie API (shared/api-types.ts) et les données de tests/fixtures.
// Actif seulement en développement (`vite --mode mock`), jamais dans un build.
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { catalogClosed, catalogWithoutGuests, makeCatalog } from '../tests/fixtures/catalog.ts'
import {
  FIXTURE_CODE,
  publicPlaylist,
  statsBelowThreshold,
  statsFull,
} from '../tests/fixtures/stats.ts'

export const MOCK_PREFIX = '/__mock__'

/** Scénarios choisis par la variable HUTE_MOCK. */
const SCENARIOS = {
  complet: { catalog: makeCatalog, stats: statsFull },
  attente: { catalog: makeCatalog, stats: statsBelowThreshold },
  clos: { catalog: catalogClosed, stats: statsFull },
  'sans-guests': { catalog: catalogWithoutGuests, stats: statsFull },
} as const

type Scenario = keyof typeof SCENARIOS

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk: Buffer) => (raw += chunk.toString()))
    req.on('end', () => {
      try {
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {})
      } catch {
        resolve({})
      }
    })
  })
}

export function mockApi(): Plugin {
  const name = (process.env.HUTE_MOCK ?? 'complet') as Scenario
  const scenario = SCENARIOS[name] ?? SCENARIOS.complet

  return {
    name: 'hute-mock-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(
        `${MOCK_PREFIX}/rest/v1/rpc`,
        (req: IncomingMessage, res: ServerResponse) => {
          void (async () => {
            const fn = (req.url ?? '').replace(/^\//, '').split('?')[0]
            const args = await readBody(req)
            const reply = (status: number, body: unknown) => {
              res.statusCode = status
              res.setHeader('content-type', 'application/json')
              res.end(body === undefined ? '' : JSON.stringify(body))
            }
            switch (fn) {
              case 'get_catalog':
                return reply(200, scenario.catalog())
              case 'get_stats':
                return reply(200, scenario.stats())
              case 'get_public_playlist':
                return reply(200, args.p_code === FIXTURE_CODE ? publicPlaylist() : null)
              case 'increment_share':
                return reply(204, undefined)
              default:
                return reply(404, { code: 'PGRST202', message: 'fonction inconnue (mock)' })
            }
          })()
        },
      )
    },
  }
}
