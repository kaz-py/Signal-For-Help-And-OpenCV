import { useEffect } from 'react'

/**
 * Spotlight que sigue al cursor sobre los elementos con clase .spot
 * (efecto de tarjeta iluminada estilo uiverse). No renderiza nada.
 */
export default function CursorSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      const card = e.target.closest?.('.spot')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
