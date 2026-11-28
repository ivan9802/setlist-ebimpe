// Bannière (DA §5) : ambre pour les erreurs et alertes, toujours avec une icône et un texte
// actionnable. Une erreur bloquante prend role="alert" pour être annoncée immédiatement.
import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'
import { Icon, type IconName } from './Icon.tsx'

type Tone = 'warning' | 'success' | 'info'

const TONES: Record<Tone, { icon: IconName; color: string; border: string }> = {
  warning: { icon: 'alert', color: 'text-warning', border: 'border-warning' },
  success: { icon: 'check', color: 'text-success', border: 'border-success' },
  info: { icon: 'info', color: 'text-muted', border: 'border-concrete' },
}

type Props = {
  tone?: Tone
  /** Vrai pour une erreur qui empêche de continuer : annoncée tout de suite (role="alert"). */
  blocking?: boolean
  title?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export function Banner({
  tone = 'warning',
  blocking = false,
  title,
  children,
  action,
  className,
}: Props) {
  const { icon, color, border } = TONES[tone]
  return (
    <div
      role={blocking ? 'alert' : undefined}
      className={cx('flex gap-3 rounded-control border bg-stage p-4', border, className)}
    >
      <Icon name={icon} className={cx('mt-0.5 shrink-0', color)} />
      <div className="flex flex-col gap-3">
        <div>
          {title && <p className="font-semibold">{title}</p>}
          <div className="text-paper">{children}</div>
        </div>
        {action}
      </div>
    </div>
  )
}
