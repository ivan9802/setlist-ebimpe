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

  header: {
    brand: 'HIMRA ULTRA TRACKLIST',
    brandLabel: "HIMRA Ultra Tracklist Experience, retour à l'accueil",
    results: 'Résultats',
    nav: 'Navigation principale',
  },

  footer: {
    legalNav: 'Informations légales',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'Conditions de participation',
  },

  steps: {
    nav: 'Étapes de la composition',
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
    title: 'EBIMPÉ SE PRÉPARE.',
    hook: 'Le 26 décembre, Ebimpé chante. Dis ce que tu veux entendre.',
    cta: 'Composer ma set-list',
    results: 'Voir les résultats',
    counterLabel: (n: number) => plural(n, 'set-list déposée', 'set-lists déposées'),
  },

  pages: {
    tracks: 'Choisis tes morceaux',
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
