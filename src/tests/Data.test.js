import { beforeEach, test, expect } from 'vitest';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../data/mockData';
import { getProfile } from '../data/userProfiles';
beforeEach(() => localStorage.clear());
test('el catálogo inicial se guarda y una lista vacía no se repuebla', () => {
  expect(getProducts()).toHaveLength(5);
  expect(JSON.parse(localStorage.getItem('products'))).toHaveLength(5);
  localStorage.setItem('products', '[]'); expect(getProducts()).toEqual([]);
});
test('crear, actualizar y eliminar persisten los cambios del producto', () => {
  const created = addProduct({ name: ' Control ', price: 100, category: 'Accesorios', offer: false }).at(-1);
  expect(created.name).toBe('Control');
  updateProduct(created.id, { name: 'Control nuevo', price: 200, offer: true });
  expect(getProducts().find((p) => p.id === created.id)).toMatchObject({ name: 'Control nuevo', price: 200, offer: true });
  deleteProduct(created.id); expect(getProducts().some((p) => p.id === created.id)).toBe(false);
});
test('rechaza productos inválidos sin modificar el catálogo', () => {
  const before = getProducts();
  expect(() => addProduct({ name: ' ', price: 10 })).toThrow();
  expect(() => addProduct({ name: 'Control', price: -10 })).toThrow();
  expect(() => addProduct({ name: 'Control', price: Infinity })).toThrow();
  expect(getProducts()).toEqual(before);
});
test('editar un producto inexistente no crea uno accidentalmente', () => {
  expect(() => updateProduct('missing', { name: 'Otro', price: 100 })).toThrow('ya no existe');
  expect(getProducts()).toHaveLength(5);
});
test('datos corruptos se recuperan sin bloquear la tienda', () => {
  localStorage.setItem('products', '{'); expect(getProducts()).toHaveLength(5);
  localStorage.setItem('store-profile:c@example.com', '{'); expect(getProfile('c@example.com')).toEqual({});
});

test('actualiza imágenes y categorías antiguas sin perder precios ni productos personalizados', () => {
  localStorage.setItem('products', JSON.stringify([
    { id: 1, name: 'Zelda: Tears of the Kingdom', price: 12345, category: 'Categoría 1', image: '/product-placeholder.svg' },
    { id: 9, name: 'Personalizado', price: 500, category: 'Mi categoría', image: '/mi-imagen.jpg' }
  ]));
  const products = getProducts();
  expect(products[0]).toMatchObject({ price: 12345, category: 'Videojuegos', image: '/products/zelda.jpg' });
  expect(products[1]).toMatchObject({ name: 'Personalizado', category: 'Mi categoría', image: '/mi-imagen.jpg' });
  expect(JSON.parse(localStorage.getItem('products'))).toEqual(products);
});
