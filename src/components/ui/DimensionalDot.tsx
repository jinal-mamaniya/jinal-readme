/**
 * DimensionalDot — the small atlas-dimension color marker used as a
 * visual continuation of the Stack Atlas legend. Appears in:
 *   - Credentials column eyebrows (Certifications/Education/Awards)
 *   - Glossary entries (per-term dimensional tag)
 *   - SystemFile chapter eyebrows (per-chapter dominant dimension)
 *
 * Extracted 2026-06-12 from 5 inline span definitions that were
 * drifting in size + accessibility props. Now the dot style — size,
 * shape, render — moves from one place. Per CLAUDE.md rule #26
 * (naming is documentation): the component name signals "this is a
 * dimensional marker," not "a 10px circle."
 *
 * Semantic note: these dots are SEMANTIC CATEGORICAL color use per
 * rule #31 — each color = ONE specific atlas dimension, never
 * decorative emphasis. The dimension prop's type union enforces this
 * at the call site.
 */

export type AtlasDimension =
  | "discipline"
  | "data"
  | "ai"
  | "multiplier"
  | "judgment"
  | "runtime";

interface DimensionalDotProps {
  /** Which atlas dimension this dot represents. */
  dimension: AtlasDimension;
  /** Dot diameter in px. Defaults to 8px (Credentials/Glossary scale).
      SystemFile chapter eyebrows use 10px. */
  size?: number;
  /** Screen-reader label. Defaults to "Dimension: {dimension}".
      Pass empty string to render as aria-hidden (decorative). */
  ariaLabel?: string;
  /** Vertical alignment within an inline context. Glossary entries
      use "center" to align with multi-line term text; other callsites
      use default baseline. */
  alignSelf?: "center" | "baseline";
}

const DIMENSION_COLOR: Record<AtlasDimension, string> = {
  discipline: "var(--color-atlas-discipline)",
  data: "var(--color-atlas-data)",
  ai: "var(--color-atlas-ai)",
  multiplier: "var(--color-atlas-multiplier)",
  judgment: "var(--color-atlas-judgment)",
  runtime: "var(--color-atlas-runtime)",
};

export function DimensionalDot({
  dimension,
  size = 8,
  ariaLabel,
  alignSelf,
}: DimensionalDotProps) {
  const isDecorative = ariaLabel === "";
  const label = isDecorative ? undefined : ariaLabel ?? `Dimension: ${dimension}`;
  return (
    <span
      /* role="img" so the aria-label is a permitted attribute — a bare
         <span> has no role, and ARIA prohibits naming a roleless generic
         element (axe: aria-prohibited-attr). Decorative dots stay
         aria-hidden with no role. */
      role={isDecorative ? undefined : "img"}
      aria-hidden={isDecorative || undefined}
      aria-label={label}
      style={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: DIMENSION_COLOR[dimension],
        flex: "0 0 auto",
        ...(alignSelf ? { alignSelf } : {}),
      }}
    />
  );
}
