import { motion } from 'motion/react'
import { hero } from '../content.js'
import Sun from './Sun.jsx'
import { EASE } from './Reveal.jsx'
import { GeometricBorder, Ornament, Particles, WovenStrip } from './Patterns.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Particles />
      <Sun className="hero__sun" />

      <motion.div className="hero__copy" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <GeometricBorder variant="diamond" className="hero__border" />
        </motion.div>
        <motion.h1 id="hero-title" variants={item}>
          {hero.title}
        </motion.h1>
        <motion.div variants={item}>
          <Ornament className="hero__ornament" />
        </motion.div>
        <motion.p className="hero__subtitle" variants={item}>
          {hero.subtitle}
        </motion.p>
        <motion.div variants={item}>
          <GeometricBorder variant="diamond" className="hero__border" />
        </motion.div>
        <motion.div className="hero__cta" variants={item}>
          <a className="btn" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn--ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </motion.div>

      <WovenStrip className="hero__weave" />
    </section>
  )
}
