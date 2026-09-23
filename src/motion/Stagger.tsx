import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useMotionPrefs } from "./context";
import { slideItem, staggerParent } from "./variants";

const groupTags = { div: motion.div, ul: motion.ul, section: motion.section };
const itemTags = { div: motion.div, li: motion.li, article: motion.article };

/**
 * One IntersectionObserver for a whole grid, with children entering as a real
 * variant cascade — replaces N independent reveals each carrying a hand-computed
 * delay, which times raggedly when a whole row enters at once.
 */
export function StaggerGroup({
  children,
  stagger = 0.06,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: keyof typeof groupTags;
}) {
  const { reduced } = useMotionPrefs();
  const Tag = groupTags[as];
  const [seen, setSeen] = useState(false);
  /*
   * A latched `animate`, deliberately NOT `whileInView`.
   *
   * whileInView is a gesture: it animates the children that exist at the moment
   * it fires and leaves no standing state behind. Any child mounted afterwards —
   * a "show all" expansion, a changed search result — inherits initial="hidden"
   * with no gesture to pick up, so it stays invisible while still occupying
   * layout. `animate` is a standing variant, so late-mounting children resolve
   * to "show" like everyone else.
   */
  return (
    <Tag
      className={className}
      initial="hidden"
      animate={seen ? "show" : "hidden"}
      viewport={{ once, amount }}
      onViewportEnter={() => setSeen(true)}
      variants={staggerParent(reduced ? 0 : stagger, reduced ? 0 : delayChildren)}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 20,
  as = "div",
  hoverLift = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  as?: keyof typeof itemTags;
  /** Replaces the CSS lift that .card-hover used to own. */
  hoverLift?: number;
}) {
  const { reduced } = useMotionPrefs();
  const Tag = itemTags[as];
  return (
    <Tag
      className={className}
      variants={slideItem(direction, reduced ? 0 : distance)}
      whileHover={hoverLift && !reduced ? { y: -hoverLift } : undefined}
    >
      {children}
    </Tag>
  );
}
