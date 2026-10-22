import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import ProductCard from '../components/ProductCard';
const product = { id: 1, name: 'Teclado', price: 1000 };
test('la tarjeta muestra props y comunica el producto al agregarlo', async () => {
  const add = vi.fn();
  render(<ProductCard product={product} onAddToCart={add} />);
  expect(screen.getByRole('heading', { name: 'Teclado' })).toBeInTheDocument();
  expect(screen.getByText('$1.000')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Añadir al Carrito' }));
  expect(add).toHaveBeenCalledExactlyOnceWith(product);
});
test('la tarjeta abre el detalle con el producto recibido', async () => {
  const detail = vi.fn();
  render(<ProductCard product={product} onViewProduct={detail} />);
  await userEvent.click(screen.getByRole('button', { name: 'Ver detalle' }));
  expect(detail).toHaveBeenCalledWith(product);
});
test('sin producto no muestra una tarjeta incompleta', () => {
  const { container } = render(<ProductCard />);
  expect(container).toBeEmptyDOMElement();
});
