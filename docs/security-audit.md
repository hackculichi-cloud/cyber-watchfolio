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
