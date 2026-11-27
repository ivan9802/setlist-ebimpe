# Document de cadrage produit

## HIMRA ULTRA TRACKLIST EXPERIENCE

| | |
|---|---|
| **Version** | 1.0 |
| **Date** | 26 novembre 2026 |
| **Statut** | **Validé le 26 novembre 2026** (décisions D-1 à D-5 au §12) |
| **Document de référence** | `cahier_des_charges_setlist-ebimpé.md` (v5.0) |
| **Phase** | Cadrage. Aucun développement à ce stade. |

Ce document fixe **quoi** construire et **pourquoi**. Le cahier des charges v5.0 décrit **comment**. En cas de divergence, ce document prime pour le périmètre et les règles de gestion. Le cahier des charges sera aligné ensuite.

---

## 1. Présentation du projet

HIMRA ULTRA TRACKLIST EXPERIENCE est une application web mobile, sans compte ni installation. Elle permet aux fans de HIMRA de proposer la tracklist qu'ils rêvent d'entendre au concert d'Ebimpé et de choisir les artistes qu'ils voudraient voir le rejoindre sur scène.

Chaque proposition donne une carte visuelle à partager sur WhatsApp et les réseaux sociaux. L'ensemble des propositions alimente des classements publics.

| Élément | Valeur |
|---|---|
| Nature | Initiative indépendante de fans, sans lien officiel avec l'artiste ni avec l'organisation du concert |
| Porteur | À fournir (personne physique ou association) |
| Public | Fans de HIMRA, communauté ULTRA, surtout en Côte d'Ivoire et sur smartphone |
| Durée de vie | Le temps d'une campagne, de l'ouverture jusqu'au concert, puis une archive des résultats pendant 12 mois |
| Budget | Nul. Uniquement des services gratuits. |
| Équipe | Un développeur et le porteur du projet (contenu, validation, modération) |

---

## 2. Problématique

### 2.1. Le constat

Avant un grand concert, les fans parlent beaucoup des morceaux qu'ils veulent entendre et des invités qu'ils espèrent voir. Ces avis restent éparpillés dans des commentaires Instagram, des vidéos TikTok, des statuts et des groupes WhatsApp. Cette dispersion pose trois problèmes :

1. **Ces avis ne se comptent pas.** Personne ne peut dire quels titres reviennent le plus souvent.
2. **Un commentaire disparaît vite.** Il ne produit rien de durable qu'on puisse repartager.
3. **La communauté ne se voit pas.** Un fan ne mesure ni combien d'autres partagent son attente, ni ce qu'ils attendent.

### 2.2. La question à résoudre

> Comment permettre à des milliers de fans, sur smartphone et parfois avec une connexion limitée, d'exprimer en moins de deux minutes leur programme de concert idéal, d'en faire un objet qu'ils ont envie de partager, et de voir apparaître les préférences de toute la communauté, sans collecter de données personnelles et sans budget ?

### 2.3. Ce que le produit ne résout pas

- Il ne décide pas de la programmation réelle et n'a aucun pouvoir sur elle.
- Ce n'est pas un sondage représentatif : les participations sont anonymes et chacun peut participer plusieurs fois.
- Il ne vend rien et n'est pas un canal de communication officiel.

---

## 3. Vision du produit

### 3.1. Énoncé de vision

> Pour les fans de HIMRA qui attendent le concert d'Ebimpé, HIMRA ULTRA TRACKLIST EXPERIENCE est une expérience mobile qui transforme leur envie en une tracklist signée et partageable, et qui rend visible ce que la communauté veut vivre ce soir-là. Contrairement à un sondage dans une story ou à un fil de commentaires, chaque participation laisse un objet visuel à soi et nourrit un classement collectif.

### 3.2. Promesse

« EBIMPÉ SE PRÉPARE. LES ULTRA DÉCIDENT. »

L'interface doit corriger cette promesse au bon endroit : les ULTRA expriment des souhaits, ils ne décident pas de la programmation. Les résultats emploient les mots « souhaits » et « préférences des fans », jamais « décision » ni « programmation ».

### 3.3. Principes produit

| Principe | Traduction concrète |
|---|---|
| **Rapide** | Moins de deux minutes pour participer, un seul champ à saisir, aucun compte |
| **Fier de partager** | La carte est un objet graphique soigné, pas une capture d'écran de formulaire |
| **Collectif** | Compteurs et classements réels, visibles dès l'accueil |
| **Honnête** | Initiative non officielle affichée, résultats présentés pour ce qu'ils sont, aucun chiffre gonflé |
| **Sobre en données** | Seul le pseudonyme est demandé |
| **Léger** | Utilisable sur un Android d'entrée de gamme en 4G moyenne |

---

## 4. Acteurs

### 4.1. Acteurs principaux

| Acteur | Description | Besoins | Attentes implicites |
|---|---|---|---|
| **Fan ULTRA engagé** | Connaît le catalogue par cœur, suit l'actualité de l'artiste, anime des groupes de fans | Composer vite une tracklist précise et ordonnée, choisir ses guests, montrer sa carte, suivre le classement | Une carte qui fait « officiel de la communauté », pouvoir participer à nouveau |
| **Fan occasionnel** | Arrive par un lien WhatsApp reçu d'un ami et connaît surtout les titres les plus connus | Comprendre le principe en quelques secondes, trouver les titres sans connaître les noms exacts | Ne pas avoir à créer de compte, que ça marche sur son téléphone |
| **Visiteur d'une carte partagée** | Ouvre le lien d'une tracklist publiée par un autre fan | Voir la tracklist de son ami, puis composer la sienne | Un aperçu correct dans WhatsApp, un chargement rapide |
| **Porteur du projet (administrateur)** | Seul administrateur. Gère le contenu, la campagne et la modération. | Mettre à jour le catalogue sans développeur, ouvrir et clôturer, retirer les abus, exporter les résultats | Une interface simple sur ordinateur et tablette, aucune donnée sensible à protéger |

### 4.2. Parties prenantes indirectes

| Partie prenante | Intérêt | Point de vigilance |
|---|---|---|
| L'artiste et son équipe | Pourraient s'intéresser aux résultats | Aucune association à l'artiste sans accord écrit. Ses marques et visuels sont utilisés avec prudence. |
| L'organisateur du concert | Même intérêt | Ne jamais suggérer une programmation confirmée |
| Les artistes proposés comme guests | Leur nom est affiché publiquement | Liste vérifiée, portraits autorisés uniquement |
| Les hébergeurs (Cloudflare, Supabase) | Sous-traitants techniques | Les quotas gratuits ont des limites (§8.2) |

---

## 5. Objectifs

Les volumes d'audience ne sont pas encore connus. Les cibles chiffrées ci-dessous sont des **hypothèses de départ**, à recalibrer avec le porteur après la première semaine de campagne. Elles servent à décider, pas à promettre.

