// Formats d'affichage : français de Côte d'Ivoire, fuseau d'Abidjan (architecture §6.1),
// dates en JJ/MM/AAAA. Aucune bibliothèque de dates (architecture §2.2).

const LOCALE = 'fr-CI'
const TIME_ZONE = 'Africa/Abidjan'

const dateFormat = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const timeFormat = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

const numberFormat = new Intl.NumberFormat(LOCALE)
const percentFormat = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 })

const toDate = (iso: string): Date | null => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d
}

/** « 2026-12-10T19:05:00Z » → « 10/12/2026 ». Une date invalide donne une chaîne vide. */
export function formatDate(iso: string): string {
  const d = toDate(iso)
  return d ? dateFormat.format(d) : ''
}

/** « 2026-12-10T21:42:00Z » → « 21:42 » (Abidjan est en UTC toute l'année). */
export function formatTime(iso: string): string {
  const d = toDate(iso)
  return d ? timeFormat.format(d) : ''
}

/**
 * 4812 → « 4 812 », 1204 → « 1 204 », avec une espace insécable normale : l'espace fine du
 * français (U+202F) est presque invisible en Instrument Sans à 13 px (maquette 01 : « 1 204 »).
 */
export function formatNumber(n: number): string {
  return numberFormat.format(n).replace(/\u202f/g, '\u00a0')
}

/** 41.7 → « 41,7 % ». */
export function formatPercent(n: number): string {
  return `${percentFormat.format(n)}\u00a0%`
}
