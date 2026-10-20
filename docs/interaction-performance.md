# Respuesta al abrir contenido

La selección de especialidades deja de esperar `document.fonts.ready` y de recorrer la página con un scroll suave. El foco y el desplazamiento inmediato se realizan cuando el panel se monta. Una selección directa no espera a que termine la actualización de la ubicación del router para mostrar el contenido. Los hashes, el historial y las barras de navegación se conservan.

Las categorías de prácticas, pestañas y enlaces internos también posicionan el contenido sin interpolar el desplazamiento. Los temarios despliegan su altura completa sin animar el layout. Los diálogos usan un fundido de 100 ms sin zoom ni desplazamiento, y las ventanas de detalle no desenfocan toda la página en móvil. No se modifican imágenes, fotografías, documentos ni las transformaciones de atuendo del zorro.

En móvil, las ilustraciones y tarjetas no esperan una animación de entrada. En escritorio se limita la aparición a 160 ms, con un desfase máximo de 60 ms, y se retira el `will-change` permanente de todos los bloques. Los contenidos recién abiertos no tienen espera decorativa; los títulos principales tampoco usan la secuencia larga de retardos.

## Cómo se comprueba

`e2e/responsive-content.spec.ts` mantiene deliberadamente las fuentes pendientes y comprueba que el panel se pueda abrir y enfocar. Otra prueba usa Chromium con CPU limitada a 4× y verifica la posición y el foco en los primeros fotogramas, sin desplazamiento residual. También comprueba la altura completa del temario y la ausencia de desenfoque en el diálogo móvil. Las pruebas se ejecutan con movimiento normal; se mantienen las regresiones de movimiento reducido.

La observación comparativa local usa una compilación de producción, Chromium 154, ventana móvil de 390×844 px y CPU limitada a 4×. Mide desde el evento de clic hasta que el panel está enfocado y situado bajo la navegación; registra además tres fotogramas consecutivos estables. Son tiempos de DOM, foco y posición en este entorno, no FPS ni garantías de rendimiento en teléfonos físicos. Se toman tres muestras por versión.

## Comparación local — 19 de octubre de 2026

| Muestra | Antes: visible/enfocado | Ahora: visible/enfocado | Antes: estable | Ahora: estable |
| --- | ---: | ---: | ---: | ---: |
| 1 | 829.1 ms | 130.0 ms | 1071.8 ms | 344.6 ms |
| 2 | 843.1 ms | 167.9 ms | 1044.3 ms | 494.3 ms |
| 3 | 873.0 ms | 127.2 ms | 1109.5 ms | 343.6 ms |
| Mediana | 843.1 ms | 130.0 ms | 1071.8 ms | 344.6 ms |

Las fuentes estaban cargadas para esta comparación; la apertura con fuentes retenidas se verifica en una prueba separada. Las muestras finales se tomaron sin otras pruebas de navegador en paralelo, sobre el mismo build que aprobó la suite completa. La comparación corresponde a seleccionar Residencial desde `/electrical#specialties`; no representa todos los dispositivos o interacciones.

## Coste del panel abierto — 20 de octubre de 2026

La revisión siguiente mide el contenido ya abierto, en vez de limitarse a la llegada desde una tarjeta. El artículo compartido de especialidades heredaba `panel-glow`, una superficie pensada para tarjetas pequeñas: una sombra exterior difuminada, una variante al hover y transición de sombra. Esa clase también añadía un gradiente a toda la superficie. Aplicarla a un artículo de varias pantallas obligaba al navegador a rasterizar una superficie muy grande al cambiar su altura o pasar el puntero por ella.

Las pruebas de aislamiento conservan el mismo contenido y retiran por separado el fondo, el desenfoque de barras, el ajuste de texto, la transición o la sombra. Quitar únicamente la transición no corrige el coste de rasterizado de la sombra; retirar el fondo tampoco produce una mejora comparable. La corrección evita heredar `panel`/`panel-glow` en el artículo completo y usa la superficie oscura uniforme prevista para este detalle, conservando el fondo general del área, su borde, espaciado y controles interiores. Los resaltados de menú y las tarjetas pequeñas mantienen su diseño.

Las pestañas eléctricas ya montan solo el contenido seleccionado. La nueva regresión lo verifica junto con la ausencia de sombra exterior antes y después del hover, a 390 y 1440 px. No se ocultan conocimientos, prácticas ni temarios para conseguir la mejora.

### Medición de repintado

Producción local, Chromium 154, 1440×900 px, movimiento normal y CPU limitada a 4×. Cada muestra abre `/electrical#residential`, espera las fuentes, comienza la traza de Chromium y selecciona Certificaciones → Resumen → Herramientas → Resumen; tras cada selección envía seis desplazamientos de 110 px separados por 30 ms. Se recogen eventos `Paint`/`RasterTask`, métricas del proceso principal y intervalos entre callbacks de `requestAnimationFrame`. Hay tres contextos nuevos por versión, sin otra suite de navegador simultánea.

Los totales de `RasterTask` suman trabajo de varios hilos; no son tiempo de espera de una persona. Los intervalos de animación son un indicador del ensayo sintético, que también incluye montaje y decodificación de imágenes, y no equivalen a FPS de un teléfono físico. Las barras, imágenes y datos son los mismos en ambas versiones.

| Muestra | Antes: trabajo raster | Ahora: trabajo raster | Antes: intervalos >50 ms | Ahora: intervalos >50 ms |
| --- | ---: | ---: | ---: | ---: |
| 1 | 13022.2 ms | 786.1 ms | 46 / 121 | 8 / 96 |
| 2 | 11767.1 ms | 787.1 ms | 41 / 111 | 9 / 93 |
| 3 | 10861.2 ms | 912.0 ms | 44 / 113 | 9 / 97 |

La mediana del trabajo de rasterizado pasa de **11 767,1 ms a 787,1 ms**, y la mediana del trabajo `Paint` de **471,6 ms a 183,9 ms**. Los intervalos entre callbacks mayores de 50 ms pasan de una mediana de **44 a 9**. La duración de tareas del proceso principal (`TaskDuration`) pasa de una mediana de **4,095 s a 1,622 s**. Las pausas restantes incluyen el montaje de pestañas y las imágenes bajo CPU limitada; estos resultados no afirman ausencia de lag en todos los equipos.

## Circuito junto al título y resumen reorganizado

La nueva cabecera eléctrica incluye un SVG de 360×120, sin imágenes externas ni nuevas dependencias. El movimiento dura 3,6 segundos por montaje: dos puntos cambian de sentido en línea y neutro. Solo anima `transform`/`opacity`, usa `IntersectionObserver` para pausar fuera de pantalla y queda estático con `prefers-reduced-motion`. No se reintroduce `panel-glow` en el artículo completo.

Las regresiones comprueban la apertura con fuentes pendientes y CPU limitada, ausencia de sombra grande, contenido de pestañas inactivas desmontado, pausa fuera de pantalla y final de la animación. Los resultados raster de la tabla anterior corresponden al resumen anterior, no a una medición de esta nueva composición.
