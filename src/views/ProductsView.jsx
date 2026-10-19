import React, { useState } from "react";
import ProductCard from '../components/ProductCard';

function ProductsView({ products, onAddToCart}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts= products ? products.filter((p) =>
    p.name.toLowercase().includes(searchTerm.toLocaleLowerCase())
  ) : [];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Catalogo Completo</h2>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) =>setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <div className="col-12 alert alert-warning">
            No se encontraron productos que coincidan con la busqueda
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsView;