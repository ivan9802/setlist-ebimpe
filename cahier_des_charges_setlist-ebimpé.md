# CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE

## HIMRA ULTRA TRACKLIST EXPERIENCE

**Version :** 3.0\
**Date :** 25 novembre 2026\
**Statut :** Spécification de référence pour le MVP\
**Nature du projet :** Initiative indépendante de fans\
**Hébergement cible :** Netlify\
**Backend et base de données :** Supabase

------------------------------------------------------------------------

## 1. Synthèse du projet

### 1.1. Présentation

HIMRA ULTRA TRACKLIST EXPERIENCE est une application web responsive et
participative permettant aux fans de HIMRA de composer leur tracklist
idéale pour le concert prévu à Ebimpé et de sélectionner les artistes invités
(*guests*) qu'ils souhaitent voir partager la scène avec HIMRA.

Chaque participant consulte le catalogue musical disponible, sélectionne
jusqu'à 20 morceaux, organise leur ordre, choisit jusqu'à 5 guests parmi
une liste de candidats vérifiés, renseigne obligatoirement un pseudonyme,
puis valide sa proposition. Les participations sont agrégées
afin de présenter les préférences collectives des fans en temps réel.

Chaque participant peut ensuite consulter et partager une carte
graphique présentant sa tracklist.

L'application est une initiative indépendante de fans. Elle ne doit pas
être présentée comme un service officiel de l'artiste ou de son équipe
sans autorisation explicite.

### 1.2. Vision et proposition de valeur

**Promesse :** « EBIMPÉ SE PRÉPARE. LES ULTRA DÉCIDENT. »

Le produit repose sur trois principes :

1.  **Simplicité :** composer et valider une tracklist en moins de deux
    minutes.
2.  **Immersion :** proposer une identité visuelle cohérente avec
    l'univers musical et graphique associé à HIMRA.
3.  **Viralité :** transformer chaque tracklist en contenu partageable
    qui peut attirer de nouveaux participants.

### 1.3. Objectifs

-   Mobiliser la communauté des fans avant le concert.
-   Recueillir les morceaux que les fans souhaitent entendre.
-   Permettre aux ULTRA de proposer leur sélection de guests parmi une liste administrée et vérifiée.
-   Mesurer séparément la popularité des morceaux et celle des guests.
-   Produire des statistiques fiables sur les préférences exprimées.
-   Encourager le partage des tracklists sur WhatsApp et les réseaux
    sociaux.
-   Fournir à l'équipe qui porte l'initiative un outil simple de suivi
    et d'export des résultats.

### 1.4. Indicateurs de réussite

Les indicateurs suivants seront suivis :

-   Nombre de visiteurs uniques estimés.
-   Nombre de tracklists validées.
-   Taux de conversion entre visites et participations validées.
-   Nombre total de sélections de morceaux.
-   Nombre de partages déclenchés ou estimés.
-   Sources de trafic, lorsque la mesure est disponible et respectueuse
    de la vie privée.
-   Répartition des participations dans le temps.

Les résultats expriment les préférences des participants à
l'application. Ils ne constituent pas un sondage représentatif de
l'ensemble des fans.

------------------------------------------------------------------------

## 2. Périmètre du projet

### 2.1. Fonctionnalités incluses dans le MVP

Le MVP (produit minimum viable) comprend :

-   Une page d'accueil présentant la campagne.
-   Un catalogue musical administrable.
-   Une recherche de morceaux.
-   Des filtres par projet musical et type de sortie.
-   La sélection de 1 à 20 morceaux.
-   La réorganisation des morceaux sélectionnés.
-   La saisie obligatoire d'un pseudonyme.
-   La validation anonyme, sans création de compte fan.
-   L'enregistrement des participations dans Supabase.
-   Une page de confirmation.
-   Une page de résultats actualisés en temps réel.
-   La génération d'une carte de partage.
-   Le partage par lien et via WhatsApp.
-   Un espace administrateur protégé.
-   L'export des participations et des résultats en CSV.
-   La possibilité d'ouvrir ou de clôturer la campagne.

### 2.2. Fonctionnalités exclues du MVP

Les fonctionnalités suivantes ne sont pas prévues dans la première
version :

-   Comptes personnels pour les fans.
-   Profils publics et historiques personnels.
-   Commentaires et messagerie.
-   Battles ou duels entre morceaux.
-   Votes séparés par catégorie.
-   Classement des participants.
-   Notifications push.
-   Application mobile native.
-   Diffusion ou écoute de morceaux dans l'application.
-   Modification d'une tracklist après validation.

Ces fonctionnalités pourront être étudiées après le lancement, selon les
retours et les moyens disponibles.

### 2.3. Public cible

-   Fans de HIMRA et membres de la communauté ULTRA.
-   Utilisateurs de smartphones en Côte d'Ivoire.
-   Visiteurs provenant principalement de WhatsApp, Instagram, TikTok,
    Facebook ou d'un lien direct.

L'interface doit être conçue en priorité pour les smartphones et rester
utilisable sur tablette et ordinateur.

------------------------------------------------------------------------

## 3. Utilisateurs et droits

### 3.1. Participant

Le participant n'a pas besoin de créer un compte ni de définir un mot de passe. Quatre informations sont obligatoires à chaque participation : **pseudonyme, adresse e-mail, pays et ville**. Elles sont validées côté client et côté serveur.

Il peut :

-   Consulter le catalogue.
-   Rechercher et filtrer les morceaux.
-   Sélectionner jusqu'à 20 morceaux.
-   Choisir jusqu'à 5 guests parmi les candidats actifs (choix facultatif si le participant ne souhaite pas en sélectionner).
-   Réorganiser sa sélection.
-   Retirer un morceau avant validation.
-   Renseigner un pseudonyme obligatoire.
-   Renseigner une adresse e-mail valide et obligatoire.
-   Sélectionner un pays obligatoire.
-   Renseigner une ville obligatoire.
-   Valider une participation.
-   Consulter les résultats collectifs.
-   Consulter et partager sa tracklist après validation.

Le pseudonyme est un nom d'affichage communautaire. Il ne constitue pas une preuve d'identité. L'e-mail, le pays et la ville sont privés et ne doivent jamais apparaître sur la page publique, la carte de partage ou les classements.

### 3.2. Administrateur unique

Un seul compte administrateur est prévu pour le MVP.

L'administrateur peut :

-   Se connecter à l'espace privé.
-   Consulter les indicateurs généraux.
-   Créer, modifier, activer et désactiver les projets musicaux.
-   Créer, modifier, activer et désactiver les morceaux.
-   Consulter les participations validées.
-   Consulter les classements.
-   Exporter les données en CSV.
-   Ouvrir ou clôturer les participations.
-   Modifier les paramètres de campagne autorisés.

Aucun formulaire d'inscription administrateur public ne doit être
disponible. Le compte initial doit être créé de manière contrôlée dans
Supabase Auth.

------------------------------------------------------------------------

## 4. Parcours utilisateur

### 4.1. Parcours principal

1.  Le visiteur ouvre le lien de l'application.
2.  Il découvre la campagne et son objectif.
3.  Il clique sur **« Construire ma tracklist »**.
4.  Il consulte le catalogue et sélectionne ses morceaux.
5.  Il organise leur ordre, dans la limite de 20 titres.
6.  Il sélectionne jusqu'à 5 guests (choix facultatif).
7.  Il renseigne les quatre champs obligatoires : pseudonyme, adresse e-mail,
    pays et ville.
8.  Il vérifie le récapitulatif et prend connaissance des conditions de
    participation et de la notice de confidentialité.
9.  Il valide sa proposition.
10. Le système enregistre une nouvelle participation et retourne un
    identifiant public.
11. Le participant accède à sa page de confirmation.
12. Il génère et partage sa carte, qui n'affiche que son pseudonyme,
    ses morceaux et ses guests.
13. Il peut consulter les classements collectifs des morceaux et des guests.

Une personne peut recommencer ce parcours autant de fois qu'elle le souhaite
tant que la campagne est ouverte. Chaque soumission constitue une participation
distincte, même si elle réutilise le même pseudonyme ou la même adresse e-mail.

### 4.2. Objectif de durée

Le parcours doit pouvoir être réalisé en moins de deux minutes pour un
utilisateur qui connaît déjà les morceaux qu'il souhaite sélectionner.

Pour atteindre cet objectif :

-   La recherche doit être immédiatement visible.
-   Les cartes de morceaux doivent être compactes.
-   L'ajout et le retrait doivent être simples.
-   La sélection en cours doit rester visible.
-   Les quatre champs obligatoires sont demandés au moment de la validation : pseudonyme, e-mail, pays et ville.
-   Le formulaire distingue les informations publiques (pseudonyme) des informations privées (e-mail, pays, ville).
-   Le pays est choisi dans une liste normalisée ; la ville est saisie librement et nettoyée côté serveur.
-   Le choix des guests doit être intégré au même parcours, sans étape inutile.
-   Le formulaire final doit rester court.
-   Les étapes inutiles et les créations de compte sont exclues.

### 4.3. Parcours administrateur

1.  L'administrateur ouvre l'URL privée.
2.  Il s'authentifie.
3.  Il consulte le tableau de bord.
4.  Il gère le catalogue ou consulte les participations.
5.  Il exporte les résultats si nécessaire.
6.  Il peut clôturer la campagne.

