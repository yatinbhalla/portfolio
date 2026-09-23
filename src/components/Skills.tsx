import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "./Section";
import { skills } from "../data/profile";
import { Compass, Sparkles, Wrench } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { SpotlightCard } from "../motion/SpotlightCard";

const groups = [
  { title: "Product Craft", icon: Compass, items: skills.product },
  { title: "AI & Technical", icon: Sparkles, items: skills.ai },
  { title: "Tools I Work With", icon: Wrench, items: skills.tools },
];

export function Skills() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  // No `once` here: the marquee should stop again every time it leaves the
  // viewport, rather than burning compositor work for the whole session.
  const marqueeVisible = useInView(marqueeRef, { amount: 0 });

  return (
    <Section
      id="skills"
      kicker="Skills & Tools"
      title={
        <>
          The <span className="text-accent-deep">toolkit</span>
        </>
      }
    >
      <StaggerGroup className="grid gap-5 lg:grid-cols-3" stagger={0.1}>
        {groups.map((g) => (
          <StaggerItem key={g.title} hoverLift={6} className="h-full">
            <SpotlightCard className="panel card-hover h-full p-6">
              <div className="flex items-center gap-3">
                <div className="icon-chip h-10 w-10">
                  <g.icon size={19} />
                </div>
                <h3 className="font-semibold text-ink">{g.title}</h3>
              </div>
              <StaggerGroup className="mt-5 flex flex-wrap gap-2" stagger={0.012} amount={0.1}>
                {g.items.map((s) => (
                  <StaggerItem
                    key={s}
                    distance={8}
                    className="tag px-3 py-1.5 text-xs"
                  >
                    {s}
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Tool marquee */}
      <div
        ref={marqueeRef}
        className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
      >
        <div
          className={`marquee-track animate-marquee flex w-max gap-4 ${
            marqueeVisible ? "" : "marquee-paused"
          }`}
        >
          {[...skills.tools, ...skills.tools].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="panel font-mono px-5 py-2 text-xs whitespace-nowrap text-ink-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
