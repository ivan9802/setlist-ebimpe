# Description fonctionnelle pour les maquettes : HIMRA ULTRA TRACKLIST EXPERIENCE

*Brouillon du 26/11/2026, à valider avant de passer au skill `figma-maquettes`. Références détaillées : `docs/cadrage/document-de-cadrage.md` et `docs/design/direction-artistique.md`.*

## 1. Vue d'ensemble

**Nom** : HIMRA ULTRA TRACKLIST EXPERIENCE

Application web mobile, réalisée par des fans et sans lien officiel. Les fans de HIMRA y composent la set-list qu'ils veulent entendre au concert d'Ebimpé, choisissent leurs guests rêvés, puis partagent leur feuille sur WhatsApp. Les classements montrent ce que la communauté réclame.

## 2. Contexte et problématique

Le concert est annoncé au Stade d'Ebimpé le 26 décembre 2026. Avant le show, les fans parlent de leurs titres préférés dans des commentaires Instagram et des groupes WhatsApp. Ces avis se perdent, ne se comptent pas, et ne laissent rien à partager. L'application donne à chaque fan un objet à lui, sa set-list signée, et rend visible le choix collectif. Elle fonctionne sans compte et sans autre donnée personnelle que le pseudo.

## 3. Objectifs

- Permettre de déposer une set-list de 1 à 20 titres en moins de deux minutes sur un Android d'entrée de gamme
- Faire partager au moins 6 set-lists sur 10 via la carte ou le lien
- Afficher des classements de titres et de guests mis à jour chaque minute, cohérents avec les participations
- Convertir au moins 20 % des visiteurs en participants
- Donner au porteur un outil pour gérer le catalogue, modérer et exporter, sans développeur

## 4. Utilisateurs et rôles

**Fan ULTRA.** Compose et réordonne sa set-list, choisit jusqu'à 5 guests (facultatif), signe d'un pseudo, partage sa carte, suit les résultats. Pas de compte. Il peut participer plusieurs fois.

**Visiteur d'une carte partagée.** Ouvre le lien reçu sur WhatsApp, voit la set-list d'un ami, puis compose la sienne ou partage à son tour.

**Administrateur (le porteur, seul).** Se connecte avec une double authentification. Gère les titres, projets et guests. Ouvre et clôture la campagne. Exclut les set-lists abusives et gère les termes interdits. Exporte les données. Travaille surtout sur ordinateur ou tablette.

## 5. Modules et fonctionnalités

**Module Campagne (accueil)**

- Présenter le principe en une phrase et lancer la composition
- Afficher le compteur réel de set-lists déposées
- Montrer le top 3 des titres et des guests à partir de 10 participations
- Signaler clairement l'initiative indépendante

**Module Composition**

- Rechercher un titre sans tenir compte des accents, filtrer par projet et par type
- Ajouter et retirer des titres, avec une limite de 20 et un compteur visible
- Réordonner par glisser-déposer ou par boutons Monter et Descendre
- Choisir de 0 à 5 guests, ou passer l'étape
- Garder le brouillon sur le téléphone en cas de coupure

**Module Validation**

- Saisir un pseudo de 2 à 24 caractères, avec des refus expliqués
- Accepter les conditions et la notice par une phrase
- Déposer la set-list, avec un retour clair en cas d'erreur réseau ou de campagne close

**Module Partage**

- Générer la carte au format 1080 × 1350
- Partager sur WhatsApp, avec le partage natif, en copiant le lien ou en téléchargeant l'image
- Afficher une page publique par set-list, avec les boutons « Partager » et « Composer ma set-list »
- Si la set-list a été retirée : page « Cette set-list n'est plus disponible » avec ces mêmes boutons

**Module Résultats**

- Afficher le nombre de set-lists et de titres choisis
- Classer les titres (top 10), les titres d'ouverture (top 5) et les guests (rang et pourcentage)
- Afficher l'heure de mise à jour et proposer « Actualiser »

**Module Administration**

- Connexion par e-mail, mot de passe et code
- Tableau de bord : volumes par jour et par heure, durée médiane de composition, partages par canal
- Catalogue des titres, projets et guests : ajout, modification, activation, ordre, import CSV
- Set-lists : recherche, exclusion avec motif, rétablissement
- Modération des termes interdits, avec un aperçu des pseudos qu'un terme bloquerait
- Ouverture et clôture de la campagne, journal, export CSV

## 6. Parcours utilisateurs

**Parcours 1 : le fan qui sait ce qu'il veut**

Bintou reçoit le lien dans le groupe WhatsApp de son quartier. L'accueil s'ouvre sur « EBIMPÉ SE PRÉPARE. » et sur un compteur. Elle appuie sur « Composer ma set-list ». Elle tape « bad » et ajoute trois titres de l'album, puis cinq autres en parcourant la liste. Elle ouvre le tiroir et remonte son titre préféré en position 1. Elle choisit deux guests, saisit « Bintou_Yop » et dépose sa set-list. La feuille se pose à l'écran avec son code. Elle appuie sur « Partager sur WhatsApp ». Le tout prend environ une minute et demie.

