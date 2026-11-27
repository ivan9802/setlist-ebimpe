# Décisions d'architecture (ADR)

Format : contexte, décision, conséquences. Une décision remplacée n'est pas supprimée : son statut passe à « Remplacée par ADR-xxx ».

| ADR | Décision | Statut |
|---|---|---|
| [001](001-hebergement.md) | Hébergement sur Cloudflare Workers et Static Assets | Accepté |
| [002](002-supabase-source-de-verite.md) | Supabase PostgreSQL comme unique source de vérité, `anon` sans accès aux tables | Accepté |
| [003](003-tracklist-une-ligne.md) | Une set-list = une ligne, avec tableaux d'identifiants | Accepté |
| [004](004-statistiques-precalculees.md) | Statistiques par instantané précalculé et sondage de 60 s | Accepté |
| [005](005-soumission-via-worker.md) | Soumission via le Worker (Turnstile + Zod), puis fonction SQL réservée à `service_role` | Accepté |
| [006](006-termes-interdits-serveur.md) | Termes interdits vérifiés côté serveur uniquement | Accepté |
| [007](007-pas-de-supabase-js-public.md) | Pas de supabase-js dans le bundle public | Accepté |
| [008](008-catalogue-erreurs.md) | Catalogue d'erreurs unique et traduction centralisée | Accepté |
| [009](009-preproduction-worker-distinct.md) | Préproduction sur un Worker distinct (`hute-staging`) | Accepté |
