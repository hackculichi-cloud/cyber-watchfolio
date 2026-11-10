# Revisión de uso en pantallas y seguridad · 10 de noviembre de 2026

Se mantiene como criterio de publicación la navegación sencilla con tacto y teclado en teléfono, tablet y computadora. La información conserva alineación natural y las fotografías/ilustraciones mantienen sus espacios equilibrados. Las nuevas prácticas anunciadas siguen pendientes de los ZIP del titular.

La revisión encontró un defecto real: el botón genérico de cierre de trabajos y certificados tenía un área de 16 × 16 px. Ahora mide 44 × 44 px, con contorno visible e icono de 20 px. El encabezado reserva espacio para separar el cierre, el idioma y el título. Una prueba toca el área fuera del icono y verifica el cierre y el retorno de foco, tanto en trabajo como en certificado.

La matriz manual de Chromium con tacto comprobó 320×740, 390×844, 768×1024, 820×1180, 1024×768 y 1440×900. Se recorrieron Inicio, Electricidad/trabajos, Reparación, CV y Contacto: sin desbordamiento horizontal ni errores JavaScript observados. Los cierres midieron 44 × 44 px y devolvieron el foco al botón de origen en los seis tamaños. Se revisaron capturas del diálogo en teléfono y tablet.

La selección final de 43 pruebas de navegador pasó sobre el build final: incluye menú y navegación rápida táctiles, fuentes lentas y CPU limitada, tres casos de reparación, nueve fotos originales de la práctica eléctrica, herramientas/certificados, las páginas ES/EN de los siete CV, footer, cierre táctil y seis comprobaciones de seguridad/CSP. También pasan build/TypeScript, lint (cero errores y ocho advertencias previas), 32 pruebas unitarias y revisión de artefactos publicados. La instalación limpia y la auditoría completa/producción son correctas; detalles en [security-audit.md](security-audit.md).

Son pruebas de Chromium con tamaños y tacto emulados, no pruebas en dispositivos físicos. Se intentó añadir WebKit para ampliar la cobertura Safari/iPad, pero el descargador oficial recibió HTTP 403 «Domain forbidden» del entorno. Safari/iOS y Firefox no se declaran verificados.
