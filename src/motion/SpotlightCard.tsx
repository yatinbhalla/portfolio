import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useMotionPrefs } from "./context";

/**
 * Soft glow that tracks the cursor across a card.
 *
 * The rect is cached on pointerenter rather than read per pointermove — a
 * getBoundingClientRect on every move is a forced layout. Position is written
 * to MotionValues, so this never triggers a React render. Not mounted at all on
 * coarse pointers or under reduced motion.
 */
export function SpotlightCard({
  children,
  className = "",
  radius = 340,
  color = "rgba(139, 92, 246, 0.14)",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  color?: string;
  /** Keeps semantics intact for self-contained cards. */
  as?: "div" | "article";
}) {
  const { fine, reduced } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const opacity = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;

  if (!fine || reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      data-spotlight
      className={`spotlight-host relative ${className}`}
      onPointerEnter={() => {
        rect.current = ref.current?.getBoundingClientRect() ?? null;
        opacity.set(1);
      }}
      onPointerMove={(e) => {
        const r = rect.current;
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => opacity.set(0)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{ background, opacity }}
      />
      {children}
    </Tag>
  );
}
