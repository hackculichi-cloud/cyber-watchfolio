# Constancia LIDETEC: documento digitalizado

La fotografía aportada permanece intacta en `public/images/repair/cert-lidetec.jpg`, SHA-256 `94adec42521bb27f89644d7696d705234528fb3ba363b8609047244130fc61b1`. Es la fuente de la constancia de participación del 1 de agosto de 2026, con el nombre, curso y firma impresos. No se presenta como certificación Apple ni como una credencial nueva.

`scripts/generate-lidetec-scan.mjs` coloca exclusivamente esa fotografía en una página mediante una transformación geométrica de sus límites de papel. Corrige la orientación y perspectiva y deja la cama y el soporte exterior fuera del encuadre. No redibuja texto, logos, firma ni márgenes ausentes. El PDF es una copia digitalizada de la foto, no un PDF original emitido por la escuela. La fotografía suministrada sigue disponible en la información del documento y en los enlaces originales de los CV.

La vista generativa explorada durante la limpieza alteró detalles de la firma y fue descartada. Ningún archivo generativo se utiliza como constancia ni como previsualización publicada.

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run generate:lidetec
```

Se necesitan Chromium, `pdfinfo`, `pdftoppm` e ImageMagick. La generación es local y sin red; verifica el hash de la fuente y produce una sola página. La vista WebP se rasteriza de ese PDF y se codifica sin pérdida. El script no modifica la fotografía original. Los límites de papel están documentados en el script; si cambia la fotografía se exige revisarlos.

El componente compartido `CertificateDocumentPreview` presenta tanto esta constancia como los originales de Udemy y LinkedIn: hoja completa, fondo de documento, ampliación y devolución del foco al cerrar. LIDETEC mantiene su marca tipográfica neón, descarga del PDF y estado de participación. Los datos del documento y la fotografía fuente son opcionales; el temario conserva sus cinco módulos antes de los trabajos.

# Cursos que complementan otras áreas

Cada registro de `certifications.ts` puede declarar `supports` con el área, el destino y un resumen de su aportación. `relatedTrainingFor` reutiliza el mismo registro y estado, elimina duplicados por identificador y `RelatedTraining` muestra las asociaciones. Un curso nuevo se enlaza en las áreas indicadas al registrar una relación respaldada por su temario.

- Mediciones Eléctricas de Udemy complementa Reparación y Electrónica.
- Lectura de planos y esquemas de LinkedIn complementa la lectura de simbología y diagramas en Electrónica; no se atribuye un curso de diseño de PCB.
- El curso LIDETEC complementa Electrónica mediante componentes, instrumentos, soldadura y manejo de tarjetas.
- Electrónica Básica de ETO complementa Reparación y conserva el estado en curso.

No se crean cursos pendientes ni se cambian estados o documentos para poblar otras áreas. Las asociaciones no añaden certificaciones a los CV ni convierten formación complementaria en experiencia práctica documentada.
