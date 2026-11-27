# Direction artistique et conception UX/UI

## HIMRA ULTRA TRACKLIST EXPERIENCE

| | |
|---|---|
| **Version** | 1.0 |
| **Date** | 26 novembre 2026 |
| **Statut** | **Validée le 26/11/2026** : concept, palette, mot « set-list » et typographies. Affichage « 26.12 · Stade d'Ebimpé » sans heure. Visuels 100 % typographiques tant qu'aucun visuel autorisé n'est fourni (voir `docs/recherche/informations-publiques.md`). MVP complet maintenu. |
| **Entrées** | Cadrage v1.0, architecture v1.0, référentiel dev-pro, recherche publique sur l'artiste |

---

## 0. Ce que l'on sait de l'univers de l'artiste, et ce qu'on ne sait pas

Ce que les sources publiques confirment :

- Le concert est annoncé au Stade Olympique Alassane Ouattara d'Ebimpé, le **samedi 26 décembre 2026 à 14 h**, avec un objectif de 60 000 places. Plusieurs articles de presse ivoirienne le reprennent ([Pulse CI](https://www.pulse.ci/article/stade-debimpe-himra-vise-un-concert-historique-et-un-pari-60-000-places-en-decembre-2026-2026050800334086595), [Afrique-sur7](https://www.afrique-sur7.fr/himra-au-stade-debimpe-lartiste-confirme-la-date)).
- Le dernier album, *Sorry I'm Bad*, est sorti fin mai 2026 (17 titres, label 1X / Slimak, distribution Sony Music Entertainment France selon [Deezer](https://www.deezer.com/artist/11736133) ; une autre source annonce une signature chez Epic Records, [13or du hip-hop](https://www.13or-du-hiphop.com/sorry-im-bad-le-nouvel-album-dhimra/)). La presse cite parmi les invités de l'album Gazo, Leto, La Fouine, ElGrandeToto, Enfant Noir, Philipayne, M24, Babydaiz et Zlatan.

Ce que les sources ne donnent pas :

- La recherche n'a trouvé aucune description exploitable des pochettes, ni de charte, de typographie ou de logo.

**Conséquence.** Cette direction artistique est **originale**. Elle s'inspire de la culture du live, du rap ivoirien et de la tribune ultra. Elle ne prétend pas reproduire la charte de l'artiste et ne réutilise aucun visuel officiel.

Si le porteur fournit des références autorisées (prérequis n°4), la palette et les textures s'ajustent sans toucher à la structure : tout passe par des tokens.

La liste des invités de l'album sert seulement de **piste** pour la liste des guests. Le porteur doit la vérifier (RG-GST-04) et elle ne laisse jamais entendre une présence confirmée au concert.

---

## 1. Direction artistique

### 1.1. Concept : « La set-list scotchée »

Dans un concert, la set-list est une feuille A4 imprimée ou écrite au marqueur, collée au gaffer sur le sol de la scène, au pied du micro. Les fans la photographient et se la disputent à la fin du show. C'est l'objet le plus intime du live.

L'application reprend cet objet :

- **La scène** : un fond nuit, béton, avec la lumière d'un projecteur. C'est l'espace où l'on compose.
- **La feuille** : un papier blanc cassé avec des numéros au marqueur rouge. C'est la tracklist du fan, et elle devient la carte qu'il partage.
- **Le gaffer** : des bandes de ruban adhésif mat qui « fixent » les éléments validés : la feuille, le code, les guests choisis.
- **Le billet** : une souche perforée qui porte le code public de la set-list. Elle rappelle le ticket d'entrée au stade.
- **La tribune** : des compteurs et classements qui donnent la voix collective, avec la typographie des banderoles ultra (condensée, pleine, en capitales).

Ce concept vient du concert lui-même, pas des tendances d'interface. Il s'écarte des esthétiques bannies par le référentiel : pas de dégradé violet, pas d'orbes floues, pas de glassmorphism, pas de grille Bento, pas de grille de points.

### 1.2. Mots d'ordre visuels

| Oui | Non |
|---|---|
| Contrastes francs (nuit et papier) | Dégradés décoratifs |
| Typographie condensée en capitales, qui déborde | Titres sages centrés partout |
| Matières réelles : papier, gaffer, grain, perforation | Verre flouté, néons, orbes |
| Une seule couleur d'accent (rouge) | Arc-en-ciel d'états |
| Asymétrie contrôlée : feuille légèrement inclinée (de -1,5° à 1°), marges généreuses | Grilles de cartes identiques |
| Lumière dirigée, un seul halo derrière l'élément principal | Halos multiples, effet aurora |
| Ombres courtes et dures (contact papier sur sol) | Ombres floues de 40 px sur chaque carte |

