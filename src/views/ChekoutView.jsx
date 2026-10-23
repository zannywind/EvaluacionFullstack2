import { recordOrder } from '../data/adminStore';
import React, { useState } from 'react';

// DEFENSA 06 — CHECKOUT: formulario de compra simulada; no realiza cobros reales.
// checkoutData vive en App para conservar los datos al ir al error y volver.
function ChekoutView({ cart, setCart, onNavigate, setLastOrder, checkoutData, setCheckoutData, hasError, setHasError }) {
  const [simulateFailure, setSimulateFailure] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const units = cart.reduce((sum, item) => sum + item.quantity, 0);
  const delivery = checkoutData.entrega || 'domicilio';
  // FORMULARIO CONTROLADO: value lee del estado y onChange llama a change para actualizarlo.
  // ...prev conserva los otros campos; [key] elige cuál cambiar (nombre, email, etc.).
  const change = (key, value) => { setHasError(false); setCheckoutData((prev) => ({ ...prev, [key]: value })); };
  const handleSubmit = (event) => {
    // Evita el envío tradicional del formulario y su recarga; procesamos con JavaScript.
    event.preventDefault();
    // VALIDACIÓN: trim rechaza espacios; la dirección solo es obligatoria para domicilio.
    if (!cart.length || !checkoutData.nombre.trim() || !checkoutData.email.trim() ||
      (delivery === 'domicilio' && !checkoutData.direccion.trim())) {
      setHasError(true); return;
    }
    if (simulateFailure) { setHasError(true); onNavigate('error'); return; }
    try {
    // Primero persistimos el pedido. Solo si funciona vaciamos el carrito y mostramos éxito.
    // Si guardar falla, catch lleva al error sin perder el carrito para poder reintentar.
    const order = recordOrder({ id: crypto.randomUUID(), email: checkoutData.email, cliente: checkoutData.nombre.trim(),
      direccion: delivery === 'retiro' ? 'Retiro en tienda' : checkoutData.direccion.trim(),
      entrega: delivery, total, items: cart.map((item) => ({ ...item })) });
    setLastOrder(order);
    setHasError(false); setCart([]); onNavigate('success');
    } catch { setHasError(true); onNavigate('error'); }
  };
  if (!cart.length) return <section className="my-4"><h2>Finalizar compra</h2><p role="status">Tu carrito está vacío.</p>
    <button className="btn btn-primary" onClick={() => onNavigate('products')}>Ver productos</button></section>;

  return <section className="my-4">
    <h2>Finalizar compra</h2>
    <p className="text-muted">Compra de demostración: no se realizan cobros reales.</p>
    <div className="row g-4">
      <div className="col-md-8"><form onSubmit={handleSubmit} className="card p-3 p-md-4">
        <h3 className="h5">Datos de entrega</h3>
        {hasError && <p role="alert" className="alert alert-danger">No se completó la compra. Revisa tus datos o desactiva la simulación de error para reintentar.</p>}
        <label htmlFor="checkout-name" className="form-label">Nombre completo</label>
        <input id="checkout-name" className="form-control mb-3" autoComplete="name" required value={checkoutData.nombre} onChange={(e) => change('nombre', e.target.value)} />
        <label htmlFor="checkout-email" className="form-label">Correo electrónico</label>
        <input id="checkout-email" className="form-control mb-3" type="email" autoComplete="email" required value={checkoutData.email} onChange={(e) => change('email', e.target.value)} />
        <label htmlFor="checkout-delivery" className="form-label">Opción de entrega</label>
        <select id="checkout-delivery" className="form-select mb-3" value={delivery} onChange={(e) => change('entrega', e.target.value)}>
          <option value="domicilio">Despacho a domicilio (sin costo en esta demostración)</option>
          <option value="retiro">Retiro en tienda</option>
        </select>
        {delivery === 'domicilio' && <><label htmlFor="checkout-address" className="form-label">Dirección de envío</label>
          <input id="checkout-address" className="form-control mb-3" autoComplete="street-address" required value={checkoutData.direccion} onChange={(e) => change('direccion', e.target.value)} /></>}
        <div className="form-check mb-3"><input id="simulate-error" className="form-check-input" type="checkbox" checked={simulateFailure} onChange={(e) => setSimulateFailure(e.target.checked)} />
          <label htmlFor="simulate-error" className="form-check-label">Simular error de compra (demostración)</label></div>
        <button className="btn btn-success" type="submit">Confirmar compra ${total.toLocaleString('es-CL')}</button>
      </form></div>
      <aside className="col-md-4"><div className="card p-3"><h3 className="h5">Resumen de compra</h3>
        <p>Total unidades: {units}</p>
        <ul>{cart.map((item) => <li key={item.id}>{item.name} × {item.quantity}</li>)}</ul>
        <strong>Total: ${total.toLocaleString('es-CL')}</strong>
      </div></aside>
    </div>
  </section>;
}
export default ChekoutView;
