/** Configuration publique lue au build. Une valeur absente vaut une chaîne vide. */
export const env = {
  supabaseUrl: (import.meta.env.VITE_SUPABASE_URL ?? '').replace(/\/+$/, ''),
  supabasePublishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '',
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN ?? '',
  appVersion: import.meta.env.VITE_APP_VERSION ?? 'dev',
} as const
