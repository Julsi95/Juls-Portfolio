import { motion } from 'motion/react'
import { GeometricBorder, Ornament } from './Patterns.jsx'

export const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SectionHeading({ id, title, intro }) {
  return (
    <Reveal className="section-heading">
      <GeometricBorder variant="diamond" className="section-heading__border" />
      <h2 id={id}>{title}</h2>
      <Ornament className="section-heading__ornament" />
      {intro ? <p className="section-heading__intro">{intro}</p> : null}
    </Reveal>
  )
}
