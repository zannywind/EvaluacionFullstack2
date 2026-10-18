import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import ProductCard from '../components/ProductCard'

test('muestra los datos recibidos por props y avisa al seleccionar', async () => {
  const user = userEvent.setup()
  const onSeleccionar = vi.fn()
  const producto = {
    id: 1,
    nombre: 'Teclado mecánico',
    descripcion: 'Producto de prueba',
    precio: 39990,
  }

  render(
    <ProductCard
      producto={producto}
      onSeleccionar={onSeleccionar}
    />
  )

  expect(screen.getByText('Teclado mecánico')).toBeInTheDocument()

  await user.click(
    screen.getByRole('button', { name: /seleccionar producto/i })
  )

  expect(onSeleccionar).toHaveBeenCalledTimes(1)
  expect(onSeleccionar).toHaveBeenCalledWith(producto)
})
