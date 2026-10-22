import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, beforeEach } from 'vitest';
import AdminView from '../views/AdminView';
import { getProducts, updateProduct } from '../data/mockData';
import { getCategories, saveCategory, getUsers, saveUser, recordOrder, getOrders } from '../data/adminStore';
import { getProfile } from '../data/userProfiles';
const admin = { nombre: 'admin', email: 'da@gmail.com', isAdmin: true };
function Panel() { const [products,setProducts] = useState(getProducts); const [user,setUser] = useState(admin); return <AdminView products={products} setProducts={setProducts} user={user} onUserChange={setUser} />; }
const nav = (name) => within(screen.getByRole('navigation', { name: 'Administración' })).getByRole('button', { name, exact: true });
const order = { id: 'test-order', email: 'ana@example.com', cliente: 'Ana', direccion: 'Calle 123', total: 2000, items: [{ id: 1, name: 'Juego', price: 1000, quantity: 2 }] };
beforeEach(() => localStorage.clear());
test('dashboard navega a mostrar producto y después a editarlo', async () => {
  const user=userEvent.setup(); render(<Panel />); expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  await user.click(nav('Productos')); await user.click(screen.getByRole('button', { name: 'Mostrar Zelda: Tears of the Kingdom' }));
  expect(screen.getByText('Existencias: 10')).toBeInTheDocument(); await user.click(screen.getByRole('button', { name: 'Editar producto', exact: true }));
  await user.clear(screen.getByLabelText('Existencias')); await user.type(screen.getByLabelText('Existencias'),'2');
  await user.click(screen.getByRole('button', { name: 'Guardar cambios' })); await user.click(nav('Productos críticos'));
  expect(screen.getByText('Zelda: Tears of the Kingdom: 2 unidades')).toBeInTheDocument();
  await user.clear(screen.getByLabelText(/Mostrar productos/)); await user.type(screen.getByLabelText(/Mostrar productos/),'1');
  expect(screen.getByText(/No hay productos críticos/)).toBeInTheDocument();
});
test('crear y renombrar categoría actualiza la categoría de productos asociados', async () => {
  const user=userEvent.setup(); render(<Panel />); await user.click(nav('Categorías'));
  await user.click(screen.getByRole('button', { name:'Nueva categoría' })); await user.type(screen.getByLabelText('Nombre de categoría'),'Periféricos');
  await user.click(screen.getByRole('button', { name:'Guardar categoría' })); expect(getCategories()).toContain('Periféricos');
  await user.click(screen.getByRole('button', { name:'Editar Videojuegos' })); await user.clear(screen.getByLabelText('Nombre de categoría')); await user.type(screen.getByLabelText('Nombre de categoría'),'Juegos');
  await user.click(screen.getByRole('button', { name:'Guardar categoría' })); expect(getProducts()[0].category).toBe('Juegos');
});
test('nuevo usuario, detalle, edición e historial muestran su boleta', async () => {
  recordOrder(order); const user=userEvent.setup(); render(<Panel />); await user.click(nav('Usuarios'));
  await user.click(screen.getByRole('button', { name:'Nuevo usuario' })); await user.type(screen.getByLabelText('Nombre'),'Ana'); await user.type(screen.getByLabelText('Correo'),'ana@example.com'); await user.type(screen.getByLabelText('Dirección'),'Calle 123');
  await user.click(screen.getByRole('button', { name:'Guardar usuario' })); await user.click(screen.getByRole('button', { name:'Mostrar usuario ana@example.com' }));
  await user.click(screen.getByRole('button', { name:'Editar usuario' })); expect(screen.getByLabelText('Correo')).toHaveAttribute('readonly');
  await user.clear(screen.getByLabelText('Nombre')); await user.type(screen.getByLabelText('Nombre'),'Ana Soto'); await user.click(screen.getByRole('button', { name:'Guardar usuario' }));
  expect(getUsers()[0].nombre).toBe('Ana Soto'); await user.click(screen.getByRole('button', { name:'Mostrar usuario ana@example.com' })); await user.click(screen.getByRole('button', { name:'Historial de compras' })); await user.click(screen.getByRole('button', { name:'Mostrar boleta test-order' }));
  expect(screen.getByRole('heading', { name:/Boleta de demostración/ })).toBeInTheDocument(); expect(screen.getByText('Total: $2.000')).toBeInTheDocument();
});
test('órdenes persistidas alimentan boletas y reportes sin inventar ventas', async () => {
  recordOrder(order); const user=userEvent.setup(); render(<Panel />); await user.click(nav('Órdenes / Boletas')); await user.click(screen.getByRole('button', { name:'Mostrar boleta test-order' }));
  expect(screen.getByText('Juego')).toBeInTheDocument(); await user.click(screen.getByRole('button', { name:'Volver a órdenes' })); await user.click(nav('Reportes'));
  expect(within(screen.getByRole('table')).getByText('2')).toBeInTheDocument(); expect(getOrders()).toHaveLength(1);
});
test('perfil administrativo guarda cambios sin perder el rol', async () => {
  const user=userEvent.setup(); render(<Panel />); await user.click(nav('Perfil administrador')); await user.clear(screen.getByLabelText('Nombre')); await user.type(screen.getByLabelText('Nombre'),'Administrador Demo');
  await user.click(screen.getByRole('button', { name:'Guardar perfil' })); expect(screen.getByRole('status')).toHaveTextContent('Perfil actualizado'); expect(getProfile(admin.email).nombre).toBe('Administrador Demo');
});
test('validaciones impiden categorías duplicadas, usuarios duplicados y stock negativo', () => {
  expect(() => saveCategory('Videojuegos')).toThrow('ya existe'); expect(() => saveCategory(' ')).toThrow();
  const data = { email:'ana@example.com', nombre:'Ana', direccion:'Calle 123' }; saveUser(data);
  expect(() => saveUser(data)).toThrow('Ya existe'); expect(() => saveUser({ ...data, email:'da@gmail.com' })).toThrow('reservado');
  expect(() => updateProduct(1, { stock:-1 })).toThrow('existencias'); expect(() => updateProduct(1, { stock:1.5 })).toThrow();
});
