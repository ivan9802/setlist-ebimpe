import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../../src/app/App.tsx'

describe('App (socle)', () => {
  it('affiche un seul titre principal et la mention d’indépendance', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByText(/initiative indépendante/i)).toBeTruthy()
  })
})
