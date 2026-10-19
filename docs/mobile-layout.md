# Portada y perfiles compactos en móvil

La portada reúne nombre, presentación, fondo y selector del zorro. Se elimina el bloque adicional de la imagen grupal que aparecía debajo del selector. Los seis accesos se muestran desde la entrada; tocar fuera o empezar a desplazarse no los oculta. En teléfono están fijos en dos columnas simétricas de tres controles de 82×58 px, con el personaje en el centro. La órbita animada se conserva en escritorio.

El escenario tiene 228 px de alto y baja a 204 px si la pantalla mide como máximo 700 px de alto. Encabezado y navegación de sección se ajustan a 80 px en móvil. Los enlaces de área, controles de detalle y menú mantienen áreas de toque de al menos 44 px. La presentación conserva los accesos al CV y áreas; correo y contacto continúan en el footer y la navegación rápida.

## Contenido que se abre al elegirlo

Home muestra las seis áreas en dos columnas. Las tarjetas mantienen título, acción personal, prueba de trabajo/formación y enlace; «Ver habilidades en detalle» muestra los tres puntos de cada perfil. «Vista compacta» permite regresar al resumen. En escritorio se conservan las tarjetas completas.

Los perfiles largos muestran en móvil el bloque elegido en el selector de sección. El botón «Ver todo» restablece el recorrido completo; «Por secciones» vuelve a un bloque. Se mantienen los enlaces con hash, recarga, enlaces internos y la vista completa al ampliar a escritorio. Electricidad conserva sus propios paneles por área y pestaña. La implementación en `ProfileSectionNav` marca las regiones declaradas por cada perfil y una regla CSS móvil controla su presentación; el contenido y sus datos no se eliminan.

Las entradas de perfiles colocan taller y título juntos y conservan la ampliación de la ilustración. Los encabezados de contenido integran personajes más pequeños a un lado. Especialidades, espacios y footer también reducen su altura, conservando nombres y estados; la explicación completa de cada especialidad aparece al abrirla. Las fotos de trabajos, certificados y PDF originales no se modifican.

## Comparación de la portada

Mediciones locales con Chromium, español inicial y movimiento reducido; cifras redondeadas en píxeles CSS. Miden la altura del contenido, no tiempos de carga ni rendimiento en equipos reales.

| Ancho | Altura inicial de Home | Altura compacta | Portada inicial | Portada compacta |
| --- | ---: | ---: | ---: | ---: |
| 320 px | 8035 | 4044 | 1192 | 540 |
| 390 px | 7382 | 3627 | 1230 | 505 |
| 430 px | 7110 | 3573 | 1293 | 505 |

En la pantalla de 320×640 px la portada baja a unos 516 px y todos los accesos quedan por encima de la barra inferior. `mobile-home-compact.spec.ts` comprueba primera vista, alcance real con el dedo, expansión de habilidades, bloques por perfil, enlaces profundos y regreso a escritorio. También recorre las seis rutas desde sus controles con toques directos, sin saludo previo.
