import { useRef } from "react";
import { motion } from "motion/react";
import { Section } from "./Section";
import { certifications, education } from "../data/profile";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { SpotlightCard } from "../motion/SpotlightCard";
import { useParallax } from "../motion/useParallax";

export function Credentials() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // Opposing drift so the two columns read as separate planes.
  const leftY = useParallax(leftRef, { speed: 22 });
  const rightY = useParallax(rightRef, { speed: -22 });

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
        <div ref={leftRef}>
          <motion.div style={{ y: leftY }}>
            <h3 className="font-display mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <GraduationCap size={20} className="text-cyan-300" /> Education
            </h3>
            <StaggerGroup className="space-y-4" stagger={0.1}>
              {education.map((e) => (
                <StaggerItem key={e.title} hoverLift={5}>
                  <SpotlightCard className="panel card-hover rounded-2xl p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display font-semibold text-white">{e.title}</h4>
                      <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-cyan-300">{e.org}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{e.detail}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </motion.div>
        </div>

        <div ref={rightRef}>
          <motion.div style={{ y: rightY }}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-white">
                <Award size={20} className="text-cyan-300" /> Certifications
              </h3>
              <motion.a
                href="https://drive.google.com/drive/folders/1iKwJO7VLUS55F2ivLvSuGxgIRQ0nngXW?usp=sharing"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="panel card-hover flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white"
              >
                View certificates <ExternalLink size={13} />
              </motion.a>
            </div>
            <StaggerGroup className="space-y-4" stagger={0.1}>
              {certifications.map((c) => (
                <StaggerItem key={c.title} hoverLift={5}>
                  <SpotlightCard className="panel card-hover flex items-center gap-4 rounded-2xl p-5">
                    <motion.div
                      whileHover={{ rotate: 6 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 text-cyan-300"
                    >
                      <Award size={19} />
                    </motion.div>
                    <div>
                      <h4 className="font-display font-semibold text-white">{c.title}</h4>
                      <p className="text-sm text-slate-400">
                        {c.org}
                        {c.note && <span className="text-violet-300"> · {c.note}</span>}
                      </p>
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
