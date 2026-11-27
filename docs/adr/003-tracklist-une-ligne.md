# ADR-003 : Une set-list = une ligne, avec tableaux d'identifiants

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

Une participation compte jusqu'à 20 morceaux et 5 guests. Sous charge, chaque écriture supplémentaire coûte : verrous, quota d'écriture, risque d'état partiel.

## Décision

La table `playlists` stocke `track_ids smallint[]` (ordre conservé) et `guest_ids smallint[]`. Pas de table de liaison. L'intégrité (existence, actif, unicité, longueur) est vérifiée par `submit_playlist` dans la même transaction.

## Conséquences

- Une participation = une seule ligne écrite, atomique.
- L'ordre de la set-list est natif dans le tableau.
- Les classements ne lisent pas ces tableaux en direct : ils sont précalculés (ADR-004).
- L'intégrité référentielle n'est pas assurée par des clés étrangères : elle repose sur la fonction d'écriture, seule voie d'insertion, et sur ses tests.
