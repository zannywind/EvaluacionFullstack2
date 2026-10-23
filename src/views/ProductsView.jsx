import React, { useState } from "react";
import ProductCard from '../components/ProductCard';

// DEFENSA 04 — CATÁLOGO: recibe productos por props y reutiliza ProductCard para cada resultado.
function ProductsView({ products = [], onAddToCart, onViewProduct }) {
  const [search, setSearch] = useState('');

  // filter genera una lista según el buscador sin borrar productos de la fuente original.
  // Es un dato calculado: se recalcula cuando React renderiza con el nuevo search.
  const filteredProducts = products.filter((p) => {
    const productName = p?.name || p?.nombre || '';
    return productName.toLowerCase().includes(search.toLocaleLowerCase());
  });

  // FORMULARIO CONTROLADO: value muestra search; onChange actualiza search al escribir.
  // map crea las tarjetas; key identifica cada producto entre sus hermanos.
  // El ternario muestra resultados o el mensaje vacío: renderizado condicional.
  return (
    <div className="container">
      <h2 className="mb-4 fw-bold">Catalogo de Productos</h2>


      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          aria-label="Buscar producto"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) =>setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onViewProduct={onViewProduct} />
          ))
        ) : (
          <p className="text-muted">No se encontraron productos</p>
        )}
      </div>
    </div>
  )
}

export default ProductsView;