import { getCategories } from '../data/adminStore';
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

function CategoriesView({ products = [], onAddToCart, onViewProduct }) {
  const [selected, setSelected] = useState(null);
  const categories = [...new Set([...getCategories(), ...products.map((p) => p.category)])];
  if (selected) return <section><h2>{selected}</h2>
    <button className="btn btn-outline-secondary mb-3" onClick={() => setSelected(null)}>Todas las categorías</button>
    {!products.some((p) => p.category === selected) && <p>Esta categoría todavía no tiene productos.</p>}
    <div className="row">{products.filter((p) => p.category === selected).map((p) =>
      <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onViewProduct={onViewProduct} />)}</div>
  </section>;
  return <section><h2>Categorías de productos</h2>
    {categories.length === 0 && <p>No hay categorías disponibles.</p>}
    <div className="row g-3">{categories.map((category) => <div className="col-sm-6 col-lg-4" key={category}>
      <button className="btn btn-outline-primary w-100 p-4" onClick={() => setSelected(category)}>{category}</button>
    </div>)}</div>
  </section>;
}
export default CategoriesView;
