import React from 'react';

export function ProductCard({ product, onAddToCart, onViewProduct }) {
  if (!product) return null;

  const title = product.name || product.nombre || 'Producto';
  const price = product.price ?? product.precio ?? 0;
  const image = product.image || product.imagen || '/product-placeholder.svg';

  return (
    <div className="col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={image}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/product-placeholder.svg'; }}
          className="card-img-top"
          alt={title}
          style={{ height: '230px', objectFit: 'contain', padding: '12px', backgroundColor: '#fff' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-success fw-bold fs-5">${price.toLocaleString('es-CL')}</p>
          {onViewProduct && <button className="btn btn-outline-secondary mt-2" onClick={() => onViewProduct(product)}>Ver detalle</button>}
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
