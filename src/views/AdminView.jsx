import React, { useState } from 'react';

function AdminView({ products, onAddProduct, onDeleteProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Categoría 1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onAddProduct({
      name,
      price: Number(price),
      category,
      offer: false,
      image: "https://via.placeholder.com/400x300?text=Nuevo"
    });
    setName('');
    setPrice('');
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Panel de Administración (Dashboard)</h2>
      <div className="card p-4 my-3 bg-light shadow-sm">
        <h4>Agregar Nuevo Producto</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Nombre Producto" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Categoría 1">Categoría 1</option>
              <option value="Categoría 2">Categoría 2</option>
              <option value="Categoría 3">Categoría 3</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Guardar</button>
          </div>
        </form>
      </div>

      <h4 className="mt-4">Lista de Productos Existentes</h4>
      <ul className="list-group">
        {products && products.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span><strong>{p.name}</strong> - ${p.price} ({p.category})</span>
            <button className="btn btn-danger btn-sm" onClick={() => onDeleteProduct(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminView;