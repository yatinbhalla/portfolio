import { AnimatePresence, motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { SectionHeader } from "./Section";
import { howIThink } from "../data/profile";
import { useMotionPrefs } from "../motion/context";
import { ScrollScene } from "../motion/ScrollScene";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { EASE_OUT, SCENE, SPRING_SCROLL } from "../motion/tokens";

const steps = howIThink.length;

/**
 * Scene B: the process pins while its six steps advance.
 *
 * Every step stays in the DOM in both the pinned and fallback paths — the scene
 * changes how the steps are revealed, never whether they exist.
 */

type Step = (typeof howIThink)[number];

const heading = (
  <>
    Idea → <span className="text-accent-deep">shipped &amp; measured</span>
  </>
);

function ProcessStep({
  s,
  index,
  progress,
  enabled,
}: {
  s: Step;
  index: number;
  progress: MotionValue<number>;
  enabled: boolean;
}) {
  const start = index / steps;
  const end = (index + 1) / steps;
  const fade = 0.18 / steps;
  const isFirst = index === 0;
  const isLast = index === steps - 1;

  /*
   * Input ranges must stay inside [0, 1] and never decrease. Motion compiles a
   * useTransform driven by scroll progress into a native scroll-driven WAAPI
   * animation, passing this range straight through as keyframe offsets — and
   * WAAPI rejects offsets outside [0, 1], which throws during render.
   *
   * So instead of reaching past the ends to hold the first and last steps open,
   * the edge stops are pinned just inside the range and the output values are
   * flattened to hold.
   */
  const inA = isFirst ? 0 : start - fade;
  const inB = isFirst ? 0.0001 : start + fade;
  const outA = isLast ? 0.9999 : end - fade;
  const outB = isLast ? 1 : end + fade;

  const range = [inA, inB, outA, outB];
  const opacity = useTransform(progress, range, [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]);
  const y = useTransform(progress, range, [isFirst ? 0 : 44, 0, 0, isLast ? 0 : -44]);

  const body = (
    <>
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="panel flex h-10 w-10 items-center justify-center font-mono text-xs font-medium text-ink-500"
        >
          {s.step}
        </span>
        <h3 className="text-xl font-semibold text-ink sm:text-2xl">{s.title}</h3>
      </div>
      <p className="mt-4 leading-relaxed text-ink-500">{s.text}</p>
    </>
  );

  if (!enabled) {
    return (
      <StaggerItem as="li" hoverLift={6} className="h-full">
        <div data-step className="panel card-hover h-full p-6">
          {body}
        </div>
      </StaggerItem>
    );
  }

  return (
    <motion.li
      data-step
      style={{ opacity, y }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <div className="panel-solid p-7 sm:p-9">{body}</div>
    </motion.li>
  );
}

function PinnedScene({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const railScale = useSpring(progress, SPRING_SCROLL);

  return (
    <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div>
        <SectionHeader kicker="How I Think" title={heading} />

        <div className="mt-10 flex items-center gap-5">
          {/* Rail fills as the scene advances. */}
          <div className="relative h-40 w-px bg-rule" aria-hidden>
            <motion.div
              style={{ scaleY: railScale, transformOrigin: "50% 0%" }}
              className="absolute inset-0 w-px bg-accent-deep"
            />
          </div>

          <ol className="space-y-2" aria-hidden>
            {howIThink.map((s, i) => (
              <li key={s.step} className="flex items-center gap-2.5">
                <motion.span
                  animate={{ scale: i === active ? 1.35 : 1, opacity: i === active ? 1 : 0.35 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="block h-1.5 w-1.5 bg-accent"
                />
                <span
                  className={`text-xs tracking-widest transition-colors ${
                    i === active ? "text-ink" : "text-ink-500"
                  }`}
                >
                  {s.step}
                </span>
              </li>
            ))}
          </ol>

          <div
            aria-hidden
            className="text-accent-deep ml-2 overflow-hidden font-mono text-7xl leading-none font-medium tracking-[-0.04em]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="block"
              >
                {howIThink[active]?.step}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ul className="relative h-72">
        {howIThink.map((s, i) => (
          <ProcessStep key={s.step} s={s} index={i} progress={progress} enabled />
        ))}
      </ul>
    </div>
  );
}

export function HowIThink() {
  const { canPin } = useMotionPrefs();

  return (
    <section id="process" className="relative">
      <ScrollScene
        sceneId="process"
        enabled={canPin}
        steps={steps}
        stepVh={SCENE.processStepVh}
        stickyClassName="flex h-[calc(100vh-var(--nav-h))] items-center"
        fallbackClassName="mx-auto max-w-6xl px-5 py-24 sm:px-8"
      >
        {({ progress, active, enabled }) =>
          enabled ? (
            <PinnedScene progress={progress} active={active} />
          ) : (
            <>
              <SectionHeader kicker="How I Think" title={heading} />
              <StaggerGroup
                as="ul"
                className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.07}
              >
                {howIThink.map((s, i) => (
                  <ProcessStep key={s.step} s={s} index={i} progress={progress} enabled={false} />
                ))}
              </StaggerGroup>
            </>
          )
        }
      </ScrollScene>
    </section>
  );
}
