import Link from "next/link";
import { projects } from "@/data/projects";
import { DimensionalDot } from "@/components/ui/DimensionalDot";

/**
 * Showcase — the home-page teaser for the BTS Evolution case study.
 *
 * Reworked 2026-06-13 from a self-contained pseudo-case-study into a true
 * teaser: it does the hero-image moment, lands the origin in scan zone,
 * surfaces three story-form numbers, and hands the reader two CTAs — one
 * into the dedicated `/projects/bts-evolution` case study, one into the
 * live app. Signature insight, engineering decisions, six-views spreads,
 * and the rules-artifact all moved to the detail page where they have
 * room to breathe.
 *
 * Compositional moves:
 *   — Showcase/ directory marker + display headline "An artist's career
 *     as a dataset."
 *   — Massive project title + tagline pull-quote (cobalt left-rule, the
 *     project's signature visual moment on the home page)
 *   — Hero image at 16/10, designed plate with caption
 *   — Origin block: cobalt date stamp + pull-quote + body — the personal
 *     hook lands here so the detail page can open with engineering thesis
 *   — Single-paragraph teaser lede (was a 2-column 3-paragraph essay; the
 *     full essay lives on the detail page now)
 *   — Three-number stats strip
 *   — Trimmed tech-stack grid (eight most-recognizable chips; full twelve
 *     surface on the detail page)
 *   — Two CTAs side-by-side: "Read the case study →" (internal) and
 *     "Open the live site ↗" (external)
 */
