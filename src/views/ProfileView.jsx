import React, { useState } from 'react';

function ProfileView() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="row justify-content-center my-4">
      <div className="col-md-6">
        <div className="card shadow-sm p-4">
          <h3 className="text-center mb-4 fw-bold">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input type="text" className="form-control" placeholder="Pedro Hácquer" />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" placeholder="ejemplo@correo.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              {isLogin ? "Ingresar" : "Registrarse"}
            </button>
          </form>
          <div className="text-center">
            <button className="btn btn-link text-decoration-none" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
