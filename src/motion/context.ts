import { createContext, useContext } from "react";
import type Lenis from "lenis";

export type MotionPrefs = {
  /** prefers-reduced-motion, or the ?motion=reduced dev override. */
  reduced: boolean;
  /** Fine pointer with real hover — gates spotlight and magnetic effects. */
  fine: boolean;
  /** Whether the two scrollytelling scenes may pin. Desktop + motion-allowed only. */
  canPin: boolean;
};

export const MotionPrefsContext = createContext<MotionPrefs>({
  reduced: false,
  fine: false,
  canPin: false,
});

export function useMotionPrefs() {
  return useContext(MotionPrefsContext);
}

export type IntroState = {
  done: boolean;
  /** Seconds the hero should wait so its entrance overlaps the loader wipe. */
  heroDelay: number;
  finish: () => void;
};

export const IntroContext = createContext<IntroState>({
  done: true,
  heroDelay: 0,
  finish: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}