### 1.3. Ton rédactionnel

- On tutoie, la phrase est courte et le vocabulaire est celui de la scène : set-list, guests, ouverture, rappel.
- La communauté est nommée sans être caricaturée : « les ULTRA ».
- **Le mot « set-list » est proposé pour l'interface**, plutôt que « tracklist » (à valider, voir §11). Le dossier interne garde « tracklist » et `playlists`.
- Aucun emoji dans les titres, aucune promesse d'officialité.
- Le sens se dit franchement : « tes souhaits », « ce que les ULTRA veulent entendre », jamais « la programmation ».
- Les textes passent par les règles de rédaction naturelle (skill `humanisation-fr`).

Exemples :

- Accroche : « Le 26 décembre, Ebimpé chante. Dis ce que tu veux entendre. »
- Compteur : « 4 812 ULTRA ont déjà déposé leur set-list. »
- Limite : « Ta set-list est pleine. Retire un titre pour en mettre un autre. »
- Erreur réseau : « Pas de réseau. Ta set-list est gardée ici, réessaie quand ça revient. »

---

## 2. Palette

Toutes les couleurs sont des tokens CSS (`--color-*`). Les ratios de contraste ont été calculés selon la formule WCAG 2.1, sur le fond indiqué.

### 2.1. Couleurs de base

| Token | Nom | HEX | Usage |
|---|---|---|---|
| `--night` | Nuit de stade | `#0E0D0C` | Fond principal (noir chaud, jamais `#000`) |
| `--stage` | Plateau | `#1A1816` | Surfaces : tiroir, cartes, en-têtes |
| `--concrete` | Béton | `#2A2724` | Bordures, séparateurs, champs |
| `--paper` | Papier set-list | `#F2EDE3` | Feuille, texte principal sur fond sombre (blanc cassé, jamais `#FFF`) |
| `--ink` | Encre | `#141210` | Texte sur papier et sur rouge |
| `--muted` | Sourdine | `#A39B8F` | Texte secondaire sur fond sombre |
| `--tape` | Gaffer | `#8E8A82` | Bandes adhésives (décoratif uniquement) |

### 2.2. Accent et états

| Token | Nom | HEX | Usage |
|---|---|---|---|
| `--signal` | Rouge fumigène | `#FF4D3D` | **Seul accent** : bouton principal (avec texte `--ink`), sélection, compteurs, barres de classement sur fond sombre |
| `--signal-ink` | Rouge marqueur | `#C8261C` | Numéros et accents **sur papier** |
| `--focus` | Projecteur | `#FFD23F` | Anneau de focus clavier, et rien d'autre |
| `--success` | Pelouse | `#4FCB6E` | Confirmation (toujours accompagnée d'une icône et d'un texte) |
| `--warning` | Ambre | `#FFB547` | Erreurs et alertes (toujours accompagnées d'une icône et d'un texte) |

Les erreurs sont en ambre, pas en rouge, pour ne pas les confondre avec l'accent de sélection. Aucun état ne repose **uniquement** sur la couleur : il y a toujours une icône et un libellé en plus.

### 2.3. Contrastes vérifiés

| Texte ou élément | Fond | Ratio | Seuil AA | Verdict |
|---|---|---|---|---|
| `--paper` | `--night` | 16,6:1 | 4,5:1 | OK |
| `--muted` | `--night` | 7,0:1 | 4,5:1 | OK |
| `--signal` (texte, barres) | `--night` | 5,9:1 | 4,5:1 | OK |
| `--ink` sur bouton `--signal` | `--signal` | 5,7:1 | 4,5:1 | OK |
| `--paper` sur `--signal` | `--signal` | 2,8:1 | 4,5:1 | **Interdit** |
| `--ink` | `--paper` | 16,0:1 | 4,5:1 | OK |
| `--signal-ink` | `--paper` | 4,8:1 | 4,5:1 | OK |
| `--focus` (anneau) | `--night` | 13,5:1 | 3:1 | OK |
| `--warning` | `--night` | 11,1:1 | 4,5:1 | OK |
| `--success` | `--night` | 9,3:1 | 4,5:1 | OK |
| `--paper` | `--stage` | 15,2:1 | 4,5:1 | OK |
| `--muted` | `--stage` | 6,4:1 | 4,5:1 | OK |
| `--signal` | `--stage` | 5,4:1 | 4,5:1 | OK |
| `--muted` | `--concrete` (champs) | 5,4:1 | 4,5:1 | OK |