### 5.1. Objectifs métier

| ID | Objectif | Indicateur | Cible initiale | Source de mesure |
|---|---|---|---|---|
| OM-1 | Mobiliser la communauté avant le concert | Tracklists valides sur la campagne | À fixer avec le porteur selon la taille de sa communauté | Base (instantané des statistiques) |
| OM-2 | Transformer la visite en participation | Tracklists validées ÷ visites de l'accueil et des pages `/t/*` | 20 % ou plus | Web Analytics + base |
| OM-3 | Faire de chaque participant un relais | Clics de partage ÷ tracklists validées | 0,6 ou plus | `share_counters` |
| OM-4 | Faire revenir les visiteurs vers le parcours | Visites de `/composer` venant d'une page `/t/*` | Suivi de la tendance, sans cible fixe au départ | Web Analytics (chemins et référents) |
| OM-5 | Produire des résultats exploitables | Exports CSV disponibles et cohérents avec la base à la clôture | 100 % de concordance | Recette de clôture |
| OM-6 | Rester crédible et sans incident juridique | Signalements fondés (visuel non autorisé, usurpation, confusion avec une source officielle) | 0 non traité sous 48 h | Journal admin |

### 5.2. Objectifs utilisateur

| ID | Objectif | Indicateur | Cible |
|---|---|---|---|
| OU-1 | Participer vite | Durée médiane, de l'ouverture de `/composer` à la validation | Moins de 2 min (tests utilisateurs, §11.3) |
| OU-2 | Réussir du premier coup | Part des soumissions refusées pour une erreur de saisie | Moins de 5 % |
| OU-3 | Comprendre le concept | Au moins 4 testeurs sur 5 expliquent le principe après avoir vu l'accueil 10 secondes | 4 sur 5 |
| OU-4 | Être fier de sa carte | Au moins 4 testeurs sur 5 déclarent qu'ils la partageraient | 4 sur 5 |

### 5.3. Objectifs techniques

| ID | Objectif | Cible mesurable |
|---|---|---|
| OT-1 | Rapidité sur mobile | LCP < 2,5 s, INP < 200 ms, CLS < 0,1 (Lighthouse mobile, 4G simulée) |
| OT-2 | Légèreté | 500 Ko transférés au maximum à l'ouverture de l'accueil |
| OT-3 | Tenue en charge | 20 soumissions par seconde et 300 lectures par seconde sans erreur au test de charge (seuils à réajuster après le test) |
| OT-4 | Intégrité | 0 tracklist partielle. Classements identiques à un recalcul complet. |
| OT-5 | Disponibilité | 99,5 % de disponibilité de l'accueil pendant la campagne (sonde UptimeRobot) |
| OT-6 | Sécurité | 0 secret dans le bundle, 100 % des politiques RLS testées, 0 vulnérabilité `high` dans `npm audit` |
| OT-7 | Accessibilité | WCAG 2.1 AA sur les écrans participants, 0 violation sérieuse détectée par axe |
| OT-8 | Coût | 0 F CFA par mois. Alerte à 70 % de chaque quota gratuit. |

---

## 6. Périmètre fonctionnel

Les priorités suivent la méthode MoSCoW :

- **M** (Must) : indispensable, le MVP n'est pas livrable sans.
- **S** (Should) : prévu au MVP, mais retirable en cas d'arbitrage.
- **C** (Could) : bonus si le planning le permet.
- **F** : évolution future, hors MVP.

### 6.1. Fonctionnalités MVP

| Domaine | Fonctionnalité | Priorité |
|---|---|---|
| Accueil | Présentation de la campagne, action principale, mention « initiative indépendante » | M |
| Accueil | Compteur réel de participations | M |
| Accueil | Aperçu du top 3 des morceaux et des guests (au-delà de 10 participations) | S |
| Catalogue | Liste des morceaux actifs, groupés par projet | M |
| Catalogue | Recherche insensible à la casse et aux accents | M |
| Catalogue | Filtres par projet et par type, remise à zéro | M |
| Composition | Ajout et retrait, de 1 à 20 morceaux, compteur | M |
| Composition | Réorganisation par glisser-déposer et par boutons (alternative accessible) | M |
| Composition | Brouillon conservé dans le navigateur | M |
| Guests | Galerie, sélection de 0 à 5, compteur, étape facultative | M |
| Validation | Récapitulatif, pseudonyme, notice et conditions, validation | M |
| Validation | Anti-robot invisible, idempotence, contrôles serveur | M |
| Confirmation | Écran de récompense après confirmation du serveur | M |
| Partage | Carte PNG au format portrait 1080 × 1350 | M |
| Partage | Copie du lien, WhatsApp, partage natif | M |
| Partage | Carte au format story 1080 × 1920 | C |
| Tracklist publique | Page `/t/:code` avec aperçu WhatsApp propre à la tracklist | M |
| Résultats | Totaux, top 10, top 5 en position 1, classement des guests, heure de mise à jour | M |
| Résultats | Classement par projet (au-delà de 50 participations) | S |
| Admin | Connexion avec double authentification | M |
| Admin | Gestion des projets, morceaux et guests (création, modification, activation, ordre) | M |
| Admin | Import CSV du catalogue avec aperçu | S |
| Admin | Ouverture et clôture de la campagne | M |
| Admin | Liste des tracklists, exclusion avec motif, annulation | M |
| Admin | Liste des termes interdits pour les pseudos | M |
| Admin | Export CSV des tracklists et des classements | M |
| Admin | Tableau de bord (volumes, tendances par jour et par heure, partages) | S |
| Admin | Journal des actions | M |
| Admin | Recalcul complet des statistiques | M |
| Transverse | Mentions légales, notice de confidentialité, conditions de participation | M |
| Transverse | Page 404, page hors ligne | M |
| Transverse | PWA installable (manifest, service worker, message de mise à jour) | S |
| Transverse | Invite d'installation discrète après validation | C |

### 6.2. Évolutions futures (hors MVP)

| Évolution | Intérêt | Condition préalable |
|---|---|---|
| Compte à rebours jusqu'au concert | Urgence, retours réguliers | Date confirmée |
| Battles entre deux morceaux | Engagement répété | Retours du MVP |
| Mode live pendant le concert (« titres joués ») | Prolonge l'expérience le soir même | Source fiable en direct |
| Comparaison « ma tracklist face à la communauté » | Personnalisation de la carte | Résultats stabilisés |
| Publication d'une tracklist officielle | Clôture du récit | **Communication officielle de l'organisation** |
| Classements par ville | Rivalité locale | **Nouvelle analyse juridique** (réintroduit une donnée de localisation) |
| Campagnes multiples (autre concert, autre artiste) | Réutilisation de l'outil | Architecture multi-campagne |
| Version anglaise | Diaspora | Besoin constaté |

### 6.3. Exclu explicitement

