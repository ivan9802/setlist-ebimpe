// Lecture du catalogue (get_catalog) et des paramètres de campagne (architecture §4.2 et §4.4).
// Une seule requête est partagée par tous les écrans grâce au cache de useResource : il tient
// lieu du CampaignProvider prévu par l'architecture, sans contexte React supplémentaire.
import { useMemo } from 'react'
import type { CampaignLimits, Catalog } from '../../../shared/api-types.ts'
import { MAX_GUESTS, MAX_TRACKS } from '../../../shared/constants.ts'
import { rpc } from '../../lib/api.ts'
import { useResource, type Fetcher } from '../../lib/useResource.ts'
import { indexCatalog, type IndexedTrack } from './search.ts'

/** Aligné sur le cache du service worker (stale-while-revalidate de 10 min, §5.8). */
export const CATALOG_STALE_MS = 10 * 60_000

const fetchCatalog: Fetcher<Catalog> = (signal) => rpc<Catalog>('get_catalog', {}, { signal })

/** Limites réglées par l'admin (RG-TRK-02, RG-GST-01), ou valeurs par défaut en attendant. */
export function limitsOf(campaign: Catalog['campaign'] | undefined): CampaignLimits {
  return {
    maxTracks: campaign?.maxTracks ?? MAX_TRACKS,
    maxGuests: campaign?.maxGuests ?? MAX_GUESTS,
  }
}

/** Identifiants actifs, pour retirer du brouillon ce qui ne l'est plus (UC-08, alternative 1a). */
export function activeIdsOf(catalog: Catalog): { trackIds: Set<number>; guestIds: Set<number> } {
  return {
    trackIds: new Set(catalog.tracks.map((t) => t.id)),
    guestIds: new Set(catalog.guests.map((g) => g.id)),
  }
}

export function useCatalog() {
  const resource = useResource('catalog', fetchCatalog, { staleTime: CATALOG_STALE_MS })
  const { data } = resource
  const index = useMemo<IndexedTrack[]>(() => (data ? indexCatalog(data) : []), [data])
  return { ...resource, catalog: data, index, limits: limitsOf(data?.campaign) }
}

/** État de la campagne seul (accueil, récapitulatif) : ouverte, close, ou encore inconnue. */
export function useCampaign() {
  const { catalog, error, fetching, reload, limits } = useCatalog()
  return { campaign: catalog?.campaign, error, fetching, reload, limits }
}