------------------------------------------------------------------------

## 5. Spécifications fonctionnelles

### 5.1. Page d'accueil

La page d'accueil doit présenter :

-   Le nom et l'identité visuelle de la campagne.
-   Un visuel principal autorisé.
-   Le slogan de la campagne.
-   Une explication courte du principe.
-   Un bouton principal de démarrage.
-   Le nombre de participations validées.
-   Un aperçu du classement des morceaux et des guests.
-   Un accès direct à la sélection des guests.
-   Un accès aux résultats.
-   Une mention indiquant que l'initiative est indépendante de
    l'artiste, sauf partenariat autorisé.

Le bouton principal doit être visible sans défilement excessif sur
smartphone.

### 5.2. Catalogue musical

Le catalogue est administré depuis l'espace privé.

Chaque morceau comprend au minimum :

  -----------------------------------------------------------------------
  Champ                   Description             Règle
  ----------------------- ----------------------- -----------------------
  Titre                   Nom du morceau          Obligatoire

  Projet                  Album, EP, single ou    Obligatoire ou
                          autre projet            catégorie « hors projet
                                                  »

  Type                    Solo, collaboration,    Obligatoire
                          freestyle, autre        

  Année                   Année de sortie         Facultatif si inconnue

  Pochette                URL d'une image         Facultatif
                          autorisée               

  Durée                   Durée en secondes       Facultatif

  Statut                  Actif ou inactif        Obligatoire

  Ordre d'affichage       Position dans le        Facultatif
                          catalogue               
  -----------------------------------------------------------------------

Le catalogue dit « complet » doit être constitué à partir de sorties
vérifiées. Il ne faut pas inventer de titres, de collaborations, de
dates ou de durées pour compléter les informations manquantes.

L'administrateur doit pouvoir importer ou mettre à jour le catalogue à
partir d'un fichier CSV selon un modèle documenté.

### 5.3.1. Catalogue des guests

L'application propose une liste de guests que les ULTRA peuvent choisir pour le concert. Cette liste est administrée et ne doit contenir que des artistes dont le nom, l'identité publique et la pertinence pour la campagne ont été vérifiés par le responsable du projet. Aucun guest ne doit être présenté comme confirmé ou officiellement annoncé si cette information n'a pas été communiquée par une source autorisée.

Chaque fiche guest comprend : nom d'artiste (obligatoire), visuel ou portrait autorisé (facultatif), courte description (facultative), lien de référence (facultatif), statut actif/inactif, ordre d'affichage et éventuelle catégorie. L'administrateur peut ajouter, modifier, désactiver et réordonner les candidats. Une désactivation ne doit pas effacer les choix déjà enregistrés.

La liste affichée aux participants doit être explicitement présentée comme une sélection de souhaits des fans, et non comme une annonce de programmation.

### 5.3. Recherche et filtres

L'utilisateur doit pouvoir :

-   Rechercher un morceau par titre.
-   Filtrer par album, EP, single ou autre projet.
-   Filtrer par type de morceau.
-   Effacer les filtres.
-   Voir un état vide clair si aucun résultat ne correspond.

La recherche doit être tolérante aux majuscules et minuscules. La prise
en charge des accents est recommandée.

### 5.4. Construction de la tracklist

Règles fonctionnelles :

-   Une tracklist contient au minimum 1 morceau et au maximum 20
    morceaux.
-   Un morceau ne peut apparaître qu'une seule fois dans une même
    tracklist.
-   Seuls les morceaux actifs peuvent être ajoutés.
-   L'utilisateur peut retirer un morceau avant validation.
-   L'utilisateur peut réorganiser les morceaux.
-   L'ordre final est conservé lors de l'enregistrement.
-   Le compteur de sélection est visible, par exemple `12 / 20`.
-   Le bouton de validation est désactivé si aucune sélection n'est
    effectuée.
-   Un message explique clairement lorsque la limite de 20 morceaux est
    atteinte.

La sélection en cours peut être conservée temporairement dans le
navigateur afin d'éviter sa perte lors d'un rafraîchissement accidentel.
Elle ne doit pas être considérée comme une participation validée.

### 5.5. Sélection des guests

Le participant peut sélectionner **jusqu'à 5 guests** dans la liste active. La sélection est facultative : il peut valider sa participation sans choisir de guest. Un même guest ne peut être sélectionné qu'une seule fois par participation.

L'interface doit présenter les guests sous forme de cartes visuelles attractives avec nom lisible, portrait uniquement si son utilisation est autorisée, et état sélectionné/non sélectionné immédiatement perceptible. Un compteur (ex. « 3 / 5 guests ») reste visible. L'utilisateur peut retirer un guest avant validation. La sélection des guests est indépendante de la tracklist : choisir un guest ne consomme pas une place parmi les 20 morceaux.

Les choix sont enregistrés avec la participation et agrégés séparément. Le classement des guests repose sur le nombre de participations valides qui les ont sélectionnés. Le système ne doit pas additionner les votes de guests aux statistiques des morceaux.

### 5.6. Informations obligatoires du participant

Chaque soumission doit comporter quatre champs obligatoires :

| Champ | Règle | Utilisation |
|---|---|---|
| Pseudonyme | 2 à 24 caractères | Nom public sur la tracklist et la carte |
| Adresse e-mail | Format valide | Contact lié à la participation |
| Pays | Sélection dans une liste normalisée | Statistiques géographiques |
| Ville | 2 à 80 caractères après nettoyage | Statistiques géographiques |

Règles :
- Aucun compte fan ni mot de passe ne sont nécessaires.
- Les quatre champs sont requis à chaque nouvelle participation, même si la personne a déjà participé.
- L'e-mail et le pseudonyme ne sont pas uniques : leur réutilisation ne bloque jamais une nouvelle soumission.
- Le pays est stocké avec un code ISO 3166-1 alpha-2 et un libellé.
- L'e-mail est contrôlé côté client et serveur. Ne pas le présenter comme vérifié sans mécanisme de vérification.
- La notice de confidentialité est présentée avant validation. Tout consentement marketing éventuel doit être facultatif, distinct et décoché par défaut.

Confidentialité :
- Seul le pseudonyme apparaît sur la page publique et la carte.
- L'e-mail, le pays et la ville ne sont jamais exposés dans les URL, pages publiques, cartes ou résultats individuels.
- Le pays et la ville peuvent alimenter des statistiques agrégées.
- L'accès aux coordonnées détaillées est réservé à l'administrateur autorisé.

### 5.7. Saisie du pseudonyme

**Le pseudonyme est obligatoire.**

Règles proposées :

-   Longueur minimale : 2 caractères.
-   Longueur maximale : 24 caractères.
-   Suppression des espaces inutiles au début et à la fin.
-   Refus d'une valeur vide ou composée uniquement d'espaces.
-   Refus des caractères de contrôle.
-   Affichage du pseudonyme sur la page de confirmation et la carte de
    partage.
-   Le pseudonyme n'a pas besoin d'être unique.
-   Les pseudonymes ne doivent pas être utilisés comme mécanisme
    d'authentification.

Les caractères autorisés doivent permettre les pseudonymes usuels, y
compris les lettres accentuées, chiffres, espaces, tirets et
underscores. Les règles exactes doivent être identiques côté client et
côté serveur.

Le pseudonyme étant public sur la carte de partage, l'interface doit
avertir le participant de ne pas saisir de données personnelles
sensibles.

### 5.7. Validation de la participation

Avant l'enregistrement, le serveur doit vérifier :

1.  Que la campagne est ouverte.
2.  Que le pseudonyme est présent et valide.
3.  Que la sélection contient entre 1 et 20 morceaux.
4.  Que les identifiants de morceaux sont valides.
5.  Qu'aucun morceau n'est présent plusieurs fois.
6.  Que tous les morceaux sont actifs.
7.  Que la sélection de guests contient au maximum 5 identifiants valides, sans doublon.
8.  Que tous les guests sélectionnés sont actifs au moment de la validation.
9.  Que la requête respecte les contrôles anti-abus.

L'enregistrement du participant, de la tracklist et des morceaux
associés doit être atomique : soit toutes les données sont enregistrées,
soit aucune ne l'est.

Après validation, le serveur retourne un identifiant de participation
non séquentiel et difficile à deviner.

**Règle de modification :** une participation validée est définitive
dans le MVP. Une correction nécessitera une intervention de
l'administrateur selon une procédure documentée, ou une nouvelle
campagne si cette règle est modifiée ultérieurement.

### 5.8. Prévention des participations abusives

La participation ne nécessite pas de compte ni de mot de passe. **Une même personne peut participer autant de fois qu'elle le souhaite** tant que la campagne est ouverte. Une nouvelle soumission ne doit pas être bloquée en raison d'un e-mail, pseudonyme, pays ou ville déjà utilisé.

Mesures minimales :

-   Générer un identifiant aléatoire côté navigateur.
-   Utiliser cet identifiant comme signal de détection des soumissions
    répétées, et non comme preuve d'identité.
-   Limiter le nombre de requêtes côté serveur.
-   Valider les données côté serveur.
-   Prévoir une protection anti-robot, par exemple CAPTCHA, si le trafic
    ou les abus le justifient.
