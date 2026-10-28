# Fluidez: medición local del 28 de octubre de 2026

La referencia es `7d17966`, que ya contiene el menú sin «Sobre mí», las herramientas de barbería sin recuadros y la carga de rutas sin desmontar el encabezado. Esta revisión reduce trabajo repetido y recursos sin retirar fondos, cursos, prácticas o ilustraciones.

## Cambios

- El circuito eléctrico agrupa las mediciones de letras en un solo frame. No vuelve a leer todos los SVG si el tamaño y la fuente siguen iguales; recalcula al cambiar el ancho, la fuente o el idioma. La marca compacta no necesita observar su visibilidad.
- Los puntos del circuito realizan tres ciclos lentos y se detienen. El foco conserva su estado encendido. Pausa, reanudación y movimiento reducido siguen disponibles.
- Encabezado y portada eléctrica conservan sus subárboles estáticos durante cambios de pestaña. El panel eléctrico es el único responsable de posicionar sus pestañas y cursos, evitando dos órdenes de scroll.
- Los temarios cerrados no montan sus ocho acordeones hasta la primera apertura. La activación prepara el contenido antes de la apertura nativa; después se conserva el estado de los módulos al cerrar y reabrir.
- Los teléfonos usan una imagen de taller acorde con la columna real de aproximadamente 45vw. En 390px/DPR3, Electricidad elige 768px/113.644 bytes en lugar de 1536px/331.750 bytes. El visor ampliado conserva 1536px. La prueba recorre las siete áreas.
- El papel ilustrativo de certificados pasa de PNG de 1.915.233 bytes a WebP sin pérdida de 1.094.406 bytes (−42,9%). Se comprobó igualdad exacta de píxeles; el PNG original se conserva. No se modifican documentos ni fotografías personales.

## Método y resultados

Chromium local, viewport 390×844, DPR3, CPU limitada a 4×, español. Se tomaron tres muestras seriales con contextos nuevos y movimiento reducido para separar las aperturas de las animaciones. Los datos completos están en [fluency-measurements.json](./fluency-measurements.json).

| Acción | Trabajo total antes → después, ms | JavaScript antes → después, ms |
| --- | ---: | ---: |
| Carga inicial de Electricidad | 776,2 → 803,4 | 214,0 → 235,9 |
| Abrir residencial | 244,5 → 231,0 | 98,9 → 80,0 |
| Abrir proyectos | 141,3 → 160,1 | 50,6 → 46,4 |
| Abrir certificaciones | 213,6 → 209,8 | 66,8 → 48,5 |
| Abrir herramientas | 135,0 → 135,8 | 45,1 → 44,2 |
| Volver al resumen | 157,0 → 125,1 | 51,7 → 39,9 |

Son medianas de métricas CDP. El trabajo total incluye tareas del navegador y de la interacción automatizada. Las aperturas muestran menos trabajo JavaScript, pero la variación de los tiempos totales y la carga inicial impide atribuir una aceleración general constante.

En una medición separada con animación habilitada, se esperaron 21 segundos y se muestrearon tres segundos de reposo. Antes hubo 180 recálculos de estilo y 243,5ms de trabajo total; después, cero recálculos y 1,1ms. Esta diferencia corresponde al circuito que deja de repintarse, no a una mejora del 99% de toda la página.

No son mediciones de FPS, INP de producción ni de un teléfono físico. El bundle principal sigue por encima de 500kB; esta revisión no atribuye el problema a librerías 3D sin uso ni elimina información para reducirlo.

## Reproducción

Con un build de producción servido localmente:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

En otra terminal:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium \
FLUENCY_REPORT=/tmp/fluency.json node scripts/measure-profile-fluency.mjs
```

`FLUENCY_BASE_URL` permite apuntar a otro puerto. Es una herramienta de diagnóstico; no impone umbrales temporales de CI que dependan del equipo.

## Validación funcional

26 pruebas unitarias y 28 escenarios de Chromium aprobados. Cubren geometría y cambio de fuente del circuito, pausa/movimiento reducido, ocho módulos por programa, conservación de módulos abiertos al cerrar/reabrir el temario, prácticas y estados reales, salto/foco de cursos, visor de certificados, imagen móvil DPR3 en siete perfiles, visor ampliado, encabezado durante carga retrasada y controles de Home a 320px. TypeScript/build y `git diff --check` correctos; ESLint conserva ocho advertencias previas y ningún error.
