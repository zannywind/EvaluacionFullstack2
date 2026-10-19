import React, { useState } from "react";
import ProductCard from '../components/ProductCard';

function ProductsView({ products = [], onAddToCart}) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p) => {
    const productName = p?.name || p?.nombre || '';
    return productName.toLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <div className="container">
      <h2 className="mb-4 fw-bold">Catalogo de Productos</h2>


      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) =>setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p className="text-muted">No se encontraron productos</p>
        )}
      </div>
    </div>
  )
}

export default ProductsView;