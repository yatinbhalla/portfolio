import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../data/profile";
import { XIcon } from "./XIcon";
import { SectionHeader } from "./Section";
import { useMotionPrefs } from "../motion/context";
import { MagneticButton } from "../motion/MagneticButton";
import { SpotlightCard } from "../motion/SpotlightCard";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";

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
  const { reduced } = useMotionPrefs();
  const ref = useRef<HTMLElement>(null);

  // The accent rule draws itself across the panel as it arrives.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.8, reduced ? 0.8 : 1.15]);
  const orbOpacity = useTransform(scrollYProgress, [0, 1], [reduced ? 0.25 : 0, 0.25]);

  return (
    <section id="contact" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="panel relative overflow-hidden p-10 text-center sm:p-16"
      >
        <motion.div
          aria-hidden
          style={{ scaleX: orbScale, opacity: orbOpacity, transformOrigin: "0% 50%" }}
          className="absolute inset-x-0 top-0 h-0.5 bg-accent"
        />
        <div className="relative">
          <SectionHeader
            kicker="Contact"
            align="center"
            title={
              <>
                Let's build something <span className="text-accent-deep">users love</span>
              </>
            }
          />

          <p className="mx-auto mt-4 max-w-xl text-ink-500">
            Open to AI Product Manager roles. If you want a PM who has run real businesses,
            shipped real AI products, and measures everything — let's talk.
          </p>

          <StaggerGroup
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            stagger={0.06}
          >
            {channels.map((c) => (
              <StaggerItem key={c.label} hoverLift={6}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="block h-full"
                >
                  <SpotlightCard className="panel card-hover flex h-full flex-col items-center gap-2 p-5">
                    <c.icon size={22} className="text-ink-500" />
                    <span className="text-sm font-semibold text-ink">{c.label}</span>
                    <span className="text-xs break-all text-ink-500">{c.value}</span>
                  </SpotlightCard>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <MagneticButton
            href={profile.resumePath}
            download
            className="btn-primary mt-12 px-8 py-4"
          >
            <Download size={18} /> Download Resume (PDF)
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
