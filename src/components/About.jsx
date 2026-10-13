import { about, profile } from '../content.js'
import Reveal from './Reveal.jsx'
import { GeometricBorder } from './Patterns.jsx'

// Wraps every occurrence of the owner's name in <strong>.
function withName(text) {
  return text.split(profile.name).flatMap((part, i, arr) =>
    i < arr.length - 1 ? [part, <strong key={i}>{profile.name}</strong>] : [part],
  )
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__photo" y={36}>
          <figure className="frame">
            <i className="frame__corner frame__corner--tl" />
            <i className="frame__corner frame__corner--tr" />
            <i className="frame__corner frame__corner--bl" />
            <i className="frame__corner frame__corner--br" />
            <img src={profile.photo} alt={profile.photoAlt} width="549" height="606" loading="lazy" />
          </figure>
          <GeometricBorder variant="herringbone" className="about__strip" />
        </Reveal>

        <div className="about__text">
          <Reveal as="h2" id="about-title" delay={0.05}>
            {about.heading}
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={0.12 + i * 0.1}>
              {i === 0 ? withName(p) : p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
