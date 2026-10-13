import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { journey } from '../content.js'
import Reveal, { SectionHeading } from './Reveal.jsx'

export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="journey" className="section section--alt" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading id="journey-title" title={journey.heading} intro={journey.intro} />
        <ol className="timeline" ref={ref}>
          <span className="timeline__track" aria-hidden="true">
            <motion.span className="timeline__fill" style={{ scaleY: draw }} />
          </span>
          {journey.steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              className={`timeline__item ${i % 2 ? 'timeline__item--right' : ''}`}
              y={30}
            >
              <span className="timeline__dot" aria-hidden="true" />
              <div className="card timeline__card">
                <span className="timeline__label">{s.label}</span>
                <h3>{s.title}</h3>
                {s.place ? <p className="timeline__place">{s.place}</p> : null}
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
