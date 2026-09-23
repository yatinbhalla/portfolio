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

  /*
   * Hard safety release.
   *
   * finish() normally fires from onAnimationComplete, but this panel holds a
   * scroll lock while it is up, and an animation that never completes therefore
   * leaves the whole page permanently unscrollable with every scroll-linked
   * effect dead. That is not hypothetical: a tab opened in the background has
   * its animation frames throttled, so the wipe never finishes — and opening a
   * link in a background tab is completely routine.
   *
   * So the lock is released on a timer that does not depend on the animation,
   * and immediately if the document is not visible in the first place.
   */
  useEffect(() => {
    if (done) return;
    if (document.hidden) {
      finish();
      return;
    }
    const onHide = () => document.hidden && finish();
    document.addEventListener("visibilitychange", onHide);
    const bail = window.setTimeout(finish, 1600);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.clearTimeout(bail);
    };
  }, [done, finish]);

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
                className="font-mono block text-6xl font-medium tracking-[-0.04em] text-paper sm:text-7xl"
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
          className="h-0.5 w-32 bg-accent"
          style={{ transformOrigin: "0% 50%" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT }}
        />
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
    </motion.div>
  );
}
