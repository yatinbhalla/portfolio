import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, stats } from "../data/profile";
import { Counter } from "./Counter";
import { XIcon } from "./XIcon";
import { useIntro, useMotionPrefs } from "../motion/context";
import { MagneticButton } from "../motion/MagneticButton";
import { EASE_OUT } from "../motion/tokens";
import { slideItem, staggerParent } from "../motion/variants";

export function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const { reduced } = useMotionPrefs();
  const { heroDelay } = useIntro();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return; // static first title; the sizing copies below are retained
    let timer = 0;
    const start = () => {
      timer = window.setInterval(
        () => setTitleIdx((i) => (i + 1) % profile.rotatingTitles.length),
        2600,
      );
    };
    const stop = () => window.clearInterval(timer);
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /*
   * The same MotionValues as before, driving different elements. Parallax is now
   * differential type-layer rates rather than floating blurs — the print
   * equivalent of depth. Nothing blurs.
   */
  const to = (v: number) => (reduced ? 0 : v);
  const baselineY = useTransform(scrollYProgress, [0, 1], [0, to(110)]);
  const baselineOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.25]);
  const stripY = useTransform(scrollYProgress, [0, 1], [0, to(40)]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, to(-120)]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, to(-60)]);
  // Floors at 0.55, not 0.25: on paper a deep fade reads as half-loaded text
  // rather than as something receding into the distance.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.55]);
  const contentScale = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.97]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, reduced ? 1 : 0]);

  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.x, label: "X (Twitter)", Icon: XIcon },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  const meta: [string, string][] = [
    ["Role", profile.role],
    ["Location", profile.location],
    ["Timezone", profile.timezone],
  ];

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ y: baselineY, opacity: baselineOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="bg-baseline absolute inset-0" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-16 sm:px-8">
        <motion.div style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerParent(reduced ? 0 : 0.07, heroDelay)}
            className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10"
          >
            <div className="lg:col-span-8">
              <motion.p
                variants={slideItem("up", reduced ? 0 : 12)}
                className="font-mono text-[11px] font-medium tracking-[0.2em] text-ink-500 uppercase"
              >
                <span
                  aria-hidden
                  className="mr-3 inline-block h-[7px] w-[7px] translate-y-[-1px] bg-accent align-middle"
                />
                Portfolio — {new Date().getFullYear()}
              </motion.p>

              {/*
                FROZEN: the inline-grid plus invisible sizing copies keep this box sized
                to the longest rotating title. Two past commits exist purely to fix
                clipping here. Animate around it, never inside it. It sits deliberately
                at the smaller line-2 size — at the line-1 size it would clip.
              */}
              <motion.h1
                variants={slideItem("up", reduced ? 0 : 24)}
                className="font-display mt-7 text-ink"
              >
                <span className="block text-[clamp(2.75rem,7.2vw,6.5rem)] leading-[0.92] font-normal tracking-[-0.035em]">
                  Hi, I'm {profile.name.split(" ")[0]} —
                </span>
                <span className="mt-2 block text-[clamp(1.875rem,4.6vw,3.75rem)] leading-[1.12] tracking-[-0.02em]">
                  <span className="inline-grid max-w-full overflow-hidden pr-[0.06em] align-bottom">
                    {profile.rotatingTitles.map((t) => (
                      <span
                        key={t}
                        aria-hidden
                        className="invisible whitespace-nowrap [grid-area:1/1]"
                      >
                        {t}
                      </span>
                    ))}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={titleIdx}
                        variants={{
                          hidden: { y: "100%", opacity: 0 },
                          show: { y: 0, opacity: 1 },
                        }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                        className="text-accent-deep whitespace-nowrap [grid-area:1/1]"
                      >
                        {profile.rotatingTitles[titleIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </motion.h1>

              <motion.p
                variants={slideItem("up", reduced ? 0 : 20)}
                className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.65] tracking-[-0.008em] text-ink-700"
              >
                {profile.tagline}
              </motion.p>

              <motion.div
                variants={slideItem("up", reduced ? 0 : 20)}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
              >
                <MagneticButton href="#work" className="btn-primary group px-7 py-4">
                  View Featured Work
                  <ArrowRight
                    size={15}
                    strokeWidth={1.75}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </MagneticButton>

                <MagneticButton href={profile.resumePath} download className="btn-quiet">
                  <Download size={15} strokeWidth={1.75} /> Resume (PDF)
                </MagneticButton>

                <div className="flex items-center gap-5">
                  {socials.map(({ href, label, Icon }) => (
                    <motion.a
                      key={label}
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      aria-label={label}
                      whileHover={reduced ? undefined : { y: -3 }}
                      whileTap={reduced ? undefined : { scale: 0.94 }}
                      className="text-ink-500 transition-colors duration-200 hover:text-accent-deep"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Asymmetric metadata: a light column racing the heavy headline. */}
            <motion.div
              style={{ y: metaY }}
              className="lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-28"
            >
              <motion.dl
                variants={slideItem("up", reduced ? 0 : 16)}
                className="space-y-5 lg:text-right"
              >
                {meta.map(([k, v]) => (
                  <div key={k} className="border-t border-rule pt-3">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-500 uppercase">
                      {k}
                    </dt>
                    <dd className="mt-1.5 font-mono text-[13px] leading-snug tracking-[0.01em] text-ink-700">
                      {v}
                    </dd>
                  </div>
                ))}
                <div className="border-t border-rule pt-3">
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-500 uppercase">
                    Availability
                  </dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-mono text-[13px] tracking-[0.01em] text-ink-700 lg:justify-end">
                    <span aria-hidden className="relative flex h-[6px] w-[6px]">
                      <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-70" />
                      <span className="relative inline-flex h-[6px] w-[6px] bg-accent" />
                    </span>
                    Open to AI PM roles
                  </dd>
                </div>
              </motion.dl>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hairline stat index — the four glass cards are gone. */}
      <motion.div
        style={{ y: stripY }}
        className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8"
      >
        <motion.ul
          initial="hidden"
          animate="show"
          variants={staggerParent(reduced ? 0 : 0.08, heroDelay + (reduced ? 0 : 0.3))}
          className="grid grid-cols-2 border-t border-rule sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              variants={slideItem("up", reduced ? 0 : 16)}
              className="border-b border-rule py-6 sm:border-b-0 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0 sm:[&:nth-child(-n+2)]:border-b-0"
            >
              <span aria-hidden className="font-mono text-[10px] tracking-[0.18em] text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="mt-4 font-mono text-4xl font-medium tabular-nums tracking-[-0.03em] text-ink lg:text-5xl"
                aria-label={`${s.value}${s.suffix}`}
              >
                <Counter target={s.value} />
                <span aria-hidden="true">{s.suffix}</span>
              </div>
              <p className="mt-3 max-w-[22ch] font-mono text-[11px] leading-[1.5] tracking-[0.04em] text-ink-500 uppercase">
                {s.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-ink-500 uppercase">
            Scroll
          </span>
          <motion.span
            animate={reduced ? undefined : { scaleY: [0.25, 1, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 0%" }}
            className="block h-10 w-px bg-ink-300"
          />
        </div>
      </motion.div>
    </section>
  );
}
