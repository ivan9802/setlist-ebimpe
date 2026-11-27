# ADR-005 : Soumission via le Worker (Turnstile + Zod), puis fonction SQL réservée à `service_role`

| | |
|---|---|
| Statut | Accepté le 26/11/2026 |
| Source | `docs/architecture/architecture-technique.md` |

## Contexte

La soumission est la seule écriture publique. Elle doit résister aux robots, aux doubles envois et aux requêtes forgées, sans compte utilisateur ni donnée personnelle.

## Décision

Le navigateur envoie `POST /api/submit` au Worker. Le Worker valide le corps avec le schéma Zod partagé, vérifie le jeton Turnstile, puis appelle `submit_playlist` avec la clé secrète. Cette fonction n'est exécutable que par `service_role`. Une clé d'idempotence (UUID) rend les répétitions sans effet.

## Conséquences

- La clé secrète ne quitte jamais le Worker (secret Cloudflare).
- Trois niveaux de validation : interface (confort), Worker (forme), base (règles).
- Un double appui ou une reprise après coupure renvoie le même code (CA-12, CA-13).
- Aucune IP n'est stockée ; les journaux du Worker n'en contiennent pas.
