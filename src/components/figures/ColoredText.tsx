import React from "react";
import { KEYWORDS } from "@/data/keywords";
import { type AtlasDimension } from "@/components/ui/DimensionalDot";

/**
 * ColoredText — scan a paragraph string, color documented keywords by
 * their Stack Atlas craft dimension.
 *
 * Why: chapter narratives are dense with tech terms. Coloring keywords
 * lets a reader scan "which dimensions does this chapter exercise" at
 * paragraph speed, with the Stack Atlas legend tying them together.
 *
 * Discipline (rule #31): every color used here maps to one of the six
 * existing `--color-atlas-*` semantic categorical tokens. No new brand
 * accents. Same exemption category as Shiki syntax tokens — these are
 * categorical, not decorative.
 *
 * Phase 2B separation (2026-06-13):
 *   - AtlasDimension imported from DimensionalDot (canonical type)
 *   - KEYWORDS catalog moved to src/data/keywords.ts (content vs view)
 *
 * Maintenance: to add a new colored keyword, edit src/data/keywords.ts —
 * no changes needed in this file. Renderer sorts longest-first so "API
 * gateway" matches before "API"; you don't need to maintain order.
 */

/* Longest first so "API gateway" matches before "API". Sort once at
   module load — not per render. */
const SORTED_KEYWORDS = [...KEYWORDS].sort(
  (a, b) => b.term.length - a.term.length,
);

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface ColoredTextProps {
  text: string;
}

export function ColoredText({ text }: ColoredTextProps) {
  type Match = { start: number; end: number; dimension: AtlasDimension };
  const matches: Match[] = [];
  const matchedTerms = new Set<string>();

  /* First-occurrence-per-paragraph: each documented term colors at
     most once per call. Prevents the same word colored 4 times in one
     paragraph — that read as noisy in mockups. */
  for (const { term, dimension } of SORTED_KEYWORDS) {
    if (matchedTerms.has(term.toLowerCase())) continue;
    /* Word-boundary lookbehind/lookahead: not preceded or followed by
       alphanumeric. Handles ".NET Core" (dot is non-alphanumeric so
       leading boundary passes) and "API gateway" (space boundary)
       without matching "API" inside "RAPID". */
    const regex = new RegExp(
      `(?<![A-Za-z0-9])${escapeRegExp(term)}(?![A-Za-z0-9])`,
      "g",
    );
    const m = regex.exec(text);
    if (m) {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        dimension,
      });
      matchedTerms.add(term.toLowerCase());
    }
  }

  /* Sort by start position, drop any overlaps (earlier-and-longer wins
     since we processed longest-first). */
  matches.sort((a, b) => a.start - b.start);
  const filtered: Match[] = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  /* Build React children — alternating plain-text and colored-span. */
  const children: React.ReactNode[] = [];
  let cursor = 0;
  for (const m of filtered) {
    if (m.start > cursor) children.push(text.slice(cursor, m.start));
    children.push(
      <span
        key={m.start}
        style={{
          color: `var(--color-atlas-${m.dimension})`,
          fontWeight: 500,
        }}
      >
        {text.slice(m.start, m.end)}
      </span>,
    );
    cursor = m.end;
  }
  if (cursor < text.length) children.push(text.slice(cursor));
  return <>{children}</>;
}
