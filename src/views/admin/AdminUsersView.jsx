import { useState } from 'react';
import { getUsers, saveUser } from '../../data/adminStore';
import AdminOrdersView from './AdminOrdersView';
export default function AdminUsersView({ orders }) {
  const [users, setUsers] = useState(getUsers); const [screen, setScreen] = useState('list');
  const [selected, setSelected] = useState(null); const [form, setForm] = useState({ nombre: '', email: '', direccion: '' });
  const [error, setError] = useState(''); const [editing, setEditing] = useState(false);
  const edit = (value = null) => { setEditing(Boolean(value)); setForm(value || { nombre: '', email: '', direccion: '' }); setError(''); setScreen('form'); };
  const submit = (e) => { e.preventDefault(); try { saveUser(form, editing); setUsers(getUsers()); setScreen('list'); } catch (err) { setError(err.message); } };
  return <section><h2>Usuarios</h2><p className="text-muted">Perfiles locales de demostración; no se gestionan contraseñas ni permisos reales.</p>
    <div className="d-flex gap-2 mb-3"><button className="btn btn-primary" onClick={() => edit()}>Nuevo usuario</button><button className="btn btn-outline-secondary" onClick={() => setScreen('list')}>Listado de usuarios</button></div>
    {screen === 'list' && (users.length ? <ul className="list-group">{users.map((u) => <li className="list-group-item d-flex flex-wrap gap-2 justify-content-between" key={u.email}>{u.nombre} — {u.email}<button className="btn btn-outline-primary" onClick={() => { setSelected(u); setScreen('detail'); }}>Mostrar usuario {u.email}</button></li>)}</ul> : <p>No hay usuarios registrados.</p>)}
    {screen === 'detail' && <article className="card p-3"><h3>{selected.nombre}</h3><p>{selected.email}</p><p>{selected.direccion}</p><div className="d-flex flex-wrap gap-2"><button className="btn btn-primary" onClick={() => edit(selected)}>Editar usuario</button><button className="btn btn-outline-primary" onClick={() => setScreen('history')}>Historial de compras</button></div></article>}
    {screen === 'history' && <AdminOrdersView orders={orders.filter((o) => o.email === selected.email)} title={`Historial de ${selected.nombre}`} />}
    {screen === 'form' && <form className="card p-3" onSubmit={submit}><h3>{editing ? 'Editar usuario' : 'Registrar usuario'}</h3>
      {error && <p role="alert">{error}</p>}
      {[['nombre', 'Nombre'], ['email', 'Correo'], ['direccion', 'Dirección']].map(([key,label]) => <div className="mb-3" key={key}><label htmlFor={`user-${key}`}>{label}</label><input id={`user-${key}`} className="form-control" type={key === 'email' ? 'email' : 'text'} readOnly={editing && key === 'email'} required value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></div>)}
      {editing && <p>El correo identifica al usuario y vincula su historial; no se cambia al editar.</p>}
      <div className="d-flex gap-2"><button className="btn btn-primary">Guardar usuario</button><button type="button" className="btn btn-secondary" onClick={() => setScreen('list')}>Cancelar</button></div></form>}
  </section>;
}
