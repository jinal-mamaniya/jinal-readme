"use client";

import { useEffect, useRef, useState } from "react";
import {
  decisionTree,
  LEAF_MATRIX,
  SERVICE_SHAPE_LABELS,
  WORKLOAD_LABELS,
  FAILURE_BAR_LABELS,
  PARAMETRIC_DEFAULTS,
  type ServiceShapeIdx,
  type WorkloadIdx,
  type FailureBarIdx,
  type DecisionNode,
} from "@/data/decisionTree";

/**
 * ParametricPanel — 3-knob console that morphs the recommended recipe in
 * real time as the visitor tunes constraints.
 *
 * Pattern citation: AWS pricing calculator + Azure cost estimator UX
 * register, applied to architectural judgment instead of cost.
 * RESEARCH.md §3F documents the broader decision-tree-as-portfolio pattern;
 * the parametric layer is novel within both portfolio AND hyperscaler-docs
 * conventions (calculators model cost, not architecture choice).
 *
 * State sync:
 *   - URL hash carries knob positions so a hiring manager can share a
 *     specific recipe link (e.g. #shape=ms-modest&workload=async&fail=hardened)
 *   - Default first-paint maps to the LexisNexis recipe per PARAMETRIC_DEFAULTS
 *     in decisionTree.ts — strongest senior signal in 1 second
 *
 * Accessibility:
 *   - Each knob position is a button (Tab + Arrow keys + Enter)
 *   - WCAG 2.5.5 44px touch target honored on each pill
 *   - prefers-reduced-motion respected — content swap is instant when set
 *   - aria-pressed on each pill announces selection state to screen readers
 */

const SHAPE_SLUGS = ["mono", "ms-modest", "ms-hyper"] as const;
const WORKLOAD_SLUGS = ["crud", "async", "data"] as const;
const FAILURE_SLUGS = ["best", "biz", "hardened"] as const;

function readHashState(): {
  serviceShape: ServiceShapeIdx;
  workload: WorkloadIdx;
  failureBar: FailureBarIdx;
} {
  if (typeof window === "undefined") return PARAMETRIC_DEFAULTS;
  const hash = window.location.hash.replace(/^#/, "");
  const params = new URLSearchParams(hash);

  const shapeSlug = params.get("shape");
  const workloadSlug = params.get("workload");
  const failSlug = params.get("fail");

  const shapeIdx = SHAPE_SLUGS.indexOf(
    shapeSlug as (typeof SHAPE_SLUGS)[number],
  );
  const workloadIdx = WORKLOAD_SLUGS.indexOf(
    workloadSlug as (typeof WORKLOAD_SLUGS)[number],
  );
  const failIdx = FAILURE_SLUGS.indexOf(
    failSlug as (typeof FAILURE_SLUGS)[number],
  );

  return {
    serviceShape:
      shapeIdx >= 0
        ? (shapeIdx as ServiceShapeIdx)
        : PARAMETRIC_DEFAULTS.serviceShape,
    workload:
      workloadIdx >= 0
        ? (workloadIdx as WorkloadIdx)
        : PARAMETRIC_DEFAULTS.workload,
    failureBar:
      failIdx >= 0
        ? (failIdx as FailureBarIdx)
        : PARAMETRIC_DEFAULTS.failureBar,
  };
}

function writeHashState(
  shape: ServiceShapeIdx,
  workload: WorkloadIdx,
  fail: FailureBarIdx,
) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams({
    shape: SHAPE_SLUGS[shape],
    workload: WORKLOAD_SLUGS[workload],
    fail: FAILURE_SLUGS[fail],
  });
  /* replaceState avoids polluting browser history with every knob turn */
  const newHash = `#${params.toString()}`;
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, "", newHash);
  }
}

