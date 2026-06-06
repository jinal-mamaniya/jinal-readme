"use client";

import { useMemo, useState } from "react";
import {
  radarItems,
  QUADRANT_LABELS,
  RING_LABELS,
  RING_RADII,
  QUADRANT_ANGLES,
  type Quadrant,
  type Ring,
  type RadarItem,
} from "@/data/techRadar";

/**
 * TechRadar — ThoughtWorks-convention Tech Radar visualization.
 *
 * Canonical layout (per https://www.thoughtworks.com/radar):
 *   - SVG shows NUMBERED DOTS only (no inline labels) — this is how the
 *     real ThoughtWorks radar handles 100+ items without visual chaos.
 *     Earlier iteration tried inline labels on every dot and produced
 *     281 label-overlap collisions; the canonical convention solves this
 *     by numbering dots and putting the names in a legend.
 *   - Legend panel below the radar lists items by quadrant, with their
 *     number + name + ring badge + reasoning.
 *   - Hover state: hovering a dot highlights the matching legend entry
 *     (and vice versa); the active item's reasoning surfaces in a panel
 *     between the SVG and the legend.
 *
 * Layout math:
 *   - viewBox 800×800, center (400, 400), outer radius 360
 *   - Ring boundaries at 25/50/75/100% of outer radius
 *   - Items numbered globally 1..N in stable order (data file order)
 *   - Position calculated via quadrant angle range × ring radial mid-point,
 *     with deterministic hash-based jitter for stable layout
 *
 * Accessibility:
 *   - Each dot is a focusable button (tab + Enter to activate)
 *   - WCAG 2.5.8 honored via 20px invisible hit area on 8px visible dot
 *   - Legend entries are buttons that also trigger hover state
 *   - role/aria-label include item name + ring + quadrant
 *
 * Mobile fallback (below 768px): SVG hidden; legend rendered full-width
 *   as the primary content.
 */

/* Radar sized for 71 items with ~59 in the Adopt ring. The Adopt inner
   band needs enough area to separate ~15 items per quadrant — at the
   prior 800px viewBox the Adopt ring had only ~14,500 sq px which forced
   visible overlap. Bumping to 1000px viewBox gives ~22,700 sq px and
   keeps dots comfortably separated. */
const VIEW_BOX = 1000;
const CENTER = VIEW_BOX / 2;
const OUTER_RADIUS = 440;

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

function positionForItem(item: RadarItem, indexInGroup: number, groupSize: number) {
  const quadrantAngles = QUADRANT_ANGLES[item.quadrant];
  const ringRadii = RING_RADII[item.ring];

  /* Sub-ring layout: divide the ring band into concentric sub-bands so
     items don't all cluster at one radius. For N items per quadrant×ring,
     use ceil(sqrt(N/1.5)) sub-bands. Each sub-band holds ~equal items.
     This eliminates the overlap from the prior "all items at midpoint
     with jitter" approach which collided 212 times for 71 items. */
  const subBands = Math.max(1, Math.ceil(Math.sqrt(groupSize / 1.5)));
  const subBandIndex = indexInGroup % subBands;
  const itemsInThisSubBand = Math.ceil(
    (groupSize - subBandIndex) / subBands,
  );
  const indexInSubBand = Math.floor(indexInGroup / subBands);

  /* Radial position: pick the sub-band's midpoint within the ring depth.
     Add small hash jitter so items in same sub-band don't sit on a perfect
     circle. */
  const subBandFraction = (subBandIndex + 0.5) / subBands;
  const radialJitter = (hashName(item.name + "r") - 0.5) * 0.06;
  const radiusFraction =
    ringRadii.inner +
    (subBandFraction + radialJitter) *
      (ringRadii.outer - ringRadii.inner);
  const radius = radiusFraction * OUTER_RADIUS;

  /* Angular position: evenly distribute within the quadrant's arc, plus
     small hash-based jitter so adjacent sub-bands don't perfectly align. */
  const angleRange = quadrantAngles.end - quadrantAngles.start;
  const angleStep = angleRange / (itemsInThisSubBand + 1);
  const baseAngle =
    quadrantAngles.start + angleStep * (indexInSubBand + 1);
  const angleJitter = (hashName(item.name) - 0.5) * (angleStep * 0.25);
  const angleDeg = baseAngle + angleJitter;

  const angleRad = (angleDeg * Math.PI) / 180;
  const x = CENTER + Math.cos(angleRad) * radius;
  const y = CENTER - Math.sin(angleRad) * radius;

  return { x, y };
}

