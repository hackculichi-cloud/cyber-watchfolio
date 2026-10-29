# Fluidez y presentación · 29 de octubre de 2026

Esta revisión conserva las ilustraciones, fondos, circuitos, fotografías originales, contenido y controles existentes. Reduce descargas y trabajo repetido, y corrige el espacio excesivo de la portada en tablet.

## Qué cambia

- El arranque deja de montar el cliente de consultas, dos sistemas de notificaciones y el proveedor de tooltips: ninguna ruta publicada los utiliza. Las plantillas y dependencias siguen disponibles para un uso futuro explícito.
- El footer conserva su contenido al cambiar únicamente una pestaña o el hash. Sigue actualizándose al cambiar de perfil o idioma.
- Las 46 fotografías eléctricas y de reparación tienen derivados WebP de borde máximo 320/768 px. Las tarjetas y miniaturas eligen su resolución con `srcset`; las portadas de detalle y los visores ampliados conservan los archivos originales. No se recorta, retoca ni sustituye evidencia.
- Los atlas de personajes usan imágenes con carga diferida nativa dentro del mismo recorte, en lugar de fondos CSS que se descargan al montar. Sus coordenadas y proporciones no cambian. Se añaden atlas de 768 px y cuatro figuras de Home de 384 px, con los originales como opción de mayor resolución.
- Entre 768 y 1023 px, Home coloca texto y personaje en columnas; los perfiles presentan título y taller juntos, seguidos de descripción y acciones. Se elimina la altura mínima excesiva. Los diseños de teléfono y escritorio mantienen sus reglas anteriores.
- El tamaño declarado de las imágenes de taller sigue el ancho real de cada columna. Al cerrar el visor, el foco vuelve al botón de apertura sin desplazar la página.

## Tamaños verificables

| Recurso | Antes | Después |
| --- | ---: | ---: |
| JavaScript de entrada, minificado | 792.033 B | 708.086 B |
| JavaScript de entrada, gzip | 244.100 B | 219.225 B |
| Tres atlas decorativos, conjunto | 1.268.808 B | 435.566 B en versiones de 768 px |
| Cuatro figuras de Home, conjunto | 461.968 B | 159.420 B en versiones de 384 px |
| 46 fotografías, conjunto | 17.271.674 B | 665.314 B a 320 px / 2.565.712 B a 768 px |

Los conjuntos de imágenes comparan versiones equivalentes de los archivos, no el peso descargado en una sola visita. El navegador elige resolución según ancho y densidad de pantalla. Los originales permanecen locales e intactos; se verificaron las 46 fotografías contra sus blobs Git.

En tablet de 768 px, con fuentes e ilustraciones cargadas y español, la altura de la portada queda así:

| Página | Antes | Después |
| --- | ---: | ---: |
| Home | 1.126,7 px | 652,4 px |
| Electricidad | 1.076,5 px | 593,0 px |
| Software | 1.141,5 px | 610,8 px |

La revisión visual final recorre estas tres páginas a 768/1023 px en ambos idiomas: doce cargas sin errores JavaScript ni desbordamientos horizontales. La comparación de Home, Electricidad y Software a 390/1024/1440 px conserva sus alturas anteriores.

## Comparación local

Referencia: `9d0e5e6`, con la revisión anterior de fluidez y las correcciones de seguridad. Chromium local, producción, 390×844, DPR3, CPU limitada a 4× y movimiento reducido. Tres muestras seriales con contextos nuevos por versión; no se ejecutan otras pruebas de navegador al medir. Los datos completos están en [fluency-review-2026-10-29.json](./fluency-review-2026-10-29.json).

En carga inicial se suman `encodedBodySize` de recursos al finalizar la carga de red local y fuentes. Las siguientes son medianas; incluyen recursos anticipados por el umbral nativo de imágenes lazy. El servidor, caché y compresión de producción pueden producir cifras distintas.

| Ruta | Recursos descargados antes → después | Trabajo del navegador antes → después |
| --- | ---: | ---: |
| Home | 4.247.286 → 3.780.060 B | 795,2 → 705,8 ms |
| Electricidad | 3.927.640 → 3.673.757 B | 804,8 → 783,3 ms |
| Software | 2.833.386 → 2.524.212 B | 786,5 → 761,7 ms |
| Reparación | 2.305.017 → 2.281.280 B | 733,4 → 716,7 ms |
| Barbería | 1.913.964 → 1.889.237 B | 744,0 → 667,1 ms |

El ensayo de pestañas usa las mismas interacciones de la revisión anterior. Mide `TaskDuration` y `ScriptDuration` por CDP desde la acción automatizada hasta dos frames posteriores; incluye trabajo de la automatización y del navegador. No representa solo tiempo de espera visible.

| Acción eléctrica | Trabajo total antes → después | JavaScript antes → después |
| --- | ---: | ---: |
| Abrir residencial | 245,5 → 199,3 ms | 78,0 → 75,7 ms |
| Abrir proyectos | 179,2 → 152,0 ms | 50,4 → 39,8 ms |
| Abrir certificaciones | 222,3 → 189,2 ms | 61,4 → 56,2 ms |
| Abrir herramientas | 157,2 → 147,8 ms | 47,7 → 42,1 ms |
| Volver al resumen | 160,7 → 150,6 ms | 47,7 → 43,4 ms |

Son observaciones locales, no mediciones de FPS, INP público o teléfonos físicos. Permanecen tareas superiores a 50 ms con CPU limitada; los resultados no prometen ausencia de pausas en todos los equipos. El bundle de entrada sigue por encima del aviso de 500 kB de Vite.

## Reproducción

Con un build de producción servido en el puerto 4173:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

En otra terminal, ejecutar los diagnósticos por separado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium \
FLUENCY_REPORT=/tmp/loading.json node scripts/measure-page-loading.mjs

PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium \
FLUENCY_REPORT=/tmp/interactions.json node scripts/measure-profile-fluency.mjs
```

Ambos aceptan `FLUENCY_BASE_URL`. Los derivados se reproducen con `node scripts/generate-photo-previews.mjs` y `node scripts/generate-mascot-previews.mjs`, que requieren ImageMagick 7 (`magick`). No son dependencias del build ni del navegador.

Las regresiones comprueban recorte y carga diferida real, miniaturas en DPR1/DPR3 y originales al ampliar, siete áreas en tablet con español/inglés, foco al cerrar, controles móviles, ausencia de desbordamiento y conservación de las políticas de seguridad.

Validación final: TypeScript/build correctos; 29 pruebas unitarias y 156 escenarios distintos de Chromium verificados. La ejecución completa aprobó 154 escenarios; los otros dos detectaron una espera faltante en el nuevo test de diálogos anidados al cerrarse el visor de fotos. Se añadió la comprobación de desmontaje tras la transición de 100 ms y ambos aprobaron en la repetición dirigida, conservando todas las aserciones de descarga y evidencia. ESLint: cero errores y ocho advertencias previas de Fast Refresh. Auditoría npm: cero vulnerabilidades reportadas. Comprobación de artefactos públicos y `git diff --check` correctos.
