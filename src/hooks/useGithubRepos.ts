import { startTransition, useEffect, useState } from "react";
import { fallbackRepos, type Repo } from "../data/repos";

const EXCLUDED = new Set(["yatinbhalla"]); // profile README repo

const SNAPSHOT_DESCRIPTIONS = new Map(
  fallbackRepos.filter((r) => r.description).map((r) => [r.name, r.description]),
);

/**
 * A repo whose GitHub About field is empty would otherwise replace a perfectly
 * good snapshot description with "No description yet." Live data still wins
 * whenever GitHub actually has one, so GitHub stays the source of truth.
 */
function withDescriptions(live: Repo[]): Repo[] {
  return live.map((r) =>
    r.description?.trim() ? r : { ...r, description: SNAPSHOT_DESCRIPTIONS.get(r.name) ?? null },
  );
}

export function useGithubRepos() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/yatinbhalla/repos?per_page=100&sort=updated")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Repo[]) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        // Non-urgent: keeps the 25-card re-render off a scroll frame.
        startTransition(() => {
          setRepos(withDescriptions(data.filter((r) => !EXCLUDED.has(r.name))));
          setLive(true);
        });
      })
      .catch(() => {
        /* keep fallback snapshot */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, live };
}
