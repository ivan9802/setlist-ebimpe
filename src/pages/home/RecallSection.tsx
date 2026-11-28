// Séquence 5 · Rappel (maquette 01) : grand titre et bouton principal, puis le pied de page.
import { ButtonLink } from '../../components/ui/Button.tsx'
import { t } from '../../lib/messages.fr.ts'

export function RecallSection() {
  return (
    <section aria-labelledby="sequence-rappel" className="gutter-x pt-14">
      <h2 id="sequence-rappel" className="font-display text-recall font-black uppercase">
        {t.home.recallTitle[0]}
        <br />
        {t.home.recallTitle[1]}
      </h2>
      <div className="mt-8 max-w-md">
        <ButtonLink to="/composer/morceaux" fullWidth>
          {t.home.cta}
        </ButtonLink>
      </div>
    </section>
  )
}
