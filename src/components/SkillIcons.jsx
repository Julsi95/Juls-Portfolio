// Simple line/solid marks drawn for this portfolio. They use currentColor so they follow the theme.
const common = { 'aria-hidden': true, focusable: 'false' }

const ICONS = {
  react: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" {...common}>
      <ellipse cx="24" cy="24" rx="20" ry="7.5" />
      <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(120 24 24)" />
      <circle cx="24" cy="24" r="3.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 54 33" fill="currentColor" {...common}>
      <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
    </svg>
  ),
  html: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...common}>
      <path d="M8 4l3.2 34L24 44l12.8-6L40 4Z" />
      <path d="M20 17l-6 7 6 7M28 17l6 7-6 7" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...common}>
      <path d="M8 4l3.2 34L24 44l12.8-6L40 4Z" />
      <path d="M20 15c-2.4 0-3.5 1-3.5 3.4v2c0 1.6-.9 2.6-2.5 3.1 1.6.5 2.5 1.5 2.5 3.1v2c0 2.4 1.1 3.4 3.5 3.4M28 15c2.4 0 3.5 1 3.5 3.4v2c0 1.6.9 2.6 2.5 3.1-1.6.5-2.5 1.5-2.5 3.1v2c0 2.4-1.1 3.4-3.5 3.4" />
    </svg>
  ),
  php: (
    <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2.2" {...common}>
      <ellipse cx="32" cy="20" rx="29" ry="16" />
      <text x="32" y="26" textAnchor="middle" fontFamily="'Noto Sans', system-ui, sans-serif" fontWeight="700" fontSize="18" fill="currentColor" stroke="none">
        php
      </text>
    </svg>
  ),
}

export default function SkillIcon({ name }) {
  return ICONS[name] ?? null
}
