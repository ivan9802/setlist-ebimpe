import { describe, expect, it, vi } from 'vitest'
import { ERROR_CODES } from '../../shared/errors.ts'
import { messageFor, t } from '../../src/lib/messages.fr.ts'
import { createSafeStorage } from '../../src/lib/storage.ts'
import { formatDate, formatNumber, formatPercent, formatTime } from '../../src/lib/format.ts'
import { applyMotionLite, isModestDevice } from '../../src/lib/motion.ts'

describe('messages.fr (ADR-008)', () => {
  it('a un texte pour chaque code d’erreur', () => {
    for (const code of ERROR_CODES) expect(messageFor(code).length).toBeGreaterThan(10)
  })

  it('rassure sur la conservation des choix quand l’envoi échoue', () => {
    expect(messageFor('network', 'submit')).toBe(
      "Ta set-list n'est pas partie. Elle est gardée ici.",
    )
    expect(messageFor('unavailable', 'submit')).toBe(messageFor('network', 'submit'))
  })

  it('garde le message précis des refus métier, même à l’envoi', () => {
    expect(messageFor('nickname_blocked', 'submit')).toMatch(/pseudo/)
    expect(messageFor('closed', 'submit')).toMatch(/closes/)
  })

  it('emploie le vocabulaire de la DA et la mention exacte d’indépendance (RG-JUR-01)', () => {
    expect(t.independence).toBe(
      "Initiative indépendante de fans, sans lien officiel avec HIMRA ni avec l'organisation du concert.",
    )
    // Le nom du produit contient « tracklist » ; l'interface, elle, dit « set-list » (DA §1.3).
    const all = (JSON.stringify(t) + ERROR_CODES.map((c) => messageFor(c)).join(' ')).replace(
      /himra ultra tracklist/gi,
      '',
    )
    expect(all).not.toMatch(/tracklist/i)
    expect(all).not.toMatch(/programmation/i)
  })
})

describe('safeStorage', () => {
  it('se replie en mémoire quand le stockage est interdit (navigation privée)', () => {
    const s = createSafeStorage(() => {
      throw new DOMException('denied', 'SecurityError')
    })
    expect(s.persistent).toBe(false)
    expect(s.set('k', 'v')).toBe(false)
    expect(s.get('k')).toBe('v')
    s.remove('k')
    expect(s.get('k')).toBeNull()
  })

  it('garde la valeur en mémoire si le quota est dépassé', () => {
    const backend = window.localStorage
    const s = createSafeStorage(() => backend)
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('full', 'QuotaExceededError')
    })
    expect(s.set('draft', 'x')).toBe(false)
    expect(s.get('draft')).toBe('x')
    spy.mockRestore()
  })

  it('persiste quand le stockage fonctionne', () => {
    const s = createSafeStorage(() => window.localStorage)
    expect(s.persistent).toBe(true)
    expect(s.set('hute:test', '1')).toBe(true)
    expect(window.localStorage.getItem('hute:test')).toBe('1')
    s.remove('hute:test')
  })
})

describe('format (fr-CI, Abidjan)', () => {
  it('affiche la date en JJ/MM/AAAA et l’heure en HH:MM', () => {
    expect(formatDate('2026-12-10T19:05:00Z')).toBe('10/12/2026')
    expect(formatTime('2026-12-10T21:42:00Z')).toBe('21:42')
  })

  it('renvoie une chaîne vide pour une date invalide', () => {
    expect(formatDate('pas une date')).toBe('')
  })

  it('sépare les milliers par une espace insécable', () => {
    expect(formatNumber(4812).replace(/\s/g, ' ')).toBe('4 812')
    expect(formatPercent(41.66).replace(/\s/g, ' ')).toBe('41,7 %')
  })
})

describe('motion-lite (DA §8.2)', () => {
  it('reconnaît un appareil modeste', () => {
    expect(isModestDevice({ deviceMemory: 2, hardwareConcurrency: 8 })).toBe(true)
    expect(isModestDevice({ deviceMemory: 4, hardwareConcurrency: 4 })).toBe(true)
    expect(isModestDevice({ deviceMemory: 8, hardwareConcurrency: 8 })).toBe(false)
    expect(isModestDevice({})).toBe(false)
  })

  it('pose la classe sur la racine', () => {
    const root = document.createElement('html')
    expect(applyMotionLite(root, { deviceMemory: 1 })).toBe(true)
    expect(root.classList.contains('motion-lite')).toBe(true)
  })
})
