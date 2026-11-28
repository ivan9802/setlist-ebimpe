// Étape 1 · Morceaux (maquettes 02, 02b, 03 et 10 ; DA §7.2 ; UC-02 à UC-04).
// Mobile : catalogue, puis tiroir « Ma set-list » en bas d'écran. Ordinateur (≥ 1024 px) :
// catalogue à gauche, feuille collante à droite. Une seule des deux versions est affichée.
// Les limites sont appliquées avant l'action (architecture §4.7) ; le brouillon est gardé.
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import type { Catalog, CatalogProject, TrackType } from '../../../shared/api-types.ts'
import { SetlistSheetFrame } from '../../components/playlist/SetlistSheetFrame.tsx'
import { SortablePlaylist, type PlaylistItem } from '../../components/playlist/SortablePlaylist.tsx'
import { TrackRow, TrackRowSkeleton } from '../../components/tracks/TrackRow.tsx'
import { Banner } from '../../components/ui/Banner.tsx'
import { BottomSheet } from '../../components/ui/BottomSheet.tsx'
import { Button } from '../../components/ui/Button.tsx'
import { Counter } from '../../components/ui/Counter.tsx'
import { EmptyState } from '../../components/ui/EmptyState.tsx'
import { FilterChips, type Chip } from '../../components/ui/FilterChips.tsx'
import { SearchField } from '../../components/ui/SearchField.tsx'
import { useToast } from '../../components/ui/Toast.tsx'
import {
  NO_PROJECT,
  NO_PROJECT_NAME,
  TRACK_TYPES,
  filtersFromParams,
  filtersToParams,
  groupByProject,
  hasActiveFilters,
  searchTracks,
  type ProjectFilter,
  type TrackFilters,
} from '../../features/catalog/search.ts'
import { activeIdsOf, useCatalog } from '../../features/catalog/useCatalog.ts'
import { canContinue } from '../../features/draft/rules.ts'
import { useDraft, useMarkDraftStarted } from '../../features/draft/useDraft.ts'
import { messageFor, t } from '../../lib/messages.fr.ts'
import { prefersRichMotion } from '../../lib/motion.ts'
import { DESKTOP_QUERY, useMediaQuery } from '../../lib/useMediaQuery.ts'

const ALL = 'tous'

/** « Sorry I'm Bad » → « SIB » : monogramme typographique quand il n'y a pas de pochette. */
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}]/gu, '').charAt(0))
    .join('')
    .slice(0, 3)
}

function chipsFor(catalog: Catalog | undefined, filters: TrackFilters): Chip[] {
  if (!catalog) return []
  const hasOrphans = catalog.tracks.some((tr) => tr.projectId === null)
  const types = TRACK_TYPES.filter((type) => catalog.tracks.some((tr) => tr.type === type))
  return [
    { id: ALL, label: t.tracks.all, pressed: !hasActiveFilters(filters) },
    ...catalog.projects.map((p) => ({
      id: `p:${p.id}`,
      label: p.name,
      pressed: filters.projects.includes(p.id),
    })),
    ...(hasOrphans
      ? [
          {
            id: `p:${NO_PROJECT}`,
            label: NO_PROJECT_NAME,
            pressed: filters.projects.includes(NO_PROJECT),
          },
        ]
      : []),
    ...types.map((type) => ({
      id: `t:${type}`,
      label: t.tracks.types[type],
      pressed: filters.types.includes(type),
    })),
  ]
}

function toggleChip(filters: TrackFilters, id: string): TrackFilters {
  if (id === ALL) return { projects: [], types: [] }
  const [kind, raw = ''] = id.split(':')
  if (kind === 't') {
    const type = raw as TrackType
    return {
      ...filters,
      types: filters.types.includes(type)
        ? filters.types.filter((x) => x !== type)
        : [...filters.types, type],
    }
  }
  const project: ProjectFilter = raw === NO_PROJECT ? NO_PROJECT : Number(raw)
  return {
    ...filters,
    projects: filters.projects.includes(project)
      ? filters.projects.filter((x) => x !== project)
      : [...filters.projects, project],
  }
}

const groupLabel = (name: string, project: CatalogProject | null) =>
  project?.year ? `${name} · ${project.year}` : name

