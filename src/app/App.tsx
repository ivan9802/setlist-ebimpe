import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import { ToastProvider } from '../components/ui/Toast.tsx'
import { ErrorBoundary } from './errors.tsx'
import { AppRoutes } from './router.tsx'

/** Contextes communs à toute l'application. Le CampaignProvider arrive avec le catalogue (F2.1). */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ToastProvider>{children}</ToastProvider>
    </ErrorBoundary>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  )
}
