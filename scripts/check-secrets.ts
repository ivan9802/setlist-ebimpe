// Échoue si un secret ou un nom de variable secrète se retrouve dans le build public (CA-NF-05).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const FORBIDDEN = [
  /sb_secret_/,
  /service_role/,
  /SUPABASE_SECRET_KEY/,
  /TURNSTILE_SECRET_KEY/,
  /SUPABASE_ACCESS_TOKEN/,
  /SUPABASE_DB_PASSWORD/,
  /CLOUDFLARE_API_TOKEN/,
]

function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* files(path)
    else yield path
  }
}

const hits: string[] = []
for (const file of files(DIST)) {
  if (file.endsWith('.map')) continue
  const content = readFileSync(file, 'utf8')
  for (const pattern of FORBIDDEN) {
    if (pattern.test(content)) hits.push(`${file} : ${pattern.source}`)
  }
}

if (hits.length > 0) {
  console.error('Secret ou nom de variable secrète trouvé dans dist/ :\n' + hits.join('\n'))
  process.exit(1)
}
console.log('check-secrets : aucun secret dans dist/.')
