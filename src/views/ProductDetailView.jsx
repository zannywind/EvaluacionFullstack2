import React from 'react';

export default function ProductDetailView({ product, onAddToCart, onNavigate }) {
  if (!product) return <p role="status">El producto no está disponible.</p>;
  return <section className="row g-4 my-3">
    <div className="col-md-5"><img src={product.image || '/product-placeholder.svg'} alt={product.name} className="img-fluid rounded w-100" style={{ maxHeight: 420, objectFit: 'contain', backgroundColor: 'white' }}
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/product-placeholder.svg'; }} /></div>
    <div className="col-md-7"><h2>{product.name}</h2><p>{product.category}</p>
      {product.offer && <p className="badge bg-danger">En oferta</p>}
      <p>{product.description || 'Producto del catálogo de nuestra tienda de videojuegos y accesorios.'}</p>
      <p className="fs-4">${product.price.toLocaleString('es-CL')}</p>
      <div className="d-flex flex-wrap gap-2"><button className="btn btn-primary" onClick={() => onAddToCart(product)}>Añadir al Carrito</button>
        <button className="btn btn-outline-secondary" onClick={() => onNavigate('products')}>Volver al catálogo</button></div>
    </div>
  </section>;
}
