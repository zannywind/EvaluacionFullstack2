import React from 'react';

function AppNavbar({ currentView, setCurrentView, cartCount = 0, user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a
        className="navbar-brand fw-bold"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentView('home');
        }}
      >
        Mai estor
      </a>

      {/* Links de navegación principales (SIN Perfil/Registro ni Admin por defecto) */}
      <div className="navbar-nav me-auto">
        <button
          className={`nav-link btn btn-link ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          Home
        </button>
        <button
          className={`nav-link btn btn-link ${currentView === 'products' ? 'active' : ''}`}
          onClick={() => setCurrentView('products')}
        >
          Productos
        </button>
        <button
          className={`nav-link btn btn-link ${currentView === 'categories' ? 'active' : ''}`}
          onClick={() => setCurrentView('categories')}
        >
          Categorías
        </button>
        <button
          className={`nav-link btn btn-link ${currentView === 'offers' ? 'active' : ''}`}
          onClick={() => setCurrentView('offers')}
        >
          Ofertas
        </button>

        {/* Panel Admin SOLO si está logueado como Admin */}
        {user && user.isAdmin && (
          <button
            className={`nav-link btn btn-link ${currentView === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentView('admin')}
          >
            Panel Admin
          </button>
        )}
      </div>

      {/* Zona Derecha: Perfil / Registro + Carrito */}
      <div className="d-flex align-items-center gap-2">
        {user ? (
          <button
            className="btn btn-outline-light fw-bold"
            onClick={() => setCurrentView('profile')}
          >
            👤 {user.isAdmin ? 'admin' : user.nombre}
          </button>
        ) : (
          <button
            className="btn btn-primary fw-bold"
            onClick={() => setCurrentView('profile')}
          >
            Iniciar Sesión / Registro
          </button>
        )}

        <button className="btn btn-success" onClick={() => setCurrentView('cart')}>
          Carrito <span className="badge bg-light text-dark ms-1">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}

export default AppNavbar;