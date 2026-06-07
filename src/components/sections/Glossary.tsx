/**
 * Glossary — replaces the book's Index.
 *
 * Real README convention: a glossary of terms with cross-references to
 * where they're discussed. Compositional treatment: section title +
 * lede, then a 3-column grid of terms (file-tree-style cross-refs
 * shown as mono path text). Dotted leaders retained as design rhythm.
 */

/* Each entry maps to its dominant Stack Atlas craft dimension. Renders as
   a small colored dot before the term name — reader can scan "all the
   data terms" or "all the multiplier terms" at a glance, with the atlas
   as the legend. Semantic categorical use per rule #31. */
type AtlasDimension =
  | "discipline"
  | "data"
  | "ai"
  | "multiplier"
  | "judgment"
  | "runtime";

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

const DIMENSION_COLOR: Record<AtlasDimension, string> = {
  discipline: "var(--color-atlas-discipline)",
  data: "var(--color-atlas-data)",
  ai: "var(--color-atlas-ai)",
  multiplier: "var(--color-atlas-multiplier)",
  judgment: "var(--color-atlas-judgment)",
  runtime: "var(--color-atlas-runtime)",
};

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
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
          }}
        >
          Index.md
        </p>
        <h2
          className="col-span-12 lg:col-span-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
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
            fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
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
            <a
              href={e.href}
              className="flex items-baseline gap-3 py-1.5 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              style={{
                color: "var(--color-text)",
              }}
            >
              {/* Dimensional dot — 8px circle in the entry's atlas-dimension
                  color. Aria-label keeps it accessible without cluttering
                  the scan visually. */}
              <span
                aria-label={`Dimension: ${e.dimension}`}
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: DIMENSION_COLOR[e.dimension],
                  flex: "0 0 auto",
                  alignSelf: "center",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.9375rem, 1.05vw, 1rem)",
                  fontWeight: 500,
                  flex: "0 0 auto",
                  transition: "color 200ms ease",
                }}
                className="group-hover:text-accent"
              >
                {e.term}
              </span>
              <span
                aria-hidden="true"
                className="flex-1 border-b border-dotted self-baseline mb-1.5"
                style={{ borderColor: "var(--color-border)" }}
              />
              <span
                className="font-mono-path"
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
