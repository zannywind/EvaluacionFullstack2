import { Alert, Col, Row } from 'react-bootstrap'
import Counter from '../components/Counter'

function HomeView() {
  return (
    <section className="view-box view-green">
      <div className="area-label">Vista: HomeView.jsx</div>

      <h1>Inicio</h1>
      <p>Esta vista resume varios conceptos trabajados durante las clases.</p>

      <Alert variant="success">
        App.jsx contiene las rutas. HomeView.jsx es una vista separada.
      </Alert>

      <Row className="g-3">
        <Col md={7}>
          <div className="component-box component-green">
            <div className="area-label">Componente visual dentro de la vista</div>
            <h4>¿Qué estamos usando?</h4>
            <ul className="mb-0">
              <li>React con Vite</li>
              <li>React Bootstrap</li>
              <li>React Router</li>
              <li>Componentes y props</li>
              <li>State</li>
              <li>localStorage y sessionStorage</li>
              <li>Pruebas unitarias</li>
            </ul>
          </div>
        </Col>

        <Col md={5}>
          <Counter />
        </Col>
      </Row>
    </section>
  )
}

export default HomeView
