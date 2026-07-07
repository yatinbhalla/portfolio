# Yatin Bhalla — AI PM Portfolio

Dark, motion-rich single-page portfolio. Built with React 19, Vite, Tailwind CSS v4, and Motion (Framer Motion).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static site to dist/
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (e.g. `yatinbhalla/portfolio`).
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo.
3. Vercel auto-detects Vite. Accept defaults (build: `npm run build`, output: `dist`) → Deploy.

## Deploy to Render

1. Push to GitHub.
2. Render dashboard → **New → Static Site** → connect the repo.
3. Build command: `npm run build` · Publish directory: `dist` → Create.

## Updating content

- All text/content lives in [src/data/profile.ts](src/data/profile.ts) — hero, about, mindset, featured projects, skills, education, certifications.
- The **All Projects** grid fetches your public repos live from the GitHub API on every visit; [src/data/repos.ts](src/data/repos.ts) is the offline/rate-limit fallback snapshot (refresh it occasionally).
- Replace `public/Yatin_Bhalla_Resume.pdf` whenever your resume changes — the download buttons point to it.
