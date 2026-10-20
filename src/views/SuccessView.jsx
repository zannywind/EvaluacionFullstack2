import React from 'react';

function SuccessView({ order, onNavigate }) {
  return (
    <div className="container my-5 text-center">
      <div className="card p-5 shadow-sm bg-light">
        <h1 className="text-success fw-bold mb-3">¡Compra Realizada con Éxito!</h1>
        <p className="fs-5 text-muted">Número de orden #20261018</p>

        <hr className="my-4" />

        <h4 className="fw-bold mb-3">Detalles del Envío</h4>
        <p className="fs-5 mb-2">
          <strong>Cliente:</strong> {order?.cliente || 'Cliente registrado'}
        </p>
        <p className="fs-5 mb-3">
          <strong>Dirección:</strong> {order?.direccion || 'Dirección predeterminada'}
        </p>

        <h3 className="text-success fw-bold my-3">
          Total Pagado: ${order?.total?.toLocaleString() || '0'}
        </h3>

        <div className="mt-4">
          <button
            className="btn btn-primary btn-lg fw-bold px-4"
            onClick={() => onNavigate && onNavigate('home')}
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessView;