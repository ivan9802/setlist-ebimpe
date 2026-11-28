import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { expect, test } from './fixtures.ts'

const DRAFT_KEY = 'hute:draft:v1'

/** Brouillon déjà commencé (reprise, UC-08), posé avant le chargement de la page. */
async function seedDraft(page: Page, trackIds: number[]) {
  await page.addInitScript(
    ([key, ids]) => {
      if (window.sessionStorage.getItem('graine')) return
      window.sessionStorage.setItem('graine', '1')
      window.localStorage.setItem(
        key as string,
        JSON.stringify({
          v: 1,
          trackIds: ids,
          guestIds: [],
          nickname: '',
          idempotencyKey: '3f2b8c1e-9d4a-4b6f-8a2e-1c5d7e9f0a3b',
          startedAt: 1,
          updatedAt: 1,
          keyUsed: false,
        }),
      )
    },
    [DRAFT_KEY, trackIds] as const,
  )
}

/** Sur mobile, la set-list est dans le tiroir ; sur ordinateur, dans le panneau de droite. */
async function playlist(page: Page) {
  // Le catalogue doit être arrivé : la set-list n'affiche que des titres connus.
  await expect(page.locator('li p', { hasText: /^Éclaté$/ })).toBeVisible()
  const handle = page.getByRole('button', { name: 'Ouvrir ma set-list' })
  if (await handle.isVisible()) await handle.click()
  const list = page.getByRole('list', { name: 'Ma set-list' })
  await expect(list.locator('li').first()).toBeVisible()
  return list
}

async function order(page: Page) {
  const list = page.getByRole('list', { name: 'Ma set-list' })
  return list
    .locator('li')
    .evaluateAll((items) =>
      items.map((li) => li.querySelector('span.font-semibold')?.textContent ?? ''),
    )
}

test.describe('étape Morceaux (maquettes 02, 03, 10)', () => {
  test('CA-02 : « eclate » trouve « Éclaté », l’ajout met le compteur à jour', async ({ page }) => {
    await page.goto('/composer/morceaux')
    await page.getByRole('searchbox', { name: 'Chercher un titre' }).fill('eclate')
    await expect(page.locator('li p', { hasText: /^Éclaté$/ })).toBeVisible()
    await expect(page.locator('li p', { hasText: /^Nuit de stade$/ })).toHaveCount(0)
    await page.getByRole('button', { name: 'Ajouter Éclaté' }).click()
    await expect(page.getByRole('button', { name: 'Ajouté Éclaté' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect(page.getByText('1 sur 20 titres').first()).toBeAttached()
  })

  test('CA-04 : impossible de continuer avec une set-list vide', async ({ page }) => {
    await page.goto('/composer/morceaux')
    const next = page.getByRole('button', { name: 'Continuer' }).first()
    await expect(next).toHaveAttribute('aria-disabled', 'true')
    // Playwright n'appuie pas sur un bouton aria-disabled ; on force l'appui pour vérifier le refus.
    await next.click({ force: true })
    await expect(page).toHaveURL(/\/composer\/morceaux$/)
  })

  test('CA-03 : le 21e titre est refusé, la raison est écrite', async ({ page }) => {
    await seedDraft(
      page,
      Array.from({ length: 20 }, (_, i) => i + 1),
    )
    await page.goto('/composer/morceaux')
    const blocked = page.getByRole('button', { name: 'Set-list pleine Corniche' })
    await expect(blocked).toHaveAttribute('aria-disabled', 'true')
    await expect(page.getByText(/Ta set-list est pleine/).first()).toBeAttached()
  })

  test('CA-05 : réordonner au clavier, l’ordre est gardé après rechargement', async ({ page }) => {
    await seedDraft(page, [1, 2, 3])
    await page.goto('/composer/morceaux')
    await playlist(page)
    expect(await order(page)).toEqual(['Éclaté', 'Nuit de stade', 'Gaffer au sol'])

    const handle = page.getByRole('button', { name: 'Déplacer Éclaté' })
    await handle.focus()
    // Chaque étape attend l'annonce correspondante, comme le ferait un lecteur d'écran.
    const live = page.locator('[id^="DndLiveRegion"]')
    await page.keyboard.press('Space')
    await expect(live).toContainText('position 1 sur 3')
    // dnd-kit n'écoute les flèches qu'un instant après la prise (la touche d'activation ne doit
    // pas compter comme un déplacement) : un humain ne tape jamais aussi vite qu'un test.
    await page.waitForTimeout(150)
    await page.keyboard.press('ArrowDown')
    await expect(live).toContainText('Éclaté amené en position 2 sur 3.')
    await page.keyboard.press('Space')
    await expect(live).toContainText('Éclaté déposé en position 2 sur 3.')
    await expect.poll(() => order(page)).toEqual(['Nuit de stade', 'Éclaté', 'Gaffer au sol'])

    // Le brouillon est écrit au plus toutes les 300 ms ; il survit au rechargement (UC-08).
    await page.waitForTimeout(400)
    await page.reload()
    await playlist(page)
    expect(await order(page)).toEqual(['Nuit de stade', 'Éclaté', 'Gaffer au sol'])
  })

  test('Monter, Descendre et Retirer, puis « Continuer » mène aux guests', async ({ page }) => {
    await seedDraft(page, [1, 2])
    await page.goto('/composer/morceaux')
    await playlist(page)
    await page.getByRole('button', { name: 'Monter Nuit de stade' }).click()
    expect(await order(page)).toEqual(['Nuit de stade', 'Éclaté'])
    await page.getByRole('button', { name: 'Retirer Éclaté' }).click()
    expect(await order(page)).toEqual(['Nuit de stade'])
    await page.getByRole('button', { name: 'Continuer' }).last().click()
    await expect(page).toHaveURL(/\/composer\/guests$/)
  })

  test('aucune violation axe sérieuse, liste et set-list ouvertes', async ({ page }) => {
    await seedDraft(page, [1, 2, 3])
    await page.goto('/composer/morceaux')
    await playlist(page)
    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})
