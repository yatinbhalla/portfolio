import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
          <h3 className="text-xl font-bold text-ink sm:text-2xl">{p.name}</h3>
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
              className="panel p-2.5 text-ink-500 transition-colors hover:text-accent-deep"
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
              className="panel p-2.5 text-ink-500 transition-colors hover:text-accent-deep"
            >
              <ExternalLink size={17} />
            </motion.a>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-500">{p.description}</p>

      <ul className="mt-5 space-y-2">
        {p.metrics.map((m) => (
          <li key={m} className="flex items-center gap-2 text-sm text-ink-700">
            <TrendingUp size={14} style={{ color: p.accent }} />
            {m}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <span
            key={t}
            className="tag px-3 py-1 text-xs"
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
        className="relative overflow-hidden "
      >
        <SpotlightCard className="panel-solid card-hover p-7 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1"
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

export function Featured() {
  const { canPin } = useMotionPrefs();

  return (
    <Section
      id="work"
      kicker="Featured Work"
      title={
        <>
          Products with <span className="text-accent-deep">receipts</span>
        </>
      }
    >
      {canPin ? (
        <ul data-stack className="relative">
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
              <article className="panel card-hover relative h-full overflow-hidden p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1"
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