-   Enregistrer les événements techniques strictement nécessaires à la
    sécurité.
-   Permettre à l'administrateur d'identifier et d'exclure des
    participations manifestement frauduleuses selon une procédure
    traçable.

Ne pas exposer publiquement les identifiants techniques, les adresses IP
ou les données internes de sécurité.

### 5.9. Résultats en temps réel

La page publique des résultats doit afficher :

-   Le nombre de participations valides.
-   Le nombre total de sélections.
-   Le top 10 des morceaux les plus sélectionnés.
-   Le top 5 des morceaux placés en première position.
-   Le classement des guests les plus sélectionnés, avec le nombre et le pourcentage de participations les ayant choisis.
-   Le classement par projet musical, si les données le permettent.

Définitions :

-   **Sélections d'un morceau :** nombre de tracklists validées
    contenant ce morceau.
-   **Premières positions :** nombre de tracklists validées dans
    lesquelles le morceau est placé en position 1.
-   **Participations :** nombre de tracklists valides enregistrées.

Les classements sont calculés à partir des données enregistrées. Le
navigateur ne doit jamais pouvoir modifier directement les compteurs.

L'interface utilise Supabase Realtime pour recevoir les changements. Un
mécanisme de rechargement périodique ou manuel doit rester disponible en
cas de perte de connexion temps réel.

Les résultats doivent afficher leur date ou heure de dernière
actualisation.

### 5.10. Carte de partage

Après validation, le participant peut générer une carte personnalisée
contenant :

-   Le nom de la campagne.
-   Le pseudonyme obligatoire.
-   La liste ordonnée des morceaux.
-   Les guests choisis par le participant, dans un bloc graphique distinct.
-   Le numéro de chaque morceau.
-   Un identifiant ou lien public de consultation.
-   Une identité graphique cohérente.
-   Une mention de l'initiative indépendante.

Format recommandé : portrait 1080 × 1350 pixels pour les publications
sociales. Une variante 1080 × 1920 pixels pourra être ajoutée pour les
stories si le temps le permet.

Actions :

-   Télécharger la carte au format PNG.
-   Copier le lien public.
-   Partager le lien via WhatsApp.
-   Utiliser le partage natif du navigateur lorsque disponible.

Le partage WhatsApp doit utiliser un lien et un texte prérempli. Le
téléchargement de l'image reste nécessaire pour les plateformes qui ne
permettent pas de publier directement une image générée par le
navigateur.

### 5.11. Page publique d'une tracklist

Chaque tracklist validée possède une URL publique non devinable
facilement.

La page affiche :

-   Le pseudonyme.
-   Les morceaux dans leur ordre.
-   Les guests sélectionnés, présentés comme des souhaits personnels du participant.
-   La date de validation, si elle est utile.
-   Un bouton pour construire sa propre tracklist.
-   Un bouton de partage.

Ne jamais afficher de données techniques ou personnelles non
nécessaires.

### 5.12. Administration

L'espace administrateur comprend les modules suivants :

  Module            Fonctions
  ----------------- ------------------------------------------
  Tableau de bord   Participations, sélections, tendances
  Projets           Ajouter, modifier, activer, désactiver
  Morceaux          CRUD, statut, ordre, import CSV
  Guests            CRUD, visuels autorisés, statut, ordre d'affichage
  Participations    Consulter les tracklists validées
  Résultats         Classements morceaux et guests, statistiques séparées
  Export            CSV des participations et des sélections
  Campagne          Ouvrir ou clôturer les participations

Les actions sensibles doivent être protégées côté serveur et par les
politiques d'accès de la base de données. Masquer un bouton dans
l'interface ne constitue pas une mesure de sécurité.

------------------------------------------------------------------------

## 6. Direction artistique, design produit et motion design — priorité absolue

### 6.1. Principe directeur

Le design est le facteur différenciant majeur de HIMRA ULTRA TRACKLIST EXPERIENCE. L'application ne doit jamais donner l'impression d'un formulaire de sondage, d'un tableau de bord SaaS générique ou d'un simple site promotionnel. Elle doit être vécue comme une **extension interactive de l'univers artistique de HIMRA** : une expérience musicale, urbaine, intense, immersive et mémorable.

À chaque écran, le fan doit ressentir qu'il entre dans un espace conçu pour la culture ULTRA. Le parcours doit évoquer l'énergie d'un lancement musical, les codes d'un univers visuel de projet artistique et l'intensité d'un événement live. L'utilisateur ne fait pas que cocher des titres : il compose sa programmation rêvée et prend part à la mobilisation de la communauté.

**Règle de conception :** la direction artistique doit être définie avant la production des composants fonctionnels. Les maquettes haute fidélité des écrans clés doivent être validées avant l'intégration complète. La qualité visuelle, la cohérence et la fluidité sont des critères de recette au même niveau que les fonctionnalités.

### 6.2. Références et fidélité à l'identité de HIMRA

Avant de concevoir l'interface, l'équipe design doit constituer un mini-dossier de direction artistique à partir de références vérifiables et autorisées :
- pochettes de projets, visuels de communication et affiches fournis ou validés ;
- photographies officielles ou autorisées de l'artiste ;
- typographies, logos, symboles et éléments graphiques fournis par les ayants droit ou le porteur de campagne ;
- codes visuels récurrents observés dans les supports de campagne validés.

Ne pas inventer de logo, de signature, de slogan attribué à l'artiste ou de codes prétendument officiels. Ne pas reproduire sans autorisation une pochette, une affiche ou une photographie. En l'absence de kit officiel, créer une direction originale inspirée de l'énergie musicale et des références validées, sans prétendre représenter la charte officielle de HIMRA.

La palette noir profond / anthracite / rouge / blanc cassé proposée dans la version précédente est une **base de travail**, pas une vérité définitive. Elle doit être ajustée après analyse des références visuelles réellement fournies. Les couleurs, textures et effets doivent former un système cohérent plutôt qu'une accumulation d'effets.

### 6.3. Univers graphique attendu

L'intention visuelle recherchée :
- **Cinématographique :** compositions fortes, cadrages assumés, profondeur, lumière directionnelle et transitions qui rappellent un générique ou un teaser musical.
- **Urbain et brut :** textures discrètes, grain fin, contrastes, typographie expressive, détails graphiques inspirés de l'affiche et de l'éditorial musical.
- **Énergique :** accents lumineux, pulsations visuelles, changements de rythme et micro-interactions réactives.
- **Premium et maîtrisé :** peu d'éléments simultanés, alignements précis, espaces respirants, visuels de qualité et animations propres.
- **Communautaire :** la présence des ULTRA doit être visible dans les compteurs, les sélections, les résultats et les créations partageables.

Éviter les clichés graphiques gratuits, les flammes ou éclairs systématiques, les effets gaming génériques, les dégradés décoratifs sans fonction, les animations permanentes et les fonds trop chargés. Chaque effet doit renforcer le récit, guider l'action ou donner du relief à l'univers.

### 6.4. Système de design

Créer un mini design system documenté avant le développement :
- palette avec couleurs principales, secondaires, états et contrastes ;
- échelle typographique : titre héroïque, titres de section, sous-titres, texte, légendes et données ;
- grille, marges, espacements, rayons, bordures et règles de composition ;
- styles des boutons, cartes, champs, filtres, badges, compteurs et modales ;
- états par défaut, survol, focus, sélection, chargement, succès, erreur et désactivation ;
- règles d'utilisation des photographies, pochettes et portraits ;
- tokens d'animation : durée, courbe d'accélération, distance, intensité et déclencheur.

Typographie recommandée : une police d'affichage condensée, forte et expressive pour les grands titres, associée à une sans-serif très lisible pour les contenus et à une police à chiffres tabulaires pour les compteurs. Les polices doivent être licenciées ou librement utilisables et optimisées pour le web.

### 6.5. Expérience écran par écran

**A. Écran d'accueil — entrée dans l'univers**

L'écran d'accueil doit agir comme une ouverture de campagne :
- visuel principal immersif, avec photographie ou artwork autorisé ;
- titre de campagne très visible, composition typographique forte ;
- phrase d'accroche courte qui explique que les ULTRA construisent la soirée qu'ils veulent vivre ;
- deux actions immédiatement compréhensibles : « Composer ma tracklist » et « Choisir mes guests » (ou une entrée unique qui lance le parcours complet) ;
- compteur communautaire réel, intégré au design ;
- aperçu animé des morceaux et des guests qui émergent dans l'univers graphique ;
- mention discrète mais lisible de l'initiative indépendante.

La première vue mobile doit présenter l'identité, la promesse et l'action principale sans obliger à parcourir une longue page.

**B. Sélection des morceaux — le studio de composition**

Présenter le catalogue comme une collection musicale éditorialisée, pas comme une longue liste administrative :
- pochettes ou visuels de projets lorsqu'ils sont disponibles et autorisés ;
- recherche immédiatement accessible ;
- filtres sous forme de contrôles compacts ;
- cartes de titres avec hiérarchie claire ;
- action d'ajout très visible et retour visuel instantané ;
- panneau ou tiroir « Ma tracklist » toujours accessible ;
- compteur de progression « X / 20 » ;
- réorganisation tactile et accessible de l'ordre des titres.

