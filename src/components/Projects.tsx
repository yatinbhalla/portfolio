import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Section } from "./Section";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { profile } from "../data/profile";
import { ArrowUpRight, ChevronDown, ExternalLink, Github, Search } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { SpotlightCard } from "../motion/SpotlightCard";
import { useLenisInstance } from "../motion/context";

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
};

/**
 * Six, not five or nine: it divides evenly into both the 2-column and 3-column
 * breakpoints, so the first screen is always a complete rectangle.
 */
const PREVIEW_COUNT = 6;

export function Projects() {
  const { repos, live } = useGithubRepos();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const returnToControls = useRef(false);
  const lenis = useLenisInstance();
  const [floor, setFloor] = useState<number>();

  /*
   * Collapsing removes ~19 cards from ABOVE the control, so the reader is left
   * stranded far below the section looking at whatever followed it. Bring the
   * control back under them instead.
   */
  useEffect(() => {
    if (showAll || !returnToControls.current) return;
    returnToControls.current = false;
    const el = controlsRef.current;
    if (!el) return;
    const offset = -(window.innerHeight / 2 - 80);
    if (lenis) lenis.scrollTo(el, { offset });
    else el.scrollIntoView({ block: "center" });
  }, [showAll, lenis]);

  const toggleShowAll = () => {
    setShowAll((wasShowingAll) => {
      if (wasShowingAll) returnToControls.current = true;
      return !wasShowingAll;
    });
  };

  // The live GitHub swap changes this grid's height mid-session. Pinning a floor
  // means the page can only grow, never shrink out from under the reader.
  useLayoutEffect(() => {
    if (floor === undefined && gridRef.current) setFloor(gridRef.current.offsetHeight);
  }, [floor]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        r.topics.some((t) => t.includes(q)),
    );
  }, [repos, query]);

  // Searching always searches everything; the cap only applies to the resting view.
  const isSearching = query.trim().length > 0;
  const collapsed = !isSearching && !showAll;
  const visible = collapsed ? filtered.slice(0, PREVIEW_COUNT) : filtered;
  const hidden = filtered.length - visible.length;

  return (
    <Section
      id="projects"
      kicker="All Projects"
      title={
        <>
          The full <span className="text-accent-deep">build log</span>
        </>
      }
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-500">
          {live ? "Fetched live from GitHub" : "Snapshot from GitHub"} ·{" "}
          {isSearching
            ? `${filtered.length} matching`
            : collapsed
              ? `showing ${visible.length} of ${filtered.length}`
              : `all ${filtered.length}`}{" "}
          public repositories
        </p>
        <label className="panel flex w-full items-center gap-2 px-4 py-2.5 transition-colors focus-within:border-accent-deep sm:w-72">
          <Search size={16} className="shrink-0 text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, topic, tech…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-500"
          />
        </label>
      </div>

      {/*
        Deliberately no layout animation here: reflowing the grid on every
        keystroke is the most expensive thing on the page for the least payoff.
      */}
      <div ref={gridRef} style={floor ? { minHeight: floor } : undefined}>
        <StaggerGroup
          as="ul"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.035}
          amount={0.05}
        >
          {visible.map((r) => (
            <StaggerItem key={r.name} as="li" hoverLift={5} className="h-full">
              <SpotlightCard as="article" className="panel card-hover flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold break-all text-ink">{r.name}</h3>
                  <div className="flex shrink-0 gap-1.5">
                    <motion.a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${r.name} repository`}
                      whileHover={{ y: -2, scale: 1.12 }}
                      className="p-1.5 text-ink-500 transition-colors hover:text-accent-deep"
                    >
                      <Github size={16} />
                    </motion.a>
                    {r.homepage && (
                      <motion.a
                        href={r.homepage}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${r.name} live link`}
                        whileHover={{ y: -2, scale: 1.12 }}
                        className="p-1.5 text-ink-500 transition-colors hover:text-accent-deep"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>
                </div>
                <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-ink-500">
                  {r.description ?? "No description yet."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {r.language && (
                    <span className="flex items-center gap-1.5 text-xs text-ink-500">
                      <span
                        className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/15"
                        style={{ background: langColors[r.language] ?? "var(--color-ink-400)" }}
                      />
                      {r.language}
                    </span>
                  )}
                  {r.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="tag px-2.5 py-0.5 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-ink-500">No projects match "{query}".</p>
      )}

      {/* Expands in place rather than sending the visitor away mid-page; the
          GitHub link stays available for anyone who wants the source of truth. */}
      {!isSearching && filtered.length > PREVIEW_COUNT && (
        <div
          ref={controlsRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-rule pt-8"
        >
          <button type="button" onClick={toggleShowAll} className="btn-primary px-7 py-4">
            {collapsed ? `Show all ${filtered.length} projects` : "Show fewer"}
            <ChevronDown
              size={15}
              strokeWidth={1.75}
              className={`transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
            />
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn-quiet"
          >
            Browse on GitHub <ArrowUpRight size={15} strokeWidth={1.75} />
          </a>
          {collapsed && (
            <span className="font-mono text-[11px] tracking-[0.16em] text-ink-500 uppercase">
              {hidden} more
            </span>
          )}
        </div>
      )}
    </Section>
  );
}