Comptes fans, profils, commentaires, messagerie, notifications push, application native, écoute de morceaux, modification d'une tracklist validée, soumission hors ligne différée, collecte d'e-mail, de téléphone ou de localisation, publicité.

---

## 7. Cas d'utilisation

### 7.1. Vue d'ensemble

```text
                    ┌──────────────────────────────────────────┐
                    │       HIMRA ULTRA TRACKLIST EXPERIENCE   │
 Fan (anonyme) ─────┤ UC-01 Découvrir la campagne              │
                    │ UC-02 Rechercher et filtrer les morceaux  │
                    │ UC-03 Composer sa tracklist               │
                    │ UC-04 Réorganiser sa tracklist            │
                    │ UC-05 Choisir ses guests                  │
                    │ UC-06 Signer et valider                   │
                    │ UC-07 Partager sa tracklist               │
                    │ UC-08 Reprendre un brouillon              │
                    │ UC-09 Consulter les résultats             │
 Visiteur d'une ────┤ UC-10 Consulter une tracklist partagée    │
 carte partagée     │                                           │
                    │ UC-11 Se connecter                        │
 Administrateur ────┤ UC-12 Gérer le catalogue                  │
                    │ UC-13 Importer le catalogue (CSV)         │
                    │ UC-14 Gérer les guests                    │
                    │ UC-15 Ouvrir / clôturer la campagne       │
                    │ UC-16 Modérer une tracklist               │
                    │ UC-17 Gérer les termes interdits          │
                    │ UC-18 Exporter les données                │
                    │ UC-19 Suivre le tableau de bord           │
                    │ UC-20 Traiter une demande de retrait      │
                    └──────────────────────────────────────────┘
 Système planifié ───── UC-21 Recalculer les statistiques
```

### 7.2. Cas d'utilisation participant

#### UC-01 Découvrir la campagne

| | |
|---|---|
| **Acteur** | Fan |
| **Déclencheur** | Ouverture du lien (souvent depuis WhatsApp ou Instagram) |
| **Préconditions** | Aucune |
| **Scénario nominal** | 1. L'accueil s'affiche avec le visuel, le slogan, le principe en une phrase, le compteur de participations et le bouton « Composer ma tracklist ». 2. Le fan appuie sur le bouton. 3. Il arrive sur l'étape Morceaux. |
| **Alternatives** | 1a. La campagne est clôturée : le bouton est remplacé par « Voir les résultats », avec un message de clôture. 1b. Il y a moins de 10 participations : l'aperçu du top est masqué (RG-RES-04). 1c. Pas de réseau et première visite : page hors ligne. |
| **Postcondition** | Aucune donnée créée |
| **Règles** | RG-CAM-01, RG-CAM-02, RG-COM-01 |

#### UC-02 Rechercher et filtrer les morceaux

| | |
|---|---|
| **Acteur** | Fan |
| **Préconditions** | Catalogue chargé |
| **Scénario nominal** | 1. Le fan tape quelques lettres. 2. La liste se réduit à chaque frappe, sans appel serveur. 3. Il peut combiner avec un filtre par projet ou par type. |
| **Alternatives** | 2a. Aucun résultat : un message cite la recherche et propose de l'effacer. 3a. « Effacer les filtres » remet la liste complète. |
| **Règles** | RG-CAT-01, RG-CAT-05 |

#### UC-03 Composer sa tracklist

| | |
|---|---|
| **Acteur** | Fan |
| **Préconditions** | Campagne ouverte |
| **Scénario nominal** | 1. Le fan appuie sur « Ajouter » sur un morceau. 2. Le morceau rejoint la fin de sa tracklist et le compteur passe à `n / 20`. 3. Sur mobile, un tiroir en bas d'écran résume la sélection. Sur ordinateur, elle s'affiche dans la colonne de droite. 4. Il peut retirer un morceau depuis la liste ou depuis le tiroir. 5. Il passe à l'étape Guests. |
| **Alternatives** | 1a. Morceau déjà ajouté : le bouton affiche « Ajouté » et un nouvel appui le retire. 1b. 20 morceaux déjà présents : l'ajout est refusé avec un message explicite (RG-TRK-02). 5a. Tracklist vide : le passage à l'étape suivante est impossible. |
| **Postcondition** | Brouillon mis à jour dans le navigateur |
| **Règles** | RG-TRK-01 à RG-TRK-05, RG-BRO-01 |

#### UC-04 Réorganiser sa tracklist

| | |
|---|---|
| **Acteur** | Fan |
| **Préconditions** | Au moins 2 morceaux sélectionnés |
| **Scénario nominal** | 1. Le fan fait glisser un morceau vers une autre position. 2. Un repère indique la position cible pendant le geste. 3. Les numéros se mettent à jour. |
| **Alternatives** | 1a. Boutons « Monter » et « Descendre » sur chaque ligne. 1b. Au clavier : saisir l'élément, flèches, déposer. Le changement est annoncé aux lecteurs d'écran. |
| **Règles** | RG-TRK-06 |

#### UC-05 Choisir ses guests

| | |
|---|---|
| **Acteur** | Fan |
| **Préconditions** | Campagne ouverte. L'étape est accessible directement depuis l'accueil (« Choisir mes guests »), même avec une set-list vide. La validation (UC-06) exige toujours au moins 1 morceau. Décision prise lors des maquettes, le 26/11/2026, pour satisfaire l'accès direct demandé par le CDC (§5.1). |
| **Scénario nominal** | 1. La galerie des guests actifs s'affiche, intitulée « Les guests que je veux voir sur scène ». 2. Le fan sélectionne jusqu'à 5 artistes et le compteur affiche `n / 5`. 3. Il passe au récapitulatif. |
| **Alternatives** | 1a. Aucun guest actif : l'étape est sautée automatiquement. 2a. Sixième choix : refusé avec un message. 3a. « Passer cette étape » : il continue sans guest. |
| **Règles** | RG-GST-01 à RG-GST-05 |

#### UC-06 Signer et valider sa participation

| | |
|---|---|
| **Acteur** | Fan |
| **Préconditions** | Tracklist d'au moins 1 morceau, campagne ouverte |
| **Scénario nominal** | 1. Le récapitulatif montre la tracklist ordonnée et les guests, avec des liens pour modifier. 2. Le fan saisit son pseudonyme. L'erreur éventuelle s'affiche quand il quitte le champ. 3. Il voit la mention « En validant, tu acceptes les conditions de participation et la notice de confidentialité », avec des liens consultables. 4. Il appuie sur « Valider ma proposition ». 5. Le bouton passe en chargement. 6. Le serveur confirme et renvoie un code. 7. Le brouillon est effacé et l'écran de confirmation s'affiche. |
| **Alternatives** | 6a. Pseudonyme refusé (format ou terme interdit) : erreur sous le champ, la sélection est conservée. 6b. Un morceau ou un guest est devenu inactif entre-temps : les éléments concernés sont signalés et le fan les retire en un appui. 6c. Campagne clôturée entre-temps : message de clôture et lien vers les résultats. 6d. Vérification anti-robot échouée : nouvelle tentative proposée. 6e. Réseau coupé ou serveur indisponible : « Ta proposition n'a pas été envoyée. Tes choix sont gardés. » avec un bouton « Réessayer ». 6f. Double appui ou réponse perdue : la même clé d'idempotence renvoie le même code, sans doublon. |
| **Postconditions** | Une tracklist `valid` est enregistrée de façon atomique et prise en compte dans les classements au prochain recalcul (60 s au maximum) |
| **Règles** | RG-PSE-01 à RG-PSE-06, RG-VAL-01 à RG-VAL-07, RG-JUR-02 |

