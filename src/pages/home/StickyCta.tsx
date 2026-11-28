// Barre d'action collante (maquette 01b) : elle apparaît quand l'ouverture sort de l'écran et
// disparaît à l'arrivée du pied de page (IntersectionObserver). Zone sûre basse respectée.
// Masquée, elle est inerte : rien n'y reçoit le focus.
import { useEffect, useState, type RefObject } from 'react'
import { ButtonLink } from '../../components/ui/Button.tsx'
import { cx } from '../../lib/cx.ts'
import { formatNumber } from '../../lib/format.ts'
import { t } from '../../lib/messages.fr.ts'

type Props = {
  /** Section d'ouverture : la barre se montre quand elle n'est plus visible. */
  watch: RefObject<HTMLElement | null>
  participations: number | null
}

export function StickyCta({ watch, participations }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const opening = watch.current
    if (!opening || typeof IntersectionObserver === 'undefined') return
    const footer = document.querySelector('footer')
    let openingVisible = true
    let footerVisible = false
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === opening) openingVisible = entry.isIntersecting
        else footerVisible = entry.isIntersecting
      }
      setVisible(!openingVisible && !footerVisible)
    })
    observer.observe(opening)
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [watch])

  return (
    <div
      inert={!visible}
      data-visible={visible}
      className={cx(
        'fixed inset-x-0 bottom-0 z-30 border-t border-concrete bg-stage',
        'transition-[translate,visibility] duration-(--duration-standard) ease-snap',
        visible ? 'translate-y-0' : 'invisible translate-y-full',
      )}
    >
      <div className="gutter-x flex items-center justify-between gap-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p aria-hidden="true" className="leading-none">
          <span className="block font-display text-[1.75rem] font-extrabold text-signal">
            {participations === null ? '…' : formatNumber(participations)}
          </span>
          <span className="text-caption text-muted">{t.home.stickyLabel}</span>
        </p>
        <ButtonLink to="/composer/morceaux" className="min-w-[10.75rem]">
          {t.home.stickyCta}
        </ButtonLink>
      </div>
    </div>
  )
}
