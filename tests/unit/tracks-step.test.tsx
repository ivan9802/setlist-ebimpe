import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router'
import { ToastProvider } from '../../src/components/ui/Toast.tsx'
import { DRAFT_KEY } from '../../src/features/draft/persistence.ts'
import { draftStore } from '../../src/features/draft/store.ts'
import { resetResourceCache } from '../../src/lib/useResource.ts'
import { makeCatalog } from '../fixtures/catalog.ts'

const rpc = vi.fn()
vi.mock('../../src/lib/api.ts', () => ({ rpc: (...args: unknown[]) => rpc(...args) }))
const { TracksStep } = await import('../../src/pages/compose/TracksStep.tsx')

function Location() {
  const { pathname, search } = useLocation()
  return <p data-testid="lieu">{pathname + search}</p>
}

function renderStep(path = '/composer/morceaux') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ToastProvider>
        <Routes>
          <Route path="/composer/morceaux" element={<TracksStep />} />
          <Route path="/composer/guests" element={<h1>Étape Guests</h1>} />
        </Routes>
        <Location />
      </ToastProvider>
    </MemoryRouter>,
  )
}

const row = (title: string) => {
  const name = screen.getByText(title, { selector: 'p' })
  return name.closest('li') as HTMLElement
}

beforeEach(() => {
  window.localStorage.clear()
  draftStore.reset()
  rpc.mockResolvedValue({ ok: true, value: makeCatalog() })
})

afterEach(() => {
  resetResourceCache()
  rpc.mockReset()
})