#### UC-07 Partager sa tracklist

| | |
|---|---|
| **Acteur** | Fan |
| **Préconditions** | Tracklist validée (écran de confirmation, ou page `/t/:code` ouverte par son auteur) |
| **Scénario nominal** | 1. La carte s'affiche en aperçu. 2. Le fan choisit une action : télécharger le PNG, partager sur WhatsApp (texte prérempli et lien), copier le lien, ou passer par le partage natif. 3. Le clic est compté de façon anonyme, par canal. |
| **Alternatives** | 2a. Partage natif indisponible : le bouton est masqué. 2b. Échec de génération de l'image : message, et le partage du lien reste possible. |
| **Règles** | RG-PAR-01 à RG-PAR-04 |

#### UC-08 Reprendre un brouillon

| | |
|---|---|
| **Acteur** | Fan |
| **Déclencheur** | Retour sur le site après un rafraîchissement, une fermeture d'onglet ou une coupure |
| **Scénario nominal** | 1. Le brouillon local est restauré (morceaux, ordre, guests, pseudo). 2. Le fan reprend là où il s'était arrêté. |
| **Alternatives** | 1a. Des éléments sont devenus inactifs entre-temps : ils sont retirés et le fan en est informé. 1b. Le stockage local est indisponible (navigation privée) : le parcours fonctionne sans sauvegarde. |
| **Règles** | RG-BRO-01 à RG-BRO-03 |

#### UC-09 Consulter les résultats

| | |
|---|---|
| **Acteur** | Fan, visiteur |
| **Scénario nominal** | 1. La page affiche les totaux, le top 10 des morceaux, le top 5 en position 1, le classement des guests et l'heure de mise à jour. 2. Tant que l'onglet est visible, la page se rafraîchit toutes les 60 s. 3. Un bouton « Actualiser » est disponible. |
| **Alternatives** | 1a. Moins de 10 participations : « Les premiers résultats arrivent bientôt », avec le compteur. 2a. Échec du rafraîchissement : les dernières données restent affichées, avec leur heure et une mention discrète « hors connexion ». |
| **Règles** | RG-RES-01 à RG-RES-07 |

#### UC-10 Consulter une tracklist partagée

| | |
|---|---|
| **Acteur** | Visiteur d'une carte partagée |
| **Déclencheur** | Ouverture d'un lien `/t/:code` |
| **Scénario nominal** | 1. L'aperçu dans WhatsApp affiche « La tracklist de {pseudo} pour Ebimpé ». 2. La page affiche le pseudo, les titres, les guests et la date. 3. Le visiteur appuie sur « Composer la mienne » et rejoint UC-03. |
| **Alternatives** | 2a. Code inconnu ou tracklist exclue : message « Cette set-list n'est plus disponible », avec le bouton principal « Composer ma set-list » et un bouton secondaire « Voir les résultats ». L'aperçu WhatsApp d'une tracklist exclue peut rester visible jusqu'à 60 s, ce qui est accepté. 3a. Bouton « Partager » : les mêmes canaux qu'en UC-07. |
| **Règles** | RG-PUB-01 à RG-PUB-04 |

### 7.3. Cas d'utilisation administrateur

| UC | Intitulé | Scénario nominal résumé | Exceptions clés | Règles |
|---|---|---|---|---|
| UC-11 | Se connecter | E-mail, mot de passe, code TOTP, puis accès au tableau de bord | 5 échecs consécutifs : délai imposé par le fournisseur d'authentification. Sans TOTP, aucun accès aux données admin. | RG-ADM-01 à 03 |
| UC-12 | Gérer le catalogue | Créer ou modifier un projet ou un morceau, l'activer ou le désactiver, l'ordonner | Suppression d'un morceau déjà choisi refusée, seule la désactivation est possible | RG-CAT-02 à 04 |
| UC-13 | Importer le catalogue | Déposer un CSV, voir l'aperçu avec les erreurs ligne par ligne, confirmer, puis l'import est appliqué en une fois | Une ligne invalide bloque l'import et le rapport d'erreurs s'affiche | RG-CAT-06 |
| UC-14 | Gérer les guests | Créer, modifier, activer ou désactiver, ordonner, associer un visuel autorisé | Désactivation sans perte des choix enregistrés | RG-GST-04, 05 |
| UC-15 | Ouvrir ou clôturer la campagne | Basculer l'état, ou programmer l'ouverture et la clôture | Clôture : les soumissions en cours sont refusées avec un message | RG-CAM-01 à 03 |
| UC-16 | Modérer une tracklist | Chercher par pseudo ou par code, exclure avec un motif obligatoire, ce qui recalcule les statistiques et rend la page publique introuvable | Annulation possible, également tracée | RG-MOD-01 à 04 |
| UC-17 | Gérer les termes interdits | Ajouter ou retirer un terme | S'applique aux nouvelles soumissions uniquement. Les anciennes se modèrent avec UC-16. | RG-PSE-05 |
| UC-18 | Exporter | Télécharger le CSV des tracklists ou celui des classements | Cellules protégées contre l'injection de formules | RG-EXP-01, 02 |
| UC-19 | Suivre le tableau de bord | Volumes, tendances par jour et par heure, partages par canal, état des quotas (lien vers les consoles) | — | — |
| UC-20 | Traiter une demande de retrait | Recevoir la demande avec le code, vérifier, exclure (UC-16) avec le motif « demande de l'auteur » | Code inconnu : réponse au demandeur | RG-JUR-04 |

### 7.4. Cas système

**UC-21 Recalculer les statistiques.** Chaque minute, le système intègre les nouvelles tracklists valides aux compteurs, puis régénère l'instantané public. Une exclusion ou son annulation déclenche un recalcul complet. Si le calcul échoue, l'instantané précédent reste servi et l'erreur est remontée dans la supervision (RG-RES-01, RG-RES-06).

---

## 8. Règles de gestion

Chaque règle a un identifiant stable, réutilisé dans les tests et les critères d'acceptation.

### 8.1. Campagne

