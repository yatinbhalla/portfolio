import { useEffect, useState } from "react";
import { useAnimationFrame } from "motion/react";
import Lenis from "lenis";

/**
 * Lenis in default (window) mode performs real document scrolling, so
 * window.scrollY, native scroll events and getBoundingClientRect() all reflect
 * the smoothed position — which means Motion's useScroll keeps working with no
 * special wiring. Do NOT use Lenis's wrapper/content transform mode: that
 * translates a div instead of scrolling, and every useScroll({ target }) on the
 * page would start reading stale rects.
 *
 * autoRaf is off so Lenis is driven from Motion's own frame loop. Lenis then
 * writes the new scroll position in the same frame Motion is about to render,
 * instead of racing a second requestAnimationFrame — this removes the one-frame
 * lag you otherwise get on scroll-linked transforms.
 */
export function useLenis(enabled: boolean) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch stays native. Lenis's touch sync fights iOS rubber-banding and
      // momentum, and reads as broken scrolling on real phones.
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      autoRaf: false,
    });

    setLenis(instance);
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: Lenis }).__lenis = instance;
    }

    return () => {
      instance.destroy();
      setLenis(null);
      if (import.meta.env.DEV) {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, [enabled]);

  // Called unconditionally to keep hook order stable; no-ops until Lenis exists.
  useAnimationFrame((time) => {
    lenis?.raf(time);
  });

  return lenis;
}
