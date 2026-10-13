import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { nav, profile } from '../content.js'
import { useActiveSection } from '../hooks.js'
import { LogoMark } from './Patterns.jsx'

function ThemeIcon({ theme }) {
  return theme === 'light' ? (
    // moon: shown in light mode, switches to dark
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export default function Nav({ theme, onToggleTheme }) {
  const ids = useMemo(() => nav.map((n) => n.id), [])
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#home" onClick={() => setOpen(false)}>
          <LogoMark />
          <span>{profile.shortName.toUpperCase()}</span>
        </a>

        <nav id="site-nav" className={`nav__links${open ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className="nav__indicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            type="button"
            className="icon-btn nav__menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
