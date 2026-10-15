# Revisión de seguridad — 15 de octubre de 2026

## Resultado actual

- Auditoría de dependencias de producción (`npm audit --omit=dev`): **0 avisos reportados**.
- Auditoría completa: **8 avisos, 5 altos y 3 moderados; 0 críticos**. Corresponden al procesamiento de CSS durante desarrollo/compilación, no a un formulario público que acepte CSS o patrones.
- `tailwindcss-animate` solo se importa desde la configuración de Tailwind. Se trasladó a `devDependencies`; no cambió ninguna versión de paquete. El cambio clasifica correctamente el árbol de compilación y no se presenta como una corrección de los avisos transitivos pendientes.
- Se verificó instalación congelada con `npm ci`. `braces` 3.0.3 sigue siendo la versión publicada consultada y continúa afectada. El parser corregido 7.1.6 cruza las restricciones de los consumidores de la rama 6, incluida `@tailwindcss/typography` 0.5.20. No se aplicaron overrides entre versiones mayores ni una migración forzada a Tailwind 4 en este cambio de diseño.

## Protección del sitio estático

`vercel.json` añade una Content Security Policy: scripts y recursos locales, bloqueo de objetos/frames, de incrustación por otros sitios, de formularios y de cambios de base a otros orígenes. No permite JavaScript inline ni `eval`. Los estilos inline permanecen permitidos porque las posiciones de las ilustraciones y los componentes Radix los utilizan. También se aplican `X-Frame-Options: DENY` y `Cross-Origin-Opener-Policy: same-origin`; se conservan `nosniff`, Referrer-Policy y Permissions-Policy.

El build de producción local utiliza exactamente esas cabeceras en `vite preview`. Las pruebas de navegador se ejecutan ahora en un servidor de producción dedicado en el puerto local 4173, con un build nuevo y la política real. El servidor de desarrollo permanece en 127.0.0.1:8080. El workflow realiza el build dentro de las pruebas de navegador, evitando duplicarlo.

La prueba de seguridad comprueba que el sitio y las previsualizaciones de CV carguen y que el navegador bloquee un script inline de prueba. Las nuevas cabeceras no se declaran activas en producción hasta fusionar y desplegar el PR. El dominio público ya devuelve HSTS del proveedor (`max-age=63072000`); no se cambia esa configuración.

## Exposición revisada

- Aplicación estática, sin backend, inicio de sesión, API de escritura ni formulario que reciba datos. Contacto usa enlaces de correo/GitHub/LinkedIn; las vistas previas son locales.
- No se encontraron archivos de formato secreto rastreados (`.env`, `.pem`, `.key`) ni coincidencias en la revisión acotada de patrones de claves privadas/tokens sobre fuentes y configuración. Nunca se imprimen posibles valores. No se publica ningún ZIP de trabajo ni source map en `public`.
- Los contenidos se renderizan como texto React. El helper de estilos de gráficos usa configuración local y no recibe entradas públicas. Las rutas/hash se prueban con valores inválidos; el idioma continúa funcionando si el almacenamiento del navegador está bloqueado.
- Fuentes, imágenes, mascotas y certificados se mantienen locales. No se añade un chat de IA, un servicio de generación, analítica ni un recurso remoto nuevo. La identidad de ríos/circuitos es una ilustración decorativa, no una declaración de competencia o integración de IA.

La revisión cubre el árbol instalado, las fuentes actuales, la política del navegador y los flujos locales. No incluye una auditoría de las cuentas de GitHub/Vercel ni una prueba de penetración de infraestructura. Los avisos de herramientas pendientes continúan visibles en CI.

---

# Historial de revisiones anteriores

# Auditoría de dependencias — 13 de octubre de 2026

## Actualización: retirada de herramientas de la plataforma anterior

Se retiraron los tres paquetes exclusivos de esa integración y se verificó `npm ci` con el lockfile de npm. La auditoría actual devuelve **8 avisos: 5 altos y 3 moderados; 0 críticos**. Pertenecen a Tailwind 3 y su cadena CSS (`braces`, `chokidar`, `fast-glob`, `micromatch`, `postcss-nested`, `postcss-selector-parser` y `@tailwindcss/typography`). No se ejecutó ninguna corrección forzada ni migración a Tailwind 4.

La sección siguiente conserva los resultados históricos previos a esta retirada; sus referencias a herramientas eliminadas no describen la configuración actual.


