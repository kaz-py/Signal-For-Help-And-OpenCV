import { animate, stagger, onScroll } from 'animejs'
import useAnime from '../../hooks/useAnime.js'
import { revealHeader } from '../../utils/animations.js'
import { PIPELINE } from '../../data/gestures.js'
import { MODULES } from '../../data/modules.js'
import './Engineering.css'

/** Renderiza párrafos definidos como arrays de strings y fragmentos { strong }. */
function RichParagraph({ parts }) {
  return (
    <p className="module-text">
      {parts.map((part, i) =>
        typeof part === 'string' ? part : <strong key={i}>{part.strong}</strong>,
      )}
    </p>
  )
}

/** Terminal: identifica el módulo de prototipado Python. */
function TerminalIcon() {
  return (
    <svg className="code-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

/** Chip: identifica el motor C++ orientado a hardware embebido. */
function ChipIcon() {
  return (
    <svg className="code-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="10" y="10" width="4" height="4" />
      <line x1="9" y1="2" x2="9" y2="6" /><line x1="15" y1="2" x2="15" y2="6" />
      <line x1="9" y1="18" x2="9" y2="22" /><line x1="15" y1="18" x2="15" y2="22" />
      <line x1="2" y1="9" x2="6" y2="9" /><line x1="2" y1="15" x2="6" y2="15" />
      <line x1="18" y1="9" x2="22" y2="9" /><line x1="18" y1="15" x2="22" y2="15" />
    </svg>
  )
}

const MODULE_ICONS = [TerminalIcon, ChipIcon]

export default function Engineering() {
  const rootRef = useAnime((root, ctx) => {
    revealHeader(root, ctx)

    // Pipeline: nodos en cascada cuando el bloque entra al viewport
    const pipeline = root.querySelector('.pipeline')
    const nodes = pipeline.querySelectorAll('.pipe-node, .pipe-node--end, .pipe-arrow')
    nodes.forEach((n) => { n.style.opacity = '0' })
    ctx.add(
      animate(nodes, {
        opacity: [0, 1],
        y: [16, 0],
        scale: [0.86, 1],
        delay: stagger(70),
        duration: 550,
        ease: 'outBack(1.4)',
        autoplay: onScroll({ target: pipeline, enter: 'bottom-=60 top' }),
      }),
    )

    // Módulos Python / C++: entran desde lados opuestos
    root.querySelectorAll('.module-card').forEach((card, i) => {
      card.style.opacity = '0'
      ctx.add(
        animate(card, {
          opacity: [0, 1],
          x: [i === 0 ? -64 : 64, 0],
          duration: 800,
          ease: 'outExpo',
          autoplay: onScroll({ target: card, enter: 'bottom-=80 top' }),
        }),
      )
      const rows = card.querySelectorAll('.meta-row')
      rows.forEach((r) => { r.style.opacity = '0' })
      ctx.add(
        animate(rows, {
          opacity: [0, 1],
          x: [i === 0 ? -18 : 18, 0],
          delay: stagger(110, { start: 250 }),
          duration: 500,
          ease: 'outQuad',
          autoplay: onScroll({ target: card, enter: 'bottom-=80 top' }),
        }),
      )
    })
  })

  return (
    <section id="ingenieria" className="section" ref={rootRef}>
      <div className="section-inner">
        <p className="sec-kicker">02 — Ingeniería de software multiplataforma</p>
        <h2 className="sec-title" style={{ maxWidth: 760 }}>
          Co-diseño Python vs. C++: dos repositorios, un mismo pipeline de visión
        </h2>
        <p className="sec-lead" style={{ marginBottom: 44 }}>
          El proyecto se materializa en dos repositorios de código independientes que comparten un núcleo algorítmico
          común: ambos sistemas implementan la captura del flujo de video mediante <strong>OpenCV</strong> y la
          extracción de <strong>21 puntos clave (landmarks) tridimensionales</strong> de la estructura ósea de la mano
          mediante <strong>MediaPipe</strong>. Sobre esa base compartida, cada implementación responde a un perfil de
          despliegue radicalmente distinto.
        </p>

        <div className="pipeline">
          <p className="pipeline-label">Pipeline de visión por computadora común</p>
          <div className="pipeline-steps">
            {PIPELINE.map((node) => (
              <span key={node} className="pipeline-fragment">
                <span className="pipe-node">{node}</span>
                <span className="pipe-arrow" aria-hidden="true">→</span>
              </span>
            ))}
            <span className="pipe-node pipe-node--end">ALERTA</span>
          </div>
        </div>

        <div className="module-grid">
          {MODULES.map((mod, i) => {
            const Icon = MODULE_ICONS[i]
            return (
              <article key={mod.file} className="module-card spot">
                <div className="code-header">
                  <span className="code-dot code-dot--r" aria-hidden="true" />
                  <span className="code-dot code-dot--y" aria-hidden="true" />
                  <span className="code-dot code-dot--g" aria-hidden="true" />
                  <span className="code-label">{mod.file}</span>
                  <Icon />
                </div>
                <div className="code-body">
                  <p className="module-kicker">{mod.kicker}</p>
                  <h3 className="module-title">{mod.title}</h3>
                  {mod.paragraphs.map((parts, j) => (
                    <RichParagraph key={j} parts={parts} />
                  ))}
                  <dl className="module-meta">
                    {mod.meta.map((row) => (
                      <div key={row.key} className="meta-row">
                        <dt className="meta-key">{row.key}</dt>
                        <dd className="meta-val">{row.val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
