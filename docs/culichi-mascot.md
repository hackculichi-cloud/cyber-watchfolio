# Mascota Culichi

Las ilustraciones del zorro son arte de marca local. Las fotos reales de prácticas y reparaciones mantienen su función de evidencia, separada de estas ilustraciones.

## Modelo 3D interactivo

`components/mascot/createFox.ts` construye un primer modelo 3D estilizado con mallas, materiales y articulaciones. `Fox3D.tsx` lo muestra mediante Three.js/WebGL. El brazo, antebrazo, mano, cabeza y cola tienen movimientos continuos; el cambio de atuendo utiliza un giro completo y un efecto de energía antes de navegar. Los seis atuendos modifican colores y accesorios, como casco, visor, gafas, auriculares y ropa de taller.

Es un modelo procedural inicial. Para alcanzar el acabado y semejanza de las ilustraciones detalladas, la siguiente etapa artística es esculpir y texturizar el personaje en Blender y preparar su rig para exportarlo en GLB. En esta versión se usa el modelo construido en código; no se ha producido un archivo de Blender ni un modelo fotorrealista.

La escena se carga en un módulo independiente. El lienzo admite densidad de píxel hasta 2× y antialiasing. El renderizado se detiene en reposo, fuera de la pantalla y cuando la pestaña está oculta. Al cambiar de ruta se liberan geometrías, materiales, observadores y contexto WebGL. Si WebGL no está disponible o se pierde su contexto, se muestra una ilustración local y la navegación sigue funcionando. Movimiento reducido evita el saludo, el seguimiento del cursor y el giro de transformación.

## Selector de atuendos

Home y las seis páginas comparten el selector en semicírculo con icono y nombre. Cada enlace usa el color de su área, no el de la página actual: cian, verde, amarillo, naranja, violeta y turquesa. El atuendo activo se indica visualmente y con `aria-current`.

El cursor, el foco o el primer toque muestran las opciones. Solo elegir expresamente otro atuendo inicia la transformación y la navegación después de 1100 ms; el movimiento reducido navega inmediatamente. Elegir el atuendo actual no bloquea las siguientes opciones. Tab, Enter y Escape funcionan, y Escape devuelve el foco al personaje. Las combinaciones Ctrl/Cmd conservan la apertura de enlaces en otra pestaña.

## Cuatro escenas por área

Cada perfil presenta:

1. Personaje 3D interactivo junto al título, con alternativa estática local.
2. Una ilustración realizando una actividad dentro del contenido.
3. Otra ilustración completa, independiente y de alta resolución, junto a herramientas o habilidades transferibles.
4. Una pose distinta de cierre junto al CV.

Las escenas de contenido usan `Reveal` para una entrada suave al desplazarse; no flotan sobre la página y no tienen paneles propios. Las seis nuevas ilustraciones están en `src/assets/mascot-scenes/`, con al menos 1024 píxeles de ancho, y se cargan de forma diferida. Representan revisión de red, programación junto a un servidor, medición eléctrica, uso de osciloscopio, inspección de un teléfono y atención con auriculares y notas.

`culichi-action-scenes.webp` y `culichi-closing-scenes.webp` mantienen las actividades y cierres anteriores. Sus regiones CSS están registradas en `mascotScenes.json`, para mostrar personajes completos sin fragmentos vecinos. `culichi-full-body-atlas.webp` sirve para las alternativas estáticas y los PDF. Los sprites de saludo anteriores se conservan como recursos históricos; la interfaz activa utiliza el modelo 3D.

El logotipo pequeño del encabezado sigue usando el arte local y cambia por ruta. La composición general de Home y el favicon conservan la identidad existente.

## CV y evidencias

El catálogo, los doce PDF ES/EN y sus previsualizaciones mantienen el diseño aprobado. Los seis CV incluyen contenido confirmado y mascota con el atuendo del perfil. El eléctrico original permanece intacto y descargable. Las fotografías del autor, galerías, reparaciones, certificados y estados de formación no se modifican al añadir el 3D.

## Verificación

Las pruebas comprueban colores distintos, navegación repetida entre perfiles, selección del atuendo activo, teclado, móvil, movimiento reducido, WebGL, parada en reposo, pérdida y ausencia de contexto e imágenes adicionales. Los resultados de renderizado por software del navegador de pruebas no equivalen a una medición de FPS en los dispositivos de los visitantes.
