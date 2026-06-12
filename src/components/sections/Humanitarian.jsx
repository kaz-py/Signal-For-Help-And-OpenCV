import Reveal from '../ui/Reveal.jsx'
import HandIcon from '../ui/HandIcon.jsx'
import { GESTURES, FLOW_STEPS } from '../../data/gestures.js'
import './Humanitarian.css'

export default function Humanitarian() {
  return (
    <section id="proyecto" className="section section--alt">
      <div className="section-inner">
        <p className="sec-kicker">01 — Abordaje humanitario</p>
        <h2 className="sec-title" style={{ maxWidth: 720 }}>
          Una seña silenciosa convertida en infraestructura de protección urbana
        </h2>

        <div className="huma-intro">
          <p className="sec-lead">
            La <strong>Signal for Help</strong> fue diseñada en 2020 por la <strong>Canadian Women's Foundation</strong>{' '}
            como una herramienta de comunicación no verbal y deliberadamente silenciosa: un gesto unimanual que una
            persona en situación de riesgo podía ejecutar durante una videollamada, en pleno confinamiento por la
            pandemia, para solicitar auxilio sin emitir sonido alguno y sin dejar rastro digital que pudiera ser
            interceptado por su agresor.
          </p>
          <p className="sec-lead">
            Su valor reside en su naturaleza secuencial: no es una postura estática, sino una transición biomecánica
            ordenada de la mano que difícilmente ocurre de forma accidental. Esa propiedad la convierte en un candidato
            ideal para la verificación algorítmica mediante visión por computadoras, donde la temporalidad y el orden
            de los estados pueden validarse con una máquina de estados finitos.
          </p>
        </div>

        <div className="gesture-grid">
          {GESTURES.map((gesture, i) => (
            <Reveal key={gesture.name} className="card" delay={i * 90}>
              <HandIcon pose={gesture.pose} />
              <p className="gesture-num">{gesture.num}</p>
              <h3 className="gesture-name">{gesture.name}</h3>
              <p className="gesture-desc">{gesture.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="deploy-box">
          <p className="deploy-kicker">Propuesta innovadora de despliegue ciudadano</p>
          <h3 className="deploy-title">Más allá de la videollamada: integración en la red de videovigilancia urbana</h3>
          <p className="deploy-text">
            Este proyecto trasciende el contexto original de la seña. La propuesta técnica consiste en integrar el
            software directamente en las redes de cámaras de seguridad pública y monitoreo urbano de la ciudad. Cuando
            un ciudadano en situación de peligro ejecuta el gesto en la vía pública frente a una cámara de vigilancia,
            el sistema procesa el flujo de video <strong>localmente</strong> mediante visión artificial, detecta la
            secuencia en tiempo real y dispara una <strong>alerta silenciosa automatizada</strong> hacia el centro de
            monitoreo de las fuerzas del orden.
          </p>
          <p className="deploy-text">
            Este paradigma optimiza la prevención del delito y la protección de la integridad física sin escalar el
            riesgo frente al agresor: no exige que la víctima manipule un dispositivo, no emite sonido y no revela que
            la solicitud de auxilio fue realizada.
          </p>
          <div className="flow-steps">
            {FLOW_STEPS.map((step, i) => (
              <span key={step.label} className="flow-fragment">
                {i > 0 && <span className="flow-arrow" aria-hidden="true">→</span>}
                <span className={`flow-step ${step.alert ? 'flow-step--alert' : ''}`} style={{ animationDelay: `${i * 1.6}s` }}>
                  <span className={`flow-step-label ${step.alert ? 'flow-step-label--alert' : ''}`}>{step.label}</span>
                  <span className="flow-step-text">{step.text}</span>
                </span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
