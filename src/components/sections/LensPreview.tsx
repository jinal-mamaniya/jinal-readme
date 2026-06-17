"use client";

import { useState, useEffect, useId } from "react";
import Link from "next/link";
import type { ProjectView } from "@/data/projects";

/**
 * LensPreview — the interactive six-lens index for the home Showcase.
 *
 * WHY this exists (2026-06-16): the teaser kept wanting "more detail," but the
 * brands it emulates (HYBE / Spotify / Netflix) reach premium through
 * compression + STRUCTURE, never a swelling paragraph. So the six lenses live
 * here as a structured index — one evocative `previewLine` + a live screenshot
 * each — instead of crammed into the lede prose. Attraction comes from MOTION
 * (hover-swap crossfade), IMAGERY (the app's own vivid screenshots — exempt
 * from rule #31's chrome discipline because they're app UI, not portfolio
 * chrome), and BOLD TYPE — not from adding colours. Chrome stays cobalt +
 * mono numerals only.
 *
 * Two idiomatic layouts, both link-based (a row click always navigates — no
 * ambiguous tap states):
 *   • Desktop (lg+): list (left) + one large preview frame (right) that
 *     crossfades to the hovered/focused lens. Pointer + keyboard both drive it.
 *   • Mobile (<lg): a vertical card list, each with its own thumbnail — no
 *     hover dependency, every lens visible at a glance.
 *
 * Each lens deep-links to its full cinematic spread on the detail page
 * (`/projects/bts-evolution#<slug>` — the spreads render `id={view.slug}`).
 *
 * a11y (rule #29): rows are real links with self-describing text; the large
 * desktop preview is decorative supplementary (aria-hidden) since the list
 * links already carry name + line. Crossfade respects prefers-reduced-motion.
 * CLS (rule #28): the preview frame is a fixed-aspect box, so image swaps
 * never reflow.
 */

interface LensPreviewProps {
  views: ProjectView[];
  /** Detail-page base path; each lens links to `${baseHref}#${slug}`. */
  baseHref: string;
}

export function LensPreview({ views, baseHref }: LensPreviewProps) {
  // Only lenses that carry both a previewLine and an image belong in the index.
  const lenses = views.filter((v) => v.previewLine && v.image);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const headingId = useId();

  // Match the codebase's reduced-motion pattern (ArchitectureFlow / OpsPanel):
  // raw matchMedia, instant swaps when the user asks for reduced motion.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  if (lenses.length === 0) return null;

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className="grid grid-cols-12 gap-x-6"
    >
      <div className="col-span-12 lg:col-span-10 lg:col-start-3">
        <p
          id={headingId}
          className="font-mono-label mb-6 pb-2 border-b"
          style={{
            color: "var(--color-foreground)",
            borderColor: "var(--color-foreground)",
          }}
        >
          Six lenses, one dataset
        </p>

        {/* ===== DESKTOP: list + live preview (lg+) ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-x-8 items-start">
          {/* List */}
          <ul className="col-span-5 flex flex-col">
            {lenses.map((lens, i) => {
              const isActive = i === active;
              return (
                <li key={lens.slug}>
                  <Link
                    href={`${baseHref}#${lens.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex gap-4 py-4 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    style={{
                      borderTop:
                        i === 0 ? "none" : "1px solid var(--color-border)",
                    }}
                  >
                    <span
                      className="font-mono-meta pt-1"
                      style={{
                        color: isActive
                          ? "var(--color-accent)"
                          : "var(--color-cool-meta)",
                        transition: "color 200ms",
                        minWidth: "2ch",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          letterSpacing: "-0.015em",
                          lineHeight: 1.2,
                          color: isActive
                            ? "var(--color-foreground)"
                            : "var(--color-text)",
                          transition: "color 200ms",
                        }}
                      >
                        {lens.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.95rem",
                          lineHeight: 1.45,
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {lens.previewLine}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Live preview frame — decorative supplement to the list links. */}
          <div className="col-span-7" aria-hidden="true">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "1.9 / 1",
                border: "1px solid var(--color-border)",
                borderRadius: "2px",
                background: "var(--color-surface)",
              }}
            >
              {lenses.map((lens, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={lens.slug}
                  src={lens.image!.src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transition: reduceMotion ? "none" : "opacity 350ms ease",
                  }}
                />
              ))}
            </div>
            <p
              className="mt-4 font-mono-label"
              style={{ color: "var(--color-cool-meta)" }}
            >
              {lenses[active].image!.caption}
            </p>
          </div>
        </div>

        {/* ===== MOBILE: thumbnail card list (<lg) ===== */}
        <ul className="lg:hidden flex flex-col gap-6">
          {lenses.map((lens, i) => (
            <li key={lens.slug}>
              <Link
                href={`${baseHref}#${lens.slug}`}
                className="group block focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <div
                  className="w-full overflow-hidden mb-3"
                  style={{
                    aspectRatio: "1.9 / 1",
                    border: "1px solid var(--color-border)",
                    borderRadius: "2px",
                    background: "var(--color-surface)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lens.image!.src}
                    alt={lens.image!.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex gap-3 items-baseline">
                  <span
                    className="font-mono-meta"
                    style={{ color: "var(--color-accent)", minWidth: "2ch" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.2,
                        color: "var(--color-foreground)",
                      }}
                    >
                      {lens.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        lineHeight: 1.45,
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {lens.previewLine}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
