import { describe, expect, it } from 'vitest'
import { ERROR_CODES, HTTP_STATUS, SQL_ERROR_MAP, isErrorCode } from '../../shared/errors.ts'
import { PUBLIC_CODE_PATTERN } from '../../shared/api-types.ts'
import { MAX_GUESTS, MAX_TRACKS } from '../../shared/constants.ts'
import { makeCatalog } from '../fixtures/catalog.ts'
import { FIXTURE_CODE, publicPlaylist } from '../fixtures/stats.ts'

describe('catalogue d’erreurs (ADR-008)', () => {
  it('donne un statut HTTP à chaque code serveur', () => {
    for (const code of ERROR_CODES) {
      if (code === 'network') continue
      expect(HTTP_STATUS[code]).toBeGreaterThanOrEqual(400)
    }
  })

  it('traduit chaque code SQL en code connu', () => {
    for (const code of Object.values(SQL_ERROR_MAP)) expect(isErrorCode(code)).toBe(true)
  })

  it('rejette une valeur inconnue', () => {
    expect(isErrorCode('HUTE_CLOSED')).toBe(false)
    expect(isErrorCode(42)).toBe(false)
  })
})

describe('code public (RG-VAL-08)', () => {
  it('accepte le Crockford base32 sur 10 caractères', () => {
    expect(PUBLIC_CODE_PATTERN.test(FIXTURE_CODE)).toBe(true)
  })

  it('refuse les caractères ambigus et les mauvaises longueurs', () => {
    expect(PUBLIC_CODE_PATTERN.test('K7QM2XH9PI')).toBe(false)
    expect(PUBLIC_CODE_PATTERN.test('K7QM2XH9PO')).toBe(false)
    expect(PUBLIC_CODE_PATTERN.test('K7QM2XH9P')).toBe(false)
    expect(PUBLIC_CODE_PATTERN.test('k7qm2xh9pa')).toBe(false)
  })
})

describe('données fictives', () => {
  it('respectent les limites de la campagne', () => {
    const c = makeCatalog()
    expect(c.campaign.maxTracks).toBe(MAX_TRACKS)
    expect(c.campaign.maxGuests).toBe(MAX_GUESTS)
    expect(c.tracks.some((t) => t.title === 'Éclaté')).toBe(true)
    expect(c.tracks.some((t) => t.projectId === null)).toBe(true)
    expect(new Set(c.tracks.map((t) => t.id)).size).toBe(c.tracks.length)
  })

  it('numérotent la set-list publique sans trou', () => {
    const p = publicPlaylist()
    expect(p.tracks.map((t) => t.position)).toEqual(p.tracks.map((_, i) => i + 1))
  })
})
