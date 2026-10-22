import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import ChekoutView from '../views/ChekoutView';
const cart = [{ id: 1, name: 'Juego', price: 1000, quantity: 3 }];
function setup(initial = { nombre: 'Camila', email: 'c@example.com', direccion: 'Calle 123', entrega: 'domicilio' }, items = cart) {
  const props = { setCart: vi.fn(), setLastOrder: vi.fn(), onNavigate: vi.fn() };
  function Checkout() {
    const [data, setData] = useState(initial); const [error, setError] = useState(false);
    return <ChekoutView cart={items} {...props} checkoutData={data} setCheckoutData={setData} hasError={error} setHasError={setError} />;
  }
  render(<Checkout />); return props;
}
test('compra a domicilio acepta dirección válida y guarda unidades y total', async () => {
  const props = setup(); expect(screen.getByText('Total unidades: 3')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /Confirmar compra/ }));
  expect(props.setLastOrder).toHaveBeenCalledWith(expect.objectContaining({ total: 3000, direccion: 'Calle 123', items: cart }));
  expect(props.setCart).toHaveBeenCalledWith([]); expect(props.onNavigate).toHaveBeenCalledWith('success');
});
test('retiro permite comprar sin dirección de despacho', async () => {
  const props = setup({ nombre: 'Camila', email: 'c@example.com', direccion: '', entrega: 'domicilio' });
  await userEvent.selectOptions(screen.getByLabelText('Opción de entrega'), 'retiro');
  expect(screen.queryByLabelText('Dirección de envío')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /Confirmar compra/ }));
  expect(props.setLastOrder).toHaveBeenCalledWith(expect.objectContaining({ direccion: 'Retiro en tienda', entrega: 'retiro' }));
});
test('el error simulado conserva el carrito y no crea un pedido', async () => {
  const props = setup(); await userEvent.click(screen.getByLabelText(/Simular error/));
  await userEvent.click(screen.getByRole('button', { name: /Confirmar compra/ }));
  expect(props.onNavigate).toHaveBeenCalledWith('error'); expect(props.setCart).not.toHaveBeenCalled(); expect(props.setLastOrder).not.toHaveBeenCalled();
});
test('rechaza datos compuestos solo por espacios', () => {
  const props = setup({ nombre: ' ', email: 'c@example.com', direccion: 'Calle 123' });
  fireEvent.submit(screen.getByRole('button', { name: /Confirmar compra/ }).closest('form'));
  expect(screen.getByRole('alert')).toBeInTheDocument(); expect(props.setLastOrder).not.toHaveBeenCalled();
});
test('un carrito vacío no permite confirmar una compra', () => {
  setup(undefined, []); expect(screen.queryByRole('button', { name: /Confirmar compra/ })).not.toBeInTheDocument();
  expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
});
