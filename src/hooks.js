import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    const root = document.documentElement
    root.classList.add('theme-anim')
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage may be unavailable; the theme still switches */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'dark' ? '#503513' : '#FFF0DE')
    setTheme(next)
    window.setTimeout(() => root.classList.remove('theme-anim'), 700)
  }

  return [theme, toggle]
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
