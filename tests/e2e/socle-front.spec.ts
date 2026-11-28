import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

async function expectNoSeriousViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
}

test.describe('socle front (phase 1)', () => {
  for (const path of ['/composer/morceaux', '/resultats', '/page-inexistante']) {
    test(`${path} : un seul h1, mention d’indépendance, aucune violation axe sérieuse`, async ({
      page,
    }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.getByText(/initiative indépendante de fans/i)).toBeVisible()
      await expectNoSeriousViolations(page)
    })
  }

  test('le lien d’évitement est le premier élément atteint au clavier', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Aller au contenu' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
  })

  test('aller de l’accueil au parcours place le focus sur le titre de l’étape', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Composer ma set-list' }).click()
    await expect(page).toHaveURL(/\/composer\/morceaux$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  })

  test('les polices auto-hébergées se chargent', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const loaded = await page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family),
    )
    expect(loaded.join(' ')).toContain('Big Shoulders Display')
    expect(loaded.join(' ')).toContain('Instrument Sans')
  })

  test('aucun défilement horizontal à 360 px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    for (const path of ['/', '/composer/morceaux', '/page-inexistante']) {
      await page.goto(path)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, path).toBeLessThanOrEqual(0)
    }
  })
})
