import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { IndependenceNote } from '../../components/layout/IndependenceNote.tsx'
import { COMPOSE_STEPS, StepHeader } from '../../components/layout/StepHeader.tsx'
import { SkipLink } from '../../components/ui/SkipLink.tsx'
import { useRouteFocus } from '../useRouteFocus.ts'
import { PageFallback } from './PageFallback.tsx'

/** Étape (1, 2 ou 3) déduite de l'adresse ; l'étape 1 par défaut. */
function stepOf(pathname: string): 1 | 2 | 3 {
  const index = COMPOSE_STEPS.findIndex((s) => pathname.startsWith(s.path))
  return index === 1 ? 2 : index === 2 ? 3 : 1
}

/**
 * Parcours de composition : la navigation globale est masquée, seule l'étape est affichée,
 * pour limiter les sorties involontaires (DA §6). La mention reste présente (RG-JUR-01).
 */
export function ComposeLayout() {
  useRouteFocus()
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <StepHeader step={stepOf(pathname)} />
      <main id="contenu" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <IndependenceNote className="gutter-x py-6" />
    </div>
  )
}
