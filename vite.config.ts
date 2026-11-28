import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mockApi } from './scripts/mock-api.ts'

// Le service worker (vite-plugin-pwa) arrive avec la PWA (v1.1, D-7).
// `--mode mock` : données fictives servies par le serveur de dev (voir .env.mock).
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), mode === 'mock' && mockApi()],
  build: {
    target: 'es2022',
    sourcemap: 'hidden',
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    proxy: {
      // En local, les routes du Worker sont servies par `wrangler dev`.
      '/api': 'http://localhost:8787',
      '/t': 'http://localhost:8787',
    },
  },
}))
