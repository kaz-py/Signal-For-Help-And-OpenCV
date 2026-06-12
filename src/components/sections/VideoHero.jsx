import './VideoHero.css'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

const NAV_LINKS = [
  { label: 'Proyecto', href: '#proyecto' },
  { label: 'Ingeniería', href: '#ingenieria' },
  { label: 'Galería', href: '#galeria' },
  { label: 'UNAE', href: '#unae' },
]

/**
 * Hero de entrada con video fullscreen y navbar de píldoras flotante,
 * adaptado de la estética minimal clara al contenido del proyecto.
 */
export default function VideoHero() {
  return (
    <section id="inicio" className="vhero">
      <video
        className="vhero-video"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="vhero-fade" aria-hidden="true" />

      <header className="vhero-nav">
        <a href="#inicio" className="vhero-logo" aria-label="Ir al inicio">U</a>
        <nav className="vhero-pill" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a
            href="https://github.com/kaz-py/signal_for_help"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <div className="vhero-content">
        <a href="#unae" className="vhero-badge">
          1° Año · Ingeniería Informática y Ciencia de Datos · UNAE
          <span className="vhero-arrow" aria-hidden="true">→</span>
        </a>

        <h1 className="vhero-title">
          Reconocimiento Gestual con Visión por Computadoras para Detección de Signal for HELP
        </h1>

        <p className="vhero-sub">
          Un enfoque de ingeniería multiplataforma para el despliegue de sistemas inteligentes de
          alerta temprana ante situaciones de riesgo y violencia doméstica.
        </p>

        <div className="vhero-ctas">
          <a href="#galeria" className="vhero-cta">
            Ver el Proyecto en Acción
            <span className="vhero-arrow" aria-hidden="true">→</span>
          </a>
          <a href="#repositorios" className="vhero-link">
            Explorar Repositorios
            <span className="vhero-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
