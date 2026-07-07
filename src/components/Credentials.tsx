import { Section, Reveal } from "./Section";
import { certifications, education } from "../data/profile";
import { Award, ExternalLink, GraduationCap } from "lucide-react";

export function Credentials() {
  return (
    <Section
      id="credentials"
      kicker="Certificates & Programs"
      title={
        <>
          Learning, <span className="text-gradient">verified</span>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-display mb-5 flex items-center gap-2 text-lg font-semibold text-white">
            <GraduationCap size={20} className="text-cyan-300" /> Education
          </h3>
          <div className="space-y-4">
            {education.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <div className="glass glass-hover rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display font-semibold text-white">{e.title}</h4>
                    <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-cyan-300">{e.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-white">
              <Award size={20} className="text-cyan-300" /> Certifications
            </h3>
            <a
              href="https://drive.google.com/drive/folders/1iKwJO7VLUS55F2ivLvSuGxgIRQ0nngXW?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white"
            >
              View certificates <ExternalLink size={13} />
            </a>
          </div>
          <div className="space-y-4">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={0.1 + i * 0.1}>
                <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 text-cyan-300">
                    <Award size={19} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white">{c.title}</h4>
                    <p className="text-sm text-slate-400">
                      {c.org}
                      {c.note && <span className="text-violet-300"> · {c.note}</span>}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