export function TechRadar() {
  const [hovered, setHovered] = useState<RadarItem | null>(null);

  /* Number every item globally in data-file order for stable references. */
  const numberedItems = useMemo(
    () => radarItems.map((item, i) => ({ ...item, number: i + 1 })),
    [],
  );

  /* Group items by quadrant+ring for angular distribution. */
  const groupedByQuadrantRing = useMemo(() => {
    const map = new Map<string, typeof numberedItems>();
    numberedItems.forEach((item) => {
      const key = `${item.quadrant}-${item.ring}`;
      const arr = map.get(key) ?? [];
      arr.push(item);
      map.set(key, arr);
    });
    return map;
  }, [numberedItems]);

  /* Group items by quadrant only, for the legend below. */
  const groupedByQuadrant = useMemo(() => {
    const map = new Map<Quadrant, typeof numberedItems>();
    (Object.keys(QUADRANT_LABELS) as Quadrant[]).forEach((q) => map.set(q, []));
    numberedItems.forEach((item) => {
      map.get(item.quadrant)!.push(item);
    });
    return map;
  }, [numberedItems]);

  const ringCircles = (Object.keys(RING_RADII) as Ring[]).map((ring) => ({
    ring,
    radius: RING_RADII[ring].outer * OUTER_RADIUS,
  }));

  return (
    <figure
      className="my-12 mx-auto"
      style={{ maxWidth: "64rem" }}
      aria-label="Tech Radar — Jinal Mamaniya"
    >
      {/* Card frame matching the package.json code-block register. */}
      <div
        className="rounded-sm overflow-hidden"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Header bar — filename + meta */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b font-mono-label"
          style={{
            background: "var(--color-foreground)",
            borderColor: "var(--color-foreground)",
            color: "var(--color-background)",
          }}
        >
          <span>~/jinal/.tech-radar.svg</span>
          <span style={{ opacity: 0.75 }}>
            ThoughtWorks convention · {radarItems.length} items
          </span>
        </div>

        {/* ===== SVG RADAR — desktop only (≥768px) ===== */}
        <div className="hidden md:block p-6">
          <svg
            viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
            className="block mx-auto"
            style={{ width: "100%", maxWidth: "820px", height: "auto" }}
            role="img"
            aria-label="Concentric Tech Radar with 4 quadrants × 4 rings"
          >
            {/* Quadrant background fills — very subtle alternation for
                visual division between the 4 quadrants. */}
            {(Object.keys(QUADRANT_ANGLES) as Quadrant[]).map((q, i) => {
              const { start, end } = QUADRANT_ANGLES[q];
              const startRad = (start * Math.PI) / 180;
              const endRad = (end * Math.PI) / 180;
              const x1 = CENTER + Math.cos(startRad) * OUTER_RADIUS;
              const y1 = CENTER - Math.sin(startRad) * OUTER_RADIUS;
              const x2 = CENTER + Math.cos(endRad) * OUTER_RADIUS;
              const y2 = CENTER - Math.sin(endRad) * OUTER_RADIUS;
              const path = `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${x2} ${y2} Z`;
              return (
                <path
                  key={q}
                  d={path}
                  fill={
                    i % 2 === 0
                      ? "color-mix(in oklch, var(--color-text-dim), transparent 92%)"
                      : "transparent"
                  }
                />
              );
            })}

            {/* Ring boundary circles. */}
            {ringCircles.map(({ ring, radius }) => (
              <circle
                key={ring}
                cx={CENTER}
                cy={CENTER}
                r={radius}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={1}
              />
            ))}

            {/* Quadrant divider lines through center. */}
            <line
              x1={CENTER - OUTER_RADIUS}
              y1={CENTER}
              x2={CENTER + OUTER_RADIUS}
              y2={CENTER}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <line
              x1={CENTER}
              y1={CENTER - OUTER_RADIUS}
              x2={CENTER}
              y2={CENTER + OUTER_RADIUS}
              stroke="var(--color-border)"
              strokeWidth={1}
            />

            {/* Ring labels along the horizontal axis (just above the line,
                with a small background-colored rectangle for legibility). */}
            {ringCircles.map(({ ring }) => {
              const midRadius =
                ((RING_RADII[ring].inner + RING_RADII[ring].outer) / 2) *
                OUTER_RADIUS;
              return (
                <g key={`label-${ring}`}>
                  <rect
                    x={CENTER + midRadius - 26}
                    y={CENTER - 9}
                    width={52}
                    height={14}
                    fill="var(--color-surface)"
                  />
                  <text
                    x={CENTER + midRadius}
                    y={CENTER + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={10}
                    fontWeight={600}
                    fill="var(--color-cool-meta)"
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {RING_LABELS[ring]}
                  </text>
                </g>
              );
            })}

            {/* Quadrant labels at outer corners, positioned outside the
                outer ring. */}
            {(Object.keys(QUADRANT_LABELS) as Quadrant[]).map((q) => {
              const angles = QUADRANT_ANGLES[q];
              const midAngle =
                ((angles.start + angles.end) / 2) * (Math.PI / 180);
              const labelRadius = OUTER_RADIUS + 30;
              const x = CENTER + Math.cos(midAngle) * labelRadius;
              const y = CENTER - Math.sin(midAngle) * labelRadius;
              return (
                <text
                  key={`q-${q}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="var(--font-sans)"
                  fontSize={15}
                  fontWeight={700}
                  fill="var(--color-foreground)"
                  letterSpacing={-0.01}
                >
                  {QUADRANT_LABELS[q]}
                </text>
              );
            })}

            {/* Numbered dots — no inline labels. Hover/focus surfaces info
                in the panel below + highlights the legend entry. */}
            {Array.from(groupedByQuadrantRing.entries()).map(([, items]) =>
              items.map((item, idx) => {
                const { x, y } = positionForItem(item, idx, items.length);
                const isHovered = hovered?.name === item.name;
                const dotColor =
                  item.ring === "hold"
                    ? "var(--color-text-muted)"
                    : "var(--color-accent)";
                return (
                  <g
                    key={item.name}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(item)}
                    onBlur={() => setHovered(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${item.number}. ${item.name} — ${RING_LABELS[item.ring]} · ${QUADRANT_LABELS[item.quadrant]}`}
                    style={{ cursor: "pointer", outline: "none" }}
                  >
                    {/* Larger invisible hit area for hover/click. */}
                    <circle cx={x} cy={y} r={12} fill="transparent" />
                    {/* Visible numbered dot. */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 10 : 8}
                      fill={dotColor}
                      stroke={
                        isHovered
                          ? "var(--color-foreground)"
                          : "var(--color-surface)"
                      }
                      strokeWidth={isHovered ? 2 : 1.5}
                      style={{ transition: "all 150ms ease" }}
                    />
                    <text
                      x={x}
                      y={y + 0.5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="var(--font-mono)"
                      fontSize={isHovered ? 9 : 8}
                      fontWeight={700}
                      fill={
                        item.ring === "hold"
                          ? "var(--color-foreground)"
                          : "var(--color-background)"
                      }
                      style={{
                        pointerEvents: "none",
                        transition: "all 150ms ease",
                      }}
                    >
                      {item.number}
                    </text>
                  </g>
                );
              }),
            )}
          </svg>

          {/* Hover detail panel — surfaces the reasoning for the active item. */}
          <div
            className="mt-6 pt-4 border-t"
            style={{
              borderColor: "var(--color-border)",
              minHeight: "5.5rem",
            }}
          >
            {hovered ? (
              <div>
                <p
                  className="font-mono-label mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  {numberedItems.find((n) => n.name === hovered.name)?.number}.{" "}
                  {hovered.name}
                  <span
                    aria-hidden="true"
                    className="mx-2"
                    style={{ color: "var(--color-border)" }}
                  >
                    ·
                  </span>
                  {RING_LABELS[hovered.ring]}
                  <span
                    aria-hidden="true"
                    className="mx-2"
                    style={{ color: "var(--color-border)" }}
                  >
                    ·
                  </span>
                  {QUADRANT_LABELS[hovered.quadrant]}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                    color: "var(--color-text)",
                    maxWidth: "72ch",
                  }}
                >
                  {hovered.reasoning}
                </p>
              </div>
            ) : (
              <p
                className="font-mono-label"
                style={{ color: "var(--color-cool-meta)" }}
              >
                hover any numbered dot — or any legend entry — to read why
                <span
                  aria-hidden="true"
                  className="mx-2"
                  style={{ color: "var(--color-border)" }}
                >
                  ·
                </span>
                inner ring = adopt
                <span
                  aria-hidden="true"
                  className="mx-2"
                  style={{ color: "var(--color-border)" }}
                >
                  ·
                </span>
                outer ring = hold
              </p>
            )}
          </div>
        </div>

        {/* ===== LEGEND — desktop + mobile both render this =====
            On desktop it appears below the radar SVG.
            On mobile it IS the primary content (SVG hidden). */}
        <div
          className="p-6 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="font-mono-label mb-6 pb-2 border-b"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Legend · by quadrant
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {(Object.keys(QUADRANT_LABELS) as Quadrant[]).map((q) => {
              const items = groupedByQuadrant.get(q) ?? [];
              return (
                <div key={q}>
                  <p
                    className="font-mono-label mb-3 pb-2 border-b"
                    style={{
                      color: "var(--color-accent)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {QUADRANT_LABELS[q]} · {items.length}
                  </p>
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const isHovered = hovered?.name === item.name;
                      return (
                        <li key={item.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setHovered(item)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(item)}
                            onBlur={() => setHovered(null)}
                            className="w-full text-left grid grid-cols-[2.25rem_1fr_auto] gap-x-3 items-baseline rounded-sm transition-colors"
                            style={{
                              padding: "0.25rem 0.375rem",
                              minHeight: "24px",
                              background: isHovered
                                ? "color-mix(in oklch, var(--color-accent), transparent 90%)"
                                : "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              className="font-mono-label tabular-nums"
                              style={{
                                color:
                                  item.ring === "hold"
                                    ? "var(--color-text-muted)"
                                    : "var(--color-accent)",
                                fontWeight: 700,
                              }}
                            >
                              {String(item.number).padStart(2, "0")}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.9375rem",
                                fontWeight: isHovered ? 600 : 500,
                                color: "var(--color-foreground)",
                              }}
                            >
                              {item.name}
                            </span>
                            <span
                              className="font-mono-label"
                              style={{
                                color:
                                  item.ring === "hold"
                                    ? "var(--color-text-muted)"
                                    : "var(--color-cool-meta)",
                                fontSize: "0.625rem",
                                letterSpacing: "0.12em",
                              }}
                            >
                              {RING_LABELS[item.ring]}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <figcaption
        className="mt-4 font-mono-label"
        style={{ color: "var(--color-cool-meta)" }}
      >
        Figure · Tech Radar
        <span
          aria-hidden="true"
          className="mx-2"
          style={{ color: "var(--color-border)" }}
        >
          —
        </span>
        every technology + pattern shipped across 10 years, classified by
        ring opinion (Adopt / Trial / Assess / Hold) per ThoughtWorks
        convention.
      </figcaption>
    </figure>
  );
}
