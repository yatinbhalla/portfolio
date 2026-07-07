import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, stats } from "../data/profile";
import { Counter } from "./Counter";
import { XIcon } from "./XIcon";

export function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setTitleIdx((i) => (i + 1) % profile.rotatingTitles.length),
      2600
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="bg-grid absolute inset-0" />
      <div className="animate-float absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div
        className="animate-float absolute top-1/3 right-1/5 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to AI PM roles
          </div>

          <h1 className="font-display mt-6 text-3xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
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
                <motion.span
                  key={titleIdx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-gradient whitespace-nowrap [grid-area:1/1]"
                >
                  {profile.rotatingTitles[titleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              View Featured Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.resumePath}
              download
              className="glass glass-hover flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
            >
              <Download size={18} /> Resume
            </a>
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass glass-hover rounded-full p-3 text-slate-300 hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass glass-hover rounded-full p-3 text-slate-300 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={profile.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="glass glass-hover rounded-full p-3 text-slate-300 hover:text-white"
              >
                <XIcon size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="glass glass-hover rounded-full p-3 text-slate-300 hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                <Counter target={s.value} />
                {s.suffix}
              </div>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
