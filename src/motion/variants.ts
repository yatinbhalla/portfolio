import type { Variants } from "motion/react";
import { DUR, EASE_OUT } from "./tokens";

/** Entrance for a single element. `distance` collapses to 0 under reduced motion. */
export function fadeUp(distance = 20, duration = DUR.md): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
  };
}

export function fadeIn(duration = DUR.sm): Variants {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration, ease: EASE_OUT } },
  };
}

/**
 * Parent variant. Children inherit `show` automatically, so a grid needs one
 * IntersectionObserver instead of one per card.
 */
export function staggerParent(stagger = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Directional child variant used by StaggerItem. */
export function slideItem(
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 20,
): Variants {
  const show = { transition: { duration: DUR.md, ease: EASE_OUT } };
  switch (direction) {
    case "down":
      return { hidden: { opacity: 0, y: -distance }, show: { opacity: 1, y: 0, ...show } };
    case "left":
      return { hidden: { opacity: 0, x: distance }, show: { opacity: 1, x: 0, ...show } };
    case "right":
      return { hidden: { opacity: 0, x: -distance }, show: { opacity: 1, x: 0, ...show } };
    default:
      return { hidden: { opacity: 0, y: distance }, show: { opacity: 1, y: 0, ...show } };
  }
}

/** Mask-reveal child: rides up out of an overflow-hidden parent. */
export const maskChild: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};
