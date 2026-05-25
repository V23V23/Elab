# XXX Electronic Lab — Official Website

A high-end, futuristic electronic lab studio website with a design aesthetic inspired by **Apple**, **Nothing**, and **DJI** — dark backgrounds, glassmorphism, micro-animations, and responsive design.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Build | Vite 8 |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Routing | React Router 7 |

## Design Features

- **Glassmorphism** UI with backdrop blur
- **Canvas particle system** with mouse interaction
- **3D perspective** product showcase with color variants
- **Scroll-triggered animations** via Framer Motion
- **Dark theme** with custom scrollbar and selection styling
- **Responsive layout** — mobile hamburger menu, adaptive grids
- **Recharts** data dashboards — heart rate, SpO2, sleep, GPS tracking
- **CSS phone mockup** for app integration showcase

## Getting Started

```bash
npm install
npm run dev      # Development server at http://localhost:5173
npm run build    # Production build to /dist
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Navbar + Footer + Outlet
│   ├── Navbar.jsx          # Glassmorphism sticky nav
│   ├── Footer.jsx          # Minimal footer
│   ├── ParticleBackground.jsx  # Canvas particles + gradient orbs
│   └── ScrollReveal.jsx    # Reusable scroll animation wrapper
├── hooks/
│   └── useParticles.js     # Canvas particle system hook
├── pages/
│   ├── HomePage.jsx        # Main landing page
│   └── sections/
│       ├── HeroSection.jsx       # Full-screen hero with smartwatch
│       ├── FeaturesSection.jsx   # 8 feature cards grid
│       ├── ProductShowcase.jsx   # 3D product viewer + color variants
│       ├── DataDashboard.jsx     # Health data charts
│       ├── AppIntegration.jsx    # Phone mockup + app screens
│       ├── AboutSection.jsx      # Studio intro + workbench gallery
│       └── CTASection.jsx        # Email subscription
└── index.css               # Tailwind imports + custom theme
```

## Customization

- **Studio name:** Replace `XXX ELECTRONIC LAB` in `Navbar.jsx`, `Footer.jsx`, `AboutSection.jsx`, and `index.html`
- **Product images:** Replace CSS watch illustrations with real renders in `HeroSection.jsx` and `ProductShowcase.jsx`
- **Chart data:** Update sample data arrays in `DataDashboard.jsx`
- **Colors:** Edit `@theme` block in `index.css`
