# Especificación de requisitos de software — V2

Proyecto: Mai estor. Asignatura: Desarrollo Full Stack II (DSY1104).
Fecha de actualización: 22 de octubre de 2026.
Documento de alcance implementado, preparado para revisión del equipo. No representa una aprobación del docente.
Autores e integrantes: Damian Esparza y Brian Lizama.

## 1. Objetivo y alcance

Permitir explorar una tienda de videojuegos y realizar una compra simulada usando componentes React,
formularios, propiedades, estado, Bootstrap y una fuente de datos JavaScript con CRUD.
La evaluación se centra en frontend. No se implementa un backend ni una pasarela de pagos.
Vitest y Testing Library son las herramientas autorizadas por el profesor según confirmación del estudiante.

## 2. Referencias y criterios

- DSY1104 Evaluación Parcial 2_EE_EP_Estudiante: encargo 40%, presentación individual 60%; pruebas, mocks y análisis de cobertura.
- Anexo 1 Instrucciones: CRUD, persistencia, Bootstrap, vistas, checkout y documentación ERS/testing.
- Los diseños visuales del anexo son orientativos; se incorporan las vistas públicas del diagrama.
- El estudiante solicitó implementar el flujo administrativo completo del diagrama: dashboard, órdenes/boletas, productos, categorías, usuarios, reportes y perfil.
- La mención de backend en la presentación del anexo contradice el enfoque de datos simulados; no se considera una orden de implementar backend.

## 3. Actores

Visitante: consulta catálogo, categorías, ofertas, información y carrito; puede comprar en modo de demostración.
Cliente de demostración: registra su perfil local y reutiliza datos de entrega.
Administrador de demostración: crea, consulta, edita y elimina productos.

## 4. Requisitos funcionales y evidencia

| ID | Requisito | Criterio de aceptación | Archivos |
|---|---|---|---|
| RF01 | Mostrar catálogo y Home | Productos cargados desde fuente simulada; tarjetas reutilizadas | App, HomeView, ProductsView, ProductCard |
| RF02 | Buscar productos | Buscar sin distinguir mayúsculas; informar cero resultados | ProductsView |
| RF03 | Categorías y ofertas | Abrir categoría individual; mostrar solo productos marcados como oferta | CategoriesView, OffersView |
| RF04 | Detalle de producto | Mostrar nombre, categoría, precio y permitir agregar al carrito | ProductDetailView |
| RF05 | Carrito | Acumular cantidad por producto, calcular subtotal/total, eliminar y vaciar | App, CartView |
| RF06 | Checkout | Validar datos; seleccionar domicilio o retiro; contar unidades | ChekoutView |
| RF07 | Resultado de compra | Éxito guarda resumen y vacía carrito; error simulado conserva datos y permite reintento | ChekoutView, SuccessView, ErrorView |
| RF08 | Perfil de demostración | Registrar datos, recordar nombre/dirección por correo, completar checkout y cerrar sesión | ProfileView, userProfiles, App |
| RF09 | CRUD de productos | Crear, leer, actualizar y eliminar con persistencia; rechazar nombre vacío y precio no positivo | mockData, admin/AdminProductsView |
| RF10 | Consistencia | Edición actualiza datos del carrito; eliminación retira el producto del carrito | App.changeProducts |
| RF11 | Información pública | Nosotros, listado/detalle de blog y contacto con validación local | AboutView, BlogView, ContactView |
| RF12 | Administración visible por rol | Mostrar panel al administrador; comprobar rol al renderizar la vista | AppNavbar, App |

RF08 y RF12 describen comportamiento local de demostración, no seguridad de autenticación real.
Las opciones de entrega y el interruptor para simular error son decisiones de implementación para demostrar los flujos.
No hay tarifas ni correo real. Se añadieron existencias manuales para mostrar productos críticos y reportes derivados exclusivamente de compras simuladas registradas.

## 5. Requisitos no funcionales

