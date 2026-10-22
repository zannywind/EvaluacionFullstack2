// Perfiles de demostración: no se almacenan contraseñas ni roles administrativos.
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
