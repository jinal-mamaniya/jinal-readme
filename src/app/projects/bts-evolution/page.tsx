import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { DimensionalDot } from "@/components/ui/DimensionalDot";

/* The single project this page case-studies. If a future project warrants
   the same treatment, parameterize via [slug] route and pull from
   projects.find — but for now, BTS Evolution is the only Plate-tier piece
   in the portfolio. */
const project = projects.find((p) => p.slug === "bts-evolution");

export const metadata: Metadata = {
  title: "BTS Evolution — Case Study — Jinal Mamaniya",
  description:
    "A music-data platform engineered as queryable history. Six interconnected views, frozen-cache architecture, Wikipedia article-name versioning, 189-song UCLA-curated dataset.",
  openGraph: {
    title: "BTS Evolution — Engineering a discography as queryable history.",
    description:
      "Six interconnected views over one verified data spine. Engineering depth for a music-domain audience.",
    type: "article",
    url: "https://jinalmamaniya.com/projects/bts-evolution",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTS Evolution — Case Study",
    description:
      "Engineering a discography as queryable history. Six interconnected views, verified data spine.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jinalmamaniya.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Showcase",
      item: "https://jinalmamaniya.com/#showcase",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "BTS Evolution",
      item: "https://jinalmamaniya.com/projects/bts-evolution",
    },
  ],
};

/**
 * BTS Evolution — full case study page.
 *
 * Single-route landing at /projects/bts-evolution. Pulls structured content
 * from src/data/projects.ts where every engineering claim traces to a
 * verified read of D:\ramapir\bts-evolution.
 *
 * Composition (scroll order):
 *   1. Running header — file-path label + back link to /#showcase
 *   2. Title block — eyebrow with teal atlas dot · title · tagline ·
 *      live-site chip
 *   3. Hero image — same plate used in Showcase, larger here
 *   4. Stats strip — three hard numbers, including 444→6 (frozen cache)
 *   5. Essay — three paragraphs at chapter-tier voice (why · how · what)
 *   6. Six views — cinematic spreads with annotated screenshots,
 *      engineering paragraphs, per-view live deep-links, and narrative
 *      thread between them ("what it leaves open" closer)
 *   7. Engineering decisions — four marginalia-style annotations
 *   8. Signature insight — full version, designed callout
 *   9. The rules artifact — three rules surfaced from the project's own
 *      CLAUDE.md as a found document, framed as a code-comment block to
 *      match the README register
 *  10. Tech stack — full twelve chips (Showcase teaser shows eight)
 *  11. Foot CTAs — Open live site / back to README
 *
 * Visual register: matches jinal-readme's README/engineering-doc treatment
 * — Geist Sans + Geist Mono, cobalt accent for emphasis, teal as the
 * data-dimension semantic marker for this project. Color discipline per
 * CLAUDE.md rule #31 — no new tokens introduced.
 */
