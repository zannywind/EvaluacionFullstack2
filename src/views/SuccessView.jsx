import React from "react";

function SuccessView({ orderData, total, setCurrentView}) {
    return (
        <div className="container my-5 text-center">
            <div className="alert alert-success p-4 shadow-sm">
                <h2 className="text-success fw-bold">¡Compra Realizada con Éxito!</h2>
                <p className="lead">Numero de orden #20261018</p>
                <hr />
                <h5>Detalles del Envio</h5>
                <p><strong>Cliente:</strong> {orderData?.nombre} {orderData?.apellidos}</p>
                <p><strong>Direccion:</strong> {orderData?.calle} {orderData?.comuna}</p>
                <h4>Total Pagado: ${total}</h4>
                <button className="btn btn-primary mt-3" onClick={() =>setCurrentView("home")}>Volver a la Tienda</button>
            </div>
        </div>
    )
}

export default SuccessView;