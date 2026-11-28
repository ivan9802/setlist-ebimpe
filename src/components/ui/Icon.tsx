// Icônes en SVG inline (aucune police d'icônes). Toujours décoratives : le sens est porté par
// un texte visible ou un libellé accessible à côté (DA §10, « aucun état par la couleur seule »).

const PATHS = {
  check: 'M4.5 12.5l5 5L19.5 7',
  alert: 'M12 4l9 16H3L12 4zm0 6v4m0 3v.5',
  close: 'M6 6l12 12M18 6L6 18',
  arrowUp: 'M12 19V5m-6 6l6-6 6 6',
  arrowDown: 'M12 5v14m6-6l-6 6-6-6',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronUp: 'M5 15l7-7 7 7',
  chevronDown: 'M5 9l7 7 7-7',
  search: 'M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm4.6-1.9L20 20',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  share: 'M12 15V4m-4 4l4-4 4 4M5 13v6h14v-6',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-10v6m0-9v.5',
  plus: 'M12 5v14M5 12h14',
} as const

export type IconName = keyof typeof PATHS

type Props = { name: IconName; size?: number; className?: string }

export function Icon({ name, size = 20, className }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
