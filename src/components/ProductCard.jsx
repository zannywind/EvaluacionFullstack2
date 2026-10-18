import { Button, Card } from 'react-bootstrap'

function ProductCard({ producto, onSeleccionar }) {
  return (
    <Card className="component-box component-blue h-100">
      <div className="area-label">Componente: ProductCard</div>

      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text>{producto.descripcion}</Card.Text>
        <Card.Text>
          <strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}
        </Card.Text>

        <Button variant="primary" onClick={() => onSeleccionar(producto)}>
          Seleccionar producto
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
