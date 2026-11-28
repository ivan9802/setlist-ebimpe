// Compteur de l'accueil (DA §8.2) : il monte jusqu'à la valeur réelle UNE seule fois, en 600 ms,
// à sa première apparition. Sans animation (réduction demandée, appareil modeste), la valeur
// s'affiche directement. Seule la valeur finale est annoncée (zone aria-live à part).
import { useEffect, useRef, useState } from 'react'
import { prefersRichMotion } from '../../lib/motion.ts'

export const COUNT_UP_MS = 600

export function useCountUp(target: number | null): number | null {
  const [shown, setShown] = useState<number | null>(null)
  const done = useRef(false)

  useEffect(() => {
    if (target === null) return
    if (done.current || !prefersRichMotion()) {
      done.current = true
      const frame = requestAnimationFrame(() => setShown(target))
      return () => cancelAnimationFrame(frame)
    }
    done.current = true
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_UP_MS)
      const eased = 1 - (1 - p) ** 3
      setShown(Math.round(target * eased))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return shown
}
