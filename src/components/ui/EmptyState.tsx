import type { ReactNode } from 'react'

/** État vide (DA §5) : une phrase, une explication facultative, une action. */
export function EmptyState({
  title,
  text,
  action,
}: {
  title: string
  text?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-3 py-8">
      <p className="text-title font-semibold">{title}</p>
      {text && <p className="text-muted">{text}</p>}
      {action}
    </div>
  )
}
