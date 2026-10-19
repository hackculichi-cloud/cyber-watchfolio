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
