import { Section, Reveal } from "./Section";
import { featured } from "../data/profile";
import { ExternalLink, Github, TrendingUp } from "lucide-react";

export function Featured() {
  return (
    <Section
      id="work"
      kicker="Featured Work"
      title={
        <>
          Products with <span className="text-gradient">receipts</span>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.1}>
            <article className="glass glass-hover group relative h-full overflow-hidden rounded-3xl p-7">
              <div
                className="absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                style={{ background: p.accent }}
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
                    <p className="mt-1 text-sm font-medium" style={{ color: p.accent }}>
                      {p.headline}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} repository`}
                      className="glass rounded-full p-2.5 text-slate-300 transition-colors hover:text-white"
                    >
                      <Github size={17} />
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name} live demo`}
                        className="glass rounded-full p-2.5 text-slate-300 transition-colors hover:text-white"
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.description}</p>

                <ul className="mt-5 space-y-2">
                  {p.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-slate-200">
                      <TrendingUp size={14} style={{ color: p.accent }} />
                      {m}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
