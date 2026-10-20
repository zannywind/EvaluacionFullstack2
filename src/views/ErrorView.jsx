import React from 'react';

function ErrorView({ onNavigate }) {
  return (
    <div className="container my-5 text-center">
      <div className="card p-5 shadow-sm bg-light border-danger">
        <h1 className="text-danger fw-bold mb-3">No se pudo realizar el pago</h1>
        <p className="fs-5 text-muted">
          Ocurrió un problema al procesar los datos de tu tarjeta o formulario.
        </p>

        <hr className="my-4" />

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-warning btn-lg fw-bold px-4"
            onClick={() => onNavigate && onNavigate('checkout')}
          >
            Volver a Intentar el Pago
          </button>
          <button
            className="btn btn-secondary btn-lg fw-bold px-4"
            onClick={() => onNavigate && onNavigate('home')}
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorView;