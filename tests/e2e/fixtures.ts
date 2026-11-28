// Fixture Playwright : les appels à Supabase (build `npm run build:mock`, URL relative /__mock__)
// sont interceptés et servis avec les données fictives de tests/fixtures. Un test peut changer
// les réponses avec `mockApi(page, { get_stats: … })` : la dernière interception l'emporte.
import { test as base, type Page } from '@playwright/test'
import { makeCatalog } from '../fixtures/catalog.ts'
import { FIXTURE_CODE, publicPlaylist, statsFull } from '../fixtures/stats.ts'

type Rpc = 'get_catalog' | 'get_stats' | 'get_public_playlist' | 'increment_share'
type Answers = Partial<Record<Rpc, unknown>>

export async function mockApi(page: Page, overrides: Answers = {}): Promise<void> {
  const answers: Answers = {
    get_catalog: makeCatalog(),
    get_stats: statsFull(),
    ...overrides,
  }
  await page.route('**/__mock__/rest/v1/rpc/*', async (route) => {
    const fn = new URL(route.request().url()).pathname.split('/').pop() as Rpc
    if (fn === 'increment_share') return route.fulfill({ status: 204 })
    if (fn === 'get_public_playlist' && !('get_public_playlist' in overrides)) {
      const code = (route.request().postDataJSON() as { p_code?: string } | null)?.p_code
      return route.fulfill({ json: code === FIXTURE_CODE ? publicPlaylist() : null })
    }
    const answer = answers[fn]
    if (answer instanceof Error) return route.fulfill({ status: 503, body: '' })
    return route.fulfill({ json: answer ?? null })
  })
}

/** `test` avec les données fictives branchées d'office. */
export const test = base.extend<{ api: undefined }>({
  api: [
    async ({ page }, use) => {
      await mockApi(page)
      await use(undefined)
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
