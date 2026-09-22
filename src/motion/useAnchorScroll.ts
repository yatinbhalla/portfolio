import { useCallback, useEffect, type MouseEvent } from "react";
import { useIntro, useLenisInstance, useMotionPrefs } from "./context";
import { NAV_H } from "./tokens";

/**
 * Routes in-page anchors through Lenis so the nav offset is respected and the
 * scroll stays smooth, while keeping the URL hash (and the back button) working.
 */
export function useAnchorScroll() {
  const lenis = useLenisInstance();
  const { reduced } = useMotionPrefs();
  const { done } = useIntro();

  const scrollTo = useCallback(
    (hash: string) => {
      const target = document.querySelector(hash);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -NAV_H, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
      if (window.location.hash !== hash) {
        history.pushState(null, "", hash);
      }
    },
    [lenis, reduced],
  );

  const onAnchorClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      scrollTo(href);
    },
    [scrollTo],
  );

  // Honour a deep link, but only once the intro is out of the way.
  useEffect(() => {
    if (!done) return;
    const hash = window.location.hash;
    if (!hash || hash === "#top") return;
    const target = document.querySelector(hash);
    if (!target) return;
    const id = window.setTimeout(() => {
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -NAV_H, immediate: true });
      else target.scrollIntoView();
    }, 60);
    return () => window.clearTimeout(id);
  }, [done, lenis]);

  return { onAnchorClick, scrollTo };
}
