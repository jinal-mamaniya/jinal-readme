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
  /* Pass 1 — extract **bold** emphasis markers. Editorial weight-hierarchy
     (RESEARCH.md §2D: "content hierarchy through size and weight"). Opt-in:
     text with no `**` markers is unaffected, so chapter narratives that
     don't use it render exactly as before. We strip the markers and record
     bold ranges in CLEAN-text coordinates, then run keyword matching on the
     clean text so the two systems compose (a colored keyword inside a bold
     phrase gets both color AND weight). */
  const boldRanges: { start: number; end: number }[] = [];
  let cleanText = "";
  {
    const re = /\*\*([\s\S]+?)\*\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      cleanText += text.slice(last, m.index);
      const start = cleanText.length;
      cleanText += m[1];
      boldRanges.push({ start, end: cleanText.length });
      last = re.lastIndex;
    }
    cleanText += text.slice(last);
  }

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
    const m = regex.exec(cleanText);
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

  /* Build a unified set of segment boundaries from every keyword and bold
     edge, then emit one span per run with the combined style. This lets
     color (keyword) and weight (bold) overlap freely without nesting. */
  const cuts = new Set<number>([0, cleanText.length]);
  for (const m of filtered) {
    cuts.add(m.start);
    cuts.add(m.end);
  }
  for (const b of boldRanges) {
    cuts.add(b.start);
    cuts.add(b.end);
  }
  const points = [...cuts].sort((a, b) => a - b);

  const children: React.ReactNode[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (a === b) continue;
    const slice = cleanText.slice(a, b);
    const dim = filtered.find((m) => m.start <= a && m.end >= b)?.dimension;
    const isBold = boldRanges.some((r) => r.start <= a && r.end >= b);
    if (!dim && !isBold) {
      children.push(slice);
      continue;
    }
    children.push(
      <span
        key={a}
        style={{
          ...(dim ? { color: `var(--color-atlas-${dim})` } : {}),
          fontWeight: isBold ? 700 : dim ? 500 : undefined,
        }}
      >
        {slice}
      </span>,
    );
  }
  return <>{children}</>;
}
