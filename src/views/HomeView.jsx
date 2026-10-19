import React from "react";
import { ProductCard } from 'proyecto-react-vite-6-clases-vitest/src/components/ProductCard'

function HomeView({ products, onAddToCart }) {
  return (
    <div>
      <div className= "p-5 mb-4 bg-light rounded 3 text-center border shadow-sm">
        <h1 className="display-4 fw-bold">Nuevos Lanzamientos</h1>
        <p className="lead text-muted">
          Encuentra los mejores juegos y consolas al mejor precio.
        </p>
    </div>

    <h2 className="mb-4 fw-bold">Productos Destacados</h2>
    <div className="row">
      {products && products.length > 0 ? (
        products,slice(0, 4).map((product) =>(
          <ProductCard key= {product.id} product={product} onAddToCart={onAddToCart} />
        ))
      ) : (
        <p>Cargando productos...</p>
      )}
      </div>
    </div>
  )
}

export default HomeView;