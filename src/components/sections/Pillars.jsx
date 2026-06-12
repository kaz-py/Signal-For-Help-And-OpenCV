import { animate, stagger, onScroll } from 'animejs'
import useAnime from '../../hooks/useAnime.js'
import { revealHeader } from '../../utils/animations.js'
import { PILLARS } from '../../data/pillars.js'
import './Pillars.css'

export default function Pillars() {
  const rootRef = useAnime((root, ctx) => {
    revealHeader(root, ctx)
    const grid = root.querySelector('.pillars-grid')
    const cards = grid.querySelectorAll('.pillar-card')
    cards.forEach((c) => { c.style.opacity = '0' })
    ctx.add(
      animate(cards, {
        opacity: [0, 1],
        y: [48, 0],
        scale: [0.96, 1],
        delay: stagger(120),
        duration: 700,
        ease: 'outExpo',
        autoplay: onScroll({ target: grid, enter: 'bottom-=60 top' }),
      }),
    )

    // Los numerales romanos se estampan con un pop tardío
    const nums = grid.querySelectorAll('.pillar-num')
    ctx.add(
      animate(nums, {
        opacity: [0, 1],
        scale: [1.6, 1],
        delay: stagger(120, { start: 200 }),
        duration: 600,
        ease: 'outBack(1.6)',
        autoplay: onScroll({ target: grid, enter: 'bottom-=60 top' }),
      }),
    )
  })

  return (
    <section id="investigacion" className="section section--alt" ref={rootRef}>
      <div className="section-inner">
        <p className="sec-kicker">03 — Marco científico e investigación</p>
        <h2 className="sec-title" style={{ maxWidth: 640, marginBottom: 44 }}>
          Los cuatro pilares de la investigación
        </h2>
        <div className="pillars-grid">
          {PILLARS.map((pillar) => (
            <article key={pillar.num} className="card pillar-card spot">
              <p className="pillar-num" aria-hidden="true">{pillar.num}</p>
              <p className="pillar-kicker">{pillar.kicker}</p>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
