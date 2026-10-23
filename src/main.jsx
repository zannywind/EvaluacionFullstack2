// DEFENSA 01 — ARRANQUE: este archivo conecta React con el div root de index.html.
// App es el componente principal; el CSS de Bootstrap aporta estilos ya preparados.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import App from './App.jsx'

// StrictMode ayuda a detectar problemas en desarrollo; puede repetir efectos para comprobarlos.
// BrowserRouter envuelve App, pero esta versión navega por estado, sin Routes ni Route.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
