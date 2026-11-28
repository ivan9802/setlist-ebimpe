// Recherche de titres (DA §5) : `type="search"`, bouton Effacer qui rend le focus au champ,
// nombre de résultats annoncé aux lecteurs d'écran.
import { useId, useRef } from 'react'
import { t } from '../../lib/messages.fr.ts'
import { Icon } from './Icon.tsx'

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Nombre de résultats à annoncer ; rien n'est annoncé si absent. */
  resultCount?: number
}

export function SearchField({ label, value, onChange, placeholder, resultCount }: Props) {
  const id = useId()
  const input = useRef<HTMLInputElement>(null)

  return (
    <div role="search">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
        />
        <input
          ref={input}
          id={id}
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-12 w-full rounded-control border border-concrete bg-concrete pr-12 pl-10 text-body text-paper placeholder:text-muted focus:border-paper [&::-webkit-search-cancel-button]:appearance-none"
        />
        {value && (
          <button
            type="button"
            aria-label={t.search.clear}
            onClick={() => {
              onChange('')
              input.current?.focus()
            }}
            className="absolute top-0 right-0 grid size-12 place-items-center text-muted hover:text-paper"
          >
            <Icon name="close" />
          </button>
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        {resultCount === undefined ? '' : t.search.results(resultCount)}
      </p>
    </div>
  )
}
