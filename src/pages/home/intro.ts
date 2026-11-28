// Révélation du titre de l'accueil (maquette 01, séquence 1) : seulement à la première visite
// de la session, pour ne pas faire attendre un fan qui revient. Stockage de session protégé :
// en navigation privée stricte, l'intro est simplement jouée.

const KEY = 'hute:intro-vue'

export function isFirstVisitOfSession(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === null
  } catch {
    return true
  }
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    // Rien à faire : l'intro sera rejouée, ce qui reste sans conséquence.
  }
}
