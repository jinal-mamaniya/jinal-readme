"use client";

import { useState } from "react";
import {
  decisionTree,
  ROOT_NODE_ID,
  type DecisionNode,
} from "@/data/decisionTree";
import { ParametricPanel } from "./ParametricPanel";
import { StackAtlas } from "./StackAtlas";

/**
 * EngineeringDecisionTree — two-mode console of Jinal's engineering
 * judgment.
 *
 * Mode A · Tune the dials (default)
 *   Parametric panel — 3 knobs (service shape, workload, failure tolerance)
 *   that morph the recommended recipe in real time. AWS-pricing-calculator
 *   UX register applied to architectural judgment. Default knob position
 *   lands on the LexisNexis recipe for headline first-paint signal.
 *
 * Mode B · Walk the tree
 *   Original interactive decision tree — visitor clicks through a scenario,
 *   then a series of decision points, lands on a leaf recommendation.
 *   Surfaces all 21 leaves (parametric covers 13; the qualitative outliers
 *   like the Public-safety family and Single-team CRUD/SP/Doc are
 *   walk-tree-only).
 *
 * Pattern citation (RESEARCH.md §3F):
 *   - Microsoft Azure Well-Architected Framework decision trees
 *   - AWS Well-Architected decision flowcharts
 *   - Google Cloud "choose the right X" decision matrices
 *   - AWS pricing calculator / Azure cost estimator UX (the parametric layer)
 *
 * Zero senior portfolios surveyed in RESEARCH.md §1 use either of these
 * patterns. The parametric+tree combination is novel within both
 * portfolio AND hyperscaler-docs conventions.
 *
 * Rule #15: every question, option, and recommendation in decisionTree.ts
 * traces to resume + LinkedIn + chapter data. No fabricated technical
 * opinions.
 *
 * Accessibility:
 *   - Each control is a button (tab + Enter to activate)
 *   - Knob pills use role="radio" + aria-checked for screen reader state
 *   - WCAG 2.5.5 44px touch targets on all primary controls
 *   - Decision trail breadcrumb has skip-back semantics
 *   - Recommendation panel uses semantic <article> + <h3>/<h4> hierarchy
 */

interface TrailEntry {
  nodeId: string;
  question: string;
  chosenOption: string;
}

type Mode = "atlas" | "parametric" | "walk";

