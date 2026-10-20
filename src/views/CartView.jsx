import React from 'react';

function CartView({ cart, setCart, onNavigate }) {
  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío.</div>
      ) : (
        <>
          <table className="table align-middle shadow-sm bg-white rounded">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name || item.nombre}</td>
                  <td>${item.price?.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="fw-bold m-0">Total: ${total.toLocaleString()}</h4>
            <div>
              <button
                className="btn btn-secondary me-2"
                onClick={handleClearCart}
              >
                Vaciar Carrito
              </button>
              <button
                className="btn btn-success fw-bold"
                onClick={() => onNavigate('checkout')}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartView;