import { describe, expect, it } from 'vitest'
import { roundComposeDuration } from '../../shared/duration.ts'

describe('roundComposeDuration (D-2)', () => {
  it('arrondit au multiple de 5 s le plus proche', () => {
    expect(roundComposeDuration(62)).toBe(60)
    expect(roundComposeDuration(63)).toBe(65)
  })

  it('plafonne à 3 600 s', () => {
    expect(roundComposeDuration(10_000)).toBe(3600)
  })

  it('rejette les valeurs invalides', () => {
    expect(roundComposeDuration(-1)).toBeNull()
    expect(roundComposeDuration(Number.NaN)).toBeNull()
    expect(roundComposeDuration(Number.POSITIVE_INFINITY)).toBeNull()
  })
})
