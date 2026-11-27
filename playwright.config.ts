import { defineConfig, devices } from '@playwright/test'

// En CI sur une PR, BASE_URL pointe vers la version de prévisualisation du Worker.
// Sinon, le build local est servi par `wrangler dev` (statique + Worker, comme en production).
const baseURL = process.env.BASE_URL ?? 'http://localhost:8787'

export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
  ],
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run preview',
          url: 'http://localhost:8787/api/health',
          reuseExistingServer: !process.env.CI,
          env: { WRANGLER_SEND_METRICS: 'false' },
        },
      }),
})
