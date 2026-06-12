import { animate, stagger, onScroll } from 'animejs'

/** Anima kicker, título y lead de una sección cuando entran al viewport. */
export function revealHeader(root, ctx) {
  const parts = root.querySelectorAll('.sec-kicker, .sec-title, .sec-lead')
  if (!parts.length) return
  parts.forEach((p) => { p.style.opacity = '0' })
  ctx.add(
    animate(parts, {
      opacity: [0, 1],
      y: [30, 0],
      delay: stagger(110),
      duration: 700,
      ease: 'outExpo',
      autoplay: onScroll({ target: parts[0], enter: 'bottom-=40 top' }),
    }),
  )
}
