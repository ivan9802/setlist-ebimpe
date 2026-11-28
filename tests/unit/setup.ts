// Préparation des tests de composants (jsdom).
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => cleanup())

// jsdom affiche « Not implemented » à chaque restauration du défilement (ScrollRestoration).
window.scrollTo = () => {}

// jsdom n'implémente pas showModal() ni close() : version minimale, suffisante pour tester
// l'ouverture, la fermeture et l'événement `close` (le comportement modal réel est vérifié en E2E).
if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
