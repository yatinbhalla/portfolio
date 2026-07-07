import { useEffect, useState } from "react";
import { fallbackRepos, type Repo } from "../data/repos";

const EXCLUDED = new Set(["yatinbhalla"]); // profile README repo

export function useGithubRepos() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/yatinbhalla/repos?per_page=100&sort=updated")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Repo[]) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setRepos(data.filter((r) => !EXCLUDED.has(r.name)));
        setLive(true);
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
