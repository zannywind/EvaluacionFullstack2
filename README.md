# Mai estor — Evaluación Full Stack II

Tienda académica desarrollada con React, Vite, JavaScript, Bootstrap y React Bootstrap.
Pruebas con Vitest + Testing Library (uso autorizado por el profesor).

## Arranque

Requiere Node.js compatible con las dependencias. Verificado con Node 22.14.0 y npm 10.9.2.

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre la dirección que imprime Vite (normalmente http://localhost:5173). Ctrl+C detiene el servidor.
`npm ci` se necesita al instalar el proyecto, no en cada arranque.

En el equipo donde se hizo esta revisión se preparó una copia temporal de Node. Mientras exista:

```powershell
$env:PATH="$env:TEMP\fullstack-node-audit\node-v22.14.0-win-x64;$env:PATH"
npm.cmd run dev
```

Esa ruta temporal no se incluye en la entrega ni reemplaza instalar Node para uso permanente.

## Comprobaciones

```powershell
npm.cmd run test:run
npm.cmd run coverage
npm.cmd run build
npm.cmd run preview
```

- El informe visual de cobertura se genera en `coverage/index.html`.
- La compilación se genera en `dist/`.
- No se incluyen `node_modules` ni datos privados del navegador en el ZIP.

## Funcionalidades

Home, búsqueda de productos, detalle de producto, categorías con listado individual, ofertas,
Nosotros, blog con artículos, contacto de demostración, carrito, checkout, éxito/error,
login/registro/perfil de demostración y administración con CRUD de productos.

El checkout admite despacho o retiro. El selector «Simular error de compra» permite recorrer
la pantalla de error sin borrar el carrito. Al reintentar, esa opción vuelve desactivada.
No se capturan tarjetas ni se realizan pagos reales. El contacto valida el formulario, no envía correos.

## Acceso de demostración

- Administrador: `da@gmail.com` / `aaa` (credenciales de ejemplo preexistentes).
- Cliente: correo válido y cualquier contraseña no vacía. No usar datos reales.
- Registro: nombre, correo, contraseña de demostración y dirección.
- Los perfiles recuerdan nombre y dirección por correo, sin guardar contraseñas.
- Esto no es autenticación de producción. El rol solo controla la interfaz local.

## Datos y navegación

`src/data/mockData.js` implementa leer, crear, actualizar y eliminar productos con localStorage.
`src/data/userProfiles.js` almacena los datos del perfil de demostración.
Los productos modificados se reflejan también en el carrito. Borrar un producto del catálogo lo retira del carrito.
Carrito, usuario activo y última compra se conservan entre vistas, pero no al recargar la página.
La navegación usa `currentView` y un `switch` en App. BrowserRouter está montado, pero no existen rutas URL.
Atrás/Adelante del navegador no representan los cambios de vista.

## Estructura

- `index.html` y `src/main.jsx`: arranque y estilos.
- `src/App.jsx`: estado compartido y coordinación de vistas.
- `src/components/`: barra, tarjeta y componentes del ejemplo inicial.
- `src/views/`: pantallas de la tienda.
- `src/data/`: persistencia simulada.
- `src/tests/`: pruebas de componentes, datos e integración.
- `public/`: imagen de respaldo local.
- `docs/ERS_V2.md`: alcance, requisitos y trazabilidad.
- `docs/TESTING.md`: casos, resultados, cobertura y limitaciones.
- `docs/PRUEBAS_MANUALES.md`: recorrido para probar juntos.
- `docs/DEFENSA.md`: guía de estudio.

Counter y StoragePanel se conservan como ejemplos de clase; no se muestran en la tienda.
Counter tiene dos pruebas didácticas y no es la evidencia principal de las funciones de la tienda.

## Entrega

Repositorio indicado por el estudiante: https://github.com/zannywind/EvaluacionFullstack2
La copia remota consultada usa Jasmine/Karma y no coincide con esta copia local basada en Vitest.
Este README no afirma que los cambios locales ya estén publicados. Consultar `docs/ENTREGA.md`.

## Flujo administrativo completo

Ingresar con `da@gmail.com` / `aaa` y abrir **Panel Admin**. Se inicia en Dashboard.
El menú lateral permite abrir órdenes/boletas, productos, productos críticos, categorías, usuarios, reportes y perfil.
Productos tiene pantallas de listado, creación, detalle y edición. Las categorías nuevas aparecen en el selector de productos.
Una compra pública exitosa se persiste y aparece como orden; se puede abrir su boleta y consultar el historial por correo.
Los reportes calculan cantidades e importes desde esas órdenes. No contienen ventas inventadas.
Las existencias son manuales y las compras no las descuentan en esta versión de demostración.
El documento `docs/FLUJO.md` relaciona cada nodo de la imagen con su pantalla.

## Cómo abrir el administrador

1. Ejecutar npm run dev y abrir la dirección que indique Vite.
2. Abrir Iniciar Sesión / Registro.
3. Correo: da@gmail.com. Contraseña de demostración: aaa.
4. Pulsar Ingresar y después Panel Admin en el menú. En móvil, desplegar Abrir menú.
5. También se puede abrir desde el perfil con Abrir panel administrador.

El panel incluye dashboard, productos, categorías, usuarios, órdenes/boletas, stock crítico, reportes y perfil. Al recargar debes iniciar sesión nuevamente.
