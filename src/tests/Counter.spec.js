import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/Counter';

describe('Counter', () => {
  it('muestra el valor inicial en 0', () => {
    render(<Counter />);
    expect(screen.getByText('Valor: 0')).toBeTruthy();
  });

  it('aumenta el estado en 1 cada vez que se presiona Aumentar', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const boton = screen.getByRole('button', { name: 'Aumentar' });
    await user.click(boton);
    await user.click(boton);

    expect(screen.getByText('Valor: 2')).toBeTruthy();
  });
});