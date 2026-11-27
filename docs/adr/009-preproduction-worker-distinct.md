# ADR-009 : Préproduction sur un Worker distinct (`hute-staging`)

| | |
|---|---|
| Statut | Accepté le 26/11/2026 (sprint 0) |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

L'architecture (§11.1) prévoyait des versions de prévisualisation du Worker de production. Or les secrets d'un Worker sont partagés par toutes ses versions : une prévisualisation aurait utilisé la clé secrète de `hute-prod`, et une PR aurait pu écrire dans la base de production.

## Décision

La préproduction est un Worker distinct, `hute-staging` (`[env.staging]` dans `wrangler.toml`), avec ses propres secrets (projet `hute-staging`, widget Turnstile de préproduction). Chaque PR y publie une version de prévisualisation avec un alias `pr-<numéro>`. Le Worker de production `hute` n'a pas d'URL de prévisualisation.

## Conséquences

- Aucune PR ne peut atteindre les données ni les secrets de production.
- Deux jeux de secrets Cloudflare à configurer (une fois).
- Décision prise au sprint 0 ; l'architecture §11.1 est mise à jour en conséquence.
