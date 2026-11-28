// Tiroir « Ma set-list » sur mobile (DA §5) : une barre repliée en bas d'écran, puis un panneau
// à mi-hauteur ou plein écran. Le panneau est un <dialog> modal natif : le reste de la page
// devient inerte, Échap le ferme, le focus revient sur la poignée. Zones sûres respectées.
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'
import { Icon } from './Icon.tsx'

type Props = {
  /** Titre du panneau ouvert (« Ma set-list »). */
  title: string
  /** Contenu de la barre repliée, à côté de la poignée (compteur, « Continuer »). */
  summary: ReactNode
  /** Contenu du panneau ouvert (la feuille interactive). */
  children: ReactNode
  /** Pied du panneau ouvert (souvent le même « Continuer »). */
  footer?: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BottomSheet({ title, summary, children, footer, open, onOpenChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const handle = useRef<HTMLButtonElement>(null)
  const [full, setFull] = useState(false)
  const titleId = useId()
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
      setFull(false)
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

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-concrete bg-stage pb-[env(safe-area-inset-bottom)]">
        <button
          ref={handle}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onOpenChange(true)}
          className="flex h-6 w-full items-center justify-center"
        >
          <span aria-hidden="true" className="h-1 w-10 rounded-pill bg-muted" />
          <span className="sr-only">{t.sheet.open}</span>
        </button>
        <div className="gutter-x flex items-center justify-between gap-4 pb-3">{summary}</div>
      </div>

      <dialog
        ref={dialog}
        id={panelId}
        aria-labelledby={titleId}
        className={cx(
          'mt-auto mb-0 w-full max-w-none overflow-hidden rounded-t-[12px] border-t border-concrete bg-stage p-0 text-paper backdrop:bg-night/75',
          'flex-col open:flex motion-safe:open:animate-sheet-in',
          full ? 'h-[92dvh] max-h-[92dvh]' : 'max-h-[60dvh]',
          '[@media(orientation:landscape)_and_(max-height:32rem)]:max-h-[70dvh]',
        )}
      >
        <div className="gutter-x flex items-center justify-between gap-2 border-b border-concrete py-2">
          <h2 id={titleId} className="font-display text-display-m font-extrabold uppercase">
            {title}
          </h2>
          <div className="flex">
            <button
              type="button"
              onClick={() => setFull((f) => !f)}
              aria-label={full ? t.sheet.collapse : t.sheet.expand}
              className="grid size-12 place-items-center"
            >
              <Icon name={full ? 'chevronDown' : 'chevronUp'} />
            </button>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={t.sheet.close}
              className="grid size-12 place-items-center"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
        <div className="gutter-x min-h-0 flex-1 overflow-y-auto overscroll-contain py-4">
          {children}
        </div>
        {footer && (
          <div className="gutter-x border-t border-concrete py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {footer}
          </div>
        )}
      </dialog>
    </>
  )
}
