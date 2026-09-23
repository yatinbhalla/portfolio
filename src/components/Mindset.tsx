import type { ReactNode } from "react";
import { Section } from "./Section";
import { mindset, mindsetNote } from "../data/profile";
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

function Cell({ children }: { children: ReactNode }) {
  return (
    <StaggerItem as="li" hoverLift={6} className="h-full">
      {children}
    </StaggerItem>
  );
}

/**
 * Five traits leave an orphan row with a hole in it. The note occupies a sixth
 * cell, and six divides evenly into both the 2-column and 3-column breakpoints —
 * so the block is a complete rectangle at every size, not just on desktop.
 *
 * It sits second-to-last so it lands dead centre of the bottom row on desktop:
 * card · note · card.
 */
const NOTE_INDEX = 4;

export function Mindset() {
  const trait = (m: (typeof mindset)[number]) => {
    const Icon = icons[m.icon as keyof typeof icons];
    return (
      <Cell key={m.title}>
        <SpotlightCard className="panel card-hover h-full p-6">
          <div className="icon-chip h-12 w-12">
            <Icon size={22} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-ink">{m.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.text}</p>
        </SpotlightCard>
      </Cell>
    );
  };

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
        {mindset.slice(0, NOTE_INDEX).map(trait)}

        {/* One ink cell in a field of paper: it completes the grid and breaks the
            card rhythm with typography rather than with another bordered box. */}
        <Cell>
          <div className="bg-ink relative flex h-full flex-col justify-center p-7">
            <div aria-hidden className="bg-accent absolute inset-x-0 top-0 h-1" />
            <p className="font-mono text-[10px] tracking-[0.18em] text-paper/60 uppercase">
              {mindsetNote.eyebrow}
            </p>
            <p className="font-display text-paper mt-4 text-2xl leading-[1.2] tracking-[-0.02em]">
              {mindsetNote.quote}
            </p>
          </div>
        </Cell>

        {mindset.slice(NOTE_INDEX).map(trait)}
      </StaggerGroup>
    </Section>
  );
}
