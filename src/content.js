// ─────────────────────────────────────────────────────────────
//  All editable content lives here. Update this file, not the JSX.
// ─────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Julius Ervin B. Dela Torre',
  shortName: 'Julius',
  role: 'Aspiring Web Developer',
  location: 'Philippines',
  school: 'Bestlink College of the Philippines',
  // Replace public/profile.jpg with a higher-resolution photo (same file name), or change this path.
  photo: `${base}profile.jpg`,
  photoAlt: 'Portrait of Julius Ervin B. Dela Torre',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  title: 'My Web Portfolio',
  subtitle: 'I am Julius, and this is my Filipino traditional pattern–themed web design.',
  primaryCta: { label: 'Meet me', href: '#about' },
  secondaryCta: { label: 'Get in touch', href: '#contact' },
}

export const about = {
  heading: 'About Me',
  paragraphs: [
    "Hi, I'm Julius Ervin B. Dela Torre, an aspiring web developer from the Philippines and an Information Technology graduate majoring in Information Management from Bestlink College of the Philippines.",
    "I'm passionate about building practical, user-friendly web applications and continuously improving my skills in frontend and backend development. I enjoy exploring modern web technologies, solving problems through code, and turning ideas into functional digital experiences.",
    'This portfolio showcases my projects, technical growth, and approach to web development as I continue working toward becoming a capable full-stack developer.',
  ],
}

// Only list technologies you have actually used. `icon` picks the carousel icon
// (react, tailwind, html, css, php). Groups with no items show a "to be added" note.
export const skills = {
  heading: 'Skills & Technologies',
  intro: 'The technologies I know and build with.',
  groups: [
    {
      title: 'Frontend',
      blurb: 'Interfaces, layout, and interaction.',
      items: [
        { name: 'HTML', icon: 'html' },
        { name: 'CSS', icon: 'css' },
        { name: 'React JS', icon: 'react' },
        { name: 'Tailwind CSS', icon: 'tailwind' },
      ],
    },
    {
      title: 'Backend',
      blurb: 'Server-side logic and data handling.',
      items: [{ name: 'PHP', icon: 'php' }],
    },
    {
      title: 'Information Management',
      blurb: 'My degree major.',
      items: [],
      note: 'Add databases, tools, and methods you have worked with in src/content.js.',
    },
  ],
}

// Add real links only (live site, repository). A card shows a link button only when `links` has entries.
export const projects = {
  heading: 'Featured Projects',
  intro: 'A growing collection of what I am building.',
  items: [
    {
      title: 'Filipino Pattern Web Portfolio',
      status: 'Current project',
      description:
        'This site: a personal portfolio inspired by Filipino traditional geometric patterns, with a golden sun that turns as you scroll, light and dark themes, and motion built with React.',
      tags: ['React', 'Vite', 'Motion', 'SVG'],
      links: [], // e.g. [{ label: 'View source', href: 'https://github.com/your-name/your-repo' }]
    },
    {
      title: 'Your next project',
      status: 'Planned',
      description: 'A space reserved for a project that is not ready to show yet. Add its details in src/content.js.',
      tags: [],
      links: [],
      placeholder: true,
    },
    {
      title: 'Another project',
      status: 'Planned',
      description: 'Another reserved slot. Replace it with real work, or delete it, in src/content.js.',
      tags: [],
      links: [],
      placeholder: true,
    },
  ],
}

export const journey = {
  heading: 'My Journey',
  intro: 'Milestones so far, and where I am heading. Add dates and details as you like.',
  steps: [
    {
      label: 'Education',
      title: 'Information Technology, major in Information Management',
      place: 'Bestlink College of the Philippines',
      text: 'Completed my IT degree with a focus on information management.',
    },
    {
      label: 'Learning',
      title: 'Frontend and backend development',
      text: 'Continuing to build practical skills across both sides of the web, one project at a time.',
    },
    {
      label: 'Now',
      title: 'Building this portfolio',
      text: 'Bringing Filipino traditional patterns into a modern, interactive web experience.',
    },
    {
      label: 'Goal',
      title: 'Becoming a capable full-stack developer',
      text: 'Turning ideas into functional digital experiences, end to end.',
    },
  ],
}

// Fill in `email` and `links` to activate contact actions. Empty entries are never rendered as buttons.
export const contact = {
  heading: 'Contact',
  intro: "Let's talk about web development, projects, or opportunities.",
  email: '', // e.g. 'you@example.com'
  links: [
    // { label: 'GitHub', href: 'https://github.com/your-name' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-name' },
    // { label: 'Facebook', href: 'https://facebook.com/your-name' },
  ],
  emptyNote: 'Contact details will be added soon.',
}
