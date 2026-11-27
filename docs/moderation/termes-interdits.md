# Liste initiale des termes interdits dans les pseudonymes

| | |
|---|---|
| **Version** | 1.0 |
| **Date** | 26 novembre 2026 |
| **Règles liées** | RG-PSE-05 (termes interdits), RG-PSE-07 (motifs de données personnelles, nouvelle), ADR-006 |
| **Source de vérité en production** | Table `blocked_terms`, modifiable par l'admin (UC-17). Ce fichier sert de jeu initial, chargé par migration. |

Cette liste sert uniquement à la modération. Elle n'est **jamais envoyée au navigateur** (ADR-006). Le porteur doit la relire et la compléter, en particulier pour les expressions nouchi et locales qu'un développeur ne connaît pas forcément.

---

## 1. Comment la comparaison fonctionne

Un filtre naïf (« le pseudo contient le mot ») bloque des pseudos légitimes : `con` dans « Confiance » ou « Conakry », `nique` dans « Technique » ou « Unique », `pute` dans « Député », `cunt` dans « Scunthorpe ». Chaque terme a donc un **mode de comparaison**.

### 1.1. Forme comprimée

Le pseudo et chaque terme sont comparés sous une **forme comprimée**, calculée par `private.squash_text()` :

1. Passage en minuscules et suppression des accents (`unaccent`).
2. Remplacement des chiffres et symboles utilisés pour camoufler les lettres : `0→o`, `1→i`, `3→e`, `4→a`, `5→s`, `7→t`, `8→b`, `9→g`, `@→a`, `$→s`, `!→i`.
3. En mode `substring` seulement : suppression de tout ce qui n'est ni une lettre ni un chiffre. Ainsi `c.o.n.n.a.r.d` devient `connard`.
4. Réduction des répétitions de 3 lettres identiques ou plus à 2 lettres. Ainsi `connnnard` devient `connard`, et `kkk` devient `kk` : on évite de réduire `kkk` à `k`, ce qui bloquerait « Mister K ».

Les termes sont stockés tels qu'ils sont écrits. Leur forme comprimée est une colonne générée.

### 1.2. Modes

| Mode | Règle | Usage |
|---|---|---|
| `word` | Le pseudo est découpé en mots (sur espace, `_`, `-`, `.`, `'`). Un mot comprimé doit être **exactement** égal au terme comprimé. | Termes courts ou contenus dans des mots courants : `con`, `pd`, `nique`, `pute` |
| `substring` | La forme comprimée du pseudo entier **contient** le terme comprimé | Termes longs et sans ambiguïté : `connard`, `salope`, `officiel` |

Exemples :

| Pseudo saisi | Résultat | Pourquoi |
|---|---|---|
| `Confiance_225` | Accepté | `con` est en mode `word`, et le mot est `confiance` |
| `Le_Con` | **Refusé** | Le mot `con` correspond exactement |
| `C0nn4rd` | **Refusé** | Comprimé en `connard` |
| `Badminton_Fan` | Accepté | `admin` est en mode `word` |
| `Technique` | Accepté | `nique` est en mode `word` |
| `HIMRA_Officiel` | **Refusé** | Contient `officiel` (usurpation) |
| `Team Himra` | Accepté | Le nom de l'artiste seul n'est pas interdit |
| `ULTRA_225` | Accepté | |

### 1.3. Message affiché

Le motif exact n'est jamais révélé, pour ne pas aider à contourner le filtre. Le fan voit sous le champ : « Ce pseudo n'est pas accepté. Choisis-en un autre. »

---

## 2. Termes interdits

### 2.1. Injures et vulgarités (français)

| Terme | Mode |
|---|---|
| connard | substring |
| connasse | substring |
| con | word |
| conne | word |
| salope | substring |
| salaud | substring |
| pute | word |
| putain | substring |
| pétasse | substring |
| enculé | substring |
| enculer | substring |
| enfoiré | substring |
| bâtard | substring |
| fdp | word |
| fils de pute | substring |
| ntm | word |
| nique | word |
| niquer | word |
| nique ta mère | substring |
| ta mère la | substring |
| ta gueule | substring |
| tg | word |
| ferme ta gueule | substring |
| merde | word |
| chienne | substring |
| bite | word |
| couille | substring |
| couilles | substring |
| chatte | word |
| cul | word |
| branleur | substring |
| branleuse | substring |
| abruti | substring |
| débile | word |
| crétin | substring |
| bouffon | substring |
| clochard | word |
| sale race | substring |

### 2.2. Injures (nouchi et expressions locales, à compléter par le porteur)

| Terme | Sens | Mode |
|---|---|---|
| djandjou | Prostituée | substring |
| bangala | Sexe masculin | substring |
| ta maman | Insulte à la mère (dans un pseudo) | substring |

