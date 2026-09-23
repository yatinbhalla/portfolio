/**
 * Shared motion tokens. One place to retune the feel of the whole site.
 *
 * Easing tuples are explicitly typed rather than `as const`: `as const` produces
 * a readonly tuple, which is not assignable to Motion's BezierDefinition.
 */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]; // expo-out: snap, then settle
export const EASE_INOUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_WIPE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const DUR = { xs: 0.22, sm: 0.4, md: 0.6, lg: 0.9 } as const;

export const SPRING_SOFT = { stiffness: 120, damping: 24, mass: 0.6 } as const;
export const SPRING_MAGNET = { stiffness: 260, damping: 18, mass: 0.4 } as const;
export const SPRING_SCROLL = { stiffness: 90, damping: 28, mass: 0.35 } as const;

/** Default viewport config for entrance reveals. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Must stay in sync with --nav-h in index.css. */
export const NAV_H = 68;

/** Scroll budget dials for the two pinned scenes. */
export const SCENE = {
  /** Scroll travel per "How I Think" step, in vh. */
  processStepVh: 38,
  /** Dwell padding under each stacked Featured card, in vh. */
  featuredDwellVh: 10,
  /** Sticky top offset increment per stacked card, in px. */
  featuredOffsetPx: 14,
  featuredMinScale: 0.92,
  featuredMinOpacity: 0.78,
} as const;

/** Pinned scenes are desktop-only: thumb-scrolling pinned content is where this design fails. */
export const PIN_MIN_WIDTH = 1024;
export const PIN_MIN_HEIGHT = 540;
