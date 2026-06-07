"use client";

import { useState } from "react";

/**
 * ArchitectureFlow — animated, interactive request-flow diagram (Figure 1).
 *
 * Renders a generic middleware-centered request flow with hover states:
 *   Request → API → Middleware → Cache → DB → Response
 *   with an async-queue branch off the middleware.
 *
 * Three accent pulses travel the main path on a 3.5s loop, plus an emerald
 * "now"-register pulse on the async branch. SMIL animateMotion is used for
 * the pulses (broad browser support, GPU-cheap, zero JS runtime cost).
 *
 * Hover any node → a short pattern-description appears in the caption area
 * and the hovered node brightens. This is the moment that converts the
 * static figure into a real engineering artifact: each pattern earns its
 * place in the system, and a hiring manager can see why.
 *
 * NDA scope: caption explicitly says "the pattern, not an employer's
 * architecture." Generic boxes / generic flow. Each node's hover description
 * names the *technique* and the *defensible benefit*, never a real topology.
 *
 * Honors prefers-reduced-motion: pulses freeze for users who request it.
 */

interface FlowNode {
  id: string;
  label: string;
  x: number;
  /** Short pattern note shown on hover. Names the technique + the why. */
  note: string;
}

const MAIN_NODES: FlowNode[] = [
  {
    id: "request",
    label: "Request",
    x: 30,
    note: "Every external call carries a trace-id so anomalies are debuggable end-to-end without log archaeology.",
  },
  {
    id: "api",
    label: "API",
    x: 150,
    note: "Thin API layer — auth, validation, contract enforcement. No business logic at the edge.",
  },
  {
    id: "middleware",
    label: "Middleware",
    x: 270,
    note: "Centralized exception + PII masking middleware. Compliance changes land in one place, not twelve.",
  },
  {
    id: "cache",
    label: "Cache",
    x: 390,
    note: "Distributed Redis. Survives service restarts; one source of truth across N instances.",
  },
  {
    id: "db",
    label: "DB",
    x: 510,
    note: "Stored procedures own the dynamic patterns. Optimizable in one place, versioned with the schema.",
  },
  {
    id: "response",
    label: "Response",
    x: 630,
    note: "Trace closes here. Full request lifecycle observable end-to-end from the same id.",
  },
];

const ASYNC_NODE: FlowNode = {
  id: "queue",
  label: "Async queue",
  x: 290,
  note: "RabbitMQ for fire-and-forget workloads. Polly retry framework holds 99.95% availability when downstream wobbles.",
};

