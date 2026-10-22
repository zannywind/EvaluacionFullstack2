import React, { useState } from 'react';
import { getProfile, saveProfile } from '../data/userProfiles';

function ProfileView({ user, setUser, onNavigate, setCheckoutData }) {
  const [isRegistering, setIsRegistering] = useState(false);

  // Formulario Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Formulario Registro
  const [regNombre, setRegNombre] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regDireccion, setRegDireccion] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setError('');
    if (email.trim().toLowerCase() === 'da@gmail.com' && password !== 'aaa') { setError('Credenciales de administrador incorrectas.'); return; }
    if (email.trim().toLowerCase() === 'da@gmail.com' && password === 'aaa') {
      const adminUser = { email: 'da@gmail.com', nombre: 'admin', ...getProfile('da@gmail.com'), isAdmin: true };
      setUser(adminUser);
      onNavigate('home');
    } else {
      const primerNombre = email.split('@')[0];
      const normalUser = { email: email.trim().toLowerCase(), nombre: primerNombre, ...getProfile(email), isAdmin: false };
      setUser(normalUser);

      if (setCheckoutData) {
        setCheckoutData((prev) => ({ ...prev, email: normalUser.email, nombre: normalUser.nombre, direccion: normalUser.direccion || '' }));
      }
      onNavigate('home');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setError('');
    const normalizedEmail = regEmail.trim().toLowerCase();
    if (normalizedEmail === 'da@gmail.com' || Object.keys(getProfile(normalizedEmail)).length > 0) {
      setError('Este correo ya está registrado o reservado. Inicia sesión con tu cuenta.');
      return;
    }

    if (!regNombre.trim() || !regDireccion.trim()) { setError('Completa nombre y dirección sin usar solo espacios.'); return; }
    const primerNombre = regNombre.trim();
    const newUser = {
      email: regEmail.trim().toLowerCase(),
      direccion: regDireccion.trim(),
      nombre: primerNombre,
      isAdmin: false
    };

    try { saveProfile(newUser); } catch { setError('No se pudo guardar el perfil en este navegador.'); return; }
    setUser(newUser);

    if (setCheckoutData) {
      setCheckoutData((prev) => ({
        ...prev,
        nombre: regNombre,
        email: regEmail,
        direccion: regDireccion
      }));
    }

    onNavigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    onNavigate('home');
  };

  // Si hay usuario logueado, muestra la ficha del perfil con el botón de Salir
  if (user) {
    return (
      <div className="container my-5">
        <div className="card p-3 p-md-5 shadow-sm mx-auto text-center" style={{ maxWidth: '480px' }}>
          <div className="display-4 mb-3">👤</div>
          <h2 className="fw-bold mb-1">
            {user.isAdmin ? 'Administrador' : user.nombre}
          </h2>
          <p className="text-muted fs-5 mb-3">{user.email}</p>

          <div className="mb-4">
            <span className={`badge ${user.isAdmin ? 'bg-danger' : 'bg-primary'} fs-6 px-3 py-2`}>
              {user.isAdmin ? 'Rol: Admin' : 'Rol: Cliente'}
            </span>
          </div>

          <hr />

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {user.isAdmin && <button className="btn btn-primary fw-bold" onClick={() => onNavigate('admin')}>Abrir panel administrador</button>}
            <button
              className="btn btn-outline-secondary fw-bold"
              onClick={() => onNavigate('home')}
            >
              Ir a la Tienda
            </button>
            <button
              className="btn btn-danger fw-bold"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
        <p className="text-muted small">Acceso de demostración: no uses contraseñas reales. Las contraseñas de clientes no se guardan ni verifican; el perfil se recuerda por correo en este navegador.</p>
        {error && <p role="alert" className="alert alert-danger">{error}</p>}
        {!isRegistering ? (
          <>
            <h3 className="text-center fw-bold mb-4">Iniciar Sesión</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Correo Electrónico</label>
                <input id="login-email"
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Contraseña</label>
                <input id="login-password"
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold mb-3">
                Ingresar
              </button>
            </form>

            <div className="text-center">
              <button
                className="btn btn-link text-decoration-none"
                onClick={() => setIsRegistering(true)}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-center fw-bold mb-4">Crear Cuenta</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="register-name" className="form-label">Nombre Completo</label>
                <input id="register-name"
                  type="text"
                  className="form-control"
                  required
                  value={regNombre}
                  onChange={(e) => setRegNombre(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="register-email" className="form-label">Correo Electrónico</label>
                <input id="register-email"
                  type="email"
                  className="form-control"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="register-password" className="form-label">Contraseña</label>
                <input id="register-password"
                  type="password"
                  className="form-control"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div className="mb-3"><label htmlFor="register-address" className="form-label">Dirección</label>
                <input id="register-address" className="form-control" required value={regDireccion} onChange={(e) => setRegDireccion(e.target.value)} /></div>
              <button type="submit" className="btn btn-success w-100 fw-bold mb-3">
                Registrarse
              </button>
            </form>

            <div className="text-center">
              <button
                className="btn btn-link text-decoration-none"
                onClick={() => setIsRegistering(false)}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
