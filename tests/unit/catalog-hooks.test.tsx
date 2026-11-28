import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MAX_GUESTS, MAX_TRACKS } from '../../shared/constants.ts'
import { resetResourceCache } from '../../src/lib/useResource.ts'
import { makeCatalog } from '../fixtures/catalog.ts'

const rpc = vi.fn()
vi.mock('../../src/lib/api.ts', () => ({ rpc: (...args: unknown[]) => rpc(...args) }))

const { activeIdsOf, limitsOf, useCatalog } =
  await import('../../src/features/catalog/useCatalog.ts')

afterEach(() => {
  resetResourceCache()
  rpc.mockReset()
})

function Probe() {
  const { index, limits, error } = useCatalog()
  return (
    <p>
      {index.length} titres · {limits.maxTracks} max · {error?.code ?? 'ok'}
    </p>
  )
}

describe('useCatalog', () => {
  it('charge le catalogue une fois et l’indexe pour la recherche', async () => {
    rpc.mockResolvedValue({ ok: true, value: makeCatalog() })
    render(
      <>
        <Probe />
        <Probe />
      </>,
    )
    await waitFor(() => expect(screen.getAllByText('25 titres · 20 max · ok')).toHaveLength(2))
    expect(rpc).toHaveBeenCalledTimes(1)
    expect(rpc.mock.calls[0]?.[0]).toBe('get_catalog')
  })

  it('expose l’erreur de chargement sans planter', async () => {
    rpc.mockResolvedValue({ ok: false, error: { code: 'network', status: null } })
    render(<Probe />)
    await waitFor(() => expect(screen.getByText('0 titres · 20 max · network')).toBeTruthy())
  })
})

describe('limitsOf et activeIdsOf', () => {
  it('reprend les limites réglées par l’admin, sinon les valeurs par défaut', () => {
    const c = makeCatalog()
    expect(limitsOf({ ...c.campaign, maxTracks: 15, maxGuests: 3 })).toEqual({
      maxTracks: 15,
      maxGuests: 3,
    })
    expect(limitsOf(undefined)).toEqual({ maxTracks: MAX_TRACKS, maxGuests: MAX_GUESTS })
  })

  it('liste les identifiants actifs', () => {
    const ids = activeIdsOf(makeCatalog())
    expect(ids.trackIds.size).toBe(25)
    expect(ids.guestIds.has(8)).toBe(true)
  })
})
