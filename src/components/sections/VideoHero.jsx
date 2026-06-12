import { useEffect, useState } from 'react'
import { animate, stagger } from 'animejs'
import useAnime from '../../hooks/useAnime.js'
import './VideoHero.css'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

const TITLE =
  'Reconocimiento Gestual con Visión por Computadoras para Detección de Signal for HELP'

const NAV_LINKS = [
  { label: 'Proyecto', href: '#proyecto' },
  { label: 'Ingeniería', href: '#ingenieria' },
  { label: 'Galería', href: '#galeria' },
  { label: 'UNAE', href: '#unae' },
]

/**
 * Hero de entrada con video fullscreen, navbar de píldoras flotante y
 * título animado palabra por palabra con anime.js.
 */
export default function VideoHero() {
  // La barra cambia de tema según el fondo que tenga debajo:
  // clara sobre la zona luminosa del video, oscura sobre el resto de la página.
  const [navDark, setNavDark] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return
    let ticking = false

    const update = () => {
      ticking = false
      const rect = hero.getBoundingClientRect()
      const navY = 44 // centro vertical de la barra fija
      // Fracción del hero que queda bajo la barra (el degradado oscuro arranca ~62%)
      const frac = (navY - rect.top) / rect.height
      setNavDark(rect.bottom < navY + 20 || frac > 0.62)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const rootRef = useAnime((root, ctx) => {
    const words = root.querySelectorAll('.vhero-word')
    words.forEach((w) => { w.style.opacity = '0' })
    ctx.add(
      animate(words, {
        opacity: [0, 1],
        y: [26, 0],
        rotate: ['5deg', '0deg'],
        delay: stagger(42, { start: 350 }),
        duration: 750,
        ease: 'outExpo',
      }),
    )

    const blocks = root.querySelectorAll('.vhero-badge, .vhero-sub, .vhero-ctas')
    blocks.forEach((b) => { b.style.opacity = '0' })
    ctx.add(
      animate(blocks, {
        opacity: [0, 1],
        y: [18, 0],
        delay: stagger(140, { start: 900 }),
        duration: 650,
        ease: 'outQuad',
      }),
    )
  })

  return (
    <section id="inicio" className="vhero" ref={rootRef}>
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

      <header className={`vhero-nav ${navDark ? 'vhero-nav--dark' : ''}`}>
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

        <h1 className="vhero-title" aria-label={TITLE}>
          {TITLE.split(' ').map((word, i) => (
            <span className="vhero-word" key={i} aria-hidden="true">{word}</span>
          ))}
        </h1>

        <p className="vhero-sub">
          Un enfoque de ingeniería multiplataforma para el despliegue de sistemas inteligentes de
          alerta temprana ante situaciones de riesgo y violencia doméstica.
        </p>

        <div className="vhero-ctas">
          <a href="#galeria" className="vhero-cta btn-glow">
            Ver el Proyecto en Acción
            <span className="vhero-arrow" aria-hidden="true">→</span>
          </a>
          <a href="#repositorios" className="vhero-link">
            Explorar Repositorios
            <span className="vhero-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="vhero-mouse" aria-hidden="true" />
    </section>
  )
}
