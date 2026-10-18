import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import ProfileView from '../views/ProfileView'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

test('guarda el nombre del alumno en localStorage', async () => {
  const user = userEvent.setup()
  render(<ProfileView />)

  await user.type(
    screen.getByLabelText(/nombre del alumno/i),
    'Camila'
  )

  await user.click(
    screen.getByRole('button', { name: /guardar en localstorage/i })
  )

  expect(localStorage.getItem('nombreAlumno')).toBe('Camila')
  expect(screen.getByText('Camila')).toBeInTheDocument()
})
