import { contact } from '../content.js'
import Reveal, { SectionHeading } from './Reveal.jsx'
import Sun from './Sun.jsx'

export default function Contact() {
  const hasAny = Boolean(contact.email) || contact.links.length > 0
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <Sun className="contact__sun" speed={-0.06} drift={0.03} idle={600} />
      <div className="container contact__inner">
        <SectionHeading id="contact-title" title={contact.heading} intro={contact.intro} />
        <Reveal className="contact__actions" delay={0.1}>
          {contact.email ? (
            <a className="btn" href={`mailto:${contact.email}`}>
              Email me
              <span className="sr-only"> at {contact.email}</span>
            </a>
          ) : null}
          {contact.links.map((l) => (
            <a key={l.href} className="btn btn--ghost" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          {!hasAny ? <p className="contact__empty">{contact.emptyNote}</p> : null}
        </Reveal>
      </div>
    </section>
  )
}
