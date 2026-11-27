# Plan de réalisation : ouverture en 3 jours

## HIMRA ULTRA TRACKLIST EXPERIENCE

| | |
|---|---|
| Version | 2.0, rédigée le 27/11/2026 |
| Remplace | `sprints-v1-17-jours.md` (plan v1.0 du 26/11, 17 jours ouvrés) |
| Statut | **À valider** : décision D-7 (§2) |
| Contrainte nouvelle | Le projet doit être réalisé en **3 jours** (demande du porteur, 27/11/2026) |
| Référentiel | `dev-pro` (non négociable) |

---

## 1. Ce que change la contrainte de 3 jours

Le plan v1.0 estimait le travail restant à **17 jours ouvrés**. En 3 jours, il n'est pas possible de livrer tout le MVP sans abandonner les exigences de qualité du référentiel (tests, sécurité, accessibilité, juridique). Ces exigences ne se négocient pas. C'est donc le **périmètre de l'ouverture** qui change, pas la qualité.

Le concert a lieu le 26/12. Si le site ouvre au bout de 3 jours, la campagne dure environ 3 semaines. Ce temps permet de livrer le reste du MVP **pendant la campagne**, par petites mises en production, comme le prévoyait déjà la décision D-6 pour l'administration.

Hypothèses explicites :

- J1, J2 et J3 sont 3 jours consécutifs qui commencent dès la validation de ce plan ;
- les prérequis du §5 sont fournis au début de J1 ;
- chaque validation demandée au porteur est donnée dans les 2 heures ;
- aucune nouvelle demande n'entre pendant les 3 jours.

Si une de ces hypothèses tombe, l'ouverture glisse d'autant.

---

## 2. Décision D-7 : périmètre de l'ouverture (à valider)

**Recommandation : ouvrir au bout de 3 jours avec le parcours fan complet, puis livrer le reste pendant la campagne.**

### 2.1. Livré pour l'ouverture (J3)

