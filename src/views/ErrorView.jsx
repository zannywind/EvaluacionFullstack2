import React from 'react';

function ErrorView({ setCurrentView }) {
  return (
    <div className="container my-5 text-center">
      <div className="alert alert-danger p-4 shadow-sm">
        <h2 className="fw-bold"> No se pudo realizar el pago</h2>
        <p>Ocurrio un problema al procesar los datos de tu tarjeta o formulario.</p>
        <button className="btn btn-warning mt-3 me-2" onClick={() => setCurrentView("checkout")}>Volver a Intentar el Pago</button>
        <button className="btn btn-secondary mt-3" onClick={() => setCurrentView("home")}>Ir al Inicio</button>
      </div>
    </div>
  );
}

export default ErrorView;