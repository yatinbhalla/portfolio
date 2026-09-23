import { Section } from "./Section";
import { mindset } from "../data/profile";
import { Briefcase, Hammer, Users, BarChart3, Zap } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { SpotlightCard } from "../motion/SpotlightCard";

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
          How I'm <span className="text-accent-deep">wired</span>
        </>
      }
    >
      <StaggerGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {mindset.map((m) => {
          const Icon = icons[m.icon as keyof typeof icons];
          return (
            <StaggerItem key={m.title} as="li" hoverLift={6} className="h-full">
              <SpotlightCard className="panel card-hover h-full p-6">
                <div className="icon-chip h-12 w-12">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.text}</p>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
