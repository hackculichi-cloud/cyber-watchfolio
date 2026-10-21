# Ilustraciones de los espacios de trabajo

## Primera versión conservada

Seis escenas originales generadas el 16 de octubre de 2026 con la herramienta de imágenes, a partir de las ilustraciones de Culichi ya aprobadas. Cada imagen muestra un lugar completo, con el personaje y su atuendo, mobiliario, equipo y luz del color de su perfil. Son arte de marca; no representan fotografías ni instalaciones propiedad del titular.

| Área | Original PNG conservado en `generated_images/` | Referencia de personaje en `src/assets/mascot-scenes/` |
| --- | --- | --- |
| Electricidad | `exec-5b6e51bd-53a9-41ff-9e3e-64b3c2ac38b6.png` | `electrical-tool-wall.webp` |
| Ciberseguridad | `exec-986ec96b-e78d-4ddc-9b8a-d4f282ff5d0e.png` | `cybersecurity.webp` |
| Software | `exec-18c820fa-22da-43a3-94f9-91c0e6880d1f.png` | `development.webp` |
| Electrónica | `exec-5b7c044f-5844-4e8b-b3e9-bc445ca06d28.png` | `electronics.webp` |
| Reparación | `exec-84d08fd7-e3b0-4daf-bde2-c5154fd8714e.png` | `repair.webp` |
| Atención al cliente | `exec-116bd30b-8446-40c6-81fb-49ba22524e69.png` | `customer-service.webp` |

La referencia de la pared de herramientas eléctrica sirvió también como guía de acabado y materiales para las otras áreas. Los originales permanecen en el espacio de trabajo, fuera del repositorio. Esa primera versión utilizaba las copias WebP en `src/assets/workspaces/`, registradas en `workspaceArtwork.ts`.

La conversión con ImageMagick solo cambia formato, resolución y compresión: 1536×1024 a calidad 86 y 768×512 a calidad 84, eliminando metadatos. No altera creativamente las imágenes ni modifica las fotografías reales. Las copias pequeñas pesan entre 98 y 126 kB y las completas entre 286 y 370 kB. Cada página solicita la variante que el navegador elige; la ampliación utiliza la completa. No se cargan las seis habitaciones como un atlas único.

Las fotografías de prácticas, certificados, PDF, retratos de encabezado y footer y el selector exclusivo de Home conservan sus recursos anteriores. La escena principal mantiene la etiqueta de entrada y los cinco personajes distintos del contenido de cada área.

## Propuesta archivada de entornos independientes del personaje

En la revisión posterior se generaron versiones de las seis habitaciones sin el zorro. Se reconstruyó el mobiliario y el espacio que ocupaba, conservando el acabado, perspectiva e iluminación originales. Esa propuesta utilizaba `src/assets/environments/`, registrada en `environmentArtwork.ts`, tanto en la imagen principal como en el fondo atenuado continuo del área. La mascota usa su recurso independiente bajo la imagen. Los WebP anteriores de `workspaces/` permanecen conservados.

Las copias nuevas usan la misma conversión de formato y resolución (1536 px calidad 86; 768 px calidad 84). Pesan 285–339 kB las completas y 96–120 kB las pequeñas. No se solicita un atlas con las seis habitaciones. Los originales PNG están conservados en `/workspace/generated_images/`.

| Área | Original del entorno sin personaje |
| --- | --- |
| electrical | `exec-3b704974-11e1-40c0-91cf-b251aeae005f.png` |
| cybersecurity | `exec-1e927440-8e6f-4cea-98b9-3d303924006e.png` |
| development | `exec-3df16b65-81db-459c-aa38-7d634d81dc02.png` |
| electronics | `exec-99ace090-efb2-4026-84e8-45a2803e066e.png` |
| repair | `exec-2f5d22dc-c99a-4cd0-968b-fe544a5c786a.png` |
| customer-service | `exec-db1567be-a6ff-48bb-92c9-3ec7ba72c328.png` |

## Referencias de las especialidades eléctricas

Se generaron dos imágenes de apariencia fotográfica para las tarjetas industrial y control. Son referencias conceptuales; no son fotografías del titular ni evidencias de intervenciones. Se presentan con «Imagen de referencia» y mantienen el estado real de formación o planificación. Las imágenes no constituyen diagramas de instalación ni instrucciones técnicas.

- Industrial: original `exec-741251e5-7601-4d78-a6b1-cc1f5e56e24a.png`; motor industrial y taller.
- Control: original `exec-7c0151a1-c2b3-4c43-93a2-665f5752d5b8.png`; tablero conceptual con contactor y pulsadores.

Copias locales en `src/assets/specialties/`, de 768×512 a calidad 84 (58 y 66 kB). La tarjeta residencial de esa revisión utilizaba la foto original `/images/electrical/outlet-october-2026/16.jpeg`, conservada dentro del trabajo en la versión actual. El catálogo `specialtyArtwork.ts` distingue expresamente los dos tipos de imagen.


## Versión actual: fondos originales y personajes dentro del taller

Por indicación posterior del titular, se recuperan las habitaciones con personaje de `src/assets/workspaces/` como imagen principal. Los fondos de página usan los recursos anteriores de `profileMedia.ts` (incluidos postes y rayos eléctricos), registrados para las seis áreas en `profileAtmospheres.ts`. Las habitaciones sin mascota se conservan archivadas, sin servir como fondos activos.

La portada residencial también es ahora una referencia generada de apariencia fotográfica: original `exec-383e81bf-e9a4-47a7-bf4a-b86d26e16a6c.png`; copia WebP 768×512 en `src/assets/specialties/electrical-residential.webp`. La versión actual retira el rótulo superpuesto de las tres portadas, conservando «Imagen de referencia» en su texto alternativo y la procedencia en el catálogo. Las fotos originales se mantienen dentro de los trabajos y la galería, y no se presentan estas portadas como evidencia de intervenciones reales.

Tres nuevas poses transparentes para Home conservan la identidad de las ilustraciones aprobadas. Se convirtieron a WebP de 640 px de ancho a calidad 88, manteniendo alfa y proporciones. Los originales PNG permanecen en `/workspace/generated_images/`:

| Recurso local en `src/assets/mascot-scenes/` | Original | Uso |
| --- | --- | --- |
| `electronics-back.webp` | `exec-39bd0948-7862-4268-b573-bbc07b2ede74.png` | De espaldas, colocando una placa sobre la tarjeta de formación |
| `repair-peeking.webp` | `exec-474f0a64-da2a-4a7a-aadd-b626af2d5233.png` | En cuclillas, asomándose detrás del bloque de contacto |
| `service-leaning.webp` | `exec-31346484-c72c-470c-99e8-159ea107c080.png` | Escuchando con auriculares, apoyado sobre el correo del footer |

La composición usa capas de CSS para esconder deliberadamente parte de los personajes detrás de los bloques; no altera creativamente las imágenes fuera de la herramienta de generación.

## Estudio de desarrollo · 21 de octubre de 2026

La ilustración actual de `development.webp` muestra a Culichi sentado frente a su setup, dentro de un departamento alto, con ventanal y ciudad al fondo. Se generó con la herramienta de imágenes conservando la identidad del personaje; original `exec-f0345bb4-d11a-4c3c-8b54-1a1b74fa7b59.png`. La conversión local solo crea los recursos WebP de 1536×1024 y 768×512. El fondo original de código de la sección continúa a través de la página; la habitación no lo reemplaza.
