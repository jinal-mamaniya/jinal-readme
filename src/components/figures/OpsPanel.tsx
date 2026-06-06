"use client";

import { useEffect, useState } from "react";

/**
 * OpsPanel — operations dashboard simulation (Figure 2).
 *
 * NDA scope: caption locked to OPD operations · 2015–2021 (TCS / Dow OPD,
 * publicly disclosed via the Dow LOR). The numbers shown — 17K daily users,
 * 650 plants, 13 languages, 75% downtime reduction — are LOR-verified or
 * resume-disclosed. The "simulated visualization" tagging is explicit.
 *
 * The sparkline animates: latency value rolls within a plausible range
 * (118-168ms) every 1.4s, the 60-tick history reflows. This is theater
 * — visualization, not live data — and labeled as such.
 *
 * Honors `prefers-reduced-motion` by freezing the rolling at first paint.
 */
/* Deterministic initial sparkline — sine + secondary harmonic, no random.
   Renders identically on server and client (avoids hydration mismatch).
   Once the rolling interval fires (post-mount, client only), the line
   starts evolving from this seeded baseline. */
const SEED_HISTORY: number[] = Array.from({ length: 60 }, (_, i) =>
  Math.round(142 + Math.sin(i * 0.42) * 7 + Math.sin(i * 0.18) * 4)
);

export function OpsPanel() {
  const [latency, setLatency] = useState(142);
  const [history, setHistory] = useState<number[]>(SEED_HISTORY);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setLatency((prev) => {
        const next = Math.max(
          118,
          Math.min(168, prev + Math.round((Math.random() - 0.5) * 8))
        );
        setHistory((h) => [...h.slice(1), next]);
        return next;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  /* Sparkline path — 60 points mapped to 200×30 viewBox. */
  const sparkPath = (() => {
    const min = 110;
    const max = 175;
    const w = 200;
    const h = 30;
    return history
      .map((v, i) => {
        const x = (i / (history.length - 1)) * w;
        const y = h - ((v - min) / (max - min)) * h;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  })();

  return (
    <figure className="my-12 mx-auto lg:max-w-[44rem]">
      <div
        className="relative border rounded-md overflow-hidden font-mono-meta"
        style={{
          /* Card background made theme-aware 2026-05-31. Was hardcoded
             dark (mix-with-black 25%). Now uses --color-surface so it
             pairs correctly with theme-aware text in both modes. */
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        {/* Header — "all systems operational" + last-sync */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="relative inline-block w-2 h-2 rounded-full"
              style={{ background: "var(--color-now)" }}
            >
              <span
                className="absolute inset-0 rounded-full dot-pulse"
                style={{
                  background:
                    "color-mix(in oklch, var(--color-now), transparent 60%)",
                }}
              />
            </span>
            <span
              className="text-[0.8125rem] tracking-[0.05em]"
              style={{
                color:
                  "var(--color-text-dim)",
              }}
            >
              OPD operations · 2015–2021 · simulated visualization
            </span>
          </div>
          <span
            className="text-[0.75rem] tracking-[0.05em]"
            style={{
              color:
                "var(--color-text-dim)",
            }}
          >
            representative
          </span>
        </div>

        {/* Two metric cells — daily users (static) + downtime trend (with
            sparkline). Stack on mobile: a 120px sparkline + 2-digit ms reading
            doesn't fit beside 'daily users' inside a 327px viewport without
            overflow. On sm+ the two cells sit side-by-side with a vertical
            rule (the original "ops panel" composition). */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="px-5 py-5">
            <p
              className="text-[0.6875rem] uppercase tracking-[0.15em] mb-2"
              style={{ color: "var(--color-cool-meta)" }}
            >
              daily users
            </p>
            <p
              className="book-metric-value text-[clamp(1.25rem,1.6vw,1.5rem)] tabular-nums"
              style={{ color: "var(--color-accent)" }}
            >
              17,000
            </p>
          </div>
          <div className="px-5 py-5">
            <p
              className="text-[0.6875rem] uppercase tracking-[0.15em] mb-2"
              style={{ color: "var(--color-cool-meta)" }}
            >
              latency · 60s sample
            </p>
            <div className="flex items-baseline gap-3">
              <p
                className="book-metric-value text-[clamp(1.25rem,1.6vw,1.5rem)] tabular-nums"
                style={{ color: "var(--color-accent)" }}
              >
                {latency}
                <span
                  className="ml-1 text-[0.875rem]"
                  style={{ color: "var(--color-text-dim)" }}
                >
                  ms
                </span>
              </p>
              <svg
                viewBox="0 0 200 30"
                preserveAspectRatio="none"
                className="w-[120px] h-[24px] flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  d={sparkPath}
                  fill="none"
                  stroke="color-mix(in oklch, var(--color-accent), transparent 30%)"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Static historical metrics row */}
        <div
          className="px-5 py-3 border-t grid grid-cols-3 gap-2 text-[0.75rem]"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div>
            <span style={{ color: "var(--color-cool-meta)" }}>Plants</span>
            <span
              className="ml-1 tabular-nums"
              style={{
                color: "color-mix(in oklch, var(--color-foreground), transparent 15%)",
              }}
            >
              650
            </span>
          </div>
          <div>
            <span style={{ color: "var(--color-cool-meta)" }}>Languages</span>
            <span
              className="ml-1 tabular-nums"
              style={{
                color: "color-mix(in oklch, var(--color-foreground), transparent 15%)",
              }}
            >
              13
            </span>
          </div>
          <div>
            <span style={{ color: "var(--color-cool-meta)" }}>Schedule</span>
            <span
              className="ml-1"
              style={{
                color: "color-mix(in oklch, var(--color-foreground), transparent 15%)",
              }}
            >
              7 days/wk
            </span>
          </div>
        </div>

        {/* Footer — disclosure source + simulated note */}
        <div
          className="px-5 py-3 border-t flex justify-between items-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <span
            className="text-[0.6875rem] tracking-[0.05em]"
            style={{
              color:
                "var(--color-text-dim)",
            }}
          >
            scale and figures publicly disclosed via the Dow LOR (2021)
          </span>
          <span
            className="text-[0.6875rem] tracking-[0.05em]"
            style={{
              color:
                "var(--color-text-dim)",
            }}
          >
            simulated rendering
          </span>
        </div>
      </div>
      <figcaption
        className="mt-3 font-mono-label text-center"
        style={{
          color: "var(--color-text-dim)",
        }}
      >
        Figure 2 — operations dashboard at OPD scale
      </figcaption>
    </figure>
  );
}
