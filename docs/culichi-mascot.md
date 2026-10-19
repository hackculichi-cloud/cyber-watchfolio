# Mascota Culichi

Las ilustraciones del zorro son arte de marca local. Las fotos reales de prácticas y reparaciones mantienen su función de evidencia, separada de estas ilustraciones.

## Versión activa: ilustración local

Home y las seis áreas muestran `CulichiBody` desde el atlas WebP local. Solo Home monta `InteractiveMascot`: no importa Three.js ni `Fox3D`, ni crea canvas o descarga el GLB. Allí se conservan los seis selectores y el cambio de imagen antes de navegar, sin la frase «Meet Culichi · choose your area». El aviso de cambio solo se anuncia a lectores de pantalla. Cada área recibe al visitante con `ProfileWorkspace`, una composición estática del zorro completo y su entorno de trabajo.

En escritorio el selector ocupa un espacio cuadrado de hasta 560 px. Los seis accesos se distribuyen a la misma distancia del centro; al abrirlos la figura ocupa el 50% del escenario y los nombres quedan dentro de las burbujas. En teléfono el escenario ocupa 228 px de alto (204 px en pantallas bajas), con tres controles fijos de 82×58 px a cada lado del personaje. Aparecen desde el inicio y no se cierran al tocar fuera o desplazarse; no hace falta hover ni saludo previo. La figura ocupa el 58% del ancho y el fondo forma parte de la misma portada, sin una segunda imagen debajo.

El arte del zorro se dibuja por encima de burbujas y herramientas, sin interceptar sus clics. El saludo usa un botón central independiente. La leyenda reserva 64 px en escritorio para evitar saltos; en móvil no ocupa espacio adicional. El encabezado mide 112 px en escritorio y 80 px en teléfono, con el retrato local y «Culichi. / Christian Velasco»; el footer usa «Christian Velasco / aka Culichi». La navegación interna queda debajo del encabezado. No se altera la resolución nativa de las imágenes.

## Modelo 3D conservado para una etapa futura

`scripts/build-culichi-model.py` crea el personaje en Blender 4.3.2 y exporta `public/models/culichi.glb`. El archivo editable y la referencia están en `art/culichi/`. El rostro es más serio, con ojos verdes, una cola y detalles de ropa, calzado, guantes y seis conjuntos de accesorios. El GLB contiene geometría y texturas locales; no depende de un servicio externo.

El código archivado en `src/components/mascot/createFox.ts` carga el GLB mediante GLTFLoader. `Fox3D.tsx`, actualmente fuera de la interfaz activa, añade iluminación de estudio y reflejos de entorno. Cabeza, hombro, codo, muñeca y cola se articulan; el cambio de atuendo mantiene el giro antes de navegar. La descarga es asíncrona y la ilustración permanece disponible si falla. Se liberan materiales de instancia, entorno y contexto al salir. Una plantilla inmutable conserva la geometría y las imágenes decodificadas durante la sesión para evitar descargarlas y analizarlas al navegar.

Es una nueva interpretación estilizada en 3D, no una reproducción exacta del render de referencia: no tiene su pelaje denso ni su acabado cinematográfico. La referencia 2D no se usa como si fuera la malla animada. El procedimiento y límites artísticos están documentados en `art/culichi/README.md`.

Si se vuelve a activar, la escena se carga en un módulo independiente. El lienzo admite densidad de píxel hasta 2× y antialiasing. El renderizado se detiene en reposo, fuera de la pantalla y cuando la pestaña está oculta. Al cambiar de ruta se liberan los materiales de instancia, observadores y contexto WebGL; la plantilla del modelo se reutiliza durante la sesión. Si WebGL no está disponible o se pierde su contexto, se muestra una ilustración local y la navegación sigue funcionando. Movimiento reducido evita el saludo, el seguimiento del cursor y el giro de transformación.

## Selector de atuendos

