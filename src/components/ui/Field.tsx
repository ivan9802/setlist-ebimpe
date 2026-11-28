// Champ de saisie (DA §5, §10) : libellé visible, aide et erreur reliées par aria-describedby,
// aria-invalid, compteur de caractères. L'erreur s'affiche en ambre avec une icône.
import { useId, type InputHTMLAttributes, type Ref } from 'react'
import { cx } from '../../lib/cx.ts'
import { Icon } from './Icon.tsx'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  ref?: Ref<HTMLInputElement>
  label: string
  help?: string
  error?: string
  /** Affiche « n / max » sous le champ (le maximum vient de maxLength). */
  showCount?: boolean
}

export function Field({
  ref,
  label,
  help,
  error,
  showCount = false,
  className,
  value,
  maxLength,
  ...rest
}: Props) {
  const id = useId()
  const helpId = `${id}-aide`
  const errorId = `${id}-erreur`
  const describedBy = [help && helpId, error && errorId].filter(Boolean).join(' ') || undefined
  const length = typeof value === 'string' ? value.length : 0

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        id={id}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(
          'min-h-12 w-full rounded-control border bg-concrete px-4 text-body text-paper placeholder:text-muted',
          error ? 'border-warning' : 'border-concrete focus:border-paper',
        )}
      />
      <div className="flex items-start justify-between gap-4 text-caption">
        <div className="flex flex-col gap-1">
          {help && (
            <p id={helpId} className="text-muted">
              {help}
            </p>
          )}
          {error && (
            <p id={errorId} className="flex items-start gap-1.5 text-warning">
              <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}
        </div>
        {showCount && maxLength !== undefined && (
          <p aria-hidden="true" className="shrink-0 text-muted tabular-nums">
            {length} / {maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
