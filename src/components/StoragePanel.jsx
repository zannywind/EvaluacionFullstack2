import { Button } from 'react-bootstrap'

function StoragePanel({ nombreGuardado, ultimaVista, onLimpiar }) {
  return (
    <div className="component-box component-purple">
      <div className="area-label">Componente: StoragePanel</div>

      <h4>Datos almacenados</h4>

      <p className="mb-1">
        <strong>localStorage:</strong>{' '}
        {nombreGuardado || 'Todavía no hay nombre guardado'}
      </p>

      <p>
        <strong>sessionStorage:</strong>{' '}
        {ultimaVista || 'Todavía no hay una vista registrada'}
      </p>

      <Button variant="outline-danger" onClick={onLimpiar}>
        Limpiar storage
      </Button>
    </div>
  )
}

export default StoragePanel
