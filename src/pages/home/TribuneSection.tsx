// Séquence 3 · La tribune (maquette 01) : top 3 des titres en banderoles, top 3 des guests en
// tuiles, à partir de 10 participations (RG-RES-04). En dessous, un message d'attente. Les barres
// et rangs visuels sont décoratifs : chaque valeur est aussi écrite en texte (DA §5, RankBar).
import type { CSSProperties } from 'react'
import type { Stats } from '../../../shared/api-types.ts'
import { formatNumber, formatPercent } from '../../lib/format.ts'
import { t } from '../../lib/messages.fr.ts'
import { percentOf } from '../../features/results/useStats.ts'

const TOP = 3

export function TribuneSection({ stats }: { stats: Stats | undefined }) {
  if (!stats) return null
  const total = stats.totals.participations
  const tracks = stats.topTracks?.slice(0, TOP) ?? null
  const guests = stats.guests?.slice(0, TOP) ?? []
  const best = tracks?.[0]?.selections ?? 0

  return (
    <section aria-labelledby="sequence-tribune" className="gutter-x pt-14">
      <p className="eyebrow">{t.home.tribuneEyebrow}</p>
      <h2 id="sequence-tribune" className="mt-2 font-display text-section font-black uppercase">
        {t.home.tribuneTitle}
      </h2>

      {tracks === null ? (
        <p className="mt-6 text-title">{t.home.tribuneWaiting}</p>
      ) : (
        <>
          <h3 className="sr-only">{t.home.tribuneTracks}</h3>
          <ol className="tribune-timeline mt-8 flex max-w-3xl flex-col gap-4">
            {tracks.map((track, i) => (
              <li
                key={track.trackId}
                className="relative flex min-h-[4.375rem] items-center gap-6 bg-stage px-5 py-3"
              >
                <span
                  aria-hidden="true"
                  className="w-6 font-display text-figure font-black text-signal"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-[1.5rem] leading-none font-extrabold uppercase">
                    {track.title}
                  </p>
                  <p className="mt-1 text-caption text-muted">
                    {t.home.tribuneLine(
                      formatNumber(track.selections),
                      track.selections,
                      formatPercent(percentOf(track.selections, total)),
                    )}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="banner-unroll absolute -bottom-1 left-0 h-1 origin-left bg-signal"
                  style={
                    {
                      width: `${best > 0 ? (track.selections / best) * 100 : 0}%`,
                      '--i': i,
                    } as CSSProperties
                  }
                />
              </li>
            ))}
          </ol>

          {guests.length > 0 && (
            <>
              <h3 className="mt-10 text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                {t.home.tribuneGuests}
              </h3>
              <ol className="mt-3 grid max-w-3xl grid-cols-3 gap-2">
                {guests.map((guest, i) => (
                  <li key={guest.guestId} className="bg-stage px-3 py-3">
                    <span
                      aria-hidden="true"
                      className="block font-display text-[1.75rem] leading-none font-black text-signal"
                    >
                      {i + 1}
                    </span>
                    <p className="mt-2 font-display text-[1.125rem] leading-none font-extrabold [overflow-wrap:anywhere] uppercase">
                      {guest.name}
                    </p>
                    <p className="mt-1 text-caption text-muted">
                      {formatPercent(Math.round(guest.percent))}
                    </p>
                  </li>
                ))}
              </ol>
            </>
          )}
          <p className="mt-5 max-w-[48ch] text-caption text-muted">{t.home.tribuneNote}</p>
        </>
      )}
    </section>
  )
}