| ID | Règle |
|---|---|
| RG-CAM-01 | Une soumission n'est acceptée que si la campagne est ouverte au moment où le serveur la traite. |
| RG-CAM-02 | Campagne clôturée : le parcours de composition reste consultable, mais la validation est désactivée et l'accueil met en avant les résultats. |
| RG-CAM-03 | L'ouverture et la clôture peuvent être manuelles ou programmées. Une action manuelle l'emporte sur la programmation. |
| RG-CAM-04 | Il n'y a qu'une seule campagne active dans le MVP. |

### 8.2. Catalogue

| ID | Règle |
|---|---|
| RG-CAT-01 | Seuls les morceaux actifs sont proposés et sélectionnables. |
| RG-CAT-02 | Un morceau sans projet est classé « Hors projet ». |
| RG-CAT-03 | Les types de morceau sont `solo`, `collaboration`, `freestyle` et `autre`. Les types de projet sont `album`, `ep`, `single` et `autre`. |
| RG-CAT-04 | Un morceau ou un guest déjà choisi dans une tracklist ne peut pas être supprimé, seulement désactivé. L'historique reste intact. |
| RG-CAT-05 | La recherche ignore la casse et les accents, et porte sur le titre. |
| RG-CAT-06 | Un import CSV est tout ou rien. Une seule ligne invalide annule l'import entier. |
| RG-CAT-07 | Aucune information de catalogue n'est inventée. Un champ inconnu reste vide. |

### 8.3. Tracklist

