import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

// DEFENSA 10 — MENÚ: recibe vista, cantidad del carrito y usuario desde App mediante props.
// expanded controla el menú colapsable de React Bootstrap; expand="xl" lo expande desde xl.
// El enlace Panel Admin solo aparece si user.isAdmin; App también verifica el rol al mostrarlo.
function AppNavbar({ currentView, setCurrentView, cartCount = 0, user }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = (view) => { setCurrentView(view); setExpanded(false); };
  const links = [['home', 'Home'], ['products', 'Productos'], ['categories', 'Categorías'],
    ['offers', 'Ofertas'], ['about', 'Nosotros'], ['blog', 'Blog'], ['contact', 'Contacto']];
  return <Navbar bg="dark" variant="dark" expand="xl" expanded={expanded} onToggle={setExpanded}>
    <Container fluid>
      <Navbar.Brand as="button" className="btn" onClick={() => navigate('home')}><img src="/mai-estor-logo.png" alt="Mai estor" width="156" height="52" style={{ objectFit: 'contain' }} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="store-navigation" aria-label="Abrir menú" />
      <Navbar.Collapse id="store-navigation">
        <Nav className="me-auto">{links.map(([view, label]) =>
          <Nav.Link as="button" key={view} active={currentView === view} onClick={() => navigate(view)}>{label}</Nav.Link>)}
          {user?.isAdmin && <Nav.Link as="button" active={currentView === 'admin'} onClick={() => navigate('admin')}>Panel Admin</Nav.Link>}
        </Nav>
        <div className="d-flex flex-wrap gap-2 py-2">
          <Button variant="outline-light" onClick={() => navigate('profile')}>{user ? user.nombre : 'Iniciar Sesión / Registro'}</Button>
          <Button variant="success" onClick={() => navigate('cart')}>Carrito <span className="badge bg-light text-dark">{cartCount}</span></Button>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
}
export default AppNavbar;
