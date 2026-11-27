# ADR-008 : Catalogue d'erreurs unique et traduction centralisée

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

Une erreur traverse trois couches (SQL, Worker, interface). Sans vocabulaire commun, chaque couche invente ses messages et les textes divergent.

## Décision

La base lève des codes `HUTE_*`. `shared/errors.ts` les associe à un `ErrorCode` et à un statut HTTP. Le Worker renvoie un `ApiErrorBody` normalisé. Seul `lib/messages.fr.ts` transforme un code en texte pour l'humain, toujours avec une action possible.

## Conséquences

- Un message se corrige à un seul endroit.
- Les tests vérifient que chaque code SQL a sa traduction.
- Une version anglaise reviendrait à ajouter `messages.en.ts`.