| Domaine | Contenu | Cas d'utilisation |
|---|---|---|
| Base de données | Schéma complet, RLS, `submit_playlist`, `get_catalog`, `get_stats`, `get_public_playlist`, `increment_share`, `refresh_stats` planifiée, termes interdits, fonctions admin (exclusion, campagne, recalcul) | UC-21 |
| Accueil | Slogan, compteur réel, bouton principal, mention d'indépendance, animations au défilement en CSS | UC-01 |
| Composition | Recherche, filtres, ajout de 1 à 20 titres, réorganisation (glisser-déposer et boutons), brouillon local | UC-02 à UC-04, UC-08 |
| Guests | De 0 à 5, étape facultative | UC-05 |
| Validation | Récapitulatif, pseudo, consentement, anti-robot invisible, idempotence, contrôles serveur | UC-06 |
| Partage | Confirmation, lien, WhatsApp, partage natif, carte PNG 1 080 × 1 350 (1 colonne jusqu'à 10 titres, 2 au-delà) | UC-07 |
| Page partagée | `/t/:code`, aperçu WhatsApp (balises OG), page « plus disponible » | UC-10 |
| Résultats | Totaux, top 10, titres d'ouverture, classement des guests, seuil de 10 participations, heure de mise à jour | UC-09 |
| Transverse | Mentions légales, confidentialité, conditions, page 404, en-têtes de sécurité, HTTPS, `robots.txt`, `sitemap.xml` | |
| Exploitation | Sauvegarde quotidienne, sondes UptimeRobot, Sentry, procédures SQL pour l'administrateur | UC-15, UC-16, UC-17, UC-18, UC-20 par console SQL |

### 2.2. Livré pendant la campagne (version 1.1, à partir de J4)

| Ordre | Contenu | Priorité CDC |
|---|---|---|
| 1 | Interface d'administration : connexion TOTP, campagne, set-lists et exclusion, termes interdits | M |
| 2 | Administration : catalogue et guests, exports CSV, journal | M |
| 3 | Classement par projet, top 3 sur l'accueil | S |
| 4 | Import CSV, tableau de bord (dont la durée médiane, D-2) | S |
| 5 | PWA, page hors ligne, message de mise à jour | S et M |
| 6 | Carte au format story, invite d'installation | C |

En attendant le point 1, l'administrateur passe par la console SQL de Supabase, avec des procédures écrites (extension de D-6).

### 2.3. Ce que l'ouverture rapide coûte

| Exigence du plan v1.0 | En 3 jours | Risque accepté si D-7 est validée |
|---|---|---|
| Session de tests avec 5 fans (cadrage §11.3) | 2 ou 3 fans, 30 minutes, à J3 | Problèmes d'usage découverts après l'ouverture |
| Test de restauration de la sauvegarde (CA-NF-09) | Rollback du Worker testé ; restauration de la base testée à J4 | Pendant 24 h, la sauvegarde n'est pas prouvée |
| Test de charge complet (CA-NF-03) | Test court (10 minutes) aux seuils du cadrage | Comportement sous pic long non mesuré |
| Recette sur 6 navigateurs (CA-NF-07) | Chrome Android, navigateur de WhatsApp, Safari iOS | Défauts possibles sur Firefox et Edge |
| Motion design de la DA | Animations CSS au défilement seulement ; Motion (JS) reporté | Expérience moins riche à l'ouverture |
| Modération par interface | Console SQL pendant quelques jours | Plus lent, demande de la rigueur |

**Si D-7 est refusée**, il faut soit revenir au plan v1.0 (17 jours), soit me dire quelles autres fonctionnalités retirer. Je ne retire pas de tests ni de contrôles de sécurité pour tenir le délai.

---

## 3. Les 3 jours

### J1 : données et serveur

**Objectif du soir :** une soumission envoyée au Worker de préproduction est validée, enregistrée, comptée dans les résultats, et refusée si elle est invalide.

| # | Tâche | Couvre |
|---|---|---|
| 1.1 | Fusion de la PR #2 (socle, CI corrigée), protection de `main` | S0 |
| 1.2 | Secrets et variables GitHub, secrets du Worker `hute-staging`, premier déploiement de préproduction | ADR-009 |
| 1.3 | Migrations : tables, RLS, fonctions publiques, `submit_playlist`, fonctions admin, `refresh_stats` et pg_cron, journal d'audit | ADR-002 à 006 |
| 1.4 | Termes interdits chargés, test des pseudos légitimes | `docs/moderation/termes-interdits.md` |
| 1.5 | Tests SQL : RLS, refus de `submit_playlist`, double soumission, recalcul | CA-08 à CA-12, CA-16, CA-18 |
| 1.6 | `shared/` : schémas Zod, normalisation du pseudo, catalogue d'erreurs | ADR-008 |
| 1.7 | Worker : `POST /api/submit` (Zod, Turnstile, appel SQL), en-têtes de sécurité, journaux sans IP | ADR-005 |
| 1.8 | Migration de données : catalogue et guests réels relus | Prérequis porteur |

### J2 : parcours fan

**Objectif du soir :** sur un vrai téléphone, en préproduction, un fan compose, valide et télécharge sa carte.

| # | Tâche | Couvre |
|---|---|---|
| 2.1 | Tokens, polices auto-hébergées, composants de base, mises en page, `lib/api.ts`, `lib/messages.fr.ts` | DA |
| 2.2 | Accueil (compteur, CTA, mention, animations CSS, `prefers-reduced-motion`) | CA-01 |
| 2.3 | Étape Morceaux, tiroir de set-list, glisser-déposer et boutons | CA-02, CA-03, CA-05 |
| 2.4 | Étape Guests, récapitulatif, brouillon local | CA-04, CA-06, CA-07 |
| 2.5 | Turnstile, envoi, « Réessayer », messages de refus | CA-12, CA-13 |
| 2.6 | Confirmation, partage, carte PNG testée sur Android et dans WhatsApp | CA-14 |
| 2.7 | Test Playwright du parcours complet, lancé sur chaque PR | |

### J3 : partage, durcissement, ouverture

**Objectif du soir :** le site est ouvert au public.

| # | Tâche | Couvre |
|---|---|---|
| 3.1 | Page `/t/:code`, balises OG, page « plus disponible » | CA-15, CA-17 |
| 3.2 | Résultats (sondage de 60 s, onglets Titres et Guests) | CA-16 |
| 3.3 | Pages légales, 404, `robots.txt`, `sitemap.xml`, retrait du `noindex` | CA-NF-11 |
| 3.4 | CSP et en-têtes, recherche de secrets, linter de sécurité Supabase, audit des dépendances | CA-NF-05 |
| 3.5 | Lighthouse mobile, axe sur tous les écrans fan, contrôle à 360 px | CA-NF-01, 02, 04, 08 |
| 3.6 | Test de charge court, rollback testé, sauvegarde activée | CA-NF-03 (réduit) |
| 3.7 | Procédures SQL de l'administrateur : exclusion, termes, clôture, retrait | D-6, D-7 |
| 3.8 | Tests rapides avec 2 ou 3 fans, recette sur 3 navigateurs | §2.3 |
| 3.9 | Production : projet `hute-prod`, secrets, compte admin avec TOTP, sondes, ouverture | Check-list architecture §11.6 |

**Critère d'ouverture.** Les critères CA-01 à CA-18 et CA-NF-01, 02, 04, 05, 06, 08, 10, 11 sont vérifiés. Si un seul point bloquant reste ouvert le soir de J3, on n'ouvre pas et je vous dis lequel.

### Si une journée déborde

On retire dans cet ordre, sans toucher aux tests ni à la sécurité :

1. les animations au défilement (l'accueil reste statique) ;
2. l'onglet Guests des résultats ;
3. la variante 2 colonnes de la carte (la carte affiche alors les 10 premiers titres, puis « + N titres ») ;
4. au-delà, l'ouverture glisse d'un jour.

---

## 4. Règles conservées

- Définition de « terminé » du plan v1.0 (§4.1) inchangée : PR relue, CI verte, tests écrits, maquette respectée, accessibilité, aucune donnée personnelle hors pseudo.
- Aucun push direct sur `main`.
- Gel des déploiements non correctifs pendant 48 h après une annonce attendue.

---

## 5. Prérequis nécessaires au début de J1

| Élément | Pourquoi | Bloquant pour |
|---|---|---|
| Secrets GitHub : `CLOUDFLARE_API_TOKEN`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD` | Déploiements automatiques | J1 |
| Variables GitHub : `CLOUDFLARE_ACCOUNT_ID`, `SUPABASE_PROJECT_REF`, `STAGING_URL` | Déploiements automatiques | J1 |
| Références des projets `hute-staging` et `hute-prod`, clés publiables | Configuration de l'interface et du Worker | J1 |
| Deux widgets Turnstile (préproduction, production) | Anti-robot | J1 |
| Catalogue vérifié et liste des guests | Migration de données | J1 |
| Identité de l'éditeur, contact, directeur de publication | Mentions légales | **J3, ouverture** |
| Dates d'ouverture et de clôture | Paramétrage de la campagne | J3 |
| 2 ou 3 fans disponibles 30 minutes | Tests rapides | J3 |
| Clé GPG publique | Sauvegardes chiffrées | J3 |
