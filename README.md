# Cyber Watchfolio

Portafolio de Christian Velasco, construido con React, TypeScript, Vite, Tailwind CSS y shadcn/ui.

Sitio principal: https://culichi.lat

## Contenido documentado

- Tres investigaciones educativas realizadas en **LetsDefend**: VPN, RDP y phishing.
- Tres playbooks con procedimientos de investigación y respuesta.
- Prácticas eléctricas de curso y trabajos residenciales documentados con fotografías y video.
- Práctica futura de control con contactor y START/STOP, marcada como **planeada**.
- Formación de RED CONOCER y de Udemy en curso.
- Curso **Electrical Systems: Reading Drawings and Schematics**, de LinkedIn Learning, completado según confirmación del autor. Imagen del certificado pendiente.

Las investigaciones educativas no representan experiencia laboral en un SOC. Los laboratorios y proyectos SOC adicionales permanecen pendientes de documentación. Cada área dispone de su CV, una sección de certificaciones y estados explícitos para formación y documentos pendientes. No se añaden certificaciones no confirmadas.

## Desarrollo

Node.js 20, 22 o 24+ y npm son necesarios. La validación cloud y el workflow de CI utilizan Node 24. **npm es el gestor de referencia**; `package-lock.json` controla la instalación reproducible. No se mantienen lockfiles de otros gestores.

```bash
npm ci
npm run dev
```

Vite utiliza el puerto 8080 y escucha en 127.0.0.1 por defecto. Trabajar sobre el checkout existente: cada tarea cloud ya está aislada; no es necesario crear un worktree.

## Validación

```bash
npm run lint
npm run test
npm run build
```

`build` incluye comprobación de tipos de la aplicación y de la configuración de Vite. Lint mantiene advertencias de Fast Refresh de los componentes compartidos de shadcn/ui.

Para pruebas de navegador:

```bash
npx playwright install chromium
npm run test:e2e
```

Si el entorno ya proporciona Chromium, se puede reutilizar:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e -- --workers=2
```

No se necesita instalar navegadores de nuevo si ya están disponibles. Las pruebas cubren cambios de idioma, los seis detalles SOC, galerías, estados de formación, tamaños móviles/tablet/escritorio y navegación con enlaces, historial y hashes.

## Idiomas y medios

Las páginas traducen desde React con `useLanguage().t()`; no se modifica el DOM con observadores. Las cadenas inglesas existentes permanecen como claves por compatibilidad. Las correcciones revisadas están en `src/i18n/es.reviewed.ts`. Nuevos textos necesitan entradas en español; consultas, comandos, IDs e indicadores técnicos conservan su valor exacto.

`site.url` es el dominio público usado en SEO. Las fotografías, videos y capturas se sirven localmente desde `public/images/` y `public/media/portfolio/`. La procedencia y hashes de los medios migrados están en `docs/local-media-provenance.json`; no se requieren servicios de la plataforma anterior para mostrarlos.

`vercel.json` incluye el fallback de rutas SPA y cabeceras básicas. Esto solo prepara configuración: no despliega el sitio ni verifica el comportamiento en producción. Los metadatos por ruta continúan siendo generados en el cliente.

La migración controlada a Vite 6.4.3, Vitest 4.1.11 y React Router 7.18.4 y la retirada de los plugins de la plataforma anterior dejaron 8 avisos de seguridad: 5 altos y 3 moderados de herramientas CSS, sin avisos críticos. Ver [auditoría de seguridad](docs/security-audit.md) para el alcance y las migraciones pendientes.

Ver [guía de contenido](docs/portfolio-content.md) para añadir evidencia real y completar Electrical sin duplicar componentes.

## Integración continua

`.github/workflows/validate.yml` valida push y PR hacia main con npm ci, TypeScript, ESLint, pruebas, build y Chromium. La auditoría bloquea nuevos avisos críticos y muestra los avisos pendientes. No fusiona cambios ni despliega.

## Control del repositorio

El desarrollo usa GitHub y Vercel. Se han eliminado los plugins, planes y fixture exclusivos de la plataforma anterior. Eliminar archivos no revoca una integración de GitHub: en GitHub → Settings → Applications → Installed GitHub Apps → Lovable → Configure, retira solamente este repositorio de su acceso. Revisa también la conexión GitHub dentro del proyecto anterior. La cuenta actual de automatización no puede consultar los webhooks del repositorio (HTTP 403), por lo que no se afirma que la integración esté desconectada.

Para regenerar los CV se usa Chromium, Poppler y Python con pypdf; `npm run generate:cvs`. Los archivos generados se guardan en Git, por lo que Vercel no necesita esas herramientas. Los seis CV se actualizan en español e inglés con mascota y diseño por perfil; el original eléctrico se conserva por separado, sin modificaciones.

## Mascota interactiva

La interfaz activa usa ilustraciones locales, sin canvas ni WebGL, para funcionar también con las restricciones de LibreWolf/Mullvad. El selector de seis atuendos conserva los colores por área, teclado y navegación. Los personajes y el logo del encabezado se ampliaron, y el nombre incluye «aka Culichi». El modelo 3D, su fuente Blender, las texturas y el código Three.js permanecen guardados para una futura versión, sin cargarse en la página. Ver [modelo y recursos conservados](docs/culichi-mascot.md).