Ratios calculés le 26/11/2026 avec la formule de luminance relative WCAG 2.1. Ils seront revérifiés automatiquement (axe) sur les maquettes et en CI.

### 2.4. Règles d'usage

- Le rouge couvre au plus **10 % de la surface** d'un écran. Sa rareté fait sa force.
- Le jaune Projecteur est réservé au focus. Il ne sert jamais de décoration.
- La feuille de papier est le seul grand aplat clair.
- Pas de mode clair alternatif dans le MVP : l'univers est nocturne. `color-scheme: dark` est déclaré, et l'admin utilise la même palette avec des surfaces `--stage`.

---

## 3. Typographie

Deux familles libres (licence OFL), auto-hébergées en WOFF2, avec seulement les glyphes latins et le français. Budget total : 120 Ko au maximum.

| Rôle | Police | Graisses | Alternative libre | Repli système |
|---|---|---|---|---|
| **Titres, banderoles, chiffres héroïques** | **Big Shoulders Display** (condensée, industrielle, conçue pour la signalétique) | 800, 900 | Anton | `"Arial Narrow", "Roboto Condensed", Impact, sans-serif` |
| **Texte, interface, données** | **Instrument Sans** (grotesque lisible, légère largeur variable) | 400, 600 | Public Sans | `system-ui, Roboto, "Segoe UI", sans-serif` |
| **Marqueur (numéros sur la feuille)** | Big Shoulders Display 900, couleur `--signal-ink`, légère inclinaison | — | — | — |

Exclusions conformes au référentiel : Inter, Geist et Space Grotesk. Bebas Neue est aussi écartée, parce que trop vue.

**À vérifier au lot L1 :** la présence des chiffres tabulaires (`tnum`) dans les deux fontes. S'ils manquent, les compteurs et les codes passent dans un sous-ensemble « chiffres seulement » de JetBrains Mono (environ 8 Ko), seule exception tolérée au budget de 2 familles.

### 3.1. Échelle (mobile, puis ordinateur au-delà de 1024 px)

| Token | Usage | Mobile | Ordinateur | Police | Interligne |
|---|---|---|---|---|---|
| `display-xl` | Titre de campagne | 56 px | 120 px | Big Shoulders 900, capitales | 0,9 |
| `display-l` | Titres d'écran | 40 px | 72 px | Big Shoulders 900 | 0,95 |
| `display-m` | Titres de section, compteurs | 28 px | 40 px | Big Shoulders 800 | 1 |
| `title` | Titres de carte, noms de guests | 18 px | 20 px | Instrument Sans 600 | 1,25 |
| `body` | Texte courant | 16 px | 17 px | Instrument Sans 400 | 1,5 |
| `label` | Boutons, filtres | 15 px | 15 px | Instrument Sans 600, petites capitales espacées de +0,02 em | 1,2 |
| `caption` | Mentions, aides | 13 px | 13 px | Instrument Sans 400 | 1,4 |

Le texte courant ne descend jamais sous 16 px sur mobile, ce qui évite le zoom automatique sur les champs iOS. Les tailles utilisent `rem`, pour respecter le zoom du navigateur.

---

## 4. Espaces, grille, formes

- **Unité** : 4 px. Échelle : 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Grille mobile** : 4 colonnes, gouttière de 16 px, marges latérales de 16 px (20 px au-delà de 390 px).
- **Grille tablette** (768 px) : 8 colonnes, marges de 32 px.
- **Grille ordinateur** (1024 px et plus) : 12 colonnes, contenu de 1 200 px au maximum, marges fluides.
- **Rayons** : 2 px (papier, billets), 6 px (champs, boutons), 999 px (pastilles de filtre). Pas de grands arrondis.
- **Bordures** : 1 px `--concrete`. La sélection passe à 2 px `--signal`.
- **Ombres** : une seule, « contact papier », `0 2px 0 rgba(0,0,0,.45)`. Le halo du projecteur est un dégradé radial **unique**, placé derrière la feuille ou le titre, et jamais répété.
- **Zones tactiles** : 48 × 48 px au minimum, avec 8 px entre deux cibles.
- **Matières** :
  - grain SVG inline de 2 Ko environ, en `opacity: .06`, sur le fond seulement ;
  - perforation de billet en CSS (`radial-gradient` en bordure) ;
  - bandes de gaffer en SVG de 1 Ko environ, en 3 variantes ;
  - demi-teinte appliquée **uniquement aux photos autorisées**, jamais en motif de fond.

---

## 5. Composants réutilisables

