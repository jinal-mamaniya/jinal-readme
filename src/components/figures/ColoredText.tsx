import React from "react";

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
 * Maintenance: extend KEYWORDS array as new technical terms appear.
 * Sorted internally so longer terms match before substrings ("API
 * gateway" before "API").
 */

type AtlasDimension =
  | "discipline"
  | "data"
  | "ai"
  | "multiplier"
  | "judgment"
  | "runtime";

const KEYWORDS: Array<{ term: string; dimension: AtlasDimension }> = [
  /* ===== judgment (cobalt) — architectural / design decisions ===== */
  { term: "Domain-driven design", dimension: "judgment" },
  { term: "Repository · Unit-of-Work", dimension: "judgment" },
  { term: "Unit-of-Work", dimension: "judgment" },
  { term: "clean architecture", dimension: "judgment" },
  { term: "micro-frontends", dimension: "judgment" },
  { term: "microservices", dimension: "judgment" },
  { term: "API gateway", dimension: "judgment" },
  { term: "public API", dimension: "judgment" },
  { term: "MVVM", dimension: "judgment" },
  { term: "ADR", dimension: "judgment" },
  { term: "DDD", dimension: "judgment" },

  /* ===== data (teal) — data craft, schema, query language ===== */
  { term: "queries and mutations", dimension: "data" },
  { term: "stored procedures", dimension: "data" },
  { term: "stored procedure", dimension: "data" },
  { term: "Entity Framework", dimension: "data" },
  { term: "EF Core", dimension: "data" },
  { term: "SQL queries", dimension: "data" },
  { term: "SQL Server", dimension: "data" },
  { term: "schema", dimension: "data" },
  { term: "GraphQL", dimension: "data" },
  { term: "Apollo", dimension: "data" },
  { term: "ETL", dimension: "data" },

  /* ===== runtime (slate) — runtimes, infrastructure, async surfaces ===== */
  { term: "distributed Redis", dimension: "runtime" },
  { term: "async processing", dimension: "runtime" },
  { term: "Azure CI/CD", dimension: "runtime" },
  { term: "RabbitMQ", dimension: "runtime" },
  { term: "Kubernetes", dimension: "runtime" },
  { term: ".NET Core", dimension: "runtime" },
  { term: "NodeJS", dimension: "runtime" },
  { term: "Docker", dimension: "runtime" },
  { term: "Redis", dimension: "runtime" },
  { term: "Polly", dimension: "runtime" },
  { term: "Azure", dimension: "runtime" },

  /* ===== discipline (orange) — reliability rigor, error handling ===== */
  { term: "OAuth2.0 / JWT", dimension: "discipline" },
  { term: "exception handling", dimension: "discipline" },
  { term: "circuit breaker", dimension: "discipline" },
  { term: "resilient retry", dimension: "discipline" },
  { term: "test coverage", dimension: "discipline" },
  { term: "PII masking", dimension: "discipline" },
  { term: "validation", dimension: "discipline" },
  { term: "NUnit", dimension: "discipline" },

  /* ===== multiplier (magenta) — people, cross-functional collaboration ===== */
  { term: "DDD workshops", dimension: "multiplier" },
  { term: "Product Owner", dimension: "multiplier" },
  { term: "pair programming", dimension: "multiplier" },
  { term: "knowledge transfer", dimension: "multiplier" },
  { term: "code reviews", dimension: "multiplier" },
  { term: "code review", dimension: "multiplier" },
  { term: "mentorship", dimension: "multiplier" },
  { term: "mentoring", dimension: "multiplier" },
  { term: "architect", dimension: "multiplier" },
  { term: "UX", dimension: "multiplier" },
  { term: "PO", dimension: "multiplier" },
];

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
