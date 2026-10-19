import React from "react";

function AppNavbar({ currentView, setCurrentView, cartCount}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-3">
      <div className="container-fluid">
        <button
        className="navbar-brand btn btn-link text-white text-decoration-none fw-bold"
        onClick={() => setCurrentView('home')}
      >
        Mai estor
      </button>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
              className={`nav-link btn ${currentView === 'home' ? 'active fw-bold' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn ${currentView === 'products' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentView('products')}
              >
                Productos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn ${currentView === 'categories' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentView('categories')}
              >
                Categorias
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn ${currentView === 'offers' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentView('offers')}
              >
                Ofertas
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn ${currentView === 'profile' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentView('profile')}
              >
                Perfil / Registro
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn ${currentView === 'admin' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentView('admin')}
              >
                Panel Admin
              </button>
            </li> 
          </ul>

          <button className="btn btn-success" onClick={() => setCurrentView('cart')}>
            Carrito <span className="badge bd-light text-dark ms-1">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
