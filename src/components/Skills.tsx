import { Section, Reveal } from "./Section";
import { skills } from "../data/profile";
import { Compass, Sparkles, Wrench } from "lucide-react";

const groups = [
  { title: "Product Craft", icon: Compass, items: skills.product },
  { title: "AI & Technical", icon: Sparkles, items: skills.ai },
  { title: "Tools I Work With", icon: Wrench, items: skills.tools },
];

export function Skills() {
  return (
    <Section
      id="skills"
      kicker="Skills & Tools"
      title={
        <>
          The <span className="text-gradient">toolkit</span>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.1}>
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 text-cyan-300">
                  <g.icon size={19} />
                </div>
                <h3 className="font-display font-semibold text-white">{g.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-violet-400/40 hover:text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Tool marquee */}
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {[...skills.tools, ...skills.tools].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="glass font-display rounded-full px-5 py-2 text-sm whitespace-nowrap text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
