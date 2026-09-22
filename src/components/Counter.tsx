import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useMotionPrefs } from "../motion/context";
import { EASE_OUT } from "../motion/tokens";

/**
 * Count-up driven by a MotionValue: Motion renders the value straight to the DOM,
 * so the whole animation costs zero React renders (the previous rAF + setState
 * version cost ~84 renders per counter).
 *
 * The animated span is aria-hidden and the caller supplies the real label, so
 * assistive tech reads the final figure rather than a stream of numbers.
 */
export function Counter({ target, duration = 1.4 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduced } = useMotionPrefs();

  const count = useMotionValue(reduced ? target : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, target, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, target, duration, count, reduced]);

  return (
    <motion.span ref={ref} aria-hidden="true">
      {rounded}
    </motion.span>
  );
}
