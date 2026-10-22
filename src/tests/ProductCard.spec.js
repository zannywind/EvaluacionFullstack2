import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';

const producto = {
  id: 1,
  name: 'Zelda',
  price: 59990,
  image: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
};

describe('ProductCard', () => {
  it('muestra el nombre, el precio y la imagen recibidos por props', () => {
    render(<ProductCard product={producto} />);

    expect(screen.getByText('Zelda')).toBeTruthy();
    expect(screen.getByText(`$${producto.price.toLocaleString()}`)).toBeTruthy();
    expect(screen.getByAltText('Zelda')).toBeTruthy();
  });

  it('llama a onAddToCart con el producto al hacer clic en Añadir', async () => {
    const user = userEvent.setup();
    const onAddToCart = jasmine.createSpy('onAddToCart');
    render(<ProductCard product={producto} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole('button', { name: /añadir al carrito/i }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(producto);
  });

  it('usa nombre y precio en español si no vienen en inglés', () => {
    render(<ProductCard product={{ nombre: 'Mouse', precio: 12000 }} />);

    expect(screen.getByText('Mouse')).toBeTruthy();
    expect(screen.getByText(`$${(12000).toLocaleString()}`)).toBeTruthy();
  });

  it('no renderiza nada sin producto y usa valores por defecto si faltan datos', () => {
    const { container, unmount } = render(<ProductCard />);
    expect(container.firstChild).toBeNull();
    unmount();

    render(<ProductCard product={{}} />);
    expect(screen.getByText('Producto')).toBeTruthy();
    expect(screen.getByText('$0')).toBeTruthy();
  });
});