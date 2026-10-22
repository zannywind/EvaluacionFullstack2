# Estado de la entrega

- Código local actualizado y probado: sí.
- 41 pruebas aprobadas y compilación correcta: sí.
- ERS V2 y documento de testing: incluidos en Markdown; integrantes Damian Esparza y Brian Lizama; revisar antes de entregar.
- Informe HTML de cobertura: incluido en el ZIP.
- Prueba visual en navegador: pendiente, sin navegador conectado disponible durante la revisión.
- Repositorio elegido: https://github.com/zannywind/EvaluacionFullstack2
- Publicación de esta actualización: pendiente.

La rama main remota consultada está en ddcde5200de8edfd5b0dd8d628effe67dc3246e6.
Contiene una configuración y pruebas Jasmine/Karma que no estaban en la copia local original.
No se ha sobrescrito main ni cambiado el remoto del repositorio de la carpeta superior.
La entrega local usa Vitest, autorizado por el profesor. Publicar debe preservar la historia remota
mediante una rama revisable y acordar qué hacer con los archivos de pruebas heredados.

## Publicación preparada

Se preparó la rama `entrega/vitest-crud-2026-10-22` en un checkout temporal aislado.
El intento de push falló por ausencia de credenciales GitHub; no se publicaron cambios.
Las pruebas Jasmine/Karma remotas se preservaron como texto en `docs/historico-jasmine`.
La suite activa y documentada es Vitest, conforme a la autorización del profesor.

El ZIP incluye `actualizacion.patch`, aplicable desde un clon de la versión remota consultada:

```powershell
git switch -c entrega/vitest-crud-2026-10-22
git am RUTA/actualizacion.patch
git push -u origin entrega/vitest-crud-2026-10-22
```

El último comando requiere iniciar sesión con una cuenta que tenga permisos sobre el repositorio.
Si main cambió desde la revisión, revisar los cambios antes de aplicar el parche; no forzar un push.
También se puede abrir directamente la carpeta del ZIP y ejecutar npm ci / npm run dev.

Actualización adicional: se incorporaron todas las pantallas administrativas solicitadas en el diagrama. El ZIP y parche se regeneraron con esta versión.
