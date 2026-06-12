# Signal for Help · UNAE

Sitio web del proyecto **Reconocimiento Gestual con Visión por Computadoras para Detección de Signal for Help** — estudiantes de 1.er año de Ingeniería Informática y Ciencia de Datos, Universidad Autónoma de Encarnación.

Construido con **React 18 + Vite**.

## Desarrollo

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo (http://localhost:5173)
npm run build   # build de producción en /dist
npm run preview # previsualizar el build
```

## Estructura

```
├── index.html                  # Entrada de Vite (fuentes, meta)
├── public/img/                 # Capturas reales del programa C++
└── src/
    ├── main.jsx                # Montaje de React
    ├── App.jsx                 # Composición de la página
    ├── styles/
    │   ├── tokens.css          # Tokens de diseño (colores, tipografía, espaciado, motion)
    │   └── global.css          # Reset, keyframes, utilidades, reduced-motion
    ├── hooks/
    │   └── useReveal.js        # Animación de entrada al hacer scroll (IntersectionObserver)
    ├── data/                   # Contenido separado de la presentación
    │   ├── gestures.js         # Estados de la seña, flujo de despliegue, pipeline
    │   ├── modules.js          # Tarjetas Python / C++
    │   ├── pillars.js          # Pilares de la investigación
    │   ├── gallery.js          # Capturas y repositorios
    │   └── demo.js             # Landmarks, poses y fases de la demo FSM
    └── components/
        ├── layout/             # Navbar, Footer
        ├── ui/                 # Reveal, HandIcon, GithubIcon
        ├── demo/               # FsmDemo (simulación animada del sistema)
        └── sections/           # Hero, Humanitarian, Engineering, Pillars, Gallery, Unae
```

## Repositorios del sistema

- C++ (motor de producción): [kaz-py/signal_for_help](https://github.com/kaz-py/signal_for_help)
- Python (ciencia de datos): [ivanf12300/SignalForHelpPython](https://github.com/ivanf12300/SignalForHelpPython)