Solo Home presenta el selector circular con icono y nombre. Cada enlace usa el color de su área: cian, verde, amarillo, naranja, violeta y turquesa. En las áreas se navega mediante el menú habitual, sin selector ni herramientas flotantes. El retrato superior mantiene el atuendo de la ruta mientras se recorren otros menús; las vistas de atuendos al pasar el cursor solo se habilitan en Home. El retrato del footer y el punto de «Culichi.» también siguen el perfil activo.

`MascotMorph` revela dos ilustraciones mediante recortes CSS y un barrido de energía de 640 ms, tanto en el cuerpo como en el retrato del encabezado. No es una animación articulada del modelo 3D. `mascotGear.ts` define dos objetos por área: multímetro/pinzas, osciloscopio/cautín, teléfono/destornillador, portátil/teclado, router/llave USB y diadema/lista de servicio. El atlas transparente local `culichi-tool-props.png` contiene las doce ilustraciones originales; no son fotos de equipo del titular. Las regiones CSS muestran cada objeto por separado.

`MascotToolField` calcula la posición real de la burbuja enfocada, incluso después de que la órbita haya girado. Las herramientas viajan hacia las manos, flotan suavemente y se contraen hacia el cuerpo al elegir el atuendo. Una transición CSS puede continuar desde la posición actual si el usuario selecciona durante el recorrido. Son decorativas y no interceptan clics. Movimiento reducido elimina la flotación y las transiciones; al desaparecer el foco se retiran del escenario. El atlas se precarga con prioridad baja al entrar el selector en pantalla. La leyenda y el menú muestran los nombres y miniaturas de los mismos objetos.

Los cambios del menú se comunican mediante `culichi:area-intent`, separados del evento de salida del selector para evitar ciclos. Al cerrar un menú anterior no se borra la vista del siguiente. Sin animaciones se muestra directamente el nuevo atuendo.

En Home el cursor, el foco o el primer toque muestran las opciones. Hover o foco sobre un selector preparan el atuendo con un barrido ilustrado y un halo del color de su área. La vista es temporal: al salir o pulsar Escape vuelve al personaje original. No se navega al pasar el cursor. Con movimiento reducido se cambia la ilustración sin barrido ni halo animado. Elegir expresamente otro atuendo inicia la transformación de 640 ms y la navegación a los 720 ms; el movimiento reducido navega inmediatamente. Tab, Enter y Escape funcionan, y Escape devuelve el foco al personaje. Las combinaciones Ctrl/Cmd conservan la apertura de enlaces en otra pestaña.

## Cinco escenas por área

Cada perfil presenta:

1. Personaje ilustrado completo junto al título, dentro de su lugar de trabajo y sin selector.
2. Una nueva pose de práctica junto a conocimientos o experiencia.
3. Una ilustración realizando una actividad dentro del contenido.
4. Otra ilustración completa, independiente y de alta resolución, junto a herramientas o habilidades transferibles.
5. Una pose distinta de cierre junto al CV.

Las escenas de contenido usan `Reveal` para una entrada suave al desplazarse; no flotan sobre la página y no tienen paneles propios. Las seis nuevas ilustraciones están en `src/assets/mascot-scenes/`, con al menos 1024 píxeles de ancho, y se cargan de forma diferida. Representan revisión de red, programación junto a un servidor, medición eléctrica, uso de osciloscopio, inspección de un teléfono y atención con auriculares y notas.

`culichi-action-scenes.webp` y `culichi-closing-scenes.webp` mantienen las actividades y cierres anteriores. Sus regiones CSS están registradas en `mascotScenes.json`, para mostrar personajes completos sin fragmentos vecinos. `culichi-full-body-atlas.webp` sirve para el personaje principal y los PDF. Los sprites de saludo y el modelo 3D se conservan como recursos para posibles versiones futuras.

El logotipo ampliado del encabezado sigue usando el arte local y cambia por ruta. La composición general de Home y el favicon conservan la identidad existente.

## Lugares de trabajo y fluidez

`ProfileWorkspace` vuelve a mostrar las seis habitaciones con el zorro integrado dentro de la ilustración principal. El personaje no aparece fuera de la escena en su pie. Las imágenes locales de `workspaces/` tienen variantes 768/1536 px y ampliación en el diálogo compartido; no se cambian las fotografías reales de los trabajos.

