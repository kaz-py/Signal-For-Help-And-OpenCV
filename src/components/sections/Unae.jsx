import { animate, stagger, onScroll } from 'animejs'
import useAnime from '../../hooks/useAnime.js'
import Footer from '../layout/Footer.jsx'
import './Unae.css'

export default function Unae() {
  const rootRef = useAnime((root, ctx) => {
    const inner = root.querySelector('.unae-inner')
    const blocks = inner.querySelectorAll('.unae-kicker, .unae-title, .unae-text, .unae-btns')
    blocks.forEach((b) => { b.style.opacity = '0' })
    ctx.add(
      animate(blocks, {
        opacity: [0, 1],
        y: [36, 0],
        delay: stagger(130),
        duration: 750,
        ease: 'outExpo',
        autoplay: onScroll({ target: inner, enter: 'bottom-=80 top' }),
      }),
    )
  })

  return (
    <section id="unae" className="unae-section grid-bg noise" ref={rootRef}>
      <div className="unae-glow" aria-hidden="true" />
      <div className="unae-inner">
        <p className="unae-kicker">05 — Sección insignia</p>
        <h2 className="unae-title">Orgullo Ingeniería UNAE: Ingeniería Informática y Ciencia de Datos</h2>
        <p className="unae-text">
          Esta carrera, de naturaleza disruptiva y pionera en la región, fusiona la rigurosidad de la ingeniería de
          software clásica —arquitectura, eficiencia algorítmica, gestión nativa de recursos— con la potencia analítica
          de la Inteligencia Artificial y la Ciencia de Datos. No se trata de dos disciplinas yuxtapuestas, sino de un
          perfil profesional integrado, capaz de concebir un sistema desde la formulación matemática hasta su despliegue
          en hardware de producción.
        </p>
        <p className="unae-text">
          Este proyecto es la demostración tangible de esa visión: estudiantes de <strong>primer año</strong> ya están
          capacitados para proponer e implementar soluciones tecnológicas de alta complejidad —visión por computadoras,
          sistemas multiplataforma, cumplimiento normativo internacional— con impacto directo en la seguridad ciudadana
          y el bienestar social de Encarnación.
        </p>
        <div className="unae-btns">
          <a href="#proyecto" className="unae-btn unae-btn--main btn-glow">Conocer el proyecto</a>
          <a
            href="https://github.com/kaz-py/signal_for_help"
            target="_blank"
            rel="noopener noreferrer"
            className="unae-btn unae-btn--sec"
          >
            Repositorios en GitHub
          </a>
        </div>
      </div>
      <Footer />
    </section>
  )
}
