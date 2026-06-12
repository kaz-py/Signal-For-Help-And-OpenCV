import { useEffect, useRef, useState } from 'react'

/**
 * Devuelve [ref, visible]: visible pasa a true la primera vez que el
 * elemento entra al viewport. Si el usuario prefiere movimiento reducido,
 * el contenido se muestra de inmediato.
 */
export default function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
