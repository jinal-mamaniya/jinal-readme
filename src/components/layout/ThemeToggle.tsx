"use client";

import { useEffect, useState } from "react";

/**
 * ThemeToggle — light/dark theme switcher.
 *
 * Sits in the FileTree footer, replacing the prior decorative
 * "main · clean" line. The replacement is deliberate: the old footer
 * cosplayed `git status` output without any function. This one ships
 * actual function (theme persistence + system-preference detection)
 * AND keeps the mono-label register the file tree uses everywhere else.
 *
 * Behavior:
 *   — User toggles light ↔ dark by clicking the inactive label
 *   — Active mode persists to localStorage("theme")
 *   — First load reads localStorage, falls back to prefers-color-scheme
 *   — The anti-FOUC inline script in layout.tsx applies the theme BEFORE
 *     hydration so the first paint is correct. This component then
 *     re-reads localStorage on mount to sync React state.
 *
 * Grounded in RESEARCH.md §2B #4 (dark themes dominate senior dev
 * portfolios) + web research (81.9% tech users use dark mode) + GitHub
 * README convention (which itself ships dark mode).
 */

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export function ThemeToggle() {
  /* Start with "light" on SSR; hydrate to the real preference on mount.
     The anti-FOUC inline script already set the data-theme attribute
     before React loaded, so the user never sees an incorrect first paint. */
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      /* localStorage can throw in private-browsing modes — fail quietly,
         the theme will still apply for the current session. */
    }
  };

  /* Render an aria-hidden placeholder before mount so layout doesn't
     shift when the real toggle hydrates. Mono-label sizing matches. */
  if (!mounted) {
    return (
      <p
        aria-hidden="true"
        className="font-mono-label mt-6 pt-3 border-t opacity-0"
        style={{
          borderColor:
            "color-mix(in oklch, var(--color-text-dim), transparent 75%)",
        }}
      >
        theme: light
      </p>
    );
  }

  /* Theme toggle text bumped from default ~11px mono-label to ~14-16px
     so it's actually findable as a control, not buried meta. Touch
     target still satisfies WCAG 2.5.8 via the 24px min-height on
     buttons below. */
  return (
    <div
      role="group"
      aria-label="Color theme"
      className="font-mono-label mt-6 pt-3 border-t flex items-center gap-1.5"
      style={{
        borderColor:
          "color-mix(in oklch, var(--color-text-dim), transparent 75%)",
        color:
          "color-mix(in oklch, var(--color-text-dim), transparent 30%)",
        fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
        letterSpacing: "0.04em",
      }}
    >
      <span aria-hidden="true">theme:</span>
      {/* Both toggle buttons get min-height: 24px + padding-x to satisfy
          WCAG 2.1 SC 2.5.8 (AA Target Size Minimum, 24x24 CSS px).
          Reference: https://www.w3.org/TR/WCAG21/#target-size-minimum */}
      <button
        type="button"
        onClick={() => apply("light")}
        aria-pressed={theme === "light"}
        aria-label="Switch to light mode"
        className="font-mono-label inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
        style={{
          minHeight: "24px",
          minWidth: "24px",
          padding: "0 4px",
          color:
            theme === "light"
              ? "var(--color-accent)"
              : "color-mix(in oklch, var(--color-text-dim), transparent 30%)",
          textDecoration: theme === "light" ? "underline" : "none",
          textUnderlineOffset: "2px",
          cursor: theme === "light" ? "default" : "pointer",
        }}
      >
        light
      </button>
      <span aria-hidden="true">·</span>
      <button
        type="button"
        onClick={() => apply("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark mode"
        className="font-mono-label inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
        style={{
          minHeight: "24px",
          minWidth: "24px",
          padding: "0 4px",
          color:
            theme === "dark"
              ? "var(--color-accent)"
              : "color-mix(in oklch, var(--color-text-dim), transparent 30%)",
          textDecoration: theme === "dark" ? "underline" : "none",
          textUnderlineOffset: "2px",
          cursor: theme === "dark" ? "default" : "pointer",
        }}
      >
        dark
      </button>
    </div>
  );
}
