import { experiences, type Experience } from "@/data/experience";
import { systemUnconventional } from "@/data/unconventional";
import { codePatterns } from "@/data/codePatterns";
import { ArchitectureFlow } from "@/components/figures/ArchitectureFlow";
import { CodeBlock } from "@/components/figures/CodeBlock";
import { OpsPanel } from "@/components/figures/OpsPanel";

/* Per-chapter dominant Stack Atlas craft dimension. Used to render a
   small dimensional dot in the chapter eyebrow as a visual continuation
   of the atlas legend. Cobalt brand (chapter number marker, italic
   thesis left rule) stays cobalt — only the eyebrow gets the dot.
   Each mapping traces to the chapter's documented dominant theme:
     lexisnexis  → judgment   (DDD, resilient retry, ADR-shaped decisions)
     motorola    → discipline (public-safety reliability, testing rigor)
     tcs         → multiplier (knowledge transfer, Dow LOR, mentoring)
     lti         → data       (database-first, stored procedures)
     northeastern→ multiplier (teaching 190 students) */
const CHAPTER_DIMENSION: Record<string, string> = {
  lexisnexis: "var(--color-atlas-judgment)",
  motorola: "var(--color-atlas-discipline)",
  tcs: "var(--color-atlas-multiplier)",
  lti: "var(--color-atlas-data)",
  northeastern: "var(--color-atlas-multiplier)",
};

/**
 * SystemFile — one chapter rendered as a Systems/{slug}.md file.
 *
 * Pentagram-tier compositional discipline:
 *   — 2-digit system number (large red display) sits as a graphic marker
 *     in the left column; file path + company name sit to its right
 *   — Subhead (subject + thesis as oversized italic pull-quote)
 *   — Architecture narrative in a 7-col reading column; metrics row to
 *     its right as a stacked stat block
 *   — Decisions as numbered cards in a 2-col grid (not stacked
 *     left-rule-italics blocks)
 *   — Limitations as a single italic block with red left rule — kept
 *     simple, the content does the work
 *   — Self-critique callout in a tinted card with red attribution
 *   — Topics as a tighter chip row, not bordered placeholders
 *   — Acknowledgments (LOR) as an inserted document card
 *
 * No `#` / `##` mono prefix decoration. Hierarchy via scale + weight only.
 */
