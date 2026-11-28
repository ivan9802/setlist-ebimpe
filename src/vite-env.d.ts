/// <reference types="vite/client" />

/** Variables publiques PAR CONCEPTION : elles finissent dans le bundle (architecture §11.5). */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
  readonly VITE_TURNSTILE_SITE_KEY?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_APP_VERSION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
