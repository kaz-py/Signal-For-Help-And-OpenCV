import './Marquee.css'

/**
 * Cinta infinita estilo animejs.com: banda navy levemente inclinada con
 * keywords del proyecto desfilando en loop continuo.
 */
export default function Marquee({ items, reverse = false }) {
  const group = (
    <div className="marquee-group">
      {items.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <span className="marquee-star" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee-zone" aria-hidden="true">
      <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
        <div className="marquee-track">
          {group}
          {group}
        </div>
      </div>
    </div>
  )
}