export function SystemFile({ slug }: { slug: string }) {
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) return null;

  const unconventional = systemUnconventional[slug];
  const paragraphs = exp.narrative.split("\n\n");
  /* Section defaults to "Systems" when absent. Teaching role overrides
     to "Teaching" — affects file path display, anchor id, and chapter
     numbering scope. */
  const section = exp.section ?? "Systems";
  const sectionPrefix = section.toLowerCase();
  const anchorId = `${sectionPrefix}-${slug}`;
  /* Chapter number is computed within section, so Teaching chapter is
     "01" of Teaching (its own count) — not "05" of Systems. */
  const sectionChapters = experiences.filter(
    (e) => (e.section ?? "Systems") === section,
  );
  const number = String(sectionChapters.indexOf(exp) + 1).padStart(2, "0");

  return (
    /* Cap entire chapter at max-w-screen-2xl (96rem = 1536px) and center.
       At 1920+ viewports this prevents 600-800px right-side voids by
       pulling the canvas to a balanced max width. Below 1536px this has
       no effect — chapter still fills the available content area. */
    <section
      id={anchorId}
      className="px-6 sm:px-10 py-20 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* ===== HEADER — number marker + file path + company ===== */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-12">
        {/* Massive number marker in red */}
        <div className="col-span-12 lg:col-span-2">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "var(--color-accent)",
            }}
          >
            {number}
          </p>
        </div>

        {/* Title block */}
        <div className="col-span-12 lg:col-span-10">
          {/* Match the bumped SectionTitle scale across sections — chapter
              file path + dates now reads at scan speed. */}
          {/* Chapter eyebrow with a small dimensional dot leading the
              file-path label. Color comes from CHAPTER_DIMENSION map at
              top of file. Reader scanning multiple chapters sees the
              dimensional signal at the same visual location each time —
              ties to the Stack Atlas legend. Cobalt brand still dominates
              elsewhere in the chapter (number marker, italic thesis rule). */}
          <p
            className="font-mono-label mb-3 inline-flex items-center gap-2"
            style={{
              color: "var(--color-cool-meta)",
              fontSize: "clamp(1.125rem, 1.6vw, 1.625rem)",
              letterSpacing: "0.05em",
            }}
          >
            {CHAPTER_DIMENSION[slug] && (
              <span
                aria-label={`Chapter dimension marker`}
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: CHAPTER_DIMENSION[slug],
                  flex: "0 0 auto",
                }}
              />
            )}
            <span>
              {section} / {slug}.md
              <span aria-hidden="true" className="mx-2" style={{ color: "var(--color-border)" }}>—</span>
              {section === "Teaching" ? "taught" : "maintained"} {exp.dates}
            </span>
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              color: "var(--color-foreground)",
            }}
          >
            {exp.company}
            {exp.client && (
              <span style={{ color: "var(--color-accent)" }}> · {exp.client}</span>
            )}
          </h2>
          <p
            className="mt-3 font-mono-meta"
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.9375rem",
            }}
          >
            {exp.title}
          </p>
        </div>
      </div>

      {/* ===== THESIS PULL-QUOTE ===== */}
      {exp.thesis && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
                color: "var(--color-foreground)",
                borderLeft: "3px solid var(--color-accent)",
                paddingLeft: "1.5rem",
                maxWidth: "44ch",
              }}
            >
              {exp.thesis}
            </p>
          </div>
        </div>
      )}

      {/* ===== METRICS STRIP — horizontal stat band right after thesis.
          Was a sticky right sidebar that left col-8 dead and 600-1000px of
          empty canvas below the metrics while the body continued. Engineering
          doc convention (Stripe Engineering, Linear posts) opens with metrics
          as an inline stat strip; the body owns the rest of the canvas. */}
      {exp.metrics.length > 0 && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <div
              className="pt-3 border-t-2"
              style={{ borderColor: "var(--color-foreground)" }}
            >
              <p
                className="font-mono-label mb-6"
                style={{ color: "var(--color-foreground)" }}
              >
                Operating metrics
              </p>
              {/* Cap metrics row at max-width so 3-metric chapters don't
                  spread into 400px+ inter-metric gutters at 1920. Same
                  consistency fix as /readme metric strip (rule #6). */}
              <div
                className="flex flex-col sm:flex-row gap-y-6 sm:gap-x-12"
                style={{ maxWidth: "64rem" }}
              >
                {exp.metrics.map((m) => (
                  <div key={m.label} className="flex-1">
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.025em",
                        lineHeight: 0.95,
                        color: "var(--color-accent)",
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      className="font-mono-label mt-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
              {exp.awards && exp.awards.length > 0 && (
                <div
                  className="mt-8 pt-5 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <p
                    className="font-mono-label mb-3"
                    style={{ color: "var(--color-cool-meta)" }}
                  >
                    Awards
                  </p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                    {exp.awards.map((a) => (
                      <li
                        key={a}
                        className="font-mono-meta"
                        style={{
                          color: "var(--color-text)",
                          fontSize: "0.8125rem",
                        }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== ARCHITECTURE NARRATIVE — wide reading column aligned with
          the title block (col-3). Paragraph max-width holds the readable
          measure at ~68ch so the freed canvas doesn't blow up line length. */}
      <div className="grid grid-cols-12 gap-x-6 mb-16">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <SubHeading label="What it does" />
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.1875rem)",
              lineHeight: 1.6,
              color: "var(--color-text)",
              maxWidth: "68ch",
            }}
          >
            {exp.summary}
          </p>

          <SubHeading label="Architecture" />
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-sans)",
                  /* Body floor bumped 0.9375rem (15px) → 1rem (16px) on
                     2026-05-31. Same reasoning as About bio: 16px is the
                     mobile body standard. The architecture narrative is
                     the chapter's main reading content — first to enforce. */
                  fontSize: "clamp(1rem, 1.1vw, 1.0625rem)",
                  lineHeight: 1.65,
                  color: "var(--color-text)",
                  maxWidth: "68ch",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ARCHITECTURE FIGURE — for systems with shippable diagrams.
          LN gets the request-flow pattern figure (Polly retry / async queue /
          PII middleware). Dow gets the ops dashboard figure (live system
          telemetry register). Both are real engineering artifacts authored
          from the chapter narrative — content traces to rule #15. */}
      {slug === "lexisnexis" && (
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <ArchitectureFlow />
          </div>
        </div>
      )}
      {slug === "tcs" && (
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <OpsPanel />
          </div>
        </div>
      )}

      {/* ===== CODE PATTERN — representative implementation of the
          system's strongest documented decision. NDA-safe (sanitized).
          Real engineering doc convention — Stripe Engineering / Linear
          posts routinely show "representative" pattern code. */}
      {codePatterns[slug] && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SubHeading label={codePatterns[slug].title} />
            <p
              className="font-mono-meta mb-4 italic"
              style={{
                color: "var(--color-text-dim)",
                fontSize: "0.875rem",
              }}
            >
              {codePatterns[slug].caption}
            </p>
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Header bar with language + "Representative pattern" tag */}
              <div
                className="flex items-center justify-between px-4 py-2 border-b font-mono-label"
                style={{
                  background: "var(--color-foreground)",
                  borderColor: "var(--color-foreground)",
                  color: "var(--color-background)",
                }}
              >
                <span>{codePatterns[slug].language}</span>
                <span style={{ opacity: 0.75 }}>
                  Representative pattern · NDA-safe
                </span>
              </div>
              {/* Syntax-highlighted via Shiki (server component). Tokens
                  resolve through VS Code's TextMate grammars — same as
                  Vercel/Next/Astro docs. Theme swap (github-light ↔
                  github-dark) handled by `.shiki span` rules in
                  globals.css picking the right CSS variable based on
                  [data-theme="dark"]. */}
              <CodeBlock
                language={codePatterns[slug].language}
                code={codePatterns[slug].code}
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== DECISIONS as 2-col grid of numbered cards ===== */}
      {exp.decisions && exp.decisions.length > 0 && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SubHeading label="Key decisions" />
            <div className={`grid gap-6 ${exp.decisions.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {exp.decisions.map((d, i) => (
                <div
                  key={i}
                  className="p-6"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    className="font-mono-label mb-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Decision {String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      color: "var(--color-foreground)",
                    }}
                  >
                    {d.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== LIMITATIONS ===== */}
      {unconventional?.limitations && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SubHeading label="What this system DOESN'T do" />
            <p
              className="pl-5 border-l-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
                lineHeight: 1.6,
                color: "var(--color-text)",
                borderColor: "var(--color-cool-meta)",
              }}
            >
              {unconventional.limitations}
            </p>
          </div>
        </div>
      )}

      {/* ===== SELF-CRITIQUE — tinted card with red attribution ===== */}
      {unconventional?.selfCritique && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SubHeading label="Re-read 2026" />
            <div
              className="p-7"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "2px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--color-foreground)",
                }}
              >
                {unconventional.selfCritique}
              </p>
              <p
                className="font-mono-meta mt-5"
                style={{
                  color: "var(--color-accent)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                }}
              >
                — Jinal, looking back from 2026
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== ACKNOWLEDGMENTS — LOR card if testimonial exists ===== */}
      {exp.testimonial && (
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SubHeading label="Acknowledgments — Letter of Recommendation" />
            <div
              className="p-7"
              style={{
                background: "var(--color-background)",
                border: "2px solid var(--color-foreground)",
                borderRadius: "2px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                  lineHeight: 1.6,
                  color: "var(--color-foreground)",
                }}
              >
                &ldquo;{exp.testimonial.quote}&rdquo;
              </p>
              <p
                className="font-mono-meta mt-4"
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.8125rem",
                }}
              >
                — <strong style={{ color: "var(--color-foreground)" }}>{exp.testimonial.author}</strong>, {exp.testimonial.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== TOPICS — tighter chip row ===== */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <p
            className="font-mono-label mb-3"
            style={{ color: "var(--color-cool-meta)" }}
          >
            Topics
          </p>
          {/* Chip styling enhanced to read as code-token identifiers,
              matching the cobalt-key register established by the package.json
              hero block and the new Shiki-highlighted chapter code samples.
              Three artifacts (hero JSON keys, chapter code keywords, chapter
              Topics) now share the same cobalt-on-surface dialect. Border
              defines chip edges like GitHub topic chips. Font size aligned
              to the chapter code block (0.8125rem) for visual rhyme. */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono-meta"
                style={{
                  fontSize: "0.8125rem",
                  padding: "0.3125rem 0.625rem",
                  background: "var(--color-surface)",
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Sub-heading — bold + small mono label above ===== */
function SubHeading({ label }: { label: string }) {
  return (
    <h3
      className="mb-4 pb-2 border-b-2"
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        color: "var(--color-foreground)",
        borderColor: "var(--color-foreground)",
      }}
    >
      {label}
    </h3>
  );
}
