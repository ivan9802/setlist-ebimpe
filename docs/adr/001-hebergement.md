# ADR-001 : Hébergement sur Cloudflare Workers et Static Assets

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

Budget nul, public sur Android d'entrée de gamme en 4G, pics viraux imprévisibles (story de l'artiste). Il faut servir le statique depuis un CDN, exécuter un peu de code serveur (soumission, balises OG pour le robot WhatsApp) et ne jamais être suspendu pour dépassement de crédits.

## Décision

Le site est un Worker Cloudflare avec Static Assets. Les fichiers statiques sont servis sans exécuter le Worker. Le Worker ne s'exécute que sur `/api/*` et `/t/*` (`run_worker_first`). Mode SPA pour les autres routes.

## Conséquences

- Fichiers statiques gratuits et illimités : un pic de lecture ne consomme pas de quota de fonctions.
- 100 000 requêtes de fonctions par jour en gratuit : seules les soumissions et les pages `/t/*` comptent.
- HTMLRewriter natif pour injecter les balises OG sans rendu serveur.
- Sans domaine payant, l'adresse est en `*.workers.dev` et la limitation de débit native n'est pas disponible : Turnstile et les contrôles en base compensent.
- Netlify (crédits épuisables puis suspension) et Vercel Hobby (usage commercial ambigu) sont écartés.
