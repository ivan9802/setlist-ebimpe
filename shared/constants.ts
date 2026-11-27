// Règles de gestion partagées par le navigateur et le Worker (cadrage §8).
// La base de données reste la référence : ces valeurs servent au confort et à la première validation.

/** RG-TRK-01 et RG-TRK-02 : de 1 à 20 morceaux (20 réglable par l'admin). */
export const MIN_TRACKS = 1
export const MAX_TRACKS = 20

/** RG-GST-01 : de 0 à 5 guests (5 réglable par l'admin). */
export const MAX_GUESTS = 5

/** RG-PSE-02 : de 2 à 24 caractères après nettoyage. */
export const NICKNAME_MIN = 2
export const NICKNAME_MAX = 24

/** D-2 : durée de composition arrondie à 5 s et plafonnée à 3 600 s. */
export const COMPOSE_DURATION_STEP_S = 5
export const COMPOSE_DURATION_MAX_S = 3600

/** D-4 : seuils de publication des classements. */
export const RESULTS_THRESHOLD = 10
export const RESULTS_BY_PROJECT_THRESHOLD = 50

/** ADR-004 : sondage des résultats quand l'onglet est visible. */
export const STATS_POLL_INTERVAL_MS = 60_000
