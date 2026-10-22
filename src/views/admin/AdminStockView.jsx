import { useState } from 'react';
export default function AdminStockView({ products, onProducts }) {
  const [limit, setLimit] = useState(5);
  const critical = products.filter((p) => (p.stock ?? 10) <= limit);
  return <section><h2>Productos críticos</h2><p>Existencias ingresadas manualmente. En esta simulación las compras no descuentan inventario.</p>
    <label htmlFor="stock-limit">Mostrar productos con existencias menores o iguales a</label><input id="stock-limit" className="form-control my-2" style={{ maxWidth: 160 }} type="number" min="0" step="1" value={limit} onChange={(e) => setLimit(Math.max(0, Math.floor(Number(e.target.value))))} />
    {critical.length ? <ul className="list-group mb-3">{critical.map((p) => <li className="list-group-item" key={p.id}>{p.name}: {p.stock ?? 10} unidades</li>)}</ul> : <p>No hay productos críticos con este límite.</p>}
    <button className="btn btn-primary" onClick={onProducts}>Gestionar existencias</button></section>;
}
