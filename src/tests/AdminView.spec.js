import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminView from '../views/AdminView';
import { getProducts } from '../data/mockData';

describe('AdminView', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('actualiza los campos del formulario al escribir (estado)', async () => {
    const user = userEvent.setup();
    render(<AdminView products={[]} setProducts={() => {}} />);

    const nombre = screen.getByPlaceholderText('Nombre Producto');
    const precio = screen.getByPlaceholderText('Precio');
    await user.type(nombre, 'Teclado');
    await user.type(precio, '15000');

    expect(nombre.value).toBe('Teclado');
    expect(precio.value).toBe('15000');
  });

  it('no agrega nada si falta el precio', async () => {
    const user = userEvent.setup();
    const setProducts = jasmine.createSpy('setProducts');
    render(<AdminView products={[]} setProducts={setProducts} />);

    await user.type(screen.getByPlaceholderText('Nombre Producto'), 'Solo nombre');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(setProducts).not.toHaveBeenCalled();
    expect(localStorage.getItem('products')).toBeNull();
  });

  it('agrega un producto, lo guarda y limpia el formulario', async () => {
    spyOn(Date, 'now').and.returnValue(999); // mock: id predecible
    const user = userEvent.setup();
    const setProducts = jasmine.createSpy('setProducts');
    render(<AdminView products={[]} setProducts={setProducts} />);

    const nombre = screen.getByPlaceholderText('Nombre Producto');
    const precio = screen.getByPlaceholderText('Precio');
    await user.type(nombre, 'Teclado');
    await user.type(precio, '15000');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(setProducts).toHaveBeenCalledTimes(1);
    const lista = setProducts.calls.mostRecent().args[0];
    const nuevo = lista.find((p) => p.id === 999);
    expect(nuevo.name).toBe('Teclado');
    expect(nuevo.price).toBe(15000);
    expect(nombre.value).toBe('');
    expect(precio.value).toBe('');
  });

  it('elimina un producto de la lista', async () => {
    const user = userEvent.setup();
    const products = getProducts();
    const setProducts = jasmine.createSpy('setProducts');
    render(<AdminView products={products} setProducts={setProducts} />);

    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

    const lista = setProducts.calls.mostRecent().args[0];
    expect(lista.length).toBe(products.length - 1);
    expect(lista.some((p) => p.id === products[0].id)).toBe(false);
  });

  it('guarda la categoría seleccionada en el nuevo producto', async () => {
    spyOn(Date, 'now').and.returnValue(777);
    const user = userEvent.setup();
    const setProducts = jasmine.createSpy('setProducts');
    render(<AdminView products={[]} setProducts={setProducts} />);

    await user.type(screen.getByPlaceholderText('Nombre Producto'), 'Mouse');
    await user.type(screen.getByPlaceholderText('Precio'), '12000');
    await user.selectOptions(screen.getByRole('combobox'), 'Categoría 3');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));

    const nuevo = setProducts.calls.mostRecent().args[0].find((p) => p.id === 777);
    expect(nuevo.category).toBe('Categoría 3');
  });

  it('muestra el nombre alternativo y la categoría General si faltan datos', () => {
    const products = [{ id: 1, nombre: 'Viejo', price: 1000 }];
    render(<AdminView products={products} setProducts={() => {}} />);

    expect(screen.getByText('Viejo')).toBeTruthy();
    expect(screen.getByText(/\(General\)/)).toBeTruthy();
  });
});