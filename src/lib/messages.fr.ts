// Seul endroit où un code d'erreur devient un texte affiché (architecture §4.2, ADR-008),
// et source unique des textes de l'interface (définition de « terminé », point 6).
// Ton de la DA §1.3 : tutoiement, phrases courtes, « set-list », vocabulaire de souhaits.
import type { ErrorCode } from '../../shared/errors.ts'

/** Contexte d'affichage : la même panne ne se dit pas pareil au chargement et à l'envoi. */
export type MessageContext = 'default' | 'load' | 'submit'

const TECHNICAL = 'Un problème technique est survenu. Tes choix sont gardés, réessaie.'

const ERRORS: Record<ErrorCode, string> = {
  validation: 'Quelque chose ne va pas dans ta set-list. Vérifie-la puis réessaie.',
  nickname_blocked: "Ce pseudo n'est pas accepté. Choisis-en un autre.",
  verification: "On n'a pas pu vérifier ta participation. Réessaie dans un instant.",
  closed: 'Les set-lists sont closes. Découvre les résultats.',
  inactive_items: 'Certains choix ne sont plus disponibles. Retire-les puis valide à nouveau.',
  notice_outdated: 'Les conditions ont été mises à jour. Relis-les avant de valider.',
  payload_too_large: TECHNICAL,
  forbidden_origin: TECHNICAL,
  not_found: "Cette set-list n'est plus disponible.",
  unavailable: 'Le service est momentanément saturé. Tes choix sont gardés, réessaie.',
  network: 'Pas de réseau. Ta set-list est gardée ici, réessaie quand ça revient.',
  internal: TECHNICAL,
}

const TRANSIENT: ReadonlySet<ErrorCode> = new Set(['network', 'unavailable', 'internal'])

export function messageFor(code: ErrorCode, context: MessageContext = 'default'): string {
  if (context === 'submit' && TRANSIENT.has(code)) {
    return "Ta set-list n'est pas partie. Elle est gardée ici."
  }
  if (context === 'load' && TRANSIENT.has(code)) {
    return code === 'network'
      ? 'Pas de réseau. Réessaie quand ça revient.'
      : 'Impossible de charger les données pour le moment.'
  }
  return ERRORS[code]
}

const plural = (n: number, one: string, many: string) => (n <= 1 ? one : many)