export function TracksStep() {
  useMarkDraftStarted()
  const navigate = useNavigate()
  const toast = useToast()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const { catalog, index, limits, error, reload } = useCatalog()
  const { draft, store } = useDraft()
  const [params, setParams] = useSearchParams()
  const filters = useMemo(() => filtersFromParams(params), [params])
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [sheetOpen, setSheetOpen] = useState(false)

  // UC-08 (1a) : ce qui n'est plus actif au catalogue quitte le brouillon, et le fan le sait.
  useEffect(() => {
    if (!catalog) return
    const { removedTrackIds, removedGuestIds } = store.purge(activeIdsOf(catalog))
    if (removedTrackIds.length + removedGuestIds.length > 0) {
      toast.show(t.tracks.unavailable(removedTrackIds.length, removedGuestIds.length))
    }
  }, [catalog, store, toast])

  const results = useMemo(
    () => searchTracks(index, deferredQuery, filters),
    [index, deferredQuery, filters],
  )
  const groups = useMemo(() => groupByProject(results, catalog?.projects ?? []), [results, catalog])
  const chips = useMemo(() => chipsFor(catalog, filters), [catalog, filters])

  const byId = useMemo(() => new Map(catalog?.tracks.map((tr) => [tr.id, tr])), [catalog])
  const selected: PlaylistItem[] = draft.trackIds.flatMap((id) => {
    const track = byId.get(id)
    return track ? [{ id, title: track.title, featuredArtists: track.featuredArtists }] : []
  })
  const guestNames = draft.guestIds.flatMap((id) => {
    const guest = catalog?.guests.find((g) => g.id === id)
    return guest ? [guest.name] : []
  })
  const count = draft.trackIds.length
  const full = count >= limits.maxTracks
  const ready = canContinue(draft, limits)

  const setFilters = (next: TrackFilters) => setParams(filtersToParams(next), { replace: true })
  const toggle = (id: number) => {
    if (draft.trackIds.includes(id)) {
      store.removeTrack(id)
      return
    }
    const outcome = store.addTrack(id, limits.maxTracks)
    // Retour haptique discret au premier contact (DA §8.3), seulement si les animations le sont.
    if (outcome.ok && prefersRichMotion()) navigator.vibrate?.(10)
  }
  const goNext = () => {
    if (ready) navigate('/composer/guests')
  }

  const counter = (className: string) => (
    <Counter value={count} max={limits.maxTracks} noun="titres" className={className} />
  )
  const status = full ? t.playlist.full : count === 0 ? t.playlist.needOne : ''
  const continueButton = (fullWidth: boolean) => (
    <Button
      fullWidth={fullWidth}
      disabled={!ready}
      onClick={goNext}
      aria-describedby={status ? 'etat-set-list' : undefined}
      className={fullWidth ? undefined : 'min-w-[9rem]'}
    >
      {t.playlist.continue}
    </Button>
  )
  const playlist = (tone: 'stage' | 'paper') =>
    selected.length > 0 ? (
      <SortablePlaylist
        items={selected}
        tone={tone}
        label={t.playlist.title}
        onMove={store.moveTrack}
        onRemove={store.removeTrack}
      />
    ) : (
      <p className={tone === 'paper' ? 'py-4 text-ink/70' : 'py-4 text-muted'}>
        {t.playlist.empty}
      </p>
    )

  const loading = !catalog && !error
  const filtered = hasActiveFilters(filters)

  return (
    <div className="gutter-x pb-6 lg:grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <h1 className="font-display text-[2.25rem] leading-[0.95] font-black uppercase lg:text-[4.5rem]">
          {t.tracks.title}
        </h1>
        <div className="mt-4 lg:mt-7">
          <SearchField
            label={t.tracks.search}
            placeholder={t.tracks.searchPlaceholder}
            value={query}
            onChange={setQuery}
            {...(catalog ? { resultCount: results.length } : {})}
          />
        </div>
        {chips.length > 0 && (
          <FilterChips
            label={t.tracks.filters}
            chips={chips}
            onToggle={(id) => setFilters(toggleChip(filters, id))}
            className="mt-2 -mr-[var(--gutter)] lg:mr-0"
          />
        )}

        <div className="mt-3">
          {error && !catalog ? (
            <Banner
              blocking
              title={t.tracks.loadError}
              action={
                <Button variant="secondary" onClick={reload}>
                  {t.retry}
                </Button>
              }
            >
              {messageFor(error.code, 'load')}
            </Banner>
          ) : loading ? (
            <div role="status">
              <span className="sr-only">{t.loading}</span>
              <ul>
                {Array.from({ length: 8 }, (_, i) => (
                  <TrackRowSkeleton key={i} />
                ))}
              </ul>
            </div>
          ) : groups.length === 0 ? (
            <EmptyState
              title={query.trim() ? t.tracks.noResult(query.trim()) : t.tracks.noResultFiltered}
              {...(query.trim() ? { text: t.tracks.noResultHelp } : {})}
              action={
                <Button
                  variant="secondary"
                  onClick={() =>
                    query.trim() ? setQuery('') : setFilters({ projects: [], types: [] })
                  }
                >
                  {query.trim() ? t.tracks.clearSearch : t.tracks.clearFilters}
                </Button>
              }
            />
          ) : (
            groups.map((group, i) => (
              <section key={String(group.key)} aria-labelledby={`groupe-${String(group.key)}`}>
                <div className="sticky top-0 z-10 flex min-h-10 items-center justify-between gap-4 bg-night/90">
                  <h2
                    id={`groupe-${String(group.key)}`}
                    className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase"
                  >
                    {groupLabel(group.name, group.project)}
                  </h2>
                  {i === 0 && filtered && (
                    <button
                      type="button"
                      onClick={() => setFilters({ projects: [], types: [] })}
                      className="min-h-10 text-[0.875rem] font-semibold underline underline-offset-4"
                    >
                      {t.tracks.clearFilters}
                    </button>
                  )}
                </div>
                <ul>
                  {group.tracks.map((track) => (
                    <TrackRow
                      key={track.id}
                      title={track.title}
                      subtitle={
                        track.featuredArtists
                          ? t.playlist.feat(track.featuredArtists)
                          : t.tracks.types[track.type].toLowerCase()
                      }
                      monogram={group.project ? monogram(group.name) : 'HP'}
                      coverUrl={track.coverUrl ?? group.project?.coverUrl ?? null}
                      coverAlt={t.tracks.coverAlt(group.name)}
                      added={draft.trackIds.includes(track.id)}
                      full={full}
                      onToggle={() => toggle(track.id)}
                    />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>

      <p id="etat-set-list" role="status" className="sr-only">
        {status}
      </p>

      {desktop ? (
        <aside aria-labelledby="titre-set-list" className="lg:col-span-5">
          <div className="sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-control bg-stage p-7">
            <div className="flex items-center justify-between gap-4">
              <h2
                id="titre-set-list"
                className="font-display text-[2.25rem] leading-none font-black uppercase"
              >
                {t.playlist.title}
              </h2>
              {counter('text-[2.25rem]')}
            </div>
            <SetlistSheetFrame
              className="mt-6"
              casting={guestNames.length > 0 ? guestNames.join(' · ') : t.playlist.castingNext}
            >
              {playlist('paper')}
            </SetlistSheetFrame>
            <p aria-hidden="true" className="mt-6 text-[0.8125rem] text-muted">
              {full ? t.playlist.full : t.playlist.helpDesktop}
            </p>
            <div className="mt-6">{continueButton(true)}</div>
          </div>
        </aside>
      ) : (
        <BottomSheet
          title={t.playlist.title}
          aside={counter('text-[1.75rem]')}
          description={t.playlist.help}
          collapseLabel={t.playlist.collapse}
          openLabel={t.playlist.open}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          summary={
            <>
              <div className="min-w-0">
                <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                  {t.playlist.title}
                </p>
                {counter('text-[2.25rem]')}
                {status && (
                  <p aria-hidden="true" className="mt-1 max-w-[14rem] text-[0.8125rem] text-paper">
                    {status}
                  </p>
                )}
              </div>
              {continueButton(false)}
            </>
          }
          footer={continueButton(true)}
        >
          {playlist('stage')}
        </BottomSheet>
      )}
    </div>
  )
}
