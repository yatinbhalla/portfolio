import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, stats } from "../data/profile";
import { Counter } from "./Counter";
import { XIcon } from "./XIcon";
import { useIntro, useMotionPrefs } from "../motion/context";
import { MagneticButton } from "../motion/MagneticButton";
import { SpotlightCard } from "../motion/SpotlightCard";
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

  const to = (v: number) => (reduced ? 0 : v);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, to(110)]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.25]);
  const orbAY = useTransform(scrollYProgress, [0, 1], [0, to(180)]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [0, to(-120)]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, to(-60)]);
  // Capped at 0.25, never 0: a slow skimmer should not watch the headline vanish.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.25]);
  const contentScale = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.97]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, reduced ? 1 : 0]);

  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.x, label: "X (Twitter)", Icon: XIcon },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      {/* Parallax sits on the outer element so the CSS float animation on the inner
          one is not overwritten by Motion's transform. */}
      <motion.div style={{ y: gridY, opacity: gridOpacity }} className="absolute inset-0">
        <div className="bg-grid absolute inset-0" />
      </motion.div>
      <motion.div style={{ y: orbAY }} className="absolute -top-32 left-1/4">
        <div className="animate-float h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      </motion.div>
      <motion.div style={{ y: orbBY }} className="absolute top-1/3 right-1/5">
        <div
          className="animate-float h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]"
          style={{ animationDelay: "-4s" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent(reduced ? 0 : 0.07, heroDelay)}
        >
          <motion.div variants={slideItem("up", reduced ? 0 : 16)}>
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to AI PM roles
            </div>
          </motion.div>

          {/*
            FROZEN: the inline-grid plus invisible sizing copies keep this box sized
            to the longest rotating title. Two past commits exist purely to fix
            clipping here. Animate around it, never inside it.
          */}
          <motion.h1
            variants={slideItem("up", reduced ? 0 : 24)}
            className="font-display mt-6 text-3xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I'm {profile.name.split(" ")[0]} —
            <br />
            <span className="inline-grid max-w-full overflow-hidden align-bottom">
              {/* Invisible copies of every title keep the box sized to the longest one */}
              {profile.rotatingTitles.map((t) => (
                <span key={t} aria-hidden className="invisible whitespace-nowrap [grid-area:1/1]">
                  {t}
                </span>
              ))}
              <AnimatePresence mode="wait">
                {/* Declares variants rather than raw objects: this span sits inside
                    the hero's variant tree and must participate in it, or it would
                    be left sitting at its inherited hidden state. */}
                <motion.span
                  key={titleIdx}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="text-gradient whitespace-nowrap [grid-area:1/1]"
                >
                  {profile.rotatingTitles[titleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            variants={slideItem("up", reduced ? 0 : 20)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={slideItem("up", reduced ? 0 : 20)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#work"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white"
            >
              View Featured Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href={profile.resumePath}
              download
              className="panel card-hover flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
            >
              <Download size={18} /> Resume
            </MagneticButton>
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={label}
                  whileHover={reduced ? undefined : { y: -4, scale: 1.08 }}
                  whileTap={reduced ? undefined : { scale: 0.94 }}
                  className="panel card-hover rounded-full p-3 text-slate-300 hover:text-white"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent(reduced ? 0 : 0.08, heroDelay + (reduced ? 0 : 0.3))}
          className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={slideItem("up", reduced ? 0 : 20)}>
              <SpotlightCard className="panel h-full rounded-2xl p-5">
                <div
                  className="font-display text-gradient text-3xl font-bold sm:text-4xl"
                  aria-label={`${s.value}${s.suffix}`}
                >
                  <Counter target={s.value} />
                  <span aria-hidden="true">{s.suffix}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        aria-hidden
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-600"
        >
          <ChevronDown size={22} />
        </motion.span>
      </motion.div>
    </section>
  );
}
