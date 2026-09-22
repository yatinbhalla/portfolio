import type { RefObject } from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMotionPrefs } from "./context";
import { SPRING_SCROLL } from "./tokens";

/**
 * Scroll-linked drift across an element's viewport crossing.
 *
 * Hooks are never called conditionally: under reduced motion the output range
 * collapses to [0, 0], so the MotionValue still exists but never moves.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { speed = 60, smooth = false }: { speed?: number; smooth?: boolean } = {},
): MotionValue<number> {
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [speed / 2, -speed / 2],
  );
  const sprung = useSpring(raw, SPRING_SCROLL);
  return smooth && !reduced ? sprung : raw;
}
