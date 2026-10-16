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

## Talleres ilustrados completos — 16 de octubre de 2026

Se generaron y revisaron seis escenas a color con habitaciones completas y se integraron en las bienvenidas de cada perfil. Se comprobaron sus variantes WebP de 768/1536 px, carga correcta, ampliación bilingüe, cierre del diálogo, cinco poses por área y tamaños menores de los personajes del cierre de Home. Las capturas se revisaron en escritorio y a 320/390 px, sin desbordamiento horizontal. La procedencia y compresión están en `workspace-illustrations.md`.

La ejecución completa aprobó 69 de los 72 casos de navegador. Los otros tres requirieron adaptar sus comprobaciones a la imagen de entrada en un único elemento, el ancho natural corregido por densidad de `srcset` y el diálogo de taller por nombre (un menú de especialidades puede abrirse al quedar el cursor encima tras cerrar la imagen). Tras esos ajustes solo en pruebas, los tres casos se aprobaron. Quedaron verificados los 72 casos; las 7 unitarias y el build con TypeScript también se aprobaron.

## Entornos continuos, especialidades eléctricas y español inicial — 16 de octubre de 2026

Se revisaron capturas de las seis bienvenidas en escritorio y celular. Cada habitación se sirve sin mascota incrustada y el personaje aparece por debajo de la imagen, sin superposición. El mismo entorno pequeño se reutiliza en todo el perfil y el footer, manteniendo las superficies oscuras y el color propio. No se añadieron WebGL, fondos fijos ni animaciones continuas.

Las tres especialidades eléctricas ahora ocupan columnas iguales y centradas en escritorio y una columna en celular. Se verifican la alineación de los emblemas, carga de imágenes, ausencia de desbordamiento y apertura/cierre del detalle. Residencial utiliza la foto original del trabajo terminado; industrial y control muestran referencias generadas claramente rotuladas y conservan sus estados reales de estudio y planificación.

Se comprobaron los menús compactos con siete enlaces de electrónica, teclado, Escape y tacto. La prueba de primera visita utiliza almacenamiento vacío: abre en español, carga las banderas SVG locales, cambia a inglés, conserva la elección tras recargar y navegar, vuelve a español y funciona en el menú móvil. El indicador respeta movimiento reducido. Los escenarios anteriores que requieren inglés lo solicitan explícitamente en su contexto de prueba.

Quedaron verificados los 74 casos de navegador: la ejecución completa aprobó 62; los otros 12 requirieron ajustar los selectores de imagen para excluir las nuevas banderas y el icono decorativo de cierre, y cerrar la tarjeta al terminar cada tamaño de pantalla en la nueva prueba eléctrica. Sin cambios adicionales a la aplicación, la repetición aprobó los 12 casos. Las 7 pruebas unitarias y el build de producción con TypeScript también pasan. ESLint termina con 0 errores y las mismas 8 advertencias previas de Fast Refresh; `git diff --check` pasa. No se añadieron dependencias.

La CSP de producción sigue bloqueando la ejecución de scripts inline inyectados en la prueba. Las banderas locales conservan su licencia MIT y no incluyen scripts ni cargas remotas. Las verificaciones se ejecutaron en Chromium local; no se ejecutaron LibreWolf ni Mullvad. Los PDF y fotografías originales se mantienen sin cambios.

## Fondos originales, cambio de idioma único y Electricidad por pestañas — 16 de octubre de 2026

La revisión actual recupera los seis fondos originales registrados en `profileMedia.ts` y los extiende por cada área y footer. Los talleres de `workspaces/` vuelven a incluir al zorro dentro de la escena principal. Se verificó en navegador que los seis fondos se calculan correctamente; se corrigió la cadena `url()` entre comillas para que el SVG local de atención al cliente también funcione cuando Vite lo incorpora como URI de datos.

Las tres portadas eléctricas son ahora referencias realistas identificadas. La residencial también fue generada; la fotografía original permanece dentro de su caso. Se comprueba que antes de entrar en los paneles no hay fotos originales de trabajos ni todos los certificados montados. Residencial, Industrial y Control ofrecen un único panel con cinco pestañas, incluyendo Certificaciones. Los proyectos y la galería se filtran por área. Los enlaces anteriores y el salto de sección móvil abren el panel correcto; el indicador de navegación se actualiza al montar contenido. El CV actual sigue disponible.

Los seis personajes secundarios de Home ocupan contextos distintos: colgando del título de habilidades, sentado en la tarjeta de software, trabajando junto a la formación, de espaldas detrás de una tarjeta, asomándose tras el contacto y apoyado en el correo del footer. Se revisaron capturas de escritorio y móvil, proporciones, lectura y ausencia de desbordamiento. Se mantienen las imágenes fuente completas.

El logo de cada área prepara el atuendo sin abrir un desplegable; se prueba que solo la flecha lo abre por hover y que también funciona con teclado. El selector de idioma se verifica como un único botón con bandera activa, cambio animado, pista de la otra bandera, preferencia persistente, español inicial, funcionamiento en diálogos y móvil, y movimiento reducido.

Quedaron verificados 77 casos de navegador: la ejecución completa aprobó 72 de 74; la repetición dirigida de 13 casos aprobó los dos pendientes, tres casos nuevos y ocho relacionados tras corregir la URI del SVG, ajustar la consulta del enlace del footer a su navegación e incluir los últimos ajustes de composición y pestañas. Las 7 pruebas unitarias y el build de producción con TypeScript pasan. ESLint conserva 0 errores y las 8 advertencias previas de Fast Refresh; `git diff --check` pasa. No se añadieron dependencias. Las pruebas se ejecutaron en Chromium local con CSP de producción; no se presentan como ejecución de LibreWolf o Mullvad.
