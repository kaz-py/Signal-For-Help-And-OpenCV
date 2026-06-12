import './HandIcon.css'

const STROKE = { fill: '#fff', stroke: 'var(--ink)', strokeWidth: 3 }
const PALM = { fill: '#eaf0f8', stroke: 'var(--ink)', strokeWidth: 3 }

/** Ícono ilustrativo de la mano en cada estado de la seña: open | thumbIn | closed. */
export default function HandIcon({ pose }) {
  return (
    <svg className="hand-icon" viewBox="0 0 140 140" aria-hidden="true">
      {pose === 'closed' ? (
        <>
          <rect x="42" y="56" width="56" height="56" rx="18" {...PALM} />
          <rect x="45" y="44" width="11" height="22" rx="5.5" {...STROKE} />
          <rect x="58" y="42" width="11" height="22" rx="5.5" {...STROKE} />
          <rect x="71" y="43" width="11" height="22" rx="5.5" {...STROKE} />
          <rect x="84" y="46" width="11" height="22" rx="5.5" {...STROKE} />
          <rect x="53" y="84" width="34" height="11" rx="5.5" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="5 5" />
        </>
      ) : (
        <>
          <rect x="45" y="70" width="50" height="42" rx="14" {...PALM} />
          <rect x="46" y="24" width="10" height="52" rx="5" {...STROKE} />
          <rect x="59" y="14" width="10" height="62" rx="5" {...STROKE} />
          <rect x="72" y="19" width="10" height="57" rx="5" {...STROKE} />
          <rect x="85" y="32" width="10" height="44" rx="5" {...STROKE} />
          {pose === 'thumbIn' ? (
            <rect x="50" y="83" width="38" height="11" rx="5.5" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" />
          ) : (
            <rect x="14" y="76" width="32" height="11" rx="5.5" transform="rotate(-138 30 81)" {...STROKE} />
          )}
        </>
      )}
    </svg>
  )
}
