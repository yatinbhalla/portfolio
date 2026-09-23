import { useRef } from "react";
import { motion } from "motion/react";
import { Section } from "./Section";
import { about } from "../data/profile";
import { Store, Cpu, GraduationCap } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { SpotlightCard } from "../motion/SpotlightCard";
import { useParallax } from "../motion/useParallax";

const milestones = [
  {
    icon: Store,
    period: "2018 – Present",
    title: "Business Operations Lead & de facto PM",
    text: "Neha Chappal Store · Krishna Handloom · Shree Radhe Trading Co. — ~30% YoY growth, end-to-end P&L, 20+ supplier relationships.",
  },
  {
    icon: Cpu,
    period: "2024 – Present",
    title: "AI Builder",
    text: "20+ AI products shipped 0→1, four in daily production use — billing, catalog automation, creative pipelines, voice AI.",
  },
  {
    icon: GraduationCap,
    period: "2025 – Present",
    title: "PM with Agentic & Generative AI",
    text: "BITSoM × Masai — 90%+ across five consecutive modules, every concept pressure-tested into a shipped tool.",
  },
];

export function About() {
  const proseRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  // The two columns drift against each other by roughly 50px across the crossing.
  const proseY = useParallax(proseRef, { speed: -18 });
  const railY = useParallax(railRef, { speed: 34 });

  return (
    <Section id="about" kicker="About" title={about.heading}>
      <div className="grid gap-12 lg:grid-cols-5">
        <div ref={proseRef} className="lg:col-span-3">
          <motion.div style={{ y: proseY }}>
            <StaggerGroup stagger={0.09} className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <StaggerItem key={i}>
                  <p className="leading-relaxed text-ink-500">{p}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </motion.div>
        </div>

        <div ref={railRef} className="lg:col-span-2">
          <motion.div style={{ y: railY }}>
            <StaggerGroup stagger={0.1} className="space-y-4">
              {milestones.map((m) => (
                <StaggerItem key={m.title} direction="right" hoverLift={5}>
                  <SpotlightCard className="panel card-hover flex gap-4 p-5">
                    <div className="icon-chip h-11 w-11 shrink-0">
                      <m.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-ink-500 uppercase">
                        {m.period}
                      </p>
                      <h3 className="mt-0.5 font-semibold text-ink">{m.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{m.text}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
