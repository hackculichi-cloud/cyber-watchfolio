# Navegación por especialidades y Home circular

El Home organiza los cinco perfiles existentes alrededor del logo local de Culichi. Cada tarjeta del Home se convierte en una burbuja circular con su imagen e icono originales. Al pasar el cursor, enfocar o tocar una burbuja aparece una vista previa flotante con la tarjeta existente del perfil, sus habilidades y enlaces a especialidades. No hay una tarjeta rectangular permanentemente fija al lado de la órbita. En dispositivos táctiles se selecciona tocando el icono y la distribución permanece quieta.

La rotación de escritorio es CSS, mantiene los iconos y textos orientados, se pausa al interactuar y dispone de control explícito de pausa/reanudación. La preferencia de movimiento reducido desactiva la animación y conserva la distribución circular.

La cabecera conserva un icono de Lucide propio para cada perfil y enlaces de texto para otros destinos. Los menús de escritorio funcionan con hover, botón, teclado y Escape. Los menús móviles se despliegan por grupos, admiten desplazamiento vertical y se cierran al navegar, incluidos enlaces a otra sección de la misma página.

## Estados confirmados por el autor

- Electricidad residencial, industrial y electrónica básica: estudiando.
- Audio y radio, televisión y sistemas digitales: formación futura, marcada como planeada.
- Diplomado de Linux: en curso.
- SQL y Cisco: formación futura, sin afirmar certificaciones ni cursos completados.

Las especialidades se definen en `src/data/specialties.ts` y generan enlaces de menú y apartados con IDs reales. No sustituyen ni eliminan proyectos, fotografías, cursos previos, investigaciones o playbooks. Las categorías futuras no contienen experiencia o proyectos inventados.

No se añaden dependencias ni archivos gráficos externos. Se reutilizan los componentes Radix, los colores por perfil, las imágenes locales existentes y la tarjeta de perfil compartida. Los textos nuevos tienen entradas ES/EN.

## Validación

Se añaden seis escenarios de navegador a los nueve anteriores: menús de escritorio, teclado/Escape e idioma, previews y pausa, movimiento reducido, interacción táctil móvil y estados Linux/SQL/Cisco. La ejecución final y sus resultados se consignan en el PR. La auditoría de dependencias conserva sus pendientes CSS; esta modificación no actualiza paquetes.
