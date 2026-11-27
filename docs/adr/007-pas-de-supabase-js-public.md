# ADR-007 : Pas de supabase-js dans le bundle public

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

Le budget du premier chargement est de 500 Ko. supabase-js pèse environ 45 Ko compressés pour 4 appels RPC publics.

## Décision

Le parcours public appelle PostgREST et le Worker avec `fetch`. `@supabase/supabase-js` et `papaparse` ne sont importés que dans le module admin, chargé à la demande. Une règle ESLint (`no-restricted-imports`) l'impose.

## Conséquences

- Gain d'environ 45 Ko sur le chunk d'entrée.
- Un petit client `lib/api.ts` (délai, annulation, erreurs typées) est à maintenir.
- L'admin profite de la bibliothèque complète (Auth MFA, CRUD).
