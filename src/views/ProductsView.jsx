import { useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

const productos = [
  {
    id: 1,
    nombre: 'Teclado mecánico',
    descripcion: 'Ejemplo de producto reutilizando el mismo componente.',
    precio: 39990,
  },
  {
    id: 2,
    nombre: 'Mouse inalámbrico',
    descripcion: 'Los datos llegan a ProductCard mediante props.',
    precio: 24990,
  },
  {
    id: 3,
    nombre: 'Audífonos',
    descripcion: 'La vista decide qué datos entregar al componente.',
    precio: 29990,
  },
]

function ProductsView() {
  const [seleccionado, setSeleccionado] = useState(null)

  function seleccionarProducto(producto) {
    setSeleccionado(producto)
    sessionStorage.setItem('productoSeleccionado', JSON.stringify(producto))
  }

  return (
    <section className="view-box view-blue">
      <div className="area-label">Vista: ProductsView.jsx</div>

      <h1>Productos</h1>
      <p>
        Esta vista tiene los datos y se los pasa al componente ProductCard usando props.
      </p>

      {seleccionado && (
        <Alert variant="info">
          Seleccionaste: <strong>{seleccionado.nombre}</strong>.
          También quedó guardado en sessionStorage.
        </Alert>
      )}

      <Row className="g-3">
        {productos.map((producto) => (
          <Col md={4} key={producto.id}>
            <ProductCard
              producto={producto}
              onSeleccionar={seleccionarProducto}
            />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default ProductsView