Sur mobile, la tracklist en cours peut être présentée dans un tiroir inférieur (*bottom sheet*) qui s'ouvre sans quitter le catalogue. Sur ordinateur, prévoir une composition en deux zones : catalogue à gauche, sélection à droite.

**C. Sélection des guests — le casting rêvé des ULTRA**

Créer un écran ou une section dédiée, visuellement distincte de la sélection musicale tout en conservant le même langage graphique. Les guests apparaissent dans une galerie de cartes éditoriales :
- portrait autorisé ou visuel typographique de remplacement ;
- nom d'artiste très lisible ;
- éventuelle courte information vérifiée ;
- action de sélection claire ;
- état sélectionné mis en valeur par un contour, une lumière ou un changement de composition ;
- compteur « X / 5 » ;
- possibilité de retirer un choix facilement.

Le choix doit être présenté comme une préférence des fans : libellés tels que « Les guests que je veux voir sur scène » et « Mon casting idéal ». Ne jamais employer « guests confirmés » ou « programmation officielle » sans validation explicite de l'organisation.

**D. Récapitulatif et pseudonyme**

Créer un écran de récapitulatif qui met en scène les choix : tracklist ordonnée, guests retenus, pseudonyme obligatoire et consentement. Le pseudonyme doit être traité comme une signature communautaire, sans être présenté comme une identité vérifiée. L'action finale doit être explicite et valorisante : « Valider ma proposition ».

**E. Confirmation — moment de récompense**

Après une sauvegarde confirmée par le serveur, déclencher une séquence courte de confirmation : apparition de la composition, mise en avant du pseudonyme, animation de validation et accès direct à la carte partageable. Ne pas afficher de succès avant la confirmation réelle du backend.

**F. Résultats communautaires — la force collective**

Créer une page de résultats à forte valeur visuelle :
- deux classements séparés : morceaux et guests ;
- barres ou indicateurs animés lors de l'arrivée de nouvelles données ;
- compteurs réels et heure de mise à jour ;
- mise en avant du top 3 sans masquer les autres résultats ;
- filtres ou vues par catégorie uniquement si les volumes de données le justifient.

Les animations de classement doivent rester sobres et ne pas faire croire à un changement de résultat qui n'a pas eu lieu.

**G. Cartes de partage — transformer les fans en relais**

La carte PNG doit être un véritable objet graphique de campagne : forte typographie, hiérarchie, pseudonyme, tracklist, guests choisis, identité visuelle cohérente et mention de l'initiative indépendante. Prévoir une version portrait 1080 × 1350 et, si possible, une version story 1080 × 1920. Chaque carte doit être lisible sur smartphone et conserver une bonne qualité après export.

### 6.6. Motion design et grammaire d'animation

Le motion design est un pilier de l'immersion, mais il doit rester intentionnel, fluide et performant. Utiliser Framer Motion pour les transitions d'interface et les micro-interactions, avec CSS pour les effets simples. Ne pas animer tous les éléments en permanence.

**Séquence d'entrée :**
- apparition progressive du visuel principal ;
- révélation du titre par masque ou léger décalage vertical ;
- arrivée du slogan et du bouton principal ;
- micro-mouvement discret d'un élément graphique de fond ;
- durée totale cible : environ 1 à 1,5 seconde, avec possibilité d'ignorer l'animation lors d'une visite répétée.

**Navigation et transitions :**
- transitions courtes entre les étapes, avec fondu et déplacement léger ;
- changement d'écran sans flash blanc ni rupture brutale ;
- transitions de 180 à 350 ms pour les interactions courantes ;
- cohérence de direction : les éléments avancent dans le sens du parcours ;
- préserver le contexte et éviter les animations qui donnent l'impression de recharger toute l'application.

**Sélection d'un morceau ou d'un guest :**
- retour immédiat au toucher/clic ;
- légère mise à l'échelle ou élévation de la carte ;
- apparition d'un signe de sélection ;
- compteur qui évolue avec une transition courte ;
- animation de retrait distincte mais discrète ;
- aucune animation ne doit retarder la possibilité de continuer.

**Réorganisation de la tracklist :**
- déplacement fluide des cartes ;
- indication visuelle de la position cible ;
- retour tactile si disponible ;
- solution alternative accessible au clavier et par boutons « Monter / Descendre ».

**Compteurs et classements :**
- animation numérique courte lors d'une mise à jour réelle ;
- barres de progression qui se recalculent sans saut excessif ;
- respect de la stabilité visuelle pour éviter les déplacements de contenu.

**Validation :**
- état de chargement du bouton ;
- confirmation visuelle après réponse serveur positive ;
- animation de célébration brève, jamais bloquante ;
- messages d'erreur lisibles, sans animation agressive.

**Arrière-plans et détails :**
- grain ou texture subtile, éventuellement animée très lentement ;
- halo lumineux ou reflet réservé aux éléments importants ;
- parallaxe légère uniquement sur les appareils capables de l'afficher sans perte de fluidité ;
- aucune vidéo de fond lourde en lecture automatique sur mobile.

### 6.7. Performance, accessibilité et confort

Le motion design ne doit jamais nuire à la vitesse ou à l'accessibilité :
- respecter `prefers-reduced-motion` et proposer une expérience sans animation ;
- ne pas faire dépendre une action ou une information d'un effet animé ;
- éviter les clignotements, flashs et mouvements rapides répétés ;
- privilégier `transform` et `opacity` plutôt que des animations coûteuses ;
- charger les images à la bonne taille, utiliser des formats modernes et le lazy loading ;
- prévoir des placeholders et des états de chargement élégants ;
- viser une navigation fluide sur smartphone Android courant et réseau mobile ;
- garder les contrôles tactiles suffisamment grands ;
- assurer les contrastes, les focus clavier et les annonces accessibles des changements d'état.

### 6.8. Livrables design obligatoires avant développement complet

Le prestataire ou l'équipe doit produire :
1. Un moodboard justifié à partir des références validées.
2. Une proposition de direction artistique avec palette, typographies, textures et règles photographiques.
3. Un design system / UI kit.
4. Les maquettes haute fidélité mobile et desktop des écrans accueil, sélection des morceaux, sélection des guests, récapitulatif, confirmation et résultats.
5. Un prototype cliquable des principaux parcours.
6. Un storyboard des animations principales avec durée et déclencheur.
7. Les déclinaisons de la carte de partage.
8. Une courte note de performance et d'accessibilité du motion design.

Aucune intégration visuelle définitive ne doit commencer avant validation de la direction artistique et du prototype des parcours essentiels.

### 6.9. Écrans à concevoir

1. Accueil / entrée dans l'univers.
2. Catalogue et recherche des morceaux.
3. Construction et réorganisation de la tracklist.
4. Galerie de sélection des guests.
5. Récapitulatif et saisie du pseudonyme.
6. Confirmation et carte partageable.
7. Classements collectifs morceaux et guests.
8. Consultation d'une participation partagée.
9. Connexion administrateur.
10. Tableau de bord administrateur.
11. Gestion des morceaux et des guests.
12. Consultation et export des participations.

### 6.10. Responsive design

Approche mobile-first :
- navigation simple et immersive sur smartphone ;
- cartes adaptées au tactile ;
- panneau de sélection accessible sans perdre le contexte ;
- galerie de guests fluide ;
- boutons suffisamment grands ;
- aucun défilement horizontal ;
- compositions plus amples sur tablette et ordinateur ;
- expérience administrateur optimisée pour ordinateur et tablette.

### 6.11. Accessibilité

- Contraste suffisant entre texte et fond.
- Navigation clavier sur tous les éléments interactifs.
- Libellés explicites et états de focus visibles.
- Messages d'erreur compréhensibles.
- Ne pas utiliser uniquement la couleur pour communiquer un état.
- Alternative au glisser-déposer.
- Respect de la préférence de réduction des animations.
- Les images informatives disposent d'un texte alternatif pertinent.

------------------------------------------------------------------------

## 7. Architecture technique

### 7.1. Stack recommandée

  Couche              Technologie         Rôle
  ------------------- ------------------- -----------------------------
  Interface           React               Composants et interactions
  Langage             TypeScript          Typage
  Build               Vite                Compilation
  Styles              Tailwind CSS        Design responsive
  Navigation          React Router        Routes
  Animations          Framer Motion       Transitions
  Glisser-déposer     dnd-kit             Réorganisation
  Backend et base     Supabase            PostgreSQL et API
  Temps réel          Supabase Realtime   Actualisation des résultats
  Auth admin          Supabase Auth       Connexion administrateur
  Graphiques          Recharts            Statistiques
  Image               html-to-image       Génération des cartes
  Fonctions serveur   Netlify Functions   Opérations contrôlées
  Hébergement         Netlify             Publication
  Versionnement       GitHub              Historique du code

Les versions des dépendances doivent être fixées dans le fichier de
verrouillage du projet et mises à jour de manière contrôlée.

### 7.2. Architecture logique

``` text
Navigateur utilisateur
        |
        v
Application React / Vite
        |
        +---- Pages publiques
        |       +---- Accueil
        |       +---- Catalogue / Builder
        |       +---- Confirmation
        |       +---- Résultats
        |       +---- Tracklist publique
        |
        +---- Espace administrateur
        |
        v
Services applicatifs
        |
        +---- Supabase : lecture publique autorisée
        |
        +---- Netlify Functions : opérations sensibles
                         |
                         v
                    Supabase
                         |
             +-----------+-----------+
             |           |           |
          PostgreSQL   Auth       Realtime
```

