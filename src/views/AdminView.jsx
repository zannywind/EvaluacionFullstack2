import React, { useState } from 'react';
import { addProduct, deleteProduct } from '../data/mockData';

function AdminView({ products, setProducts }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Categoría 1');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd = {
      name,
      price: Number(price),
      category,
      offer: false,
      image: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(name)
    };

    const updated = addProduct(newProd);
    setProducts(updated);
    setName('');
    setPrice('');
  };

  const handleDelete = (id) => {
    const updated = deleteProduct(id);
    setProducts(updated);
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Panel de Administración (Dashboard)</h2>

      {/* Formulario */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="fw-bold mb-3">Agregar Nuevo Producto</h4>
        <form onSubmit={handleAdd} className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre Producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Categoría 1">Categoría 1</option>
              <option value="Categoría 2">Categoría 2</option>
              <option value="Categoría 3">Categoría 3</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Guardar
            </button>
          </div>
        </form>
      </div>

      {/* Lista */}
      <h4 className="fw-bold mb-3">Lista de Productos Existentes</h4>
      <ul className="list-group shadow-sm">
        {products.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{p.name || p.nombre}</strong> - ${p.price?.toLocaleString()} ({p.category || 'General'})
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(p.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminView;