import { Section, Reveal } from "./Section";
import { mindset } from "../data/profile";
import { Briefcase, Hammer, Users, BarChart3, Zap } from "lucide-react";

const icons = {
  briefcase: Briefcase,
  hammer: Hammer,
  users: Users,
  chart: BarChart3,
  zap: Zap,
} as const;

export function Mindset() {
  return (
    <Section
      id="mindset"
      kicker="Traits & Mindset"
      title={
        <>
          How I'm <span className="text-gradient">wired</span>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mindset.map((m, i) => {
          const Icon = icons[m.icon as keyof typeof icons];
          return (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-white">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
