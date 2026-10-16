# Ilustraciones de los espacios de trabajo

Seis escenas originales generadas el 16 de octubre de 2026 con la herramienta de imágenes, a partir de las ilustraciones de Culichi ya aprobadas. Cada imagen muestra un lugar completo, con el personaje y su atuendo, mobiliario, equipo y luz del color de su perfil. Son arte de marca; no representan fotografías ni instalaciones propiedad del titular.

| Área | Original PNG conservado en `generated_images/` | Referencia de personaje en `src/assets/mascot-scenes/` |
| --- | --- | --- |
| Electricidad | `exec-5b6e51bd-53a9-41ff-9e3e-64b3c2ac38b6.png` | `electrical-tool-wall.webp` |
| Ciberseguridad | `exec-986ec96b-e78d-4ddc-9b8a-d4f282ff5d0e.png` | `cybersecurity.webp` |
| Software | `exec-18c820fa-22da-43a3-94f9-91c0e6880d1f.png` | `development.webp` |
| Electrónica | `exec-5b7c044f-5844-4e8b-b3e9-bc445ca06d28.png` | `electronics.webp` |
| Reparación | `exec-84d08fd7-e3b0-4daf-bde2-c5154fd8714e.png` | `repair.webp` |
| Atención al cliente | `exec-116bd30b-8446-40c6-81fb-49ba22524e69.png` | `customer-service.webp` |

La referencia de la pared de herramientas eléctrica sirvió también como guía de acabado y materiales para las otras áreas. Los originales permanecen en el espacio de trabajo, fuera del repositorio. La aplicación utiliza las copias WebP en `src/assets/workspaces/`, registradas en `workspaceArtwork.ts`.

La conversión con ImageMagick solo cambia formato, resolución y compresión: 1536×1024 a calidad 86 y 768×512 a calidad 84, eliminando metadatos. No altera creativamente las imágenes ni modifica las fotografías reales. Las copias pequeñas pesan entre 98 y 126 kB y las completas entre 286 y 370 kB. Cada página solicita la variante que el navegador elige; la ampliación utiliza la completa. No se cargan las seis habitaciones como un atlas único.

Las fotografías de prácticas, certificados, PDF, retratos de encabezado y footer y el selector exclusivo de Home conservan sus recursos anteriores. La escena principal mantiene la etiqueta de entrada y los cinco personajes distintos del contenido de cada área.
