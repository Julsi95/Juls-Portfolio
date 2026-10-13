import { MotionConfig } from 'motion/react'
import { profile } from './content.js'
import { useTheme } from './hooks.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Journey from './components/Journey.jsx'
import Contact from './components/Contact.jsx'
import { GeometricBorder } from './components/Patterns.jsx'

export default function App() {
  const [theme, toggleTheme] = useTheme()

  return (
    // reducedMotion="user" makes Motion drop transform animations for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <footer className="footer">
          <GeometricBorder variant="fern" className="footer__border" />
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React and Motion.
          </p>
        </footer>
      </div>
    </MotionConfig>
  )
}
