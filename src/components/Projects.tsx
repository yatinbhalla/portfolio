import { useMemo, useState } from "react";
import { Section, Reveal } from "./Section";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { ExternalLink, Github, Search } from "lucide-react";

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
};

export function Projects() {
  const { repos, live } = useGithubRepos();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        r.topics.some((t) => t.includes(q))
    );
  }, [repos, query]);

  return (
    <Section
      id="projects"
      kicker="All Projects"
      title={
        <>
          The full <span className="text-gradient">build log</span>
        </>
      }
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-400">
          {live ? "Fetched live from GitHub" : "Snapshot from GitHub"} ·{" "}
          {filtered.length} public repositories
        </p>
        <label className="glass flex w-full items-center gap-2 rounded-full px-4 py-2.5 sm:w-72">
          <Search size={16} className="shrink-0 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, topic, tech…"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.06}>
            <article className="glass glass-hover flex h-full flex-col rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-semibold break-all text-white">{r.name}</h3>
                <div className="flex shrink-0 gap-1.5">
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${r.name} repository`}
                    className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Github size={16} />
                  </a>
                  {r.homepage && (
                    <a
                      href={r.homepage}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${r.name} live link`}
                      className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-400">
                {r.description ?? "No description yet."}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {r.language && (
                  <span className="flex items-center gap-1.5 text-xs text-slate-300">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: langColors[r.language] ?? "#8b5cf6" }}
                    />
                    {r.language}
                  </span>
                )}
                {r.topics.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500">No projects match "{query}".</p>
      )}
    </Section>
  );
}
