import AxeBuilder from '@axe-core/playwright'
import { catalogClosed } from '../fixtures/catalog.ts'
import { statsBelowThreshold } from '../fixtures/stats.ts'
import { expect, mockApi, test } from './fixtures.ts'
import type { Page } from '@playwright/test'

async function seriousViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
}

test.describe('accueil (maquettes 01, 01b, 01c)', () => {
  test('CA-01 : slogan, compteur et bouton visibles sans défiler à 360 px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 })
    await page.goto('/')
    await expect(
      page.getByRole('heading', { level: 1, name: 'EBIMPÉ SE PRÉPARE.' }),
    ).toBeInViewport()
    await expect(page.getByText(/4\s812/).first()).toBeInViewport()
    await expect(page.getByRole('link', { name: 'Composer ma set-list' }).first()).toBeInViewport({
      ratio: 1,
    })
  })

  test('récit complet, sans violation axe sérieuse ni défilement horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/')
    await expect(page.getByText('EXEMPLE')).toBeAttached()
    await expect(page.getByRole('heading', { name: 'CE QUE LES ULTRA RÉCLAMENT' })).toBeAttached()
    await expect(page.getByRole('heading', { name: 'TON CASTING RÊVÉ' })).toBeAttached()
    await expect(page.getByRole('heading', { name: /À TOI DE/ })).toBeAttached()
    expect(await seriousViolations(page)).toEqual([])
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('la barre collante apparaît après l’ouverture et mène à la composition', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/')
    const bar = page.locator('[data-visible]')
    await expect(bar).toHaveAttribute('data-visible', 'false')
    await page.mouse.wheel(0, 1200)
    await expect(bar).toHaveAttribute('data-visible', 'true')
    await bar.getByRole('link', { name: 'Composer' }).click()
    await expect(page).toHaveURL(/\/composer\/morceaux$/)
  })

  test('sous 10 participations, la tribune annonce les premiers résultats', async ({ page }) => {
    await mockApi(page, { get_stats: statsBelowThreshold() })
    await page.goto('/')
    await expect(
      page.getByText('Les premières set-lists arrivent. Sois dans les premiers.'),
    ).toBeAttached()
  })

  test('campagne close : « Voir les résultats » devient l’action principale', async ({ page }) => {
    await mockApi(page, { get_catalog: catalogClosed() })
    await page.goto('/')
    await expect(
      page.getByRole('heading', { level: 1, name: 'LES SET-LISTS SONT CLOSES.' }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'Voir les résultats' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Composer ma set-list' })).toHaveCount(0)
    expect(await seriousViolations(page)).toEqual([])
  })

  test('sans réponse du serveur, aucun faux chiffre n’est affiché', async ({ page }) => {
    await mockApi(page, { get_stats: new Error('panne') })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('…').first()).toBeVisible()
  })
})