El fondo de todas las áreas es el original del portafolio: red en ciberseguridad, código en software, postes y rayos en electricidad, circuitos en electrónica, banco de reparación y auriculares/comunicación en atención al cliente. `profileAtmospheres.ts` registra estos recursos independientemente de las ilustraciones del taller; su imagen atenuada continúa por el perfil y el footer. `environmentArtwork.ts` y sus habitaciones sin personaje se conservan como archivos de una propuesta anterior, sin uso en la interfaz activa.

`mascotIdentity.ts` mantiene el catálogo de cuerpo y retrato. Cambiar de animal sigue requiriendo nuevas poses, atuendos, escenas y recursos de CV, incluidas las habitaciones donde aparece el zorro; no existe una conversión automática. El material 3D permanece archivado.

Se retiraron el zoom de 18 segundos del fondo de las áreas, la animación del patrón eléctrico y el desenfoque de todas las tarjetas. La entrada de la página usa solo opacidad durante 180 ms, sin desplazar todo el contenido. El encabezado y la navegación de sección en celular usan superficies de fondo sin desenfoque, y el listener de scroll es pasivo. Son reducciones concretas de trabajo de renderizado, no un benchmark de rendimiento en todos los navegadores.

En escritorio Home coloca presentación y nombre a la izquierda y selector a la derecha, con el fondo distribuido en todo el hero. En celular comparten una portada compacta con el fondo integrado y los seis accesos visibles. Las tarjetas de áreas usan dos columnas y permiten abrir sus habilidades en detalle; los perfiles largos muestran un bloque elegido con opción de ver todo. Las ilustraciones de talleres acompañan al título y las decorativas se integran junto a los encabezados, con tamaños menores. «Trabajos realizados» reemplaza «Evidence» como etiqueta de navegación eléctrica, conservando el hash `#evidence` y las fotografías originales.

Home integra personajes de menor tamaño en puntos distintos del contenido: ciberseguridad cuelga del encabezado de habilidades; software se sienta en el borde de su tarjeta; electricidad trabaja junto a la división de formación; electrónica aparece de espaldas detrás de la tarjeta de capacitación; reparación se asoma detrás de la acción de contacto; y atención al cliente se apoya sobre el bloque de correo del footer. Las capas reservan el espacio del texto, mantienen los enlaces y no utilizan overlays fijos. Las ilustraciones completas se conservan aunque el contenido oculte intencionalmente parte de algunas poses.

## CV y evidencias

El catálogo ofrece un CV general y seis CV por perfil, todos en ES/EN: catorce PDF con tantas páginas como requiere su contenido y previsualizaciones fieles de cada página. Cada documento incorpora el fondo original de su área, color propio, texto seleccionable y una mascota de cuerpo completo con el atuendo correspondiente; el general usa la identidad de Home. Incluyen perfil, habilidades, cronología laboral completa, trabajos o proyectos y formación/certificaciones con estados explícitos. El visor permite recorrer todas las páginas, ampliar y cambiar de idioma. El eléctrico original y su copia anterior con mascota se conservan intactos. El contenido, las fuentes y la generación reproducible se describen en `cv-design.md`.

## Verificación

Las pruebas comprueban colores distintos, navegación repetida entre perfiles, selección del atuendo activo, teclado, móvil, movimiento reducido y escenas del contenido. También bloquean WebGL y verifican que la interfaz siga funcionando sin solicitar el modelo ni código Three.js. Las fuentes 3D permanecen disponibles, pero ya no forman parte del bundle activo.


## Conocimientos y práctica

`profileCapabilities.ts` organiza las descripciones por habilidades: conocimientos de los temarios, prácticas de formación y trabajos documentados. Electricidad incluye fundamentos/planos, instalaciones, medición, control/motores, mantenimiento y energía; electrónica integra ETO y LIDETEC. Reparación, software y ciberseguridad conservan el contexto de curso, proyecto o laboratorio. Atención al cliente mantiene los siete años de experiencia bilingüe confirmada. Los catorce PDF ES/EN se regeneran desde `resumes.json`; el general reúne los cinco puestos, proyectos, prácticas y formación de las seis áreas. No se completan automáticamente cursos pendientes ni se inventan intervenciones.

