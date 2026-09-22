import { useRef, useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll, type MotionValue } from "motion/react";

export type SceneApi = {
  /** 0 when the scene pins, 1 when it releases. */
  progress: MotionValue<number>;
  /** Discrete step index, or -1 when the scene is not pinned. */
  active: number;
  steps: number;
  enabled: boolean;
};

/**
 * Sticky-scene shell.
 *
 * A tall wrapper provides the scroll budget and an inner sticky panel holds the
 * frame. offset ["start start", "end end"] reads 0 exactly as sticky engages and
 * 1 exactly as it releases. The discrete index comes from useMotionValueEvent
 * with an early-out, so React renders once per step rather than once per frame.
 *
 * When disabled (mobile, short viewports, reduced motion) it renders the same
 * children with no spacer and no sticky — every step stays in the DOM.
 */
export function ScrollScene({
  sceneId,
  enabled,
  steps,
  stepVh,
  stickyClassName = "",
  fallbackClassName = "",
  children,
}: {
  sceneId: string;
  enabled: boolean;
  steps: number;
  stepVh: number;
  stickyClassName?: string;
  fallbackClassName?: string;
  children: (api: SceneApi) => ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(steps - 1, Math.max(0, Math.floor(p * steps)));
    setActive((prev) => (prev === i ? prev : i));
  });

  if (!enabled) {
    return (
      <div ref={wrapRef} data-scene={sceneId} data-scene-enabled="false">
        <div className={fallbackClassName}>
          {children({ progress: scrollYProgress, active: -1, steps, enabled: false })}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      data-scene={sceneId}
      data-scene-enabled="true"
      style={{ height: `calc(100vh + ${steps * stepVh}vh)` }}
    >
      <div
        data-sticky
        className={`sticky ${stickyClassName}`}
        style={{ top: "var(--nav-h)", willChange: "transform" }}
      >
        {children({ progress: scrollYProgress, active, steps, enabled: true })}
      </div>
    </div>
  );
}
