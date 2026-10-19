import React from "react";

function CartView({ cart, onRemoveFromCart, onClearCart, setCurrentView, total}) {
    return (
        <div className="container">
            <h2 className="fw-bold mb-4">Carrito de Compras</h2>
            {!cart || cart.length === 0 ? (
                <div className="alert alert-info">El carrito esta vacio</div>
            ) : (
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total: ${total}</h4>
                    <div>
                        <button className="btn btn-secondary me-2" onClick={onClearCart}>Vaciar Carrito</button>
                        <button className="btn btn-success"onClick={() => setCurrentView("Chekout")}>Comprar ahora</button>
                    </div>
                </div>
            </div>          
            )}
        </div>   
    );
}

export default CartView