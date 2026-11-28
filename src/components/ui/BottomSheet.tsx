// Tiroir « Ma set-list » sur mobile (DA §5, maquettes 02 et 03) : une barre repliée en bas d'écran
// (poignée, compteur, « Continuer »), puis un panneau presque plein écran pour réordonner.
// Le panneau est un <dialog> modal natif : le reste de la page devient inerte, Échap et
// « Réduire » le ferment, le focus revient sur la poignée. Zones sûres respectées (DA §9).
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

type Props = {
  /** Titre du panneau ouvert (« Ma set-list »). */
  title: string
  /** À droite du titre : le compteur. */
  aside?: ReactNode
  /** Aide sous le titre (« Glisse une ligne… »). */
  description?: string
  /** Contenu de la barre repliée, sous la poignée (compteur, « Continuer »). */
  summary: ReactNode
  /** Contenu du panneau ouvert (la liste réordonnable). */
  children: ReactNode
  /** Pied du panneau ouvert (« Continuer »). */
  footer?: ReactNode
  /** Libellé du lien de fermeture (« Réduire la set-list »). */
  collapseLabel: string
  /** Nom de la poignée pour les lecteurs d'écran (« Ouvrir ma set-list »). */
  openLabel: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BottomSheet({
  title,
  aside,
  description,
  summary,
  children,
  footer,
  collapseLabel,
  openLabel,
  open,
  onOpenChange,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const handle = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const panelId = useId()

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onClose = () => {
      onOpenChange(false)
      handle.current?.focus()
    }
    // Un appui sur le fond assombri (hors du panneau) referme le tiroir ; Échap est natif.
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === el) el.close()
    }
    el.addEventListener('close', onClose)
    el.addEventListener('click', onBackdrop)
    return () => {
      el.removeEventListener('close', onClose)
      el.removeEventListener('click', onBackdrop)
    }
  }, [onOpenChange])

  const grabber = <span aria-hidden="true" className="h-1 w-9 rounded-pill bg-muted" />

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 rounded-t-[12px] bg-stage pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          ref={handle}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onOpenChange(true)}
          className="flex h-6 w-full items-center justify-center"
        >
          {grabber}
          <span className="sr-only">{openLabel}</span>
        </button>
        <div className="gutter-x flex items-end justify-between gap-4">{summary}</div>
      </div>

      <dialog
        ref={dialog}
        id={panelId}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cx(
          'mt-auto mb-0 h-[88dvh] max-h-[88dvh] w-full max-w-none overflow-hidden rounded-t-[12px] bg-stage p-0 text-paper backdrop:bg-night/75',
          'flex-col open:flex motion-safe:open:animate-sheet-in',
          '[@media(orientation:landscape)_and_(max-height:32rem)]:h-[70dvh]',
        )}
      >
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          tabIndex={-1}
          aria-hidden="true"
          className="flex h-6 w-full shrink-0 items-center justify-center"
        >
          {grabber}
        </button>
        <div className="gutter-x shrink-0 pb-3">
          <div className="flex items-center justify-between gap-4">
            <h2
              id={titleId}
              className="font-display text-[1.75rem] leading-none font-black uppercase"
            >
              {title}
            </h2>
            {aside}
          </div>
          {description && (
            <p id={descriptionId} className="mt-2 text-[0.875rem] text-muted">
              {description}
            </p>
          )}
        </div>
        <div className="gutter-x min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        <div className="gutter-x flex shrink-0 flex-col items-center gap-1 pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {footer}
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="min-h-12 text-[0.9375rem] font-semibold text-muted underline underline-offset-4 hover:text-paper"
          >
            {collapseLabel}
          </button>
        </div>
      </dialog>
    </>
  )
}
