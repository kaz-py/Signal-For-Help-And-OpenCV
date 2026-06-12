import { useEffect, useState } from 'react'
import {
  HAND_CONNECTIONS,
  HAND_POSES,
  PHASE_STATUS,
  FSM_STATES,
  LOG_LINES,
  PHASE_MS,
} from '../../data/demo.js'
import './FsmDemo.css'

/** Esqueleto de 21 landmarks para una pose dada. */
function HandSkeleton({ pose, visible }) {
  return (
    <g className="skeleton-pose" style={{ opacity: visible ? 1 : 0 }}>
      {HAND_CONNECTIONS.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={pose[a][0]} y1={pose[a][1]}
          x2={pose[b][0]} y2={pose[b][1]}
          stroke="#2ee6a8" strokeWidth="2.4" strokeLinecap="round"
        />
      ))}
      {pose.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill="#ff5964" />
      ))}
    </g>
  )
}

/** Fila de la máquina de estados: pendiente, activa, completada o alerta. */
function FsmRow({ id, name, sub, state }) {
  return (
    <div className={`fsm-row ${state ? `fsm-row--${state}` : ''}`}>
      <span className={`fsm-icon ${state ? `fsm-icon--${state}` : ''}`} aria-hidden="true">
        {state === 'done' ? '✓' : id}
      </span>
      <div>
        <p className="fsm-name">{name}</p>
        <p className={`fsm-sub ${state === 'alert' ? 'fsm-sub--alert' : ''}`}>{sub}</p>
      </div>
    </div>
  )
}

/**
 * Simulación del sistema en ejecución: el esqueleto de MediaPipe atraviesa
 * los tres estados de la seña y dispara la alerta (fase 3).
 */
export default function FsmDemo() {
  const [phase, setPhase] = useState(0)
  const alertPhase = phase === 3
  const status = PHASE_STATUS[phase]

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 4), PHASE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div className="demo-row">
        <div className={`demo-panel ${alertPhase ? 'demo-panel--alert' : ''}`}>
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="demo-svg" aria-hidden="true">
            {HAND_POSES.map((pose, i) => (
              <HandSkeleton key={i} pose={pose} visible={i === Math.min(phase, 2)} />
            ))}
          </svg>
          <div className="demo-scanline" aria-hidden="true" />
          <span className="demo-chip demo-chip--tl">CAM-09 · DEMO SIMULADA</span>
          <span className="demo-chip demo-chip--tr">FPS 60.0 · LAT 4 ms</span>
          <span
            className="demo-chip demo-chip--status"
            style={{ color: status.color, borderColor: status.border }}
            role="status"
          >
            {status.text}
          </span>
          {alertPhase && (
            <div className="demo-alert-overlay">
              <div className="demo-alert-box">
                <span className="demo-alert-dot" aria-hidden="true" />
                SIGNAL FOR HELP DETECTED
              </div>
            </div>
          )}
          <div
            className="demo-progress"
            style={{ width: `${(phase + 1) * 25}%`, background: alertPhase ? 'var(--danger)' : 'var(--success)' }}
          />
        </div>

        <div className="fsm-panel">
          <p className="fsm-label">Máquina de estados finitos · validación</p>
          {FSM_STATES.map((fsmState, i) => (
            <FsmRow
              key={fsmState.id}
              {...fsmState}
              state={phase > i ? 'done' : phase === i ? 'active' : null}
            />
          ))}
          <FsmRow
            id="!"
            name="Alerta silenciosa"
            sub={alertPhase ? 'DESPACHADA AL CENTRO DE MONITOREO' : 'En espera de secuencia válida'}
            state={alertPhase ? 'alert' : null}
          />
        </div>
      </div>

      <div className="demo-log">
        {LOG_LINES.map((line) => (
          <p
            key={line.text}
            className={`log-line ${line.alert ? 'log-line--alert' : ''} ${phase >= line.phase ? 'log-line--on' : ''}`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </>
  )
}
