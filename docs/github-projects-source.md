# Proyectos y formación de software

Revisión de repositorios públicos de `ByCulichi` el 21 de octubre de 2026. Las dos entradas principales son **Ronny’s Food Truck** y **Culichi**; las otras ocho se despliegan a petición. RonnysPage queda como versión anterior del mismo proyecto, enlazada en su detalle, sin contar dos veces la familia del food truck.

## Interfaces y alcance verificados

- [RonnysFoodTruck](https://github.com/ByCulichi/RonnysFoodTruck), revisión `4ed9f441abf50d98caeb24808baf64d603a69264`: Next.js, React, TypeScript y Tailwind. `app/`, `components/` y `lib/` contienen el menú de 28 productos, cuatro categorías, selección, visor del menú original, atuendos y controles de movimiento. Se compiló con Node 22 y se ejecutó localmente. Los accesos de contacto abren canales del negocio. No se presentan carrito, pagos, base de datos ni formulario de contacto activo. El handler de correo de `app/actions.tsx` existe en el código, pero la interfaz actual no lo expone; no se enviaron correos.
- [Cyber Watchfolio](https://github.com/hackculichi-cloud/cyber-watchfolio): React, TypeScript, Vite y Tailwind, seis perfiles, contenido bilingüe, evidencias locales, CV por área y componentes compartidos. Las capturas corresponden a la rama `codex/software-studio-projects` antes de su commit final.
- [Mirror](https://github.com/ByCulichi/Mirror): Next.js, React, TypeScript y Tailwind. Captura de `/home` usando los datos de demostración que incluye el repositorio; sin autenticar una cuenta ni afirmar reproducción real de Spotify.
- [Calculator-Culichi](https://github.com/ByCulichi/Calculator-Culichi): React, TypeScript, Vite y Vitest. La captura realiza `23 × 7` usando sus botones.
- [Todo-Culichi](https://github.com/ByCulichi/Todo-Culichi): tareas y almacenamiento local. Tres tareas de ejemplo se añadieron desde la UI; se marcó la primera como completada. El caché local sirve los archivos originales de Font Awesome 7.0.1 cuando el CDN está bloqueado, sin redibujar la aplicación.
- [WeatherApp-Culichi](https://github.com/ByCulichi/WeatherApp-Culichi): interfaz inicial de búsqueda OpenWeatherMap. No se añadieron respuestas meteorológicas ficticias ni credenciales.
- [Journey_blog](https://github.com/ByCulichi/Journey_blog): ejercicio de **HTML semántico**, sin atribuir CSS ni diseño responsivo que su fuente no contiene.
- [Portfolio-Culichi](https://github.com/ByCulichi/Portfolio-Culichi): versión anterior en HTML, CSS y JavaScript. Capturada después de cerrar su introducción automática.
- [Culichi-Metrics](https://github.com/ByCulichi/Culichi-Metrics): automatización Python/pandas/XlsxWriter para reportes Excel, formato condicional y gráficas. No tiene una interfaz web; se mantiene como tarjeta de automatización, sin inventar una pantalla ni atribuir resultados a empleadores.

## Capturas reproducibles

`scripts/capture-software-projects.mjs` guarda quince capturas reales de builds locales, con sus miniaturas WebP. `src/data/softwareCaptureManifest.json` registra las revisiones Git, repositorios, rutas, dimensiones, fecha y procedencia. Los externos usan SHA completo; el portafolio indica su rama de trabajo. No son capturas de despliegues remotos: el proxy del entorno bloqueó la visita a Vercel.

Para reproducirlas, clonar las revisiones del manifiesto en `SOFTWARE_SOURCE_ROOT` (por defecto `/tmp/culichi-software-projects`), instalar sus dependencias y ejecutar Ronny en 4300, Mirror en 4301, Calculator en 4302, los repositorios estáticos desde el directorio padre en 4303 y el portafolio en 8080 y World’s Finest Shows en 4304. Requiere Chromium, Python/Pillow y los paquetes Node del portafolio:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-software-projects.mjs
# Captura parcial:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-software-projects.mjs --only=ronnys-food-truck
```

Las tarjetas cargan miniaturas; las capturas completas se montan al abrir el detalle. La galería contiene las seis vistas de los dos proyectos principales y tres de World’s Finest Shows. No se incrustan páginas externas ni se ejecutan sus aplicaciones dentro del portafolio.

## Formación y CV

El titular confirmó que **todavía no aprobó AWS Cloud Practitioner**. Se conserva como preparación; Academlo sigue como estudios inconclusos. “Full Stack Developer” es el título solicitado para la sección; las bases de backend y la formación parcial mantienen su alcance explícito. No se agregan certificaciones ni empleos sin evidencia.

Los cuatro PDF actualizados de Software y General (ES/EN) priorizan Ronny y Culichi, manteniendo Metrics entre los adicionales. Los originales eléctricos permanecen intactos. El generador comprueba texto seleccionable, contenido, estados, separación del pie y todas las previsualizaciones de los documentos de varias páginas.

## World’s Finest Shows · 27 de octubre de 2026

Se agrega [hackculichi-cloud/worldfinestshows](https://github.com/hackculichi-cloud/worldfinestshows), revisión `e54d43db822cd58518f6805b3df2641967553490`. README, `src/main.tsx`, estilos y package.json confirman React 19, TypeScript, Vite y CSS, navegación adaptable, seis categorías de atracciones, filtros, búsqueda y ventanas con soporte de teclado/Escape. Se compiló el repositorio y se capturaron su inicio, atracciones y versión móvil ejecutados localmente. El manifiesto registra el propietario correcto, sin asumir que todos los repositorios pertenecen a ByCulichi.

El catálogo usa el nombre real **World’s Finest Shows**, el estado **Prototipo** y el enlace de demostración declarado por el repositorio: https://worldfinestshows.vercel.app. La marca y las fotografías de referencia conservan su atribución en `worldfinestshows/docs/REFERENCE.md`. Se presenta como proyecto de interfaz, sin inventar relación laboral con la empresa, venta de entradas, cobros, calendario en vivo ni envío de correos. La suscripción tiene respuesta local de demostración.

El catálogo reúne diez familias de proyectos. Ronny y Culichi conservan los dos lugares iniciales; World’s Finest Shows aparece tercero al desplegar la colección. El contador deriva de los datos. Los CV de Software y General ES/EN lo incluyen entre sus proyectos destacados con acciones verificables y enlace al código. Software actualiza su resumen e indicador a diez proyectos.
