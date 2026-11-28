# HIMRA ULTRA TRACKLIST EXPERIENCE

Application web de fans : chacun compose la set-list qu'il rêve d'entendre au concert du Stade d'Ebimpé, la signe d'un pseudo et la partage. Les classements de la communauté sont publics.

Initiative indépendante, sans lien officiel avec l'artiste ni avec l'organisation du concert.

## Documentation

| Document | Rôle |
|---|---|
| `cahier_des_charges_setlist-ebimpé.md` | Cahier des charges v5 |
| `docs/cadrage/document-de-cadrage.md` | Besoin, règles de gestion (RG-*), cas d'utilisation, critères d'acceptation |
| `docs/architecture/architecture-technique.md` | Architecture, modèle de données, flux, déploiement |
| `docs/adr/` | Décisions d'architecture |
| `docs/design/direction-artistique.md` | Direction artistique, composants, motion |
| `docs/maquettes/README.md` | Index des maquettes Figma |
| `docs/planning/sprints.md` | Plan de réalisation |
| `docs/procedures/` | Procédures d'exploitation |

## Stack

React 19, TypeScript 6 (strict), Vite 8, Tailwind 4, Cloudflare Workers + Static Assets, Supabase (PostgreSQL, Auth, Storage), Turnstile. Versions exactes : `package.json` et architecture §10.

```text
src/       interface (SPA)            worker/    Worker Cloudflare (/api/*, /t/*)
shared/    code commun sans DOM       supabase/  migrations, tests SQL, seed fictif
tests/     unit, worker, e2e, load    scripts/   contrôles de build
```

Règles d'import entre dossiers (vérifiées par ESLint) : `shared/` n'importe que Zod, `worker/` n'importe jamais `src/`, une feature n'importe pas une autre feature, supabase-js et papaparse ne vivent que dans le module admin.

## Démarrer en local

Prérequis :

- **Node 24.22.2** (voir `.nvmrc`). Avec Node 22, l'installation fonctionne mais certains outils de test exigent Node 24.15 ou plus.
- **Docker Desktop**, démarré (pour la base Supabase locale).
- Git.

```bash
npm ci                      # installe les versions exactes du lockfile
cp .env.example .env.local  # valeurs locales, jamais commitées
npm run db:start            # base Supabase locale (Docker), migrations et seed fictif
npm run dev                 # interface sur http://localhost:5173
npm run dev:mock            # interface avec des données FICTIVES, sans Supabase ni Docker
npm run build && npm run preview   # site complet (statique + Worker) sur http://localhost:8787
```

Les secrets du Worker en local vont dans `.dev.vars` (ignoré par Git). Voir la fin de `.env.example`.

Mode maquette (`.env.mock`) : le serveur de dev répond lui-même aux appels Supabase avec les données de `tests/fixtures/`. Le scénario se choisit avec la variable `HUTE_MOCK` : `complet` (par défaut), `attente` (moins de 10 set-lists), `clos` (campagne close) ou `sans-guests`. Les écrans de la maquette sont exportés dans `docs/maquettes/png/`.

## Vérifier avant une PR

```bash
npm run ci        # lint, format, types, tests unitaires, build, budgets, secrets
npm run db:test   # tests SQL (RLS, fonctions), base locale démarrée
npm run build:mock && npm run test:e2e  # Playwright + axe, données fictives interceptées
```

## Règles de contribution

- Aucun push direct sur `main` : une PR, une CI verte, une relecture.
- Les dépendances sont épinglées sans `^`. Une mise à jour passe par une PR dédiée.
- Les migrations suivent la règle « étendre puis contracter » (architecture §11.2).
- Aucune donnée personnelle autre que le pseudo. Aucun secret dans le dépôt.
- Chaque changement visible est noté dans `CHANGELOG.md`.

## Environnements

| Environnement | Worker | Base |
|---|---|---|
| Local | `wrangler dev` | Supabase CLI (Docker), données fictives |
| Préproduction | `hute-staging`, une URL par PR | Projet `hute-staging` |
| Production | `hute` | Projet `hute-prod` |

Configuration GitHub attendue (Settings → Environments → `staging`) :

| Nom | Type | Contenu |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Secret | Jeton limité à « Workers Scripts : Edit » |
| `SUPABASE_ACCESS_TOKEN` | Secret | Jeton personnel Supabase |
| `SUPABASE_DB_PASSWORD` | Secret | Mot de passe de la base `hute-staging` |
| `CLOUDFLARE_ACCOUNT_ID` | Variable | Identifiant du compte Cloudflare |
| `SUPABASE_PROJECT_REF` | Variable | Référence du projet `hute-staging` |
| `STAGING_URL` | Variable | URL `https://hute-staging.<compte>.workers.dev` |
