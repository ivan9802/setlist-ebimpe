// Table des routes (architecture §4.3, DA §6) en mode déclaratif de React Router : routes
// déclarées en JSX, pages chargées à la demande avec React.lazy. Ce mode suffit (aucun loader :
// les données passent par des hooks, §4.4) et coûte 18 Ko compressés de moins que le mode
// « données » dans le chunk d'entrée (mesuré : 83,7 Ko contre 101,6 Ko). L'accueil et la 404 sont
// dans le chunk initial.
// Les routes de la v1.1 (/hors-ligne, /admin/*) arrivent après l'ouverture (D-7) : d'ici là,
// elles tombent sur la 404.
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { t } from '../lib/messages.fr.ts'
import { HomePage } from '../pages/HomePage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { ComposeLayout } from './layouts/ComposeLayout.tsx'
import { PublicLayout } from './layouts/PublicLayout.tsx'

/** Écran provisoire chargé à la demande, remplacé phase après phase par la page réelle. */
const UpcomingPage = lazy(() =>
  import('../pages/UpcomingPage.tsx').then((m) => ({ default: m.UpcomingPage })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="merci/:code" element={<UpcomingPage title={t.pages.confirmation} />} />
        <Route path="t/:code" element={<UpcomingPage title={t.pages.publicPlaylist} />} />
        <Route path="resultats" element={<UpcomingPage title={t.pages.results} />} />
        <Route path="mentions-legales" element={<UpcomingPage title={t.pages.legal} />} />
        <Route path="confidentialite" element={<UpcomingPage title={t.pages.privacy} />} />
        <Route path="conditions" element={<UpcomingPage title={t.pages.terms} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="composer" element={<ComposeLayout />}>
        <Route index element={<Navigate to="morceaux" replace />} />
        <Route path="morceaux" element={<UpcomingPage title={t.pages.tracks} />} />
        <Route path="guests" element={<UpcomingPage title={t.pages.guests} />} />
        <Route path="recap" element={<UpcomingPage title={t.pages.recap} />} />
      </Route>
    </Routes>
  )
}
