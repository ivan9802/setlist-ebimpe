import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import { applyMotionLite } from './lib/motion.ts'
import { initObservability, installEarlyErrorCapture } from './lib/observability.ts'
import './styles/global.css'

const root = document.getElementById('root')
if (!root) throw new Error('Élément #root introuvable')

// Avant le premier rendu : appareil modeste (DA §8.2) et tampon des erreurs précoces.
applyMotionLite()
installEarlyErrorCapture()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Sentry est chargé après le premier rendu, quand le navigateur est disponible (§4.2).
const whenIdle = (task: () => void) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(task) : setTimeout(task, 1500)
whenIdle(() => void initObservability())
