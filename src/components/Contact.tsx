import { motion } from "motion/react";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../data/profile";
import { XIcon } from "./XIcon";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/yatinbhalla42",
    href: profile.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@yatinbhalla",
    href: profile.github,
    external: true,
  },
  {
    icon: XIcon,
    label: "X",
    value: "@yatinbhalla42",
    href: profile.x,
    external: true,
  },
  {
    icon: Phone,
    label: "Call",
    value: "Tap to call",
    href: `tel:${profile.phone}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
      >
        <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="relative">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-cyan-glow">
            Contact
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            Let's build something <span className="text-gradient">users love</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Open to AI Product Manager roles. If you want a PM who has run real businesses,
            shipped real AI products, and measures everything — let's talk.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="glass glass-hover flex flex-col items-center gap-2 rounded-2xl p-5"
              >
                <c.icon size={22} className="text-cyan-300" />
                <span className="font-display text-sm font-semibold text-white">{c.label}</span>
                <span className="text-xs break-all text-slate-400">{c.value}</span>
              </a>
            ))}
          </div>

          <a
            href={profile.resumePath}
            download
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-3.5 font-semibold text-white transition-transform hover:scale-105"
          >
            <Download size={18} /> Download Resume (PDF)
          </a>
        </div>
      </motion.div>
    </section>
  );
}
