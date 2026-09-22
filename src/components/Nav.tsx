import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { useMotionPrefs } from "../motion/context";
import { useAnchorScroll } from "../motion/useAnchorScroll";
import { useActiveSection } from "../motion/useActiveSection";
import { DUR, EASE_OUT, SPRING_SOFT } from "../motion/tokens";

const links = [
  { href: "#about", label: "About" },
  { href: "#mindset", label: "Mindset" },
  { href: "#work", label: "Featured Work" },
  { href: "#process", label: "How I Think" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { reduced } = useMotionPrefs();
  const { onAnchorClick } = useAnchorScroll();
  const active = useActiveSection(sectionIds);

  const { scrollY } = useScroll();

  // One state flip at the threshold instead of a setState on every scroll frame.
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Chrome density is scroll-linked, so it never involves React at all.
  const padY = useTransform(scrollY, [0, 120], [16, 10]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.md, ease: EASE_OUT }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "glass" : "bg-transparent"
      }`}
    >
      <motion.nav
        style={{ paddingTop: reduced ? 16 : padY, paddingBottom: reduced ? 16 : padY }}
        className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          onClick={(e) => onAnchorClick(e, "#top")}
          className="font-display text-lg font-bold text-white"
        >
          Yatin<span className="text-gradient"> Bhalla</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onAnchorClick(e, l.href)}
                className={`relative py-1 text-sm transition-colors ${
                  isActive ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-violet-400 to-cyan-400"
                    transition={reduced ? { duration: 0 } : { type: "spring", ...SPRING_SOFT }}
                  />
                )}
              </a>
            );
          })}
          <motion.a
            href={profile.resumePath}
            download
            whileHover={reduced ? undefined : { scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
          >
            <Download size={15} /> Resume
          </motion.a>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : DUR.sm, ease: EASE_OUT }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    setOpen(false);
                    onAnchorClick(e, l.href);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={profile.resumePath}
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={15} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
