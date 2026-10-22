import { useState } from 'react';
export function Receipt({ order, onBack }) {
  return <article className="card p-3"><h3>Boleta de demostración #{order.id}</h3><p>No es un documento tributario ni acredita un pago real.</p>
    <p>Cliente: {order.cliente} — {order.email}</p><p>Fecha: {new Date(order.date).toLocaleString('es-CL')}</p><p>Entrega: {order.direccion}</p>
    <div className="table-responsive"><table className="table"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th></tr></thead><tbody>
      {order.items.map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.quantity}</td><td>${p.price.toLocaleString('es-CL')}</td><td>${(p.price * p.quantity).toLocaleString('es-CL')}</td></tr>)}
    </tbody></table></div><strong>Total: ${order.total.toLocaleString('es-CL')}</strong>
    <button className="btn btn-outline-secondary align-self-start mt-3" onClick={onBack}>Volver a órdenes</button></article>;
}
export default function AdminOrdersView({ orders, title = 'Órdenes y boletas' }) {
  const [selected, setSelected] = useState(null);
  if (selected) return <Receipt order={selected} onBack={() => setSelected(null)} />;
  return <section><h2>{title}</h2>{orders.length === 0 ? <p>No hay compras registradas.</p> : <ul className="list-group">{orders.map((order) =>
    <li className="list-group-item d-flex flex-wrap gap-2 justify-content-between" key={order.id}><span>#{order.id} — {order.cliente} — ${order.total.toLocaleString('es-CL')}</span><button className="btn btn-outline-primary" onClick={() => setSelected(order)}>Mostrar boleta {order.id}</button></li>)}</ul>}</section>;
}
