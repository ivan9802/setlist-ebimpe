import type { Env } from '../env.ts'
import { json } from '../http.ts'

/** Sonde de disponibilité (UptimeRobot, smoke test du déploiement). Ne touche pas la base. */
export function health(env: Env): Response {
  return json({ status: 'ok', version: env.APP_VERSION })
}