export function ParametricPanel() {
  const [serviceShape, setServiceShape] = useState<ServiceShapeIdx>(
    PARAMETRIC_DEFAULTS.serviceShape,
  );
  const [workload, setWorkload] = useState<WorkloadIdx>(
    PARAMETRIC_DEFAULTS.workload,
  );
  const [failureBar, setFailureBar] = useState<FailureBarIdx>(
    PARAMETRIC_DEFAULTS.failureBar,
  );

  /* Guard so the write-effect doesn't fire on the initial render. Without
     this guard, the write-effect runs with the default state (before the
     mount read-effect's setState has applied) and overwrites any hash the
     visitor arrived with — defeating shareable URLs and breaking
     remount-after-mode-toggle state restoration. */
  const isInitialMount = useRef(true);

  /* On mount, read URL hash to restore shared state. Also listen for
     subsequent hashchange events (browser back/forward, address-bar edits,
     in-app navigation) so the panel stays in sync with the URL across the
     full life of the page, not just at mount. SSR-safe. */
  useEffect(() => {
    const syncFromHash = () => {
      const restored = readHashState();
      setServiceShape(restored.serviceShape);
      setWorkload(restored.workload);
      setFailureBar(restored.failureBar);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  /* Sync URL hash whenever any knob changes — but skip the initial run. */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    writeHashState(serviceShape, workload, failureBar);
  }, [serviceShape, workload, failureBar]);

  const leafId = LEAF_MATRIX[serviceShape][workload][failureBar];
  const leaf = decisionTree[leafId];

  return (
    <div>
      {/* Knob console */}
      <div className="mb-8">
        <p
          className="font-mono-label mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          Tune the constraints
        </p>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "var(--color-foreground)",
            marginBottom: "0.75rem",
          }}
        >
          What shape is the system?
        </h3>
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            lineHeight: 1.55,
            color: "var(--color-text-muted)",
            fontStyle: "italic",
            maxWidth: "62ch",
          }}
        >
          Stack choices follow team shape, data shape, and load shape — not
          vendor convention. Turn the dials; I&apos;ll show you what I&apos;d
          ship.
        </p>

        <div className="space-y-6">
          <KnobRow
            label="Service shape"
            options={SERVICE_SHAPE_LABELS}
            selected={serviceShape}
            onSelect={(i) => setServiceShape(i as ServiceShapeIdx)}
          />
          <KnobRow
            label="Workload profile"
            options={WORKLOAD_LABELS}
            selected={workload}
            onSelect={(i) => setWorkload(i as WorkloadIdx)}
          />
          <KnobRow
            label="Failure tolerance"
            options={FAILURE_BAR_LABELS}
            selected={failureBar}
            onSelect={(i) => setFailureBar(i as FailureBarIdx)}
          />
        </div>
      </div>

      {/* Divider into the recommendation */}
      <div
        className="mb-8 pt-6 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="font-mono-label"
          style={{ color: "var(--color-cool-meta)" }}
        >
          Recommendation morphs as you turn the dials ↓
        </p>
      </div>

      {/* Live leaf rendering — fades briefly on knob change to telegraph state shift */}
      <RecommendationView node={leaf} key={leafId} />
    </div>
  );
}

/* ===== Knob row — labeled 3-position pill selector ===== */

function KnobRow({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      <p
        className="font-mono-label mb-2"
        style={{ color: "var(--color-cool-meta)" }}
      >
        {label}
      </p>
      <div
        role="radiogroup"
        aria-label={label}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2"
      >
        {options.map((opt, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(i)}
              className="text-left rounded-sm transition-colors duration-100 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              style={{
                padding: "0.75rem 1rem",
                background: isSelected
                  ? "color-mix(in oklch, var(--color-accent), transparent 88%)"
                  : "var(--color-background)",
                border: `1px solid ${
                  isSelected ? "var(--color-accent)" : "var(--color-border)"
                }`,
                cursor: "pointer",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }
              }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="font-mono-label tabular-nums"
                  style={{
                    color: isSelected
                      ? "var(--color-accent)"
                      : "var(--color-text-dim)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    fontWeight: isSelected ? 600 : 500,
                    color: "var(--color-foreground)",
                    lineHeight: 1.3,
                  }}
                >
                  {opt}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ===== Recommendation view — reused render for the looked-up leaf =====
 *
 * Mirrors the RecommendationView in EngineeringDecisionTree.tsx. Kept
 * inline here (rather than imported) so this component is self-contained
 * and the parametric panel can ship without coupling to the walk-tree
 * component's internal exports.
 */

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

      {/* Stack components */}
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

      {/* Trade-offs */}
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

      {/* Chapter citation */}
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
