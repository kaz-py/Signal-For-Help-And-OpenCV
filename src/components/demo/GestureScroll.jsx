import { useRef } from 'react'
import { animate, onScroll } from 'animejs'
import useAnime from '../../hooks/useAnime.js'
import HandIcon from '../ui/HandIcon.jsx'
import { GESTURES } from '../../data/gestures.js'
import { HAND_CONNECTIONS, HAND_POSES } from '../../data/demo.js'
import './GestureScroll.css'

const lerp = (a, b, u) => a + (b - a) * u
const smooth = (u) => u * u * (3 - 2 * u)
const clamp01 = (u) => Math.min(Math.max(u, 0), 1)
const BOX_PAD = 16
const INITIAL = HAND_POSES[0]

/**
 * Scrollytelling de la seña: la sección queda fijada (sticky) y el esqueleto
 * de 21 landmarks se interpola entre los tres estados del gesto siguiendo el
 * progreso de scroll (anime.js onScroll con sync).
 */
export default function GestureScroll() {
  const linesRef = useRef([])
  const dotsRef = useRef([])
  const bboxRef = useRef(null)
  const labelRef = useRef(null)
  const barRef = useRef(null)
  const cardsRef = useRef([])

  // t ∈ [0, 2]: 0→1 interpola pose 1→2, 1→2 interpola pose 2→3
  const apply = (t) => {
    const seg = Math.min(Math.floor(t), 1)
    const u = smooth(clamp01(t - seg))
    const A = HAND_POSES[seg]
    const B = HAND_POSES[seg + 1]
    const pts = A.map((p, i) => [lerp(p[0], B[i][0], u), lerp(p[1], B[i][1], u)])

    HAND_CONNECTIONS.forEach(([a, b], i) => {
      const line = linesRef.current[i]
      if (!line) return
      line.setAttribute('x1', pts[a][0])
      line.setAttribute('y1', pts[a][1])
      line.setAttribute('x2', pts[b][0])
      line.setAttribute('y2', pts[b][1])
    })
    pts.forEach(([x, y], i) => {
      const dot = dotsRef.current[i]
      if (!dot) return
      dot.setAttribute('cx', x)
      dot.setAttribute('cy', y)
    })

    const xs = pts.map((p) => p[0])
    const ys = pts.map((p) => p[1])
    const bx = Math.min(...xs) - BOX_PAD
    const by = Math.min(...ys) - BOX_PAD
    if (bboxRef.current) {
      bboxRef.current.setAttribute('x', bx)
      bboxRef.current.setAttribute('y', by)
      bboxRef.current.setAttribute('width', Math.max(...xs) - bx + BOX_PAD)
      bboxRef.current.setAttribute('height', Math.max(...ys) - by + BOX_PAD)
    }

    const active = Math.min(Math.round(t), 2)
    cardsRef.current.forEach((card, i) => card && card.classList.toggle('is-active', i === active))
    if (labelRef.current) {
      labelRef.current.textContent = `ESTADO ${active + 1}/3 · ${GESTURES[active].name.toUpperCase()}`
    }
    if (barRef.current) barRef.current.style.width = `${(t / 2) * 100}%`
  }

  const wrapRef = useAnime((wrap, ctx) => {
    const state = { t: 0 }
    ctx.add(
      animate(state, {
        t: 2,
        ease: 'linear',
        duration: 1000,
        autoplay: onScroll({
          target: wrap,
          enter: 'top top',
          leave: 'bottom bottom',
          sync: true,
        }),
        onUpdate: () => apply(state.t),
      }),
    )
    apply(0)
  })

  return (
    <div className="gs-wrap" ref={wrapRef}>
      <div className="gs-sticky">
        <div className="gs-stage">
          <span className="gs-ping" aria-hidden="true" />
          <span className="gs-ping gs-ping--2" aria-hidden="true" />
          <span className="gs-corner gs-corner--tl" aria-hidden="true" />
          <span className="gs-corner gs-corner--tr" aria-hidden="true" />
          <span className="gs-corner gs-corner--bl" aria-hidden="true" />
          <span className="gs-corner gs-corner--br" aria-hidden="true" />

          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="gs-svg" aria-hidden="true">
            <defs>
              <linearGradient id="gsBone" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2ee6a8" />
                <stop offset="100%" stopColor="#6fa0f0" />
              </linearGradient>
            </defs>
            {HAND_CONNECTIONS.map(([a, b], i) => (
              <line
                key={`${a}-${b}`}
                ref={(el) => { linesRef.current[i] = el }}
                x1={INITIAL[a][0]} y1={INITIAL[a][1]}
                x2={INITIAL[b][0]} y2={INITIAL[b][1]}
                stroke="url(#gsBone)" strokeWidth="2.4" strokeLinecap="round"
              />
            ))}
            {INITIAL.map(([x, y], i) => (
              <circle
                key={i}
                ref={(el) => { dotsRef.current[i] = el }}
                cx={x} cy={y} r="3.4" fill="#ff5964"
              />
            ))}
            <rect
              ref={bboxRef}
              className="gs-bbox"
              x="19" y="12" width="146" height="189"
              rx="6" fill="none" stroke="#6fa0f0" strokeWidth="1.3" strokeDasharray="10 6"
            />
          </svg>

          <div className="gs-scanline" aria-hidden="true" />
          <span className="gs-label" ref={labelRef} role="status">
            ESTADO 1/3 · {GESTURES[0].name.toUpperCase()}
          </span>
          <span className="gs-hint" aria-hidden="true">SCROLL PARA EJECUTAR LA SEÑA ↓</span>
          <div className="gs-progress" ref={barRef} aria-hidden="true" />
        </div>

        <div className="gs-cards">
          {GESTURES.map((gesture, i) => (
            <article
              key={gesture.name}
              ref={(el) => { cardsRef.current[i] = el }}
              className={`gs-card spot ${i === 0 ? 'is-active' : ''}`}
            >
              <div className="gs-card-icon">
                <HandIcon pose={gesture.pose} />
              </div>
              <div>
                <p className="gesture-num">{gesture.num}</p>
                <h3 className="gesture-name">{gesture.name}</h3>
                <p className="gesture-desc">{gesture.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
