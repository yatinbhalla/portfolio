import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMotionPrefs } from "../motion/context";
import { DUR, EASE_OUT, VIEWPORT } from "../motion/tokens";
import { slideItem } from "../motion/variants";

/**
 * Section header: kicker fades in above a gradient rule that draws itself, and
 * the heading rides up out of a mask.
 *
 * The heading is masked as a single block rather than split per word, because
 * `title` is a ReactNode containing a .text-gradient span — splitting arbitrary
 * nodes would break its background-clip.
 */
export function SectionHeader({
  kicker,
  title,
  align = "left",
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const { reduced } = useMotionPrefs();

  return (
    <motion.div
      className={`${align === "center" ? "text-center" : ""} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}
    >
      <motion.p
        variants={slideItem("up", reduced ? 0 : 12)}
        className="font-display text-sm font-semibold tracking-[0.25em] text-cyan-glow uppercase"
      >
        {kicker}
      </motion.p>

      <motion.div
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: DUR.lg, ease: EASE_OUT } },
        }}
        style={{ transformOrigin: align === "center" ? "50% 50%" : "0% 50%" }}
        className={`mt-4 h-px w-24 bg-gradient-to-r from-violet-400 to-cyan-400 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />

      <h2 className="font-display mt-5 overflow-hidden pb-[0.12em] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        <motion.span
          variants={{
            hidden: { y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 },
            show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
          className="block"
        >
          {title}
        </motion.span>
      </h2>
    </motion.div>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
  className = "",
  fullBleed = false,
  padding = "default",
  contentClassName = "mt-12",
  align = "left",
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  /** Drops the centred max-width shell — pinned scenes lay themselves out. */
  fullBleed?: boolean;
  padding?: "default" | "tight" | "none";
  contentClassName?: string;
  align?: "left" | "center";
}) {
  const pad = padding === "none" ? "" : padding === "tight" ? "py-14" : "py-24";
  const shell = fullBleed ? "relative w-full" : "relative mx-auto max-w-6xl px-5 sm:px-8";

  // Never add overflow-hidden here: this is the ancestor of both sticky scenes.
  return (
    <section id={id} className={`${shell} ${pad} ${className}`}>
      <SectionHeader kicker={kicker} title={title} align={align} />
      <div className={contentClassName}>{children}</div>
    </section>
  );
}

/** Single-element reveal. Signature preserved so existing call sites keep working. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 24,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
  amount?: number;
}) {
  const { reduced } = useMotionPrefs();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={slideItem(direction, reduced ? 0 : distance)}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
