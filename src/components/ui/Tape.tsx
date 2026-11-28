// Bande de gaffer (DA §1.1, §4) : SVG décoratif d'environ 0,3 Ko, en 3 variantes de découpe.
// Elle « fixe » les éléments validés : la feuille, le code, les guests choisis.
import { cx } from '../../lib/cx.ts'

const SHAPES = [
  'M3 2 L6 0 L9 3 L12 0 L15 2 L117 1 L120 4 L118 7 L120 10 L118 14 L120 17 L117 20 L15 19 L12 22 L9 19 L6 22 L3 20 L0 17 L2 14 L0 11 L2 7 L0 4 Z',
  'M2 1 L118 0 L120 3 L117 6 L120 9 L117 13 L120 16 L118 20 L2 21 L0 18 L3 15 L0 11 L3 8 L0 4 Z',
  'M4 0 L116 2 L119 5 L117 8 L120 12 L117 15 L119 19 L116 21 L4 20 L1 17 L3 13 L0 10 L3 6 L1 3 Z',
] as const

type Props = {
  variant?: 0 | 1 | 2
  className?: string
}

export function Tape({ variant = 0, className }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 22"
      preserveAspectRatio="none"
      className={cx('pointer-events-none h-5 w-24 text-tape opacity-90', className)}
    >
      <path d={SHAPES[variant]} fill="currentColor" />
    </svg>
  )
}
