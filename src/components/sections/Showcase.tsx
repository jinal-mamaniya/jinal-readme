import { projects } from "@/data/projects";

/**
 * Showcase — replaces the book's Plate.
 *
 * Pentagram-tier hero spread for the BTS Discography project. Compositional
 * moves:
 *   — Showcase/ directory marker + display headline "Side project"
 *   — Massive project title at display scale + tagline pull-quote
 *     occupying real canvas weight
 *   — Featured hero image at 16/10 aspect, sits as a designed plate (real
 *     border + caption underneath; not tucked into a sidebar)
 *   — Essay paragraphs in 2-column reading layout — uses the canvas, not
 *     a narrow stripe
 *   — Signature insight as a designed card with red accent
 *   — Tech grid as a real grid layout, not bordered chips
 *   — Open-live-site CTA as a prominent button-style link with hover state
 */
export function Showcase() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section
      id="showcase"
      className="px-6 sm:px-10 pt-40 pb-20 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* ===== SECTION HEADER ===== */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-12">
        {/* Match the bumped SectionTitle scale across sections. */}
        {/* Eyebrow full-width row — no col-span-2 overflow at 32px. */}
        <p
          className="col-span-12 font-mono-path"
          style={{
            color: "var(--color-cool-meta)",
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
          }}
        >
          Showcase/
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
          Side project.
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
          Not a system I was hired to build — representative of how I think
          when I&apos;m the one setting the bar.
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
            <p
              className="font-mono-label mb-3"
              style={{ color: "var(--color-cool-meta)" }}
            >
              Showcase / bts-evolution.md
              <span
                aria-hidden="true"
                className="mx-2"
                style={{ color: "var(--color-border)" }}
              >
                —
              </span>
              2025 — Live
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
                fontSize: "clamp(1.375rem, 2.6vw, 2.25rem)",
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

        {/* ===== ESSAY in 2-col layout ===== */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-8 mb-12">
          <div className="col-span-12 lg:col-span-6">
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: "var(--color-text)",
              }}
            >
              {project.essay[0]}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: "var(--color-text)",
              }}
            >
              {project.essay[1]}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: "var(--color-text)",
              }}
            >
              {project.essay[2]}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                color: "var(--color-foreground)",
              }}
            >
              {project.essay[3]}
            </p>
          </div>
        </div>

        {/* ===== SIGNATURE INSIGHT — designed card ===== */}
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <div
              className="p-7"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: "2px",
              }}
            >
              <p
                className="font-mono-label mb-3"
                style={{ color: "var(--color-accent)" }}
              >
                {project.signatureInsight.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--color-foreground)",
                }}
              >
                {project.signatureInsight.body}
              </p>
            </div>
          </div>
        </div>

        {/* ===== TECH STACK grid ===== */}
        <div className="grid grid-cols-12 gap-x-6 mb-10">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <p
              className="font-mono-label mb-4 pb-2 border-b"
              style={{
                color: "var(--color-foreground)",
                borderColor: "var(--color-foreground)",
              }}
            >
              Tech stack
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-meta"
                  style={{
                    fontSize: "0.8125rem",
                    padding: "0.5rem 0.75rem",
                    background: "var(--color-surface)",
                    color: "var(--color-text)",
                    borderRadius: "2px",
                    textAlign: "center",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CTA — open live site ===== */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              style={{
                background: "var(--color-foreground)",
                color: "var(--color-background)",
                borderRadius: "2px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.9375rem",
              }}
            >
              <span>Open the live site</span>
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
}
