import { describe, expect, it } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { createDraftStore } from '../../src/features/draft/store.ts'
import { useDraft, useMarkDraftStarted } from '../../src/features/draft/useDraft.ts'
import { createSafeStorage } from '../../src/lib/storage.ts'

const store = createDraftStore({
  storage: createSafeStorage(() => undefined),
  now: () => 42_000,
  uuid: () => '00000000-0000-4000-8000-000000000001',
})

function Composer() {
  useMarkDraftStarted(store)
  const { draft, store: s } = useDraft(store)
  return (
    <div>
      <p>{draft.trackIds.join(',') || 'vide'}</p>
      <button onClick={() => s.addTrack(7, 20)}>Ajouter</button>
    </div>
  )
}

describe('useDraft', () => {
  it('rend le brouillon et le met à jour après une action', () => {
    render(<Composer />)
    expect(screen.getByText('vide')).toBeTruthy()
    act(() => fireEvent.click(screen.getByRole('button', { name: 'Ajouter' })))
    expect(screen.getByText('7')).toBeTruthy()
    expect(store.getSnapshot().startedAt).toBe(42_000)
  })
})
