import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, waitFor } from '@testing-library/react'
import type { Result } from '../../src/lib/api.ts'
import { resetResourceCache, useResource, type Fetcher } from '../../src/lib/useResource.ts'

afterEach(() => resetResourceCache())

function Probe({
  id,
  fetcher,
  staleTime,
}: {
  id: string
  fetcher: Fetcher<number>
  staleTime?: number
}) {
  const r = useResource(id, fetcher, staleTime === undefined ? {} : { staleTime })
  return (
    <div>
      <p data-testid={`${id}-data`}>{r.data ?? 'vide'}</p>
      <p data-testid={`${id}-error`}>{r.error?.code ?? 'aucune'}</p>
      <p data-testid={`${id}-fetching`}>{String(r.fetching)}</p>
      <button onClick={r.reload}>recharger {id}</button>
    </div>
  )
}

const ok = (v: number): Promise<Result<number>> => Promise.resolve({ ok: true, value: v })
const ko = (): Promise<Result<number>> =>
  Promise.resolve({ ok: false, error: { code: 'network', status: null } })

describe('useResource', () => {
  it('charge, puis sert le cache tant que la donnée est fraîche', async () => {
    const fetcher = vi.fn(() => ok(42))
    const { unmount } = render(<Probe id="a" fetcher={fetcher} staleTime={60_000} />)
    await waitFor(() => expect(screen.getByTestId('a-data').textContent).toBe('42'))
    unmount()
    render(<Probe id="a" fetcher={fetcher} staleTime={60_000} />)
    expect(screen.getByTestId('a-data').textContent).toBe('42')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('partage une seule requête entre plusieurs lecteurs de la même clé', async () => {
    const fetcher = vi.fn(() => ok(7))
    render(
      <>
        <Probe id="b" fetcher={fetcher} />
        <Probe id="b" fetcher={fetcher} />
      </>,
    )
    await waitFor(() => expect(screen.getAllByTestId('b-data')[0]?.textContent).toBe('7'))
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('garde la dernière donnée connue si le rafraîchissement échoue', async () => {
    const fetcher = vi
      .fn<Fetcher<number>>()
      .mockImplementationOnce(() => ok(10))
      .mockImplementation(ko)
    render(<Probe id="c" fetcher={fetcher} />)
    await waitFor(() => expect(screen.getByTestId('c-data').textContent).toBe('10'))
    await act(async () => screen.getByRole('button', { name: 'recharger c' }).click())
    await waitFor(() => expect(screen.getByTestId('c-error').textContent).toBe('network'))
    expect(screen.getByTestId('c-data').textContent).toBe('10')
    expect(screen.getByTestId('c-fetching').textContent).toBe('false')
  })

  it('annule la requête quand plus personne n’écoute', async () => {
    let signal: AbortSignal | undefined
    const fetcher: Fetcher<number> = (s) => {
      signal = s
      return new Promise(() => {})
    }
    const { unmount } = render(<Probe id="d" fetcher={fetcher} />)
    await waitFor(() => expect(signal).toBeDefined())
    unmount()
    expect(signal?.aborted).toBe(true)
  })
})
