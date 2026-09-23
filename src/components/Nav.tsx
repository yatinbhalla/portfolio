import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
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


  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.md, ease: EASE_OUT }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "glass" : "bg-transparent"
      }`}
    >
      {/* Density flips on a class, not a per-frame motion value: padding is a
          layout property and this boolean only changes twice per page. */}
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-[padding] duration-300 sm:px-8 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => onAnchorClick(e, "#top")}
          className="text-lg font-bold text-ink"
        >
          Yatin<span className="text-accent-deep"> Bhalla</span>
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
                  isActive ? "text-ink" : "text-ink-500 hover:text-accent-deep"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent"
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
            className="btn-primary px-4 py-2.5"
          >
            <Download size={15} /> Resume
          </motion.a>
        </div>

        <button
          className="text-ink lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

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
                  className="px-3 py-2.5 text-sm text-ink-700 hover:bg-surface"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={profile.resumePath}
                download
                className="btn-primary mt-3 justify-center px-4 py-3"
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
