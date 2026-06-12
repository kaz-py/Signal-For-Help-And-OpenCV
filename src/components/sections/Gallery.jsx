import { animate, stagger, onScroll } from 'animejs'
import useAnime from '../../hooks/useAnime.js'
import { revealHeader } from '../../utils/animations.js'
import GithubIcon from '../ui/GithubIcon.jsx'
import FsmDemo from '../demo/FsmDemo.jsx'
import { SHOTS, REPOS } from '../../data/gallery.js'
import './Gallery.css'

export default function Gallery() {
  const rootRef = useAnime((root, ctx) => {
    revealHeader(root, ctx)

    // El monitor completo emerge con un zoom suave
    const monitor = root.querySelector('.monitor-box')
    monitor.style.opacity = '0'
    ctx.add(
      animate(monitor, {
        opacity: [0, 1],
        y: [56, 0],
        scale: [0.965, 1],
        duration: 900,
        ease: 'outExpo',
        autoplay: onScroll({ target: monitor, enter: 'bottom-=60 top' }),
      }),
    )

    // Capturas reales en cascada
    const shotsGrid = root.querySelector('.shots-grid')
    const shots = shotsGrid.querySelectorAll('.shot-wrap')
    shots.forEach((s) => { s.style.opacity = '0' })
    ctx.add(
      animate(shots, {
        opacity: [0, 1],
        y: [32, 0],
        scale: [0.94, 1],
        delay: stagger(100),
        duration: 600,
        ease: 'outBack(1.2)',
        autoplay: onScroll({ target: shotsGrid, enter: 'bottom-=40 top' }),
      }),
    )

    // Repositorios desde lados opuestos
    root.querySelectorAll('.repo-card').forEach((card, i) => {
      card.style.opacity = '0'
      ctx.add(
        animate(card, {
          opacity: [0, 1],
          x: [i === 0 ? -48 : 48, 0],
          duration: 700,
          ease: 'outExpo',
          autoplay: onScroll({ target: card, enter: 'bottom-=60 top' }),
        }),
      )
    })
  })

  return (
    <section id="galeria" className="section" ref={rootRef}>
      <div className="section-inner">
        <p className="sec-kicker">04 — Galería de implementación</p>
        <h2 className="sec-title" style={{ maxWidth: 700 }}>
          El sistema en ejecución: del esqueleto de la mano a la alerta
        </h2>
        <p className="sec-lead" style={{ marginBottom: 40 }}>
          Demostración animada del funcionamiento del sistema —sin reconocimiento en tiempo real desde esta página—:
          la simulación reproduce el esqueleto de 21 landmarks de MediaPipe atravesando los tres estados de la seña,
          la validación de la máquina de estados finitos y el disparo de la alerta silenciosa.
        </p>

        <div className="monitor-box">
          <div className="monitor-bar">
            <div className="monitor-left">
              <span className="monitor-dot" aria-hidden="true" />
              <span className="monitor-title">CENTRO DE MONITOREO URBANO · ENCARNACIÓN</span>
            </div>
            <span className="monitor-right">
              <span className="radar" aria-hidden="true" />
              FEED EN VIVO · OPENCV + MEDIAPIPE
            </span>
          </div>

          <FsmDemo />

          <div className="shots-label">
            <p>Capturas reales del programa C++</p>
          </div>
          <div className="shots-grid">
            {SHOTS.map((shot) => (
              <figure key={shot.src} className={`shot-wrap ${shot.alert ? 'shot-wrap--alert' : ''}`}>
                <img src={shot.src} alt={shot.alt} loading="lazy" width="640" height="240" />
                <figcaption className="shot-chip">{shot.chip}</figcaption>
                {shot.alert ? (
                  <span className="shot-alert">
                    <span className="shot-alert-dot" aria-hidden="true" />
                    SIGNAL FOR HELP DETECTED
                  </span>
                ) : (
                  <span
                    className="shot-status"
                    style={{ color: shot.status.color, borderColor: shot.status.border }}
                  >
                    {shot.status.text}
                  </span>
                )}
              </figure>
            ))}
          </div>
        </div>

        <div className="repo-grid" id="repositorios">
          {REPOS.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card spot"
            >
              <GithubIcon className="repo-icon" />
              <div>
                <p className="repo-kicker">{repo.kicker}</p>
                <p className="repo-name">{repo.name}</p>
                <p className="repo-sub">{repo.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
