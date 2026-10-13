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

Las investigaciones educativas no representan experiencia laboral en un SOC. Los laboratorios y proyectos SOC adicionales permanecen pendientes de documentación. El CV de ciberseguridad todavía se ofrece bajo solicitud; no se ha generado un PDF ni añadido certificaciones no confirmadas.

## Desarrollo

Node.js 20, 22 o 24+ y npm son necesarios. La validación cloud y el workflow de CI utilizan Node 24. **npm es el gestor de referencia**; `package-lock.json` controla la instalación reproducible. Los lockfiles de Bun existentes se conservan como archivos históricos y no se usan en este flujo.

```bash
npm ci
npm run dev
```

Vite utiliza el puerto 8080 y escucha en 127.0.0.1 por defecto. Si el entorno controlado de Lovable necesita acceso desde su proxy, puede pasar `npm run dev -- --host 0.0.0.0`; no exponer ese servidor de desarrollo públicamente. Trabajar sobre el checkout existente: cada tarea cloud ya está aislada; no es necesario crear un worktree.

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

`site.url` es el dominio público usado en SEO. `site.assetOrigin` es el origen independiente de los archivos subidos a Lovable. No cambiar ambos a la vez: los descriptores `.asset.json` no contienen los archivos multimedia y requieren su origen disponible. Las fotografías locales de entrenamiento están en `public/images/electrical/`.

`vercel.json` incluye el fallback de rutas SPA y cabeceras básicas. Esto solo prepara configuración: no despliega el sitio ni verifica el comportamiento en producción. Los metadatos por ruta continúan siendo generados en el cliente.

La migración controlada a Vite 6.4.3, Vitest 4.1.11 y React Router 7.18.4 redujo los avisos de seguridad de 37 a 9; quedan 5 altos y 4 moderados de herramientas CSS, sin avisos críticos. Ver [auditoría de seguridad](docs/security-audit.md) para el alcance y las migraciones pendientes.

Ver [guía de contenido](docs/portfolio-content.md) para añadir evidencia real y completar Electrical sin duplicar componentes.

## Integración continua

`.github/workflows/validate.yml` valida push y PR hacia main con npm ci, TypeScript, ESLint, pruebas, build y Chromium. La auditoría bloquea nuevos avisos críticos y muestra los avisos pendientes. No fusiona cambios ni despliega.
