# CV general y por perfil

El catálogo publica siete CV en español e inglés. Todos usan varias páginas para presentar el contenido sin reducirlo a listas comprimidas. El general reúne las cinco áreas técnicas y los otros seis presentan exclusivamente su perfil. La experiencia de atención al cliente aparece solo en su CV. Los catorce PDF tienen previsualizaciones PNG de todas sus páginas; el número de páginas se mide por documento e idioma y se registra en `cvManifest.json`.

`src/data/resumes.json` es la fuente bilingüe del contenido. El catálogo `career` se utiliza exclusivamente en atención al cliente, donde conserva los cinco puestos confirmados con institución, fechas, ubicación y responsabilidades. Los demás documentos usan como experiencia sus propios proyectos, investigaciones educativas, trabajos o prácticas; no incorporan la cronología de servicio al cliente ni la cifra de siete años. El renderizador rechaza una referencia accidental a `career` en otro perfil. El catálogo compartido `training` conserva los estados de formación.

Cada versión destaca sus propios datos: siete años confirmados en el CV de atención; nueve proyectos de software, automatización de reportes con Python, tres investigaciones educativas de seguridad, trabajos residenciales documentados, formación electrónica o tres reparaciones de iPhone realizadas según el área. El CV eléctrico sitúa Universidad Internacional · RED CONOCER antes de los cursos complementarios. Academlo sigue como estudios inconclusos; AWS, preparación; Linux y los cursos vigentes, en curso; las especialidades futuras, planes.

## Diseño dentro del PDF

`scripts/cv-layout.mjs` reutiliza los fondos originales del sitio: Home para el general; redes para seguridad; código para software; postes y rayos para electricidad; circuitos para electrónica; banco de reparación para reparación técnica; atención al cliente para ese perfil. El atlas local `culichi-athletic-body-atlas.webp` aporta la mascota completa con el atuendo propio, de mayor tamaño en la cabecera.

Los fondos abarcan la página con velos oscuros y superficies legibles. El diseño sigue la web: títulos con iconos Lucide y numeración, tarjetas de habilidades con herramientas, cronología laboral y tarjetas de trabajos con enlaces al portafolio. Formación y certificaciones muestran institución, curso y estado; la constancia LIDETEC enlaza al documento original. Udemy y LinkedIn usan sus SVG locales; otras instituciones se representan con monogramas, sin inventar logos o acreditaciones.

Se usan márgenes A4, Manrope de 10.5 pt con interlineado 1.5, títulos de sección de 14 pt y una cabecera más compacta en las páginas siguientes. Las fuentes estáticas Regular y Bold se incluyen en `public/fonts/cv/`, derivadas de la fuente variable local y acompañadas por su licencia OFL. La incrustación TrueType conserva los espacios al extraer texto con `pdftotext -raw`; la web mantiene su WOFF2 variable. El pie incluye idiomas y contador de páginas. El contenido es seleccionable; correo, portafolio, repositorios, escuelas y constancia tienen enlaces clicables. El PDF incluye marcadores de sus encabezados. No se descargan fuentes ni imágenes remotas durante la generación.

## Generación y comprobaciones

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/generate-profile-cvs.mjs
# Para un subconjunto:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/generate-profile-cvs.mjs --only=general,electrical
```

Se necesitan Chromium, `pdfinfo`, `pdftotext` y `pdftoppm`. `paginateCv` mide las filas en el navegador y crea las páginas necesarias: mantiene enteras las tarjetas, aprovecha todo el ancho en filas impares, conserva los encabezados con su contenido y repite el título de la sección si continúa. La experiencia relevante empieza en la primera página. El generador lo verifica antes de publicar el documento. No se reduce la fuente para forzar un número fijo de hojas.

El generador comprueba el espacio respecto al pie y el número real de páginas. Verifica que nombre, perfil, puestos objetivo, títulos, párrafos, viñetas y estados existan como texto seleccionable en el PDF y rechaza menciones de la cronología de atención al cliente en otros perfiles. Después rasteriza cada página a PNG, retira previsualizaciones posteriores que ya no correspondan y actualiza el manifiesto con contadores independientes ES/EN. `--only` conserva los registros de los demás perfiles. La revisión publica 46 páginas en catorce PDF: general 6 EN / 6 ES; seguridad 3; software 4; electricidad 3; electrónica 2; reparación 2; atención 3 por idioma. Los conteos están en `src/data/cvManifest.json`; se permite que difieran para no comprimir una traducción más larga.

El visor compartido permite recorrer todas las páginas de cada CV, ampliar hasta el 400 % para leer en celular y descargar el documento localizado. La región de vista previa tiene nombre accesible y permite desplazamiento horizontal; cambiar de página ajusta la vista al ancho y vuelve al inicio. Las comprobaciones de navegador recorren cada página de los siete CV en ambos idiomas, sus límites, los archivos PDF y el visor móvil.

Los PDF eléctricos subidos y su copia archivada con mascota no se sobrescriben. El original conserva SHA-256 `47d352a75be8d9600cb5aff219d09e2b1ef7a232cae380f4348b8e1a0d04e903`.

## CV orientados a candidaturas — 20 de octubre de 2026

La primera página presenta el puesto o enfoque, un perfil profesional, tres puestos objetivo y experiencia respaldada por trabajos. Los CV técnicos se orientan a oportunidades junior, auxiliares o prácticas según el alcance documentado; atención al cliente conserva supervisión, soporte N2 y capacitación. No se promete elegibilidad para cualquier puesto ni se añaden títulos profesionales, licencias, métricas o certificaciones inexistentes.

Los trabajos principales llevan acciones concretas y enlaces a evidencia o código, antes de las listas de conocimientos. Software abre con el portafolio y Culichi-Metrics y deja los otros proyectos después; electricidad distingue mantenimiento residencial de práctica de curso y formación industrial; seguridad identifica sus tres investigaciones como educativas. La cronología de atención conserva empresas, fechas y responsabilidades, en viñetas. Su formación complementaria se limita a LIDETEC, pertinente al soporte de dispositivos. Los planes futuros de reparaciones y especializaciones siguen en la web y no ocupan espacio en las candidaturas.

El programa eléctrico de Universidad Internacional · RED CONOCER es el principal y conserva los ocho temas, con estado en curso. Udemy y LinkedIn son complementarios. Cada versión mantiene el fondo y el atuendo de su área. Se preservan los PDF originales subidos y se generan catorce variantes y previsualizaciones fieles de todas sus páginas.
