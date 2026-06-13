import { getAllPosts } from "@/lib/mdx";

/**
 * Notes — scannable form, NOT essay reader.
 *
 * Earlier version rendered full essay content inline, which made the middle
 * of the page a 4,000-word wall of text. RESEARCH §4B: hiring managers
 * skim, not read. The right move is to surface the SHARPEST line of each
 * essay as a pull-quote, with a Read-more link for the full text.
 *
 * Real senior-portfolio convention (Will Larson, Erland, Brittany Chiang):
 * essays are signaled by their argument, not by their body.
 *
 * Each note now renders as:
 *   Red number marker · meta row · title
 *   ONE setup line (drawn from excerpt, tightened)
 *   ONE oversized pull-quote (the sharpest line, hand-picked from content)
 *   Tags
 *   Read full essay link
 */

/* Hand-picked sharpest lines per essay — the one sentence that carries the
   essay's argument. These are pulled verbatim from the essay content; no
   invention. Slug → quote. */
const SHARPEST_LINES: Record<string, string> = {
  "why-i-stopped-caring-about-frameworks":
    "The framework is incidental; judgment scales.",
  "the-real-cost-of-a-slow-query":
    "A 200ms query is never alone. It cascades, queues, retries, and turns into 5-second page loads for everyone.",
  "mentoring-isnt-about-code-reviews":
    "The engineers who struggled weren't struggling with syntax — they couldn't reason about why one approach was better than another.",
};

/* Each essay maps to its dominant Stack Atlas craft dimension. The number
   marker recolors to that dimension's token, making the Notes section a
   visual continuation of the atlas legend — reader can scan and pattern-
   match "01 is judgment, 02 is runtime, 03 is multiplier."
   Pull-quote left rule stays cobalt (--color-accent) so the brand signal
   doesn't fragment; only the number marker recolors. Per rule #31 these
   are semantic categorical tokens, not new brand accents. */
const ESSAY_DIMENSION: Record<string, string> = {
  "why-i-stopped-caring-about-frameworks": "var(--color-atlas-judgment)",
  "the-real-cost-of-a-slow-query": "var(--color-atlas-runtime)",
  "mentoring-isnt-about-code-reviews": "var(--color-atlas-multiplier)",
};

export function Notes() {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  return (
    <>
      <section
        id="notes"
        className="px-6 sm:px-10 pt-40 pb-12 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          {/* Match the bumped SectionTitle scale in Readme.tsx — file-path
              label sits at ~18-26px so the section nav reads at scan speed. */}
          {/* Eyebrow full-width row — no col-span-2 overflow at 32px. */}
          <p
            className="col-span-12 font-mono-path"
            style={{
              color: "var(--color-cool-meta)",
              fontSize: "var(--type-eyebrow)",
            }}
          >
            Notes/
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
            Maintainer&apos;s notes.
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
            Three notes I keep on engineering trade-offs I&apos;ve thought
            hardest about. The sharpest line from each below; the full essay
            one click away.
          </p>
        </div>
      </section>

      {posts.map((post, i) => {
        const number = String(i + 1).padStart(2, "0");
        const dateLabel = post.date
          ? new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "";
        const anchorSlug = post.slug
          .replace("why-i-stopped-caring-about-frameworks", "frameworks")
          .replace("the-real-cost-of-a-slow-query", "slow-query")
          .replace("mentoring-isnt-about-code-reviews", "mentoring");
        const sharpest = SHARPEST_LINES[post.slug];
        const dimensionColor =
          ESSAY_DIMENSION[post.slug] ?? "var(--color-accent)";

        return (
          <section
            key={post.slug}
            id={`notes-${anchorSlug}`}
            className="px-6 sm:px-10 py-14 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 items-start">
              {/* Number marker — colored by essay's craft dimension (see
                  ESSAY_DIMENSION above). 01 frameworks = judgment cobalt,
                  02 slow-query = runtime slate, 03 mentoring = multiplier
                  magenta. Makes the Notes section a visual continuation
                  of the Stack Atlas legend.
                  Size reduced 2026-06-06 per UX hierarchy fix: essay
                  title h3 is 36px, so number max 24px keeps the 0.67
                  ratio (subject > metadata). Smaller clamp than the
                  chapter version because essay titles are h3 not h2. */}
              <div className="col-span-12 lg:col-span-2">
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    color: dimensionColor,
                  }}
                >
                  {number}
                </p>
              </div>

              {/* Content */}
              <div className="col-span-12 lg:col-span-10">
                <p
                  className="font-mono-label mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
                  style={{ color: "var(--color-cool-meta)" }}
                >
                  <span>Notes / {anchorSlug}.md</span>
                  {dateLabel && (
                    <>
                      <span aria-hidden="true" style={{ color: "var(--color-border)" }}>—</span>
                      <span>{dateLabel}</span>
                    </>
                  )}
                  {post.readingTime && (
                    <>
                      <span aria-hidden="true" style={{ color: "var(--color-border)" }}>—</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </p>

                {/* Title */}
                <h3
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--color-foreground)",
                    maxWidth: "28ch",
                  }}
                >
                  {post.title}
                </h3>

                {/* Setup line — drawn from excerpt */}
                {post.excerpt && (
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
                      lineHeight: 1.55,
                      color: "var(--color-text-muted)",
                      maxWidth: "60ch",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Sharpest pull-quote — the argument */}
                {sharpest && (
                  <blockquote
                    className="mb-8"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--type-quote-sm)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                      color: "var(--color-foreground)",
                      borderLeft: "3px solid var(--color-accent)",
                      paddingLeft: "1.5rem",
                      maxWidth: "42ch",
                    }}
                  >
                    “{sharpest}”
                  </blockquote>
                )}

                {/* Tags + read full link in a single row */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono-meta"
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.5rem",
                            background: "var(--color-surface)",
                            color: "var(--color-text)",
                            borderRadius: "2px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={`/blog/${post.slug}`}
                    className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                    /* min-height per WCAG 2.1 SC 2.5.8 (24x24 CSS px target).
                       Reference: https://www.w3.org/TR/WCAG21/#target-size-minimum */
                    style={{
                      color: "var(--color-accent)",
                      minHeight: "24px",
                      padding: "4px 0",
                    }}
                  >
                    <span>Read full essay</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
