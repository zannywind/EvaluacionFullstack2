import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import ProductsView from '../views/ProductsView';
import OffersView from '../views/OffersView';
import CategoriesView from '../views/CategoriesView';
const products = [{ id: 1, name: 'Zelda', price: 100, category: 'Juegos', offer: true }, { id: 2, name: 'Consola', price: 200, category: 'Consolas', offer: false }];
test('el catálogo filtra sin distinguir mayúsculas y avisa si no hay coincidencias', async () => {
  const user = userEvent.setup(); render(<ProductsView products={products} />);
  expect(screen.getAllByRole('button', { name: 'Añadir al Carrito' })).toHaveLength(2);
  const search = screen.getByRole('textbox', { name: 'Buscar producto' });
  await user.type(search, 'ZEL');
  expect(screen.getByText('Zelda')).toBeInTheDocument(); expect(screen.queryByText('Consola')).not.toBeInTheDocument();
  await user.clear(search); await user.type(search, 'inexistente');
  expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
});
test('ofertas muestra solo los productos marcados', () => {
  render(<OffersView products={products} />);
  expect(screen.getByText('Zelda')).toBeInTheDocument(); expect(screen.queryByText('Consola')).not.toBeInTheDocument();
});
test('ofertas vacías muestran un mensaje', () => {
  render(<OffersView products={[]} />);
  expect(screen.getByText(/No hay ofertas/)).toBeInTheDocument();
});
test('una categoría abre su listado y permite volver', async () => {
  render(<CategoriesView products={products} />);
  await userEvent.click(screen.getByRole('button', { name: 'Juegos' }));
  expect(screen.getByText('Zelda')).toBeInTheDocument(); expect(screen.queryByText('Consola')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Todas las categorías' }));
  expect(screen.getByRole('button', { name: 'Consolas' })).toBeInTheDocument();
});
