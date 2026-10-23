import React from "react";
import ProductCard from '../components/ProductCard'

function HomeView({ products, onAddToCart, onViewProduct }) {
  const featuredProducts = products.slice(0, 4);
  return (
    <div className="container">
      <div className= "p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">Bienvenido a mi Tienda!</h1>
        <p className="fs-4 text-muted">
          Encuentra los mejores juegos y consolas al mejor precio.
        </p>
    </div>

    <h3 className="mb-4 fw-bold">Productos Destacados</h3>
    <div className="row">
      {featuredProducts.length > 0 ? (
        featuredProducts.map((p) =>(
          <ProductCard key= {p.id} product={p} onAddToCart={onAddToCart} onViewProduct={onViewProduct} />
        ))
      ) : (
        <p role="status">No hay productos disponibles.</p>
      )}
      </div>
    </div>
  )
}

export default HomeView;