import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppNavbar from '../components/AppNavbar';

describe('AppNavbar', () => {
  it('muestra "Panel Admin" solo cuando el usuario es administrador', () => {
    const { rerender } = render(
      <AppNavbar currentView="home" setCurrentView={() => {}} />
    );
    expect(screen.getByText('Iniciar Sesión / Registro')).toBeTruthy();
    expect(screen.queryByText('Panel Admin')).toBeNull();

    rerender(
      <AppNavbar
        currentView="home"
        setCurrentView={() => {}}
        user={{ isAdmin: true }}
      />
    );
    expect(screen.getByText('Panel Admin')).toBeTruthy();
  });

  it('llama a setCurrentView con "products" al hacer clic en Productos', async () => {
    const user = userEvent.setup();
    const setCurrentView = jasmine.createSpy('setCurrentView');
    render(<AppNavbar currentView="home" setCurrentView={setCurrentView} />);

    await user.click(screen.getByRole('button', { name: 'Productos' }));

    expect(setCurrentView).toHaveBeenCalledWith('products');
  });

  it('muestra el nombre del usuario y el contador del carrito', () => {
    render(
      <AppNavbar
        currentView="home"
        setCurrentView={() => {}}
        user={{ nombre: 'Camila', isAdmin: false }}
        cartCount={3}
      />
    );

    expect(screen.getByText(/Camila/)).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.queryByText('Panel Admin')).toBeNull();
  });

  it('navega a la vista correcta con cada botón del menú', async () => {
    const user = userEvent.setup();
    const setCurrentView = jasmine.createSpy('setCurrentView');
    render(<AppNavbar currentView="home" setCurrentView={setCurrentView} />);

    await user.click(screen.getByRole('button', { name: 'Categorías' }));
    expect(setCurrentView).toHaveBeenCalledWith('categories');

    await user.click(screen.getByRole('button', { name: 'Ofertas' }));
    expect(setCurrentView).toHaveBeenCalledWith('offers');

    await user.click(screen.getByRole('button', { name: /carrito/i }));
    expect(setCurrentView).toHaveBeenCalledWith('cart');

    await user.click(screen.getByText('Iniciar Sesión / Registro'));
    expect(setCurrentView).toHaveBeenCalledWith('profile');

    await user.click(screen.getByText('Mai estor'));
    expect(setCurrentView).toHaveBeenCalledWith('home');
  });

  it('navega a Home, Panel Admin y Perfil, y marca la vista activa', async () => {
    const user = userEvent.setup();
    const setCurrentView = jasmine.createSpy('setCurrentView');
    render(
      <AppNavbar
        currentView="products"
        setCurrentView={setCurrentView}
        user={{ isAdmin: true }}
      />
    );

    expect(screen.getByRole('button', { name: 'Productos' }).className).toContain('active');

    await user.click(screen.getByRole('button', { name: 'Home' }));
    expect(setCurrentView).toHaveBeenCalledWith('home');

    await user.click(screen.getByRole('button', { name: 'Panel Admin' }));
    expect(setCurrentView).toHaveBeenCalledWith('admin');

    await user.click(screen.getByRole('button', { name: /^\S+ admin$/ }));
    expect(setCurrentView).toHaveBeenCalledWith('profile');
  });
});