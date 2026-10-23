import { getCategories } from '../../data/adminStore';
import React, { useState } from 'react';
import { addProduct, updateProduct, deleteProduct } from '../../data/mockData';

const emptyForm = { name: '', price: '', category: 'Videojuegos', offer: false, stock: 10 };

// DEFENSA 08 — CRUD EN PANTALLA: conecta el formulario con las funciones de mockData.
// App pasa changeProducts como setProducts: actualiza catálogo y sincroniza el carrito.
function AdminProductsView({ products, setProducts }) {
  const [screen, setScreen] = useState('list');
  const [selected, setSelected] = useState(null);
  // form guarda lo escrito; editingId distingue crear (null) de editar un producto existente.
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const reset = () => { setForm(emptyForm); setEditingId(null); setError(''); setScreen('list'); };
  const handleSave = (event) => {
    // Evita recarga. Number convierte los valores del formulario antes de validarlos.
    event.preventDefault();
    try {
      const data = { ...form, price: Number(form.price), stock: Number(form.stock) };
      const updated = editingId === null ? addProduct(data) : updateProduct(editingId, data);
      // Persistencia y estado son distintos: las funciones CRUD guardan, esta llamada refresca React.
      setProducts(updated);
      setMessage(editingId === null ? 'Producto creado.' : 'Producto actualizado.');
      reset();
    } catch (err) { setError(err.message); setMessage(''); }
  };
  const edit = (product) => {
    setScreen('form');
    setEditingId(product.id);
    setForm({ name: product.name, price: String(product.price), category: product.category, offer: Boolean(product.offer), stock: product.stock ?? 10 });
    setError(''); setMessage('');
  };
  const remove = (id) => {
    try {
      setProducts(deleteProduct(id));
      if (editingId === id) reset();
      setMessage('Producto eliminado.');
    } catch { setError('No se pudo guardar el cambio en este navegador.'); }
  };

  // Cada input usa value/checked y onChange: formulario controlado por estado.
  // screen decide entre listado, detalle y formulario; error/message explican el resultado.
  return <section className="my-4">
    <h2>Productos</h2>
    {error && <p role="alert" className="alert alert-danger">{error}</p>}
    <div className="d-flex gap-2 flex-wrap mb-3"><button className="btn btn-primary" onClick={() => { setForm({ ...emptyForm, category: getCategories()[0] || 'Videojuegos' }); setEditingId(null); setError(''); setMessage(''); setScreen('form'); }}>Nuevo producto</button>
      <button className="btn btn-outline-secondary" onClick={() => setScreen('list')}>Listado de productos</button></div>
    {screen === 'detail' && selected && <article className="card p-3"><h3>{selected.name}</h3><p>Categoría: {selected.category}</p><p>Precio: ${selected.price.toLocaleString('es-CL')}</p><p>Existencias: {selected.stock ?? 10}</p><p>{selected.offer ? 'En oferta' : 'Precio normal'}</p>
      <button className="btn btn-primary align-self-start" onClick={() => edit(selected)}>Editar producto</button></article>}
    {screen === 'form' &&
    <form onSubmit={handleSave} className="card p-3 p-md-4 my-3">
      <h3 className="h5">{editingId === null ? 'Agregar producto' : 'Editar producto'}</h3>
      <div className="row g-3">
        <div className="col-md-5"><label htmlFor="product-name" className="form-label">Nombre del producto</label>
          <input id="product-name" className="form-control" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="col-md-3"><label htmlFor="product-price" className="form-label">Precio</label>
          <input id="product-price" className="form-control" type="number" min="1" step="1" required value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
        <div className="col-md-4"><label htmlFor="product-category" className="form-label">Categoría</label>
          <select id="product-category" className="form-select" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {getCategories().map((c) => <option key={c}>{c}</option>)}
          </select></div>
        <div className="col-md-4"><label htmlFor="product-stock" className="form-label">Existencias</label><input id="product-stock" type="number" min="0" step="1" required className="form-control" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
        <div className="col-12 form-check ms-2"><input id="product-offer" className="form-check-input" type="checkbox"
          checked={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.checked })} />
          <label htmlFor="product-offer" className="form-check-label">En oferta</label></div>
      </div>
      <div className="d-flex flex-wrap gap-2 mt-3">
        <button className="btn btn-primary" type="submit">{editingId === null ? 'Guardar' : 'Guardar cambios'}</button>
        {editingId !== null && <button className="btn btn-outline-secondary" type="button" onClick={reset}>Cancelar edición</button>}
      </div>
    </form>}
    {message && <p role="status" className="alert alert-success">{message}</p>}
    {screen === 'list' && <><h3 className="h5">Productos existentes</h3>
    {products.length === 0 && <p>No hay productos. Agrega el primero.</p>}
    <ul className="list-group">{products.map((p) => <li key={p.id} className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
      <span><strong>{p.name}</strong> — ${p.price.toLocaleString('es-CL')} ({p.category})</span>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary btn-sm" aria-label={`Mostrar ${p.name}`} onClick={() => { setSelected(p); setScreen('detail'); }}>Mostrar</button>
        <button className="btn btn-outline-primary btn-sm" aria-label={`Editar ${p.name}`} onClick={() => edit(p)}>Editar</button>
        <button className="btn btn-danger btn-sm" aria-label={`Eliminar ${p.name}`} onClick={() => remove(p.id)}>Eliminar</button>
      </div>
    </li>)}</ul></>}
  </section>;
}
export default AdminProductsView;
