# Mascota Culichi

Las ilustraciones del zorro son arte de marca local. Las fotos reales de prácticas y reparaciones mantienen su función de evidencia, separada de estas ilustraciones.

## Versión activa: ilustración local

Home y las seis áreas muestran `CulichiBody` desde el atlas WebP local. `InteractiveMascot` no importa Three.js ni `Fox3D`: no crea canvas, solicita WebGL ni descarga el GLB. Se conservan los seis selectores y el cambio de imagen antes de navegar, sin la frase «Meet Culichi · choose your area». El aviso de cambio solo se anuncia a lectores de pantalla.

El personaje principal mide 320 px en móvil y 384 px desde `sm`, dentro de un espacio más alto para separar las opciones de la figura. Las escenas del contenido también son mayores y se apilan con el texto en pantallas pequeñas. El encabezado muestra el logo de 56 px y «Christian Velasco / aka Culichi».

## Modelo 3D conservado para una etapa futura

`scripts/build-culichi-model.py` crea el personaje en Blender 4.3.2 y exporta `public/models/culichi.glb`. El archivo editable y la referencia están en `art/culichi/`. El rostro es más serio, con ojos verdes, una cola y detalles de ropa, calzado, guantes y seis conjuntos de accesorios. El GLB contiene geometría y texturas locales; no depende de un servicio externo.

El código archivado en `src/components/mascot/createFox.ts` carga el GLB mediante GLTFLoader. `Fox3D.tsx`, actualmente fuera de la interfaz activa, añade iluminación de estudio y reflejos de entorno. Cabeza, hombro, codo, muñeca y cola se articulan; el cambio de atuendo mantiene el giro antes de navegar. La descarga es asíncrona y la ilustración permanece disponible si falla. Se liberan materiales de instancia, entorno y contexto al salir. Una plantilla inmutable conserva la geometría y las imágenes decodificadas durante la sesión para evitar descargarlas y analizarlas al navegar.

Es una nueva interpretación estilizada en 3D, no una reproducción exacta del render de referencia: no tiene su pelaje denso ni su acabado cinematográfico. La referencia 2D no se usa como si fuera la malla animada. El procedimiento y límites artísticos están documentados en `art/culichi/README.md`.

Si se vuelve a activar, la escena se carga en un módulo independiente. El lienzo admite densidad de píxel hasta 2× y antialiasing. El renderizado se detiene en reposo, fuera de la pantalla y cuando la pestaña está oculta. Al cambiar de ruta se liberan los materiales de instancia, observadores y contexto WebGL; la plantilla del modelo se reutiliza durante la sesión. Si WebGL no está disponible o se pierde su contexto, se muestra una ilustración local y la navegación sigue funcionando. Movimiento reducido evita el saludo, el seguimiento del cursor y el giro de transformación.

## Selector de atuendos

Home y las seis páginas comparten el selector en semicírculo con icono y nombre. Cada enlace usa el color de su área, no el de la página actual: cian, verde, amarillo, naranja, violeta y turquesa. El atuendo activo se indica visualmente y con `aria-current`.

El cursor, el foco o el primer toque muestran las opciones. Solo elegir expresamente otro atuendo inicia la transformación y la navegación después de 1100 ms; el movimiento reducido navega inmediatamente. Elegir el atuendo actual no bloquea las siguientes opciones. Tab, Enter y Escape funcionan, y Escape devuelve el foco al personaje. Las combinaciones Ctrl/Cmd conservan la apertura de enlaces en otra pestaña.

## Cuatro escenas por área

Cada perfil presenta:

1. Personaje ilustrado completo junto al título, con selector de atuendos.
2. Una ilustración realizando una actividad dentro del contenido.
3. Otra ilustración completa, independiente y de alta resolución, junto a herramientas o habilidades transferibles.
4. Una pose distinta de cierre junto al CV.

Las escenas de contenido usan `Reveal` para una entrada suave al desplazarse; no flotan sobre la página y no tienen paneles propios. Las seis nuevas ilustraciones están en `src/assets/mascot-scenes/`, con al menos 1024 píxeles de ancho, y se cargan de forma diferida. Representan revisión de red, programación junto a un servidor, medición eléctrica, uso de osciloscopio, inspección de un teléfono y atención con auriculares y notas.

`culichi-action-scenes.webp` y `culichi-closing-scenes.webp` mantienen las actividades y cierres anteriores. Sus regiones CSS están registradas en `mascotScenes.json`, para mostrar personajes completos sin fragmentos vecinos. `culichi-full-body-atlas.webp` sirve para el personaje principal y los PDF. Los sprites de saludo y el modelo 3D se conservan como recursos para posibles versiones futuras.

El logotipo ampliado del encabezado sigue usando el arte local y cambia por ruta. La composición general de Home y el favicon conservan la identidad existente.

## CV y evidencias

El catálogo, los doce PDF ES/EN y sus previsualizaciones mantienen el diseño aprobado. Los seis CV incluyen contenido confirmado y mascota con el atuendo del perfil. El eléctrico original permanece intacto y descargable. Las fotografías del autor, galerías, reparaciones, certificados y estados de formación no se modifican al añadir el 3D.

## Verificación

Las pruebas comprueban colores distintos, navegación repetida entre perfiles, selección del atuendo activo, teclado, móvil, movimiento reducido y escenas del contenido. También bloquean WebGL y verifican que la interfaz siga funcionando sin solicitar el modelo ni código Three.js. Las fuentes 3D permanecen disponibles, pero ya no forman parte del bundle activo.


## Conocimientos y práctica

`profileCapabilities.ts` organiza las descripciones por habilidades: conocimientos de los temarios, prácticas de formación y trabajos documentados. Electricidad incluye fundamentos/planos, instalaciones, medición, control/motores, mantenimiento y energía; electrónica integra ETO y LIDETEC. Reparación, software y ciberseguridad conservan el contexto de curso, proyecto o laboratorio. Atención al cliente mantiene la experiencia bilingüe confirmada. Los doce PDF ES/EN se regeneran desde `resumes.json` con versiones resumidas; no se completan automáticamente cursos pendientes ni se inventan intervenciones.
