import { useEffect, useRef } from 'react'

/**
 * Ejecuta animaciones de anime.js sobre un contenedor referenciado.
 * - Se omite por completo si el usuario prefiere movimiento reducido
 *   (el contenido queda visible en su estado final).
 * - Las animaciones registradas con ctx.add() se revierten al desmontar.
 */
export default function useAnime(setup) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const registered = []
    const ctx = {
      add(animation) {
        registered.push(animation)
        return animation
      },
    }
    const extraCleanup = setup(el, ctx)

    return () => {
      registered.forEach((a) => a.revert?.())
      if (typeof extraCleanup === 'function') extraCleanup()
    }
    // setup se define inline en cada componente; solo debe correr al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