### 7.3. Règles d'architecture

-   Le frontend ne contient aucune clé secrète.
-   Les opérations de validation passent par une fonction serveur ou une
    fonction PostgreSQL sécurisée.
-   Les contrôles métier sont répétés côté serveur.
-   Les statistiques sont calculées à partir des données persistées.
-   Les accès à l'administration sont vérifiés côté serveur et en base.
-   Les erreurs techniques sont journalisées sans exposer de secrets.

### 7.4. Netlify Functions et Supabase

Les Netlify Functions sont utilisées pour les opérations qui nécessitent
une validation serveur, notamment :

-   Soumission d'une tracklist.
-   Contrôles anti-abus.
-   Export administratif.
-   Opérations nécessitant une clé serveur.

Une fonction PostgreSQL RPC peut gérer la transaction de soumission. Le
choix entre RPC et Netlify Function doit être documenté. Si une fonction
Netlify appelle une RPC, les permissions et l'identité de l'appelant
doivent être contrôlées dans la base.

------------------------------------------------------------------------

## 8. Modèle de données

Le modèle comporte huit tables métier principales, dont deux tables dédiées aux guests et à leur sélection.

### 8.1. `projects`

  Champ          Type          Contraintes
  -------------- ------------- --------------------------
  id             UUID          Clé primaire
  name           TEXT          Obligatoire
  project_type   TEXT          album, EP, single, autre
  release_year   SMALLINT      Facultatif
  cover_url      TEXT          Facultatif
  is_active      BOOLEAN       Défaut true
  created_at     TIMESTAMPTZ   Défaut now()

### 8.2. `tracks`

  Champ              Type          Contraintes
  ------------------ ------------- ----------------------------------------
  id                 UUID          Clé primaire
  project_id         UUID          Clé étrangère, nullable si hors projet
  title              TEXT          Obligatoire
  track_type         TEXT          Obligatoire
  release_year       SMALLINT      Facultatif
  duration_seconds   INTEGER       Facultatif
  cover_url          TEXT          Facultatif
  is_active          BOOLEAN       Défaut true
  display_order      INTEGER       Facultatif
  created_at         TIMESTAMPTZ   Défaut now()

### 8.3. `guests`

Cette table contient les artistes invités proposés au choix des participants.

  Champ          Type          Contraintes
  -------------- ------------- ---------------------------------------------
  id             UUID          Clé primaire
  artist_name    TEXT          Obligatoire
  description    TEXT          Facultatif, information vérifiée
  image_url      TEXT          Facultatif, visuel autorisé uniquement
  reference_url  TEXT          Facultatif
  display_order  INTEGER       Ordre d'affichage
  is_active      BOOLEAN       Défaut true
  created_at     TIMESTAMPTZ   Défaut now()

### 8.4. `participants`

Cette table conserve les informations fournies pour **une participation donnée**. Une nouvelle ligne est créée à chaque soumission ; une même personne peut donc avoir plusieurs lignes.

| Champ | Type | Contraintes |
|---|---|---|
| id | UUID | Clé primaire |
| nickname | VARCHAR(24) | Obligatoire, 2 à 24 caractères |
| email | TEXT | Obligatoire, format contrôlé côté serveur |
| country_code | CHAR(2) | Obligatoire, code ISO 3166-1 alpha-2 |
| country_name | TEXT | Obligatoire |
| city | VARCHAR(80) | Obligatoire, 2 à 80 caractères |
| privacy_notice_version | TEXT | Version de la notice acceptée |
| privacy_notice_accepted_at | TIMESTAMPTZ | Obligatoire |
| created_at | TIMESTAMPTZ | Défaut now() |

Contraintes :
- Aucune contrainte UNIQUE sur email, nickname, pays ou ville.
- Ne pas fusionner automatiquement des soumissions sur la base de l'e-mail.
- Les données de contact ne sont jamais renvoyées par les endpoints publics.
- Les exports contenant des e-mails sont réservés à l'administrateur.
- Prévoir une durée de conservation et une procédure de suppression ou d'anonymisation.

### 8.5. `playlists`

  Champ            Type          Contraintes
  ---------------- ------------- -------------------
  id               UUID          Clé primaire
  participant_id   UUID          Clé étrangère
  public_code      TEXT          Unique, aléatoire
  status           TEXT          Défaut `valid`
  created_at       TIMESTAMPTZ   Défaut now()

### 8.6. `playlist_tracks`

  Champ         Type       Contraintes
  ------------- ---------- ---------------
  id            UUID       Clé primaire
  playlist_id   UUID       Clé étrangère
  track_id      UUID       Clé étrangère
  position      SMALLINT   1 à 20

Contraintes indispensables :

-   Unicité de `(playlist_id, track_id)`.
-   Unicité de `(playlist_id, position)`.
-   `position` comprise entre 1 et 20.
-   Suppression ou désactivation d'un morceau sans effacer l'historique
    des participations validées.

### 8.7. `playlist_guests`

Cette table conserve les guests choisis par chaque participant. Elle est indépendante de `playlist_tracks`.

  Champ         Type       Contraintes
  ------------- ---------- -------------------------------
  id            UUID       Clé primaire
  playlist_id   UUID       Clé étrangère
  guest_id      UUID       Clé étrangère
  created_at    TIMESTAMPTZ Défaut now()

Contraintes indispensables :

- Unicité de `(playlist_id, guest_id)`.
- Maximum de 5 guests distincts par participation, contrôlé côté serveur ou par une fonction transactionnelle.
- Les guests doivent être actifs au moment de la validation.
- La désactivation d'un guest ne doit pas effacer les choix historiques.

### 8.8. `event_settings`

  Champ        Type          Contraintes
  ------------ ------------- -----------------------------------
  id           UUID          Clé primaire
  event_name   TEXT          Obligatoire
  event_date   TIMESTAMPTZ   Facultatif tant que non confirmée
  is_open      BOOLEAN       Défaut false
  min_tracks   SMALLINT      Défaut 1
  max_tracks   SMALLINT      Défaut 20
  updated_at   TIMESTAMPTZ   Défaut now()

### 8.7. Relations

-   Un projet possède plusieurs morceaux.
-   Un participant peut avoir plusieurs participations si la règle
    anti-doublon n'en impose pas une seule.
-   Une tracklist appartient à un participant.
-   Une tracklist contient plusieurs morceaux.
-   Un morceau peut être présent dans plusieurs tracklists.
-   `playlist_tracks` matérialise la relation plusieurs-à-plusieurs entre tracklists et morceaux.
-   Une tracklist peut référencer de 0 à 5 guests.
-   Un guest peut être choisi dans plusieurs tracklists.
-   `playlist_guests` matérialise la relation plusieurs-à-plusieurs entre tracklists et guests.

### 8.10. Données techniques anti-abus

Si un identifiant de navigateur ou une empreinte de limitation est
conservé, il doit être stocké séparément des données publiques, sous une
forme pseudonymisée ou hachée lorsque cela convient, avec une durée de
conservation documentée.

Ne pas utiliser une empreinte navigateur comme identifiant fiable d'une
personne.

### 8.9. Index recommandés

-   `tracks(project_id, is_active)`.
-   `tracks(is_active, title)`.
-   `playlists(created_at)`.
-   `playlists(public_code)` avec contrainte unique.
-   `playlist_tracks(track_id)`.
-   `playlist_tracks(playlist_id, position)`.

Les index doivent être ajustés après observation des requêtes réellement
utilisées.

------------------------------------------------------------------------

## 9. Sécurité et confidentialité

### 9.1. Row Level Security

RLS doit être activé sur toutes les tables exposées via l'API Supabase.

Principes :

-   Lecture publique limitée aux projets, morceaux et guests actifs, ainsi qu'aux statistiques agrégées.
-   Aucune modification publique du catalogue.
-   Aucune lecture publique des données internes des participants (e-mail, pays, ville et métadonnées de consentement).
-   Consultation publique d'une tracklist uniquement via une fonction ou
    une vue qui ne retourne que les champs nécessaires.
-   Administration réservée à l'utilisateur administrateur autorisé.
-   Insertion de participations contrôlée par une fonction serveur ou
    RPC sécurisée.

La clé `service_role` ne doit jamais être incluse dans le bundle
frontend, dans le dépôt Git ou dans un fichier public.

### 9.2. Authentification administrateur

-   Supabase Auth.
-   Compte créé manuellement.
-   Mot de passe robuste.
-   MFA recommandé si disponible.
-   Vérification du rôle administrateur côté serveur et dans les
    politiques RLS.
-   Aucun rôle administrateur attribuable par un utilisateur public.

### 9.3. Protection des entrées

-   Validation des champs côté client et serveur.
-   Requêtes paramétrées.
-   Échappement du contenu affiché.
-   Limitation des tailles de requêtes.
-   Contrôle des URLs d'images.
-   Protection anti-spam.
-   Gestion des erreurs sans révéler les détails internes.

### 9.4. Données personnelles

