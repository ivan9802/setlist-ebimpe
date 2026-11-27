// Contrôle des budgets de taille compressée (architecture §4.6, CA-NF-02).
// Au sprint 0, seul le chunk d'entrée existe. Les autres chunks seront nommés au fil des sprints.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ASSETS = join('dist', 'assets')
const KB = 1024

/** Budget du chunk d'entrée (JS) et de la feuille de style initiale, compressés. */
const BUDGETS: { label: string; match: RegExp; maxKb: number }[] = [
  { label: 'entry (JS)', match: /^index-.*\.js$/, maxKb: 110 },
  { label: 'styles (CSS)', match: /^index-.*\.css$/, maxKb: 30 },
]

let failed = false
const names = readdirSync(ASSETS)
for (const { label, match, maxKb } of BUDGETS) {
  const total = names
    .filter((n) => match.test(n))
    .reduce((sum, n) => sum + gzipSync(readFileSync(join(ASSETS, n))).length, 0)
  const ok = total <= maxKb * KB
  if (!ok) failed = true
  console.log(`${ok ? 'OK ' : 'KO '} ${label} : ${(total / KB).toFixed(1)} Ko / ${maxKb} Ko`)
}

if (failed) {
  console.error('Budget de taille dépassé.')
  process.exit(1)
}