export function EngineeringDecisionTree() {
  /* Default to atlas — the 6-line craft map shows breadth at a glance
     (discipline, data craft, AI-augmented, multiplier, judgment,
     runtime) without requiring interaction. Parametric and walk-tree
     remain available as drill-down modes for visitors who want a
     specific recipe or the narrative interactive walk. */
  const [mode, setMode] = useState<Mode>("atlas");
  const [currentNodeId, setCurrentNodeId] = useState<string>(ROOT_NODE_ID);
  const [trail, setTrail] = useState<TrailEntry[]>([]);

  const node = decisionTree[currentNodeId];
  const isLeaf = !!node.recommendation;
  const isRoot = currentNodeId === ROOT_NODE_ID;

  const handleOptionClick = (option: { label: string; next: string }) => {
    setTrail((prev) => [
      ...prev,
      { nodeId: currentNodeId, question: node.question, chosenOption: option.label },
    ]);
    setCurrentNodeId(option.next);
  };

  const handleReset = () => {
    setCurrentNodeId(ROOT_NODE_ID);
    setTrail([]);
  };

  const handleBack = () => {
    if (trail.length === 0) return;
    const prevTrail = trail.slice(0, -1);
    const prevNodeId = trail[trail.length - 1].nodeId;
    setTrail(prevTrail);
    setCurrentNodeId(prevNodeId);
  };

  const handleBreadcrumbClick = (index: number) => {
    /* Click breadcrumb step N — return to decision at step N. */
    const newTrail = trail.slice(0, index);
    const targetNodeId = trail[index].nodeId;
    setTrail(newTrail);
    setCurrentNodeId(targetNodeId);
  };

  const handleModeChange = (next: Mode) => {
    /* Switching modes resets the walk-tree state so the visitor doesn't
       return mid-walk on toggle. Parametric state lives in its own
       component (URL hash) and is preserved across mode switches. */
    if (next === "walk" && mode !== "walk") {
      setCurrentNodeId(ROOT_NODE_ID);
      setTrail([]);
    }
    setMode(next);
  };

  return (
    <figure className="my-12 mx-auto" style={{ maxWidth: "76rem" }}>
      <div
        className="rounded-sm overflow-hidden"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Header bar — engineering doc register matching /01 package.json */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b font-mono-label"
          style={{
            background: "var(--color-foreground)",
            borderColor: "var(--color-foreground)",
            color: "var(--color-background)",
          }}
        >
          <span>
            ~/jinal/.stack/
            {mode === "atlas"
              ? "atlas.sh"
              : mode === "parametric"
                ? "recommend.sh"
                : "walk-me-through-it.sh"}
          </span>
          <span style={{ opacity: 0.75 }}>
            {mode === "atlas"
              ? "6 lines · craft atlas"
              : mode === "parametric"
                ? "interactive · live tuning"
                : isLeaf
                  ? "interactive · recommended stack"
                  : `interactive · step ${trail.length + 1}`}
          </span>
        </div>

        <div className="p-6 md:p-8">
          {/* Mode toggle — pill selector at the top. Default is parametric. */}
          <ModeToggle mode={mode} onChange={handleModeChange} />

          {mode === "atlas" ? (
            <StackAtlas />
          ) : mode === "parametric" ? (
            <ParametricPanel />
          ) : (
            <>
          {/* Breadcrumb trail of decisions made so far */}
          {trail.length > 0 && (
            <div className="mb-6">
              <p
                className="font-mono-label mb-3"
                style={{ color: "var(--color-cool-meta)" }}
              >
                Decisions so far
              </p>
              <ol className="space-y-1.5">
                {trail.map((entry, i) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span
                      className="font-mono-label tabular-nums"
                      style={{
                        color: "var(--color-accent)",
                        minWidth: "1.5rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleBreadcrumbClick(i)}
                      className="text-left transition-colors rounded-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        color: "var(--color-text)",
                        cursor: "pointer",
                        padding: "2px 4px",
                        minHeight: "24px",
                      }}
                    >
                      <span style={{ color: "var(--color-cool-meta)" }}>
                        {entry.question}
                      </span>
                      <span aria-hidden="true" className="mx-2" style={{ color: "var(--color-border)" }}>
                        →
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "var(--color-foreground)",
                        }}
                      >
                        {entry.chosenOption}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>
          )}

          {/* Current question or recommendation */}
          {!isLeaf ? (
            /* Internal node — show question + options */
            <div>
              <p
                className="font-mono-label mb-2"
                style={{ color: "var(--color-accent)" }}
              >
                {isRoot ? "Start here" : `Step ${trail.length + 1}`}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--color-foreground)",
                  marginBottom: node.subtext ? "0.75rem" : "1.5rem",
                }}
              >
                {node.question}
              </h3>
              {node.subtext && (
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    lineHeight: 1.55,
                    color: "var(--color-text-muted)",
                    fontStyle: "italic",
                    maxWidth: "60ch",
                  }}
                >
                  {node.subtext}
                </p>
              )}
              <ul className="space-y-3">
                {node.options?.map((option, i) => (
                  <li key={i}>
                    <OptionButton
                      label={option.label}
                      blurb={option.blurb}
                      number={i + 1}
                      onClick={() => handleOptionClick(option)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* Leaf node — show recommendation */
            <RecommendationView node={node} />
          )}

          {/* Controls */}
          <div
            className="mt-8 pt-6 border-t flex items-center gap-4 flex-wrap"
            style={{ borderColor: "var(--color-border)" }}
          >
            {trail.length > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 font-mono-label transition-colors rounded-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                style={{
                  color: "var(--color-accent)",
                  cursor: "pointer",
                  padding: "4px 8px",
                  minHeight: "24px",
                }}
              >
                <span aria-hidden="true">←</span>
                <span>back one step</span>
              </button>
            )}
            {trail.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 font-mono-label transition-colors rounded-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                style={{
                  color: "var(--color-cool-meta)",
                  cursor: "pointer",
                  padding: "4px 8px",
                  minHeight: "24px",
                }}
              >
                <span aria-hidden="true">↻</span>
                <span>start over</span>
              </button>
            )}
            {trail.length === 0 && (
              <p
                className="font-mono-label"
                style={{ color: "var(--color-cool-meta)" }}
              >
                click any option above — at the end I&apos;ll show you the stack I&apos;d ship
              </p>
            )}
          </div>
            </>
          )}
        </div>
      </div>

      <figcaption
        className="mt-4 font-mono-label"
        style={{ color: "var(--color-cool-meta)" }}
      >
        Figure · Engineering Decision Tree
        <span
          aria-hidden="true"
          className="mx-2"
          style={{ color: "var(--color-border)" }}
        >
          —
        </span>
        Three lenses on the stack: the atlas (breadth), the dials (live
        recommendation), the tree (the narrative walk). Same data, three
        ways in.
      </figcaption>
    </figure>
  );
}

/* ===== Option button — large click target with hover state ===== */