/** Textes de l'interface, regroupés par écran. */
export const t = {
  independence:
    "Initiative indépendante de fans, sans lien officiel avec HIMRA ni avec l'organisation du concert.",
  skipLink: 'Aller au contenu',
  loading: 'Chargement…',
  retry: 'Réessayer',
  backHome: "Retour à l'accueil",

  /** Version courte de la mention, sous le bouton de l'ouverture (maquettes 01 et 01c). */
  independenceShort: 'Initiative indépendante de fans, sans lien officiel avec HIMRA.',

  header: {
    brand: 'HIMRA ULTRA',
    brandLabel: "HIMRA Ultra Tracklist Experience, retour à l'accueil",
    results: 'Résultats',
    nav: 'Navigation principale',
  },

  footer: {
    legalNav: 'Informations légales',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'Conditions de participation',
    termsShort: 'Conditions',
    fullName: 'HIMRA ULTRA TRACKLIST EXPERIENCE',
  },

  steps: {
    nav: 'Étapes de la composition',
    label: (current: number, total: number, name: string) => `${current} / ${total} · ${name}`,
    names: ['Morceaux', 'Guests', 'Récap'] as const,
    counter: (current: number, total: number) => `${current} / ${total}`,
    srCurrent: (current: number, total: number, name: string) =>
      `Étape ${current} sur ${total} : ${name}`,
    back: 'Retour',
    backTo: (name: string) => `Retour : ${name}`,
  },

  counter: {
    sr: (value: number, max: number, noun: string) => `${value} sur ${max} ${noun}`,
  },

  search: {
    clear: 'Effacer la recherche',
    results: (n: number) => (n === 0 ? 'Aucun titre' : `${n} ${plural(n, 'titre', 'titres')}`),
  },

  sheet: {
    open: 'Ouvrir ma set-list',
    collapse: 'Réduire la set-list',
    expand: 'Agrandir la set-list',
    close: 'Fermer la set-list',
  },

  button: {
    sending: 'Envoi…',
  },

  errorBoundary: {
    title: 'Un problème technique est survenu.',
    text: 'Recharge la page. Si tu composais une set-list, tes choix sont gardés sur ce téléphone.',
    action: 'Recharger',
  },

  notFound: {
    title: 'Page introuvable',
    text: "Cette page n'existe pas, ou plus.",
  },

  upcoming: 'Cet écran arrive bientôt.',

  home: {
    // Séquence 1 · Ouverture (maquette 01)
    eventLabel: "26.12 · Stade d'Ebimpé",
    title: 'EBIMPÉ SE PRÉPARE.',
    promise: 'LES ULTRA DÉCIDENT.',
    hook: 'Le 26 décembre, Ebimpé chante. Dis ce que tu veux entendre.',
    cta: 'Composer ma set-list',
    results: 'Voir les résultats',
    counterLabel: (n: number) =>
      plural(n, 'set-list déposée par les ULTRA', 'set-lists déposées par les ULTRA'),
    counterSr: (count: string, n: number) =>
      `${count} ${plural(n, 'set-list déposée', 'set-lists déposées')} par les ULTRA`,
    // Séquence 2 · La feuille
    sheetEyebrow: 'Le principe',
    sheetTitle: ['TA FEUILLE.', 'TON ORDRE.'] as const,
    sheetLabel: 'EXEMPLE',
    sheetNote: "Jusqu'à 20 titres, dans l'ordre où tu veux les entendre. Jusqu'à 5 guests rêvés.",
    // Séquence 3 · La tribune
    tribuneEyebrow: 'La tribune',
    tribuneTitle: 'CE QUE LES ULTRA RÉCLAMENT',
    tribuneTracks: 'Titres les plus demandés',
    tribuneGuests: 'Guests les plus demandés',
    tribuneLine: (selections: string, n: number, percent: string) =>
      `${selections} ${plural(n, 'set-list', 'set-lists')} · ${percent}`,
    tribuneNote: 'Classements mis à jour chaque minute. Visibles à partir de 10 set-lists.',
    tribuneWaiting: 'Les premières set-lists arrivent. Sois dans les premiers.',
    // Séquence 4 · Le casting
    castingEyebrow: 'Le casting',
    castingTitle: 'TON CASTING RÊVÉ',
    castingNote: 'Des souhaits de fans, pas une annonce de programmation.',
    castingSr: (names: string) => `Guests proposés : ${names}.`,
    castingCta: 'Choisir mes guests',
    // Séquence 5 · Rappel et barre collante (maquette 01b)
    recallTitle: ['À TOI DE', 'COMPOSER.'] as const,
    stickyCta: 'Composer',
    stickyLabel: 'set-lists',
    // Campagne close (maquette 01c)
    closedTitle: 'LES SET-LISTS SONT CLOSES.',
    closedHook: 'Merci aux ULTRA. Voici ce que la communauté a réclamé.',
    closedCounterLabel: (n: number) => plural(n, 'set-list déposée', 'set-lists déposées'),
  },

  playlist: {
    castingLabel: 'Mon casting',
    feat: (artists: string) => `feat. ${artists}`,
    title: 'Ma set-list',
    castingNext: 'Étape suivante',
    help: "Glisse une ligne pour changer l'ordre, ou utilise les flèches.",
    helpDesktop:
      "Glisse une ligne pour changer l'ordre. Au clavier : Espace pour saisir, flèches pour déplacer.",
    empty: 'Ta set-list est vide. Ajoute des titres depuis la liste.',
    full: 'Ta set-list est pleine. Retire un titre pour en mettre un autre.',
    needOne: 'Ajoute au moins un titre pour continuer.',
    continue: 'Continuer',
    collapse: 'Réduire la set-list',
    open: 'Ouvrir ma set-list',
    moveUp: (title: string) => `Monter ${title}`,
    moveDown: (title: string) => `Descendre ${title}`,
    remove: (title: string) => `Retirer ${title}`,
    dragHandle: (title: string) => `Déplacer ${title}`,
    moved: (title: string, position: number, total: number) =>
      `${title} déplacé en position ${position} sur ${total}.`,
    removed: (title: string) => `${title} retiré de ta set-list.`,
    // Annonces du glisser-déposer (dnd-kit), en français (DA §10).
    dnd: {
      instructions:
        'Pour déplacer un titre, appuie sur Espace ou Entrée, utilise les flèches haut et bas, puis Espace ou Entrée pour le déposer. Échap annule.',
      start: (title: string, position: number, total: number) =>
        `${title} saisi, en position ${position} sur ${total}.`,
      over: (title: string, position: number, total: number) =>
        `${title} amené en position ${position} sur ${total}.`,
      end: (title: string, position: number, total: number) =>
        `${title} déposé en position ${position} sur ${total}.`,
      cancel: (title: string, position: number) =>
        `Déplacement annulé. ${title} reste en position ${position}.`,
    },
  },

  tracks: {
    title: 'CHOISIS TES TITRES',
    search: 'Chercher un titre',
    searchPlaceholder: 'Chercher un titre…',
    filters: 'Filtrer les titres',
    all: 'Tous',
    clearFilters: 'Effacer les filtres',
    types: { solo: 'Solo', collaboration: 'Collaboration', freestyle: 'Freestyle', autre: 'Autre' },
    add: 'Ajouter',
    added: 'Ajouté',
    full: 'Set-list pleine',
    noResult: (query: string) => `Aucun titre ne correspond à « ${query} ».`,
    noResultHelp: "Vérifie l'orthographe ou cherche un autre mot du titre.",
    noResultFiltered: 'Aucun titre ne correspond à ces filtres.',
    clearSearch: 'Effacer la recherche',
    loadError: 'Impossible de charger les titres.',
    // Le brouillon ne garde que des identifiants : un titre retiré du catalogue n'a plus de nom.
    unavailable: (tracks: number, guests: number) => {
      const parts = [
        tracks === 1 ? 'Un titre' : tracks > 1 ? `${tracks} titres` : '',
        guests === 1 ? 'un guest' : guests > 1 ? `${guests} guests` : '',
      ].filter(Boolean)
      const many = tracks + guests > 1
      const subject = parts.join(' et ')
      return `${subject.charAt(0).toUpperCase()}${subject.slice(1)} ${many ? 'ne sont plus disponibles. Ils ont été retirés' : "n'est plus disponible. Il a été retiré"} de ta set-list.`
    },
    coverAlt: (project: string) => `Pochette de ${project}`,
  },

  pages: {
    tracks: 'CHOISIS TES TITRES',
    guests: 'Les guests que je veux voir sur scène',
    recap: 'Signe ta set-list',
    confirmation: 'Ta set-list est déposée',
    publicPlaylist: 'La set-list partagée',
    results: 'La tribune',
    legal: 'Mentions légales',
    privacy: 'Notice de confidentialité',
    terms: 'Conditions de participation',
  },
} as const
