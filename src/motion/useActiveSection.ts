import { useEffect, useState } from "react";
import { NAV_H } from "./tokens";

/** Tracks which section owns the viewport, for the nav's sliding indicator. */
export function useActiveSection(ids: string[]) {
  const key = ids.join(",");
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sectionIds = key.split(",");
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActive(best.target.id);
      },
      { rootMargin: `-${NAV_H}px 0px -55% 0px`, threshold: [0, 0.2, 0.5, 0.8] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);

  return active;
}
