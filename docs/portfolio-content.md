# Guía de contenido verificable

## Investigaciones SOC

Las tres investigaciones actuales se identifican como ejercicios educativos de LetsDefend, según confirmación del autor. Antes de añadir conclusiones o métricas, registrar:

1. Nombre e identificador reales del ejercicio y fechas correspondientes, distinguiendo fecha del evento y de realización.
2. Contexto: ejercicio educativo, laboratorio propio o caso real anonimizado.
3. Evidencia disponible y su procedencia: capturas autorizadas, extractos de logs, consultas ejecutadas y resultados.
4. Hechos observados, hipótesis, límites del análisis y criterio del veredicto.
5. Acciones realizadas en el ejercicio, acciones solicitadas y recomendaciones, en campos o descripciones inequívocos.
6. Criterios de escalamiento y la información que necesitaría Tier 2.

No presentar acciones sugeridas como intervenciones realizadas en una organización. No publicar datos personales, credenciales ni material restringido de la plataforma.

Pendiente de corroborar con las evidencias originales: indicadores sustituidos o anonimizados (por ejemplo, `203.0.113.44` es una IP de documentación), reputación, cantidades, fechas y alcance de las respuestas. No se han inventado fuentes ni se ha certificado la exactitud del relato existente. El mapeo VPN se limita a T1110 porque la descripción actual no demuestra password spraying.

El CV SOC requiere el documento real del autor. Mantenerlo como no disponible hasta incorporar un PDF revisado y, si corresponde, sus versiones de idioma.

## Formación eléctrica

Estados confirmados por el autor:

- LinkedIn Learning: Electrical Systems: Reading Drawings and Schematics, completado; certificado pendiente de incorporar.
- RED CONOCER: en curso. Sus módulos describen el plan de estudios, no competencias acreditadas ni módulos necesariamente terminados.
- Udemy: Instalaciones eléctricas básicas, en curso. Incorporar el plan real cuando se proporcione y el certificado después de completarlo.

No inventar fecha de emisión, identificador, URL de verificación, temario adicional ni equivalencia profesional.

## Proyectos y práctica futura START/STOP

Agregar o completar un `WorkItem` en `src/data/electricalProjects.ts`. `WorkCard`, `WorkDetail` y la galería compartida mantienen la presentación existente.

Campos disponibles:

- `title`, `summary`, `objective`, `category`, `status` y fecha real opcional.
- `components`: dispositivos utilizados con especificaciones verificadas.
- `tools`: herramientas efectivamente utilizadas.
- `procedure`: pasos realizados, en orden.
- `documentedSteps`: etapas realizadas o confirmadas, con descripción, fotos originales y video opcional; `confirmed` distingue una confirmación sin imagen.
- `protocol`: lista de referencia; no afirma que todos sus puntos se realizaron.
- `documentationNeeded`: fotos o datos por completar, indicando si pueden documentarse ahora, requieren un registro original o corresponden a una próxima sesión.
- `technicalExplanation`: explicación del montaje y del circuito.
- `did`, `learned`, `results`: acciones, aprendizajes y resultados observados.
- `cover`, `images`, `before`, `after`, `video`: evidencia propia, con textos alternativos y pies de foto.

La entrada de control con contactor y START/STOP permanece `Planned`. Después de realizarla, documentar el montaje real, esquema, tipo de pulsadores, contactos, tensión de control, pruebas y autorretención si aplica. No publicar resultados anticipados ni convertir esta guía en instrucciones de trabajo energizado. La realización debe ajustarse al entorno de formación y a las medidas de seguridad correspondientes.

Las fotografías del detalle se amplían y permiten navegación con flechas y cierre con Escape. Conservar los originales como evidencia; no alterar lo que muestran. Añadir traducciones para todas las descripciones, pasos, resultados, pies de foto y textos alternativos. Los botones START/STOP y referencias de componentes pueden conservar sus nombres técnicos.

Los cinco trabajos eléctricos realizados y las tres reparaciones de iPhone comparten `WorkProcess`. Los registros de etapas y pendientes se reúnen en `src/data/workProcesses.ts`, con fotos de su propio caso. START/STOP conserva estado planeado sin etapas realizadas; las reparaciones Samsung siguen planeadas. La lista práctica en español para aportar evidencia está en [work-process-evidence.md](work-process-evidence.md).
