import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import {
  IntroContext,
  LenisContext,
  MotionPrefsContext,
  type IntroState,
  type MotionPrefs,
} from "./context";
import { useLenis } from "./useLenis";
import { DUR, EASE_OUT, PIN_MIN_HEIGHT, PIN_MIN_WIDTH } from "./tokens";

const INTRO_KEY = "yb:intro";
/** Hero entrance starts before the loader wipe finishes, so they read as one gesture. */
const HERO_DELAY = 0.85;

/** Dev-only query overrides so the reduced-motion path is actually testable in a browser. */
function devFlag(name: string): string | null {
  if (!import.meta.env.DEV || typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

function canPinNow(reduced: boolean): boolean {
  if (reduced) return false;
  if (typeof window === "undefined") return false;
  if (devFlag("scene") === "off") return false;
  // overflow:clip is what keeps position:sticky viable here; without it, bail to grids.
  if (!CSS.supports("overflow", "clip")) return false;
  return window.innerWidth >= PIN_MIN_WIDTH && window.innerHeight >= PIN_MIN_HEIGHT;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion() ?? false;

  const reduced = useMemo(() => {
    const flag = devFlag("motion");
    if (flag === "reduced" || flag === "off") return true;
    if (flag === "full") return false;
    return systemReduced;
  }, [systemReduced]);

  const [fine, setFine] = useState(false);
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia(`(min-width: ${PIN_MIN_WIDTH}px)`);

    const syncPointer = () => setFine(pointer.matches && !reduced);
    // Only re-evaluate pinning when the breakpoint actually flips. Recomputing on
    // every resize event would change page height mid-gesture and jump the scroll.
    const syncPin = () => setCanPin(canPinNow(reduced));

    syncPointer();
    syncPin();
    pointer.addEventListener("change", syncPointer);
    wide.addEventListener("change", syncPin);
    return () => {
      pointer.removeEventListener("change", syncPointer);
      wide.removeEventListener("change", syncPin);
    };
  }, [reduced]);

  const prefs: MotionPrefs = useMemo(
    () => ({ reduced, fine, canPin }),
    [reduced, fine, canPin],
  );

  // Read the session gate during the first render, not in an effect — an effect
  // would flash the loader on every repeat visit before clearing it.
  const [introActive, setIntroActive] = useState(() => {
    if (reduced) return false;
    if (devFlag("intro") === "1") return true;
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") return false;
      sessionStorage.setItem(INTRO_KEY, "1");
      return true;
    } catch {
      return false; // Safari private mode
    }
  });

  const finish = useCallback(() => setIntroActive(false), []);

  const intro: IntroState = useMemo(
    () => ({
      done: !introActive,
      heroDelay: introActive ? HERO_DELAY : 0,
      finish,
    }),
    [introActive, finish],
  );

  const lenis = useLenis(!reduced);

  // Hold the page still behind the loader.
  useEffect(() => {
    if (!introActive) {
      lenis?.start();
      document.documentElement.classList.remove("is-locked");
      return;
    }
    lenis?.stop();
    document.documentElement.classList.add("is-locked");
  }, [introActive, lenis]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DUR.md, ease: EASE_OUT }}
    >
      <MotionPrefsContext.Provider value={prefs}>
        <IntroContext.Provider value={intro}>
          <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
        </IntroContext.Provider>
      </MotionPrefsContext.Provider>
    </MotionConfig>
  );
}
