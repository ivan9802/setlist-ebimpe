import { describe, expect, it } from 'vitest'
import {
  NO_PROJECT,
  filtersFromParams,
  filtersToParams,
  groupByProject,
  hasActiveFilters,
  indexCatalog,
  normalizeSearch,
  searchTracks,
  type TrackFilters,
} from '../../src/features/catalog/search.ts'
import { makeCatalog } from '../fixtures/catalog.ts'

const NONE: TrackFilters = { projects: [], types: [] }
const index = indexCatalog(makeCatalog())
const titles = (filters: TrackFilters, query = '') =>
  searchTracks(index, query, filters).map((t) => t.title)

describe('normalizeSearch (RG-CAT-05)', () => {
  it('ignore la casse, les accents et les ligatures', () => {
    expect(normalizeSearch('Éclaté')).toBe('eclate')
    expect(normalizeSearch('CŒUR de Tribune')).toBe('coeur de tribune')
    expect(normalizeSearch('  Été   26 ')).toBe('ete 26')
  })

  it('traite les apostrophes et la ponctuation', () => {
    expect(normalizeSearch('Sorry I’m Bad')).toBe('sorry im bad')
    expect(normalizeSearch("Sorry I'm Bad")).toBe('sorry im bad')
    expect(normalizeSearch('Feat.-Live!')).toBe('feat live')
  })
})

describe('searchTracks', () => {
  it('trouve « Éclaté » en tapant « eclate » (CA-02)', () => {
    expect(titles(NONE, 'eclate')).toEqual(['Éclaté'])
  })

  it('exige tous les mots, dans n’importe quel ordre', () => {
    expect(titles(NONE, 'stade nuit')).toEqual(['Nuit de stade'])
    expect(titles(NONE, 'stade inconnu')).toEqual([])
  })

  it('renvoie tout le catalogue sans recherche ni filtre, dans l’ordre du serveur', () => {
    expect(titles(NONE)).toHaveLength(25)
    expect(titles(NONE)[0]).toBe('Éclaté')
  })

  it('combine les projets choisis en « ou » et les types en « et »', () => {
    const albumOrEp = titles({ projects: [1, 2], types: [] })
    expect(albumOrEp).toContain('Éclaté')
    expect(albumOrEp).toContain('Lagune')
    expect(albumOrEp).not.toContain('Ultra')
    const collabsOfAlbum = titles({ projects: [1], types: ['collaboration'] })
    expect(collabsOfAlbum).toEqual(['Gaffer au sol', 'Tribune nord', 'Plateau béton'])
  })

  it('filtre les titres hors projet (RG-CAT-02)', () => {
    expect(titles({ projects: [NO_PROJECT], types: [] })).toEqual([
      'Freestyle du vendredi',
      'Inédit live',
      'Cœur de tribune',
    ])
  })

  it('combine recherche et filtres', () => {
    expect(titles({ projects: [NO_PROJECT], types: [] }, 'coeur')).toEqual(['Cœur de tribune'])
    expect(titles({ projects: [2], types: [] }, 'coeur')).toEqual([])
  })
})

describe('groupByProject', () => {
  it('suit l’ordre des projets et place « Hors projet » en dernier', () => {
    const catalog = makeCatalog()
    const groups = groupByProject(searchTracks(index, '', NONE), catalog.projects)
    expect(groups.map((g) => g.name)).toEqual([
      'Album Fictif',
      'EP Imaginaire',
      'Single Test',
      'Hors projet',
    ])
    expect(groups.reduce((n, g) => n + g.tracks.length, 0)).toBe(25)
  })

  it('n’affiche pas de groupe vide', () => {
    const catalog = makeCatalog()
    const groups = groupByProject(searchTracks(index, 'lagune', NONE), catalog.projects)
    expect(groups.map((g) => g.name)).toEqual(['EP Imaginaire'])
  })

  it('range un titre dont le projet est inconnu dans « Hors projet »', () => {
    const catalog = makeCatalog()
    const [track] = searchTracks(index, 'ultra night', NONE)
    if (!track) throw new Error('titre fictif introuvable')
    const orphan = { ...track, projectId: 99 }
    expect(groupByProject([orphan], catalog.projects).map((g) => g.name)).toEqual(['Hors projet'])
  })
})

describe('filtres dans l’adresse (?projet=…&type=…)', () => {
  it('fait l’aller-retour', () => {
    const filters: TrackFilters = { projects: [2, NO_PROJECT], types: ['solo', 'freestyle'] }
    const params = filtersToParams(filters)
    expect(params.toString()).toBe('projet=2%2Chors-projet&type=solo%2Cfreestyle')
    expect(filtersFromParams(params)).toEqual(filters)
  })

  it('ignore les valeurs inconnues ou malformées', () => {
    const params = new URLSearchParams('projet=abc,-1,3,3&type=rap,solo')
    expect(filtersFromParams(params)).toEqual({ projects: [3], types: ['solo'] })
  })

  it('signale si un filtre est actif', () => {
    expect(hasActiveFilters(NONE)).toBe(false)
    expect(hasActiveFilters({ projects: [], types: ['solo'] })).toBe(true)
  })
})
