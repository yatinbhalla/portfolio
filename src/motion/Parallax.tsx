import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { useParallax } from "./useParallax";

export function Parallax({
  children,
  speed = 60,
  smooth = false,
  className = "",
}: {
  children: ReactNode;
  /** Total px travel across the crossing. Negative drifts the other way. */
  speed?: number;
  smooth?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref, { speed, smooth });
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
