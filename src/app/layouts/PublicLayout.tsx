import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Footer } from '../../components/layout/Footer.tsx'
import { Header } from '../../components/layout/Header.tsx'
import { SkipLink } from '../../components/ui/SkipLink.tsx'
import { useRouteFocus } from '../useRouteFocus.ts'
import { PageFallback } from './PageFallback.tsx'

/** Pages publiques : en-tête minimal, contenu, pied de page avec la mention (DA §6). */
export function PublicLayout() {
  useRouteFocus()
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />
      <main id="contenu" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
