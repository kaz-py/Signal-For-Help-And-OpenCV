/** Los dos módulos de implementación (Python y C++). */
export const MODULES = [
  {
    file: 'SignalForHelpPython / main.py',
    kicker: 'MÓDULO PYTHON · CIENCIA DE DATOS',
    title: 'Prototipado rápido y experimentación ágil',
    paragraphs: [
      ['El módulo Python constituye el entorno de Ciencia de Datos del proyecto: un laboratorio de iteración veloz donde se realiza la experimentación ágil con los umbrales de detección y la ', { strong: 'calibración algebraica de las distancias euclidianas' }, ' entre landmarks, normalizadas respecto del tamaño aparente de la mano para lograr invarianza a la distancia de la cámara.'],
      ['Su ecosistema lo vuelve el candidato natural para entornos de ejecución en la nube, integración con dashboards analíticos y validación científica de hipótesis antes de su traslado al motor de producción.'],
    ],
    meta: [
      { key: 'Rol', val: 'Prototipado y calibración' },
      { key: 'Memoria', val: 'Runtime + garbage collector' },
      { key: 'Despliegue ideal', val: 'Nube · dashboards analíticos' },
    ],
  },
  {
    file: 'signal_for_help / main.cpp',
    kicker: 'MÓDULO C++ · RENDIMIENTO CRÍTICO',
    title: 'Motor de producción para el borde',
    paragraphs: [
      ['El módulo C++ es el motor de rendimiento crítico orientado a producción. Al eliminar el entorno de ejecución (runtime) y los recolectores de basura de Python, gestiona la memoria de manera nativa mediante ', { strong: 'punteros y estructuras de datos estructuradas' }, ', optimizando el uso de la CPU para alcanzar la máxima tasa de cuadros por segundo (FPS) con bajísima latencia.'],
      ['Esta característica lo convierte en el candidato idóneo para su portabilidad a hardware embebido y procesamiento en el borde (Edge Computing): cámaras inteligentes autónomas o microcontroladores avanzados como las placas Arduino de alta gama (Nicla Vision).'],
    ],
    meta: [
      { key: 'Rol', val: 'Producción · tiempo real' },
      { key: 'Memoria', val: 'Gestión nativa con punteros' },
      { key: 'Despliegue ideal', val: 'Edge · Arduino Nicla Vision' },
    ],
  },
]
