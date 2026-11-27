import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Le service worker (vite-plugin-pwa) et le prérendu arrivent aux sprints 4 et 1.
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
})
