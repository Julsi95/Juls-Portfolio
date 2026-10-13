# Julius Ervin B. Dela Torre — Web Portfolio

A Filipino traditional pattern–themed portfolio built with React, Vite and Motion for React.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # serve the production build
```

The build uses relative asset paths (`base: './'`), so `dist/` can be hosted on GitHub Pages, Netlify, Vercel or any sub-folder.

## Edit your content

Everything editable is in **`src/content.js`**: name, bio, navigation, skills, projects, journey and contact details.

| To change | Where |
| --- | --- |
| Profile photo | Replace `public/profile.jpg` (same file name) or change `profile.photo` |
| Skills | `skills.groups[].items`. List only technologies you have actually used |
| Projects and links | `projects.items`. A link button only appears when `links` has entries |
| Journey milestones | `journey.steps` |
| Email and social links | `contact.email` and `contact.links`. Empty fields render nothing |
| Colors and themes | CSS variables at the top of `src/styles.css` |

## Structure

```
src/
  content.js            all editable content
  hooks.js              theme toggle, active-section tracking
  styles.css            tokens, themes, layout
  components/
    Sun.jsx             signature SVG sun (scroll-linked rotation)
    Patterns.jsx        geometric borders, woven strip, ornament, particles, logo
    Nav.jsx Hero.jsx About.jsx Skills.jsx Projects.jsx Journey.jsx Contact.jsx
    Reveal.jsx          scroll-reveal wrapper and section heading
```

## Motion and accessibility

- The sun rotates with scroll (about 0.08° per pixel), with a very slow idle spin and gentle parallax. Only transforms and opacity are animated.
- `prefers-reduced-motion` disables rotation, parallax, floating particles and reveal movement.
- Semantic landmarks, a skip link, keyboard-operable navigation and theme toggle, visible focus rings, and `aria-current` on the active nav item.
- The theme follows the system preference on first visit and is remembered afterwards.
