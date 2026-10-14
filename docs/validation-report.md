# Validación local — 13 de octubre de 2026

Entorno: Node 24.19.0, npm, Chromium del sistema. Versiones migradas: Vite 6.4.3, Vitest 4.1.11 y React Router DOM 7.18.4.

| Comprobación | Resultado |
| --- | --- |
| npm ci --no-audit --no-fund | Instalación congelada correcta, 493 paquetes |
| npm run build | Correcto; incluye TypeScript de aplicación y configuración de Vite |
| npm run lint | Correcto, 0 errores y 8 advertencias Fast Refresh |
| npm run test | 4 pruebas de componentes aprobadas |
| npm run test:e2e -- --workers=2 | 9 pruebas de navegador aprobadas, usando Chromium instalado |
| npm audit --json | 9 avisos: 5 altos, 4 moderados, 0 críticos; exit 1 debido a los pendientes |
| git diff --check | Correcto |
| Workflow YAML | Parseado; permisos de contenidos limitados a lectura |

Las pruebas cubren cambio ES/EN con investigación abierta, los tres casos y tres playbooks SOC, fotografías locales ampliadas y navegación por teclado, estados reales de formación, práctica START/STOP planeada, anchos de 375/768/1440 px, enlaces React Router, historial, hashes y recarga con persistencia de idioma. También verifican metadatos, separación de dominio público/origen de medios y recuperación de errores de imágenes.

Los fallos iniciales por instalación concurrente y reinicio del servidor se diagnosticaron y la ejecución final se realizó con dependencias completas y configuración estable. No se debilitaron assertions ni se omitieron casos para lograr el resultado.

Limitaciones:

- El build advierte un chunk principal de aproximadamente 506 kB minificado (160 kB gzip). No impide compilar y no se ocultó elevando el límite.
- Los medios necesarios de la plataforma anterior se migraron a rutas locales, conservando bytes y hashes. Las fuentes también se sirven localmente. La validación actual bloquea las peticiones al origen anterior y comprueba las rutas locales.
- El workflow de CI se añadió pero estos resultados corresponden a ejecución local, no a una ejecución confirmada en GitHub Actions.
- No se fusionaron cambios ni se ejecutó un despliegue de producción. El comportamento de Vercel/Cloudflare en producción no se certifica con una ejecución local.

Los detalles de los avisos pendientes están en [security-audit.md](security-audit.md).
