import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import StoragePanel from '../components/StoragePanel'

function ProfileView() {
  const [nombre, setNombre] = useState('')
  const [nombreGuardado, setNombreGuardado] = useState('')
  const [ultimaVista, setUltimaVista] = useState('')

  useEffect(() => {
    const nombreLocal = localStorage.getItem('nombreAlumno') || ''
    setNombreGuardado(nombreLocal)

    sessionStorage.setItem('ultimaVista', 'Perfil y Storage')
    setUltimaVista(sessionStorage.getItem('ultimaVista') || '')
  }, [])

  function guardarNombre(event) {
    event.preventDefault()
    localStorage.setItem('nombreAlumno', nombre)
    setNombreGuardado(nombre)
    setNombre('')
  }

  function limpiarStorage() {
    localStorage.removeItem('nombreAlumno')
    sessionStorage.removeItem('ultimaVista')
    sessionStorage.removeItem('productoSeleccionado')
    setNombreGuardado('')
    setUltimaVista('')
  }

  return (
    <section className="view-box view-purple">
      <div className="area-label">Vista: ProfileView.jsx</div>

      <h1>Perfil y almacenamiento</h1>

      <p>
        localStorage permanece aunque cierres el navegador.
        sessionStorage dura mientras la sesión o pestaña siga activa.
      </p>

      <div className="component-box component-pink mb-3">
        <div className="area-label">Formulario dentro de ProfileView</div>

        <Form onSubmit={guardarNombre}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del alumno</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="Ej: Camila"
              required
            />
          </Form.Group>

          <Button type="submit">Guardar en localStorage</Button>
        </Form>
      </div>

      <StoragePanel
        nombreGuardado={nombreGuardado}
        ultimaVista={ultimaVista}
        onLimpiar={limpiarStorage}
      />
    </section>
  )
}

export default ProfileView
