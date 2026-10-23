import { getProducts, categoryName } from './mockData';
import { getProfile, saveProfile } from './userProfiles';

// DEFENSA 12 — DATOS ADMINISTRATIVOS: categorías, usuarios y pedidos en localStorage.
// Leer JSON inválido devuelve una lista vacía; los errores de escritura llegan al formulario.
function readList(key) {
  try { const data = JSON.parse(localStorage.getItem(key)); return Array.isArray(data) ? data : []; }
  catch { return []; }
}
export function getCategories() {
  return [...new Set([...readList('store-categories').map(categoryName), ...getProducts().map((p) => p.category)].filter(Boolean))];
}
// Renombrar categoría también actualiza los productos asociados para mantener consistencia.
export function saveCategory(name, previous = null) {
  const clean = name.trim();
  if (!clean) throw new Error('Escribe un nombre de categoría.');
  const categories = getCategories();
  if (categories.some((c) => c.toLowerCase() === clean.toLowerCase() && c !== previous)) throw new Error('La categoría ya existe.');
  if (previous && !categories.includes(previous)) throw new Error('La categoría ya no existe.');
  const next = previous ? categories.map((c) => c === previous ? clean : c) : [...categories, clean];
  const products = getProducts().map((p) => p.category === previous ? { ...p, category: clean } : p);
  const oldCategories = localStorage.getItem('store-categories');
  try {
    localStorage.setItem('store-categories', JSON.stringify(next));
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    if (oldCategories === null) localStorage.removeItem('store-categories'); else localStorage.setItem('store-categories', oldCategories);
    throw error;
  }
  return products;
}
export function getUsers() {
  return Object.keys(localStorage).filter((key) => key.startsWith('store-profile:')).map((key) => {
    const email = key.slice('store-profile:'.length); return { email, ...getProfile(email) };
  }).filter((u) => u.nombre && u.email !== 'da@gmail.com');
}
export function saveUser(data, editing = false) {
  const email = data.email.trim().toLowerCase();
  if (!data.nombre.trim() || !data.direccion.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Completa nombre, correo válido y dirección.');
  if (email === 'da@gmail.com') throw new Error('Este correo está reservado al administrador.');
  const exists = getUsers().some((u) => u.email === email);
  if (!editing && exists) throw new Error('Ya existe un usuario con ese correo.');
  if (editing && !exists) throw new Error('El usuario ya no existe.');
  saveProfile({ email, nombre: data.nombre.trim(), direccion: data.direccion.trim() });
}
export const getOrders = () => readList('store-orders');
// Guardamos fecha y copia histórica del pedido; sus precios no dependen del catálogo futuro.
export function recordOrder(order) {
  const saved = { ...order, email: order.email.trim().toLowerCase(), date: new Date().toISOString() };
  localStorage.setItem('store-orders', JSON.stringify([...getOrders(), saved]));
  return saved;
}