function OptionButton({
  label,
  blurb,
  number,
  onClick,
}: {
  label: string;
  blurb?: string;
  number: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-sm transition-all duration-150 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      style={{
        padding: "0.875rem 1rem",
        background: "var(--color-background)",
        border: "1px solid var(--color-border)",
        cursor: "pointer",
        minHeight: "44px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-accent)";
        e.currentTarget.style.background =
          "color-mix(in oklch, var(--color-accent), transparent 95%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.background = "var(--color-background)";
      }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono-label tabular-nums"
          style={{
            color: "var(--color-accent)",
            minWidth: "1.5rem",
          }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              fontWeight: 600,
              color: "var(--color-foreground)",
              lineHeight: 1.3,
            }}
          >
            {label}
          </p>
          {blurb && (
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                lineHeight: 1.45,
                color: "var(--color-text-muted)",
                fontStyle: "italic",
              }}
            >
              {blurb}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ===== Recommendation view — the leaf result ===== */

function RecommendationView({ node }: { node: DecisionNode }) {
  const rec = node.recommendation;
  if (!rec) return null;

  return (
    <article>
      <p
        className="font-mono-label mb-2"
        style={{ color: "var(--color-accent)" }}
      >
        Recommended stack
      </p>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "var(--color-foreground)",
          marginBottom: "1rem",
        }}
      >
        {node.question}
      </h3>
      <p
        className="mb-6"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
          lineHeight: 1.55,
          color: "var(--color-text)",
          maxWidth: "68ch",
        }}
      >
        {rec.summary}
      </p>

      {/* Stack components — labeled rows */}
      <div className="mb-8">
        <h4
          className="font-mono-label mb-4 pb-2 border-b"
          style={{
            color: "var(--color-foreground)",
            borderColor: "var(--color-foreground)",
          }}
        >
          Components
        </h4>
        <ul className="space-y-3">
          {rec.components.map((c, i) => (
            <li
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-x-4 gap-y-1"
            >
              <span
                className="font-mono-label"
                style={{
                  color: "var(--color-cool-meta)",
                  alignSelf: "start",
                  paddingTop: "0.125rem",
                }}
              >
                {c.label}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-foreground)",
                    lineHeight: 1.4,
                  }}
                >
                  {c.choice}
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    color: "var(--color-text-muted)",
                    maxWidth: "62ch",
                  }}
                >
                  {c.why}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Trade-offs accepted (ADR convention) */}
      <div className="mb-6">
        <h4
          className="font-mono-label mb-3 pb-2 border-b"
          style={{
            color: "var(--color-foreground)",
            borderColor: "var(--color-foreground)",
          }}
        >
          Trade-offs accepted
        </h4>
        <ul className="space-y-2">
          {rec.tradeOffs.map((t, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-x-3 items-baseline"
            >
              <span
                aria-hidden="true"
                className="font-mono-label"
                style={{ color: "var(--color-text-dim)" }}
              >
                ·
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.55,
                  color: "var(--color-text)",
                  maxWidth: "62ch",
                }}
              >
                {t}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chapter cross-reference */}
      {rec.citation && (
        <div
          className="mt-6 pt-4 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="font-mono-label"
            style={{ color: "var(--color-cool-meta)" }}
          >
            This is the recipe I shipped at{" "}
            <a
              href={rec.citation.href}
              className="font-mono-label transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              style={{
                color: "var(--color-accent)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                minHeight: "24px",
                display: "inline-block",
                padding: "2px 0",
              }}
            >
              {rec.citation.chapter} →
            </a>
          </p>
        </div>
      )}
    </article>
  );
}

/* ===== Mode toggle — pill selector between parametric and walk-tree ===== */

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (next: Mode) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Console mode"
      className="mb-8 inline-flex rounded-sm overflow-hidden flex-wrap"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <ModePill
        label="stack atlas"
        active={mode === "atlas"}
        onClick={() => onChange("atlas")}
      />
      <ModePill
        label="tune the dials"
        active={mode === "parametric"}
        onClick={() => onChange("parametric")}
      />
      <ModePill
        label="walk the tree"
        active={mode === "walk"}
        onClick={() => onChange("walk")}
      />
    </div>
  );
}

function ModePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  /* Inactive pill state contrast bumped: was cool-meta (~4.59 ratio) on
     transparent which read as nearly-invisible next to the strong active
     pill. Now uses --color-text (~13.68 ratio) and a subtle surface
     background so inactive pills read as clear nav controls, just less
     dominant than the active one. */
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className="font-mono-label transition-colors duration-100 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]"
      style={{
        padding: "0.5rem 1rem",
        minHeight: "36px",
        background: active
          ? "var(--color-foreground)"
          : "var(--color-surface)",
        color: active
          ? "var(--color-background)"
          : "var(--color-text)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background =
            "color-mix(in oklch, var(--color-accent), transparent 92%)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "var(--color-surface)";
        }
      }}
    >
      {label}
    </button>
  );
}
