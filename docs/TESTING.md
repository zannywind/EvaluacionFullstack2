# Documento de testing y cobertura

Fecha: 22 de octubre de 2026. Herramientas: Vitest 3.2.7, Testing Library, user-event, jsdom y cobertura V8.
Verificación actual: Node 24.19.0, dependencias existentes del proyecto. Comandos: `node node_modules/vitest/vitest.mjs run --coverage` y `node node_modules/vite/bin/vite.js build`. No se reinstalaron dependencias en esta revisión.
Vitest está autorizado por el profesor, según confirmación del estudiante.

## Objetivo y método

Verificar comportamientos observables del frontend: renderizado, props, estado, eventos,
formularios, condiciones, persistencia y flujo de compra. Las pruebas se ejecutan en un DOM simulado;
no sustituyen las pruebas visuales del navegador ni validan pagos o servidores reales.

`src/tests/setup.js` registra `afterEach(cleanup)` para desmontar los componentes después de cada prueba.
Los casos con persistencia limpian localStorage antes de ejecutarse. Los callbacks de componentes
se observan mediante `vi.fn()`. En los flujos integrados se usa App y la persistencia real de jsdom,
sin reemplazar la lógica de negocio por mocks.

## Resultados ejecutados

- Ejecución de Vitest con cobertura: **45 aprobadas, 0 fallidas, 10 archivos aprobados**.
- npm run build: **correcto**, 380 módulos transformados.
- Antes de los cambios: 4 pruebas, 1 aprobada y 3 fallidas; 11,35% de líneas.
- No se modificaron las dependencias ni se excluyeron archivos de cobertura para aumentar los porcentajes.

## Inventario de casos

| Archivo | Casos | Propósito |
|---|---:|---|
| Counter.test.jsx | 2 | Valor inicial y clic; componente didáctico heredado |
| ProductCard.test.jsx | 3 | Props y callback, detalle, producto ausente |
| ProfileView.test.jsx | 7 | Registro/persistencia sin contraseña, recuperación del perfil, rechazo de credencial admin inválida, logout, rechazo de correos duplicados/reservados y acceso al panel |
| Catalog.test.jsx | 4 | Búsqueda y cero resultados, ofertas, ofertas vacías, categoría individual y vuelta |
| Data.test.js | 6 | Datos iniciales/vacío, CRUD, validación, edición inexistente, recuperación de JSON corrupto |
| Cart.test.jsx | 2 | Total por cantidades/eliminación, vaciar y ocultar compra |
| Checkout.test.jsx | 6 | Domicilio, retiro sin dirección, error conservando carrito, espacios inválidos, carrito vacío |
| AdminFlow.test.jsx | 6 | Recorrido administrativo: producto, stock crítico, categorías, usuarios/historial, boletas/reportes, perfil y validaciones |
| Admin.test.jsx | 4 | Crear/editar/eliminar persistido, cancelar edición, validación de nombre |
| App.test.jsx | 5 | Compra completa con error y reintento, navegación pública/contacto, admin/precio del carrito/logout |

Hay 43 pruebas de tienda/datos, además de las 2 del contador. Se supera el objetivo de diez sin depender de los ejemplos antiguos.

## Cobertura global reportada por V8

| Métrica | Cubiertos / total | Porcentaje |
|---|---:|---:|
| Statements | 1028 / 1076 | 95.53 % |
| Branches | 370 / 418 | 88.51 % |
| Functions | 120 / 143 | 83.91 % |
| Lines | 1028 / 1076 | 95.53 % |

- Statements: instrucciones ejecutadas.
- Branches: alternativas de decisiones recorridas.
- Functions: funciones ejecutadas.
- Lines: líneas ejecutadas.

Los porcentajes describen ejecución, no garantizan que cada resultado esté comprobado.
En JSX, transformaciones y mapas de código pueden producir líneas cubiertas con funciones o ramas sin ejecutar.
Por eso se analizan las cuatro métricas junto con las afirmaciones de cada caso.

## Lo que aún no cubren las pruebas

- `main.jsx`: 0%; las pruebas montan App o componentes directamente.
- `StoragePanel.jsx`: 0%; ejemplo de clase no conectado a la tienda.
- Existen callbacks y alternativas sin recorrer: algunos botones de retorno, fallback de imágenes,
  valores opcionales y fallos de escritura por cuota/permisos del navegador.
- No se validó visualmente el diseño en móvil/tableta/escritorio: no había un navegador conectado a la herramienta.
- No se simula autenticación segura, un backend, envíos de correo ni pagos reales.
- La navegación utiliza estado: no se prueba historial de rutas porque no está implementado.

## Evidencias y reproducción

Ejecutar `npm ci`, `npm run coverage` y `npm run build`.
Abrir `coverage/index.html`; `coverage/coverage-summary.json` contiene los conteos.
El ZIP incluye una copia del informe HTML de esta ejecución. El informe se regenera al correr cobertura.
Consultar PRUEBAS_MANUALES.md para la revisión visual y la demostración oral.

## Diferencias corregidas

ProductCard.test usaba props antiguas; ProfileView.test buscaba un formulario eliminado.
Counter.test fallaba porque la pantalla anterior no se limpiaba. Ahora las pruebas usan los
contratos actuales y cada ejecución inicia con componentes desmontados.

La ampliación administrativa se verificó con pruebas de interacción y persistencia. Se mantienen pendientes la revisión visual del navegador y escenarios de cuota de almacenamiento agotada.

Se verificó la migración de categorías genéricas e imágenes antiguas conservando precios y productos personalizados.

## Correcciones verificadas en la revisión final

- Home informa catálogo vacío en vez de cargar indefinidamente (App.test).
- El perfil del administrador actualiza nombre y dirección del checkout (App.test).
- Un fallo de almacenamiento al eliminar muestra un error y conserva el producto (Admin.test).
- Un fallo al guardar la orden conserva el carrito y no comunica éxito (Checkout.test).
- Checkout limpia localStorage antes de cada prueba y restaura los mocks después.
- Una primera ejecución registró 44 aprobadas y un timeout del flujo integrado de compra a los 5 segundos. La repetición completa aprobó 45/45. Se asignó luego un límite de 15 segundos solo a ese recorrido, manteniendo sus comprobaciones, y se verificó nuevamente App.test.
- Se intentó revisión visual en el navegador integrado con localhost y 127.0.0.1; ambas conexiones agotaron su tiempo de espera. La revisión de dispositivos continúa pendiente, no se declara aprobada.

Las pruebas de App son de integración entre componentes; las de componentes y datos verifican responsabilidades más pequeñas. No deben presentarse todas como pruebas unitarias aisladas.
