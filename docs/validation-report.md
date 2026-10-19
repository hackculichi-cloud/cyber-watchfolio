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

## CV con fondos por área y regreso explícito a español — 16 de octubre de 2026

Se generaron catorce PDF: un CV general de dos páginas y seis perfiles de una página, en ambos idiomas. Cada documento pasó comprobaciones de espacio respecto al pie, número de páginas y títulos seleccionables mediante `pdfinfo` y `pdftotext`. Sus dieciséis previsualizaciones proceden de las páginas reales rasterizadas con `pdftoppm`. Se revisaron visualmente los seis diseños especializados y las dos páginas del general. El fondo y el atuendo corresponden al área; los archivos eléctricos originales mantienen sus bytes y hash. Los datos actualizados conservan los estados de formación confirmados.

La ejecución completa aprobó **79 de 79 pruebas de navegador**, con Chromium local y CSP de producción. Los dos nuevos casos verifican las siete entradas del catálogo, las descargas PDF reales ES/EN, el paso entre las dos páginas, el idioma conservado en la segunda, controles y ausencia de desbordamiento a 320 px, y el destino «Español» visible sin solapamientos en encabezados de 1280/1440 px. También se revisaron capturas del catálogo y del diálogo en escritorio y celular.

Las **7 pruebas unitarias**, el build de producción con TypeScript y `git diff --check` se aprueban. ESLint mantiene **0 errores y 8 advertencias previas** de Fast Refresh. No se añadieron dependencias. No se ejecutaron LibreWolf ni Mullvad ni se certifica compatibilidad con ellos a partir de Chromium. GitHub Actions permanece bloqueado por la facturación de la cuenta; las comprobaciones documentadas son locales.

### Selector de idioma sin texto

La revisión posterior sustituye las siglas y el destino visible por bandera y flechas en un botón compacto con acentos de circuito. Se aprobaron los tres casos existentes de `spanish-default.spec.ts` y `general-cv.spec.ts`, adaptados a la presentación sin texto: se mantienen nombre accesible, bandera correcta, transición, persistencia, teclado/móvil, movimiento reducido y cambio de idioma en el CV. El encabezado cabe a 1280/1440 px y el control conserva al menos 44 px de altura. La ejecución incluye build con TypeScript; se revisaron capturas del botón en ambos idiomas y del menú móvil. ESLint mantiene cero errores y ocho advertencias previas; `git diff --check` pasa. No se modificaron los PDF ni se añadieron dependencias.

## CV organizados como los perfiles del portafolio — 16 de octubre de 2026

Se reorganizaron los siete CV con perfil, habilidades agrupadas, cronología laboral completa, trabajos/proyectos y certificaciones/formación. Todos incluyen los cinco puestos confirmados y una explicación de su relación con el perfil; los catálogos compartidos conservan fechas y estados coherentes. Los fondos originales y el zorro de cada área se mantienen dentro del documento. Las tarjetas tienen títulos con iconos, herramientas, enlaces e instituciones con estados explícitos, sin convertir los planes en experiencia realizada.

Los catorce PDF ES/EN contienen **50 páginas**: general de 6, software de 4 y cada uno de los otros cinco perfiles de 3, en ambos idiomas. Cada documento pasó medición de espacio respecto al pie, comparación de páginas con `pdfinfo` y comprobación de todos los títulos, párrafos y estados de las tarjetas como texto seleccionable mediante `pdftotext -raw`. Las 50 imágenes de vista previa corresponden a las páginas reales y no quedan archivos de páginas retiradas. Los PDF incluyen marcadores de encabezados y enlaces; se sustituyó una flecha tipográfica sin glifo por un icono SVG. Los originales eléctricos conservan sus bytes y el hash previamente documentado.

Se aprobaron **29 casos de navegador** de los archivos de CV, especialidades, secciones compactas y seguridad/móvil. Tras aumentar el zoom al 400 % se repitieron los **7 casos de documentos**, todos aprobados; recorren cada página y ambos idiomas de las siete variantes. Se verifican descargas PDF, límites de página, ausencia de desbordamiento del diálogo, zoom, desplazamiento horizontal y reajuste al cambiar de página. El build con TypeScript forma parte de ambas ejecuciones. Las **8 pruebas unitarias** se aprueban; ESLint mantiene **0 errores y 8 advertencias previas** y `git diff --check` pasa.

Se revisaron capturas de las portadas de todos los perfiles, páginas interiores, formación y visor de escritorio/celular a 320 px. Estas comprobaciones usan Chromium local con CSP de producción. No se añadieron dependencias ni se modificaron fotografías o certificados originales. Los detalles de la generación y fuentes están en `cv-design.md`.

## Portada y perfiles compactos en móvil — 19 de octubre de 2026

La portada reúne presentación, fondo y selector sin duplicar la imagen grupal debajo. En 320×640 px los seis accesos de 82×58 px están visibles sobre la barra inferior, sin saludo ni hover previo; tocar fuera y desplazarse no los oculta. Se comprobaron los puntos de contacto reales con `elementFromPoint` y las seis navegaciones con tacto y movimiento normal. La órbita continúa en escritorio.

Las tarjetas de habilidades usan dos columnas y un resumen con título, acción personal y evidencia; el botón de detalle restaura todos sus puntos. En los perfiles, título y taller comparten espacio. Cinco áreas muestran un bloque elegido en móvil y permiten «Ver todo»; Electricidad conserva sus paneles por especialidad. Se verifican CV por enlace profundo, recarga con hash, selección, regreso a vista completa y ampliación a escritorio. Las especialidades y personajes secundarios también reducen su altura, manteniendo el detalle y la ampliación de imágenes disponibles.

