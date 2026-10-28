# Seguridad

El portafolio es una aplicación estática. No recibe contraseñas, pagos ni datos mediante formularios y no dispone de una API de escritura.

Para informar de una vulnerabilidad, escribe a **christian@culichi.lat** con la URL afectada, los pasos mínimos para reproducirla y su impacto. No publiques datos sensibles ni tokens en una incidencia pública. No realices pruebas de denegación de servicio ni accedas a información ajena.

La revisión actual, sus comprobaciones y sus límites están en [docs/security-audit.md](docs/security-audit.md). Una auditoría sin avisos de dependencias no garantiza que el sitio esté libre de vulnerabilidades.

Antes de publicar cambios:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run security:audit
npm run lint
npm run test
npm run build
npm run security:artifacts
npm run test:e2e
```

CI bloquea avisos de dependencias de nivel moderado o superior. Las actualizaciones propuestas por Dependabot requieren revisión; no se fusionan automáticamente. Los archivos `.env`, la configuración local de Vercel y las claves privadas se excluyen del seguimiento por defecto.
