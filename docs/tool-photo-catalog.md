# Fotografías de herramientas

El catálogo muestra los nombres de equipos ya publicados en cada perfil. Por ahora usa iconos y una ilustración del taller; no identifica marcas/modelos ni presenta las herramientas dibujadas como fotografías de equipo propio.

Para añadir una fotografía original:

1. Guardar la imagen en `public/images/tools/`, con un nombre descriptivo y sin datos personales visibles.
2. Añadir una entrada a `src/data/toolPhotos.ts`: `profile`, `tool` (el nombre exacto en inglés que ya usa su grupo), `src`, `alt` y, si se ha confirmado, `model`.
3. El catálogo sustituye automáticamente el icono por esa imagen y habilita su vista ampliada. Los nombres y descripciones se traducen con el sistema de idiomas existente.

Ejemplo de estructura (no es equipo publicado):

```ts
{
  profile: "electrical",
  tool: "Digital multimeter",
  src: "/images/tools/multimetro-foto-original.webp",
  alt: "Descripción de la fotografía original",
  model: "Marca y modelo confirmados por el titular",
}
```

La ilustración decorativa `src/assets/mascot-scenes/electrical-tool-wall.webp` se generó como una nueva pose de Culichi tomando un destornillador de la pared. Está separada de las fotografías reales de trabajos y de este catálogo. Es una conversión WebP del PNG generado conservado en el espacio de trabajo, sin retoques creativos posteriores. La ilustración anterior permanece guardada y los CV descargables no se modificaron con este ajuste de presentación.
