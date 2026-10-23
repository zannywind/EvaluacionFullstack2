// Perfiles de demostración: no se almacenan contraseñas ni roles administrativos.
// DEFENSA — Cada correo normalizado identifica un perfil en este navegador.
// No se persisten contraseñas ni permisos; el usuario activo se mantiene aparte en App.
const keyFor = (email) => `store-profile:${email.trim().toLowerCase()}`;
export function getProfile(email) {
  try {
    const value = JSON.parse(localStorage.getItem(keyFor(email)));
    if (value && typeof value.nombre === 'string' && typeof value.direccion === 'string') {
      return { nombre: value.nombre, direccion: value.direccion };
    }
  } catch { /* Un perfil inválido no bloquea el acceso de demostración. */ }
  return {};
}
export function saveProfile({ email, nombre, direccion }) {
  localStorage.setItem(keyFor(email), JSON.stringify({ nombre, direccion }));
}
