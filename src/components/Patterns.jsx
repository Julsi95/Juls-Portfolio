import { useId, useMemo } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const clean = (id) => id.replace(/:/g, '')

function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* ── Geometric horizontal borders ─────────────────────────── */
const BORDERS = {
  // Nested diamonds joined by a thin line (the cream-theme top and bottom rules).
  diamond: {
    w: 36,
    h: 26,
    draw: (
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M18 2L32 13L18 24L4 13Z" />
        <path d="M18 7.5L26 13L18 18.5L10 13Z" />
        <path d="M18 11L21 13L18 15L15 13Z" fill="currentColor" />
        <path d="M32 13H36M0 13H4M18 0V2M18 24V26" />
      </g>
    ),
  },
  // Stems with leaf strokes (the dark-theme rule).
  fern: {
    w: 22,
    h: 26,
    draw: (
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M11 2V24" />
        <path d="M11 8L5 3M11 8L17 3M11 13L4 8M11 13L18 8M11 18L3 13M11 18L19 13" />
      </g>
    ),
  },
  // Stacked chevrons, a woven edge for photo frames.
  herringbone: {
    w: 14,
    h: 16,
    draw: (
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 3L7 8L14 3M0 9L7 14L14 9" />
        <path d="M7 0V16" opacity="0.5" />
      </g>
    ),
  },
}

export function GeometricBorder({ variant = 'diamond', className = '' }) {
  const id = 'gb' + clean(useId())
  const v = BORDERS[variant]
  return (
    <svg
      className={`gborder gborder--${variant} ${className}`}
      width="100%"
      height={v.h}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={id} width={v.w} height={v.h} patternUnits="userSpaceOnUse">
          {v.draw}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/* ── Woven-pattern divider (chevron banner) ───────────────── */
export function WovenStrip({ className = '' }) {
  const id = 'wv' + clean(useId())
  // Fine dithering squares give the strip its woven, pixelated texture.
  const specks = useMemo(() => {
    const rand = seeded(77)
    return Array.from({ length: 70 }, () => ({
      x: +(rand() * 46).toFixed(1),
      y: +(rand() * 62).toFixed(1),
      s: rand() > 0.6 ? 3 : 2,
      o: +(0.25 + rand() * 0.45).toFixed(2),
    }))
  }, [])

  return (
    <motion.div
      className={`weave ${className}`}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <svg width="100%" height="64" focusable="false">
        <defs>
          <pattern id={id} width="48" height="64" patternUnits="userSpaceOnUse">
            <rect width="48" height="64" className="weave__bg" />
            <g fill="none" strokeLinejoin="miter">
              <path d="M0 8L24 32L48 8" className="weave__band" strokeWidth="9" />
              <path d="M0 40L24 64L48 40" className="weave__band" strokeWidth="9" />
              <path d="M0 -2L24 22L48 -2M0 18L24 42L48 18" className="weave__thin" strokeWidth="1.6" />
              <path d="M0 50L24 74L48 50" className="weave__thin" strokeWidth="1.6" />
            </g>
            <g className="weave__speck">
              {specks.map((p, i) => (
                <rect key={i} x={p.x} y={p.y} width={p.s} height={p.s} opacity={p.o} />
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="64" fill={`url(#${id})`} />
        <rect width="100%" height="2" className="weave__edge" />
        <rect y="62" width="100%" height="2" className="weave__edge" />
      </svg>
    </motion.div>
  )
}

/* ── Fine ornamental separator ────────────────────────────── */
export function Ornament({ className = '' }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 220 18" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M2 9H88M132 9H218" />
        <path d="M110 1L119 9L110 17L101 9Z" />
        <path d="M110 5.5L114.5 9L110 12.5L105.5 9Z" fill="currentColor" />
        <path d="M92 9L96 5M92 9L96 13M128 9L124 5M128 9L124 13" />
      </g>
    </svg>
  )
}

/* ── Small celestial particles ────────────────────────────── */
function Particle({ p, scrollY, still }) {
  const y = useTransform(scrollY, (v) => v * -p.depth)
  return (
    <motion.span
      className="particle"
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: p.size,
        height: p.size,
        ...(still ? null : { y }),
      }}
    >
      <motion.span
        className="particle__orb"
        animate={still ? undefined : { y: [0, -p.float, 0], x: [0, p.sway, 0] }}
        transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.span>
  )
}

export function Particles({ count = 18, seed = 11, minLeft = 40 }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const list = useMemo(() => {
    const rand = seeded(seed)
    return Array.from({ length: count }, () => ({
      left: +(minLeft + rand() * (97 - minLeft)).toFixed(1),
      top: +(4 + rand() * 90).toFixed(1),
      size: Math.round(10 + rand() * 20),
      depth: +(0.04 + rand() * 0.22).toFixed(3),
      float: Math.round(6 + rand() * 14),
      sway: Math.round(-6 + rand() * 12),
      dur: +(5 + rand() * 6).toFixed(1),
      delay: +(rand() * 4).toFixed(1),
    }))
  }, [count, seed, minLeft])

  return (
    <div className="particles" aria-hidden="true">
      {list.map((p, i) => (
        <Particle key={i} p={p} scrollY={scrollY} still={reduce} />
      ))}
    </div>
  )
}

/* ── Logo mark ────────────────────────────────────────────── */
export function LogoMark({ className = '' }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox="-24 -24 48 48" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d="M0 -22V-18" transform={`rotate(${i * 30})`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d="M0 -16Q6 -10 0 -3Q-6 -10 0 -16Z" transform={`rotate(${i * 45})`} fill="currentColor" opacity="0.8" />
        ))}
      </g>
      <circle r="3" fill="currentColor" />
    </svg>
  )
}
