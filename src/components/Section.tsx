import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Section({
  id,
  kicker,
  title,
  children,
  className = "",
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-5 py-24 sm:px-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          {kicker}
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </motion.div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
