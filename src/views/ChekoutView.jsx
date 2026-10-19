import React, { useState } from 'react';

function ChekoutView({ total, onProcessPayment }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    comuna: 'Cerrillos',
    region: 'Región Metropolitana de Santiago'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.correo && formData.calle) {
      onProcessPayment(true, formData);
    } else {
      onProcessPayment(false, formData);
    }
  };

  return (
    <div className="container my-4">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="mb-3 fw-bold">Información de Pago</h3>
        <p className="fw-bold text-primary">Total a Pagar: ${total}</p>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre *</label>
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellidos</label>
              <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico *</label>
            <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} required />
          </div>

          <h5 className="mt-4">Dirección de Entrega</h5>
          <div className="mb-3">
            <label className="form-label">Calle y Número *</label>
            <input type="text" className="form-control" name="calle" value={formData.calle} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100 mt-3">
            Pagar Ahora ${total}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChekoutView;