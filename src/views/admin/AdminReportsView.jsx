// DEFENSA — REPORTES: reduce suma importes; Map agrupa unidades e ingresos por producto.
// Se calculan desde pedidos guardados; no se inventan ventas para llenar la pantalla.
export default function AdminReportsView({ orders, products }) {
  const total = orders.reduce((sum, o) => sum + o.total, 0);
  const sold = new Map();
  orders.forEach((o) => o.items.forEach((p) => { const row = sold.get(p.id) || { name: p.name, units: 0, total: 0 }; row.units += p.quantity; row.total += p.price * p.quantity; sold.set(p.id, row); }));
  return <section><h2>Reportes</h2><p>Compras simuladas guardadas en este navegador, sin datos ficticios adicionales.</p>
    <div className="row g-3 mb-3">{[['Órdenes', orders.length], ['Total de compras', `$${total.toLocaleString('es-CL')}`], ['Productos en catálogo', products.length]].map(([label, value]) => <div className="col-md-4" key={label}><div className="card p-3"><h3 className="h6">{label}</h3><strong>{value}</strong></div></div>)}</div>
    <h3 className="h5">Compras por producto</h3>{sold.size === 0 ? <p>No hay compras para generar el reporte.</p> : <div className="table-responsive"><table className="table"><thead><tr><th>Producto</th><th>Unidades compradas</th><th>Total</th></tr></thead><tbody>{[...sold].map(([id, row]) => <tr key={id}><td>{row.name}</td><td>{row.units}</td><td>${row.total.toLocaleString('es-CL')}</td></tr>)}</tbody></table></div>}
  </section>;
}
