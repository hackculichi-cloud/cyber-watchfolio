# Constancia LIDETEC: documento digitalizado

La fotografía aportada permanece intacta en `public/images/repair/cert-lidetec.jpg`, SHA-256 `94adec42521bb27f89644d7696d705234528fb3ba363b8609047244130fc61b1`. Es la fuente de la constancia de participación del 1 de agosto de 2026, con el nombre, curso y firma impresos. No se presenta como certificación Apple ni como una credencial nueva.

`scripts/generate-lidetec-scan.mjs` coloca exclusivamente esa fotografía en una página mediante una transformación geométrica de sus límites de papel. Corrige la orientación y perspectiva y deja la cama y el soporte exterior fuera del encuadre. No redibuja texto, logos, firma ni márgenes ausentes. El PDF es una copia digitalizada de la foto, no un PDF original emitido por la escuela. La fotografía suministrada sigue disponible en la información del documento y en los enlaces originales de los CV.

La vista generativa explorada durante la limpieza alteró detalles de la firma y fue descartada. Ningún archivo generativo se utiliza como constancia ni como previsualización publicada.

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run generate:lidetec
```

Se necesitan Chromium, `pdfinfo`, `pdftoppm` e ImageMagick. La generación es local y sin red; verifica el hash de la fuente y produce una sola página. La vista WebP se rasteriza de ese PDF y se codifica sin pérdida. El script no modifica la fotografía original. Los límites de papel están documentados en el script; si cambia la fotografía se exige revisarlos.

El componente compartido `CertificateDocumentPreview` presenta tanto esta constancia como los originales de Udemy y LinkedIn: hoja completa, fondo de documento, ampliación y devolución del foco al cerrar. `LidetecBrand` muestra el sello real que ya aparece en la vista de la constancia mediante una ventana SVG; no genera ni redibuja un logo. La marca conserva un borde neón discreto, descarga del PDF y estado de participación. Los datos del documento y la fotografía fuente son opcionales; el temario conserva sus cinco módulos antes de los trabajos.

# Cursos que complementan otras áreas

Cada registro de `certifications.ts` puede declarar `supports` con el área, el destino y un resumen de su aportación. `relatedTrainingFor` reutiliza el mismo registro y estado y elimina duplicados por identificador. `RelatedTraining` muestra directamente los documentos disponibles mediante `ProfileCertificateCard`, la misma tarjeta utilizada en Electricidad, con ampliación, marca de la institución, información desplegable, descarga y enlace al curso completo. Las formaciones sin documento, como ETO, se muestran aparte sin una imagen inventada. Un curso nuevo aparece en las áreas indicadas al registrar una relación respaldada por su temario.

- Mediciones Eléctricas de Udemy complementa Reparación y Electrónica.
- Lectura de planos y esquemas de LinkedIn complementa la lectura de simbología y diagramas en Electrónica; no se atribuye un curso de diseño de PCB.
- El curso LIDETEC complementa Electrónica mediante componentes, instrumentos, soldadura y manejo de tarjetas.
- Electrónica Básica de ETO complementa Reparación y conserva el estado en curso.

No se crean cursos pendientes ni se cambian estados o documentos para poblar otras áreas. Las asociaciones no añaden certificaciones a los CV ni convierten formación complementaria en experiencia práctica documentada.

# Temario completo proporcionado por el titular

Se incorporan los 44 temas de su mensaje: lunes 7, martes 9, miércoles 10, jueves 8 y viernes 10. Las cinco agrupaciones conservan sus resúmenes visibles y sus temas completos mediante un control anterior a la lista. Se utilizan listas legibles en lugar de una pared de etiquetas. La mención «sábado día 1 / día 2 / día 3» queda como modalidad proporcionada dentro de los detalles, sin inferir fechas ni duración.

La instrucción de cambiar el logo, mostrar certificados y quitar leyendas estaba insertada dentro de la línea de instalación de centros de carga: se aplica a la web y no se publica como lección. El apartado de Android describe los conceptos del temario, sin convertir su referencia a una «fórmula secreta» en una promesa de desbloqueo universal. Los contenidos de firmware, recuperación de acceso, NCK y servidor siguen identificados como formación.

Se eliminan las dos leyendas solicitadas de Inicio y de todos los footers compartidos, conservando los contactos reales, ilustraciones y accesos de navegación.
