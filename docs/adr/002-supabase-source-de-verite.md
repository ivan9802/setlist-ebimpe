# ADR-002 : Supabase PostgreSQL comme unique source de vérité, `anon` sans accès aux tables

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

Les règles métier (limites, doublons, campagne ouverte, termes interdits) doivent tenir même si un client contourne l'interface. Un seul développeur, pas de serveur à maintenir.

## Décision

PostgreSQL (Supabase, offre gratuite) porte les données, les règles et les droits : contraintes, fonctions `SECURITY DEFINER`, RLS sur toutes les tables. Le rôle `anon` n'a accès à **aucune table**, seulement à `get_catalog`, `get_stats`, `get_public_playlist` et `increment_share`.

## Conséquences

- La base est la dernière ligne de défense (principe P3).
- Chaque politique RLS et chaque fonction est couverte par un test SQL en CI.
- La clé publiable peut être exposée au navigateur sans risque.
- Deux projets gratuits : `hute-staging` et `hute-prod`. La mise en pause après 7 jours d'inactivité est évitée par `keepalive.yml`.
