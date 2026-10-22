import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import CartView from '../views/CartView';
const initial = [{ id: 1, name: 'Control', price: 1000, quantity: 2 }, { id: 2, name: 'Juego', price: 3000, quantity: 1 }];
function Cart() { const [cart, setCart] = useState(initial); return <CartView cart={cart} setCart={setCart} onNavigate={vi.fn()} />; }
test('calcula total por cantidades y recalcula al eliminar', async () => {
  render(<Cart />); expect(screen.getByText('Total: $5.000')).toBeInTheDocument();
  await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
  expect(screen.getByText('Total: $3.000')).toBeInTheDocument(); expect(screen.queryByText('Control')).not.toBeInTheDocument();
});
test('vaciar el carrito muestra el estado vacío y oculta la compra', async () => {
  render(<Cart />); await userEvent.click(screen.getByRole('button', { name: 'Vaciar Carrito' }));
  expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Comprar ahora' })).not.toBeInTheDocument();
});