Chaque composant définit ses états : défaut, survol (pointeur fin seulement), focus, actif ou appuyé, sélectionné, désactivé, chargement, erreur.

| Composant | Description | Points clés |
|---|---|---|
| **Button** | `primary` (fond `--signal`, texte `--ink`, capitales), `secondary` (contour `--paper`), `ghost` (texte seul) | Hauteur de 52 px sur mobile. État chargement avec indicateur et libellé conservé (« Envoi… »). Désactivé : opacité de .4, `aria-disabled`, raison expliquée à côté. |
| **SkipLink** | « Aller au contenu » | Visible au focus |
| **StepHeader** | Indique l'étape (« 1 / 3 Morceaux ») et le bouton retour | `aria-current="step"` |
| **SearchField** | Recherche de titres avec bouton effacer | `type="search"`, `enterkeyhint="search"`, résultats annoncés (« 12 titres ») |
| **FilterChips** | Pastilles projet et type, avec défilement horizontal **local** | `aria-pressed`. Ce défilement ne crée aucun défilement de la page. |
| **TrackRow** | Ligne compacte de 64 px : pochette de 48 px, titre, projet, type, bouton Ajouter ou Ajouté | Toute la ligne est la cible. Une coche et le libellé « Ajouté » remplacent « Ajouter » : l'état ne passe pas que par la couleur. |
| **Counter** | `12 / 20` en Big Shoulders, avec animation courte au changement | `aria-live="polite"` |
| **SetlistSheet** | La feuille de papier : numéros au marqueur, titres, guests en pied, bandes de gaffer | Deux variantes : interactive (réorganisation) et figée (carte, page publique) |
| **SortableItem** | Ligne de la feuille avec poignée, et boutons Monter, Descendre, Retirer | dnd-kit, annonces en français |
| **BottomSheet** | Tiroir « Ma set-list » sur mobile, en 3 hauteurs (poignée, mi-hauteur, plein écran) | Piège le focus quand il est ouvert, `Échap` le ferme, respecte la zone sûre en bas |
| **GuestCard** | Portrait autorisé, ou monogramme typographique sur fond `--stage`, plus le nom | Sélectionnée : contour de 2 px `--signal`, bande de gaffer, libellé « Dans mon casting ». `aria-pressed`. |
| **NicknameField** | Champ unique avec label visible, aide, compteur de caractères, erreur inline | `autocomplete="nickname"`, `maxlength=24`, erreur reliée par `aria-describedby` |
| **TicketStub** | Souche perforée avec le code public | Code en chiffres tabulaires, bouton Copier |
| **ShareBar** | WhatsApp (principal), Partager (natif si disponible), Télécharger l'image, Copier le lien | Les boutons s'affichent selon les capacités du navigateur |
| **RankBar** | Rang, titre, barre horizontale (`scaleX`), valeur et pourcentage | La valeur est toujours écrite en texte, pas seulement visible par la longueur de barre |
| **StatTile** | Grand chiffre et libellé (« set-lists déposées ») | Espace réservé, pour éviter tout décalage de mise en page |
| **Skeleton** | Silhouettes de lignes et de tuiles, sans scintillement si `prefers-reduced-motion` | |
| **EmptyState** | Phrase, explication, action (« Effacer la recherche ») | |
| **InlineError / Banner** | Ambre, icône, texte actionnable | `role="alert"` pour les erreurs bloquantes |
| **Toast** | Confirmation courte (« Lien copié ») | `role="status"`, 3 s, jamais pour une erreur bloquante |
| **OfflineBanner** | Bandeau « Hors connexion » | Apparaît et disparaît selon `online` et `offline` |
| **UpdatePrompt** | « Nouvelle version disponible » avec le bouton Recharger | |
| **ConfirmDialog** | Admin : exclusion, clôture | `<dialog>` natif, focus initial sur Annuler |
| **IndependenceNote** | Mention « Initiative indépendante de fans… » | Présente dans le pied de chaque page publique et sur chaque carte |
| **AdminTable / AdminCardList** | Tableau sur ordinateur, liste de cartes sur mobile | Pagination, recherche, actions par ligne |

---

## 6. Arborescence des pages

```text
/                                Accueil (récit en défilement)
├── /composer/morceaux           Étape 1 : choisir et ordonner
├── /composer/guests             Étape 2 : casting (facultatif)
├── /composer/recap              Étape 3 : signer et valider
├── /merci/:code                 Confirmation, carte, partage
├── /t/:code                     Set-list partagée (publique)
├── /resultats                   La tribune : classements
├── /mentions-legales
├── /confidentialite
├── /conditions
├── /hors-ligne
├── 404
└── /admin                       (non indexé)
    ├── /admin/connexion         E-mail, mot de passe, puis code TOTP
    ├── /admin                   Tableau de bord
    ├── /admin/catalogue         Projets et morceaux, import CSV
    ├── /admin/guests
    ├── /admin/set-lists         Recherche, exclusion
    ├── /admin/moderation        Termes interdits
    ├── /admin/campagne          Ouverture, clôture, dates, notice
    ├── /admin/journal
    └── /admin/export
```

