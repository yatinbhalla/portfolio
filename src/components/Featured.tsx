import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Section } from "./Section";
import { featured, type FeaturedProject } from "../data/profile";
import { ExternalLink, Github, TrendingUp } from "lucide-react";
import { useMotionPrefs } from "../motion/context";
import { SpotlightCard } from "../motion/SpotlightCard";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { SCENE } from "../motion/tokens";

/**
 * Scene A: the project cards stack.
 *
 * Each card is its own sticky <li>, so the scene's scroll cost is the sum of the
 * card heights rather than a fixed multiple of viewport height — it self-regulates
 * instead of ballooning the page. The li's padding-bottom is the dwell dial: the
 * next card slides over that invisible region while this card stays pinned.
 *
 * Cards must be opaque here. The translucent .panel surface reads as mush the
 * moment two cards overlap, so the stack uses .panel-solid.
 */

function CardBody({ p }: { p: FeaturedProject }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{p.name}</h3>
          <p className="mt-1 text-sm font-medium" style={{ color: p.accent }}>
            {p.headline}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {[p.repo, ...(p.moreRepos ?? [])].map((url) => (
            <motion.a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${url.split("/").pop()} repository`}
              title={url.split("/").pop()}
              whileHover={{ y: -3, scale: 1.08 }}
              className="panel rounded-full p-2.5 text-slate-300 transition-colors hover:text-white"
            >
              <Github size={17} />
            </motion.a>
          ))}
          {p.live && (
            <motion.a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} live demo`}
              whileHover={{ y: -3, scale: 1.08 }}
              className="panel rounded-full p-2.5 text-slate-300 transition-colors hover:text-white"
            >
              <ExternalLink size={17} />
            </motion.a>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.description}</p>

      <ul className="mt-5 space-y-2">
        {p.metrics.map((m) => (
          <li key={m} className="flex items-center gap-2 text-sm text-slate-200">
            <TrendingUp size={14} style={{ color: p.accent }} />
            {m}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

/** One sticky card. A separate component because it owns its own useScroll. */
function StackCard({ p, index, total }: { p: FeaturedProject; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // 0 when this card pins, 1 once its box has scrolled fully past the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : SCENE.featuredMinScale]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isLast ? 1 : SCENE.featuredMinOpacity],
  );

  return (
    <li
      ref={ref}
      data-stack-item
      className="sticky"
      style={{
        top: `calc(var(--nav-h) + 1.5rem + ${index * SCENE.featuredOffsetPx}px)`,
        paddingBottom: `${SCENE.featuredDwellVh}vh`,
      }}
    >
      <motion.article
        style={{ scale, opacity, transformOrigin: "50% 0%", willChange: "transform" }}
        className="relative overflow-hidden rounded-3xl"
      >
        <SpotlightCard className="panel-solid card-hover rounded-3xl p-7 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-20 blur-3xl"
            style={{ background: p.accent }}
          />
          <div className="relative">
            <CardBody p={p} />
          </div>
        </SpotlightCard>
      </motion.article>
    </li>
  );
}

/**
 * One ambient orb per project, cross-faded by opacity.
 *
 * Six static blurred layers rather than one layer whose colour is interpolated:
 * changing a colour under a 130px blur repaints a large surface every frame,
 * while opacity on a pre-blurred layer is compositor-only.
 */
function AccentOrb({
  accent,
  index,
  total,
  progress,
}: {
  accent: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Clamped into [0, 1] and kept strictly increasing: this range is handed to
  // WAAPI as keyframe offsets by Motion's scroll-driven optimisation.
  const lo = Math.max(0, (index - 0.7) / total);
  const mid = Math.max(lo + 0.0001, index / total);
  const hi = Math.min(1, Math.max(mid + 0.0001, (index + 0.7) / total));
  const opacity = useTransform(progress, [lo, mid, hi], [0, 0.22, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity, background: accent }}
      className="absolute top-[18vh] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[130px]"
    />
  );
}

export function Featured() {
  const { canPin } = useMotionPrefs();
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  return (
    <Section
      id="work"
      kicker="Featured Work"
      title={
        <>
          Products with <span className="text-gradient">receipts</span>
        </>
      }
    >
      {canPin ? (
        <ul ref={listRef} data-stack className="relative">
          {/* Sticky and zero-height: follows the scene without adding layout height. */}
          <li aria-hidden className="pointer-events-none sticky top-0 -z-10 h-0">
            {featured.map((p, i) => (
              <AccentOrb
                key={p.name}
                accent={p.accent}
                index={i}
                total={featured.length}
                progress={scrollYProgress}
              />
            ))}
          </li>

          {featured.map((p, i) => (
            <StackCard key={p.name} p={p} index={i} total={featured.length} />
          ))}

          {/* Tail so the final card dwells before the scene releases. */}
          <li aria-hidden className="h-[22vh]" />
        </ul>
      ) : (
        <StaggerGroup as="ul" className="grid gap-6 lg:grid-cols-2" stagger={0.08}>
          {featured.map((p) => (
            <StaggerItem key={p.name} as="li" hoverLift={6} className="h-full">
              <article className="panel card-hover relative h-full overflow-hidden rounded-3xl p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-15 blur-3xl"
                  style={{ background: p.accent }}
                />
                <div className="relative">
                  <CardBody p={p} />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </Section>
  );
}
