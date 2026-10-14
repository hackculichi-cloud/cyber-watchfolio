# Mascota Culichi

Las ilustraciones del zorro se generaron a partir de la identidad existente y se guardan localmente. Son arte de marca; las fotografías reales de prácticas y reparaciones se mantienen como evidencias independientes.

## Interacción

`InteractiveMascot` reproduce un saludo breve mediante fotogramas de distintas posiciones del brazo. Después se queda en reposo, sin una animación infinita. En Home, acercar el cursor, enfocar o pulsar al personaje muestra seis opciones en semicírculo con icono y nombre. El primer toque en móvil abre el selector.

Solo elegir expresamente un área inicia la transformación: la ilustración cambia de atuendo mediante fundido y un halo durante 900 ms, y después se navega. Pasar el cursor no cambia de página. Ctrl/Cmd/clic y los enlaces mantienen su comportamiento de abrir otra pestaña. Al salir por otra navegación se cancela el temporizador. Los controles admiten Tab, Enter y Escape; Escape devuelve el foco al personaje.

En el destino, el saludo utiliza los fotogramas del atuendo correspondiente. Se puede repetir con el cursor o al pulsar. Con movimiento reducido se muestran poses estáticas y la selección navega sin el efecto de transformación. No se añaden librerías de animación, rastreo ni servicios externos.

## Escenas de cada área

Cada perfil tiene tres ilustraciones en el flujo del documento: bienvenida junto al título, una actividad vinculada al contenido y una pose de cierre junto al CV. Las dos últimas tienen una entrada suave al desplazarse, respetando movimiento reducido. No son elementos flotantes ni paneles independientes de la mascota.

- Ciberseguridad: revisión de registros en monitor.
- Software: programación con portátil.
- Electricidad: medición de un circuito didáctico junto al curso de Mediciones Eléctricas.
- Electrónica: diagnóstico de componentes en una mesa de trabajo.
- Reparaciones: intervención de un teléfono.
- Atención al cliente: auriculares y notas de soporte.

## Archivos

- `culichi-mascot-atlas.webp`: versiones pequeñas para el encabezado. El logotipo cambia según la ruta; el favicon SVG contiene arte local.
- `culichi-full-body-atlas.webp`: poses completas de presentación y figuras para los PDF (3 × 3).
- `culichi-greeting-frames.webp`: seis fotogramas del saludo principal (3 × 2).
- `culichi-outfit-greetings.webp`: seis atuendos, uno por fila, con seis fotogramas por saludo (6 × 6).
- `culichi-action-scenes.webp`: seis actividades distintas (3 × 2).
- `culichi-closing-scenes.webp`: seis poses de cierre (3 × 2, celdas verticales).
- `culichi-home-background.webp`: composición general de las seis áreas, elevada en escritorio para dejar más visible el grupo junto al texto.

Las regiones de las escenas están descritas en `mascotScenes.json` para mostrar orejas, colas y botas completas sin incluir fragmentos vecinos. Las celdas se muestran mediante fondos CSS, sin descargar una imagen independiente por fotograma. `Reveal` solo anima la entrada en pantalla, sin movimiento continuo entre bloques.

## PDF

El generador incrusta ilustraciones y fondos por perfil dentro de los PDF. Los seis CV principales tienen variantes ES/EN, una página y texto seleccionable. Los datos proceden de `resumes.json`: no se inventan empleos, métricas ni certificaciones. El eléctrico incluye los dos cursos Udemy y RED CONOCER en curso; la constancia LinkedIn Learning figura completada. El original subido por el usuario permanece idéntico y descargable por separado.

Las previsualizaciones PNG se obtienen de la primera página del PDF real. Generar requiere Chromium, Poppler y Python/pypdf; Vercel sirve los archivos guardados sin necesitar esas herramientas. La página del catálogo CV mantiene su diseño anterior.
