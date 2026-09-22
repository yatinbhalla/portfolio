import { Fragment } from "react";
import { motion } from "motion/react";
import { useMotionPrefs } from "./context";
import { maskChild, staggerParent } from "./variants";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type MaskTextProps = {
  /** Plain string only — nested JSX cannot be split safely. */
  children: string;
  /** Explicit lines when mode="lines". Defaults to the whole string as one line. */
  lines?: string[];
  as?: Tag;
  mode?: "words" | "lines";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
};

/**
 * Words (or lines) ride up out of an overflow-hidden mask.
 *
 * Three details that matter: the mask gets bottom padding pulled back by a
 * negative margin so descenders (g, y, p) aren't sliced; real space text nodes
 * sit between words so selecting the heading copies normal text; and the outer
 * element carries aria-label while the span soup is aria-hidden, so screen
 * readers and Ctrl+F see ordinary text.
 */
export function MaskText({
  children,
  lines,
  as: As = "span",
  mode = "words",
  className = "",
  delay = 0,
  stagger,
  once = true,
  amount = 0.4,
}: MaskTextProps) {
  const { reduced } = useMotionPrefs();

  if (reduced) {
    return <As className={className}>{children}</As>;
  }

  const pieces = mode === "lines" ? (lines ?? [children]) : children.split(" ");
  const step = stagger ?? (mode === "lines" ? 0.08 : 0.035);

  return (
    <As className={className} aria-label={children}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
        variants={staggerParent(step, delay)}
        className={mode === "lines" ? "block" : "inline"}
      >
        {pieces.map((piece, i) => (
          <Fragment key={`${piece}-${i}`}>
            <span
              className={`overflow-hidden pb-[0.18em] -mb-[0.18em] ${
                mode === "lines" ? "block" : "inline-block align-bottom"
              }`}
            >
              <motion.span variants={maskChild} className="inline-block">
                {piece}
              </motion.span>
            </span>
            {mode === "words" && i < pieces.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </As>
  );
}
