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

No se necesita instalar navegadores de nuevo si ya están disponibles. `test:e2e` compila la aplicación y sirve el resultado en el puerto **4173**, con las mismas cabeceras de seguridad de Vercel; el servidor de desarrollo sigue usando 8080. Las pruebas cubren cambios de idioma, los seis detalles SOC, galerías, estados de formación, tamaños móviles/tablet/escritorio, navegación con enlaces, historial y hashes, accesos móviles, movimiento reducido y bloqueo de scripts inline por CSP.

## Idiomas y medios

Las páginas traducen desde React con `useLanguage().t()`; no se modifica el DOM con observadores. Las cadenas inglesas existentes permanecen como claves por compatibilidad. Las correcciones revisadas están en `src/i18n/es.reviewed.ts`. Nuevos textos necesitan entradas en español; consultas, comandos, IDs e indicadores técnicos conservan su valor exacto.

`site.url` es el dominio público usado en SEO. Las fotografías, videos y capturas se sirven localmente desde `public/images/` y `public/media/portfolio/`. La procedencia y hashes de los medios migrados están en `docs/local-media-provenance.json`; no se requieren servicios de la plataforma anterior para mostrarlos.

`vercel.json` incluye el fallback de rutas SPA y las cabeceras de seguridad: CSP con scripts y recursos locales, prohibición de incrustar el sitio en frames, aislamiento de ventanas, política de referencias y restricciones de permisos del navegador. `vite preview` reutiliza esas cabeceras para poder comprobarlas con la aplicación compilada. Esto prepara configuración; el despliegue público depende de Vercel. Los metadatos por ruta continúan siendo generados en el cliente.

La auditoría del 15 de octubre de 2026 reporta **cero avisos en dependencias de producción** (`npm audit --omit=dev`). La auditoría completa conserva **8 avisos: 5 altos y 3 moderados**, en herramientas CSS utilizadas al desarrollar y compilar. Reclasificar `tailwindcss-animate` como herramienta de desarrollo no corrige esas vulnerabilidades transitivas. Ver [auditoría de seguridad](docs/security-audit.md) para el alcance y las migraciones pendientes.

Ver [guía de contenido](docs/portfolio-content.md) para añadir evidencia real y completar Electrical sin duplicar componentes.

## Integración continua

`.github/workflows/validate.yml` valida push y PR hacia main con npm ci, TypeScript, ESLint, pruebas, build y Chromium. La auditoría bloquea nuevos avisos críticos y muestra los avisos pendientes. No fusiona cambios ni despliega.

## Control del repositorio

El desarrollo usa GitHub y Vercel. Se han eliminado los plugins, planes y fixture exclusivos de la plataforma anterior. Eliminar archivos no revoca una integración de GitHub: en GitHub → Settings → Applications → Installed GitHub Apps → Lovable → Configure, retira solamente este repositorio de su acceso. Revisa también la conexión GitHub dentro del proyecto anterior. La cuenta actual de automatización no puede consultar los webhooks del repositorio (HTTP 403), por lo que no se afirma que la integración esté desconectada.

Para regenerar los CV se usa Chromium, Poppler y Python con pypdf; `npm run generate:cvs`. Los archivos generados se guardan en Git, por lo que Vercel no necesita esas herramientas. Los seis CV se actualizan en español e inglés con mascota y diseño por perfil; el original eléctrico se conserva por separado, sin modificaciones.

## Mascota interactiva

La interfaz activa usa ilustraciones locales, sin canvas ni WebGL, para funcionar también con las restricciones de LibreWolf/Mullvad. El selector de seis atuendos conserva los colores por área, teclado y navegación. Hay cinco escenas por perfil y los seis personajes se distribuyen también por Home. Hover o foco sobre cada selector preparan su atuendo con una transición ilustrada, sin navegar hasta el clic. Los personajes y el logo del encabezado se ampliaron, el nombre incluye «aka Culichi» y el footer reúne contacto y enlaces por área. El modelo 3D, su fuente Blender, las texturas y el código Three.js permanecen guardados para una futura versión, sin cargarse en la página. Ver [modelo y recursos conservados](docs/culichi-mascot.md).

Los seis accesos rodean al personaje en una órbita lenta, con etiquetas que permanecen derechas. El movimiento se detiene al interactuar, al salir de pantalla o con la preferencia de movimiento reducido; también tiene un control de pausa. Un motivo de ríos y circuitos y una explicación desplegable relacionan la identidad de Culichi con Culiacán. En celular, la barra inferior y el selector de secciones ofrecen accesos directos sin ocultar el final del contenido.

Las galerías desplegables muestran cuatro fotografías repartidas por la colección, con contador y ampliación por foto. Herramientas y CV comparten la composición con su mascota: la ilustración acompaña al contenido en vez de crear una fila vacía. Electricidad incluye una pared de herramientas ilustrada; las fotos originales y los modelos se incorporarán al [catálogo de herramientas](docs/tool-photo-catalog.md) cuando el titular los facilite. Los PDF actuales y los originales archivados se conservan.
