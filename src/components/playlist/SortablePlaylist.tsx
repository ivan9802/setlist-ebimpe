// Feuille interactive (DA §5 « SortableItem », maquettes 03 et 10 ; UC-04, CA-05) : glisser-déposer
// tactile, souris et clavier (dnd-kit), plus les boutons Monter, Descendre et Retirer. Les
// déplacements sont annoncés en français, et le focus suit le titre déplacé ou retiré.
// Pas de DragOverlay : dans le tiroir (<dialog> modal), un calque hors du dialogue serait masqué.
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cx } from '../../lib/cx.ts'
import { t } from '../../lib/messages.fr.ts'
import { Icon } from '../ui/Icon.tsx'

export type PlaylistItem = { id: number; title: string; featuredArtists: string | null }
type Tone = 'stage' | 'paper'
type Action = 'up' | 'down' | 'remove'

type Props = {
  items: PlaylistItem[]
  onMove: (from: number, to: number) => void
  onRemove: (id: number) => void
  /** « stage » dans le tiroir sombre, « paper » sur la feuille de l'ordinateur. */
  tone: Tone
  /** Nom de la liste pour les lecteurs d'écran. */
  label: string
}

const pad = (n: number) => String(n).padStart(2, '0')

const TONES: Record<Tone, { row: string; number: string; button: string; dragging: string }> = {
  stage: {
    row: 'border-concrete',
    number: 'text-signal',
    button: 'border-concrete text-paper hover:border-muted',
    dragging: 'border border-signal bg-concrete',
  },
  paper: {
    row: 'border-ink/15',
    number: 'text-signal-ink',
    button: 'border-ink/20 text-ink hover:border-ink/50',
    dragging: 'border border-signal-ink bg-paper',
  },
}

function Row({
  item,
  index,
  total,
  tone,
  onAction,
}: {
  item: PlaylistItem
  index: number
  total: number
  tone: Tone
  onAction: (action: Action, index: number, item: PlaylistItem) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    activeIndex,
  } = useSortable({ id: item.id })
  const style: CSSProperties = { transform: CSS.Translate.toString(transform), transition }
  const colors = TONES[tone]
  const lineTop = isOver && !isDragging && activeIndex > index
  const lineBottom = isOver && !isDragging && activeIndex < index
  // Carrés de 36 px, comme la maquette 03 (cible au-dessus du minimum WCAG 2.2 de 24 px).
  const square =
    'grid size-9 shrink-0 place-items-center rounded-control border disabled:opacity-30'

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-row-id={item.id}
      className={cx(
        'relative flex min-h-[3.75rem] items-center gap-1 border-b py-2',
        colors.row,
        isDragging &&
          cx('z-10 rounded-control px-2 shadow-paper motion-safe:rotate-1', colors.dragging),
      )}
    >
      {(lineTop || lineBottom) && (
        <span
          aria-hidden="true"
          className={cx(
            'absolute inset-x-0 h-0.5',
            tone === 'paper' ? 'bg-signal-ink' : 'bg-signal',
            lineTop ? '-top-1' : '-bottom-1',
          )}
        />
      )}
      <span
        aria-hidden="true"
        className={cx(
          'mr-1 w-8 shrink-0 font-display text-[1.5rem] leading-none font-black',
          colors.number,
        )}
      >
        {pad(index + 1)}
      </span>
      <span className="min-w-0 flex-1 text-[0.9375rem] leading-tight">
        <span className="font-semibold uppercase">{item.title}</span>
        {item.featuredArtists && (
          <span>
            {' · '}
            {t.playlist.feat(item.featuredArtists)}
          </span>
        )}
      </span>
      <button
        ref={setActivatorNodeRef}
        type="button"
        {...attributes}
        {...listeners}
        aria-label={t.playlist.dragHandle(item.title)}
        className={cx(
          'grid h-9 w-7 shrink-0 cursor-grab touch-none place-items-center active:cursor-grabbing',
          tone === 'paper' ? 'text-ink/60' : 'text-muted',
        )}
      >
        <Icon name="grip" size={18} />
      </button>
      <button
        type="button"
        data-action="up"
        disabled={index === 0}
        onClick={() => onAction('up', index, item)}
        aria-label={t.playlist.moveUp(item.title)}
        className={cx(square, colors.button)}
      >
        <Icon name="arrowUp" size={18} />
      </button>
      <button
        type="button"
        data-action="down"
        disabled={index === total - 1}
        onClick={() => onAction('down', index, item)}
        aria-label={t.playlist.moveDown(item.title)}
        className={cx(square, colors.button)}
      >
        <Icon name="arrowDown" size={18} />
      </button>
      <button
        type="button"
        data-action="remove"
        onClick={() => onAction('remove', index, item)}
        aria-label={t.playlist.remove(item.title)}
        className={cx(square, colors.button)}
      >
        <Icon name="close" size={16} />
      </button>
    </li>
  )
}

