import { useState } from 'react'
import SkillIcon from './SkillIcons.jsx'

// The list is repeated so a single half is always wider than the screen; the track
// scrolls exactly half its width, then loops without a visible jump.
const REPEAT = 4
const SECONDS_PER_ITEM = 2.6

export default function SkillsCarousel({ items }) {
  const [paused, setPaused] = useState(false)
  if (!items.length) return null

  const entries = Array.from({ length: REPEAT * 2 }, (_, r) =>
    items.map((it) => ({ ...it, key: `${r}-${it.name}`, hidden: r > 0 })),
  ).flat()
  const duration = `${Math.round(items.length * REPEAT * SECONDS_PER_ITEM)}s`

  return (
    <div className="marquee-wrap">
      <div className={`marquee${paused ? ' is-paused' : ''}`}>
        <ul className="marquee__track" aria-label="Skills I know" style={{ '--marquee-time': duration }}>
          {entries.map((it) => (
            <li className="marquee__item" key={it.key} aria-hidden={it.hidden ? 'true' : undefined}>
              <span className="marquee__badge">
                <SkillIcon name={it.icon} />
              </span>
              <span className="marquee__label">{it.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="btn btn--ghost btn--small marquee__toggle"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? 'Play carousel' : 'Pause carousel'}
      </button>
    </div>
  )
}
