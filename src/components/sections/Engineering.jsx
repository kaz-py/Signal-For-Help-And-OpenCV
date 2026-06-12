import Reveal from '../ui/Reveal.jsx'
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

export default function Engineering() {
  return (
    <section id="ingenieria" className="section">
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

        <Reveal className="pipeline">
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
        </Reveal>

        <div className="module-grid">
          {MODULES.map((mod, i) => (
            <Reveal key={mod.file} className="module-card" delay={i * 100}>
              <div className="code-header">
                <span className="code-dot code-dot--r" aria-hidden="true" />
                <span className="code-dot code-dot--y" aria-hidden="true" />
                <span className="code-dot code-dot--g" aria-hidden="true" />
                <span className="code-label">{mod.file}</span>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