## Resultado de la actualización controlada

- Base inicial: 37 avisos (7 moderados, 28 altos, 2 críticos).
- Tras las actualizaciones compatibles iniciales: 16 avisos (8 moderados, 6 altos, 2 críticos).
- Tras esta migración: **9 avisos (4 moderados, 5 altos, 0 críticos)**.

Se ejecutó una nueva auditoría del lockfile instalado. No se usó `npm audit fix --force`, no se forzaron dependencias transitivas incompatibles y se conservaron React 18, Tailwind 3 y las herramientas Lovable.

Versiones fijadas en el manifiesto y lockfile:

| Dependencia | Antes | Después |
| --- | --- | --- |
| Vite | 5.4.21 | 6.4.3 |
| Vitest | 3.2.7 | 4.1.11 |
| React Router DOM / Router | 6.30.6 | 7.18.4 |
| Tinypool | 1.1.1 | Eliminado del árbol instalado |
| esbuild principal | 0.21.5 | Rama 0.25 corregida |

Los conteos incluyen avisos propagados a paquetes dependientes: no equivalen a nueve vulnerabilidades independientes del sitio público. La auditoría puede cambiar cuando se publiquen nuevos avisos.

## Avisos corregidos

- **Tinypool:** dos avisos críticos sobre opciones heredadas de prototipos con posible ejecución de código. Vitest 4 ya no introduce Tinypool. [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3), [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr).
- **Vitest / Mocker:** lectura de archivos mediante redirect mocks; versión corregida 4.1.11. [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9).
- **Vite / esbuild:** la actualización elimina los avisos detectados del servidor de desarrollo, incluidos acceso a archivos y lectura mediante el servidor de esbuild. El host local queda restringido a 127.0.0.1.
- **React Router:** la versión 7.18.4 elimina los avisos detectados de redirección, hidratación SSR y el aviso adicional de RSC que afecta a versiones anteriores a 7.18.2. El proyecto sigue siendo una SPA con BrowserRouter, sin introducir SSR ni RSC.

## Avisos pendientes

| Paquete | Clasificación reportada | Causa |
| --- | --- | --- |
| braces | Alta | Agotamiento de pila con patrones profundamente anidados |
| chokidar | Alta | Hereda el aviso de braces |
| fast-glob | Alta | Hereda el aviso a través de micromatch |
| micromatch | Alta | Hereda el aviso de braces |
| tailwindcss | Alta | Hereda avisos de sus herramientas de procesamiento |
| postcss-selector-parser | Moderada | Agotamiento de CPU; afecta versiones anteriores a 7.1.6 |
| postcss-nested | Moderada | Hereda el aviso del parser |
| @tailwindcss/typography | Moderada | Hereda el aviso del parser |
| lovable-tagger | Moderada | Hereda avisos de su árbol CSS |

`braces` 3.0.3 sigue siendo la última versión publicada consultada y está afectada. El parser corregido 7.1.6 cruza la versión mayor que usan varios dependientes. Las soluciones propuestas por npm incluyen Tailwind 4 o cambios incompatibles de plugins; no se aplicaron automáticamente.

Estas dependencias procesan estilos y archivos durante desarrollo/compilación. No se encontró una función pública que procese patrones o CSS enviados por visitantes. Eso reduce la exposición observada, pero no elimina el riesgo al compilar material no confiable. No presentar la aplicación como completamente libre de vulnerabilidades.

La migración futura debe revisar Tailwind 4, tailwind-merge y los plugins CSS. Actualizar únicamente Tailwind podría dejar otra copia de Tailwind 3 introducida por lovable-tagger; se debe verificar todo el árbol y la integración Lovable.

## Validación y CI

La validación local incluye instalación congelada con npm ci, TypeScript, producción, lint, pruebas de componentes y navegador. Los resultados concretos se consignan en la descripción del PR. Los medios externos dependen del acceso de red y no quedan validados por comprobar únicamente fotografías locales.

El workflow `.github/workflows/validate.yml` repite las comprobaciones con Node 24. Las acciones están fijadas por SHA y el token del workflow solo recibe lectura de contenidos. La auditoría muestra todos los avisos y bloquea regresiones críticas mediante `--audit-level=critical`; los altos/moderados conocidos continúan pendientes y documentados. No hay pasos de despliegue.
