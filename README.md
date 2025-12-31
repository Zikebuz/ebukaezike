# Personal Portfolio & IT Consulting Platform

This is a Next.js (App Router) single-page portfolio and consulting platform for Ebuka Ezike. It showcases professional information, services, portfolio projects, blog posts, testimonials, and a digital/physical products store.

## Tech Stack

- **Next.js 13 (App Router)** – React framework for server-side rendering and routing
- **React** – Front-end library
- **Tailwind CSS** – Utility-first CSS framework
- **Framer Motion** – Animations and interactive effects
- **React Three Fiber** – 3D graphics with Three.js in React
- **Headless API (Next.js API route)** – Contact form endpoint
- **RSS Feed** – Blog posts pulled from an external RSS (Blogger)
- **Stripe UI** – Ready-to-integrate payment buttons in the store (no backend logic included)

## Folder Structure

- `app/` - Next.js App Router directory (layout, page, global CSS, API route)
- `components/` - React components for each section
- `data/` - Data files (projects, experience, services, testimonials, products)
- `lib/` - Utility libraries (RSS fetching, SEO helpers)
- `public/` - Static assets (images, textures, resume, icons)
- `styles/` - Global and theme CSS
- `next.config.js`, `tailwind.config.js`, `postcss.config.js` - Configuration files

## Setup Instructions

1. **Install dependencies**  
   ```bash
   npm install next react react-dom framer-motion @react-three/fiber three @react-three/drei tailwindcss postcss autoprefixer react-icons
   npx tailwindcss init -p
