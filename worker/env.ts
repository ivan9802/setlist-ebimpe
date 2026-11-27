/** Liaisons et variables du Worker (wrangler.toml, secrets via `wrangler secret put`). */
export interface Env {
  ASSETS: Fetcher
  APP_VERSION: string
  SUPABASE_URL: string
  ALLOWED_ORIGINS: string
  // Secrets, jamais exposés au navigateur ni journalisés :
  SUPABASE_SECRET_KEY?: string
  TURNSTILE_SECRET_KEY?: string
}