Navigation publique : un en-tête minimal (nom de la campagne à gauche, « Résultats » à droite) et un pied de page (mention d'indépendance et pages légales). Le parcours de composition masque la navigation globale et n'affiche que l'étape, pour limiter les sorties involontaires.

---

## 7. Écrans : objectif, action principale, contenu, états

### 7.1. Accueil (`/`)

- **Objectif** : faire comprendre le principe et faire démarrer.
- **Action principale** : « Composer ma set-list ».

Récit en défilement, en 5 séquences sur mobile :

1. **Ouverture** (premier écran) :
   - titre de campagne en `display-xl` qui déborde à droite (« EBIMPÉ SE PRÉPARE. ») ;
   - accroche en une phrase ;
   - bouton principal ;
   - compteur réel (« 4 812 set-lists déposées ») ;
   - mention de la date « 26.12 · Stade d'Ebimpé », si le porteur la confirme ;
   - visuel : photo autorisée en demi-teinte, ou à défaut une composition typographique sur fond de grain avec le halo du projecteur.
2. **La feuille** : une set-list d'exemple, clairement étiquetée « Exemple », qui se « scotche » à l'arrivée dans l'écran. Elle explique le principe sans schéma en 3 étapes.
3. **La tribune** : le top 3 des titres et le top 3 des guests, sous forme de banderoles. Cette séquence n'apparaît qu'à partir de 10 participations. En dessous : « Les premières set-lists arrivent. Sois dans les premiers. »
4. **Le casting** : noms des guests disponibles, en banderole qui défile **au rythme du défilement de la page**, et jamais tout seul.
5. **Rappel** : grand titre « À TOI DE COMPOSER » et bouton principal, puis le pied de page.

Comportement :

- Après la première séquence, une **barre d'action collante** en bas de l'écran garde le bouton principal accessible.
- États :
  - chargement des compteurs : `StatTile` avec espace réservé et « … » ;
  - campagne clôturée : le bouton devient « Voir les résultats » et le message « Les set-lists sont closes. Merci aux ULTRA. » s'affiche ;
  - hors ligne : bandeau, et les séquences dynamiques sont masquées.

### 7.2. Étape 1 : Morceaux (`/composer/morceaux`)

- **Objectif** : remplir la set-list vite.
- **Action principale** : « Ajouter » sur chaque ligne, puis « Continuer » quand la set-list contient au moins 1 titre.

Mobile :

- en haut, `StepHeader` « 1 / 3 » ;
- recherche visible sans défiler ;
- filtres en pastilles ;
- liste des titres groupés par projet, avec un intertitre collant pour chaque projet ;
- en bas, `BottomSheet` replié avec « Ma set-list · 7 / 20 » et le bouton « Continuer ».

Le tiroir s'ouvre pour réordonner (glisser, ou boutons Monter et Descendre) et retirer.

Ordinateur (1024 px et plus) : catalogue à gauche (7 colonnes) et `SetlistSheet` interactive à droite (5 colonnes), collante.

États :

- chargement : 8 lignes `Skeleton` ;
- recherche sans résultat : `EmptyState` « Aucun titre ne correspond à “xyz”. » avec « Effacer » ;
- limite atteinte : message sous le compteur, et les boutons « Ajouter » deviennent « Set-list pleine » (désactivés, avec la raison) ;
- élément devenu inactif : retiré, avec un toast explicatif ;
- erreur de chargement du catalogue : bannière « Impossible de charger les titres » et bouton « Réessayer ». Le brouillon est conservé.

### 7.3. Étape 2 : Guests (`/composer/guests`)

- **Objectif** : choisir son casting idéal, ou passer.
- **Action principale** : « Continuer ». Action secondaire visible : « Passer cette étape ».

Contenu :

- titre « Les guests que je veux voir sur scène » ;
- sous-titre « Ce sont des souhaits de fans, pas une annonce. » ;
- grille de `GuestCard` (2 colonnes sur mobile, 4 sur ordinateur) ;
- compteur `3 / 5`.

États :

- chargement : `Skeleton` ;
- aucun guest actif : l'étape est sautée automatiquement ;
- limite atteinte : message, et les cartes non sélectionnées deviennent non sélectionnables (avec la raison).

### 7.4. Étape 3 : Récapitulatif (`/composer/recap`)

- **Objectif** : signer et valider en confiance.
- **Action principale** : « Déposer ma set-list ».

Contenu :

- `SetlistSheet` figée en aperçu, avec des liens « Modifier » vers les étapes ;
- `NicknameField`, avec l'aide « Ce nom sera public sur ta carte. Pas de nom complet ni de numéro. » ;
- phrase de consentement avec des liens vers les conditions et la notice ;
- Turnstile invisible.

États :

- envoi : bouton en chargement, double appui bloqué ;
- pseudo refusé : erreur sous le champ, et le focus y est renvoyé ;
- éléments inactifs : bannière avec la liste et le bouton « Retirer et réessayer » ;
- campagne close : bannière avec un lien vers les résultats ;
- réseau ou service indisponible : bannière « Ta set-list n'est pas partie. Elle est gardée ici. » avec « Réessayer ».

### 7.5. Confirmation (`/merci/:code`)

- **Objectif** : récompenser et faire partager.
- **Action principale** : « Partager sur WhatsApp ».

Contenu :

- séquence courte (moins de 900 ms) : la feuille se pose, deux bandes de gaffer la fixent, puis la souche du billet avec le code se détache ;
- carte en aperçu à l'échelle de l'écran ;
- `ShareBar` ;
- liens secondaires : « Voir les résultats » et « Recommencer une set-list ».

États :

- génération de l'image en cours : bouton « Télécharger » en chargement ;
- échec de génération : message, et le lien reste partageable ;
- arrivée directe sur l'URL sans brouillon (ou depuis un autre appareil) : la page se charge par le code, comme la page publique.

### 7.6. Set-list partagée (`/t/:code`)

- **Objectif** : convertir le visiteur.
- **Action principale** : « Composer ma set-list ». Action secondaire : « Partager ».

Contenu :

- « La set-list de {pseudo} » ;
- feuille figée et guests ;
- date au format JJ/MM/AAAA ;
- mention d'indépendance.

États :

- chargement : feuille en `Skeleton` ;
- exclue ou introuvable : « Cette set-list n'est plus disponible. », avec le bouton principal « Composer ma set-list » et le bouton secondaire « Voir les résultats ».

### 7.7. Résultats (`/resultats`)

- **Objectif** : montrer la voix collective et faire revenir.
- **Action principale** : « Composer ma set-list » (en barre collante), ou « Partager les résultats ».

Contenu :

- 2 `StatTile` (set-lists, titres choisis) ;
- onglets « Titres » et « Guests » (onglets ARIA) ;
- top 10 en `RankBar`, avec les 3 premiers mis en avant par la taille et non par une couleur différente ;
- « Titres d'ouverture » (top 5 en position 1) ;
- classement par projet au-delà de 50 participations ;
- « Mis à jour à 21:42 » et bouton « Actualiser » ;
- phrase de transparence : « Ces classements reflètent les set-lists déposées ici, pas l'avis de tous les fans. »

États :

- moins de 10 participations : « Les premiers résultats arrivent bientôt », avec le compteur ;
- échec du rafraîchissement : dernier état affiché, avec la mention « Hors connexion, mis à jour à … ».

### 7.8. Pages légales, 404, hors ligne

- **Objectif** : informer, puis ramener vers l'accueil.
- **Action principale** : « Retour à l'accueil » (404 et hors ligne).

Typographie éditoriale lisible sur `--night`, largeur de ligne de 68 caractères au maximum.

### 7.9. Administration

L'administration est conçue pour l'ordinateur et la tablette, avec la même palette en densité plus forte. Chaque page a une action principale :

| Page | Action principale |
|---|---|
| Connexion | « Se connecter », puis « Vérifier le code » |
| Tableau de bord | Aucune : c'est une page de lecture (volumes, médiane de durée, partages, état de la campagne) |
| Catalogue | « Ajouter un titre », ou « Importer un CSV » (avec aperçu et erreurs ligne par ligne) |
| Guests | « Ajouter un guest » |
| Set-lists | Rechercher, puis « Exclure » (dialogue avec motif) |
| Modération | « Ajouter un terme », avec l'aperçu des pseudos qu'il bloquerait |
| Campagne | « Ouvrir » ou « Clôturer » (dialogue de confirmation) |
| Journal | Aucune : c'est une page de lecture |
| Export | « Télécharger le CSV » |

---

## 8. Interactions et motion design

### 8.1. Tokens d'animation

| Token | Durée | Courbe | Usage |
|---|---|---|---|
| `instant` | 100 ms | `ease-out` | Retour au toucher |
| `quick` | 180 ms | `cubic-bezier(.2,.8,.2,1)` | Compteurs, pastilles, coches |
| `standard` | 260 ms | `cubic-bezier(.2,.8,.2,1)` | Transitions d'étape, ouverture du tiroir |
| `ample` | 400 ms | `cubic-bezier(.6,0,.2,1)` | Feuille qui se pose, barres de classement |
| `opening` | 1 200 ms au total | Séquencé | Ouverture de l'accueil (première visite de la session seulement) |

Seules les propriétés `transform` et `opacity` sont animées.

### 8.2. Défilement en motion design (accueil et résultats)

Le défilement porte le récit de l'accueil. Pour rester fluide sur un Android d'entrée de gamme, il repose sur les **animations CSS pilotées par le défilement** (`animation-timeline: view()` et `scroll()`). Elles tournent sur le fil du compositeur, sans JavaScript à chaque frame. Les navigateurs qui ne les supportent pas, comme certains Safari, affichent la version statique, entièrement lisible : c'est de l'amélioration progressive (`@supports (animation-timeline: view())`).

| Séquence | Effet lié au défilement | Mobile modeste |
|---|---|---|
| Ouverture | Le titre monte et se resserre légèrement (`translateY` et `scale` de 1 à 0,96). Le halo du projecteur s'atténue. | Halo supprimé, titre fixe |
| La feuille | La feuille d'exemple entre avec une légère rotation (de -4° à -1,5°) et une translation de 24 px. Les bandes de gaffer apparaissent à 60 % de l'entrée. | Apparition en fondu seulement |
| La tribune | Les banderoles du top 3 se déroulent l'une après l'autre (`scaleX` de 0 à 1, origine à gauche) | Statique |
| Le casting | La banderole des guests glisse horizontalement **avec le défilement**, sur une distance limitée, et s'arrête quand on ne défile plus | Statique, sur 2 lignes |
| Barre collante | Elle apparaît quand l'ouverture sort de l'écran (`IntersectionObserver`) | Identique |
| Compteur | Il compte jusqu'à la valeur réelle **une seule fois**, à sa première apparition (600 ms) | Valeur affichée directement |

Détection d'un mobile modeste, en plus de `prefers-reduced-motion` : `navigator.deviceMemory <= 2` ou `navigator.hardwareConcurrency <= 4`. Une classe `motion-lite` sur `<html>` coupe la parallaxe, les rotations et les halos.

### 8.3. Micro-interactions du parcours

| Moment | Interaction | Retour |
|---|---|---|
| Ajouter un titre | Appui | La ligne s'enfonce (`scale` .98, `instant`), « Ajouter » devient « Ajouté » avec une coche. Le compteur du tiroir monte d'un cran (`quick`). La poignée du tiroir pulse **une seule fois** au premier ajout. Vibration de 10 ms si disponible et non réduite. |
| Retirer | Appui sur Retirer | La ligne se replie en hauteur (`quick`). La renumérotation se fait sans saut. |
| Réordonner | Glisser | La ligne soulevée prend l'ombre « contact papier » et une rotation de 1°. Un trait `--signal` indique la position cible. Les autres lignes s'écartent (`standard`). |
| Changer d'étape | Continuer ou Retour | La page sortante glisse de 24 px vers la gauche avec un fondu, l'entrante arrive de la droite (`standard`). Le sens s'inverse au retour. |
| Choisir un guest | Appui | Une bande de gaffer « tombe » sur la carte (`quick`), le contour passe au rouge, puis le libellé change |
| Déposer | Appui | Bouton en chargement. Rien ne célèbre avant la réponse du serveur. |
| Succès | Réponse positive | Feuille posée (`ample`), puis gaffer, puis souche du billet. 900 ms au total, sans rien bloquer : le bouton de partage est cliquable dès 300 ms. |
| Résultats mis à jour | Nouvelle donnée | Seules les barres modifiées s'animent (`ample`). Un repère discret (« +3 ») s'affiche 2 s. Pas de réordonnancement animé : changer de rang se fait par un fondu croisé, pour ne pas suggérer un mouvement qui n'a pas eu lieu. |

### 8.4. Garde-fous

- Pas d'animation de survol sur chaque carte : seuls les boutons et les lignes ont un état de survol, et seulement sur les pointeurs fins (`@media (hover: hover)`).
- Pas de flèche qui rebondit, pas de banderole qui défile toute seule, pas de clignotement.
- Aucune information ne dépend d'une animation.
- **Avec `prefers-reduced-motion`**, toutes les animations deviennent des fondus de 100 ms ou disparaissent. Le récit reste complet et lisible.

---

## 9. Comportements responsive

| Largeur | Disposition |
|---|---|
| **360 à 389 px** (référence Android d'entrée de gamme) | 1 colonne, marges de 16 px, titre `display-xl` à 56 px, tiroir de set-list, 2 colonnes de guests, barre d'action collante |
| **390 à 767 px** | Comme ci-dessus, avec des marges de 20 px |
| **768 à 1023 px** (tablette portrait) | Le catalogue passe à 2 colonnes de lignes. Le tiroir devient un panneau latéral escamotable à droite. Les guests passent à 3 colonnes. |
| **1024 à 1279 px** | Composition en 2 zones : catalogue (7 colonnes) et feuille collante (5 colonnes). L'accueil passe en composition asymétrique : titre sur 8 colonnes, feuille sur 4. |
| **1280 à 1440 px et plus** | Contenu de 1 200 px au maximum, typographie héroïque jusqu'à 120 px, marges fluides |
| Paysage sur mobile | Le tiroir s'ouvre au plus à 70 % de la hauteur. Les séquences de l'accueil n'imposent pas une hauteur de 100vh, mais `min-height: 100svh` sur l'ouverture seulement. |
| Zones sûres | `env(safe-area-inset-*)` sur la barre collante et le tiroir |
| Navigateurs intégrés (WhatsApp, Instagram) | Pas de dépendance à `navigator.share` ni au téléchargement : le bouton « Copier le lien » reste toujours visible |

Aucun défilement horizontal de page. Seuls les filtres défilent horizontalement, dans leur propre conteneur, avec un repère visuel de bord.

---

## 10. Règles d'accessibilité (WCAG 2.1 AA)

| Domaine | Règle |
|---|---|
| Structure | Un seul `h1` par page, niveaux sans saut, repères `header`, `nav`, `main` et `footer`, lien d'évitement |
| Contrastes | Ratios du §2.3. Jamais de texte `--paper` sur `--signal`. |
| Couleur | Aucun état signalé seulement par la couleur : sélection, erreur et succès ont toujours une icône et un libellé |
| Focus | Anneau de 3 px `--focus` avec un décalage de 2 px, sur tous les éléments interactifs. Jamais `outline: none` sans remplacement. |
| Clavier | Tout le parcours au clavier. Réorganisation avec dnd-kit au clavier (Espace pour saisir, flèches pour déplacer, Espace pour déposer) et boutons Monter et Descendre. Le focus est piégé dans le tiroir et les dialogues, et `Échap` les ferme. |
| Annonces | Compteurs en `aria-live="polite"`. Erreurs bloquantes en `role="alert"`. Changement d'étape : le focus va sur le `h1` de la nouvelle étape. Résultats de recherche annoncés. |
| Formulaires | Label visible, aide et erreur reliées par `aria-describedby`, `aria-invalid`, erreur affichée quand on quitte le champ, focus renvoyé sur le premier champ fautif |
| Images | `alt` descriptif sur les pochettes (« Pochette de {projet} ») et les portraits (« {nom} »). `alt=""` sur les textures et le gaffer. |
| Cibles | 48 × 48 px au minimum |
| Mouvement | `prefers-reduced-motion` respecté (§8.4). Aucun flash de plus de 3 fois par seconde. |
| Zoom | Lisible jusqu'à 200 %, sans perte de fonction. Pas de `user-scalable=no`. |
| Langue | `lang="fr"`. Les titres de morceaux en anglais portent `lang="en"` quand l'admin l'indique (champ facultatif, à confirmer). |
| Carte PNG | La page de confirmation reprend en texte HTML tout le contenu de la carte |
| Tests | axe-core en CI, plus un test manuel avec TalkBack (Android) et VoiceOver (iOS) sur le parcours complet avant l'ouverture |

---

## 11. Points à valider

1. **Concept « La set-list scotchée »** et palette nuit, papier et rouge.
2. **Le mot « set-list »** dans l'interface, à la place de « tracklist ».
3. **Typographies** Big Shoulders Display et Instrument Sans.
4. **Date et lieu affichés** (« 26.12 · Stade d'Ebimpé ») : ils viennent de la presse. Le porteur confirme-t-il qu'ils peuvent figurer sur l'accueil et sur les cartes ?
5. **Visuels** : en l'absence de photo autorisée, l'accueil et les cartes sont 100 % typographiques. Le porteur dispose-t-il de photos ou d'éléments utilisables ?
