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
});