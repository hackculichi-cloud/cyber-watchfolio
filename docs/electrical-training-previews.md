# Centros de formación y vistas provisionales

La primera aplicación de los centros de formación corresponde a Electricidad. `trainingProviders.ts` centraliza nombres, enlaces y marcas; las tarjetas de conocimientos y los cursos reutilizan `TrainingProviderBadge`.

- Universidad Internacional: el titular confirmó el centro y proporcionó `https://www.facebook.com/uinternacionaloficial/?locale=es_LA`. Su formación se presenta como «Universidad Internacional · RED CONOCER». Se conserva el estado en curso: identificar el centro no confirma la finalización ni la emisión de un documento. Se usa un monograma tipográfico **UI**, no un supuesto logo oficial.
- Udemy: enlace a `https://www.udemy.com/`. La marca local procede de Simple Icons 11.15.0, `icons/udemy.svg`.
- LinkedIn Learning: enlace a `https://www.linkedin.com/learning/`. La marca local procede de Simple Icons 11.15.0, `icons/linkedin.svg`.

Los dos SVG se obtuvieron de `https://raw.githubusercontent.com/simple-icons/simple-icons/11.15.0/icons/`, bajo CC0. Son archivos locales de trazados, sin scripts ni solicitudes de imágenes a terceros. El monograma UI puede sustituirse cuando se facilite el logo autorizado del centro. Los enlaces externos abren otra pestaña con `noopener noreferrer`.

El directorio de centros usa ahora `TrainingProviderLogo`: marcas sueltas con luz suave dorada, violeta y azul, sin tarjetas, fondos ni marcos. Mantiene la formación principal separada de las plataformas complementarias y los tres enlaces existentes. El brillo es estático, con realce al pasar el puntero o enfocar; no hay animación continua ni nuevas descargas. Cada enlace conserva un nombre accesible que incluye el centro y su enfoque formativo. Las marcas tipográficas y los SVG se mantienen locales; UI sigue siendo un monograma, no un logo oficial obtenido del centro.

`electrical-certificate-paper.png` es un fondo ilustrado generado para esta interfaz: papel claro con borde técnico azul y dorado, sin texto, firmas, sellos ni logos. `CertificateMockup` añade el nombre del curso, centro y titular mediante texto de la aplicación, con marca visible **MOCKUP · Original pendiente**. No inventa fechas, identificadores ni acreditaciones. El estado real del curso sigue apareciendo junto al mockup. La ampliación utiliza el diálogo compartido y mantiene el cambio ES/EN; no ofrece el mockup como descarga de certificado.

Estas vistas se reemplazarán por los originales cuando el titular los aporte. El curso completado de LinkedIn Learning conserva ese estado; los cursos en progreso no se convierten en certificaciones completadas.
