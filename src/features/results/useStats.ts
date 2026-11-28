// Lecture des classements précalculés (get_stats, ADR-004). L'accueil lit une fois ; la page
// Résultats ajoutera le sondage de 60 s quand l'onglet est visible (phase 8).
import type { Stats } from '../../../shared/api-types.ts'
import { STATS_POLL_INTERVAL_MS } from '../../../shared/constants.ts'
import { rpc } from '../../lib/api.ts'
import { useResource, type Fetcher } from '../../lib/useResource.ts'

const fetchStats: Fetcher<Stats> = (signal) => rpc<Stats>('get_stats', {}, { signal })

export function useStats() {
  return useResource('stats', fetchStats, { staleTime: STATS_POLL_INTERVAL_MS })
}

/** Part entière, en pourcentage, de `part` sur `total` (0 si le total est nul). */
export function percentOf(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0
}
