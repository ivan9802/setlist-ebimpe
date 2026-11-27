import { COMPOSE_DURATION_MAX_S, COMPOSE_DURATION_STEP_S } from './constants.ts'

/**
 * D-2 : durée de composition anonyme, arrondie au multiple de 5 s le plus proche
 * et plafonnée à 3 600 s. Une valeur invalide donne null (champ facultatif).
 */
export function roundComposeDuration(seconds: number): number | null {
  if (!Number.isFinite(seconds) || seconds < 0) return null
  const rounded = Math.round(seconds / COMPOSE_DURATION_STEP_S) * COMPOSE_DURATION_STEP_S
  return Math.min(rounded, COMPOSE_DURATION_MAX_S)
}
