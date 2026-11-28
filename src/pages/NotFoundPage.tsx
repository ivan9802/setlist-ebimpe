import { ButtonLink } from '../components/ui/Button.tsx'
import { t } from '../lib/messages.fr.ts'

/** Page 404 (maquette 12) : informer, puis ramener vers l'accueil (DA §7.8). */
export function NotFoundPage() {
  return (
    <section className="gutter-x flex flex-col items-start gap-6 py-16">
      <h1 className="font-display text-display-l font-black uppercase">{t.notFound.title}</h1>
      <p className="text-muted">{t.notFound.text}</p>
      <ButtonLink to="/">{t.backHome}</ButtonLink>
    </section>
  )
}