Le formulaire collecte quatre informations obligatoires : pseudonyme, e-mail, pays et ville. Le pseudonyme est affiché sur la carte et la page publique. L'e-mail, le pays et la ville sont privés et ne sont pas affichés individuellement au public.

Une politique de confidentialité claire, accessible avant validation, doit préciser :

-   Les données collectées.
-   Les finalités.
-   Les destinataires et prestataires techniques.
-   Les durées de conservation.
-   Les modalités d'exercice des droits.
-   Les coordonnées du responsable de l'initiative.
-   Le caractère obligatoire des quatre champs et les finalités de leur collecte.
-   Le fait que chaque soumission est enregistrée séparément et que les participations répétées sont autorisées.
-   Les durées de conservation et les modalités d'accès, de rectification ou de suppression.
-   La publication des seules statistiques géographiques agrégées.

Le projet doit être vérifié au regard des règles ivoiriennes applicables
à la protection des données personnelles avant son ouverture publique.

------------------------------------------------------------------------

## 10. API et opérations métier

Les noms ci-dessous sont indicatifs et doivent être harmonisés avec
l'implémentation.

  ---------------------------------------------------------------------------
  Opération                   Accès                   Description
  --------------------------- ----------------------- -----------------------
  `GET /tracks`               Public                  Catalogue actif

  `GET /projects`             Public                  Projets actifs

  `GET /stats`                Public                  Statistiques agrégées

  `GET /playlists/:code`      Public contrôlé         Tracklist publique

  `POST /submit-playlist`     Public contrôlé         Validation d'une
                                                      participation

  `GET /admin/overview`       Admin                   Tableau de bord

  `GET /admin/playlists`      Admin                   Liste des
                                                      participations

  `POST /admin/tracks`        Admin                   Création d'un morceau

  `PATCH /admin/tracks/:id`   Admin                   Modification d'un
                                                      morceau

  `POST /admin/export`        Admin                   Export des données
  ---------------------------------------------------------------------------

### 10.1. Contrat de soumission indicatif

Exemple de données envoyées au serveur :

``` json
{
  "nickname": "ULTRA_225",
  "email": "ultra@example.com",
  "countryCode": "CI",
  "city": "Abidjan",
  "privacyNoticeVersion": "1.0",
  "trackIds": [
    "uuid-track-1",
    "uuid-track-2",
    "uuid-track-3"
  ],
  "browserSubmissionId": "random-client-token"
}
```

Le serveur doit :

1. Valider pseudonyme, e-mail, pays et ville.
2. Vérifier l'acceptation de la notice de confidentialité en vigueur.
3. Vérifier l'ouverture de la campagne.
4. Vérifier le nombre de titres et les doublons.
5. Vérifier l'existence et le statut actif des morceaux.
6. Vérifier les guests sélectionnés et leur statut.
7. Appliquer les contrôles anti-abus sans bloquer les champs déjà utilisés.
8. Créer une nouvelle ligne participant pour cette soumission.
9. Créer la tracklist et enregistrer les guests.
10. Insérer les morceaux avec leurs positions.
11. Retourner le code public.

Toutes les écritures doivent être atomiques.

Réponse indicative :

``` json
{
  "success": true,
  "playlistCode": "code-public-aleatoire",
  "message": "Ta tracklist a bien été enregistrée."
}
```

Ne pas retourner les identifiants internes ou les données de sécurité au
navigateur.

------------------------------------------------------------------------

## 11. Arborescence du projet

``` text
himra-ultra-tracklist/
├── public/
│   ├── images/
│   ├── icons/
│   ├── manifest.webmanifest
│   └── _redirects
├── src/
│   ├── app/
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── tracks/
│   │   ├── playlist/
│   │   ├── stats/
│   │   └── ui/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── BuilderPage.tsx
│   │   ├── ConfirmationPage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── PublicPlaylistPage.tsx
│   │   └── admin/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── netlify/
│   └── functions/
│       ├── submit-playlist.ts
│       └── export-results.ts
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── README.md
├── .env.example
├── .gitignore
├── netlify.toml
├── package.json
├── package-lock.json
└── README.md
```

L'arborescence peut évoluer si une justification technique est
documentée. Les composants doivent rester séparés par responsabilité.

------------------------------------------------------------------------

## 12. Déploiement Netlify

### 12.1. Configuration de build

  Paramètre             Valeur
  --------------------- ------------------------------------------------
  Build command         `npm run build`
  Publish directory     `dist`
  Functions directory   `netlify/functions`
  Version Node.js       Version LTS compatible et fixée dans le projet
  Dépôt source          GitHub

La version de Node.js doit être vérifiée avec les versions de Netlify et
des dépendances au moment du déploiement. Ne pas imposer une version
obsolète.

### 12.2. Exemple `netlify.toml`

``` toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Frame-Options = "DENY"
```

Les règles de redirection doivent être vérifiées avec les routes de
l'application et les éventuels endpoints de fonctions.

### 12.3. Variables d'environnement

Exemple de fichier `.env.example` :

``` env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

Règles :

-   `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont accessibles au
    frontend.
-   La clé anon/publishable n'est pas un secret ; sa sécurité dépend des
    politiques RLS.
-   `SUPABASE_SERVICE_ROLE_KEY` est strictement réservée au serveur.
-   Les secrets de production sont configurés dans les paramètres
    Netlify.
-   Le fichier `.env` réel ne doit pas être versionné.

### 12.4. Processus de mise en production

1.  Créer le dépôt GitHub.
2.  Initialiser le projet React/Vite.
3.  Créer le projet Supabase.
4.  Appliquer les migrations SQL.
5.  Configurer RLS et les rôles.
6.  Développer et tester les fonctions serveur.
7.  Connecter le dépôt à Netlify.
8.  Configurer les variables d'environnement.
9.  Déployer une préversion.
10. Effectuer la recette.
11. Configurer le domaine personnalisé si disponible.
12. Publier la version de production.

------------------------------------------------------------------------

## 13. Performance et compatibilité

### 13.1. Objectifs

-   Approche mobile-first.
-   Interface utilisable sur les navigateurs mobiles récents.
-   Chargement optimisé sur réseau mobile.
-   Images compressées en WebP ou AVIF.
-   Chargement différé des images non prioritaires.
-   Découpage du code par route si pertinent.
-   États de chargement et messages d'erreur.
-   Conservation temporaire de la sélection.
-   Aucun effet visuel ne doit bloquer les interactions.

### 13.2. Compatibilité

Tester au minimum :

-   Chrome Android.
-   Safari iOS.
-   Chrome desktop.
-   Firefox desktop.
-   Edge desktop.

### 13.3. PWA

Une configuration PWA peut être incluse si elle n'alourdit pas le MVP.

L'installation sur l'écran d'accueil doit rester facultative.
L'application doit fonctionner normalement dans le navigateur.

------------------------------------------------------------------------

## 14. Tests et recette

### 14.1. Tests fonctionnels

  -----------------------------------------------------------------------
  Test                                Résultat attendu
  ----------------------------------- -----------------------------------
  Ouverture de l'accueil              Page affichée

  Catalogue                           Morceaux actifs visibles

  Recherche                           Résultats cohérents

  Filtre                              Résultats filtrés

  Ajout d'un morceau                  Ajout unique

  Ajout du 21e morceau                Refus explicite

  Suppression                         Morceau retiré

  Réorganisation                      Ordre conservé

  Pseudonyme vide                     Validation refusée

  Pseudonyme trop long                Validation refusée

  E-mail vide ou invalide             Validation refusée

  Pays non renseigné ou invalide      Validation refusée

  Ville vide ou trop longue           Validation refusée

  Même e-mail et même pseudonyme      Nouvelle participation acceptée

  Tracklist vide                      Validation refusée

  Morceau inactif                     Soumission refusée

  Doublon dans la requête             Soumission refusée

  Campagne clôturée                   Soumission refusée

  Soumission valide                   Enregistrement complet

  Double clic de validation           Pas de double enregistrement
                                      involontaire

  Résultats                           Statistiques cohérentes

  Partage                             Lien et carte fonctionnels

  Admin non connecté                  Accès refusé

  Admin connecté                      Fonctions autorisées

  Export CSV                          Fichier exploitable
  -----------------------------------------------------------------------

### 14.2. Tests de sécurité

-   Vérifier qu'un utilisateur public ne peut pas modifier le catalogue.
-   Vérifier qu'un utilisateur public ne peut pas accéder aux données
    internes des participants.
-   Vérifier que la clé service role n'apparaît pas dans les fichiers
    frontend.
-   Vérifier les contrôles serveur en contournant les validations du
    navigateur.
-   Vérifier les autorisations de chaque fonction administrative.
-   Vérifier les limites de requêtes.
-   Vérifier que les identifiants publics ne permettent pas d'énumérer
    facilement les participations.

### 14.3. Tests de charge

Avant la campagne, simuler une montée en charge réaliste :

-   Consultation simultanée du catalogue.
-   Soumissions simultanées.
-   Actualisation des statistiques.
-   Consultation de pages de tracklists publiques.

Les seuils de charge et les quotas doivent être définis en fonction de
l'audience attendue et des offres Netlify/Supabase retenues.

### 14.4. Conditions d'acceptation

Le MVP est accepté lorsque :

