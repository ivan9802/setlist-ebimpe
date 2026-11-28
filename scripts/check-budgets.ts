// Contrôle des budgets de taille (architecture §4.6, CA-NF-02). Le build échoue en cas de dépassement.
// Les chunks share et results recevront leur budget quand ils existeront (phases 6 et 8).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ASSETS = join('dist', 'assets')
const FONTS = join('dist', 'fonts')
const KB = 1024

type Budget = {
  label: string
  dir: string
  match: RegExp
  maxKb: number
  /** Les fichiers déjà compressés (WOFF2) sont mesurés tels quels. */
  measure: 'gzip' | 'raw'
}

const BUDGETS: Budget[] = [
  { label: 'entry (JS)', dir: ASSETS, match: /^index-.*\.js$/, maxKb: 110, measure: 'gzip' },
  { label: 'styles (CSS)', dir: ASSETS, match: /^index-.*\.css$/, maxKb: 30, measure: 'gzip' },
  // Parcours de composition : étapes chargées à la demande, avec dnd-kit (architecture §4.6).
  {
    label: 'compose (JS)',
    dir: ASSETS,
    match: /^(TracksStep|GuestsStep|RecapStep)-.*\.js$/,
    maxKb: 60,
    measure: 'gzip',
  },
  { label: 'polices (WOFF2)', dir: FONTS, match: /\.woff2$/, maxKb: 120, measure: 'raw' },
]

const sizeOf = (path: string, measure: Budget['measure']) =>
  measure === 'gzip' ? gzipSync(readFileSync(path)).length : statSync(path).size

let failed = false
for (const { label, dir, match, maxKb, measure } of BUDGETS) {
  const names = existsSync(dir) ? readdirSync(dir).filter((n) => match.test(n)) : []
  if (names.length === 0) {
    failed = true
    console.log(`KO  ${label} : aucun fichier trouvé dans ${dir}`)
    continue
  }
  const total = names.reduce((sum, n) => sum + sizeOf(join(dir, n), measure), 0)
  const ok = total <= maxKb * KB
  if (!ok) failed = true
  console.log(`${ok ? 'OK ' : 'KO '} ${label} : ${(total / KB).toFixed(1)} Ko / ${maxKb} Ko`)
}

if (failed) {
  console.error('Budget de taille dépassé.')
  process.exit(1)
}
