import React from 'react';
import ProductCard from '../components/ProductCard';

function OffersView({ products, onAddToCart, onViewProduct }) {
    const offers = products ? products.filter((p) => p.offer) : [];

    return (
        <div className='container'>
            <h2 className='mb-4 text-danger fw-bold'> Productos en Oferta</h2>
            <div className='row'>
                {offers.length > 0 ? (
                    offers.map((p) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onViewProduct={onViewProduct} />)
                ) : (
                    <p>No hay ofertas disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
}

export default OffersView;