**À faire par le porteur :** ajouter les injures nouchi, dioula, baoulé ou bété courantes qui manquent, ainsi que les surnoms moqueurs qui visent des personnes réelles de la communauté.

### 2.3. Injures (anglais)

| Terme | Mode |
|---|---|
| fuck | substring |
| fucker | substring |
| motherfucker | substring |
| shit | word |
| bitch | substring |
| asshole | substring |
| bastard | substring |
| whore | substring |
| slut | word |
| cunt | word |
| dick | word |
| pussy | word |

### 2.4. Haine, discriminations et violences

| Terme | Mode |
|---|---|
| nègre | substring |
| négro | word |
| nigga | substring |
| nigger | substring |
| bougnoule | substring |
| sale noir | substring |
| sale blanc | substring |
| sale arabe | substring |
| macaque | substring |
| singe | word |
| bamboula | substring |
| pédé | word |
| pd | word |
| tapette | substring |
| tarlouze | substring |
| gouine | substring |
| faggot | substring |
| nazi | word |
| hitler | substring |
| heil | word |
| kkk | word |
| terroriste | substring |

### 2.5. Sexualité explicite et pédocriminalité

| Terme | Mode |
|---|---|
| porn | substring |
| porno | substring |
| sexe | word |
| sex | word |
| xxx | word |
| pédophile | substring |
| pedo | word |
| viol | word |
| violeur | substring |

### 2.6. Usurpation d'identité et de rôle

Ces termes font croire à un statut officiel ou à un lien avec l'artiste, l'organisation ou l'application. C'est un risque central, puisque la décision D-3 exclut tout contact avec l'équipe de l'artiste.

| Terme | Mode |
|---|---|
| officiel | substring |
| officielle | substring |
| official | substring |
| vrai himra | substring |
| real himra | substring |
| himra officiel | substring |
| the real | substring |
| admin | word |
| administrateur | substring |
| moderateur | substring |
| modérateur | substring |
| moderator | substring |
| staff | word |
| support | word |
| organisateur | substring |
| organisation | substring |
| management | substring |
| manager | word |
| label | word |
| certifié | substring |
| verified | substring |

Le nom **HIMRA** seul n'est pas interdit : « Team Himra » ou « Himra4Life » sont des pseudos de fans légitimes.

---

## 3. Motifs de données personnelles (nouvelle règle RG-PSE-07)

Le pseudo est public et figure sur la carte partagée. Il ne doit donc pas servir à publier un moyen de contact. Ces motifs sont des **règles de format**, vérifiées dans le navigateur **et** sur le serveur. Ils ne passent pas par la liste modifiable.

| Motif | Règle | Message affiché |
|---|---|---|
| Numéro de téléphone | 8 chiffres ou plus dans le pseudo, séparés ou non | « Ne mets pas de numéro de téléphone dans ton pseudo : il sera public. » |
| Adresse web | Contient `www`, `http`, ou se termine par `.com`, `.ci`, `.net`, `.org`, `.fr` | « Les liens ne sont pas acceptés dans le pseudo. » |
| Messagerie | Contient `gmail`, `yahoo`, `hotmail`, `outlook`, `icloud` | « Ne mets pas d'adresse e-mail dans ton pseudo : il sera public. » |

L'arobase `@` est déjà exclue par l'alphabet autorisé (RG-PSE-03).

Ici, le message peut être précis : il protège le fan, et le révéler ne crée aucun risque de contournement.

---

## 4. Maintenance

- **L'admin ajoute ou retire un terme** depuis `/admin/moderation`, en choisissant le mode. Un aperçu teste le terme sur les 200 derniers pseudos et affiche ceux qu'il bloquerait, pour éviter les faux positifs avant enregistrement.
- **Un ajout ne s'applique qu'aux nouvelles participations.** Les tracklists existantes qui contiennent le terme se modèrent avec l'exclusion (UC-16). La page de modération propose la recherche de ces tracklists.
- **Chaque modification est inscrite** dans `admin_actions`.
- **Relecture** : avant l'ouverture, puis une fois par semaine pendant la campagne, à partir des pseudos exclus à la main.

## 5. Tests associés

Le jeu de tests SQL (`supabase/tests/nickname.test.sql`) couvre au minimum les exemples du §1.2, chaque mode, chaque substitution de caractères, et les trois motifs de données personnelles. Une liste de **pseudos légitimes à ne jamais bloquer** sert de garde-fou contre les faux positifs : `Confiance`, `Technique`, `Unique`, `Député`, `Conakry`, `Scunthorpe`, `Team Himra`, `Nazir`, `Constance`, `Bitey`, `Culture225`, `ULTRA_225`, `Badminton_Fan`, `Jihad`, `Mister K`, `XXXTentacion_fan`. Le test échoue si l'un d'eux est refusé.