-   Le parcours participant est réalisable sans compte.
-   Le pseudonyme, l'adresse e-mail, le pays et la ville sont obligatoires à chaque soumission.
-   Une même personne peut participer autant de fois que souhaité tant que la campagne est ouverte ; aucune unicité d'e-mail ou de pseudonyme n'est imposée.
-   L'e-mail, le pays et la ville ne sont jamais exposés sur les pages ou cartes publiques.
-   Une tracklist contient de 1 à 20 morceaux.
-   Les validations serveur empêchent les données invalides.
-   Les participations sont enregistrées atomiquement.
-   Les résultats sont cohérents avec les participations valides.
-   La carte de partage est générée.
-   L'espace administrateur est protégé.
-   L'application fonctionne sur mobile et ordinateur.
-   Le déploiement Netlify est stable.

------------------------------------------------------------------------

## 15. Planning prévisionnel

Estimation indicative pour un développeur maîtrisant la stack et
disposant rapidement du catalogue et des ressources graphiques.

  Phase       Travaux                                            Durée estimée
  ----------- ------------------------------------------ ---------------------
  1           Cadrage technique, dépôt, initialisation                  1 jour
  2           Maquettes et système graphique                           2 jours
  3           Accueil, catalogue et builder                            3 jours
  4           Supabase, migrations et sécurité                         3 jours
  5           Soumission, résultats et Realtime                        2 jours
  6           Administration et export                                1,5 jour
  7           Carte de partage et intégration sociale                   1 jour
  8           Tests, corrections et déploiement                       1,5 jour
  **Total**                                                **15 jours ouvrés**

Ce planning est une estimation et non un engagement contractuel. Il
dépend notamment de la qualité du catalogue, des visuels disponibles, de
la configuration des services et des retours de validation.

### Jalons de validation

-   **Jalon 1 :** architecture et identité visuelle validées.
-   **Jalon 2 :** parcours de composition fonctionnel avec données de
    test.
-   **Jalon 3 :** enregistrement réel et sécurisé dans Supabase.
-   **Jalon 4 :** résultats et partage opérationnels.
-   **Jalon 5 :** administration, recette et production.

------------------------------------------------------------------------

## 16. Risques et mesures de maîtrise

  -----------------------------------------------------------------------
  Risque                  Conséquence             Mesure
  ----------------------- ----------------------- -----------------------
  Catalogue incomplet ou  Résultats peu fiables   Vérification éditoriale
  erroné                                          avant import

  Participations          Classement biaisé       Limitation, détection
  multiples                                       et transparence

  Pic de trafic           Lenteur ou              Tests et suivi des
                          indisponibilité         quotas

  Mauvaise configuration  Exposition ou perte de  Tests de politiques
  RLS                     données                 avant production

  Clé secrète exposée     Compromission du        Secrets côté serveur
                          backend                 uniquement

  Visuels non autorisés   Risque juridique        Utiliser des ressources
                                                  autorisées

  Connexion instable      Perte de sélection      Sauvegarde temporaire
                                                  locale et reprise

  Partage social          Baisse de viralité      Tests sur appareils et
  imparfait                                       applications réels
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 17. Ressources et prérequis à fournir

Avant le développement complet, le porteur du projet devra fournir ou
valider :

1.  La liste vérifiée des morceaux de HIMRA.
2.  Les noms et types des albums, EP, singles et collaborations.
3.  Les pochettes ou images dont l'utilisation est autorisée.
4.  Le logo ou l'identité graphique de la campagne, si disponible.
5.  Les photographies autorisées pour la page d'accueil.
6.  Le nom de domaine souhaité, si un domaine personnalisé est prévu.
7.  Le compte GitHub, le projet Supabase et le compte Netlify.
8.  Le responsable de l'initiative et les informations de contact à
    afficher.
9.  Les conditions de participation et la politique de confidentialité.
10. La date et les informations définitives de l'événement, lorsqu'elles
    sont confirmées.

------------------------------------------------------------------------

## 18. Évolutions possibles après le MVP

Sous réserve des résultats et des ressources :

-   Battle entre deux morceaux.
-   Profils ULTRA.
-   Historique des tracklists.
-   Défis communautaires.
-   Compte à rebours de l'événement.
-   Classements par ville.
-   Formats de partage supplémentaires.
-   Mode live pendant le concert.
-   Publication d'une tracklist officielle, uniquement si l'organisation
    la communique.

Ces évolutions ne doivent pas retarder la livraison du MVP.

------------------------------------------------------------------------

## 19. Décisions de référence

Les décisions suivantes constituent le périmètre validé pour la première
version :

  Sujet                           Décision
  ------------------------------- ---------------------------------------------
  Positionnement                  Initiative indépendante de fans
  Nom                             HIMRA ULTRA TRACKLIST EXPERIENCE
  Public                          Fans de HIMRA / ULTRA
  Catalogue                       Catalogue complet, vérifié et administrable
  Sélection                       1 à 20 morceaux
  Guests                          Jusqu'à 5 choix, sélection facultative
  Catalogue guests                Liste administrée de candidats vérifiés
  Participation                   Sans compte fan, répétitions autorisées
  Champs obligatoires             Pseudonyme, e-mail, pays, ville
  Unicité e-mail / pseudonyme     Non exigée
  Nombre de participations        Illimité pendant la campagne ouverte
  Confidentialité                 E-mail, pays, ville non publics
  Résultats                       Temps réel
  Administration                  Un administrateur
  Modification après validation   Non prévue dans le MVP
  Frontend                        React, TypeScript, Vite, Tailwind
  Backend                         Supabase et Netlify Functions
  Hébergement                     Netlify
  Versionnement                   GitHub

## 20. Conclusion

HIMRA ULTRA TRACKLIST EXPERIENCE doit être une application communautaire
rapide, claire, immersive et fiable.

La réussite du MVP dépend moins du nombre de fonctionnalités que de la
qualité de trois expériences :

1.  Le fan comprend immédiatement le concept.
2.  Il construit et valide sa tracklist en moins de deux minutes, avec
    un pseudonyme obligatoire.
3.  Il obtient un visuel partageable qui donne envie à d'autres fans de
    participer.

Le développement doit donc privilégier la simplicité du parcours, la
sécurité des enregistrements, la fiabilité des statistiques et la
qualité de l'identité visuelle.

## 21. Critères de recette complémentaires — guests et direction artistique

### 21.1. Fonctionnalité guests

- Un participant peut sélectionner de 0 à 5 guests actifs.
- Un guest ne peut être sélectionné qu'une seule fois dans une participation.
- La sélection des guests est indépendante de la limite de 20 morceaux.
- Le participant peut modifier ses choix avant validation.
- Les choix sont enregistrés atomiquement avec la tracklist.
- Les résultats des guests sont exacts, séparés des résultats musicaux et actualisés en temps réel.
- L'administrateur peut gérer le catalogue des guests sans supprimer l'historique des choix.
- L'interface ne laisse jamais croire qu'un guest est confirmé par l'organisation.

### 21.2. Qualité du design et du motion design

- La direction artistique est validée à partir de références réelles avant intégration.
- Les maquettes mobile et desktop couvrent tous les écrans prioritaires.
- L'application ne ressemble pas à un formulaire ou à un template SaaS générique.
- L'accueil produit une première impression immersive et présente clairement l'action principale.
- Les sélections de morceaux et de guests ont des états visuels immédiatement compréhensibles.
- Les animations sont cohérentes, courtes, fluides et non bloquantes.
- La préférence `prefers-reduced-motion` est respectée.
- Les écrans restent lisibles et performants sur smartphone Android courant.
- Les cartes de partage sont visuellement abouties et incluent les guests choisis.
- Aucun visuel, logo ou portrait non autorisé n'est utilisé.

### 21.3. Priorisation de réalisation

Ordre de priorité recommandé :
1. Définition et validation de la direction artistique.
2. Prototype des parcours et storyboard motion design.
3. Design system et maquettes responsive.
4. Architecture des données morceaux / guests / participations.
5. Développement des parcours de sélection et de validation.
6. Résultats temps réel et administration.
7. Cartes de partage, optimisation et recette.

La qualité du design ne doit pas être sacrifiée pour ajouter des fonctionnalités secondaires. En cas d'arbitrage, conserver un MVP plus resserré mais visuellement cohérent, fluide et abouti.

## 22. Conclusion

HIMRA ULTRA TRACKLIST EXPERIENCE doit être à la fois un outil de participation et une expérience de marque communautaire. Les ULTRA doivent pouvoir construire leur concert idéal en choisissant les morceaux et les guests qu'ils souhaitent voir sur scène, puis partager leur proposition.

La réussite du projet repose sur quatre piliers indissociables :
1. Une expérience simple et rapide.
2. Une direction artistique immersive, fidèle aux références validées de l'univers de HIMRA sans usurpation d'identité officielle.
3. Un motion design expressif, maîtrisé, accessible et performant.
4. Des résultats fiables, séparant clairement les préférences musicales et les choix de guests.

## 23. Critères de recette complémentaires — informations et participations multiples

