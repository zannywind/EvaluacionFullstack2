import React from 'react';

export function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  const title = product.name || product.nombre || 'Producto';
  const price = product.price || product.precio || 0;
  const image = product.image || product.imagen || 'https://via.placeholder.com/400x300';

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-success fw-bold fs-5">${price.toLocaleString()}</p>
          <button
            className="btn btn-primary w-100 mt-2"
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