| ID | Règle |
|---|---|
| RG-TRK-01 | Une tracklist contient au minimum 1 morceau. |
| RG-TRK-02 | Une tracklist contient au maximum 20 morceaux (valeur réglable par l'admin, 20 par défaut). |
| RG-TRK-03 | Un morceau apparaît au plus une fois dans une tracklist. |
| RG-TRK-04 | Un nouveau morceau est ajouté en dernière position. |
| RG-TRK-05 | Le retrait d'un morceau renumérote les suivants sans trou. |
| RG-TRK-06 | L'ordre validé est l'ordre enregistré. La position 1 est le « titre d'ouverture » utilisé dans le classement des premières positions. |

### 8.4. Guests

| ID | Règle |
|---|---|
| RG-GST-01 | La sélection des guests est facultative : de 0 à 5 (valeur réglable, 5 par défaut). |
| RG-GST-02 | Un guest apparaît au plus une fois par tracklist. |
| RG-GST-03 | Les guests ne consomment aucune place parmi les morceaux. |
| RG-GST-04 | Seuls les guests actifs sont sélectionnables. La liste ne comprend que des artistes vérifiés par le porteur. |
| RG-GST-05 | Les guests sont toujours présentés comme des souhaits de fans, jamais comme des participants annoncés ou confirmés. |

### 8.5. Pseudonyme

| ID | Règle |
|---|---|
| RG-PSE-01 | Le pseudonyme est obligatoire. |
| RG-PSE-02 | Après nettoyage (normalisation NFC, espaces de début et de fin retirés, espaces multiples réduits), il compte de 2 à 24 caractères. |
| RG-PSE-03 | Caractères autorisés : lettres (accentuées comprises), chiffres, espace, `_`, `-`, `.`, `'`. Il doit contenir au moins une lettre ou un chiffre. |
| RG-PSE-04 | Le pseudonyme n'est pas unique et n'identifie personne. |
| RG-PSE-05 | Un pseudonyme qui contient un terme interdit est refusé, sans tenir compte de la casse ni des accents. |
| RG-PSE-06 | Les règles RG-PSE-02, 03 et 07 sont appliquées à l'identique dans le navigateur et sur le serveur. RG-PSE-05 (termes interdits) n'est vérifiée que sur le serveur, pour ne pas publier la liste (ADR-006, validé le 26/11/2026). |
| RG-PSE-07 | Un pseudonyme qui ressemble à une donnée de contact est refusé : 8 chiffres ou plus, adresse web, nom de messagerie. Le message explique pourquoi. Liste dans `docs/moderation/termes-interdits.md`. |

### 8.6. Validation

| ID | Règle |
|---|---|
| RG-VAL-01 | Le serveur revérifie toutes les règles (campagne, pseudo, morceaux, guests, notice), quelle que soit la vérification faite par le navigateur. |
| RG-VAL-02 | Une tracklist est enregistrée entièrement ou pas du tout. |
| RG-VAL-03 | Chaque brouillon porte une clé d'idempotence. Deux envois avec la même clé produisent une seule tracklist et le même code. |
| RG-VAL-04 | Chaque soumission passe une vérification anti-robot avant tout accès à la base. |
| RG-VAL-05 | Une même personne peut participer autant de fois qu'elle le veut. Rien ne bloque une soumission parce qu'un pseudo a déjà été utilisé. |
| RG-VAL-06 | Une tracklist validée ne peut pas être modifiée. Seul son statut peut changer, par modération. |
| RG-VAL-07 | Le succès n'est affiché qu'après la confirmation du serveur. |
| RG-VAL-08 | Le code public compte 10 caractères aléatoires, sans caractères ambigus, et ne révèle ni l'ordre ni le volume des participations. |

### 8.7. Brouillon local

| ID | Règle |
|---|---|
| RG-BRO-01 | Le brouillon (morceaux, ordre, guests, pseudo, clé d'idempotence) est gardé uniquement sur l'appareil du fan. |
| RG-BRO-02 | Il est effacé après une validation confirmée. Une nouvelle composition reçoit une nouvelle clé. |
| RG-BRO-03 | Un brouillon n'est jamais compté ni présenté comme une participation. |

### 8.8. Résultats

| ID | Règle |
|---|---|
| RG-RES-01 | Les classements ne comptent que les tracklists au statut `valid`. |
| RG-RES-02 | **Sélections d'un morceau** : nombre de tracklists valides qui le contiennent. **Premières positions** : nombre de tracklists valides où il est en position 1. **Popularité d'un guest** : nombre de tracklists valides qui le contiennent, et pourcentage par rapport au total des participations. |
| RG-RES-03 | Les classements de morceaux et de guests sont indépendants : aucun cumul. |
| RG-RES-04 | En dessous de 10 participations, seuls les totaux sont publiés. En dessous de 50, le classement par projet est masqué. |
| RG-RES-05 | En cas d'égalité, l'ordre suit le nombre de premières positions, puis l'ordre alphabétique du titre. |
| RG-RES-06 | Les résultats affichés ont au plus 2 minutes de retard (1 min de calcul et 1 min de rafraîchissement), et leur heure de mise à jour est toujours visible. |
| RG-RES-07 | La page de résultats précise que les classements reflètent les participations à l'application et non l'ensemble des fans. |
| RG-RES-08 | À la clôture, les résultats sont figés et restent consultables pendant 12 mois. |

### 8.9. Page publique et partage

| ID | Règle |
|---|---|
| RG-PUB-01 | La page d'une tracklist n'affiche que le pseudo, les titres ordonnés, les guests et la date de validation. |
| RG-PUB-02 | Une tracklist exclue n'est plus consultable publiquement. |
| RG-PUB-03 | Les pages de tracklists ne sont pas indexées par les moteurs de recherche. |
| RG-PUB-04 | L'aperçu de partage (Open Graph) reprend le pseudo, et jamais d'autre donnée. |
| RG-PAR-01 | La carte comporte le nom de la campagne, le pseudo, les morceaux numérotés, les guests dans un bloc distinct, le lien court et la mention d'initiative indépendante. |
| RG-PAR-02 | Le texte prérempli de WhatsApp contient le lien de la tracklist et une invitation à composer la sienne. |
| RG-PAR-03 | Les clics de partage sont comptés par canal, de façon anonyme. Ce comptage est estimatif. |
| RG-PAR-04 | Aucun visuel non autorisé n'apparaît sur la carte. |

### 8.10. Modération et administration

| ID | Règle |
|---|---|
| RG-ADM-01 | Il y a un seul compte administrateur, créé à la main. Aucune inscription publique. |
| RG-ADM-02 | La double authentification (TOTP) est obligatoire pour toute lecture ou écriture admin. |
| RG-ADM-03 | Les droits sont vérifiés par la base (RLS). L'interface ne sert jamais de protection. |
| RG-MOD-01 | Une exclusion exige un motif choisi dans une liste (pseudo injurieux, usurpation, soumission automatisée, demande de l'auteur, autre), avec un commentaire libre facultatif. |
| RG-MOD-02 | Toute exclusion ou annulation est inscrite dans le journal (qui, quand, quoi, pourquoi). |
| RG-MOD-03 | Une exclusion ou son annulation déclenche un recalcul complet des statistiques. |
| RG-MOD-04 | Aucune tracklist n'est supprimée pendant la campagne. Les suppressions définitives ont lieu à l'échéance de conservation. |
| RG-EXP-01 | Les exports sont réservés à l'admin. |
| RG-EXP-02 | Toute cellule exportée qui commence par `=`, `+`, `-`, `@`, une tabulation ou un retour chariot est neutralisée. |

### 8.11. Juridique et données

| ID | Règle |
|---|---|
| RG-JUR-01 | La mention « Initiative indépendante de fans, sans lien officiel avec HIMRA ni avec l'organisation du concert » figure sur l'accueil, sur chaque carte et sur chaque page publique. |
| RG-JUR-02 | La notice de confidentialité et les conditions de participation sont accessibles avant la validation. La version acceptée est enregistrée avec la tracklist. |
| RG-JUR-03 | Aucune donnée personnelle autre que le pseudonyme n'est collectée. Aucun cookie non technique n'est déposé. |
| RG-JUR-04 | Une demande de retrait accompagnée du code de la tracklist est traitée sous 7 jours. |
| RG-JUR-05 | Les tracklists sont supprimées 12 mois après l'événement. Seuls les agrégats sont conservés. |

---

## 9. Contraintes

### 9.1. Techniques

| Contrainte | Conséquence sur la conception |
|---|---|
| Smartphones Android d'entrée de gamme, 4G irrégulière, forfaits limités | 500 Ko au maximum au premier chargement, modules chargés à la demande, images AVIF ou WebP, peu de polices |
| Accès surtout via les navigateurs intégrés de WhatsApp et d'Instagram | Pas de dépendance à des API avancées sans solution de repli. Tests dans ces navigateurs. |
| Le robot WhatsApp n'exécute pas le JavaScript | Aperçus de partage générés côté serveur pour chaque tracklist |
| Pics de trafic imprévisibles (story de l'artiste, partage viral) | Pages statiques sur CDN, écriture d'une seule ligne par participation, classements précalculés, interrogation périodique plutôt que connexion temps réel permanente |
| Un seul développeur, un seul admin | Peu de composants, outils managés, pas de serveur à maintenir |
| Stack imposée côté interface | React, TypeScript, Vite, Tailwind, Framer Motion, dnd-kit |

### 9.2. Financières

| Contrainte | Conséquence |
|---|---|
| Budget nul | Offres gratuites uniquement : Cloudflare (hébergement, fonctions, Turnstile, Web Analytics), Supabase, GitHub, Sentry, UptimeRobot |
| Quotas gratuits | Fonctions Cloudflare : 100 000 requêtes par jour. Supabase : 500 Mo de base et 5 Go de trafic sortant par mois. Supabase met en pause les projets inactifs depuis 7 jours et n'inclut pas de sauvegarde téléchargeable. Valeurs à revérifier au lancement. |
| Pas de nom de domaine payant | Adresse gratuite `*.workers.dev`, acceptable mais moins mémorable. La limitation de débit native est indisponible sans domaine. |
| Pas de designer rémunéré | Direction artistique produite dans le projet, avec Figma gratuit et des polices libres |

### 9.3. Juridiques

| Contrainte | Conséquence |
|---|---|
| Loi ivoirienne n° 2013-450 sur les données personnelles, et RGPD pour les visiteurs européens | Collecte réduite au pseudonyme, notice de confidentialité, durée de conservation, procédure de retrait. Obligation éventuelle de déclaration ARTCI à vérifier. |
| Identification obligatoire de l'éditeur d'un service en ligne | Mentions légales complètes : **l'identité du porteur doit être fournie** |
| Droit à l'image, droit d'auteur, droit des marques (nom de l'artiste, pochettes, photos, portraits de guests) | Visuels autorisés uniquement. Composition typographique à défaut. Aucun logo officiel. |
| Risque de confusion avec une initiative officielle | Mention d'indépendance partout, vocabulaire de « souhaits » |
| Contenu publié par les utilisateurs (pseudonymes) | Conditions de participation, liste de termes interdits, modération a posteriori |

### 9.4. Calendrier

- La campagne doit être en ligne suffisamment tôt avant le concert pour que le partage produise son effet. La date du concert reste à confirmer.
- Le planning estime le travail à environ 24 jours ouvrés. Il en découle une **date limite de démarrage du développement**, à calculer dès que la date d'ouverture souhaitée est connue.

---

## 10. Risques

Probabilité (P) et impact (I) sont notés de 1 (faible) à 3 (fort). La criticité vaut P × I.

### 10.1. Risques fonctionnels et produit

| ID | Risque | P | I | Crit. | Mesure de maîtrise | Responsable |
|---|---|---|---|---|---|---|
| RF-1 | Catalogue ou liste de guests incomplets ou erronés | 2 | 3 | 6 | Liste vérifiée fournie avant le lot 3, aperçu à l'import, relecture par un second fan | Porteur |
| RF-2 | Concept mal compris : on croit que les fans décident vraiment | 2 | 2 | 4 | Vocabulaire de « souhaits », mention d'indépendance, test de compréhension (OU-3) | Produit |
| RF-3 | Participation trop longue, abandon | 2 | 3 | 6 | Un seul champ, ajout en un appui, étape guests facultative, tests chronométrés | Produit |
| RF-4 | Carte peu attractive, peu de partages | 2 | 3 | 6 | Carte travaillée en priorité dans la DA, test « la partagerais-tu ? » (OU-4) | Design |
| RF-5 | Effet de suivisme : les résultats visibles influencent les votes suivants | 3 | 1 | 3 | Accepté : l'aspect collectif fait partie de l'expérience. Top masqué sous 10 participations. | Produit |
| RF-6 | Votes répétés par un petit groupe très motivé | 3 | 2 | 6 | Limite assumée et affichée (RG-RES-07), anti-robot, modération des abus manifestes | Admin |
| RF-7 | Pseudonymes injurieux ou usurpation sur les cartes diffusées | 2 | 2 | 4 | Termes interdits, exclusion rapide, procédure de signalement | Admin |
| RF-8 | Confusion avec une initiative officielle, réaction de l'équipe de l'artiste | 2 | 3 | 6 | Mention partout, aucun visuel non autorisé, prise de contact amont recommandée | Porteur |
| RF-9 | Date du concert modifiée ou concert annulé | 1 | 3 | 3 | Date facultative dans les paramètres, clôture et message modifiables sans développement | Porteur |
| RF-10 | Porteur indisponible pour modérer pendant un pic | 2 | 2 | 4 | Alertes, procédures courtes, outils de modération accessibles sur tablette | Porteur |

### 10.2. Risques techniques

| ID | Risque | P | I | Crit. | Mesure de maîtrise |
|---|---|---|---|---|---|
| RT-1 | Dépassement d'un quota gratuit pendant un pic viral | 2 | 3 | 6 | Architecture statique d'abord, classements précalculés, alertes à 70 %, plans de repli documentés |
| RT-2 | Mise en pause de Supabase pour inactivité | 2 | 3 | 6 | Tâche hebdomadaire de maintien en activité, sonde de disponibilité |
| RT-3 | Erreur dans les politiques d'accès (RLS), donc fuite ou falsification | 1 | 3 | 3 | Tests automatisés de chaque politique en CI, revue sécurité avant ouverture |
| RT-4 | Génération de la carte défaillante sur certains Android ou dans les navigateurs intégrés | 2 | 3 | 6 | Prototype testé dès le lot 5, polices intégrées, images servies depuis la même origine, partage du lien en solution de repli |
| RT-5 | Aperçu WhatsApp incorrect ou mis en cache trop longtemps | 2 | 2 | 4 | Balises générées côté serveur, tests réels sur WhatsApp Android et iOS |
| RT-6 | Robots qui saturent les soumissions | 2 | 2 | 4 | Turnstile, honeypot, taille de requête limitée, exclusion en masse par l'admin |
| RT-7 | Perte de données | 1 | 3 | 3 | Sauvegarde quotidienne, restauration testée avant l'ouverture |
| RT-8 | Version obsolète gardée par le service worker | 2 | 2 | 4 | Message de mise à jour, assets versionnés, aucune donnée dynamique en cache |
| RT-9 | Évolution des conditions des offres gratuites | 2 | 2 | 4 | Revérification au lancement, architecture portable (Postgres standard, Worker simple) |
| RT-10 | Performance dégradée par les animations | 2 | 2 | 4 | Seules `transform` et `opacity` sont animées, `LazyMotion`, budgets contrôlés en CI, `prefers-reduced-motion` |

### 10.3. Risques projet

| ID | Risque | P | I | Crit. | Mesure de maîtrise |
|---|---|---|---|---|---|
| RP-1 | Prérequis non fournis (identité de l'éditeur, catalogue, visuels) | 3 | 3 | 9 | **Le plus critique.** Liste des prérequis avec dates limites (§13). La conception peut avancer en parallèle avec des données factices. |
| RP-2 | Glissement du planning à cause des allers-retours sur le design | 2 | 2 | 4 | Jalons de validation formels, deux tours de retours au maximum par livrable |
| RP-3 | Ajouts de périmètre en cours de route | 2 | 2 | 4 | Toute nouveauté passe par le §6.2. Le MVP reste figé après validation de ce document. |

---

## 11. Critères d'acceptation

### 11.1. Critères fonctionnels

Format : **Étant donné** (contexte), **quand** (action), **alors** (résultat attendu).

| ID | Critère | Règles |
|---|---|---|
| CA-01 | Étant donné un visiteur sur smartphone de 360 px de large, quand il ouvre l'accueil, alors le slogan, le compteur et le bouton « Composer ma tracklist » sont visibles sans défiler. | RG-CAM-02 |
| CA-02 | Étant donné le catalogue chargé, quand le fan tape « eclate », alors un titre nommé « Éclaté » apparaît. | RG-CAT-05 |
| CA-03 | Étant donné 20 morceaux sélectionnés, quand le fan en ajoute un 21e, alors l'ajout est refusé avec un message explicite et la tracklist reste à 20. | RG-TRK-02 |
| CA-04 | Étant donné une tracklist vide, quand le fan cherche à continuer, alors l'action est impossible. | RG-TRK-01 |
| CA-05 | Étant donné une tracklist réordonnée au clavier uniquement, quand elle est validée, alors l'ordre enregistré est celui affiché. | RG-TRK-06 |
| CA-06 | Étant donné 5 guests choisis, quand le fan en choisit un 6e, alors le choix est refusé. | RG-GST-01 |
| CA-07 | Étant donné aucun guest choisi, quand le fan valide, alors la participation est acceptée. | RG-GST-01 |
| CA-08 | Étant donné un pseudo de 1 caractère, de 25 caractères, composé uniquement d'espaces ou contenant un terme interdit, quand il est envoyé directement au serveur sans passer par l'interface, alors la soumission est refusée. | RG-PSE-02 à 06, RG-VAL-01 |
| CA-09 | Étant donné un pseudo déjà utilisé par une autre participation, quand le fan valide, alors la participation est acceptée. | RG-VAL-05 |
| CA-10 | Étant donné une requête contenant un morceau inactif, un doublon ou 21 morceaux, quand elle est envoyée directement au serveur, alors elle est refusée et rien n'est enregistré. | RG-VAL-01, 02 |
| CA-11 | Étant donné une campagne clôturée, quand une soumission arrive, alors elle est refusée et le fan est orienté vers les résultats. | RG-CAM-01 |
| CA-12 | Étant donné un double appui rapide sur « Valider », quand les deux requêtes arrivent, alors une seule tracklist existe et les deux réponses renvoient le même code. | RG-VAL-03 |
| CA-13 | Étant donné une coupure réseau pendant la validation, quand le réseau revient et que le fan appuie sur « Réessayer », alors la participation est enregistrée une seule fois et sa sélection n'a jamais été perdue. | RG-VAL-03, 07, RG-BRO-01 |
| CA-14 | Étant donné une validation réussie, quand la page de confirmation s'affiche, alors le fan peut télécharger une carte PNG 1080 × 1350 lisible et conforme à RG-PAR-01, y compris sur l'Android de référence. | RG-PAR-01 |
| CA-15 | Étant donné un lien `/t/:code` collé dans WhatsApp, quand l'aperçu se génère, alors il affiche le pseudo de l'auteur et l'image de campagne. | RG-PUB-04 |
| CA-16 | Étant donné N tracklists valides, quand on compare la page de résultats à un recalcul complet en base, alors les chiffres sont identiques, au plus 2 minutes après la dernière validation. | RG-RES-01, 02, 06 |
| CA-17 | Étant donné une tracklist exclue par l'admin, quand le recalcul est terminé, alors elle n'est plus comptée et sa page publique affiche « Tracklist introuvable ». | RG-MOD-03, RG-PUB-02 |
| CA-18 | Étant donné un utilisateur non connecté ou connecté sans TOTP, quand il appelle directement les données admin, alors l'accès est refusé. | RG-ADM-02, 03 |
| CA-19 | Étant donné un pseudo commençant par `=`, quand l'export CSV est ouvert dans un tableur, alors la cellule s'affiche comme du texte. | RG-EXP-02 |
| CA-20 | Étant donné un import CSV contenant une ligne invalide, quand l'admin confirme, alors rien n'est importé et la ligne fautive est signalée. | RG-CAT-06 |

### 11.2. Critères non fonctionnels

| ID | Critère | Seuil |
|---|---|---|
| CA-NF-01 | Performance de l'accueil (Lighthouse mobile) | LCP < 2,5 s, INP < 200 ms, CLS < 0,1 |
| CA-NF-02 | Poids de l'accueil | 500 Ko transférés au maximum |
| CA-NF-03 | Test de charge en préproduction | 20 soumissions par seconde et 300 lectures par seconde, 0 % d'erreur serveur (seuils révisables après le premier test) |
| CA-NF-04 | Accessibilité des écrans participants | 0 violation sérieuse ou critique (axe), parcours complet réalisable au clavier, contrastes AA |
| CA-NF-05 | Sécurité | 0 secret dans le bundle, toutes les politiques RLS testées en CI, 0 vulnérabilité `high` |
| CA-NF-06 | Données | Aucune donnée personnelle autre que le pseudo dans la base, les journaux ou les exports |
| CA-NF-07 | Compatibilité | Parcours complet validé sur Chrome Android (dont l'appareil d'entrée de gamme), Safari iOS, navigateur intégré de WhatsApp, Chrome, Firefox et Edge sur ordinateur |
| CA-NF-08 | Responsive | Aucun défilement horizontal ni élément coupé à 360, 390, 768, 1024, 1280 et 1440 px |
| CA-NF-09 | Continuité | Une restauration de sauvegarde et un rollback exécutés avec succès avant l'ouverture |
| CA-NF-10 | Animations | `prefers-reduced-motion` coupe les animations non essentielles. Aucune animation ne retarde une action. |
| CA-NF-11 | Juridique | Mentions légales complètes (éditeur identifié), notice et conditions en ligne, mention d'indépendance sur l'accueil, les cartes et les pages publiques |
| CA-NF-12 | Design | DA et maquettes validées par le porteur, aucun des motifs bannis par le référentiel dev-pro |

### 11.3. Validation par les utilisateurs (avant l'ouverture)

Une session de tests avec **5 fans réels**, sur leur propre téléphone, à partir du prototype puis de la préproduction :

| Mesure | Seuil |
|---|---|
| Compréhension du concept après 10 secondes sur l'accueil | 4 sur 5 |
| Participation complète en moins de 2 minutes, sans aide | 4 sur 5 |
| Intention de partager sa carte | 4 sur 5 |
| Blocage ou incompréhension majeure | 0 |

---

## 12. Décisions à prendre par le porteur

| ID | Question | Décision du 26/11/2026 | Conséquence |
|---|---|---|---|
| D-1 | Les résultats sont-ils visibles pendant toute la campagne ? | **Oui** | Page de résultats publique en permanence. Le suivisme est accepté (RF-5). |
| D-2 | Mesure-t-on une durée de participation anonyme avec chaque soumission ? | **Oui** | Champ `compose_duration_s`, arrondi à 5 s et plafonné à 3 600 s, sans donnée personnelle. Médiane affichée dans le tableau de bord admin (OU-1). |
| D-3 | Faut-il contacter l'équipe de l'artiste avant le lancement ? | **Non** | RF-8 est maintenu à criticité 6. Mesures renforcées : mention d'indépendance sur chaque écran public et sur chaque carte, aucun visuel officiel sans autorisation, procédure de retrait rapide si l'équipe de l'artiste le demande. |
| D-4 | Seuils de publication des classements | **10 et 50 participations** (par défaut) | RG-RES-04 inchangée |
| D-5 | Délai de traitement d'une demande de retrait | **7 jours** (par défaut) | RG-JUR-04 inchangée |
| D-6 | Ouvre-t-on le site au public avant que l'interface d'administration soit livrée ? | **Oui** (26/11/2026) | Ouverture le 17/12 au lieu du 22/12. Du 17 au 22/12, les opérations admin passent par la console SQL selon des procédures testées. Voir `docs/planning/sprints.md` §2. |

---

## 13. Prérequis et échéances

| Élément | Nécessaire pour | Échéance |
|---|---|---|
| Identité de l'éditeur, contact, directeur de publication | Mentions légales | Avant le jalon 5 (production) |
| Références visuelles et éléments autorisés | Direction artistique | Avant le lot L1 |
| Catalogue vérifié (titres, projets, types) | Catalogue et recette | Avant le lot L4 |
| Liste vérifiée des guests et visuels autorisés | Module guests | Avant le lot L4 |
| Dates d'ouverture et de clôture souhaitées | Planning, paramétrage | Avant le lot L0 |
| Réponses aux décisions D-1 à D-5 | Spécifications finales | Avant le lot L3 |
| Comptes gratuits (GitHub, Cloudflare, Supabase, Sentry, UptimeRobot) au nom du porteur | Socle technique | Avant le lot L0 |

---

## 14. Validation du document

| Rôle | Nom | Décision | Date |
|---|---|---|---|
| Porteur du projet | | ☑ Validé ☐ Validé avec réserves ☐ À reprendre | 26/11/2026 |
| Responsable technique | | ☐ Validé ☐ Validé avec réserves ☐ À reprendre | |

Après validation, le périmètre MVP (§6.1) est figé. Toute modification passe par une demande d'évolution, évaluée en délai et en risque.
