import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, test, expect, vi } from 'vitest';
import ProfileView from '../views/ProfileView';
import { getProfile, saveProfile } from '../data/userProfiles';
beforeEach(() => localStorage.clear());
test.each(['camila@example.com', 'DA@gmail.com'])('registro rechaza correo existente o reservado: %s', async (email) => {
  saveProfile({ email: 'camila@example.com', nombre: 'Original', direccion: 'Calle 1' });
  const setUser = vi.fn(); const navigate = vi.fn(); const user = userEvent.setup();
  render(<ProfileView setUser={setUser} onNavigate={navigate} />);
  await user.click(screen.getByRole('button', { name: /No tienes cuenta/ }));
  await user.type(screen.getByLabelText('Nombre Completo'), 'Otro nombre');
  await user.type(screen.getByLabelText('Correo Electrónico'), email);
  await user.type(screen.getByLabelText('Contraseña'), 'demo');
  await user.type(screen.getByLabelText('Dirección'), 'Otra calle');
  await user.click(screen.getByRole('button', { name: 'Registrarse' }));
  expect(screen.getByRole('alert')).toHaveTextContent('registrado o reservado');
  expect(setUser).not.toHaveBeenCalled();
  expect(navigate).not.toHaveBeenCalled();
  expect(getProfile('camila@example.com').nombre).toBe('Original');
  expect(getProfile('da@gmail.com')).toEqual({});
});
test('perfil administrador permite abrir el panel', async () => {
  const navigate = vi.fn();
  render(<ProfileView user={{ nombre: 'admin', email: 'da@gmail.com', isAdmin: true }} setUser={vi.fn()} onNavigate={navigate} />);
  await userEvent.click(screen.getByRole('button', { name: 'Abrir panel administrador' }));
  expect(navigate).toHaveBeenCalledWith('admin');
});
test('registro guarda datos de entrega sin guardar contraseña', async () => {
  const setUser = vi.fn(); const navigate = vi.fn(); const user = userEvent.setup();
  render(<ProfileView setUser={setUser} onNavigate={navigate} />);
  await user.click(screen.getByRole('button', { name: /No tienes cuenta/ }));
  await user.type(screen.getByLabelText('Nombre Completo'), 'Camila Soto');
  await user.type(screen.getByLabelText('Correo Electrónico'), 'camila@example.com');
  await user.type(screen.getByLabelText('Contraseña'), 'prueba');
  await user.type(screen.getByLabelText('Dirección'), 'Calle Uno 123');
  await user.click(screen.getByRole('button', { name: 'Registrarse' }));
  expect(setUser).toHaveBeenCalledWith({ nombre: 'Camila Soto', email: 'camila@example.com', direccion: 'Calle Uno 123', isAdmin: false });
  expect(getProfile('camila@example.com')).toEqual({ nombre: 'Camila Soto', direccion: 'Calle Uno 123' });
  expect(localStorage.getItem('store-profile:camila@example.com')).not.toContain('prueba');
  expect(navigate).toHaveBeenCalledWith('home');
});
test('login recupera el perfil de demostración por correo', async () => {
  saveProfile({ email: 'camila@example.com', nombre: 'Camila', direccion: 'Calle 123' });
  const setUser = vi.fn(); const user = userEvent.setup();
  render(<ProfileView setUser={setUser} onNavigate={vi.fn()} />);
  await user.type(screen.getByLabelText('Correo Electrónico'), 'camila@example.com');
  await user.type(screen.getByLabelText('Contraseña'), 'demo');
  await user.click(screen.getByRole('button', { name: 'Ingresar' }));
  expect(setUser).toHaveBeenCalledWith(expect.objectContaining({ nombre: 'Camila', direccion: 'Calle 123', isAdmin: false }));
});
test('credenciales incorrectas no conceden el rol administrador', async () => {
  const setUser = vi.fn(); const user = userEvent.setup();
  render(<ProfileView setUser={setUser} onNavigate={vi.fn()} />);
  await user.type(screen.getByLabelText('Correo Electrónico'), 'da@gmail.com');
  await user.type(screen.getByLabelText('Contraseña'), 'incorrecta');
  await user.click(screen.getByRole('button', { name: 'Ingresar' }));
  expect(screen.getByRole('alert')).toHaveTextContent('incorrectas');
  expect(setUser).not.toHaveBeenCalled();
});
test('cerrar sesión comunica la salida al padre', async () => {
  const setUser = vi.fn();
  render(<ProfileView user={{ nombre: 'Camila', email: 'c@example.com' }} setUser={setUser} onNavigate={vi.fn()} />);
  await userEvent.click(screen.getByRole('button', { name: 'Cerrar Sesión' }));
  expect(setUser).toHaveBeenCalledWith(null);
});
