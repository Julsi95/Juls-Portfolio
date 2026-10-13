import { skills } from '../content.js'
import Reveal, { SectionHeading } from './Reveal.jsx'
import { GeometricBorder } from './Patterns.jsx'
import SkillsCarousel from './SkillsCarousel.jsx'

const carouselItems = skills.groups.flatMap((g) => g.items)

export default function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" title={skills.heading} intro={skills.intro} />
      </div>

      <Reveal>
        <SkillsCarousel items={carouselItems} />
      </Reveal>

      <div className="container">
        <div className="skills__grid">
          {skills.groups.map((g, i) => (
            <Reveal as="article" className="card skill" key={g.title} delay={i * 0.1}>
              <GeometricBorder variant="fern" className="card__rule" />
              <h3>{g.title}</h3>
              <p className="card__blurb">{g.blurb}</p>
              {g.items.length ? (
                <ul className="chips">
                  {g.items.map((it) => (
                    <li key={it.name}>{it.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="card__empty">To be added</p>
              )}
              {g.note ? <p className="card__note">{g.note}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
