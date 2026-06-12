import HeroVision from '../demo/HeroVision.jsx'
import './Hero.css'

const TECH_CHIPS = ['OpenCV', 'MediaPipe · 21 landmarks', 'Python 3', 'C++ nativo', 'Edge Computing']

export default function Hero() {
  return (
    <section id="inicio" className="hero grid-bg noise">
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-pill">
          <span className="hero-pill-dot" aria-hidden="true" />
          <span className="hero-pill-text">1° Año · Ingeniería Informática y Ciencia de Datos · UNAE</span>
        </div>
        <h1 className="hero-title">
          Reconocimiento Gestual con Visión por Computadoras para Detección de Signal for HELP
        </h1>
        <p className="hero-sub">
          Un enfoque de ingeniería multiplataforma para el despliegue de sistemas inteligentes de alerta temprana
          ante situaciones de riesgo y violencia doméstica.
        </p>
        <div className="hero-btns">
          <a href="#galeria" className="hero-btn hero-btn--main">Ver el Proyecto en Acción</a>
          <a href="#repositorios" className="hero-btn hero-btn--sec">Explorar Repositorios</a>
        </div>
        <ul className="hero-chips" aria-label="Tecnologías del proyecto">
          {TECH_CHIPS.map((chip) => (
            <li key={chip} className="chip">{chip}</li>
          ))}
        </ul>
        <HeroVision />
      </div>
    </section>
  )
}
