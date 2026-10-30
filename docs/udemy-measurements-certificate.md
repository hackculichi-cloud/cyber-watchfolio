# Mediciones Eléctricas · Udemy

Christian proporcionó `medicionesss.pdf` el 30 de octubre de 2026 para publicarlo en su portafolio. El archivo se conserva byte por byte en `public/certificates/udemy-mediciones-electricas.pdf`.

- Titular: Christian Velasco Estrada.
- Instructor: Irving Lopez Hernandez.
- Finalización: 30 de octubre de 2026; duración: 2 horas.
- Identificador: `UC-25442727-a627-4cdc-894e-d93da3bba021`.
- Original: 15.832 bytes, una página; SHA-256 `92e509b9be513a988e374643ca3d8c11d41217fb865a7ad667b0283e06bef0d7`.

El texto del PDF confirma esos datos. La vista previa WebP de 1600×1190 es una rasterización sin pérdida de su única página, sin reconstruir ni retocar el certificado. El visor muestra esa imagen local y la descarga entrega el PDF original. `pdfinfo` no detectó JavaScript, formularios ni cifrado.

Para reproducir la vista previa con Poppler e ImageMagick 7:

```sh
pdftoppm -f 1 -singlefile -scale-to 1600 -png public/certificates/udemy-mediciones-electricas.pdf /tmp/udemy-mediciones-original
magick /tmp/udemy-mediciones-original.png -strip -define webp:lossless=true public/certificates/udemy-mediciones-electricas.webp
```

El temario publicado transcribe los 26 temas visibles en la captura aportada y se identifica como parcial: cuatro bloques de fundamentos, instrumentos, mediciones y seguridad. Los diez objetivos previamente documentados se conservan. Universidad Internacional · RED CONOCER sigue como formación principal en progreso; Instalaciones eléctricas básicas de Udemy también sigue en progreso.

Los CV general y eléctrico en español e inglés reflejan el curso completado y enlazan al original local. Se comprobaron todas sus páginas y sus vistas previas fieles; los demás CV y los originales archivados permanecen intactos.
