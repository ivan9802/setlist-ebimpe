// Données FICTIVES, conformes au contrat `Catalog` (architecture §5.7.2).
// Aucun vrai titre ni vrai artiste : elles servent aux tests et au développement local.
import type { Catalog, CatalogGuest, CatalogTrack } from '../../shared/api-types.ts'

const campaign: Catalog['campaign'] = {
  name: 'HIMRA ULTRA TRACKLIST EXPERIENCE',
  eventLabel: "26.12 · Stade d'Ebimpé",
  isOpen: true,
  closesAt: '2026-12-25T23:00:00Z',
  maxTracks: 20,
  maxGuests: 5,
  noticeVersion: '1.0',
}

const projects: Catalog['projects'] = [
  { id: 1, name: 'Album Fictif', type: 'album', year: 2026, coverUrl: null },
  { id: 2, name: 'EP Imaginaire', type: 'ep', year: 2024, coverUrl: null },
  { id: 3, name: 'Single Test', type: 'single', year: 2025, coverUrl: null },
]

const titles: [number | null, string, CatalogTrack['type'], string | null][] = [
  [1, 'Éclaté', 'solo', null],
  [1, 'Nuit de stade', 'solo', null],
  [1, 'Gaffer au sol', 'collaboration', 'Artiste Test Alpha'],
  [1, 'Premier rang', 'solo', null],
  [1, 'Tribune nord', 'collaboration', 'Artiste Test Bêta, Artiste Test Gamma'],
  [1, 'Fumigène', 'solo', null],
  [1, 'Ultra Night Test', 'solo', null],
  [1, 'Rappel', 'solo', null],
  [1, 'Plateau béton', 'collaboration', 'Artiste Test Delta'],
  [1, 'Marqueur rouge', 'solo', null],
  [1, 'Feuille de route', 'solo', null],
  [1, 'Ouverture', 'solo', null],
  [2, 'Yop la nuit', 'solo', null],
  [2, 'Lagune', 'collaboration', 'Artiste Test Epsilon'],
  [2, 'Souche de billet', 'solo', null],
  [2, 'Ébène', 'solo', null],
  [2, 'Projecteur', 'freestyle', null],
  [3, 'Ultra', 'solo', null],
  [3, 'Été 26', 'solo', null],
  [null, 'Freestyle du vendredi', 'freestyle', null],
  [null, 'Inédit live', 'autre', null],
  [null, 'Cœur de tribune', 'solo', null],
  [1, 'Dernière chanson', 'solo', null],
  [2, 'Corniche', 'solo', null],
  [3, 'Kpaklo (fictif)', 'collaboration', 'Artiste Test Zêta'],
]

export const fixtureTracks: CatalogTrack[] = titles.map(([projectId, title, type, feat], i) => ({
  id: i + 1,
  projectId,
  title,
  type,
  featuredArtists: feat,
  year: projectId === null ? null : (projects.find((p) => p.id === projectId)?.year ?? null),
  durationS: null,
  coverUrl: null,
}))

const guestNames = [
  'Artiste Test Alpha',
  'Artiste Test Bêta',
  'Artiste Test Gamma',
  'Artiste Test Delta',
  'Artiste Test Epsilon',
  'Artiste Test Zêta',
  'Artiste Test Êta',
  'Artiste Test Thêta',
]

export const fixtureGuests: CatalogGuest[] = guestNames.map((name, i) => ({
  id: i + 1,
  name,
  category: i % 2 === 0 ? 'Rap' : 'Afro',
  description: null,
  imageUrl: null,
}))

/** Catalogue complet : 3 projets, 25 titres (dont « Éclaté » et 3 hors projet), 8 guests. */
export function makeCatalog(overrides: Partial<Catalog> = {}): Catalog {
  return {
    campaign: { ...campaign },
    projects: projects.map((p) => ({ ...p })),
    tracks: fixtureTracks.map((t) => ({ ...t })),
    guests: fixtureGuests.map((g) => ({ ...g })),
    ...overrides,
  }
}

/** Variantes utiles aux états : campagne close, 0 ou 3 guests. */
export const catalogClosed = (): Catalog => {
  const c = makeCatalog()
  return { ...c, campaign: { ...c.campaign, isOpen: false } }
}
export const catalogWithoutGuests = (): Catalog => makeCatalog({ guests: [] })
export const catalogWithThreeGuests = (): Catalog =>
  makeCatalog({ guests: fixtureGuests.slice(0, 3) })
