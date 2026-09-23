import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { XIcon } from "./XIcon";
import { Reveal } from "./Section";

const socials = [
  { href: profile.github, label: "GitHub", Icon: Github },
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.x, label: "X (Twitter)", Icon: XIcon },
  { href: "mailto:" + profile.email, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-rule py-10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-sm text-ink-500">
          &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.location}
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, label, Icon }) => (
            <motion.a
              key={label}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={label}
              whileHover={{ y: -3, scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="text-ink-500 transition-colors hover:text-accent-deep"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
