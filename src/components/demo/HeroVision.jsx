import { useEffect, useRef, useState } from 'react'
import { HAND_CONNECTIONS, HAND_POSES } from '../../data/demo.js'
import './HeroVision.css'

const CONFIDENCE = ['0.97', '0.95', '0.99']
const BOX_PAD = 16

/** Bounding box del conjunto de landmarks de una pose. */
function poseBox(pose) {
  const xs = pose.map((p) => p[0])
  const ys = pose.map((p) => p[1])
  const x = Math.min(...xs) - BOX_PAD
  const y = Math.min(...ys) - BOX_PAD
  return { x, y, w: Math.max(...xs) - x + BOX_PAD, h: Math.max(...ys) - y + BOX_PAD }
}

/**
 * Escena 3D de la entrada: un feed de cámara de visión artificial en
 * perspectiva que sigue al mouse, con el esqueleto de 21 landmarks,
 * bounding box de detección y HUD flotante en profundidad.
 */
export default function HeroVision() {
  const [phase, setPhase] = useState(0)
  const wrapRef = useRef(null)
  const sceneRef = useRef(null)
  const box = poseBox(HAND_POSES[phase])

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % HAND_POSES.length), 2200)
    return () => clearInterval(id)
  }, [])

  // Parallax 3D: la escena se inclina siguiendo el cursor
  useEffect(() => {
    const wrap = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      scene.style.transform = `rotateX(${13 - y * 11}deg) rotateY(${x * 13}deg)`
    }
    const reset = () => {
      scene.style.transform = ''
    }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', reset)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <div className="hv-wrap" ref={wrapRef} aria-hidden="true">
      <div className="hv-glow" />
      <div className="hv-scene" ref={sceneRef}>
        <div className="hv-feed">
          <span className="hv-corner hv-corner--tl" />
          <span className="hv-corner hv-corner--tr" />
          <span className="hv-corner hv-corner--bl" />
          <span className="hv-corner hv-corner--br" />

          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="hv-svg">
            <defs>
              <linearGradient id="hvBone" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2ee6a8" />
                <stop offset="100%" stopColor="#6fa0f0" />
              </linearGradient>
              <filter id="hvDotGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Poses con crossfade */}
            {HAND_POSES.map((pose, i) => (
              <g key={i} className="hv-pose" style={{ opacity: i === phase ? 1 : 0 }}>
                {HAND_CONNECTIONS.map(([a, b]) => (
                  <line
                    key={`${a}-${b}`}
                    x1={pose[a][0]} y1={pose[a][1]}
                    x2={pose[b][0]} y2={pose[b][1]}
                    stroke="url(#hvBone)" strokeWidth="2.2" strokeLinecap="round"
                  />
                ))}
                {pose.map(([x, y], j) => (
                  <circle key={j} cx={x} cy={y} r="3" fill="#ff5964" filter="url(#hvDotGlow)" />
                ))}
              </g>
            ))}

            {/* Bounding box de detección */}
            <rect
              className="hv-bbox"
              x={box.x} y={box.y} width={box.w} height={box.h}
              rx="6" fill="none" stroke="#6fa0f0" strokeWidth="1.4" strokeDasharray="10 6"
            />
            <text className="hv-bbox-label" x={box.x} y={box.y - 6}>
              HAND · {CONFIDENCE[phase]}
            </text>
          </svg>

          <div className="hv-scanline" />
          <div className="hv-vignette" />

          <span className="hv-hud hv-hud--rec">
            <span className="hv-rec-dot" /> REC
          </span>
          <span className="hv-hud hv-hud--cam">CAM-09 · 1080p</span>
          <span className="hv-hud hv-hud--fps">FPS 60.0 · LAT 4 ms</span>
          <span className="hv-hud hv-hud--track">TRACKING · {phase + 1}/3</span>
        </div>

        {/* Chips flotando en profundidad (translateZ) */}
        <span className="hv-chip hv-chip--mp">MEDIAPIPE · 21/21</span>
        <span className="hv-chip hv-chip--cv">OPENCV · EDGE</span>
        <span className="hv-chip hv-chip--conf">CONF {CONFIDENCE[phase]}</span>
      </div>
    </div>
  )
}
