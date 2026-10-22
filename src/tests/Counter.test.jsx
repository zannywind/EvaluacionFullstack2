import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Counter from '../components/Counter'

describe('Counter', () => {
  test('comienza mostrando cero', () => {
    render(<Counter />)

    expect(screen.getByText('Valor: 0')).toBeInTheDocument()
  })

  test('aumenta a uno cuando se presiona el botón', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: /aumentar/i }))

    expect(screen.getByText('Valor: 1')).toBeInTheDocument()
  })
})
