import React from 'react';
import { ProductCard } from 'proyecto-react-vite-6-clases-vitest/src/components/ProductCard';

function CategoriesView({ products, onAddToCart }) {
  const categories = ["Categoría 1", "Categoría 2", "Categoría 3"];

  return (
    <div className="container">
      <h2 className="mb-4 fw-bold">Categorías de Productos</h2>
      {categories.map((cat) => (
        <div key={cat} className="mb-5">
          <h3 className="border-bottom pb-2">{cat}</h3>
          <div className="row">
            {products && products
              .filter((p) => p.category === cat)
              .map((prod) => (
                <ProductCard key={prod.id} product={prod} onAddToCart={onAddToCart} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesView;