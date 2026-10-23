import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
afterEach(() => vi.restoreAllMocks());
import AdminView from '../views/admin/AdminProductsView';
import { getProducts } from '../data/mockData';
function Admin() { const [products, setProducts] = useState(getProducts); return <AdminView products={products} setProducts={setProducts} />; }
beforeEach(() => localStorage.clear());
test('el panel permite crear, editar y eliminar un producto persistido', async () => {
  const user = userEvent.setup(); render(<Admin />);
  await user.click(screen.getByRole('button', { name: 'Nuevo producto' }));
  await user.type(screen.getByLabelText('Nombre del producto'), 'Control nuevo');
  await user.type(screen.getByLabelText('Precio'), '2000');
  await user.click(screen.getByRole('button', { name: 'Guardar' }));
  expect(getProducts().at(-1).name).toBe('Control nuevo');
  await user.click(screen.getByRole('button', { name: 'Editar Control nuevo' }));
  await user.clear(screen.getByLabelText('Precio')); await user.type(screen.getByLabelText('Precio'), '3500');
  await user.click(screen.getByLabelText('En oferta'));
  await user.click(screen.getByRole('button', { name: 'Guardar cambios' }));
  expect(getProducts().at(-1)).toMatchObject({ price: 3500, offer: true });
  await user.click(screen.getByRole('button', { name: 'Eliminar Control nuevo' }));
  expect(getProducts()).toHaveLength(5); expect(screen.queryByText('Control nuevo')).not.toBeInTheDocument();
});
test('cancelar edición conserva los datos originales', async () => {
  const user = userEvent.setup(); render(<Admin />);
  await user.click(screen.getAllByRole('button', { name: /^Editar / })[0]);
  await user.clear(screen.getByLabelText('Nombre del producto')); await user.type(screen.getByLabelText('Nombre del producto'), 'Otro');
  await user.click(screen.getByRole('button', { name: 'Cancelar edición' }));
  expect(getProducts()[0].name).toBe('Zelda: Tears of the Kingdom');
  expect(screen.queryByLabelText('Nombre del producto')).not.toBeInTheDocument();
});
test('validación del panel rechaza nombres vacíos tras quitar espacios', () => {
  render(<Admin />); fireEvent.click(screen.getByRole('button', { name: 'Nuevo producto' })); fireEvent.change(screen.getByLabelText('Nombre del producto'), { target: { value: ' ' } });
  fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '100' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Guardar' }).closest('form'));
  expect(screen.getByRole('alert')).toHaveTextContent('nombre'); expect(getProducts()).toHaveLength(5);
});


test('un fallo al eliminar se muestra en el listado y conserva el producto', async () => {
  render(<Admin />);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Sin espacio'); });
  await userEvent.click(screen.getAllByRole('button', { name: /^Eliminar / })[0]);
  expect(screen.getByRole('alert')).toHaveTextContent('No se pudo guardar');
  expect(screen.getByText('Zelda: Tears of the Kingdom')).toBeInTheDocument();
  expect(getProducts()).toHaveLength(5);
});
