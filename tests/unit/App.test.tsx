import { describe, expect, it } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
import { MemoryRouter, useNavigate, type NavigateFunction } from 'react-router'
import { Providers } from '../../src/app/App.tsx'
import { AppRoutes } from '../../src/app/router.tsx'
import { t } from '../../src/lib/messages.fr.ts'

function renderAt(path: string) {
  const nav: { navigate?: NavigateFunction } = {}
  function CaptureNavigate() {
    nav.navigate = useNavigate()
    return null
  }
  render(
    <MemoryRouter initialEntries={[path]}>
      <Providers>
        <AppRoutes />
        <CaptureNavigate />
      </Providers>
    </MemoryRouter>,
  )
  return nav
}

describe('accueil (socle)', () => {
  it('affiche un seul titre principal, le bouton principal et la mention d’indépendance', () => {
    renderAt('/')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Composer ma set-list' }).getAttribute('href')).toBe(
      '/composer/morceaux',
    )
    expect(screen.getByText(/initiative indépendante de fans/i)).toBeTruthy()
  })

  it('a un lien d’évitement vers le contenu principal', () => {
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Aller au contenu' }).getAttribute('href')).toBe(
      '#contenu',
    )
    expect(document.getElementById('contenu')?.tagName).toBe('MAIN')
  })
})

describe('parcours de composition', () => {
  it('redirige /composer vers l’étape Morceaux', async () => {
    renderAt('/composer')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Choisis tes morceaux' }),
    ).toBeTruthy()
  })

  it('indique l’étape courante et masque la navigation globale', async () => {
    renderAt('/composer/guests')
    await screen.findByRole('heading', { level: 1 })
    const steps = screen.getByRole('navigation', { name: 'Étapes de la composition' })
    const current = within(steps)
      .getAllByRole('listitem')
      .find((li) => li.getAttribute('aria-current') === 'step')
    expect(current?.textContent).toBe('Étape 2 sur 3 : Guests')
    expect(screen.queryByRole('navigation', { name: 'Navigation principale' })).toBeNull()
    expect(screen.getByText(/initiative indépendante de fans/i)).toBeTruthy()
  })

  it('met le focus sur le titre de la nouvelle étape après une navigation', async () => {
    const nav = renderAt('/composer/morceaux')
    await screen.findByRole('heading', { level: 1, name: 'Choisis tes morceaux' })
    await act(async () => nav.navigate?.('/composer/guests'))
    const heading = await screen.findByRole('heading', {
      level: 1,
      name: 'Les guests que je veux voir sur scène',
    })
    expect(document.activeElement).toBe(heading)
  })
})

describe('pages transverses', () => {
  it('affiche la 404 avec un retour à l’accueil pour une adresse inconnue', () => {
    renderAt('/nimporte-quoi')
    expect(screen.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeTruthy()
    expect(screen.getByRole('link', { name: t.backHome })).toBeTruthy()
  })

  it('charge à la demande les pages légales', async () => {
    renderAt('/conditions')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Conditions de participation' }),
    ).toBeTruthy()
  })
})