export function Showcase() {
  /* Showcase carries ONE featured project at the home register. If a
     second project ever ships, surface it as an inline mini-card below
     this block or route it through its own /projects/[slug] page — never
     iterate this composition. */
  const [featured] = projects;
  if (!featured) return null;
  const project = featured;


  return (
    <section
      id="showcase"
      className="px-6 sm:px-10 pt-40 pb-20 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* ===== SECTION HEADER ===== */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-12">
        {/* Eyebrow full-width row — no col-span-2 overflow at 32px. */}
        <p
          className="col-span-12 font-mono-path"
          style={{
            color: "var(--color-cool-meta)",
            fontSize: "var(--type-eyebrow)",
          }}
        >
          Showcase/
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
          An artist&apos;s career as a dataset.
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
          Six interconnected views, harmonic synthesis math, d3-force
          layouts. A standardized 3-angle impact methodology that holds
          across every release. The engineering I do when the constraints
          are mine to choose.
        </p>
      </div>

      {/* ===== PROJECT HERO ===== */}
      <div id="showcase-bts" className="scroll-mt-12">
        {/* Project number + file path */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-8">
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
              01
            </p>
          </div>
          <div className="col-span-12 lg:col-span-10">
            {/* Project eyebrow with the data-dimension dot — Showcase
                joins the chapter pattern: every craft section has a small
                colored dot signaling its dominant atlas dimension. BTS
                project = data craft (treating an artist's career as a
                queryable dataset). Teal dot ties the Showcase to the
                Stack Atlas legend the same way chapter eyebrows do. */}
            <p
              className="font-mono-label mb-3 inline-flex items-center gap-2"
              style={{ color: "var(--color-cool-meta)" }}
            >
              <DimensionalDot
                dimension="data"
                size={8}
                ariaLabel="Showcase dimension marker"
              />
              <span>
                Showcase / bts-evolution.md
                <span
                  aria-hidden="true"
                  className="mx-2"
                  style={{ color: "var(--color-border)" }}
                >
                  —
                </span>
                2025 — Live
              </span>
            </p>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                color: "var(--color-foreground)",
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Tagline as oversized italic pull-quote */}
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-9 lg:col-start-3">
            <p
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
                maxWidth: "44ch",
              }}
            >
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Hero image — full presentation */}
        {project.heroImage && (
          <div className="grid grid-cols-12 gap-x-6 mb-12">
            <figure className="col-span-12 lg:col-span-12">
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
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  className="w-full h-auto block"
                />
              </div>
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
            </figure>
          </div>
        )}

        {/* ===== ORIGIN MOMENT =====
            Typographic block: extracts the BTS-discovery origin from being
            buried in the essay flow to its own visual beat between hero
            image and teaser lede. Read sequence: visual hook (image) →
            emotional anchor (origin) → engineering depth (teaser lede) →
            scale (stats) → choice (CTAs). The origin lands at scan zone in
            ~2 seconds: a music-domain reader registers "March 2025,
            Carpool Karaoke" and the engineering follow-through.
            Transparent typography (no tinted background) to differentiate
            from the boxed signature-insight card that lives on the detail
            page. Cobalt 3-px left rule matches the tagline pull-quote
            visual family. */}
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <p
              className="font-mono-label mb-3"
              style={{
                color: "var(--color-accent)",
                letterSpacing: "0.1em",
              }}
            >
              March 2025
            </p>
            <blockquote
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--type-quote-card)",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
                color: "var(--color-foreground)",
                borderLeft: "3px solid var(--color-accent)",
                paddingLeft: "1.5rem",
                maxWidth: "32ch",
              }}
            >
              It started with Carpool Karaoke.
            </blockquote>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "var(--color-text-muted)",
                maxWidth: "60ch",
                paddingLeft: "1.5rem",
              }}
            >
              The project exists because of music I love. I recognized a
              pattern other engineers might miss: a decade of compound
              dedication produces measurable signals. Patterns you can
              prove with data.
            </p>
          </div>
        </div>

        {/* ===== TEASER LEDE =====
            Single paragraph replacing the prior 2-column 3-paragraph
            essay. The full 3-paragraph essay lives on the detail page
            where it has room to land each beat at chapter-tier voice.
            On the home page, one strong paragraph that frames the WHY
            and earns the click into the case study. */}
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            {/* Standout treatment — larger + weightier so the hook commands
                attention and tempts the click, rather than reading as body
                copy. The lede IS the pitch on the home page. */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.375rem, 1.9vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.35,
                letterSpacing: "-0.015em",
                color: "var(--color-foreground)",
                maxWidth: "42ch",
              }}
            >
              {project.teaserLede}
            </p>
          </div>
        </div>

        {/* ===== STATS STRIP — the scaling story, rendered BIG =====
            Four numbers that escalate left to right: a decade → hundreds
            of songs → measured across 7 dimensions → explored 6 ways.
            Oversized display numbers so the strip reads as a confident
            headline, not a footnote. 2 columns on mobile, 4 at md+. */}
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 py-8 border-t border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    aria-label={stat.ariaValue}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.95,
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
          </div>
        </div>

        {/* ===== TECH STACK — grouped inline mono =====
            Replaces the prior 8-chip grid that read as a generic capability
            checklist. New treatment renders each group as a row: small
            mono label column (Frontend / Data / Infra) + slash-separated
            items column. Reads like the colophon of a book — engineer's
            notes, curated, story-aware. Same treatment on the detail
            page for consistency (rule #6). */}
        <div className="grid grid-cols-12 gap-x-6 mb-10">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <p
              className="font-mono-label mb-5 pb-2 border-b"
              style={{
                color: "var(--color-foreground)",
                borderColor: "var(--color-foreground)",
              }}
            >
              Tech stack
            </p>
            <dl className="space-y-3">
              {project.techStack.map((group) => (
                <div
                  key={group.label}
                  className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-4 sm:gap-x-6 items-baseline"
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
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {group.items.join("  ·  ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ===== CTAs — read the case study + open live site =====
            Visual dominance flipped 2026-06-14 in the Round-B strict-
            review pass. Previously the live site was the cobalt-filled
            hero CTA because the home teaser had no thesis assertion —
            sending the reader to the live demo was the safest route
            for a reader who couldn't tell what the case study contained.
            Round A reworked the case-study hero to assert the
            engineering thesis ("Most music analytics lie quietly.") in
            scan zone, which removed the "what will I get?" friction —
            so the funnel-optimal route now keeps the reader IN the
            portfolio reading the structured artifact. Cobalt fill moves
            to "Read the case study". "Open the live site" becomes the
            outlined secondary CTA with URL chip beneath as the trust
            signal. The detail page foot CTA stays cobalt-on-live —
            that's correct for the post-essay reader, who has earned
            the click-out. */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <div className="flex flex-wrap items-start gap-x-5 gap-y-6">
              <Link
                href="/projects/bts-evolution"
                className="group inline-flex items-center gap-3 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-background)",
                  borderRadius: "2px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "0.875rem 1.75rem",
                }}
              >
                <span>Read the case study</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              {/* "Open the live site" — outlined secondary CTA paired
                  with a mono URL chip beneath. Border carries the button
                  affordance; the URL chip doubles as the trust signal
                  (the actual hostname the click lands on). */}
              <div className="inline-flex flex-col items-start gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  style={{
                    background: "transparent",
                    color: "var(--color-foreground)",
                    border: "1px solid var(--color-foreground)",
                    borderRadius: "2px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    /* Match filled-button visual height — subtract the
                       1px border on each axis from the original padding. */
                    padding: "calc(0.875rem - 1px) calc(1.75rem - 1px)",
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
                    fontSize: "0.75rem",
                    paddingLeft: "0.125rem",
                  }}
                >
                  {project.liveUrlDisplay}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