export default function BtsEvolutionCaseStudy() {
  if (!project) notFound();

  return (
    <main id="main-content" className="min-h-screen px-6 sm:px-10 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-[80rem]">
        {/* ===== 1. RUNNING HEADER — file path + back link =====
            The user-name root segment is hidden below the `sm` breakpoint
            (640px) so the breadcrumb fits a 375px viewport without
            wrapping. The reader on mobile already knows whose portfolio
            they're on; "Showcase / bts-evolution.md" carries the needed
            wayfinding. Round-C strict-review fix, 2026-06-14. */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-14">
          <p
            className="font-mono-label"
            style={{ color: "var(--color-cool-meta)" }}
          >
            <span className="hidden sm:inline">jinal-mamaniya / </span>
            Showcase / bts-evolution.md
          </p>
          <Link
            href="/#showcase"
            className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            /* WCAG 2.1 SC 2.5.8 — 24x24 target size. */
            style={{
              color: "var(--color-accent)",
              minHeight: "24px",
              padding: "4px 0",
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span>back to README</span>
          </Link>
        </div>

        {/* ===== 2. TITLE BLOCK — thesis-shaped hero =====
            Reworked 2026-06-14 in the Round-A strict-review pass:
            • Eyebrow drops the invented "Artist Intelligence" category;
              uses three real signals instead — solo build, year,
              active-status (the project is still maintained in 2026).
              Teal atlas dot stays as the data-dimension marker.
            • H1 carries the engineering THESIS ("Most music analytics
              lie quietly.") rather than repeating the project title.
              The project name lives in the breadcrumb + `<title>` meta,
              freeing the H1 slot to assert posture in the scan zone.
            • Tagline expanded — defines "queryable history" inline
              (thirteen-year career → query), asserts the solo build,
              signals end-to-end verification.
            • Top URL chip removed — was redundant with the foot CTA
              and read as a decorative-but-clickable affordance with
              unclear action context. Foot CTA is the canonical action;
              one signal beats two. */}
        <header className="mb-12">
          <p
            className="font-mono-label mb-4 inline-flex items-center gap-2"
            style={{ color: "var(--color-cool-meta)" }}
          >
            <DimensionalDot
              dimension="data"
              size={8}
              ariaLabel="Data dimension marker"
            />
            <span>Solo build · 2025 · Active</span>
          </p>

          <h1
            className="mb-6"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
              color: "var(--color-foreground)",
              maxWidth: "20ch",
            }}
          >
            {project.detailHeadline ?? project.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              lineHeight: 1.3,
              color: "var(--color-foreground)",
              borderLeft: "3px solid var(--color-accent)",
              paddingLeft: "1.5rem",
              maxWidth: "52ch",
            }}
          >
            {project.detailTagline ?? project.tagline}
          </p>
        </header>

        {/* ===== 3. HERO IMAGE =====
            Image goes full-bleed (negative-margin breakout from the
            page's px-6 padding) at mobile — gives absolute pixel
            resolution to chart detail that would otherwise crush in a
            327px content column. At sm+ the image returns to its
            framed, padded presentation. Round-C strict-review fix,
            2026-06-14: earlier mobile render made album cards
            unreadable; full-bleed gives them roughly 1.4× the pixels. */}
        <figure className="mb-16">
          <div
            /* w-screen + negative margin = true viewport-edge bleed at
               mobile (doesn't get clamped by parent content width the
               way w-full does). At sm+ the bleed unwinds (w-auto +
               mx-0) and the framed border + radius return. */
            className="overflow-hidden w-screen -ml-6 sm:w-auto sm:ml-0 sm:border"
            style={{
              borderColor: "var(--color-border)",
              borderRadius: "2px",
              background: "var(--color-surface)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              className="w-full h-auto block"
            />
          </div>
          {project.heroImage.caption && (
            <figcaption
              className="mt-4 font-mono-label"
              style={{ color: "var(--color-cool-meta)" }}
            >
              Figure 01
              <span
                aria-hidden="true"
                className="mx-2"
                style={{ color: "var(--color-border)" }}
              >
                —
              </span>
              {project.heroImage.caption}
            </figcaption>
          )}
        </figure>

        {/* ===== 4. STATS STRIP ===== */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 py-8 border-t border-b mb-16"
          style={{ borderColor: "var(--color-border)" }}
        >
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p
                aria-label={stat.ariaValue}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  color: "var(--color-foreground)",
                }}
              >
                {stat.value}
              </p>
              <p
                className="font-mono-label mt-3"
                style={{ color: "var(--color-cool-meta)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ===== 5. ESSAY — three paragraphs ===== */}
        <section className="mb-20">
          <p
            className="font-mono-label mb-6 pb-2 border-b inline-block"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            What it is
          </p>
          <div className="space-y-7 max-w-[62ch]">
            {project.detailEssay.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)",
                  lineHeight: 1.65,
                  color: "var(--color-text)",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* ===== 6. SIX VIEWS — cinematic spreads ===== */}
        <section className="mb-20">
          <p
            className="font-mono-label mb-12 pb-2 border-b inline-block"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Six views, one data spine
          </p>

          <div className="space-y-24">
            {project.views.map((view, idx) => {
              const isImageLeft = idx % 2 === 0;
              const hasImage = Boolean(view.image);

              return (
                <article
                  key={view.slug}
                  id={view.slug}
                  className="scroll-mt-12"
                >
                  <div
                    className={`grid grid-cols-1 ${
                      hasImage ? "lg:grid-cols-12" : ""
                    } gap-x-10 gap-y-8 items-start`}
                  >
                    {/* Screenshot column (only when view has an image) */}
                    {hasImage && view.image && (
                      <figure
                        className={`lg:col-span-7 ${
                          isImageLeft ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <div
                          className="w-full overflow-hidden"
                          style={{
                            border: "1px solid var(--color-border)",
                            borderRadius: "2px",
                            background: "var(--color-surface)",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={view.image.src}
                            alt={view.image.alt}
                            className="w-full h-auto block"
                          />
                        </div>
                        {view.image.caption && (
                          <figcaption
                            className="mt-3 font-mono-label"
                            style={{ color: "var(--color-cool-meta)" }}
                          >
                            Figure {view.number}
                            <span
                              aria-hidden="true"
                              className="mx-2"
                              style={{ color: "var(--color-border)" }}
                            >
                              —
                            </span>
                            {view.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {/* Text column */}
                    <div
                      className={`${
                        hasImage
                          ? `lg:col-span-5 ${
                              isImageLeft ? "lg:order-2" : "lg:order-1"
                            }`
                          : "max-w-[62ch]"
                      }`}
                    >
                      {/* View number + name */}
                      <div className="flex items-baseline gap-3 mb-5">
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(2rem, 3vw, 2.75rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 0.95,
                            color: "var(--color-accent)",
                          }}
                        >
                          {view.number}
                        </p>
                        <h3
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.025em",
                            lineHeight: 1.05,
                            color: "var(--color-foreground)",
                          }}
                        >
                          {view.name}
                        </h3>
                      </div>

                      {/* What it answers — eyebrow question */}
                      <p
                        className="font-mono-label mb-2"
                        style={{
                          color: "var(--color-cool-meta)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        What it answers
                      </p>
                      <p
                        className="mb-6"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)",
                          fontStyle: "italic",
                          lineHeight: 1.4,
                          color: "var(--color-foreground)",
                          maxWidth: "32ch",
                        }}
                      >
                        {view.whatItAnswers}
                      </p>

                      {/* Annotations — numbered list when present */}
                      {view.annotations && view.annotations.length > 0 && (
                        <ul className="mb-6 space-y-1.5 list-none">
                          {view.annotations.map((a) => (
                            <li
                              key={a.marker}
                              className="font-mono-meta flex items-baseline gap-2.5"
                              style={{
                                fontSize: "0.875rem",
                                color: "var(--color-text)",
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--color-accent)",
                                  fontWeight: 700,
                                  minWidth: "1.25rem",
                                  display: "inline-block",
                                }}
                              >
                                {a.marker}
                              </span>
                              <span>{a.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Body — engineering paragraph */}
                      <p
                        className="mb-6"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "clamp(1rem, 1.2vw, 1.0625rem)",
                          lineHeight: 1.65,
                          color: "var(--color-text)",
                        }}
                      >
                        {view.body}
                      </p>

                      {/* Live deep-link to this exact view in the live app */}
                      <a
                        href={`${project.liveUrl}/${view.liveHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-mono-meta mb-6 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                        style={{
                          color: "var(--color-accent)",
                          minHeight: "24px",
                          padding: "4px 0",
                        }}
                      >
                        <span>See {view.name} in the live app</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </a>

                      {/* "What it leaves open" — narrative thread to next
                          view. Skipped on the final view. */}
                      {view.whatItLeavesOpen && (
                        <p
                          className="pt-5 border-t"
                          style={{
                            borderColor: "var(--color-border)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(0.9375rem, 1.1vw, 1rem)",
                            fontStyle: "italic",
                            lineHeight: 1.5,
                            color: "var(--color-text-muted)",
                            maxWidth: "42ch",
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{ color: "var(--color-accent)" }}
                          >
                            →{" "}
                          </span>
                          {view.whatItLeavesOpen}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ===== 7. ENGINEERING DECISIONS — four marginalia ===== */}
        <section className="mb-20">
          <p
            className="font-mono-label mb-10 pb-2 border-b inline-block"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Engineering decisions
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10">
            {project.decisions.map((decision, idx) => (
              <div key={decision.title}>
                <div className="flex items-baseline gap-3 mb-3">
                  <p
                    className="font-mono-label"
                    style={{
                      color: "var(--color-accent)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h4
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                      color: "var(--color-foreground)",
                    }}
                  >
                    {decision.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.9375rem, 1.15vw, 1.0625rem)",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: "var(--color-text-muted)",
                    paddingLeft: "1.5rem",
                    borderLeft: "1px solid var(--color-border)",
                  }}
                >
                  {decision.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 8. SIGNATURE INSIGHT ===== */}
        <section className="mb-20">
          <div
            className="p-8 md:p-10 max-w-[80ch]"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderLeft: "3px solid var(--color-accent)",
              borderRadius: "2px",
            }}
          >
            <p
              className="font-mono-label mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              {project.signatureInsight.label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                fontStyle: "italic",
                lineHeight: 1.5,
                color: "var(--color-foreground)",
              }}
            >
              {project.signatureInsight.body}
            </p>
          </div>
        </section>

        {/* ===== 9. RULES ARTIFACT — the project's own CLAUDE.md =====
            Treated as a found document framed in the README/code-comment
            register: mono throughout, surface background, subtle border,
            rule numbers in cobalt. Signals engineering judgment by
            surfacing the rules SHE wrote before the build began. */}
        <section className="mb-20">
          <div
            className="p-7 md:p-10 max-w-[80ch]"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "2px",
              fontFamily: "var(--font-mono)",
            }}
          >
            <p
              className="font-mono-label mb-6 pb-3 border-b"
              style={{
                color: "var(--color-cool-meta)",
                borderColor: "var(--color-border)",
                letterSpacing: "0.08em",
              }}
            >
              /* {project.rulesArtifact.title} */
            </p>
            <ul className="space-y-5 list-none mb-7">
              {project.rulesArtifact.rules.map((rule) => (
                <li
                  key={rule.number}
                  className="flex items-baseline gap-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(0.875rem, 1.05vw, 0.9375rem)",
                    lineHeight: 1.65,
                    color: "var(--color-text)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-accent)",
                      fontWeight: 700,
                      minWidth: "3rem",
                      display: "inline-block",
                    }}
                  >
                    Rule {rule.number}
                  </span>
                  <span>{rule.body}</span>
                </li>
              ))}
            </ul>
            <p
              className="font-mono-meta pt-4 border-t"
              style={{
                color: "var(--color-cool-meta)",
                borderColor: "var(--color-border)",
              }}
            >
              — {project.rulesArtifact.footer}
            </p>
          </div>
        </section>

        {/* ===== 10. TECH STACK — grouped inline mono =====
            Replaces the prior 12-chip uniform grid that read as a generic
            capability checklist. Each group gets one row: small mono
            label column (Frontend / Data / Infra) + slash-separated items
            column. Same treatment as Showcase teaser for consistency
            (rule #6). Reads like the colophon of a book — engineer's
            notes, curated, story-aware. */}
        <section className="mb-20">
          <p
            className="font-mono-label mb-7 pb-2 border-b inline-block"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Tech stack
          </p>
          <dl className="space-y-4 max-w-[60rem]">
            {project.techStack.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-5 sm:gap-x-7 items-baseline"
              >
                <dt
                  className="font-mono-label"
                  style={{ color: "var(--color-cool-meta)" }}
                >
                  {group.label}
                </dt>
                <dd
                  className="font-mono-meta"
                  style={{
                    color: "var(--color-text)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                  }}
                >
                  {group.items.join("  ·  ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ===== 11. FOOT — premier live CTA + back link =====
            "Open the live site" is the punchline of the case study — the
            moment the reader exits reading-about into seeing-it-work.
            Treated as the dominant terminal action of the page: accent-
            filled (the project's emphasis color), larger padding, paired
            with a small eyebrow above ("EXPERIENCE THE PLATFORM") and a
            mono URL chip below (the actual hostname). The accent
            background is the brand-color emphasis — same cobalt that
            marks the rule numbers, the view spread numbers, the
            tagline left rule. "Back to README" stays as a subordinate
            text link — navigation, not action. */}
        <div
          className="pt-12 border-t flex flex-wrap items-end justify-between gap-x-10 gap-y-8"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="inline-flex flex-col items-start gap-3">
            <p
              className="font-mono-label"
              style={{
                color: "var(--color-cool-meta)",
                letterSpacing: "0.1em",
              }}
            >
              Experience the platform
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-background)",
                borderRadius: "2px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "1.0625rem",
                padding: "1rem 2rem",
              }}
            >
              <span>Open the live site</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
            <p
              className="font-mono-meta"
              style={{
                color: "var(--color-cool-meta)",
                fontSize: "0.8125rem",
                paddingLeft: "0.125rem",
              }}
            >
              {project.liveUrlDisplay}
            </p>
          </div>

          <Link
            href="/#showcase"
            className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            /* WCAG 2.1 SC 2.5.8 — 24x24 target size. */
            style={{
              color: "var(--color-accent)",
              minHeight: "24px",
              padding: "4px 0",
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span>back to README</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
