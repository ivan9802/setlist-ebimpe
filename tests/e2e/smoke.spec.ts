import { expect, test } from './fixtures.ts'
import AxeBuilder from '@axe-core/playwright'

test('le socle répond, en français, sans violation d’accessibilité sérieuse', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const { violations } = await new AxeBuilder({ page }).analyze()
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  expect(blocking).toEqual([])
})

test('la sonde /api/health répond', async ({ request }) => {
  const res = await request.get('/api/health')
  expect(res.ok()).toBe(true)
})
