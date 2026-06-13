import { siteConfig } from "@/data/siteConfig";
import {
  onboardingForNextEngineer,
  dowLetterOfRecommendation,
} from "@/data/unconventional";

/**
 * Maintainer — replaces the book's Colophon.
 *
 * Compositional discipline:
 *   — Section title at display scale + lede
 *   — Contact block as a designed grid (label / value)
 *   — Onboarding as a sustained reading column with pull-quote weight
 *   — LOR as an inserted document card with thick black border (real
 *     document register)
 *   — License & terms as quiet running-foot text
 *   — Sign-off as mono Author: / Signed-off-by: lines (real git/RFC
 *     convention; no Caveat handwriting)
 */
export function Maintainer() {
  return (
    <section
      id="maintainer"
      className="px-6 sm:px-10 pt-40 pb-24 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Section header */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-16">
        {/* Eyebrow on its own full-width row so it doesn't overflow
            the col-span-2 column at 32px — overlap with h2 fixed 2026-06-06.
            Right-side section eyebrow stays at 24-32px to dominate as
            content metadata. */}
        <p
          className="col-span-12 font-mono-path"
          style={{
            color: "var(--color-cool-meta)",
            fontSize: "var(--type-eyebrow)",
          }}
        >
          Maintainer.md
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
          Maintainer.
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
          Who maintains this, how to reach them, and what the next engineer
          should know before they inherit any of the systems above.
        </p>
      </div>

      {/* CONTACT — was a col-2 sticky label / col-10 content split that left
          the lower 70% of cols 1-2 empty below the short "Contact" mark.
          Promoted the label to an eyebrow above the name; content owns the
          full chapter-aligned reading column (col-3 to col-12). */}
      <div className="grid grid-cols-12 gap-x-6 mb-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <SectionEyebrow label="Contact" />
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            {siteConfig.name}
            <span
              className="font-mono-meta ml-3"
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              {siteConfig.title} · Raleigh, NC
            </span>
          </p>
          <div className="space-y-2">
            <div className="flex items-baseline gap-4">
              {/* Field label scale — readable but still smallest in the
                  Maintainer hierarchy: file-path > eyebrow > field-label. */}
              <span
                className="font-mono-label"
                style={{
                  color: "var(--color-cool-meta)",
                  minWidth: "5rem",
                  fontSize: "var(--type-label-sm)",
                  letterSpacing: "0.05em",
                }}
              >
                email
              </span>
              <a
                href={`mailto:${siteConfig.emailUser}@${siteConfig.emailDomain}`}
                className="font-mono-meta inline-flex items-center transition-colors duration-200"
                /* WCAG 2.1 SC 2.5.8 — 24x24 target size for non-inline links. */
                style={{
                  color: "var(--color-accent)",
                  minHeight: "24px",
                  padding: "2px 0",
                }}
              >
                {siteConfig.emailUser}@{siteConfig.emailDomain}
              </a>
            </div>
            {siteConfig.socialLinks.map((link) => (
              <div key={link.platform} className="flex items-baseline gap-4">
                <span
                  className="font-mono-label"
                  style={{
                    color: "var(--color-cool-meta)",
                    minWidth: "5rem",
                    fontSize: "var(--type-label-sm)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.platform.toLowerCase()}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-meta inline-flex items-center transition-colors duration-200"
                  /* WCAG 2.1 SC 2.5.8 — 24x24 target size. */
                  style={{
                    color: "var(--color-accent)",
                    minHeight: "24px",
                    padding: "2px 0",
                  }}
                >
                  {link.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ONBOARDING — biggest wastage offender pre-fix. Onboarding body
          runs ~5 paragraphs (~800px) while the col-2 "Onboarding" label was
          a single line. Now the label is an eyebrow above the heading; body
          uses the chapter reading column with 68ch max-width preserved. */}
      <div className="grid grid-cols-12 gap-x-6 mb-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <SectionEyebrow label="Onboarding" />
          <h4
            className="mb-5"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-h4)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--color-foreground)",
            }}
          >
            For the next engineer.
          </h4>
          <div
            className="whitespace-pre-line"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.65,
              color: "var(--color-text)",
              maxWidth: "68ch",
            }}
          >
            {onboardingForNextEngineer}
          </div>
        </div>
      </div>

      {/* ACKNOWLEDGMENTS — LOR. The card itself is the tallest block on
          this page (~1500px). Pre-fix, the col-2 "Ack." label sat at the
          top with ~1400px of empty col-1-2 below it — by far the worst
          left-rail wastage. Eyebrow + chapter-aligned card eliminates it. */}
      <div id="maintainer-lor" className="grid grid-cols-12 gap-x-6 mb-20 scroll-mt-12">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <SectionEyebrow label="Acknowledgments" />
          <h4
            className="mb-4"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-h4)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--color-foreground)",
            }}
          >
            Letter of Recommendation
          </h4>
          <div
            className="p-7"
            style={{
              border: "2px solid var(--color-foreground)",
              borderRadius: "2px",
              background: "var(--color-background)",
            }}
          >
            <div
              className="font-mono-meta mb-5 pb-4 border-b grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1"
              style={{
                color: "var(--color-text-dim)",
                fontSize: "0.8125rem",
                borderColor: "var(--color-border)",
              }}
            >
              <div>
                <span style={{ color: "var(--color-cool-meta)" }}>From: </span>
                <strong style={{ color: "var(--color-foreground)", fontWeight: 600 }}>
                  {dowLetterOfRecommendation.author}
                </strong>
                , {dowLetterOfRecommendation.authorTitle}
              </div>
              <div>
                <span style={{ color: "var(--color-cool-meta)" }}>Organization: </span>
                {dowLetterOfRecommendation.authorOrganization}
              </div>
              <div>
                <span style={{ color: "var(--color-cool-meta)" }}>Date: </span>
                {dowLetterOfRecommendation.date}
              </div>
              <div>
                <span style={{ color: "var(--color-cool-meta)" }}>Email: </span>
                <a
                  href={`mailto:${dowLetterOfRecommendation.authorEmail}`}
                  /* WCAG 2.1 SC 2.5.8 — 24x24 target size for non-inline link. */
                  className="inline-flex items-center"
                  style={{
                    color: "var(--color-accent)",
                    minHeight: "24px",
                    padding: "2px 0",
                  }}
                >
                  {dowLetterOfRecommendation.authorEmail}
                </a>
              </div>
            </div>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.6,
                color: "var(--color-foreground)",
              }}
            >
              {dowLetterOfRecommendation.greeting}
            </p>
            <div
              className="space-y-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                lineHeight: 1.6,
                color: "var(--color-foreground)",
              }}
            >
              {dowLetterOfRecommendation.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                color: "var(--color-foreground)",
              }}
            >
              {dowLetterOfRecommendation.signoff}
            </p>
            <p
              className="font-mono-meta mt-4"
              style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}
            >
              <strong style={{ color: "var(--color-foreground)", fontWeight: 600 }}>
                {dowLetterOfRecommendation.signature}
              </strong>
              <br />
              {dowLetterOfRecommendation.signatureTitle}
            </p>
          </div>
        </div>
      </div>

      {/* LICENSE & TERMS */}
      <div className="grid grid-cols-12 gap-x-6 mb-12">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <SectionEyebrow label="License" />
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.9375rem, 1.05vw, 1rem)",
              lineHeight: 1.6,
              color: "var(--color-text)",
              maxWidth: "68ch",
            }}
          >
            Set in Geist Sans + Geist Mono, loaded via next/font. Light and
            dark modes both first-class — defaults to your system preference,
            toggle persists in localStorage. Built with Next.js. © 2026
            Jinal Mamaniya. All rights reserved — but this story is meant
            to be shared.
          </p>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              lineHeight: 1.55,
              color: "var(--color-text-dim)",
              maxWidth: "68ch",
            }}
          >
            Figures and architecture diagrams shown reflect publicly disclosed
            or client-authorized data. Current-employer specifics have been
            anonymized per professional standards.
          </p>
        </div>
      </div>

      {/* SIGN-OFF — git/RFC convention */}
      <div
        className="grid grid-cols-12 gap-x-6 gap-y-2 pt-8 border-t"
        style={{ borderColor: "var(--color-foreground)" }}
      >
        <p
          className="col-span-12 font-mono-meta"
          style={{
            color: "var(--color-text-muted)",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: "var(--color-cool-meta)" }}>Author:</span>{" "}
          <strong style={{ color: "var(--color-foreground)", fontWeight: 600 }}>
            {siteConfig.name}
          </strong>{" "}
          &lt;
          <a
            href={`mailto:${siteConfig.emailUser}@${siteConfig.emailDomain}`}
            style={{ color: "var(--color-accent)" }}
          >
            {siteConfig.emailUser}@{siteConfig.emailDomain}
          </a>
          &gt;
        </p>
        <p
          className="col-span-12 font-mono-meta"
          style={{
            color: "var(--color-text-dim)",
            fontSize: "0.8125rem",
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: "var(--color-cool-meta)" }}>Signed-off-by:</span>{" "}
          Jinal Mamaniya · Raleigh, NC · 2026
        </p>
      </div>
    </section>
  );
}

/* ===== SectionEyebrow — the small mono label that replaced the sticky
   col-2 sidebar header. Sits as a quiet eyebrow above the block's display
   heading with a 2-px black rule running the full chapter column. The
   rule is the structural mark; the label is the navigation anchor; the
   content directly below owns the canvas instead of leaving a long
   empty col-1-2 strip. */
function SectionEyebrow({ label }: { label: string }) {
  /* Sub-section eyebrow — sits between the bumped section labels (18-26px)
     and field labels (~13px). 15-18px = clearly readable sub-divider
     without competing with the section-level header. */
  return (
    <p
      className="font-mono-label mb-6 pb-2 border-b-2"
      style={{
        color: "var(--color-foreground)",
        borderColor: "var(--color-foreground)",
        fontSize: "clamp(0.9375rem, 1.2vw, 1.125rem)",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </p>
  );
}
