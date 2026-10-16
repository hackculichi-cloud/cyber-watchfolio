# Validación local — 13 de octubre de 2026

Entorno: Node 24.19.0, npm, Chromium del sistema. Versiones migradas: Vite 6.4.3, Vitest 4.1.11 y React Router DOM 7.18.4.

| Comprobación | Resultado |
| --- | --- |
| npm ci --no-audit --no-fund | Instalación congelada correcta, 493 paquetes |
| npm run build | Correcto; incluye TypeScript de aplicación y configuración de Vite |
| npm run lint | Correcto, 0 errores y 8 advertencias Fast Refresh |
| npm run test | 4 pruebas de componentes aprobadas |
| npm run test:e2e -- --workers=2 | 9 pruebas de navegador aprobadas, usando Chromium instalado |
| npm audit --json | 9 avisos: 5 altos, 4 moderados, 0 críticos; exit 1 debido a los pendientes |
| git diff --check | Correcto |
| Workflow YAML | Parseado; permisos de contenidos limitados a lectura |

Las pruebas cubren cambio ES/EN con investigación abierta, los tres casos y tres playbooks SOC, fotografías locales ampliadas y navegación por teclado, estados reales de formación, práctica START/STOP planeada, anchos de 375/768/1440 px, enlaces React Router, historial, hashes y recarga con persistencia de idioma. También verifican metadatos, separación de dominio público/origen de medios y recuperación de errores de imágenes.

Los fallos iniciales por instalación concurrente y reinicio del servidor se diagnosticaron y la ejecución final se realizó con dependencias completas y configuración estable. No se debilitaron assertions ni se omitieron casos para lograr el resultado.

Limitaciones:

- El build advierte un chunk principal de aproximadamente 506 kB minificado (160 kB gzip). No impide compilar y no se ocultó elevando el límite.
- Los medios necesarios de la plataforma anterior se migraron a rutas locales, conservando bytes y hashes. Las fuentes también se sirven localmente. La validación actual bloquea las peticiones al origen anterior y comprueba las rutas locales.
- El workflow de CI se añadió pero estos resultados corresponden a ejecución local, no a una ejecución confirmada en GitHub Actions.
- No se fusionaron cambios ni se ejecutó un despliegue de producción. El comportamento de Vercel/Cloudflare en producción no se certifica con una ejecución local.

Los detalles de los avisos pendientes están en [security-audit.md](security-audit.md).

## Actualización — 15 de octubre de 2026

Electricidad incorpora centros de formación locales y mockups claramente rotulados. Se revisaron visualmente la composición de 320 px y escritorio, la ampliación del documento y la marca intercambiada entre encabezado y footer. El selector conserva radios iguales y seis controles accesibles, con el personaje por encima de sus elementos decorativos.

Las 70 pruebas de navegador quedaron verificadas: la ejecución completa aprobó 68; las otras dos detectaron ajustes necesarios en las nuevas pruebas (medir tras la animación de entrada y buscar el subtítulo en su elemento contenedor). Sin cambios adicionales a la aplicación, la repetición del archivo nuevo aprobó sus tres pruebas. Se aprobaron también las 7 unitarias y el build con TypeScript. La regresión nueva mide la altura del hero y la leyenda al pasar entre menús, comprueba tacto en 320 px y verifica enlaces de centros y ampliación bilingüe del mockup.

Los SVG de centros son locales y no contienen scripts, referencias externas ni imágenes incrustadas. El PDF eléctrico original mantiene el hash documentado en `docs/culichi-mascot.md`. Las comprobaciones corresponden a Chromium local; no equivalen a haber ejecutado LibreWolf o Mullvad.

ESLint finaliza con 0 errores y las mismas 8 advertencias previas de Fast Refresh. `git diff --check` también se aprueba; no se añadieron dependencias.

### Bienvenidas en el lugar de trabajo y composición de Home

Se verificaron los 72 casos de navegador sobre la aplicación actual. La ejecución completa aprobó 70; se adaptaron dos expectativas al cambio solicitado (selector a la derecha y observar el final visible de la transición de 720 ms antes de abandonar Home). Su repetición aprobó los dos casos, sin cambios adicionales a la aplicación. Las 7 unitarias y el build con TypeScript también pasan.

Los casos nuevos verifican las seis escenas de trabajo sin animaciones internas, ausencia de selector y herramientas flotantes dentro de los perfiles, permanencia del atuendo al recorrer el menú, retrato del footer y seis colores distintos del punto de marca. En Home se comprueba la composición lateral a 1440 px y el orden vertical sin desbordamiento a 320 y 390 px. «Trabajos realizados» conserva el ancla eléctrica existente. Las capturas se revisaron en escritorio y celular; la simplificación de efectos no se presenta como un benchmark de FPS en dispositivos reales.
