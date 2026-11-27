# ADR-004 : Statistiques par instantané précalculé et sondage de 60 s

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

Les résultats sont publics en permanence (D-1). Calculer les classements à chaque lecture ne tient pas lors d'un pic, et une connexion temps réel par visiteur dépasse les quotas gratuits.

## Décision

`refresh_stats()`, planifiée par pg_cron chaque minute, intègre les set-lists non comptées (drapeau `counted`, `FOR UPDATE SKIP LOCKED`, verrou consultatif), puis écrit une ligne JSON dans `stats_snapshot`. L'interface lit cet instantané via `get_stats` et le sonde toutes les 60 s, seulement quand l'onglet est visible.

## Conséquences

- Une lecture des résultats coûte une ligne, quelle que soit l'audience.
- Les résultats ont jusqu'à 2 minutes de retard (CA-16), affiché à l'utilisateur.
- Une exclusion ou son annulation déclenche un recalcul complet.
- Si le calcul échoue, l'instantané précédent reste servi.
- Évolution possible vers Supabase Realtime broadcast sans changer le contrat `Stats`.