**Parcours 2 : le visiteur d'une carte**

Kouassi voit l'aperçu « La set-list de Bintou_Yop pour Ebimpé » dans WhatsApp. Il l'ouvre, regarde les titres, puis appuie sur « Composer ma set-list ». Le parcours 1 commence pour lui.

**Parcours 3 : la coupure réseau**

Au moment de déposer, la 4G coupe. Un bandeau dit « Ta set-list n'est pas partie. Elle est gardée ici. » Quand le réseau revient, le fan appuie sur « Réessayer » et la set-list n'est enregistrée qu'une seule fois.

**Parcours 4 : la modération**

Le porteur voit passer un pseudo injurieux dans le flux. Sur ordinateur, il le recherche dans « Set-lists » et choisit « Exclure » avec le motif « pseudo injurieux ». La set-list disparaît des résultats en moins d'une minute, et sa page publique affiche « Cette set-list n'est plus disponible ».

*(Les prénoms des parcours sont fictifs et servent à illustrer. Ils ne doivent pas apparaître comme contenu réel dans les maquettes.)*

## 7. Données manipulées

**Titre** : intitulé, projet, type (solo, collaboration, freestyle, autre), année, pochette autorisée, actif ou non, ordre

**Projet** : nom, type (album, EP, single, autre), année, pochette

**Guest** : nom d'artiste, catégorie, courte description vérifiée, portrait autorisé, actif ou non

**Set-list** : code public de 10 caractères, pseudo, titres ordonnés, guests, date, statut (valide ou exclue), durée de composition

**Résultats** : nombre de set-lists, sélections par titre, premières positions, sélections par guest, heure de calcul

## 8. Plateforme et contraintes

- Web mobile d'abord, référence Android d'entrée de gamme à 360 px de large, en 4G irrégulière. Également tablette et ordinateur.
- Ouvert la plupart du temps dans le navigateur intégré de WhatsApp ou d'Instagram
- Français uniquement, dates au format JJ/MM/AAAA
- 500 Ko au maximum au premier chargement, WCAG 2.1 AA, `prefers-reduced-motion` respecté
- Aucun visuel officiel sans autorisation. *[À confirmer : le porteur dispose-t-il de photos ou d'éléments autorisés ?]*

## 9. Style visuel

Concept « La set-list scotchée » : une scène de nuit (`#0E0D0C`), une feuille de papier blanc cassé (`#F2EDE3`) numérotée au marqueur rouge, des bandes de gaffer, une souche de billet perforée pour le code, et des banderoles de tribune pour les classements. Un seul accent, le rouge `#FF4D3D`. Titres en Big Shoulders Display condensée, texte en Instrument Sans.

Le défilement de l'accueil raconte le principe en cinq séquences animées par le scroll : ouverture, feuille, tribune, casting, rappel. Ces séquences se simplifient sur les téléphones modestes et disparaissent si l'utilisateur réduit les animations.

À éviter : dégradés violets, verre flouté, grilles de cartes identiques, animations au survol partout, emoji dans les titres. Le détail est dans `docs/design/direction-artistique.md`.

## 10. Écrans identifiés

Première vague, maquettes mobile à 360 px puis ordinateur à 1440 px :

1. Accueil : 5 séquences en défilement (ouverture avec titre, accroche, compteur et bouton ; feuille d'exemple ; tribune top 3 ; banderole des guests ; rappel), barre d'action collante, pied de page avec la mention d'indépendance
2. Étape Morceaux : en-tête « 1 / 3 », recherche, pastilles de filtre, liste de titres groupés par projet, tiroir « Ma set-list · n / 20 » replié puis ouvert en réorganisation ; sur ordinateur, catalogue à gauche et feuille à droite
3. Étape Guests : titre « Les guests que je veux voir sur scène », grille de cartes (2 colonnes sur mobile), compteur « n / 5 », « Continuer » et « Passer cette étape »
4. Récapitulatif : feuille en aperçu avec liens Modifier, champ pseudo avec aide et erreur, phrase de consentement, bouton « Déposer ma set-list » (états normal, chargement, erreur)
5. Confirmation : feuille posée avec le gaffer, souche du billet et code, aperçu de la carte, barre de partage (WhatsApp, Partager, Télécharger, Copier), liens « Voir les résultats » et « Recommencer une set-list »
6. Set-list partagée : « La set-list de {pseudo} », feuille figée, guests, date, « Composer ma set-list » et « Partager » ; variante « plus disponible »
7. Résultats : 2 tuiles de chiffres, onglets Titres et Guests, top 10 en barres, titres d'ouverture, heure de mise à jour, phrase de transparence ; variante « moins de 10 participations »
8. Carte de partage : 1080 × 1350 (feuille, pseudo, titres numérotés, bloc guests, code, mention d'indépendance)

Deuxième vague, après validation de la première : 404 et hors ligne, pages légales, connexion admin (2 étapes), tableau de bord admin, catalogue admin avec import CSV, set-lists admin avec dialogue d'exclusion, carte au format story 1080 × 1920.
