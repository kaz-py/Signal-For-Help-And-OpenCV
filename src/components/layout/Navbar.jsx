import GithubIcon from '../ui/GithubIcon.jsx'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#proyecto', label: 'Proyecto' },
  { href: '#ingenieria', label: 'Ingeniería' },
  { href: '#investigacion', label: 'Investigación' },
  { href: '#galeria', label: 'Galería' },
  { href: '#unae', label: 'UNAE' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#inicio" className="nav-logo" aria-label="Ir al inicio">
          <span className="nav-logo-box">U</span>
          <span className="nav-title">UNAE · Ing. Informática y Ciencia de Datos</span>
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/kaz-py/signal_for_help"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn"
          >
            <GithubIcon className="nav-btn-icon" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
