<div align="center">

# Yatin Bhalla — AI Product Manager

**Portfolio site · Products with receipts**

Business operator turned AI PM. 3 businesses grown ~30% YoY over 7 years · 20+ AI products shipped 0→1 · 4+ in daily production use.

[![React](https://img.shields.io/badge/React_19-14120E?logo=react&logoColor=F4F1EA)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-14120E?logo=typescript&logoColor=F4F1EA)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite_7-14120E?logo=vite&logoColor=F4F1EA)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-14120E?logo=tailwindcss&logoColor=F4F1EA)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-FF4A1C?logo=framer&logoColor=F4F1EA)](https://motion.dev)

**[View the site →](https://portfolio-yatinbhalla.vercel.app)**

[LinkedIn](https://www.linkedin.com/in/yatinbhalla42/) · [GitHub](https://github.com/yatinbhalla) · [X](https://x.com/yatinbhalla42) · [Email](mailto:yatinbhalla42@gmail.com)

</div>

---

## What this is

A portfolio built for recruiters and hiring managers evaluating me for **AI Product Manager** roles, designed around the same principle as my products: claims backed by numbers.

It deliberately avoids the dark-gradient-and-glassmorphism look that most generated portfolios share. The identity is editorial print — paper ground, warm ink, one signal accent, hairline rules and film grain — with type doing the work rather than decoration.

| Section | What it shows |
| --- | --- |
| **Hero** | Rotating titles, monospace metadata block, hairline stat index (20+ products, 30% YoY, 90%+ scores) |
| **About** | The operator → AI builder → PM student arc |
| **Traits & Mindset** | 5 cards on how I'm wired — operator's ownership, builder's bias, metrics over opinions |
| **Featured Work** | 6 flagship products with metrics, stack and live links, as a pinned card stack |
| **How I Think** | A pinned 6-step scene: Discover → Define → AI Workflow Planning → Prototype → Ship → Measure |
| **All Projects** | Every public repo, **fetched live from the GitHub API**, searchable |
| **Skills & Tools** | Product craft, AI/technical skills, and a scroll-reactive tool marquee |
| **Certificates** | BITSoM × Masai (90%+), Outskill, Google for Startups — with proof on Drive |
| **Contact** | Email, LinkedIn, GitHub, X, click-to-call, resume download |

## Design system

**Palette** — paper `#F4F1EA`, warm ink ramp `#14120E → #3A362E → #6B6459`, hairlines `#D5CEC0`, and a single signal accent `#FF4A1C`. The accent is used for fills, marks and rules only: at 2.98:1 on paper it is never text, so accent text is always the deeper `#C43A10`.

**Type** — [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for the masthead (weight 400 only, restricted to the hero `h1` and section `h2`), [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) for UI, and [DM Mono](https://fonts.google.com/specimen/DM+Mono) for every label, numeral and metadata line.

**Accessibility** — every text element is verified against its resolved background; the page passes WCAG AA with a minimum contrast ratio of 4.70:1. `prefers-reduced-motion` degrades to static-but-complete: pinned scenes unpin, parallax and smooth scroll switch off, and all content stays present.

## Motion

A scroll-driven motion system built on [Motion](https://motion.dev), not trigger-once fades:

- **Lenis** smooth scroll, driven from Motion's own frame loop so scroll-linked transforms don't lag a frame behind
- **Two pinned scrollytelling scenes** — the Featured card stack and the How I Think process — gated to desktop viewports and disabled under reduced motion
- Scroll-linked parallax, variant-driven stagger, magnetic buttons, a cursor spotlight and a scroll-velocity marquee

Performance is treated as part of the design: transforms and opacity only, no `backdrop-filter` in the scroll path, and offscreen animation paused.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Deploy

**Vercel** — [vercel.com/new](https://vercel.com/new) → import the repo → framework auto-detected (Vite) → Deploy.

**Render** — New → Static Site → build `npm run build`, publish directory `dist`.

Both redeploy automatically on every push to `main`.

## Updating content

- [src/data/profile.ts](src/data/profile.ts) — all copy: hero, about, mindset, featured projects, process steps, skills, education, certifications
- [src/index.css](src/index.css) — the design tokens: palette, type, surfaces, grain
- [public/Yatin_Bhalla_Resume.pdf](public/Yatin_Bhalla_Resume.pdf) — swap this file when the resume changes; every download button points at it

New GitHub repos appear in the All Projects grid automatically. [src/data/repos.ts](src/data/repos.ts) is a snapshot used only when the live API is unavailable.

---

<div align="center">

© Yatin Bhalla

</div>