- Le formulaire exige le pseudonyme, l'adresse e-mail, le pays et la ville.
- Chaque champ est contrôlé côté client et côté serveur.
- Le pays est stocké avec un code ISO normalisé.
- Une adresse e-mail ou un pseudonyme déjà utilisé ne bloque pas une nouvelle participation.
- Chaque soumission crée un nouvel enregistrement indépendant et une nouvelle tracklist.
- Le participant peut soumettre autant de participations qu'il le souhaite tant que la campagne est ouverte.
- L'e-mail, le pays et la ville ne figurent jamais dans les pages publiques, cartes ou réponses API publiques.
- Les statistiques géographiques sont agrégées.
- La politique de confidentialité précise les finalités, la conservation et les droits des personnes.

------------------------------------------------------------------------

## 24. Exigence transversale — application responsive et PWA

### 24.1. Principe fondamental : navigateur d'abord

La solution finale doit être une application web responsive, conçue selon
une approche **PWA (Progressive Web App)**.

**L'application doit fonctionner normalement et intégralement dans un
navigateur web, sans que l'utilisateur soit obligé de l'installer.**
L'installation sur l'écran d'accueil d'un smartphone ou d'un ordinateur
est une possibilité complémentaire, jamais une condition d'accès.

L'utilisateur doit pouvoir ouvrir l'URL de l'application depuis un
navigateur compatible, parcourir les pages, construire sa tracklist,
choisir ses guests, valider sa participation, consulter les résultats
et partager sa carte sans installer l'application.

La PWA améliore l'expérience lorsqu'elle est installée, mais ne doit pas
créer deux produits distincts : la version navigateur et la version
installée doivent utiliser la même application, les mêmes données et les
mêmes règles métier.

### 24.2. Responsive design obligatoire

L'interface doit s'adapter proprement aux différentes tailles d'écran
et orientations :

- Smartphones Android et iOS, petits et grands écrans.
- Tablettes en mode portrait et paysage.
- Ordinateurs portables.
- Écrans de bureau de grande largeur.

La conception doit suivre une approche mobile-first, sans se limiter à
réduire la version desktop. Les compositions, espacements, typographies,
menus, cartes, listes de morceaux, sélecteurs de guests, graphiques et
commandes doivent être repensés selon l'espace disponible.

Exigences d'interface :

- Aucun défilement horizontal involontaire.
- Aucun bouton, champ ou contenu essentiel coupé ou inaccessible.
- Zones tactiles suffisamment grandes et espacées sur mobile.
- Navigation utilisable au toucher, à la souris et au clavier.
- Textes lisibles sans zoom manuel.
- Formulaires utilisables avec les claviers mobiles adaptés.
- Tableaux et graphiques administrateur adaptés aux petits écrans
  (cartes, tableaux défilants localement ou vues synthétiques).
- Dialogues, menus et fenêtres modales adaptés à la hauteur disponible.
- Respect des zones de sécurité des écrans mobiles (safe areas).
- Gestion des changements d'orientation et des différentes densités
  d'affichage.

Les maquettes et tests doivent couvrir au minimum les largeurs
indicatives suivantes : 360 px, 390 px, 768 px, 1024 px, 1280 px et
1440 px. Ces valeurs servent de points de contrôle, et non de limites
rigides de compatibilité.

### 24.3. Capacités PWA attendues

La PWA doit notamment intégrer :

1. Un fichier `manifest.webmanifest` correctement configuré :
   nom, nom court, description, couleurs de thème et d'arrière-plan,
   icônes adaptées, mode d'affichage et URL de démarrage.
2. Un service worker pour gérer le cache et les ressources de l'interface.
3. Une icône et un nom cohérents lors de l'ajout à l'écran d'accueil.
4. Un affichage autonome (`standalone`) lorsque l'application est lancée
   depuis son icône, dans la mesure où le navigateur le prend en charge.
5. Une stratégie de mise à jour maîtrisée : informer l'utilisateur
   lorsqu'une nouvelle version est disponible et éviter de conserver
   durablement une interface obsolète.
6. Une connexion sécurisée HTTPS en production.
7. Une expérience stable en cas de connexion lente ou momentanément
   indisponible.

L'invite d'installation ne doit jamais être imposée à l'ouverture.
Lorsqu'elle est disponible, elle peut être proposée de façon discrète,
au moment opportun, et l'utilisateur doit pouvoir l'ignorer.

### 24.4. Fonctionnement avec et sans connexion

L'application doit distinguer clairement les fonctionnalités disponibles
hors ligne de celles qui nécessitent le serveur.

Hors connexion, dans la mesure des capacités du navigateur :

- L'application peut afficher sa structure et ses ressources statiques
  déjà mises en cache.
- Une page hors ligne claire doit informer l'utilisateur de l'état de
  la connexion.
- Les contenus déjà consultés et mis en cache peuvent rester accessibles
  s'ils ne présentent pas de risque de données obsolètes.
- Les actions qui nécessitent Supabase doivent être désactivées ou
  signalées comme temporairement indisponibles.

Les opérations suivantes nécessitent une connexion effective au serveur
et ne doivent jamais être présentées comme validées sans confirmation :

- Envoi d'une participation.
- Enregistrement d'une tracklist et des guests.
- Consultation des résultats actualisés en temps réel.
- Connexion à l'administration et opérations administrateur.
- Export et opérations de gestion des données.

Aucune participation ne doit être perdue silencieusement. Si une
soumission échoue, afficher un message compréhensible, conserver les
choix en cours dans la mesure du possible et permettre une nouvelle
tentative explicite.

Ne pas mettre en place une file d'attente automatique de soumissions
hors ligne dans le MVP, sauf si un mécanisme fiable de reprise,
d'identifiant idempotent et de prévention des doublons est conçu,
documenté et testé. Une participation ne doit être considérée comme
enregistrée qu'après confirmation du serveur.

### 24.5. Compatibilité navigateur

La version web doit être testée sur les versions récentes des principaux
navigateurs :

- Google Chrome.
- Safari, notamment sur iPhone et iPad.
- Microsoft Edge.
- Mozilla Firefox.
- Navigateurs Android basés sur Chromium.

Les fonctionnalités PWA varient selon les navigateurs et systèmes.
L'absence de prise en charge d'une capacité d'installation ou d'une
fonctionnalité spécifique ne doit pas empêcher l'utilisation normale
de l'application dans le navigateur.

Prévoir des solutions de repli lorsque certaines API du navigateur ne
sont pas disponibles. Ne jamais conditionner l'accès au parcours
principal à une fonctionnalité PWA facultative.

### 24.6. Architecture technique et déploiement

Conserver l'architecture principale validée :

- Frontend : React, TypeScript, Vite et Tailwind CSS.
- Navigation : React Router.
- Animations : Framer Motion.
- Backend et base de données : Supabase.
- Fonctions serveur : Netlify Functions.
- Hébergement et déploiement : Netlify.
- Versionnement : GitHub.

Compléter cette architecture par :

- Un manifest PWA et les icônes nécessaires.
- Un service worker, avec une stratégie de cache adaptée à Vite.
- Une gestion explicite du cache des ressources statiques et des
  réponses dynamiques.
- L'exclusion des données personnelles, des réponses administrateur et
  des données sensibles des caches publics.
- Une stratégie de versionnement et d'invalidation du cache lors des
  déploiements.
- La configuration Netlify nécessaire au routage de l'application
  monopage : les URL gérées par React Router doivent fonctionner aussi
  lorsqu'elles sont ouvertes directement ou rechargées.
- Des contrôles de sécurité adaptés aux routes publiques et privées.

Ne jamais mettre en cache de manière publique les données personnelles
des participants, les jetons d'authentification, les réponses
administrateur ou les informations privées renvoyées par les fonctions
serveur.

### 24.7. Accessibilité, performance et qualité

La qualité responsive et PWA doit être prise en compte dès la conception,
et non ajoutée en fin de développement.

Exigences minimales :

- Respect des préférences de réduction des animations
  (`prefers-reduced-motion`).
- Contrastes suffisants et états de focus visibles.
- Navigation clavier et libellés accessibles.
- Images optimisées et chargement différé lorsque pertinent.
- Limitation du poids des ressources et des animations.
- Chargement progressif des contenus non essentiels.
- Gestion des erreurs réseau et des délais d'attente.
- Aucun blocage de l'interface pendant une opération longue.
- Retour visuel clair pour chaque action importante.

### 24.8. Critères de recette responsive et PWA

La livraison sera considérée comme conforme si :

- L'application est utilisable depuis une URL dans un navigateur, sans
  installation préalable.
- Tous les parcours principaux fonctionnent dans le navigateur.
- L'installation PWA est proposée uniquement comme option lorsque le
  navigateur la prend en charge.
- L'application installée utilise les mêmes fonctionnalités et données
  que la version navigateur.
- Les écrans prioritaires sont testés sur smartphone, tablette et desktop.
- Aucun élément essentiel ne déborde ou ne devient inaccessible aux
  largeurs de contrôle définies.
- Les routes React Router fonctionnent après actualisation et ouverture
  directe d'une URL.
- Le cache ne divulgue aucune donnée personnelle ou administrative.
- Une perte de connexion est signalée clairement.
- Une soumission non confirmée par le serveur n'est jamais affichée
  comme une participation validée.
- Une mise à jour déployée peut être récupérée sans laisser l'utilisateur
  bloqué sur une version obsolète.
- Les fonctionnalités principales restent utilisables même si une
  capacité PWA particulière n'est pas prise en charge par le navigateur.


**Fin du cahier des charges — Version 4.0**
