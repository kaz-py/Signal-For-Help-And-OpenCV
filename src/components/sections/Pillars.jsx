import Reveal from '../ui/Reveal.jsx'
import { PILLARS } from '../../data/pillars.js'
import './Pillars.css'

export default function Pillars() {
  return (
    <section id="investigacion" className="section section--alt">
      <div className="section-inner">
        <p className="sec-kicker">03 — Marco científico e investigación</p>
        <h2 className="sec-title" style={{ maxWidth: 640, marginBottom: 44 }}>
          Los cuatro pilares de la investigación
        </h2>
        <div className="pillars-grid">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.num} className="card pillar-card" delay={i * 80}>
              <p className="pillar-num" aria-hidden="true">{pillar.num}</p>
              <p className="pillar-kicker">{pillar.kicker}</p>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
