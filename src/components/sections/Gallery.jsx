import Reveal from '../ui/Reveal.jsx'
import GithubIcon from '../ui/GithubIcon.jsx'
import FsmDemo from '../demo/FsmDemo.jsx'
import { SHOTS, REPOS } from '../../data/gallery.js'
import './Gallery.css'

export default function Gallery() {
  return (
    <section id="galeria" className="section">
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
            <span className="monitor-right">FEED EN VIVO · OPENCV + MEDIAPIPE</span>
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
          {REPOS.map((repo, i) => (
            <Reveal
              key={repo.href}
              as="a"
              delay={i * 100}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <GithubIcon className="repo-icon" />
              <div>
                <p className="repo-kicker">{repo.kicker}</p>
                <p className="repo-name">{repo.name}</p>
                <p className="repo-sub">{repo.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
