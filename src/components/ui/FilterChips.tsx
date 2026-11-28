// Pastilles de filtre (DA §5) : état porté par aria-pressed ET par une coche visible.
// Le défilement horizontal reste local à la rangée (aucun défilement de la page, DA §9),
// avec un fondu en bord droit comme repère.
import { Icon } from './Icon.tsx'

export type Chip = { id: string; label: string; pressed: boolean }

type Props = {
  /** Nom du groupe, lu par les lecteurs d'écran (« Filtrer par projet »). */
  label: string
  chips: Chip[]
  onToggle: (id: string) => void
}

export function FilterChips({ label, chips, onToggle }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-2 overflow-x-auto overscroll-x-contain pr-6 [scrollbar-width:none] mask-r-from-[calc(100%-1.5rem)]"
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          aria-pressed={chip.pressed}
          onClick={() => onToggle(chip.id)}
          className="label-caps inline-flex min-h-12 shrink-0 items-center gap-1.5 rounded-pill border border-concrete px-4 text-paper normal-case transition-colors duration-(--duration-quick) hover:border-muted aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-ink"
        >
          {chip.pressed && <Icon name="check" size={16} />}
          {chip.label}
        </button>
      ))}
    </div>
  )
}
