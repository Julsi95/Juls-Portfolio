import { useId } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const R = 300
const TAU = Math.PI * 2
const DEG = Math.PI / 180

function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
const pt = (r, a) => ({ x: +(r * Math.cos(a)).toFixed(2), y: +(r * Math.sin(a)).toFixed(2), a })
const angDist = (a, b) => {
  const d = Math.abs(a - b) % TAU
  return d > Math.PI ? TAU - d : d
}
const nearest = (list, a) => list.reduce((best, q) => (angDist(q.a, a) < angDist(best.a, a) ? q : best))
const line = (p, q) => `M${p.x} ${p.y}L${q.x} ${q.y}`

/* ── Light sun: cracked golden disc, thin rays, a ring of beads on the rim ── */
function buildLight() {
  const rand = seeded(2026)

  const outer = Array.from({ length: 15 }, (_, j) => pt(R * (0.8 + rand() * 0.1), (j / 15) * TAU + (rand() - 0.5) * 0.2))
  const inner = Array.from({ length: 9 }, (_, j) => pt(R * (0.4 + rand() * 0.14), (j / 9) * TAU + 0.3 + (rand() - 0.5) * 0.3))

  const outerPoly = outer.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ') + 'Z'

  const cracks = []
  // short spokes from the rim down to the outer ring
  outer.forEach((p) => cracks.push(line(p, pt(R - 2, p.a + (rand() - 0.5) * 0.09))))
  // each outer vertex reaches toward the nearest inner vertex
  outer.forEach((p) => {
    const q = nearest(inner, p.a)
    cracks.push(line(p, q))
  })
  // the inner ring is deliberately left open in a couple of places
  inner.forEach((p, i) => {
    if (i === 2 || i === 6) return
    cracks.push(line(p, inner[(i + 1) % inner.length]))
  })
  // stubs that stop short of the centre
  ;[1, 5, 8].forEach((i) => cracks.push(line(inner[i], pt(R * 0.2, inner[i].a + 0.1))))

  const rays = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * TAU + (rand() - 0.5) * 0.12
    const len = R * (0.08 + rand() * 0.3)
    return { d: line(pt(R + 4, a), pt(R + 4 + len, a)), w: +(1.6 + rand() * 1).toFixed(2) }
  })

  const beads = Array.from({ length: 13 }, (_, i) => {
    const p = pt(R * 1.09, -101.8 * DEG + (i / 13) * TAU)
    return { x: p.x, y: p.y, s: 13 }
  })

  return { outerPoly, cracks, rays, beads }
}

/* ── Dark sun: black disc, inner circle, three rings of twelve glowing beads ── */
function buildDark() {
  const rings = [
    { r: R * 0.72, s: 16 },
    { r: R * 1.16, s: 17 },
    { r: R * 1.39, s: 17 },
  ]
  const beads = rings.flatMap(({ r, s }) =>
    Array.from({ length: 12 }, (_, k) => {
      const p = pt(r, (15 + k * 30) * DEG)
      return { x: p.x, y: p.y, s }
    }),
  )
  return { beads }
}

const LIGHT = buildLight()
const DARK = buildDark()

function Beads({ beads, fill, haloFill }) {
  return (
    <g>
      {beads.map((b, i) => (
        <g key={i}>
          {haloFill ? <circle cx={b.x} cy={b.y} r={b.s * 1.8} fill={haloFill} /> : null}
          <circle cx={b.x} cy={b.y} r={b.s} fill={fill} />
        </g>
      ))}
    </g>
  )
}

/**
 * The signature sun. Rotation is linked to page scroll; a very slow idle spin
 * and gentle vertical drift sit on top. Only transforms and opacity are animated.
 * The light theme shows the cracked golden disc, the dark theme the dark disc with bead rings.
 */
export default function Sun({ className = '', speed = 0.08, drift = 0.1, idle = 420 }) {
  const reduce = useReducedMotion()
  const uid = 'sun' + useId().replace(/:/g, '')
  const { scrollY } = useScroll()
  const rotateRaw = useTransform(scrollY, (v) => v * speed)
  const rotate = useSpring(rotateRaw, { stiffness: 70, damping: 22, mass: 0.6 })
  const y = useTransform(scrollY, (v) => v * drift)

  const id = (n) => `${uid}-${n}`
  const url = (n) => `url(#${id(n)})`

  return (
    <motion.div className={`sun ${className}`} style={reduce ? undefined : { y }}>
      <motion.div className="sun__spin" style={reduce ? undefined : { rotate }}>
        <div className="sun__idle" style={reduce ? undefined : { animationDuration: `${idle}s` }}>
          {/* ── Light theme ── */}
          <svg className="sun__variant sun__variant--light" viewBox="-440 -440 880 880" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id={id('ld')} cx="0.5" cy="0.5" r="0.55" fx="0.52" fy="0.5">
                <stop offset="0" stopColor="#d9a257" />
                <stop offset="0.55" stopColor="#b8803a" />
                <stop offset="0.88" stopColor="#92602a" />
                <stop offset="1" stopColor="#74501f" />
              </radialGradient>
              <radialGradient id={id('lb')} cx="0.38" cy="0.32" r="0.8">
                <stop offset="0" stopColor="#e6bd7c" />
                <stop offset="0.55" stopColor="#b98443" />
                <stop offset="1" stopColor="#7c5320" />
              </radialGradient>
              <radialGradient id={id('lg')} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.7" stopColor="#e4b66d" stopOpacity="0.5" />
                <stop offset="1" stopColor="#e4b66d" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle className="sun__glow" r={R + 80} fill={url('lg')} />

            <g fill="none" strokeLinecap="round" stroke="#7a5a35" opacity="0.6">
              {LIGHT.rays.map((r, i) => (
                <path key={i} d={r.d} strokeWidth={r.w} />
              ))}
            </g>

            <circle r={R} cx="4" cy="6" fill="rgba(0,0,0,0.22)" />
            <circle r={R} fill={url('ld')} />

            <g fill="none" stroke="#f3cc8e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6">
              <path d={LIGHT.outerPoly} />
              {LIGHT.cracks.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>

            <Beads beads={LIGHT.beads} fill={url('lb')} />
          </svg>

          {/* ── Dark theme ── */}
          <svg className="sun__variant sun__variant--dark" viewBox="-440 -440 880 880" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id={id('dd')} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#4c3512" />
                <stop offset="0.45" stopColor="#33230e" />
                <stop offset="0.8" stopColor="#1d150b" />
                <stop offset="1" stopColor="#100c08" />
              </radialGradient>
              <radialGradient id={id('di')} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#4a3412" />
                <stop offset="1" stopColor="#261b0d" />
              </radialGradient>
              <radialGradient id={id('db')} cx="0.38" cy="0.32" r="0.8">
                <stop offset="0" stopColor="#f2d7a8" />
                <stop offset="0.5" stopColor="#cf9f5c" />
                <stop offset="1" stopColor="#8a5a1e" />
              </radialGradient>
              <radialGradient id={id('dh')} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.45" stopColor="#e4b66d" stopOpacity="0.28" />
                <stop offset="1" stopColor="#e4b66d" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id('dg')} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.7" stopColor="#e4b66d" stopOpacity="0.5" />
                <stop offset="1" stopColor="#e4b66d" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle className="sun__glow" r={R * 1.5} fill={url('dg')} />
            <circle r={R} fill={url('dd')} />
            <circle r={R * 0.456} fill={url('di')} />
            <Beads beads={DARK.beads} fill={url('db')} haloFill={url('dh')} />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}
