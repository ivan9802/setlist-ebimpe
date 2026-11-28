// Accueil, version socle (phase 1) : ouverture seule. Le récit complet en 5 séquences, le
// compteur réel et la variante « campagne close » arrivent en phase 3 (maquettes 01 à 01c).
import { ButtonLink } from '../components/ui/Button.tsx'
import { t } from '../lib/messages.fr.ts'

export function HomePage() {
  return (
    <section className="gutter-x spotlight flex min-h-[calc(100svh-3.5rem)] flex-col justify-center gap-6 py-12">
      <h1 className="font-display text-display-xl font-black uppercase">{t.home.title}</h1>
      <p className="max-w-[34ch] text-title">{t.home.hook}</p>
      <div className="flex flex-col items-start gap-3">
        <ButtonLink to="/composer/morceaux">{t.home.cta}</ButtonLink>
        <ButtonLink to="/resultats" variant="ghost">
          {t.home.results}
        </ButtonLink>
      </div>
    </section>
  )
}