## Inicio y pie de página

Los seis personajes se reparten por el encabezado de habilidades, tarjetas, formación, contacto y footer de Home. La pose de software está dentro del enlace de su tarjeta; las otras figuras enlazan a su área. No hay filas de personajes emparejados.

`culichi-practice-scenes.webp` contiene seis nuevas poses de cuerpo completo: investigación con tableta, desarrollo sentado con portátil, lectura de esquema eléctrico, montaje de protoboard, apertura de teléfono y atención con plan de servicio. Se generó como lámina 3×2 con fondo transparente; sus celdas completas de 512×512 se seleccionan mediante CSS, sin recortar el personaje ni editar fotos reales.

El footer usa los seis colores de las áreas, la marca Culichi, contacto por correo, GitHub/LinkedIn, enlaces por especialidad y retorno al inicio. Las áreas ocupan la columna izquierda y el bloque completo de nombre, retrato y descripción ocupa la derecha; en móvil se presentan en ese orden vertical. Dentro de la identidad, el nombre queda a la izquierda y el retrato de la ruta a la derecha. Los emblemas tienen luz neón contenida y el retorno responde a hover, foco y pulsación; sus movimientos respetan la preferencia de movimiento reducido. Mantiene ES/EN y los previews locales de contacto; no incorpora dependencias de renderizado ni servicios externos.

## Idioma y navegación compacta

Las visitas sin preferencia guardada abren en español (`html lang="es"`). La elección explícita ES/EN se conserva con `portfolio-lang`. El selector es un solo botón de bandera y flechas, sin texto visible. Tiene un fondo oscuro con brillo y esquinas de circuito en el color del área; ocupa 80×44 px en modo compacto y 88×48 px en el menú móvil. Su nombre accesible y título indican el idioma de destino. Al pulsarlo cambia al otro idioma y anima la bandera entrante; respeta movimiento reducido. No depende de emojis ni servicios externos. La licencia MIT de flag-icons acompaña los archivos.

Los desplegables superiores usan títulos breves, iconos y enlaces de 44 px, sin fotografías, listas de equipo ni descripciones largas. Mantienen los destinos de todas las especialidades, nombres accesibles completos, navegación por teclado y cierre con Escape. Solo la flecha de cada área abre el desplegable por hover; el logo mantiene su enlace y la vista temporal del atuendo sin desplegar contenido. La flecha también funciona con clic, tacto y teclado. Las herramientas del selector de Home siguen funcionando.

Las tres especialidades eléctricas forman tres columnas centradas en escritorio y dos en celular, con la última centrada, con emblemas y títulos centrados. Las tres portadas son referencias realistas generadas, rotuladas «Imagen de referencia». Las fotografías originales solo aparecen al abrir sus trabajos o la pestaña de trabajos realizados; no se reemplazan los registros reales.

## Explorador compacto de Electricidad

Las entradas Residencial, Industrial y Control agrupan la información en un único panel activo. Cada una ofrece Resumen, Proyectos, Trabajos realizados, Certificaciones y Herramientas. Las pestañas permanecen accesibles al recorrer contenido largo y solo el panel elegido monta su contenido. Proyectos conserva categorías y casos propios del área; Trabajos muestra sus fotografías originales y los vacíos honestos de evidencia. Certificaciones reúne los cursos, centros, temarios y documentos pendientes.

La página inicial no monta todos los temarios, galerías y prácticas, y ofrece una barra corta con accesos a especialidades, proyectos, trabajos, certificados y CV. Los hashes anteriores (`#tracks`, `#skills`, `#tools`, `#practice`, etc.) siguen abriendo la pestaña correspondiente. El CV vigente permanece en una fila compacta independiente. Los cinco tipos de escena eléctrica están disponibles a través de estos paneles, en lugar de ocupar una página larga al mismo tiempo.
