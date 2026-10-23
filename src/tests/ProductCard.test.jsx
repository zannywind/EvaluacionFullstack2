import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import ProductCard from '../components/ProductCard';
// DEFENSA 13 — PRUEBAS: preparar datos, ejecutar una acción y comprobar el resultado.
// Vitest ejecuta test/expect; Testing Library renderiza y busca elementos como un usuario.
const product = { id: 1, name: 'Teclado', price: 1000 };
test('la tarjeta muestra props y comunica el producto al agregarlo', async () => {
  // MOCK: una función espía registra sus llamadas sin modificar un carrito real.
  const add = vi.fn();
  // PREPARAR: render monta el componente en el DOM simulado de jsdom.
  render(<ProductCard product={product} onAddToCart={add} />);
  expect(screen.getByRole('heading', { name: 'Teclado' })).toBeInTheDocument();
  expect(screen.getByText('$1.000')).toBeInTheDocument();
  // ACTUAR: simulamos el clic. await espera a que termine la interacción.
  await userEvent.click(screen.getByRole('button', { name: 'Añadir al Carrito' }));
  // COMPROBAR: no basta con que el botón exista; debe comunicar el producto correcto una vez.
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
