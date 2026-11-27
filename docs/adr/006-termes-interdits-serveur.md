# ADR-006 : Termes interdits vérifiés côté serveur uniquement

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

RG-PSE-06 prévoyait une vérification des pseudos aussi dans le navigateur. Publier la liste dans le bundle la rendrait lisible par tous et facile à contourner.

## Décision

La liste `blocked_terms` reste en base. La vérification (forme comprimée, modes `word` et `substring`) est faite par `submit_playlist`. Le navigateur ne vérifie que la longueur et les caractères. Un refus revient avec un code dédié et un message actionnable.

## Conséquences

- Écart assumé à RG-PSE-06, consigné dans le cadrage.
- Le fan ne découvre un pseudo refusé qu'à la validation ; son brouillon est conservé.
- La liste se modifie sans redéploiement ; elle ne s'applique qu'aux nouvelles soumissions.
- Les faux positifs sont testés avec la liste des pseudos légitimes.
