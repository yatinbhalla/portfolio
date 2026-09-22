import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMotionPrefs } from "./context";
import { SPRING_MAGNET } from "./tokens";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max px the element leans toward the pointer. */
  strength?: number;
} & Omit<
  ComponentPropsWithoutRef<"a">,
  // Motion owns these names with different signatures.
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onTransitionEnd"
>;

/**
 * Leans toward the pointer and springs back. Renders a plain anchor on touch or
 * under reduced motion — note that any element promoted this way must drop its
 * Tailwind transform classes, since Motion writes transform inline and the CSS
 * hover transform would silently never apply.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 14,
  ...rest
}: MagneticProps) {
  const { fine, reduced } = useMotionPrefs();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MAGNET);
  const sy = useSpring(y, SPRING_MAGNET);

  const active = fine && !reduced;

  return (
    <motion.a
      ref={ref}
      className={className}
      style={active ? { x: sx, y: sy } : undefined}
      whileHover={active ? { scale: 1.04 } : undefined}
      whileTap={active ? { scale: 0.97 } : undefined}
      onPointerMove={
        active
          ? (e) => {
              const el = ref.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              const dx = e.clientX - (r.left + r.width / 2);
              const dy = e.clientY - (r.top + r.height / 2);
              x.set((dx / (r.width / 2)) * strength);
              y.set((dy / (r.height / 2)) * strength);
            }
          : undefined
      }
      onPointerLeave={
        active
          ? () => {
              x.set(0);
              y.set(0);
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </motion.a>
  );
}
