# Rapport d'avancement

## HIMRA ULTRA TRACKLIST EXPERIENCE

| | |
|---|---|
| Date | 27/11/2026 |
| Phase en cours | Développement, sprint 0 (socle) presque terminé |
| Branche | `chore/s0-socle`, PR #2 ouverte |
| Plan de référence | `docs/planning/sprints.md` v2.0 (ouverture en 3 jours, **à valider**) |

---

## 1. Synthèse

La conception est terminée et validée : cahier des charges, cadrage, architecture, direction artistique et maquettes. Le socle technique est en place : le projet compile, les tests passent et la CI tourne sur GitHub.

La PR #2 était en échec à cause du formatage d'un seul fichier. C'est corrigé en local, mais pas encore commité.

La nouvelle contrainte de 3 jours ne permet pas de livrer tout le MVP prévu sur 17 jours. Je propose d'ouvrir avec le parcours fan complet, puis de livrer l'administration et les compléments pendant la campagne (décision D-7). Pour tenir les 3 jours, il manque surtout les secrets de déploiement et le catalogue vérifié, et il faudra l'identité de l'éditeur avant l'ouverture.

---

## 2. Tâches effectuées

### 2.1. Conception (validée)

| Livrable | Fichier | Statut |
|---|---|---|
| Cahier des charges v5 (données réduites au pseudo, budget nul, tenue en charge) | `cahier_des_charges_setlist-ebimpé.md` | Validé |
| Document de cadrage (règles, cas d'utilisation UC-01 à UC-21, critères, risques, décisions D-1 à D-6) | `docs/cadrage/document-de-cadrage.md` | Validé le 26/11 |
| Architecture technique (diagrammes, modèle de données, flux, déploiement, versions exactes) | `docs/architecture/architecture-technique.md` | Validée |
| Décisions d'architecture ADR 001 à 009 | `docs/adr/` | Rédigées |
| Liste des termes interdits (~120 termes, 6 catégories, pseudos légitimes) | `docs/moderation/termes-interdits.md` | Rédigée |
| Recherche des informations publiques (concert, tracklist, guests) | `docs/recherche/informations-publiques.md` | Rédigée, titres à vérifier |
| Direction artistique « La set-list scotchée » | `docs/design/direction-artistique.md` | Validée |
| Maquettes haute fidélité, 38 écrans (public, états, administration) | [Figma](https://www.figma.com/design/0pSbubx52np0Or4eQcmE5w), `docs/maquettes/README.md` | Première vague validée, reste à valider (§4) |
| Plan de réalisation v1.0 (17 jours) puis v2.0 (3 jours) | `docs/planning/` | v2.0 à valider |

### 2.2. Sprint 0 : socle technique

| # | Tâche | Statut | Vérification |
|---|---|---|---|
| 0.1 | Branche de travail | Fait | `chore/s0-socle`, poussée, PR #2 |
| 0.1 | Protection de `main` | **Non fait** | `main` n'est pas protégée |
| 0.2 | Projet React, TypeScript strict, Vite, Tailwind, versions exactes | Fait | Lockfile de 612 paquets, `npm run build` réussit |
| 0.3 | Arborescence de l'architecture §9 | Fait | |
| 0.4 | ESLint avec règles d'import entre dossiers | Fait | `npm run lint` sans erreur |
| 0.5 | `wrangler.toml`, Worker minimal `/api/health` | Fait | 3 tests du Worker verts |
| 0.6 | Supabase : configuration (inscriptions fermées, TOTP), migration initiale, test SQL | Fait | Tests SQL **verts en CI** ; base locale instable (§5) |
| 0.7 | CI (`ci.yml`) et déploiement de préproduction (`deploy.yml`) | Fait en partie | CI en place ; déploiement jamais exécuté, faute de secrets |
| 0.8 | `.env.example`, README, CHANGELOG | Fait | |
| 0.9 | ADR 001 à 009 | Fait | |
| 0.10 | Comptes vérifiés | Déclaré prêt par le porteur | Non vérifié de mon côté |

Mesures du build actuel : chunk d'entrée 66,6 Ko compressés sur un budget de 110 Ko, CSS 2,5 Ko, aucun secret trouvé dans le build.

### 2.3. Décisions prises pendant le sprint 0

| Décision | Raison | Statut |
|---|---|---|
| D-6 : ouverture avant l'interface d'administration | Allonger la campagne avant le concert | Validée le 26/11 |
| ADR-009 : préproduction sur un Worker distinct (`hute-staging`) | Les secrets d'un Worker sont partagés par toutes ses versions : une prévisualisation aurait utilisé les secrets de production | À valider |
| Installation avec npm 11 | npm 10.9.8 plante sur la résolution des dépendances de pairs | Technique |
| `overrides` sur `playwright-core` 1.65.0 | Deux versions installées cassaient le typage des tests E2E | Technique |
| `@types/node` 24.19.2 ajouté | Types des scripts de build, absent de la liste §10 | À valider |
| Budget CSS initial de 30 Ko | Aucun budget CSS dans l'architecture | À valider |
| Migrations nommées par horodatage (`20261127000000_init.sql`) | Convention de la CLI Supabase, au lieu de `0001_schema.sql` | Technique |

---

## 3. Tâches restantes

Le détail jour par jour est dans `docs/planning/sprints.md`.

| Bloc | Contenu | Quand |
|---|---|---|
| Fin du sprint 0 | Commit de la correction de formatage, CI verte, fusion de la PR #2, protection de `main`, premier déploiement de préproduction | Début de J1 |
| Données et serveur | Schéma, RLS, fonctions, statistiques planifiées, termes interdits, tests SQL, code partagé, Worker de soumission | J1 |
| Parcours fan | Design system en code, accueil, composition, guests, récapitulatif, envoi, confirmation, carte PNG | J2 |
| Ouverture | Page partagée et aperçus WhatsApp, résultats, pages légales, sécurité, performance, accessibilité, charge, production | J3 |
| Version 1.1 | Interface d'administration, classement par projet, import CSV, tableau de bord, PWA, carte story | Pendant la campagne |
| Exploitation | Surveillance, modération, clôture, bilan | De l'ouverture au concert |

---

## 4. Points à valider

| # | Point | Recommandation | Conséquence d'un refus |
|---|---|---|---|
| V-1 | **D-7 : périmètre de l'ouverture en 3 jours** (`sprints.md` §2) | Valider | Retour au plan de 17 jours, ou liste de retraits à fixer par vous |
| V-2 | Risques acceptés pour tenir 3 jours : tests avec 2 ou 3 fans au lieu de 5, restauration testée à J4, test de charge court, recette sur 3 navigateurs | Accepter | Pas d'ouverture en 3 jours |
| V-3 | Modération par la console SQL jusqu'à la livraison de l'interface d'administration | Accepter | L'interface d'administration passe avant l'ouverture, qui glisse de 2 jours |
| V-4 | ADR-009 (préproduction distincte) | Valider | Risque qu'une PR écrive dans la base de production |
| V-5 | Écarts techniques du sprint 0 (`@types/node`, budget CSS, nommage des migrations) | Valider | Aucun blocage |
| V-6 | Seconde vague des maquettes et administration (38 écrans) | Valider | Retouches avant J2 |
| V-7 | PR #1 « docs: cahier des charges v4.1 », toujours ouverte, remplacée par la v5 | La fermer | Confusion sur la version de référence |
| V-8 | Commit et fusion de la PR #2 après la correction | Autoriser | Le sprint 0 reste ouvert |

---

## 5. Points bloquants

| # | Blocage | Bloque | Qui débloque | Action |
|---|---|---|---|---|
| B-1 | Secrets et variables GitHub absents (Cloudflare, Supabase) | Tout déploiement, dès J1 | Porteur | Les saisir dans Settings → Environments → `staging` (liste dans le README) |
| B-2 | Références des projets Supabase et clés Turnstile non transmises | Configuration de l'interface et du Worker, J1 | Porteur | Me les transmettre (les clés publiques seulement ; les secrets vont directement dans GitHub et Cloudflare) |
| B-3 | Catalogue vérifié et liste des guests absents (titres de *Jeune & Riche* en particulier) | Migration de données, J1 | Porteur | Fournir la liste relue. À défaut, on ouvre avec *Sorry I'm Bad* seul |
| B-4 | Identité de l'éditeur, contact, directeur de publication | Mentions légales, donc **l'ouverture** (exigence légale) | Porteur | Fournir avant J3 |
| B-5 | Dates d'ouverture et de clôture | Paramétrage de la campagne, J3 | Porteur | Les fixer |
| B-6 | Poste local : Node 22 au lieu de 24 (les tests d'interface ne tournent pas en local), Docker instable, réseau très lent (33 minutes pour installer les dépendances) | La vitesse de développement, sur les 3 jours | Porteur | Installer Node 24 LTS (`winget install OpenJS.NodeJS.LTS`), redémarrer Docker Desktop. La CI sert de référence en attendant. |
| B-7 | PR #2 en échec (formatage) | Fusion du socle | Moi, avec votre accord pour le commit | Correction prête en local |

---

## 6. Risques principaux

| Risque | Niveau | Mesure |
|---|---|---|
| 3 jours sans marge : un prérequis en retard décale l'ouverture | Élevé | Prérequis au début de J1, ordre de retrait défini (`sprints.md` §3) |
| Usage réel non testé avec assez de fans | Moyen | Tests rapides à J3, corrections pendant la campagne |
| Modération par la console SQL | Moyen | Procédures écrites, journal d'audit, interface livrée en premier en v1.1 |
| ESLint 9 annoncé comme non maintenu par npm | Faible | Choix contraint par jsx-a11y (architecture §10). Montée en version dès que le plugin suit. |
| Confusion avec une initiative officielle (D-3 : pas de contact avec l'équipe de l'artiste) | Moyen | Mention d'indépendance sur chaque écran et chaque carte, aucun visuel officiel |
