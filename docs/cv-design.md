# CV general y por perfil

El catálogo publica siete CV en español e inglés. El general reúne las seis áreas en dos páginas: experiencia profesional y fortalezas en la primera; proyectos, prácticas, conocimientos y formación en la segunda. Los seis perfiles mantienen una página cada uno. Los archivos descargables son catorce PDF; sus dieciséis páginas tienen previsualizaciones PNG rasterizadas del documento real.

`src/data/resumes.json` es la fuente bilingüe del contenido. Incluye los siete años confirmados de atención, soporte, capacitación y operaciones; los cinco puestos profesionales; nueve proyectos de software, automatización de reportes con Python, tres investigaciones educativas de seguridad, trabajos residenciales documentados, formación electrónica y las tres reparaciones de iPhone realizadas. Mantiene Academlo como estudios inconclusos, AWS como preparación, Linux y los cursos vigentes en curso, y las especialidades futuras como planes. No atribuye prácticas planeadas a experiencia completada.

## Diseño dentro del PDF

`scripts/cv-layout.mjs` reutiliza los fondos originales del sitio: Home para el general; redes para seguridad; código para software; postes y rayos para electricidad; circuitos para electrónica; banco de reparación para reparación técnica; atención al cliente para ese perfil. El atlas local `culichi-athletic-body-atlas.webp` aporta la mascota completa con el atuendo propio, de mayor tamaño en la cabecera.

Los fondos abarcan la página con velos oscuros, superficies legibles, encabezados en el color del área, márgenes A4, pie con idiomas y contador de páginas. La tipografía del contenido prioriza lectura y selección de texto; los enlaces de correo, portafolio, GitHub y LinkedIn son clicables. No se descargan fuentes ni imágenes remotas durante la generación.

## Generación y comprobaciones

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/generate-profile-cvs.mjs
# Para un subconjunto:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/generate-profile-cvs.mjs --only=general,electrical
```

Se necesitan Chromium, `pdfinfo`, `pdftotext` y `pdftoppm`. El generador comprueba que el contenido deje espacio al pie, que el número de páginas sea dos o uno según el CV y que los títulos de todas las secciones existan como texto seleccionable en el PDF. Después rasteriza cada página a PNG y actualiza el manifiesto. El visor compartido conserva zoom, descarga localizada y navegación entre las páginas del general; el cambio de página ajusta la vista al ancho y vuelve al inicio.

Los PDF eléctricos subidos y su copia archivada con mascota no se sobrescriben. El original conserva SHA-256 `47d352a75be8d9600cb5aff219d09e2b1ef7a232cae380f4348b8e1a0d04e903`.
