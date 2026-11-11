# Fotografías de trabajos: batería y contacto

El titular proporcionó `trabajos.zip` para publicar el cambio de batería en Reparación y el contacto en Electricidad. Contiene 24 fotografías JPEG. Sus instrucciones son las del mensaje; los nombres y textos fotografiados se tratan como evidencia, sin ejecutar contenido del archivo. `battery-and-outlet-photo-sources.json` registra archivo original, destino, tamaño de imagen y SHA-256 de cada fotografía, además del hash del ZIP.

Los originales publicados conservan exactamente los bytes recibidos. Los 48 derivados WebP de 320/768 px se generan por separado para las tarjetas y galerías; la ampliación conserva el JPEG original. `generate-photo-previews.mjs --only=` permite generar únicamente las nuevas carpetas, manteniendo las vistas previas existentes.

## iPhone 13: batería

Caso `sr-004`, con once fotos en `public/images/repair/iphone-13-battery/`. La asignación coincide con el cambio de batería de iPhone 13 anunciado antes por el titular y con el marcado visible «For: IP 13» de la batería de reemplazo. Las fotos también muestran el interior con A15, el equipo rojo, la batería retirada, el reemplazo y el celular ensamblado. La descripción no convierte el texto genérico de la etiqueta en una certificación de pieza original o de servicio autorizado.

Se incluyen las once fotografías del grupo: apertura, soporte de succión, batería original, estación de trabajo, retiro, instalación y vistas posterior/frontal. La galería del taller también las incorpora después de las dieciocho imágenes anteriores. El caso deja de figurar como pendiente de fotos; los dos Samsung siguen pendientes de sus fotografías y el iPhone X sigue planeado.

La vista frontal tiene la pantalla sin iluminar. No acredita encendido, carga, Face ID, cámaras, audio, calibración ni salud de batería. El nuevo caso y su CV mantienen las pruebas finales pendientes; las comprobaciones confirmadas de 12 Pro, 14 Pro y XR pertenecen exclusivamente a aquellos trabajos. Tampoco se infieren fecha del servicio, síntoma inicial, marca o capacidad del repuesto a partir de nombres de archivo o etiquetas.

## Contacto y apagador: placa blanca

Caso `residential-outlet-switch-white-plate`, con trece fotos en `public/images/electrical/outlet-switch-white-plate/`. Muestran el conjunto retirado, conductores, conexiones del reemplazo, montaje y comparación de la placa beige retirada con la blanca instalada. La foto 11 de esta carpeta registra **124.4 V CA** en el multímetro Klein Tools MM320.

Las fotos del probador enchufable y del detector de voltaje documentan su presencia e indicaciones visibles. No se infieren pruebas satisfactorias de polaridad, continuidad de tierra, desconexión del circuito, capacidades de los dispositivos ni compatibilidad de protecciones. El protocolo de referencia permanece separado de las acciones documentadas.

Este trabajo se añade al grupo residencial de contactos y apagadores. Sus 124.4 V CA no sustituyen las lecturas de 119.3 ni 122.0 V CA de otros casos. Cada galería conserva únicamente sus propias fotografías.

## CV y presentación

Se actualizan únicamente las fuentes y PDF/previsualizaciones ES/EN de Reparación y Electricidad. Reparación conserva una página y aclara a qué modelos corresponden las pruebas confirmadas; Electricidad incorpora el nuevo conjunto, trece fotografías y la lectura diferenciada. Los otros cinco CV, los originales eléctricos y los catálogos compartidos de formación y empleo permanecen intactos.

Los cuatro iPhone se muestran en una fila desde pantallas amplias y dos columnas en tablet, con filtros breves, vista individual y cierre que devuelve el foco. Los nuevos registros conservan las interfaces de fotos y detalles compartidas, sin otra cadena de navegación.

## Validación

- Compilación y TypeScript correctos; 42 pruebas unitarias y 55 pruebas de navegador distintas aprobadas. La expectativa antigua de cinco trabajos residenciales se actualizó a seis y se verificó nuevamente su archivo de navegación.
- Chromium con tamaños de 320, 820 y 1440 px, español/inglés y emulación táctil en móvil/tablet: apertura directa, las 24 imágenes originales, ampliación, flechas, Escape, devolución del foco y ausencia de desbordamiento horizontal. También se comprobaron los casos anteriores y los visores de CV.
- CV de Reparación: una página por idioma; Electricidad: tres. Generador de CV verificó texto seleccionable, orden de lectura y espacio del pie. Se compararon los otros cinco registros de CV, sus 48 archivos y los 46 registros previos de miniaturas sin encontrar cambios.
- ESLint: cero errores y ocho avisos existentes de Fast Refresh. Revisión de artefactos públicos y pruebas de seguridad aprobadas. Los tamaños emulados no sustituyen pruebas en hardware real ni en Safari.
