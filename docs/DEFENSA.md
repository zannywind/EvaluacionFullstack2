# Guía de estudio para la defensa

Estudiar un módulo por vez. En la práctica oral se pregunta de a una y se espera la respuesta.

| Concepto | Archivo | Explicación en este proyecto |
|---|---|---|
| JSX y componente | ProductCard.jsx | Función que devuelve la interfaz de una tarjeta |
| Props | ProductCard.jsx | Recibe product, onAddToCart y onViewProduct desde el padre |
| Estado | App.jsx | Mantiene carrito, usuario y vista para compartirlos entre pantallas |
| useState | ProductsView.jsx | Guarda lo escrito en el buscador y vuelve a renderizar |
| useEffect | App.jsx | Lee productos de la fuente simulada al montar |
| Eventos | ProductCard.jsx | Un clic llama al callback recibido |
| Formulario controlado | admin/AdminProductsView.jsx | value viene del estado y onChange lo actualiza |
| preventDefault | ChekoutView.jsx | Evita el envío tradicional y permite procesar la compra con React |
| Condicional | CartView.jsx | Muestra mensaje vacío o tabla según contenido |
| Bootstrap | AppNavbar.jsx, ProductCard.jsx | Menú adaptable y columnas según ancho |
| CRUD | mockData.js | Crear, leer, actualizar y eliminar productos |
| Persistencia | mockData.js, userProfiles.js | JSON en localStorage; no es una base de datos remota |
| Navegación | App.jsx | Cambia currentView; BrowserRouter no proporciona rutas en esta versión |
| Vitest | vite.config.js | Ejecuta pruebas en jsdom y calcula cobertura V8 |
| Testing Library | tests/*.test.jsx | Busca por rol/etiqueta e interactúa como un usuario |
| Mock | ProductCard.test.jsx | vi.fn observa si el hijo comunica el producto al padre |
| Aislamiento | tests/setup.js | cleanup desmonta lo renderizado después de cada prueba |

Preguntas para practicar: ¿por qué el carrito vive en App?, ¿qué diferencia hay entre props y estado?,
¿por qué no modificamos directamente un array del estado?, ¿qué conserva localStorage?,
¿qué mide branches?, ¿por qué una cobertura alta no garantiza ausencia de errores?,
¿qué cambia entre el login de demostración y una autenticación real?

## Ensayo de 15 minutos

1. Minutos 0–2: explicar objetivo, React/Vite y estructura de carpetas.
2. Minutos 2–5: recorrer catálogo, detalle, carrito y checkout, incluyendo un error y reintento.
3. Minutos 5–8: mostrar CRUD; explicar props, useState, useEffect y persistencia en archivos concretos.
4. Minutos 8–12: ejecutar pruebas y explicar diez casos representativos, incluyendo eventos, formularios, mocks y casos límite.
5. Minutos 12–15: mostrar cobertura, explicar sus cuatro métricas y reconocer límites de la simulación.

Preparar respuestas individuales; la presentación pesa 60%. No afirmar que hay rutas URL, autenticación real o pagos reales.

## Diez casos para explicar

ProductCard: props y callback; producto ausente. Catálogo: búsqueda y cero coincidencias. Carrito: total por cantidades; vaciado. Checkout: domicilio; retiro; fallo de almacenamiento. Administración: crear/editar/eliminar; fallo al eliminar. El inventario completo está en TESTING.md.

## Ejemplo de respuesta

¿Qué es un mock? Una función u objeto controlado en la prueba. Con vi.fn comprobamos qué producto comunica la tarjeta. Con vi.spyOn(Storage.prototype, 'setItem') simulamos que guardar falla y verificamos que no se pierde el carrito. Al terminar restauramos el comportamiento original.

¿Qué es cobertura de ramas? Mide alternativas ejecutadas: por ejemplo comprar correctamente y manejar un error. Tener líneas ejecutadas no demuestra por sí solo que el resultado sea correcto; necesitamos expect.
