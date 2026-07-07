import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { XIcon } from "./XIcon";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.x}
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <XIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
