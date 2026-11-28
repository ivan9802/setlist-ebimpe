import { t } from '../lib/messages.fr.ts'

/**
 * Écran provisoire, chargé à la demande, tant que la page réelle n'est pas livrée.
 * Chaque phase du plan front remplace une route qui pointe ici. Le site reste en noindex.
 */
export function UpcomingPage({ title }: { title: string }) {
  return (
    <section className="gutter-x flex flex-col gap-4 py-12">
      <h1 className="font-display text-display-l font-black uppercase">{title}</h1>
      <p className="text-muted">{t.upcoming}</p>
    </section>
  )
}
