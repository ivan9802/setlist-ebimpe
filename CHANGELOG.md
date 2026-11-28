# Journal des modifications

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versions au format SemVer.

## [Non publié]

### Ajouté (front, phase 1 : fondations du parcours fan)

- Contrats partagés `shared/api-types.ts` (`Catalog`, `Stats`, `PublicPlaylist`, `SubmitRequest`) et `shared/errors.ts` (catalogue unique des codes, statuts HTTP, codes `HUTE_*`), d'après l'architecture §5.5 et §5.7.
- Données fictives conformes aux contrats (`tests/fixtures/`) : catalogue, résultats sous et au-dessus des seuils, set-list publique.
- Design system en code : tokens de la DA (couleurs, échelle typographique mobile et ordinateur, rayons, ombre, courbes et durées), valeurs par défaut de Tailwind retirées, variante `motion-full` et classe `motion-lite` pour les appareils modestes.
- Polices auto-hébergées Big Shoulders Display (800, 900) et Instrument Sans (400, 600), sous-ensemble latin, licence OFL : 61,4 Ko pour un budget de 120 Ko. Préchargement des deux polices du premier écran.
- Matières : grain SVG inline, bandes de gaffer, bord perforé, halo unique.
- `lib/` : client HTTP sans supabase-js (`rpc`, `apiPost`, délai de 10 s, `Result`), textes centralisés (`messages.fr.ts`), stockage local sûr, formats fr-CI, observabilité (Sentry chargé après le rendu), hook `useResource`.
- Routeur et mises en page publique et parcours (lien d'évitement, en-tête d'étape, mention d'indépendance), focus sur le titre à chaque changement de page, écran de repli « Recharger », page 404. Les écrans encore à faire affichent une page provisoire.
- Composants : Button, ButtonLink, Counter, FilterChips, SearchField, Field, Skeleton, EmptyState, Banner, Toast, StatTile, BottomSheet (`<dialog>` natif), Tape, Icon.
- Tests : 59 tests unitaires et 18 tests de bout en bout (axe sur les nouvelles routes, clavier, focus, polices, aucun défilement horizontal à 360 px). Budget des polices contrôlé en CI.

### Décisions (front, phase 1, à valider)

- React Router en mode déclaratif (`<Routes>` et `React.lazy`) plutôt qu'en mode « données » : 18 Ko compressés de moins dans le chunk d'entrée (83,7 Ko contre 101,6 Ko). Aucun loader n'est nécessaire, les données passent par des hooks (architecture §4.4).
- Sentry chargé par imports nommés : 31 Ko compressés au lieu de 143 Ko (Replay et Feedback écartés). Sentry 11 remplace `sendDefaultPii` par `dataCollection`, entièrement désactivé.
- Big Shoulders Display n'a pas de chiffres tabulaires (vérifié). Les codes et les données s'affichent en Instrument Sans, qui en a. Les compteurs restent en Big Shoulders, sans ajouter JetBrains Mono (repli prévu par la DA §3).
- Instrument Sans n'a pas de petites capitales : les libellés passent en capitales espacées, sans petites capitales simulées.
- Champ `featuredArtists` ajouté au contrat `Catalog` (affichage « feat. … » des maquettes), absent du contrat §5.7.2 d'origine : `get_catalog` doit l'exposer.
- La CSP devra autoriser `img-src data:` (grain du fond, et carte PNG à venir).

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
