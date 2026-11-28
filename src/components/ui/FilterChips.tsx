// Pastilles de filtre (DA §5, maquettes 02 et 10) : sélection en papier, état porté aussi par
// aria-pressed. Pastille de 36 px, cible tactile étendue à 48 px. Le défilement horizontal reste
// local à la rangée (aucun défilement de la page, DA §9), avec un fondu en bord droit.
import { cx } from '../../lib/cx.ts'

export type Chip = { id: string; label: string; pressed: boolean }

type Props = {
  /** Nom du groupe, lu par les lecteurs d'écran (« Filtrer les titres »). */
  label: string
  chips: Chip[]
  onToggle: (id: string) => void
  className?: string
}

export function FilterChips({ label, chips, onToggle, className }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx(
        'flex gap-2 overflow-x-auto overscroll-x-contain py-1.5 pr-6 [scrollbar-width:none] mask-r-from-[calc(100%-1.5rem)] lg:flex-wrap lg:mask-none',
        className,
      )}
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          aria-pressed={chip.pressed}
          onClick={() => onToggle(chip.id)}
          className="relative inline-flex h-9 shrink-0 items-center rounded-pill border border-concrete px-4 text-[0.9375rem] font-medium whitespace-nowrap text-paper transition-colors duration-(--duration-quick) before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-[''] hover:border-muted aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-ink"
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
