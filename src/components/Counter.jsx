import { useState } from 'react'
import { Button } from 'react-bootstrap'

function Counter() {
  const [contador, setContador] = useState(0)

  function aumentar() {
    setContador(contador + 1)
  }

  return (
    <div className="component-box component-orange">
      <div className="area-label">Componente: Counter</div>

      <h4>Estado con useState</h4>
      <p>Valor: {contador}</p>

      <Button variant="warning" onClick={aumentar}>
        Aumentar
      </Button>
    </div>
  )
}

export default Counter
