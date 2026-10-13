import { motion } from 'motion/react'
import { projects } from '../content.js'
import { SectionHeading, EASE } from './Reveal.jsx'
import { GeometricBorder } from './Patterns.jsx'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}
const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" title={projects.heading} intro={projects.intro} />
        <motion.ul
          className="projects__grid"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        >
          {projects.items.map((p) => (
            <motion.li key={p.title} variants={card}>
              <motion.article
                className={`card project${p.placeholder ? ' project--placeholder' : ''}`}
                whileHover={p.placeholder ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <GeometricBorder variant="diamond" className="card__rule" />
                <span className="project__status">{p.status}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.tags.length ? (
                  <ul className="chips" aria-label="Technologies">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
                {p.links.length ? (
                  <div className="project__links">
                    {p.links.map((l) => (
                      <a key={l.href} className="btn btn--small" href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
