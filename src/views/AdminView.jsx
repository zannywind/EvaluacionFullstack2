import { useState } from 'react';
import { getOrders, getUsers } from '../data/adminStore';
import { saveProfile } from '../data/userProfiles';
import AdminProductsView from './admin/AdminProductsView';
import AdminCategoriesView from './admin/AdminCategoriesView';
import AdminOrdersView from './admin/AdminOrdersView';
import AdminUsersView from './admin/AdminUsersView';
import AdminReportsView from './admin/AdminReportsView';
import AdminStockView from './admin/AdminStockView';

// DEFENSA 11 — ADMINISTRACIÓN: screen elige una subpantalla, igual que currentView en App.
// Los pedidos se leen al montar el panel; dashboard y reportes usan compras persistidas.
// onUserChange informa a App cuando se modifica el perfil, para actualizar también el checkout.
export default function AdminView({ products, setProducts, user, onUserChange }) {
  const [screen, setScreen] = useState('dashboard'); const [orders] = useState(getOrders);
  const [profile, setProfile] = useState({ nombre: user?.nombre || 'admin', direccion: user?.direccion || '' });
  const [message, setMessage] = useState('');
  const links = [['dashboard','Dashboard'], ['orders','Órdenes / Boletas'], ['products','Productos'], ['critical','Productos críticos'], ['categories','Categorías'], ['users','Usuarios'], ['reports','Reportes'], ['profile','Perfil administrador']];
  const save = (event) => { event.preventDefault(); if (!profile.nombre.trim()) { setMessage('Escribe tu nombre.'); return; }
    try { const next = { ...user, ...profile, nombre: profile.nombre.trim() }; saveProfile(next); onUserChange?.(next); setMessage('Perfil actualizado.'); }
    catch { setMessage('No se pudo guardar el perfil.'); }
  };
  return <div className="row g-4 my-3"><aside className="col-lg-3"><h2 className="h4">Administración</h2>
    <nav aria-label="Administración" className="nav nav-pills flex-column gap-1">{links.map(([key,label]) => <button key={key} className={`nav-link text-start ${screen === key ? 'active' : ''}`} aria-current={screen === key ? 'page' : undefined} onClick={() => setScreen(key)}>{label}</button>)}</nav></aside>
    <div className="col-lg-9">
      {screen === 'dashboard' && <section><h2>Dashboard</h2><p>Gestiona la tienda desde el menú administrativo.</p><div className="row g-3">{[['Productos', products.length], ['Órdenes', orders.length], ['Clientes registrados', getUsers().length]].map(([label, value]) => <div className="col-sm-4" key={label}><div className="card p-3"><h3 className="h6">{label}</h3><strong>{value}</strong></div></div>)}</div></section>}
      {screen === 'products' && <><AdminProductsView products={products} setProducts={setProducts} /><div className="d-flex gap-2 flex-wrap"><button className="btn btn-outline-secondary" onClick={() => setScreen('critical')}>Ver productos críticos</button><button className="btn btn-outline-secondary" onClick={() => setScreen('reports')}>Reporte de productos</button></div></>}
      {screen === 'categories' && <AdminCategoriesView setProducts={setProducts} />}
      {screen === 'orders' && <AdminOrdersView orders={orders} />}
      {screen === 'users' && <AdminUsersView orders={orders} />}
      {screen === 'critical' && <AdminStockView products={products} onProducts={() => setScreen('products')} />}
      {screen === 'reports' && <AdminReportsView products={products} orders={orders} />}
      {screen === 'profile' && <form className="card p-3" onSubmit={save}><h2>Perfil administrador</h2><p>{user?.email}</p><label htmlFor="admin-name">Nombre</label><input id="admin-name" className="form-control mb-3" required value={profile.nombre} onChange={(e) => setProfile({ ...profile, nombre: e.target.value })} /><label htmlFor="admin-address">Dirección</label><input id="admin-address" className="form-control mb-3" value={profile.direccion} onChange={(e) => setProfile({ ...profile, direccion: e.target.value })} /><button className="btn btn-primary align-self-start">Guardar perfil</button>{message && <p role="status">{message}</p>}</form>}
    </div></div>;
}
