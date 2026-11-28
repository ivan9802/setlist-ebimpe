# Maquettes haute fidélité

**Fichier Figma :** https://www.figma.com/design/0pSbubx52np0Or4eQcmE5w

**Statut :** première vague validée le 26/11/2026. Seconde vague et administration dessinées le 26/11/2026, à valider.

Les maquettes suivent la direction artistique validée (`docs/design/direction-artistique.md`). Les chiffres, pseudos, codes et dates d'exemple sont **fictifs**. Les titres viennent de la tracklist publique de *Sorry I'm Bad* et restent **à vérifier** (`docs/recherche/informations-publiques.md`). Aucun visuel officiel n'est utilisé.

L'offre Figma Starter limite le fichier à 3 pages.

## Page 1 : première vague (mobile 360 px)

| N° | Frame | Contenu |
|---|---|---|
| 01 | Accueil, récit en défilement | Titre et slogan complet, accroche, compteur, CTA, lien vers les résultats, mention d'indépendance. Puis la feuille d'exemple, la tribune (top 3 des titres et des guests), le casting avec « Choisir mes guests », le rappel et le pied de page (liens légaux). Repère du pli à 800 px, annotations du motion et de l'accessibilité. |
| 01b | Barre d'action collante | |
| 01c | Accueil, campagne clôturée | |
| 02 | Étape Morceaux | Recherche, filtres, « Effacer les filtres », lignes Ajouter et Ajouté avec les invités, tiroir replié |
| 02b | Étape Morceaux, états | Chargement, recherche sans résultat, limite de 20 titres, titre devenu indisponible (toast), brouillon conservé |
| 03 | Tiroir ouvert | Réorganisation (ligne soulevée, repère de position, ↑ ↓ ×), « Réduire la set-list » |
| 04 | Étape Guests | Monogrammes, sélection, `2 / 5`, « Passer cette étape » |
| 04b | Étape Guests, états | Casting complet, chargement, aucun guest actif |
| 05 | Récapitulatif | Feuille, liens Modifier, pseudo au focus, aide, consentement. Annotation : Turnstile et champ piège. |
| 05b | Récapitulatif, refus et chargement | Pseudo interdit, numéro de téléphone, réseau, vérification anti-robot, élément devenu inactif, campagne close, bouton en cours d'envoi |
| 06 | Confirmation et partage | Feuille, souche de billet avec le code, WhatsApp, Partager, Image, Lien, Résultats, Recommencer, mention d'indépendance |
| 07 | Set-list partagée | Pseudo, date, feuille, guests présentés comme souhaits personnels, Composer, Partager, mention |
| 07b | Set-list plus disponible | Message, Composer, Résultats, mention |
| 08 | Résultats, onglet Titres | Tuiles, top avec barres, titres d'ouverture, classement par projet, heure de mise à jour, Actualiser, phrase de transparence, mention, barre collante |
| 08b | Résultats, onglet Guests | Rang, nombre, pourcentage, rappel « souhaits de fans » |
| 09 | Carte 1 080 × 1 350 | 10 titres sur 1 colonne |
| 10 | Composition sur ordinateur 1 440 | Catalogue et set-list collante, « Effacer les filtres » |
| 11 | États globaux | Lien d'évitement, bandeau hors ligne, mise à jour, toast, focus clavier, résultats sous 10 participations, échec de rafraîchissement |

## Page 2 : seconde vague publique

| N° | Frame |
|---|---|
| 12 | Page introuvable (404) |
| 13 | Page hors ligne : ce qui marche sans réseau, ce qui attend le réseau |
| 14 | Mentions légales (les éléments **à fournir** sont signalés en ambre) |
| 15 | Notice de confidentialité |
| 16 | Conditions de participation |
| 17 | Carte story 1 080 × 1 920, avec les zones sûres haute et basse |
| 18 | Carte 1 080 × 1 350, variante 20 titres sur 2 colonnes (règle : 1 colonne jusqu'à 10 titres, 2 colonnes au-delà) |

## Page 3 : administration (ordinateur 1 440)

| N° | Frame |
|---|---|
| A1 | Connexion, étape 1 (e-mail, mot de passe, « Afficher ») |
| A1b | Code de vérification TOTP, avec un état d'erreur |
| A2 | Tableau de bord : 5 tuiles (dont la durée médiane, décision D-2), set-lists par jour et par heure, partages par canal, tops, rappel des quotas |
| A3 | Catalogue avec le panneau « Modifier le titre » (dont le champ « Artistes invités ») |
| A3b | Import CSV : aperçu, erreurs ligne par ligne, import bloqué |
| A4 | Guests |
| A5 | Set-lists : recherche, indices d'abus, pagination |
| A5b | Dialogue d'exclusion (motif obligatoire, focus initial sur Annuler) |
| A6 | Modération : ajout d'un terme avec test des faux positifs, liste des termes |
| A7 | Campagne : état, paramètres, dialogue de clôture |
| A8 | Journal des actions |
| A9 | Export CSV : set-lists, classements, protection contre les formules |

Sous 1 024 px, l'administration passe en menu, en listes de cartes et en dialogues plein écran. C'est une règle annotée, sans maquette dédiée.

## Décisions prises pendant le dessin

1. Nouveau champ `featured_artists` sur les morceaux, pour afficher « feat. … » (CDC §5.2, architecture §6.2).
2. L'étape Guests est accessible directement depuis l'accueil. La validation exige toujours au moins 1 titre (cadrage, UC-05).
3. Au-delà de 10 titres, la carte de partage passe sur 2 colonnes.

## Export PNG

La première vague (page 1) est exportée dans `docs/maquettes/png/`, un fichier par écran, nommé par son numéro (`01-accueil.png`, `09-carte-1080x1350.png`…). Les annotations de motion et d'accessibilité de l'accueil sont dans `01-accueil-annotations.png`.

- Source : la copie du fichier dans les brouillons d'Adomon Roch N'CHO, le 28/11/2026, capturée par le serveur MCP de Figma puis découpée écran par écran.
- Échelle : **1x** (360 px de large pour les écrans mobiles). Pour un export 2x, sélectionner les frames dans Figma, puis **Export**, format **PNG** en **2x**, et remplacer les fichiers en gardant les noms.
- Les pages 2 (seconde vague) et 3 (administration) ne sont pas encore exportées.

Ces images servent de référence pour le développement et la recette, sans consommer le quota d'appels de l'offre Figma Starter. Figma reste la source de vérité : si une maquette change, l'export est à refaire.