export function SortablePlaylist({ items, onMove, onRemove, tone, label }: Props) {
  const list = useRef<HTMLOListElement>(null)
  const [announcement, setAnnouncement] = useState('')
  // Après un déplacement ou un retrait par bouton, le focus suit le titre concerné.
  const pendingFocus = useRef<{ id: number | null; action: Action } | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const ids = useMemo(() => items.map((i) => i.id), [items])
  const total = items.length
  const titleOf = (id: UniqueIdentifier) => items.find((i) => i.id === id)?.title ?? ''
  const positionOf = (id: UniqueIdentifier | undefined) =>
    id === undefined ? 0 : ids.indexOf(Number(id)) + 1

  const announcements: Announcements = {
    onDragStart: ({ active }) =>
      t.playlist.dnd.start(titleOf(active.id), positionOf(active.id), total),
    onDragOver: ({ active, over }) =>
      over ? t.playlist.dnd.over(titleOf(active.id), positionOf(over.id), total) : undefined,
    onDragEnd: ({ active, over }) =>
      t.playlist.dnd.end(titleOf(active.id), positionOf(over?.id ?? active.id), total),
    onDragCancel: ({ active }) => t.playlist.dnd.cancel(titleOf(active.id), positionOf(active.id)),
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    onMove(ids.indexOf(Number(active.id)), ids.indexOf(Number(over.id)))
  }

  const onAction = (action: Action, index: number, item: PlaylistItem) => {
    if (action === 'remove') {
      const next = items[index + 1] ?? items[index - 1]
      pendingFocus.current = { id: next?.id ?? null, action: 'remove' }
      onRemove(item.id)
      setAnnouncement(t.playlist.removed(item.title))
      return
    }
    const to = action === 'up' ? index - 1 : index + 1
    pendingFocus.current = { id: item.id, action }
    onMove(index, to)
    setAnnouncement(t.playlist.moved(item.title, to + 1, total))
  }

  useEffect(() => {
    const target = pendingFocus.current
    if (!target) return
    pendingFocus.current = null
    const root = list.current
    if (!root) return
    if (target.id === null) {
      root.focus()
      return
    }
    const row = root.querySelector<HTMLElement>(`[data-row-id="${target.id}"]`)
    const wanted = row?.querySelector<HTMLButtonElement>(`[data-action="${target.action}"]`)
    // Arrivé en haut ou en bas, le bouton se désactive : on passe à l'autre flèche.
    const fallback = row?.querySelector<HTMLButtonElement>(
      `[data-action="${target.action === 'up' ? 'down' : 'up'}"]`,
    )
    ;(wanted && !wanted.disabled ? wanted : fallback)?.focus()
  }, [items])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      accessibility={{
        announcements,
        screenReaderInstructions: { draggable: t.playlist.dnd.instructions },
      }}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ol ref={list} aria-label={label} tabIndex={-1} className="outline-none">
          {items.map((item, index) => (
            <Row
              key={item.id}
              item={item}
              index={index}
              total={total}
              tone={tone}
              onAction={onAction}
            />
          ))}
        </ol>
      </SortableContext>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </DndContext>
  )
}
