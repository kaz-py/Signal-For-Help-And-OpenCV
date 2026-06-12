/** Conexiones entre los 21 landmarks del modelo de mano de MediaPipe. */
export const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
]

/** Coordenadas [x, y] de los 21 landmarks para cada estado de la seña. */
export const HAND_POSES = [
  // Estado 1 · palma extendida
  [[100, 185], [75, 168], [58, 150], [45, 132], [35, 114], [78, 108], [74, 80], [72, 60], [70, 42], [98, 103], [97, 70], [96, 48], [95, 28], [118, 106], [121, 76], [123, 55], [125, 36], [136, 114], [142, 92], [146, 75], [149, 58]],
  // Estado 2 · oclusión del pulgar
  [[100, 185], [82, 166], [84, 148], [92, 140], [101, 134], [78, 108], [74, 80], [72, 60], [70, 42], [98, 103], [97, 70], [96, 48], [95, 28], [118, 106], [121, 76], [123, 55], [125, 36], [136, 114], [142, 92], [146, 75], [149, 58]],
  // Estado 3 · cierre perimetral
  [[100, 185], [82, 166], [84, 150], [92, 142], [100, 138], [78, 108], [73, 90], [75, 110], [79, 124], [98, 103], [95, 82], [96, 104], [97, 120], [118, 106], [120, 86], [119, 106], [118, 120], [136, 114], [139, 98], [136, 114], [134, 126]],
]

/** Texto y color del chip de estado por fase de la demo. */
export const PHASE_STATUS = [
  { text: 'ESTADO 1/3 · PALMA EXTENDIDA · conf 0.97', color: '#4ade80', border: 'rgba(74,222,128,.35)' },
  { text: 'ESTADO 2/3 · OCLUSIÓN DEL PULGAR · Δt 0.84 s', color: '#4ade80', border: 'rgba(74,222,128,.35)' },
  { text: 'ESTADO 3/3 · CIERRE PERIMETRAL · validando', color: '#fbbf24', border: 'rgba(251,191,36,.35)' },
  { text: 'SECUENCIA COMPLETA · ALERTA DESPACHADA', color: '#f87171', border: 'rgba(248,113,113,.35)' },
]

/** Estados de la máquina de estados finitos mostrados en el panel lateral. */
export const FSM_STATES = [
  { id: 'q1', name: 'Palma extendida', sub: 'Línea base de los 21 landmarks' },
  { id: 'q2', name: 'Oclusión del pulgar', sub: 'Distancia pulgar–centroide reducida' },
  { id: 'q3', name: 'Cierre perimetral', sub: 'Cuatro dedos sobre el pulgar' },
]

/** Líneas del log del centro de monitoreo; `phase` indica desde qué fase se muestran. */
export const LOG_LINES = [
  { phase: 1, text: '[12:04:31] CAM-09 :: estado_1 validado · palma extendida (conf. 0.97)' },
  { phase: 2, text: '[12:04:32] CAM-09 :: estado_2 validado · oclusión del pulgar (Δt 0.84 s)' },
  { phase: 3, text: '[12:04:33] CAM-09 :: SECUENCIA COMPLETA → alerta silenciosa despachada al centro de monitoreo', alert: true },
]

/** Duración de cada fase de la demo en milisegundos. */
export const PHASE_MS = 2400
