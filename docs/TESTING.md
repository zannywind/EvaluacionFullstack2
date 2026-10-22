# Documento de testing y cobertura

Fecha: 22 de octubre de 2026. Herramientas: Vitest 3.2.7, Testing Library, user-event, jsdom y cobertura V8.
Entorno ejecutado: Node 22.14.0 / npm 10.9.2. Dependencias instaladas con npm ci.
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

- npm run coverage -- --coverage.reportOnFailure: **41 aprobadas, 0 fallidas, 10 archivos aprobados**.
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
| Checkout.test.jsx | 5 | Domicilio, retiro sin dirección, error conservando carrito, espacios inválidos, carrito vacío |
| AdminFlow.test.jsx | 6 | Recorrido administrativo: producto, stock crítico, categorías, usuarios/historial, boletas/reportes, perfil y validaciones |
| Admin.test.jsx | 3 | Crear/editar/eliminar persistido, cancelar edición, validación de nombre |
| App.test.jsx | 3 | Compra completa con error y reintento, navegación pública/contacto, admin/precio del carrito/logout |

Hay 39 pruebas de tienda/datos, además de las 2 del contador. Se supera el objetivo de diez sin depender de los ejemplos antiguos.

## Cobertura global reportada por V8

| Métrica | Cubiertos / total | Porcentaje |
|---|---:|---:|
| Statements | 1028 / 1076 | 95.53 % |
| Branches | 365 / 415 | 87.95 % |
| Functions | 119 / 143 | 83.21 % |
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
