import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { MemoryRouter } from 'react-router'
import { Banner } from '../../src/components/ui/Banner.tsx'
import { BottomSheet } from '../../src/components/ui/BottomSheet.tsx'
import { Button } from '../../src/components/ui/Button.tsx'
import { Counter } from '../../src/components/ui/Counter.tsx'
import { Field } from '../../src/components/ui/Field.tsx'
import { FilterChips } from '../../src/components/ui/FilterChips.tsx'
import { SearchField } from '../../src/components/ui/SearchField.tsx'
import { SkeletonList } from '../../src/components/ui/Skeleton.tsx'
import { StatTile } from '../../src/components/ui/StatTile.tsx'
import { TOAST_DURATION_MS, ToastProvider, useToast } from '../../src/components/ui/Toast.tsx'
import { StepHeader } from '../../src/components/layout/StepHeader.tsx'

afterEach(() => vi.useRealTimers())

describe('Button', () => {
  it('désactivé : reste atteignable, ignore l’appui et explique pourquoi', () => {
    const onClick = vi.fn()
    render(
      <Button disabled disabledReason="Ajoute au moins un titre." onClick={onClick}>
        Continuer
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Continuer' })
    expect(button.getAttribute('aria-disabled')).toBe('true')
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
    const reason = screen.getByText('Ajoute au moins un titre.')
    expect(button.getAttribute('aria-describedby')).toBe(reason.id)
  })

  it('en chargement : libellé d’envoi et double appui ignoré', () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Déposer ma set-list
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Envoi…' })
    expect(button.getAttribute('aria-busy')).toBe('true')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Counter', () => {
  it('annonce la valeur en toutes lettres, sans lire la barre oblique', () => {
    render(<Counter value={7} max={20} noun="titres" />)
    const live = screen.getByText('7 sur 20 titres').closest('[aria-live]')
    expect(live?.getAttribute('aria-live')).toBe('polite')
  })
})

describe('FilterChips', () => {
  it('porte l’état par aria-pressed', () => {
    const onToggle = vi.fn()
    render(
      <FilterChips
        label="Filtrer par projet"
        chips={[
          { id: '1', label: 'Album Fictif', pressed: true },
          { id: '2', label: 'EP Imaginaire', pressed: false },
        ]}
        onToggle={onToggle}
      />,
    )
    expect(screen.getByRole('group', { name: 'Filtrer par projet' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Album Fictif' }).getAttribute('aria-pressed')).toBe(
      'true',
    )
    fireEvent.click(screen.getByRole('button', { name: 'EP Imaginaire' }))
    expect(onToggle).toHaveBeenCalledWith('2')
  })
})

describe('SearchField', () => {
  function Harness() {
    const [value, setValue] = useState('ecl')
    return (
      <SearchField label="Rechercher un titre" value={value} onChange={setValue} resultCount={1} />
    )
  }

  it('efface la recherche, rend le focus au champ et annonce le nombre de résultats', () => {
    render(<Harness />)
    const input = screen.getByRole('searchbox', { name: 'Rechercher un titre' })
    expect(screen.getByText('1 titre')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Effacer la recherche' }))
    expect((input as HTMLInputElement).value).toBe('')
    expect(document.activeElement).toBe(input)
  })
})

describe('Field', () => {
  it('relie l’aide et l’erreur au champ', () => {
    render(
      <Field
        label="Ton pseudo"
        help="Ce nom sera public sur ta carte."
        error="Ce pseudo n'est pas accepté."
        value="ab"
        maxLength={24}
        showCount
        onChange={() => {}}
      />,
    )
    const input = screen.getByLabelText('Ton pseudo')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    const ids = input.getAttribute('aria-describedby')?.split(' ') ?? []
    const texts = ids.map((id) => document.getElementById(id)?.textContent)
    expect(texts).toEqual(['Ce nom sera public sur ta carte.', "Ce pseudo n'est pas accepté."])
    expect(screen.getByText('2 / 24')).toBeTruthy()
  })
})

describe('StatTile et SkeletonList', () => {
  it('réserve la place et annonce le chargement', () => {
    render(<StatTile value={null} label="set-lists déposées" />)
    expect(screen.getByText('…')).toBeTruthy()
    expect(screen.getByText('Chargement…')).toBeTruthy()
  })

  it('affiche la valeur formatée en français', () => {
    render(<StatTile value={4812} label="set-lists déposées" />)
    expect(screen.getByText(/4\s812/)).toBeTruthy()
  })

  it('affiche 8 silhouettes avec une seule annonce', () => {
    render(<SkeletonList />)
    expect(screen.getAllByRole('status')).toHaveLength(1)
  })
})

describe('Banner', () => {
  it('une erreur bloquante est annoncée immédiatement', () => {
    render(
      <Banner blocking title="Ta set-list n'est pas partie.">
        Elle est gardée ici.
      </Banner>,
    )
    expect(screen.getByRole('alert').textContent).toContain('Elle est gardée ici.')
  })
})

describe('Toast', () => {
  function Trigger() {
    const toast = useToast()
    return <button onClick={() => toast.show('Lien copié')}>Copier</button>
  }

  it('confirme puis disparaît au bout de 3 s', () => {
    vi.useFakeTimers()
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Copier' }))
    expect(screen.getByRole('status').textContent).toBe('Lien copié')
    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS))
    expect(screen.getByRole('status').textContent).toBe('')
  })
})

describe('BottomSheet', () => {
  function Harness() {
    const [open, setOpen] = useState(false)
    return (
      <BottomSheet
        title="Ma set-list"
        aside={<p>3 / 20</p>}
        description="Glisse une ligne pour changer l'ordre."
        summary={<p>Ma set-list · 3 / 20</p>}
        collapseLabel="Réduire la set-list"
        openLabel="Ouvrir ma set-list"
        open={open}
        onOpenChange={setOpen}
      >
        <p>Contenu de la feuille</p>
      </BottomSheet>
    )
  }

  it('s’ouvre depuis la poignée, se réduit et rend le focus à la poignée', () => {
    render(<Harness />)
    const handle = screen.getByRole('button', { name: 'Ouvrir ma set-list' })
    expect(handle.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(handle)
    expect(handle.getAttribute('aria-expanded')).toBe('true')
    const dialog = screen.getByRole('dialog', { name: 'Ma set-list' })
    expect(dialog.hasAttribute('open')).toBe(true)
    expect(dialog.getAttribute('aria-describedby')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Réduire la set-list' }))
    expect(dialog.hasAttribute('open')).toBe(false)
    expect(handle.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(handle)
  })
})

describe('StepHeader', () => {
  it('ramène à l’accueil depuis l’étape 1 et à l’étape précédente ensuite', () => {
    const { unmount } = render(
      <MemoryRouter>
        <StepHeader step={1} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: "Retour à l'accueil" }).getAttribute('href')).toBe('/')
    unmount()
    render(
      <MemoryRouter>
        <StepHeader step={3} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Retour : Guests' }).getAttribute('href')).toBe(
      '/composer/guests',
    )
  })
})
