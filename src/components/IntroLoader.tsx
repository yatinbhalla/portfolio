import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useIntro } from "../motion/context";
import { EASE_OUT, EASE_WIPE } from "../motion/tokens";

/**
 * Branded wipe shown once per session.
 *
 * The panel is still travelling upward when the hero's entrance begins (the hero
 * waits heroDelay = 0.85s while the wipe starts at 0.78s) — two elements moving
 * the same direction in overlapping windows read as one gesture, where a
 * sequential handoff would show a seam.
 *
 * Never rendered under reduced motion: the provider reports done immediately.
 */
export function IntroLoader() {
  const { done, finish } = useIntro();
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (done) return;
    const skip = () => setSkipped(true);
    const events = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, skip, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, skip));
  }, [done]);

  if (done) return null;

  return (
    <motion.div
      data-intro
      aria-hidden="true"
      className="bg-ink fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        duration: skipped ? 0.25 : 0.42,
        delay: skipped ? 0 : 0.78,
        ease: EASE_WIPE,
      }}
      onAnimationComplete={finish}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex">
          {["Y", "B"].map((ch, i) => (
            <span key={ch} className="overflow-hidden pb-[0.12em]">
              <motion.span
                className="font-display text-gradient block text-7xl font-bold sm:text-8xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE_OUT }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </div>
        <motion.div
          className="h-px w-32 bg-gradient-to-r from-violet-500 to-cyan-500"
          style={{ transformOrigin: "0% 50%" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT }}
        />
      </div>
    </motion.div>
  );
}