describe('étape Morceaux (maquettes 02 et 02b)', () => {
  it('affiche le catalogue groupé par projet, « Hors projet » en dernier', async () => {
    renderStep()
    expect(screen.getByRole('heading', { level: 1, name: 'CHOISIS TES TITRES' })).toBeTruthy()
    await screen.findByText('Éclaté', { selector: 'p' })
    const groups = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent)
      .filter((x) => x !== 'Ma set-list')
    expect(groups).toEqual([
      'Album Fictif · 2026',
      'EP Imaginaire · 2024',
      'Single Test · 2025',
      'Hors projet',
    ])
    expect(screen.getByRole('button', { name: 'Tous' }).getAttribute('aria-pressed')).toBe('true')
  })

  it('trouve « Éclaté » en tapant « eclate » et annonce le résultat (CA-02)', async () => {
    renderStep()
    await screen.findByText('Éclaté', { selector: 'p' })
    fireEvent.change(screen.getByRole('searchbox', { name: 'Chercher un titre' }), {
      target: { value: 'eclate' },
    })
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1))
    expect(screen.getByText('1 titre')).toBeTruthy()
  })

  it('ajoute un titre, met le compteur à jour et permet de continuer', async () => {
    renderStep()
    await screen.findByText('Éclaté', { selector: 'p' })
    const add = within(row('Éclaté')).getByRole('button', { name: /Ajouter/ })
    fireEvent.click(add)
    expect(add.getAttribute('aria-pressed')).toBe('true')
    expect(add.textContent).toContain('Ajouté')
    expect(screen.getAllByText('1 sur 20 titres').length).toBeGreaterThan(0)
    fireEvent.click(screen.getByRole('button', { name: 'Continuer' }))
    expect(screen.getByTestId('lieu').textContent).toBe('/composer/guests')
  })

  it('ne laisse pas continuer avec une set-list vide (CA-04)', async () => {
    renderStep()
    await screen.findByText('Éclaté', { selector: 'p' })
    const next = screen.getByRole('button', { name: 'Continuer' })
    expect(next.getAttribute('aria-disabled')).toBe('true')
    fireEvent.click(next)
    expect(screen.getByTestId('lieu').textContent).toBe('/composer/morceaux')
    expect(screen.getAllByText('Ajoute au moins un titre pour continuer.').length).toBeGreaterThan(
      0,
    )
  })

  it('refuse le 21e titre avec la raison écrite (CA-03)', async () => {
    for (let id = 1; id <= 20; id++) draftStore.addTrack(id, 20)
    renderStep()
    await screen.findByText('Inédit live', { selector: 'p' })
    const blocked = within(row('Corniche')).getByRole('button', { name: /Set-list pleine/ })
    expect(blocked.getAttribute('aria-disabled')).toBe('true')
    fireEvent.click(blocked)
    expect(draftStore.getSnapshot().trackIds).toHaveLength(20)
    expect(screen.getAllByText(/Ta set-list est pleine/).length).toBeGreaterThan(0)
    // On peut toujours retirer un titre déjà ajouté.
    fireEvent.click(within(row('Éclaté')).getByRole('button', { name: /Ajouté/ }))
    expect(draftStore.getSnapshot().trackIds).toHaveLength(19)
  })

  it('garde les filtres dans l’adresse et les efface', async () => {
    renderStep()
    await screen.findByText('Éclaté', { selector: 'p' })
    fireEvent.click(screen.getByRole('button', { name: 'EP Imaginaire' }))
    expect(screen.getByTestId('lieu').textContent).toBe('/composer/morceaux?projet=2')
    await waitFor(() => expect(screen.queryByText('Éclaté', { selector: 'p' })).toBeNull())
    fireEvent.click(screen.getByRole('button', { name: 'Effacer les filtres' }))
    expect(screen.getByTestId('lieu').textContent).toBe('/composer/morceaux')
  })

  it('ouvre directement avec les filtres de l’adresse', async () => {
    renderStep('/composer/morceaux?type=freestyle')
    await screen.findByText('Projecteur', { selector: 'p' })
    expect(screen.getByText('Freestyle du vendredi', { selector: 'p' })).toBeTruthy()
    expect(screen.queryByText('Éclaté', { selector: 'p' })).toBeNull()
  })

  it('propose d’effacer une recherche sans résultat (maquette 02b)', async () => {
    renderStep()
    await screen.findByText('Éclaté', { selector: 'p' })
    const search = screen.getByRole('searchbox', { name: 'Chercher un titre' })
    fireEvent.change(search, { target: { value: 'xyz' } })
    expect(await screen.findByText('Aucun titre ne correspond à « xyz ».')).toBeTruthy()
    // Le bouton de l'état vide (la croix du champ porte le même nom, sans texte visible).
    fireEvent.click(screen.getByText('Effacer la recherche', { selector: 'button' }))
    expect((search as HTMLInputElement).value).toBe('')
  })

  it('montre des silhouettes pendant le chargement, une bannière en cas d’échec', async () => {
    rpc.mockResolvedValueOnce({ ok: false, error: { code: 'network', status: null } })
    renderStep()
    expect(screen.getByText('Chargement…')).toBeTruthy()
    expect(await screen.findByText('Impossible de charger les titres.')).toBeTruthy()
    rpc.mockResolvedValue({ ok: true, value: makeCatalog() })
    fireEvent.click(screen.getByRole('button', { name: 'Réessayer' }))
    expect(await screen.findByText('Éclaté', { selector: 'p' })).toBeTruthy()
  })

  it('retire du brouillon un titre devenu indisponible et le dit (UC-08)', async () => {
    window.localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ ...draftStore.getSnapshot(), trackIds: [1, 999] }),
    )
    // Le store lit le stockage au démarrage : on simule la reprise avec purge.
    draftStore.reset()
    draftStore.addTrack(1, 20)
    draftStore.addTrack(999, 20)
    renderStep()
    expect(
      await screen.findByText(
        'Un titre n’est plus disponible. Il a été retiré de ta set-list.'.replace('’', "'"),
      ),
    ).toBeTruthy()
    expect(draftStore.getSnapshot().trackIds).toEqual([1])
  })
})

describe('tiroir « Ma set-list » (maquette 03)', () => {
  it('réordonne avec les boutons, le focus suit le titre, et retire', async () => {
    for (const id of [1, 2, 3]) draftStore.addTrack(id, 20)
    renderStep()
    await screen.findByText('Éclaté', { selector: 'p' })
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir ma set-list' }))
    const dialog = screen.getByRole('dialog', { name: 'Ma set-list' })

    const down = within(dialog).getByRole('button', { name: 'Descendre Éclaté' })
    act(() => down.focus())
    fireEvent.click(down)
    expect(draftStore.getSnapshot().trackIds).toEqual([2, 1, 3])
    await waitFor(() =>
      expect(document.activeElement).toBe(
        within(dialog).getByRole('button', { name: 'Descendre Éclaté' }),
      ),
    )
    expect(within(dialog).getByText('Éclaté déplacé en position 2 sur 3.')).toBeTruthy()

    fireEvent.click(within(dialog).getByRole('button', { name: 'Retirer Éclaté' }))
    expect(draftStore.getSnapshot().trackIds).toEqual([2, 3])
    await waitFor(() =>
      expect(document.activeElement).toBe(
        within(dialog).getByRole('button', { name: 'Retirer Gaffer au sol' }),
      ),
    )
  })
})
