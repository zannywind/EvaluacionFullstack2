import React from 'react';

function ChekoutView({
  cart,
  setCart,
  onNavigate,
  setLastOrder,
  checkoutData,
  setCheckoutData,
  hasError,
  setHasError
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const direccionLimpia = checkoutData.direccion.trim().toLowerCase();

    if (direccionLimpia === 'plaza de maipu') {
      setHasError(false);
      if (setLastOrder) {
        setLastOrder({
          cliente: checkoutData.nombre,
          direccion: checkoutData.direccion,
          total: total
        });
      }
      setCart([]);
      onNavigate('success');
    } else {
      // Si la dirección no es "plaza de maipu", vaciamos ÚNICAMENTE la casilla de dirección y mostramos error
      setHasError(true);
      setCheckoutData((prev) => ({ ...prev, direccion: '' }));
      onNavigate('error');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Finalizar Compra</h2>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
            <h4 className="fw-bold mb-3">Datos de Envío</h4>

            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                required
                value={checkoutData.nombre}
                onChange={(e) =>
                  setCheckoutData({ ...checkoutData, nombre: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                required
                value={checkoutData.email}
                onChange={(e) =>
                  setCheckoutData({ ...checkoutData, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección de Envío</label>
              <input
                type="text"
                className={`form-control ${hasError ? 'is-invalid' : ''}`}
                placeholder="Ej: Plaza de Maipu"
                required
                value={checkoutData.direccion}
                onChange={(e) => {
                  setHasError(false);
                  setCheckoutData({ ...checkoutData, direccion: e.target.value });
                }}
              />
              {hasError ? (
                <div className="text-danger fw-bold mt-1">
                  este dato esta mal ingresado
                </div>
              ) : (
                <div className="form-text text-muted">
                  * Zona de cobertura activa: <strong>Plaza de Maipu</strong>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-success btn-lg fw-bold w-100">
              Pagar ${total.toLocaleString()}
            </button>
          </form>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Resumen de Compra</h5>
            <p className="text-muted mb-2">Total ítems: {cart.length}</p>
            <h4 className="fw-bold text-success">${total.toLocaleString()}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChekoutView;