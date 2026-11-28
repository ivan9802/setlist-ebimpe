// Contrats des interfaces publiques (architecture §5.7, normatifs).
// Partagés par le navigateur et le Worker. Toute évolution incompatible crée une nouvelle
// fonction SQL (`get_stats_v2`) plutôt que de modifier un contrat existant (§5.7.3).

export type ProjectType = 'album' | 'ep' | 'single' | 'autre'
export type TrackType = 'solo' | 'collaboration' | 'freestyle' | 'autre'
export type ShareChannel = 'whatsapp' | 'native' | 'download' | 'copy'

/** Corps de `POST /api/submit`. */
export type SubmitRequest = {
  nickname: string
  trackIds: number[]
  guestIds: number[]
  noticeVersion: string
  idempotencyKey: string
  composeDurationS: number | null
  turnstileToken: string
  /** Champ piège : doit rester vide. */
  website: string
}

export type SubmitResponse = { code: string }

/** Retour de `get_catalog()` : éléments actifs et champs publics seulement. */
export type Catalog = {
  campaign: {
    name: string
    eventLabel: string
    isOpen: boolean
    closesAt: string | null
    maxTracks: number
    maxGuests: number
    noticeVersion: string
  }
  projects: CatalogProject[]
  tracks: CatalogTrack[]
  guests: CatalogGuest[]
}

export type CatalogProject = {
  id: number
  name: string
  type: ProjectType
  year: number | null
  coverUrl: string | null
}

export type CatalogTrack = {
  id: number
  projectId: number | null
  title: string
  type: TrackType
  /**
   * Artistes invités sur le morceau, affichés « feat. … » (champ `featured_artists`,
   * ajouté le 26/11 lors des maquettes, architecture §6.2). Absent du contrat §5.7.2 d'origine.
   */
  featuredArtists: string | null
  year: number | null
  durationS: number | null
  coverUrl: string | null
}

export type CatalogGuest = {
  id: number
  name: string
  category: string | null
  description: string | null
  imageUrl: string | null
}

/** Retour de `get_stats()` : contenu de `stats_snapshot.payload`. Les tops valent null sous les seuils. */
export type Stats = {
  computedAt: string
  totals: { participations: number; trackSelections: number }
  topTracks: { trackId: number; title: string; selections: number; firstPositions: number }[] | null
  topOpeners: { trackId: number; title: string; firstPositions: number }[] | null
  guests: { guestId: number; name: string; selections: number; percent: number }[] | null
  byProject: { projectId: number | null; name: string; selections: number }[] | null
}

/** Retour de `get_public_playlist(p_code)` ; null si le code est inconnu ou la set-list exclue. */
export type PublicPlaylist = {
  nickname: string
  createdAt: string
  tracks: { position: number; title: string; projectName: string | null }[]
  guests: { name: string }[]
}

/** Format du code public : 10 caractères Crockford base32 (RG-VAL-08). */
export const PUBLIC_CODE_PATTERN = /^[0-9A-HJKMNP-TV-Z]{10}$/
