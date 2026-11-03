# Electricidad: lectura sencilla y CV actualizado

La fotografía ambiental aparece únicamente en la cabecera de Electricidad. El cuerpo y el footer utilizan fondos oscuros lisos, con bordes, iconos y acentos amarillos relacionados con electricidad. Las imágenes de trabajos, herramientas, certificados y taller conservan su función propia; las demás áreas mantienen su presentación.

Herramientas y Certificados se presentan como dos tarjetas breves: título, cantidad y flecha. Toda la tarjeta es un botón. Se colocan juntas desde 640 px y se apilan en teléfono. Los conteos salen de los datos reales: cinco fotografías de herramientas y cuatro cursos completados. Se conservan los enlaces `#tools`, `#certificate`, sus alias, la carga de contenidos al abrir, la ampliación y el retorno de foco al cerrar. Los encabezados abiertos reciben el foco y los controles de cierre mantienen un nombre accesible completo.

El menú superior de escritorio y móvil conserva Inicio y las áreas profesionales. No incluye Contacto, CV ni Sobre mí; los enlaces del footer, las rutas directas y los atajos móviles siguen funcionando.

## CV y procedencia

`src/data/resumes.json` incorpora los cuatro cursos completados de electricidad, con sus fechas, duración cuando está impresa y enlace al PDF original:

- Instalaciones Eléctricas Básicas — Udemy, 2 de noviembre de 2026, 7.5 horas.
- Mediciones Eléctricas — Udemy, 30 de octubre de 2026, 2 horas.
- Lectura de planos y esquemas — LinkedIn Learning, 30 de octubre de 2026.
- Tableros, variadores de frecuencia y transformadores — LinkedIn Learning, 2 de noviembre de 2026.

El resumen técnico reúne instalaciones residenciales, diagramas, mediciones, cálculos eléctricos, conductores/protecciones y fundamentos de tableros, transformadores y variadores, conforme a los temarios aportados. El bloque de experiencia conserva trabajos residenciales documentados y las prácticas de tablero y electronivel. No presenta el ejercicio START/STOP planeado como realizado. Universidad Internacional · RED CONOCER conserva su estado en curso; los cursos no se convierten en empleo industrial ni en una licencia profesional.

El CV eléctrico ES/EN tiene tres páginas por idioma, con trabajos desde la primera página y la fotografía solo en su primer encabezado. El CV general, que reutiliza estos datos de formación, también se actualiza y contiene siete páginas por idioma. El generador comprueba paginación, separación del footer y texto seleccionable; las vistas PNG corresponden a cada página real del PDF. Se conservan los archivos eléctricos originales subidos y los certificados originales.

Para regenerar estas versiones:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run generate:cvs -- --only=electrical,general
```
