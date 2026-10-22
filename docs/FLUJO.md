# Navegación según el diagrama

## Tienda

Home → Productos → Detalle de producto → Añadir al carrito.
Iniciar sesión → Registro → Perfil.
Nosotros; Blog → Artículo 1 / Artículo 2; Contacto.
Categorías → Categoría individual → Detalle del producto.
Carrito → Checkout → Compra exitosa / Error → Reintentar checkout.
Ofertas → Detalle de producto o Añadir al carrito.

## Administrador

Panel Admin → Dashboard.
Órdenes / Boletas → Mostrar boleta → Volver a órdenes.
Productos → Nuevo producto; Mostrar producto → Editar producto.
Productos → Productos críticos; Productos → Reporte de productos.
Categorías → Nueva categoría / Editar categoría.
Usuarios → Nuevo usuario; Mostrar usuario → Editar usuario / Historial de compras → Boleta.
Reportes → Totales y tabla por producto.
Perfil administrador → Editar nombre y dirección.

## Prueba guiada

1. Completar una compra con un correo ficticio y verificar su resumen.
2. Iniciar sesión como administrador con da@gmail.com / aaa.
3. Abrir Panel Admin: debe aparecer Dashboard y el menú lateral.
4. En Órdenes / Boletas abrir la orden recién creada.
5. En Productos abrir Mostrar y luego Editar; poner existencias en 2.
6. En Productos críticos comprobar que aparece al usar límite 5.
7. Crear una categoría y asignarla a un producto; renombrarla y comprobar el catálogo.
8. Crear un usuario con el correo de la compra del paso 1, abrir Mostrar usuario y consultar Historial de compras.
9. En Reportes comprobar que unidades e importes corresponden a la compra.
10. Editar Perfil administrador y volver a ingresar para comprobar persistencia.

Pendiente: comprobación visual en móvil, tableta y escritorio. La suite automática valida estos flujos en jsdom.
