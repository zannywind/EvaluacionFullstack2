# Recorrido de prueba manual

Estado: pendiente de ejecución manual en navegador. Las pruebas automatizadas están documentadas en TESTING.md.
Usar datos ficticios. Anotar resultado, navegador y tamaño después de cada paso.

| Paso | Acción | Resultado esperado |
|---|---|---|
| 1 | Abrir Home y Productos | Se muestran productos y tarjetas; no hay errores en consola |
| 2 | Buscar ZELDA y luego algo inexistente | Coincidencia sin distinguir mayúsculas y mensaje sin resultados |
| 3 | Abrir detalle, categoría y ofertas | Detalle del producto; listado filtrado; ofertas marcadas |
| 4 | Abrir Nosotros, Blog, artículo y Contacto | Todas las pantallas accesibles; contacto aclara que no envía correos |
| 5 | Agregar dos veces el mismo producto | Una fila con cantidad 2; barra con 2; total = precio × 2 |
| 6 | Registrar perfil ficticio con dirección | Perfil disponible; al entrar en checkout se completan nombre, correo y dirección |
| 7 | Seleccionar retiro | Se oculta dirección y se puede comprar sin ella |
| 8 | Volver a domicilio y confirmar datos válidos | Acepta una dirección normal, sin frase fija |
| 9 | Antes de confirmar, marcar Simular error | Aparece Error; carrito y datos se conservan |
| 10 | Reintentar y confirmar | Opción de error vuelve desactivada; pedido con resumen y carrito vacío |
| 11 | Ingresar como administrador da@gmail.com / aaa | Se muestra Panel Admin |
| 12 | Crear producto, editar precio/oferta y cancelar otra edición | Datos correctos y persistidos; cancelar no modifica producto |
| 13 | Agregar producto al carrito, editar su precio y luego eliminarlo del catálogo | Carrito refleja precio nuevo y después retira el producto |
| 14 | Probar nombre con espacios y precio negativo | No se guarda un producto inválido |
| 15 | Recargar | Productos permanecen; carrito y sesión se reinician por diseño |
| 16 | Volver a ingresar con correo de perfil registrado | Recupera nombre y dirección; contraseña de cliente no se verifica en esta simulación |
| 17 | Cerrar sesión de administrador | Se oculta el acceso administrativo |

## Pantallas

Probar aproximadamente 375 px (móvil), 768 px (tableta) y 1366 px (escritorio).
Verificar menú colapsado y desplegado, tarjetas, formularios, botones largos y tabla del carrito.
La tabla puede desplazarse horizontalmente dentro de su contenedor; el documento completo no debe desbordarse.
Probar teclado Tab/Enter y asociación de etiquetas con campos.

## Antes de entregar

Completar integrantes en ERS; confirmar alcance administrativo con docente; revisar publicación GitHub;
generar nuevamente cobertura y ZIP si se cambia código; ensayar presentación de 15 minutos y preguntas.

Para el flujo administrativo ampliado seguir también los 10 pasos de FLUJO.md. En Panel Admin el CRUD se encuentra dentro de Productos.
