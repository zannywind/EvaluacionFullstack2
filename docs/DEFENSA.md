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
| Formulario controlado | AdminView.jsx | value viene del estado y onChange lo actualiza |
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
