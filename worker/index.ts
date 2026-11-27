import type { Env } from './env.ts'
import { json } from './http.ts'
import { health } from './routes/health.ts'

// Le Worker ne s'exécute que sur /api/* et /t/* (run_worker_first). Le reste est servi en statique.
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/health' && request.method === 'GET') {
      return health(env)
    }
    if (pathname.startsWith('/api/')) {
      return json({ code: 'NOT_FOUND' }, 404)
    }
    // /t/:code : l'injection des balises OG arrive au sprint 3. En attendant, la SPA répond.
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