| ID | Requisito | Implementación / verificación |
|---|---|---|
| RNF01 | React, props y estado | Componentes funcionales, useState, useEffect, callbacks |
| RNF02 | Bootstrap responsivo | Menú colapsable, grillas y tabla con desplazamiento contenido; revisión visual manual pendiente |
| RNF03 | Formularios identificables | Labels asociados con htmlFor/id y mensajes con roles alert/status |
| RNF04 | Pruebas pertinentes | Consultar los resultados vigentes en TESTING.md; incluye pruebas de tienda/datos y 2 del contador de clase |
| RNF05 | Análisis de cobertura | Informe V8 y análisis en TESTING.md; sin umbral obligatorio inventado |
| RNF06 | Recuperación de datos | Recuperar catálogo ante JSON inválido; respetar catálogo vacío |

## 6. Modelo de datos

Producto: id (número para datos iniciales o UUID para nuevos), name, price (pesos, positivo), category, offer, image opcional, description opcional, stock (entero no negativo).
Carrito: copia de producto y quantity. Estado en App.
Perfil: nombre y dirección almacenados con clave derivada del correo normalizado. Contraseñas no almacenadas.
Pedido: identificador UUID, correo normalizado, cliente, fecha, dirección/retiro, entrega, total e items. Copia histórica persistida en store-orders; la boleta conserva los precios al comprar.

## 7. Persistencia

Productos: clave `products` de localStorage. Perfiles: claves `store-profile:<correo>`.
El navegador es la única fuente de persistencia. Otro dispositivo no comparte datos.
Usuario activo, carrito, selección de pantalla y resumen del último pedido se reinician al recargar. El historial de pedidos permanece guardado en store-orders.
Si el almacenamiento está deshabilitado o lleno, las operaciones de guardado pueden fallar; administración y registro muestran errores.

## 8. Exclusiones y pendientes de entrega

No hay pagos, backend, envío real de mensajes ni cuentas protegidas de producción.
No se declaran rutas reales de React Router. El flujo es por estado de React.
La revisión visual en tamaños de pantalla y la publicación de los cambios en GitHub deben confirmarse aparte. El flujo administrativo ya está implementado según la imagen aportada por el estudiante.
Integrantes identificados. Revisar cualquier plantilla ERS particular exigida por el docente antes de presentar.

## 9. Flujo administrativo solicitado

| Pantalla | Subpantallas / comportamiento | Archivo |
|---|---|---|
| Home / Dashboard | Resumen de productos, órdenes y clientes | AdminView.jsx |
| Órdenes / Boletas | Listado y Mostrar boleta, con detalle histórico | admin/AdminOrdersView.jsx |
| Productos | Nuevo, Mostrar, Editar y Eliminar | admin/AdminProductsView.jsx |
| Productos críticos | Filtro de existencias con umbral editable | admin/AdminStockView.jsx |
| Reportes | Totales de órdenes y compras por producto | admin/AdminReportsView.jsx |
| Categorías | Nueva y Editar; renombrar actualiza productos asociados | admin/AdminCategoriesView.jsx |
| Usuarios | Nuevo, Mostrar, Editar e Historial de compras por correo | admin/AdminUsersView.jsx |
| Perfil | Edición de nombre/dirección del administrador | AdminView.jsx |

En el diagrama, la rama Categoría dice «Editar usuario»; se interpreta como «Editar categoría».
Existencias: número entero no negativo, administrado manualmente. Valor inicial de demostración 10 para productos que no tenían stock.
Umbral inicial de productos críticos: 5, editable en pantalla. No se presenta como regla impuesta por la rúbrica.
Las compras no descuentan existencias en esta simulación, indicado en la interfaz.
Una boleta es un resumen académico, no un documento tributario. Los informes parten de cero y solo cuentan compras completadas.
El correo de un usuario no se edita para conservar la relación con su historial; no se administran contraseñas reales.
Categorías se almacenan en store-categories; pedidos en store-orders; perfiles conservan su formato anterior.
