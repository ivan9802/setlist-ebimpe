# Journal des modifications

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versions au format SemVer.

## [Non publié]

### Ajouté (sprint 0, socle)

- Dépôt initialisé : React 19, TypeScript 6 strict, Vite 8, Tailwind 4, versions exactes épinglées.
- Arborescence conforme à l'architecture §9 et règles d'import entre dossiers vérifiées par ESLint.
- Worker Cloudflare minimal : `/api/health`, routes `/api/*` et `/t/*` exécutées en premier, le reste en statique.
- Supabase local : configuration, migration initiale (schéma `private`, extension `unaccent`), test SQL de fumée.
- CI GitHub Actions : lint, format, types, tests unitaires et Worker, tests SQL, build, budgets de taille, recherche de secrets, audit, bout en bout avec axe, version de prévisualisation.
- Déploiement automatique de la préproduction sur `main`, avec smoke test et rollback.
- ADR 001 à 009, README, `.env.example`.
- Page provisoire en `noindex`, retirée à l'ouverture.

### Décisions

- ADR-009 : la préproduction est un Worker distinct (`hute-staging`), pour ne jamais partager les secrets de production.
- Budget CSS initial fixé à 30 Ko compressés (non chiffré dans l'architecture, à confirmer au sprint 1).
- `@types/node` 24.19.2 ajouté (types des scripts de build), absent de la liste §10.
