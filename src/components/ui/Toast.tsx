// Toast (DA §5) : confirmation courte (« Lien copié »), role="status", 3 s, jamais pour une
// erreur bloquante. La zone d'annonce existe dès le départ pour être lue de façon fiable.
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export const TOAST_DURATION_MS = 3000

type ToastApi = { show: (message: string) => void }

const ToastContext = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)

  const show = useCallback((message: string) => {
    setToast((current) => ({ id: (current?.id ?? 0) + 1, message }))
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS)
    return () => clearTimeout(timer)
  }, [toast])

  const api = useMemo(() => ({ show }), [show])

  return (
    <ToastContext value={api}>
      {children}
      <div
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4"
      >
        {toast && (
          <p
            key={toast.id}
            className="rounded-control bg-paper px-4 py-3 text-ink shadow-paper motion-safe:animate-bump"
          >
            {toast.message}
          </p>
        )}
      </div>
    </ToastContext>
  )
}

export function useToast(): ToastApi {
  const api = use(ToastContext)
  if (!api) throw new Error('useToast doit être utilisé sous <ToastProvider>.')
  return api
}
