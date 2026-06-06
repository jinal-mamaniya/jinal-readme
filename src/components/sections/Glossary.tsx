/**
 * Glossary — replaces the book's Index.
 *
 * Real README convention: a glossary of terms with cross-references to
 * where they're discussed. Compositional treatment: section title +
 * lede, then a 3-column grid of terms (file-tree-style cross-refs
 * shown as mono path text). Dotted leaders retained as design rhythm.
 */

interface GlossaryEntry {
  term: string;
  ref: string;
  href: string;
}

const entries: GlossaryEntry[] = [
  { term: "Bidirectional PII masking", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Caching, distributed Redis", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Clean architecture · 20+ services", ref: "Systems/tcs.md", href: "#systems-tcs" },
  { term: "Database-first approach", ref: "Systems/lti.md", href: "#systems-lti" },
  { term: "Domain-driven design", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "ETL · Excel uploads, schema design", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "GraphQL · Apollo", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Knowledge transfer · Dow", ref: "Systems/tcs.md", href: "#systems-tcs" },
  { term: "Letter of Recommendation · Dow", ref: "Maintainer.md", href: "#maintainer" },
  { term: "Mentorship · code review", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Northeastern Spotlight", ref: "README.md", href: "#readme" },
  { term: "Operations Dashboard, Dow", ref: "Systems/tcs.md", href: "#systems-tcs" },
  { term: "Production ops · 17,000 users", ref: "Systems/tcs.md", href: "#systems-tcs" },
  { term: "RabbitMQ · async processing", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Repository · Unit-of-Work", ref: "Systems/motorola.md", href: "#systems-motorola" },
  { term: "Resilient retry · Polly framework", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Stored procedures over ORM", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
  { term: "Teaching · Web Design & UX", ref: "README.md", href: "#readme" },
  { term: "TCS · Dow Chemical", ref: "Systems/tcs.md", href: "#systems-tcs" },
  { term: "Validation · stored procedure", ref: "Systems/lexisnexis.md", href: "#systems-lexisnexis" },
];

export function Glossary() {
  return (
    <section
      id="glossary"
      className="px-6 sm:px-10 py-24 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Section header */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-12">
        <p
          className="col-span-12 lg:col-span-2 font-mono-label"
          style={{ color: "var(--color-cool-meta)" }}
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

      {/* Glossary grid — 2 col, file-tree-style cross-refs */}
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
