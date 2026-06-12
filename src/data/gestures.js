/** Los tres estados de la seña Signal for Help. `pose` indexa la variante del ícono de mano. */
export const GESTURES = [
  {
    pose: 'open',
    num: 'ESTADO 1 / 3',
    name: 'Palma extendida',
    desc: 'La mano se presenta con la palma extendida frente al sensor óptico, con los cinco dedos visibles y separados, estableciendo la línea base geométrica de los 21 puntos clave.',
  },
  {
    pose: 'thumbIn',
    num: 'ESTADO 2 / 3',
    name: 'Oclusión del pulgar',
    desc: 'El pulgar se flexiona hacia el centro de la palma. El sistema detecta la reducción de la distancia euclidiana entre la falange distal del pulgar y el centroide palmar.',
  },
  {
    pose: 'closed',
    num: 'ESTADO 3 / 3',
    name: 'Cierre perimetral',
    desc: 'Los cuatro dedos restantes se cierran sobre el pulgar, atrapándolo. Solo si los tres estados ocurren en este orden y dentro de la ventana temporal, la seña se valida.',
  },
]

/** Pasos del despliegue ciudadano (flujo cámara → alerta). */
export const FLOW_STEPS = [
  { label: 'PASO 1', text: 'Gesto ejecutado en la vía pública' },
  { label: 'PASO 2', text: 'Captura por cámara de vigilancia urbana' },
  { label: 'PASO 3', text: 'Procesamiento local del flujo de video' },
  { label: 'PASO 4', text: 'Validación secuencial y temporal (FSM)' },
  { label: 'PASO 5', text: 'Alerta silenciosa al centro de monitoreo', alert: true },
]

/** Pipeline de visión común a ambos repositorios. */
export const PIPELINE = [
  'Captura · OpenCV',
  '21 landmarks 3D · MediaPipe',
  'Distancias euclidianas',
  'Máquina de estados finitos',
]
