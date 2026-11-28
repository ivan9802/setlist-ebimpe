// Détection d'un appareil modeste (DA §8.2) : la classe `motion-lite` sur <html> coupe la
// parallaxe, les rotations et les halos, en plus de ce que fait prefers-reduced-motion.

type NavigatorHints = { deviceMemory?: number; hardwareConcurrency?: number }

export function isModestDevice(nav: NavigatorHints): boolean {
  const memory = nav.deviceMemory
  const cores = nav.hardwareConcurrency
  return (memory !== undefined && memory <= 2) || (cores !== undefined && cores > 0 && cores <= 4)
}

export function applyMotionLite(
  root: HTMLElement = document.documentElement,
  nav: NavigatorHints = navigator,
): boolean {
  const lite = isModestDevice(nav)
  root.classList.toggle('motion-lite', lite)
  return lite
}
