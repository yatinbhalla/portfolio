import { Section, Reveal } from "./Section";
import { about } from "../data/profile";
import { Store, Cpu, GraduationCap } from "lucide-react";

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
  return (
    <Section id="about" kicker="About" title={about.heading}>
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="leading-relaxed text-slate-400">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="space-y-4 lg:col-span-2">
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={0.15 + i * 0.1}>
              <div className="glass glass-hover flex gap-4 rounded-2xl p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 text-cyan-300">
                  <m.icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                    {m.period}
                  </p>
                  <h3 className="font-display mt-0.5 font-semibold text-white">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{m.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
