import { useState } from 'react';
import { getCategories, saveCategory } from '../../data/adminStore';
export default function AdminCategoriesView({ setProducts }) {
  const [categories, setCategories] = useState(getCategories);
  const [form, setForm] = useState(null); const [error, setError] = useState('');
  const submit = (e) => { e.preventDefault(); try {
    setProducts(saveCategory(form.name, form.previous)); setCategories(getCategories()); setForm(null); setError('');
  } catch (err) { setError(err.message); } };
  return <section><h2>Categorías</h2>{error && <p role="alert" className="alert alert-danger">{error}</p>}
    {!form ? <><button className="btn btn-primary mb-3" onClick={() => { setError(''); setForm({ name: '', previous: null }); }}>Nueva categoría</button>
      <ul className="list-group">{categories.map((c) => <li className="list-group-item d-flex flex-wrap gap-2 justify-content-between" key={c}>{c}<button className="btn btn-outline-primary" onClick={() => { setError(''); setForm({ name: c, previous: c }); }}>Editar {c}</button></li>)}</ul></>
    : <form className="card p-3" onSubmit={submit}><h3>{form.previous ? 'Editar categoría' : 'Nueva categoría'}</h3>
      <label htmlFor="category-name">Nombre de categoría</label><input id="category-name" className="form-control my-2" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <div className="d-flex gap-2"><button className="btn btn-primary">Guardar categoría</button><button type="button" className="btn btn-secondary" onClick={() => setForm(null)}>Cancelar</button></div></form>}
  </section>;
}
