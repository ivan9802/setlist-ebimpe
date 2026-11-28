import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import type { Catalog, Stats } from '../../shared/api-types.ts'
import { resetResourceCache } from '../../src/lib/useResource.ts'
import { catalogClosed, catalogWithoutGuests, makeCatalog } from '../fixtures/catalog.ts'
import { statsBelowThreshold, statsFull } from '../fixtures/stats.ts'

const rpc = vi.fn()
vi.mock('../../src/lib/api.ts', () => ({ rpc: (...args: unknown[]) => rpc(...args) }))
const { HomePage } = await import('../../src/pages/home/HomePage.tsx')

type Answers = { catalog?: Catalog | null; stats?: Stats | null }

function serve({ catalog = makeCatalog(), stats = statsFull() }: Answers = {}) {
  rpc.mockImplementation((fn: string) => {
    const value = fn === 'get_catalog' ? catalog : fn === 'get_stats' ? stats : null
    return Promise.resolve(
      value === null
        ? { ok: false, error: { code: 'network', status: null } }
        : { ok: true, value },
    )
  })
}

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
      <footer>pied</footer>
    </MemoryRouter>,
  )
}

afterEach(() => {
  resetResourceCache()
  rpc.mockReset()
  vi.unstubAllGlobals()
})

describe('accueil, campagne ouverte (maquette 01)', () => {
  beforeEach(() => serve())

  it('montre le slogan, le compteur réel et le bouton principal (CA-01)', async () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('EBIMPÉ SE PRÉPARE.')
    expect(screen.getByText('LES ULTRA DÉCIDENT.')).toBeTruthy()
    const [cta] = screen.getAllByRole('link', { name: 'Composer ma set-list' })
    expect(cta?.getAttribute('href')).toBe('/composer/morceaux')
    expect(
      await screen.findByText('4 812 set-lists déposées par les ULTRA', {
        normalizer: (s) => s.replace(/\s/g, ' '),
      }),
    ).toBeTruthy()
    expect(screen.getByText("26.12 · Stade d'Ebimpé")).toBeTruthy()
  })

  it('n’affiche jamais de faux chiffre avant la réponse du serveur', () => {
    rpc.mockImplementation(() => new Promise(() => {}))
    renderHome()
    expect(screen.getAllByText('…').length).toBeGreaterThan(0)
  })

  it('tire la feuille d’exemple du catalogue réel, étiquetée « Exemple »', async () => {
    renderHome()
    const sheet = (await screen.findByText('EXEMPLE')).closest('figure')
    if (!sheet) throw new Error('feuille absente')
    const rows = within(sheet).getAllByRole('listitem')
    expect(rows).toHaveLength(6)
    expect(rows[0]?.textContent).toContain('Éclaté')
    expect(within(sheet).getByText('Artiste Test Alpha · Artiste Test Bêta')).toBeTruthy()
  })

  it('affiche la tribune : top 3 des titres avec leur part, top 3 des guests', async () => {
    renderHome()
    const tribune = (await screen.findByRole('heading', { name: 'CE QUE LES ULTRA RÉCLAMENT' }))
      .parentElement
    if (!tribune) throw new Error('tribune absente')
    const lists = within(tribune).getAllByRole('list')
    expect(within(lists[0] as HTMLElement).getAllByRole('listitem')).toHaveLength(3)
    expect(within(tribune).getByText(/3\s900 set-lists · 81\s%/)).toBeTruthy()
    expect(within(lists[1] as HTMLElement).getAllByRole('listitem')).toHaveLength(3)
  })

  it('présente les guests comme des souhaits, avec la liste complète en texte', async () => {
    renderHome()
    expect(await screen.findByText(/^Guests proposés : Artiste Test Alpha, /)).toBeTruthy()
    expect(screen.getByText('Des souhaits de fans, pas une annonce de programmation.')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Choisir mes guests' }).getAttribute('href')).toBe(
      '/composer/guests',
    )
  })
})

describe('accueil, cas particuliers', () => {
  it('sous 10 participations, la tribune attend sans classement (RG-RES-04)', async () => {
    serve({ stats: statsBelowThreshold() })
    renderHome()
    expect(
      await screen.findByText('Les premières set-lists arrivent. Sois dans les premiers.'),
    ).toBeTruthy()
    expect(screen.queryByText(/set-lists · /)).toBeNull()
  })

  it('campagne close : les résultats passent devant (maquette 01c, RG-CAM-02)', async () => {
    serve({ catalog: catalogClosed() })
    renderHome()
    expect(
      await screen.findByRole('heading', { level: 1, name: 'LES SET-LISTS SONT CLOSES.' }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Voir les résultats' }).getAttribute('href')).toBe(
      '/resultats',
    )
    expect(screen.queryByRole('link', { name: 'Composer ma set-list' })).toBeNull()
    expect(screen.queryByText('EXEMPLE')).toBeNull()
    expect(screen.queryByRole('link', { name: 'Choisir mes guests' })).toBeNull()
  })

  it('sans guest actif, la séquence du casting disparaît', async () => {
    serve({ catalog: catalogWithoutGuests() })
    renderHome()
    await screen.findByText('EXEMPLE')
    expect(screen.queryByRole('heading', { name: 'TON CASTING RÊVÉ' })).toBeNull()
  })

  it('si les résultats ne chargent pas, le compteur reste « … » et la tribune se tait', async () => {
    serve({ stats: null })
    renderHome()
    await screen.findByText('EXEMPLE')
    expect(screen.getAllByText('…').length).toBeGreaterThan(0)
    expect(screen.queryByRole('heading', { name: 'CE QUE LES ULTRA RÉCLAMENT' })).toBeNull()
  })
})

describe('barre d’action collante (maquette 01b)', () => {
  it('apparaît quand l’ouverture sort de l’écran, disparaît sur le pied de page', async () => {
    serve()
    let notify: (entries: Partial<IntersectionObserverEntry>[]) => void = () => {}
    const observed: Element[] = []
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: (e: Partial<IntersectionObserverEntry>[]) => void) {
          notify = cb
        }
        observe(el: Element) {
          observed.push(el)
        }
        disconnect() {}
      },
    )
    renderHome()
    const bar = screen.getByRole('link', { name: 'Composer' }).closest('[data-visible]')
    expect(bar?.getAttribute('data-visible')).toBe('false')
    expect(bar?.hasAttribute('inert')).toBe(true)

    const [opening, footer] = observed
    act(() => notify([{ target: opening as Element, isIntersecting: false }]))
    expect(bar?.getAttribute('data-visible')).toBe('true')
    expect(bar?.hasAttribute('inert')).toBe(false)

    act(() => notify([{ target: footer as Element, isIntersecting: true }]))
    await waitFor(() => expect(bar?.getAttribute('data-visible')).toBe('false'))
  })
})