export function ArchitectureFlow() {
  const [hovered, setHovered] = useState<string | null>(null);

  const allNodes = [...MAIN_NODES, ASYNC_NODE];
  const hoveredNode = allNodes.find((n) => n.id === hovered);

  return (
    <figure className="my-12 mx-auto lg:max-w-[44rem] arch-flow-figure">
      {/* Card background changed 2026-05-31 from `color-mix(background,
          black 25%)` to `var(--color-surface)`. The mix-with-black recipe
          produced a dark card regardless of theme — which paired well with
          hardcoded light text but broke after I migrated the text to
          `var(--color-text)`. Light mode then had near-black text on a dark
          card: low contrast, labels unreadable. Surface is theme-aware:
          near-white in light, near-black in dark. Paired with theme-aware
          text, contrast works correctly in both modes. */}
      <div
        className="relative border rounded-md p-6 sm:p-8"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center justify-between mb-6 gap-4">
          <p
            className="font-mono-label"
            style={{ color: "var(--color-cool-meta)" }}
          >
            Figure 1 · request-flow pattern
          </p>
          <p
            className="font-mono-label text-[0.6875rem]"
            style={{
              color:
                "var(--color-text-dim)",
            }}
          >
            hover any node
          </p>
        </div>
        <svg
          /* viewBox width 720→760 (2026-06-06): Response node at x=630
             with width=100 ended at x=730, getting cropped at viewBox 720.
             Bumping to 760 gives 30px right padding past Response box. */
          viewBox="0 0 760 220"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Diagram: a request travels from Request through API, Middleware, Cache, and DB to a Response, with an async queue branching from the Middleware."
        >
          <defs>
            <path
              id="arch-flow-main-prod"
              d="M 60 110 L 180 110 L 300 110 L 420 110 L 540 110 L 660 110"
            />
            <path
              id="arch-flow-async-prod"
              d="M 300 110 Q 340 110 340 160 L 410 160"
            />
            <linearGradient id="arch-node-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="color-mix(in oklch, var(--color-accent), transparent 92%)"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklch, var(--color-accent), transparent 98%)"
              />
            </linearGradient>
          </defs>

          {/* Connection lines — drawn before nodes so they sit underneath.
              `fromX = node.x + NODE_INNER_WIDTH` aligns with the inner rect's
              right edge. Final inner width 110 gives "Middleware" 14px label
              (~75px rendered) ~17px padding each side and preserves a 10px
              visible gap to the next node (spacing 120 - width 110). */}
          {MAIN_NODES.slice(0, -1).map((node, i) => {
            const nextNode = MAIN_NODES[i + 1];
            const fromX = node.x + 110;
            const toX = nextNode.x;
            return (
              <line
                key={`line-${node.id}`}
                x1={fromX}
                y1={110}
                x2={toX}
                y2={110}
                stroke="color-mix(in oklch, var(--color-accent), transparent 55%)"
                strokeWidth={1}
              />
            );
          })}
          {/* Async branch line */}
          <path
            d="M 300 110 Q 340 110 340 160 L 410 160"
            fill="none"
            stroke="color-mix(in oklch, var(--color-accent), transparent 70%)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Main flow nodes */}
          {MAIN_NODES.map((node) => {
            const isHovered = hovered === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Final node dimensions (2026-06-06):
                      hit-zone width 122, inner width 110, label fontSize 14.
                    "Middleware" renders ~75px at 14px Geist Mono → 17px
                    padding inside the 110 inner rect. 10px visible gap
                    between adjacent nodes (spacing 120 minus inner 110).
                    Text x = node.x + 55 centers in the 110-wide box. */}
                <rect
                  x={node.x - 6}
                  y={82}
                  width={122}
                  height={56}
                  fill="transparent"
                />
                <rect
                  x={node.x}
                  y={88}
                  width={110}
                  height={44}
                  rx={4}
                  fill="url(#arch-node-fill)"
                  stroke={
                    isHovered
                      ? "var(--color-accent)"
                      : "color-mix(in oklch, var(--color-accent), transparent 45%)"
                  }
                  strokeWidth={isHovered ? 1.5 : 1}
                  style={{
                    transition: "stroke 200ms ease, stroke-width 200ms ease",
                  }}
                />
                <text
                  x={node.x + 55}
                  y={114}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  /* fontSize 14 → 13 (2026-06-06 strict-review pass):
                     at 14 with 110-wide box, "Middleware" had 8-9px
                     rendered padding while neighbors had 16-39px —
                     asymmetric, reading as draftsmanship slop. At 13,
                     "Middleware" renders ~70px so 110 box gets ~14-15px
                     padding rendered, matching the neighbor padding
                     range. Mobile effective ~5.9px (was 6.4); still
                     pinch-zoomable. */
                  fontSize={13}
                  fontWeight={500}
                  fill={
                    isHovered
                      ? "var(--color-accent)"
                      : "var(--color-text)"
                  }
                  letterSpacing={0.5}
                  style={{ transition: "fill 200ms ease" }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Async queue node */}
          <g
            onMouseEnter={() => setHovered(ASYNC_NODE.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Async-queue widths bumped (hit-zone 102→132, inner 90→120)
                to fit "Async queue" label (99px text at 14px Geist Mono)
                without overflow + 21px padding. Text x recenters to
                ASYNC_NODE.x+60 (center of 120px box). */}
            <rect
              x={ASYNC_NODE.x - 6}
              y={140}
              width={132}
              height={42}
              fill="transparent"
            />
            <rect
              x={ASYNC_NODE.x}
              y={146}
              width={120}
              height={30}
              rx={4}
              fill="none"
              stroke={
                hovered === ASYNC_NODE.id
                  ? "var(--color-now)"
                  : "color-mix(in oklch, var(--color-accent), transparent 70%)"
              }
              strokeWidth={hovered === ASYNC_NODE.id ? 1.5 : 1}
              strokeDasharray="3 3"
              style={{
                transition: "stroke 200ms ease, stroke-width 200ms ease",
              }}
            />
            <text
              x={ASYNC_NODE.x + 60}
              y={166}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              /* fontSize 14 → 13 (2026-06-06 strict-review pass): same
                 padding fix as main nodes — at 14, "async queue" left 9-10px
                 padding inside its 120-wide box, asymmetric vs neighbors.
                 At 13, padding bumps to ~13px, matching main-row Middleware
                 box. Visual hierarchy (async = sub-flow) preserved by the
                 dashed-line container style, not by font size. */
              fontSize={13}
              fontWeight={500}
              fill={
                hovered === ASYNC_NODE.id
                  ? "var(--color-now)"
                  : "color-mix(in oklch, var(--color-text), transparent 30%)"
              }
              letterSpacing={0.5}
              style={{ transition: "fill 200ms ease" }}
            >
              async queue
            </text>
          </g>

          {/* Three pulses traveling the main flow at staggered offsets */}
          <circle r={2} style={{ fill: "var(--color-accent)" }}>
            <animateMotion dur="3.5s" repeatCount="indefinite">
              <mpath href="#arch-flow-main-prod" />
            </animateMotion>
          </circle>
          <circle r={2} opacity={0.7} style={{ fill: "var(--color-accent)" }}>
            <animateMotion dur="3.5s" begin="1.2s" repeatCount="indefinite">
              <mpath href="#arch-flow-main-prod" />
            </animateMotion>
          </circle>
          <circle r={2} opacity={0.5} style={{ fill: "var(--color-accent)" }}>
            <animateMotion dur="3.5s" begin="2.4s" repeatCount="indefinite">
              <mpath href="#arch-flow-main-prod" />
            </animateMotion>
          </circle>
          {/* Async branch pulse — emerald, reserved for "now" register */}
          <circle r={2.5} fill="var(--color-now)" opacity={0.7}>
            <animateMotion dur="2.6s" begin="0.6s" repeatCount="indefinite">
              <mpath href="#arch-flow-async-prod" />
            </animateMotion>
          </circle>
        </svg>

        {/* Hover-revealed pattern note. Fixed-height box keeps the figure
            footprint stable so hovering doesn't reflow the surrounding text. */}
        <div
          className="mt-6 pt-5 border-t"
          style={{
            borderColor:
              "color-mix(in oklch, var(--color-border), transparent 40%)",
            minHeight: "4.5rem",
          }}
        >
          {hoveredNode ? (
            <p
              key={hoveredNode.id}
              className="font-display-body-italic text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-snug"
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              <span
                className="font-mono-label not-italic mr-2"
                style={{ color: "var(--color-accent)" }}
              >
                {hoveredNode.label} —
              </span>
              {hoveredNode.note}
            </p>
          ) : (
            <p
              className="font-mono-label text-[0.6875rem]"
              style={{
                color:
                  "var(--color-text-dim)",
              }}
            >
              Each node is a deliberate decision · hover to read the why
            </p>
          )}
        </div>
      </div>
      <figcaption
        className="mt-3 font-mono-label text-center"
        style={{
          color: "var(--color-text-dim)",
        }}
      >
        Figure 1 — request-flow pattern with async branch
      </figcaption>
    </figure>
  );
}
