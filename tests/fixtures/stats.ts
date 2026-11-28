// Données FICTIVES, conformes aux contrats `Stats` et `PublicPlaylist` (architecture §5.7.2).
import type { PublicPlaylist, Stats } from '../../shared/api-types.ts'
import { fixtureGuests, fixtureTracks } from './catalog.ts'

const computedAt = '2026-12-10T21:42:00Z'

/** Sous 10 participations : seuls les totaux sont publiés (RG-RES-04). */
export const statsBelowThreshold = (): Stats => ({
  computedAt,
  totals: { participations: 7, trackSelections: 61 },
  topTracks: null,
  topOpeners: null,
  guests: null,
  byProject: null,
})

const topTracks = fixtureTracks.slice(0, 10).map((t, i) => ({
  trackId: t.id,
  title: t.title,
  selections: 3900 - i * 310,
  firstPositions: 820 - i * 70,
}))

/** Au-dessus de 10 mais sous 50 : tops publiés, classement par projet masqué. */
export const statsAboveThreshold = (): Stats => ({
  computedAt,
  totals: { participations: 42, trackSelections: 377 },
  topTracks: topTracks.map((t) => ({ ...t, selections: Math.round(t.selections / 100) })),
  topOpeners: topTracks.slice(0, 5).map(({ trackId, title, firstPositions }) => ({
    trackId,
    title,
    firstPositions: Math.round(firstPositions / 100),
  })),
  guests: fixtureGuests.map((g, i) => ({
    guestId: g.id,
    name: g.name,
    selections: 30 - i * 3,
    percent: Math.round(((30 - i * 3) / 42) * 1000) / 10,
  })),
  byProject: null,
})

/** Au-dessus de 50 : tout est publié. */
export const statsFull = (): Stats => ({
  computedAt,
  totals: { participations: 4812, trackSelections: 43_190 },
  topTracks,
  topOpeners: topTracks
    .slice(0, 5)
    .map(({ trackId, title, firstPositions }) => ({ trackId, title, firstPositions })),
  guests: fixtureGuests.map((g, i) => ({
    guestId: g.id,
    name: g.name,
    selections: 2100 - i * 180,
    percent: Math.round(((2100 - i * 180) / 4812) * 1000) / 10,
  })),
  byProject: [
    { projectId: 1, name: 'Album Fictif', selections: 25_400 },
    { projectId: 2, name: 'EP Imaginaire', selections: 11_020 },
    { projectId: 3, name: 'Single Test', selections: 4_870 },
    { projectId: null, name: 'Hors projet', selections: 1_900 },
  ],
})

export const FIXTURE_CODE = 'K7QM2XH9PA'
export const FIXTURE_CODE_EXCLUDED = 'Z9ZZZZZZZZ'

/** Set-list publique de 12 titres (variante 2 colonnes de la carte) et 2 guests. */
export const publicPlaylist = (): PublicPlaylist => ({
  nickname: 'Fan_Test',
  createdAt: '2026-12-10T19:05:00Z',
  tracks: fixtureTracks.slice(0, 12).map((t, i) => ({
    position: i + 1,
    title: t.title,
    projectName: t.projectId === 1 ? 'Album Fictif' : t.projectId === 2 ? 'EP Imaginaire' : null,
  })),
  guests: fixtureGuests.slice(0, 2).map((g) => ({ name: g.name })),
})
