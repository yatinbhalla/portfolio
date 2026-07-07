import { Section, Reveal } from "./Section";
import { howIThink } from "../data/profile";

export function HowIThink() {
  return (
    <Section
      id="process"
      kicker="How I Think"
      title={
        <>
          Idea → <span className="text-gradient">shipped & measured</span>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {howIThink.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <div className="glass font-display flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-gradient">
                {s.step}
              </div>
              <h3 className="font-display mt-4 font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
