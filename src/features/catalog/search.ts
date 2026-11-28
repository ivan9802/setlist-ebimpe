// Recherche et filtres du catalogue, en mémoire, sans appel serveur (UC-02, architecture §4.2).
// Fonctions pures : elles ne dépendent ni de React ni du DOM.
import type { Catalog, CatalogProject, CatalogTrack, TrackType } from '../../../shared/api-types.ts'

/** Valeur de filtre pour les titres sans projet (RG-CAT-02), aussi utilisée dans l'adresse. */
export const NO_PROJECT = 'hors-projet'
export const NO_PROJECT_NAME = 'Hors projet'

export type ProjectFilter = number | typeof NO_PROJECT

/** Dans un groupe, les valeurs se cumulent (« ou ») ; entre les groupes, elles se combinent (« et »). */
export type TrackFilters = { projects: ProjectFilter[]; types: TrackType[] }

export const TRACK_TYPES: readonly TrackType[] = ['solo', 'collaboration', 'freestyle', 'autre']

export type IndexedTrack = CatalogTrack & { readonly searchKey: string }

/**
 * Forme de comparaison (RG-CAT-05) : sans accents ni ligatures, en minuscules, apostrophes
 * retirées (« I’m » → « im »), autre ponctuation remplacée par une espace.
 */
export function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/œ/gi, 'oe')
    .replace(/æ/gi, 'ae')
    .toLowerCase()
    .replace(/['’ʼ`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

/** Prépare le catalogue une fois, au chargement : la recherche ne recalcule rien à la frappe. */
export function indexCatalog(catalog: Pick<Catalog, 'tracks'>): IndexedTrack[] {
  return catalog.tracks.map((track) => ({ ...track, searchKey: normalizeSearch(track.title) }))
}

const projectKey = (track: CatalogTrack): ProjectFilter => track.projectId ?? NO_PROJECT

/** Titres correspondant à la recherche et aux filtres, dans l'ordre du catalogue. */
export function searchTracks(
  index: readonly IndexedTrack[],
  query: string,
  filters: TrackFilters,
): IndexedTrack[] {
  const words = normalizeSearch(query).split(' ').filter(Boolean)
  const projects = new Set<ProjectFilter>(filters.projects)
  const types = new Set<TrackType>(filters.types)
  return index.filter(
    (track) =>
      (projects.size === 0 || projects.has(projectKey(track))) &&
      (types.size === 0 || types.has(track.type)) &&
      words.every((word) => track.searchKey.includes(word)),
  )
}

export type TrackGroup<T extends CatalogTrack = IndexedTrack> = {
  key: ProjectFilter
  name: string
  project: CatalogProject | null
  tracks: T[]
}

/**
 * Regroupe par projet, dans l'ordre des projets du catalogue, « Hors projet » en dernier.
 * Un titre dont le projet est inconnu ou inactif est rangé « Hors projet ». Aucun groupe vide.
 */
export function groupByProject<T extends CatalogTrack>(
  tracks: readonly T[],
  projects: readonly CatalogProject[],
): TrackGroup<T>[] {
  const groups = new Map<ProjectFilter, TrackGroup<T>>()
  for (const project of projects) {
    groups.set(project.id, { key: project.id, name: project.name, project, tracks: [] })
  }
  const orphans: TrackGroup<T> = {
    key: NO_PROJECT,
    name: NO_PROJECT_NAME,
    project: null,
    tracks: [],
  }
  for (const track of tracks) {
    const group = track.projectId === null ? undefined : groups.get(track.projectId)
    ;(group ?? orphans).tracks.push(track)
  }
  return [...groups.values(), orphans].filter((g) => g.tracks.length > 0)
}

export function hasActiveFilters(filters: TrackFilters): boolean {
  return filters.projects.length > 0 || filters.types.length > 0
}

// Les filtres vivent aussi dans l'adresse (architecture §4.4) : ?projet=2,hors-projet&type=solo

const PROJECT_PARAM = 'projet'
const TYPE_PARAM = 'type'

const unique = <T>(values: T[]) => [...new Set(values)]

export function filtersFromParams(params: URLSearchParams): TrackFilters {
  const list = (name: string) => (params.get(name) ?? '').split(',').filter(Boolean)
  const projects = list(PROJECT_PARAM).flatMap((value): ProjectFilter[] => {
    if (value === NO_PROJECT) return [NO_PROJECT]
    const id = Number(value)
    return Number.isInteger(id) && id > 0 ? [id] : []
  })
  const types = list(TYPE_PARAM).filter((value): value is TrackType =>
    (TRACK_TYPES as readonly string[]).includes(value),
  )
  return { projects: unique(projects), types: unique(types) }
}

export function filtersToParams(filters: TrackFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.projects.length > 0) params.set(PROJECT_PARAM, filters.projects.join(','))
  if (filters.types.length > 0) params.set(TYPE_PARAM, filters.types.join(','))
  return params
}
