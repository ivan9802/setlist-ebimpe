// Feuille de papier qui accueille la set-list interactive sur ordinateur (maquette 10) :
// bandes de gaffer, liste, puis le bloc « Mon casting ».
import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'
import { Tape } from '../ui/Tape.tsx'

export function SetlistSheetFrame({
  children,
  casting,
  className,
}: {
  children: ReactNode
  /** Noms des guests choisis, ou « Étape suivante ». */
  casting: string
  className?: string
}) {
  return (
    <div className={cx('paper relative -rotate-[0.6deg] px-5 pt-6 pb-5', className)}>
      <Tape variant={0} className="absolute -top-2 left-4 -rotate-3" />
      <Tape variant={1} className="absolute -top-2 right-3 rotate-2" />
      {children}
      <div className="mt-4 border-t border-ink/30 pt-2">
        <p className="text-[0.6875rem] font-semibold tracking-[0.08em] text-signal-ink uppercase">
          {t.playlist.castingLabel}
        </p>
        <p className="mt-1 font-display text-[1.25rem] leading-none font-extrabold">{casting}</p>
      </div>
    </div>
  )
}
