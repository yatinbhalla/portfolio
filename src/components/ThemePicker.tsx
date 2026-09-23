import { useEffect, useState } from "react";

/**
 * Palette preview switcher.
 *
 * Only mounts when the URL carries ?themes=1, so it is completely inert for a
 * normal visitor while still being usable on the live site. It writes data-theme
 * on <html>; every palette lives in index.css as token overrides.
 *
 * Temporary: remove this component, its mount in App, and the query gate once a
 * palette is chosen and promoted to the default.
 */
const THEMES = [
  { id: "", label: "Bone & Ember", swatch: ["#f4f1ea", "#14120e", "#ff4a1c"] },
  { id: "cobalt", label: "Porcelain & Cobalt", swatch: ["#eff1f2", "#0f1317", "#1b45ff"] },
  { id: "oxblood", label: "Newsprint & Oxblood", swatch: ["#edeae3", "#171410", "#9e2b25"] },
  { id: "pine", label: "Sand & Pine", swatch: ["#f0ede4", "#161814", "#1f5c3d"] },
];

const STORAGE_KEY = "yb:theme";

export function ThemePicker() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("themes");
  });
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) ?? "";
      setActive(saved);
    } catch {
      /* private mode */
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    if (active) root.setAttribute("data-theme", active);
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem(STORAGE_KEY, active);
    } catch {
      /* private mode */
    }
  }, [enabled, active]);

  if (!enabled) return null;

  return (
    <div className="panel fixed right-4 bottom-4 z-[90] p-3 shadow-lg">
      <p className="font-mono text-[10px] tracking-[0.18em] text-ink-500 uppercase">Palette</p>
      <div className="mt-3 flex flex-col gap-1.5">
        {THEMES.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id || "default"}
              type="button"
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-3 px-2.5 py-2 text-left transition-colors ${
                isActive ? "bg-surface text-ink" : "text-ink-500 hover:text-ink"
              }`}
            >
              <span aria-hidden className="flex shrink-0">
                {t.swatch.map((c) => (
                  <span
                    key={c}
                    className="h-4 w-4 border border-rule"
                    style={{ background: c, marginRight: -1 }}
                  />
                ))}
              </span>
              <span className="font-mono text-[11px] whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
