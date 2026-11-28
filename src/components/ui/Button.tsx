// Bouton du design system (DA §5) : primary (rouge, texte encre), secondary (contour papier),
// ghost (texte seul en capitales), link (texte en bas de casse). Hauteur de 52 px, cible tactile
// d'au moins 48 px.
// Désactivé : aria-disabled (le bouton reste atteignable au clavier) et raison écrite à côté.
import { useId, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control ' +
  'transition-transform duration-(--duration-instant) ease-out select-none ' +
  'motion-safe:active:scale-[.98] aria-disabled:cursor-not-allowed aria-disabled:opacity-40'

// Les marges internes sont propres à chaque variante : le lien texte s'aligne sur le texte voisin.
const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'label-caps min-h-13 px-6 bg-signal text-ink',
  secondary: 'label-caps min-h-13 px-6 border border-paper text-paper hover:bg-stage',
  ghost:
    'label-caps min-h-12 text-paper underline underline-offset-4 decoration-muted hover:decoration-paper',
  // Lien texte en bas de casse (« Voir les résultats » sous le bouton principal, maquette 01).
  link: 'min-h-12 text-[0.9375rem] font-semibold text-paper underline-offset-4 hover:underline',
}

export function buttonClasses(variant: ButtonVariant = 'primary', fullWidth = false): string {
  return cx(BASE, VARIANTS[variant], fullWidth && 'w-full')
}

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  variant?: ButtonVariant
  fullWidth?: boolean
  /** Envoi en cours : indicateur, libellé conservé ou remplacé, double appui ignoré. */
  loading?: boolean
  loadingLabel?: string
  disabled?: boolean
  /** Raison affichée sous le bouton quand il est désactivé. */
  disabledReason?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  loadingLabel = t.button.sending,
  disabled = false,
  disabledReason,
  className,
  onClick,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const reasonId = useId()
  const inactive = disabled || loading
  const showReason = disabled && !loading && disabledReason

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (inactive) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  const button = (
    <button
      {...rest}
      type={type}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      aria-describedby={showReason ? reasonId : rest['aria-describedby']}
      onClick={handleClick}
      className={cx(buttonClasses(variant, fullWidth), className)}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  )

  if (!showReason) return button
  return (
    <div className={cx('flex flex-col gap-2', fullWidth && 'w-full')}>
      {button}
      <p id={reasonId} className="text-caption text-muted">
        {disabledReason}
      </p>
    </div>
  )
}

type ButtonLinkProps = LinkProps & { variant?: ButtonVariant; fullWidth?: boolean }

/** Lien de navigation qui a l'apparence d'un bouton (ex. « Composer ma set-list »). */
export function ButtonLink({
  variant = 'primary',
  fullWidth = false,
  className,
  ...rest
}: ButtonLinkProps) {
  return <Link {...rest} className={cx(buttonClasses(variant, fullWidth), className)} />
}