Con español inicial, a 390 px el contenido de Home pasa de aproximadamente 7382 a 3627 px de altura, una reducción del 51 %. La portada baja de 1230 a 505 px. También se revisaron capturas de 320/390/430 px y escritorio. Son mediciones de composición local, no un benchmark de velocidad ni una ejecución en teléfonos físicos; los datos están en `mobile-layout.md`.

La ejecución completa aprobó 89 de 90 casos de navegador. El restante esperaba títulos móviles de 20 px, anteriores al resumen compacto de 14 px. Se actualizó esa expectativa y se aprobaron los 10 casos de los archivos de portada móvil, especialidades eléctricas, idioma y herramientas/GitHub, incluyendo el pendiente y los últimos ajustes de tamaño de menú y rótulos de referencia. Quedan verificados los 90 casos entre ambas ejecuciones. Las 8 pruebas unitarias y el build con TypeScript se aprobaron. ESLint conserva 0 errores y 8 advertencias previas de Fast Refresh; `git diff --check` se aprueba.

Las comprobaciones utilizan Chromium del sistema con CSP de producción. El entorno se instaló con `npm ci` y caché en `/tmp`, conservando la verificación de integridad y el lockfile. No se añadieron dependencias ni se modificaron los PDF, fotografías o certificados originales. No se ejecutaron LibreWolf ni Mullvad.

### Tipografía y footer con emblemas neón

El nombre del footer conserva su posición izquierda y la cabeza se coloca a la derecha del bloque de identidad, separada visualmente del logo superior fijo. Los seis accesos tienen emblemas con borde y luz del color de su área; el texto conserva contraste y no lleva brillo. «Volver arriba» incluye señal, flecha y respuesta breve al hover/foco/pulsación, sin bucles de animación y con movimiento reducido respetado.

La distribución final intercambia los bloques completos: navegación por áreas a la izquierda e identidad (nombre, retrato y descripción) a la derecha. En móvil se presenta primero la navegación. Tras este ajuste se aprobaron nuevamente los tres casos del footer, incluyendo la posición relativa de ambos bloques a 320/390/1440 px, y se revisaron sus capturas.

Manrope sustituye la fuente del sistema en títulos y texto de interfaz; JetBrains Mono continúa en etiquetas técnicas y código. El archivo variable latino (24 836 bytes, pesos 200–800, con caracteres del español) se sirve localmente y se precarga. Procede de `@fontsource-variable/manrope@5.3.0`, descargado mediante `npm pack` con verificación de integridad; su licencia SIL OFL se conserva en `public/fonts/Manrope-LICENSE.txt`. No se añade el paquete a las dependencias ni se modifican fuentes o documentos de los CV.

Se verificaron 20 casos de navegador: la ejecución aprobó 19; la repetición de los tres casos del footer aprobó el restante tras limitar la nueva consulta a enlaces de área, excluyendo el enlace del personaje de contacto. No se cambió la aplicación entre ambas ejecuciones. Se comprueban alineación nombre/retrato a 320/390/1440 px, seis emblemas, controles táctiles, retorno al inicio, respuesta de la flecha y movimiento reducido, fuentes locales, idiomas, los seis accesos del primer viewport y navegación por perfiles. Se revisaron capturas en español de portada y footer a los mismos anchos, sin desbordamiento. Build con TypeScript y `git diff --check` aprobados; ESLint mantiene 0 errores y 8 advertencias previas. Estas comprobaciones se realizaron con Chromium local.

## Especialidades con entrada directa y lectura más clara — 19 de octubre de 2026

Tocar una tarjeta o elegir su enlace de menú ahora abre el detalle, mueve el foco al artículo y desplaza la pantalla bajo las barras fijas. La navegación general deja ese desplazamiento a la especialidad para no volver antes a su portada. El punto de llegada espera las fuentes locales y respeta movimiento reducido. Los hashes y su recarga siguen disponibles; «Todas las especialidades» vuelve al listado. Las categorías de prácticas eléctricas también llevan a sus resultados.

Se retiraron la instrucción para elegir sección y los rótulos superpuestos de las portadas. La procedencia de estas imágenes sigue en el catálogo y texto alternativo. Se subieron contraste, peso de lectura, párrafos y títulos móviles; las tarjetas, menús y pestañas muestran resaltado por hover/foco. El detalle eléctrico reduce texto duplicado y el tamaño del personaje junto al título, manteniendo sus conocimientos antes en pantalla.

El resumen de cada área eléctrica reúne conocimientos confirmados, prácticas realmente documentadas y temarios pertinentes de Universidad Internacional y Udemy. Control incluye el electronivel realizado y conserva START/STOP planeado; industrial continúa en estudio. Otras especialidades pertinentes reutilizan las descripciones existentes de conocimientos aplicados. Los estados de formación, las fotografías, certificados originales y PDF no se convierten ni se regeneran.

La suite completa aprobó **94 de 94 casos de navegador**, y se aprobaron las **8 pruebas unitarias**. Tras los últimos ajustes de margen y espaciado del detalle se repitieron los 9 casos de navegación directa, especialidades eléctricas y portada móvil. Cubren tacto a 320/390 px, menú por teclado y móvil, foco y título visibles, vuelta al listado, enlaces profundos, recarga, temario pertinente, resaltado y los seis accesos iniciales. El build incluye TypeScript. Se revisaron capturas en español a 320/390/1440 px, sin desbordamiento; el detalle llega aproximadamente a 152 px en móvil y 192 px en escritorio. ESLint conserva 0 errores y 8 advertencias previas; `git diff --check` se aprueba. Las verificaciones usan Chromium local, sin afirmar pruebas en teléfonos físicos o LibreWolf. No se añadieron dependencias.
