import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import HomeView from './views/HomeView'
import ProductsView from './views/ProductsView'
import ProfileView from './views/ProfileView'

function App() {
  return (
    <div className="app-shell">
      <AppNavbar />

      <Container className="py-4">
        <div className="app-area">
          <div className="area-label">App.jsx — contenedor principal</div>

          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/productos" element={<ProductsView />} />
            <Route path="/perfil" element={<ProfileView />} />
          </Routes>
        </div>
      </Container>
    </div>
  )
}

export default App
