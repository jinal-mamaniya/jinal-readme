import { DimensionalDot, type AtlasDimension } from "@/components/ui/DimensionalDot";

/**
 * Glossary — replaces the book's Index.
 *
 * Real README convention: a glossary of terms with cross-references to
 * where they're discussed. Compositional treatment: section title +
 * lede, then a 3-column grid of terms (file-tree-style cross-refs
 * shown as mono path text). Dotted leaders retained as design rhythm.
 *
 * Each entry maps to its dominant Stack Atlas craft dimension. Renders as
 * a small colored dot before the term name — reader can scan "all the
 * data terms" or "all the multiplier terms" at a glance, with the atlas
 * as the legend. Semantic categorical use per rule #31. Dot rendered via
 * the shared DimensionalDot primitive (extracted 2026-06-12 from this
 * file's prior inline span).
 */

interface GlossaryEntry {
  term: string;
  ref: string;
  href: string;
  dimension: AtlasDimension;
}

const entries: GlossaryEntry[] = [
  { term: "Bidirectional PII masking", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "discipline" },
  { term: "Caching, distributed Redis", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "runtime" },
  { term: "Clean architecture · 20+ services", ref: "Systems/tcs.md", href: "#systems-tcs", dimension: "judgment" },
  { term: "Database-first approach", ref: "Systems/lti.md", href: "#systems-lti", dimension: "data" },
  { term: "Domain-driven design", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "judgment" },
  { term: "ETL · Excel uploads, schema design", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "data" },
  { term: "GraphQL · Apollo", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "data" },
  { term: "Knowledge transfer · Dow", ref: "Systems/tcs.md", href: "#systems-tcs", dimension: "multiplier" },
  { term: "Letter of Recommendation · Dow", ref: "Maintainer.md", href: "#maintainer", dimension: "multiplier" },
  { term: "Mentorship · code review", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "multiplier" },
  { term: "Northeastern Spotlight", ref: "README.md", href: "#readme", dimension: "multiplier" },
  { term: "Operations Dashboard, Dow", ref: "Systems/tcs.md", href: "#systems-tcs", dimension: "runtime" },
  { term: "Production ops · 17,000 users", ref: "Systems/tcs.md", href: "#systems-tcs", dimension: "runtime" },
  { term: "RabbitMQ · async processing", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "runtime" },
  { term: "Repository · Unit-of-Work", ref: "Systems/motorola.md", href: "#systems-motorola", dimension: "data" },
  { term: "Resilient retry · Polly framework", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "discipline" },
  { term: "Stored procedures over ORM", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "data" },
  { term: "Teaching · Web Design & UX", ref: "README.md", href: "#readme", dimension: "multiplier" },
  { term: "TCS · Dow Chemical", ref: "Systems/tcs.md", href: "#systems-tcs", dimension: "runtime" },
  { term: "Validation · stored procedure", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis", dimension: "data" },
];

export function Glossary() {
  return (
    <section
      id="glossary"
      className="px-6 sm:px-10 pt-40 pb-24 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Section header */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-12">
        {/* Eyebrow full-width row — no col-span-2 overflow at 32px. */}
        <p
          className="col-span-12 font-mono-path"
          style={{
            color: "var(--color-cool-meta)",
            fontSize: "var(--type-eyebrow)",
          }}
        >
          Index.md
        </p>
        <h2
          className="col-span-12 lg:col-span-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--type-h2)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "var(--color-foreground)",
          }}
        >
          Topic index.
        </h2>
        <p
          className="col-span-12 lg:col-span-7 lg:col-start-3 mt-4"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--type-lede)",
            lineHeight: 1.5,
            color: "var(--color-text-muted)",
          }}
        >
          Topics, patterns, and references mentioned in this README,
          cross-referenced to the file where each is discussed.
        </p>
      </div>

      {/* Glossary grid — 2 col, file-tree-style cross-refs. Each entry
          carries a small dimensional dot in its craft-dimension color so
          a reader can scan "all the data terms" or "all the multiplier
          terms" with the Stack Atlas as the legend. */}
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-1.5 max-w-[80rem]">
        {entries.map((e) => (
          <li key={e.term} className="group">
            {/* Stacks on mobile (term, then ref beneath the term text),
                horizontal term ···· ref leader at lg+. The earlier
                single-row layout gave both term and ref flex:0 0 auto,
                so on a 390px viewport a long term + ref exceeded the
                width and the ref clipped off the right edge. */}
            <a
              href={e.href}
              className="flex flex-col lg:flex-row lg:items-baseline gap-x-3 gap-y-0.5 py-1.5 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              style={{
                color: "var(--color-text)",
              }}
            >
              {/* Dimensional dot + term stay together as one row even when
                  the entry stacks on mobile. min-w-0 lets the term wrap
                  rather than overflow. */}
              <span className="inline-flex items-center gap-3 min-w-0 lg:flex-none">
                <DimensionalDot dimension={e.dimension} alignSelf="center" />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.9375rem, 1.05vw, 1rem)",
                    fontWeight: 500,
                    transition: "color 200ms ease",
                  }}
                  className="group-hover:text-accent"
                >
                  {e.term}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="hidden lg:block flex-1 border-b border-dotted self-baseline mb-1.5"
                style={{ borderColor: "var(--color-border)" }}
              />
              <span
                className="font-mono-path pl-[1.25rem] lg:pl-0"
                style={{
                  color: "var(--color-cool-meta)",
                  fontSize: "0.75rem",
                  flex: "0 0 auto",
                }}
              >
                {e.ref}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
