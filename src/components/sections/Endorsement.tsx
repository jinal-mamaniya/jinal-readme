import { dowLetterOfRecommendation } from "@/data/unconventional";

/**
 * Endorsement — featured LOR callout immediately after the About hero.
 *
 * The Dow LOR is Jinal's strongest external-credibility asset — a Fortune
 * 500 client tool owner publicly recommending her for "any position as a
 * lead developer or team lead." Most senior FS engineers don't have a
 * published LOR at all; surfacing it at the bottom of the Maintainer
 * section means most readers never see it on first scroll.
 *
 * Compositional treatment: full-width section between About and README.
 * The recommendation's strongest line displayed at oversized italic
 * (display-quote register), attributed to Jacky Aikin at Dow, with a
 * "Read full letter →" anchor linking to the LOR card in Maintainer.
 *
 * Honors rule #15: pulls verbatim from dowLetterOfRecommendation. No
 * invention; just elevation of the existing artifact's most quotable
 * moment.
 */
export function Endorsement() {
  /* The strongest single sentence from the LOR — closing recommendation.
     Pulls from dowLetterOfRecommendation.body[4] (the final recommendation
     paragraph in the LOR text). */
  const closingLine =
    "I am happy to recommend Jinal for any position as a lead developer or team lead for a software development team.";

  return (
    <section
      id="endorsement"
      aria-label="External endorsement — Dow Chemical Letter of Recommendation"
      className="px-6 sm:px-10 py-20 border-y mx-auto max-w-screen-2xl"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-foreground)",
      }}
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-start">
        {/* Left-column mono header — "ENDORSEMENT" as quiet anchor */}
        <div className="col-span-12 lg:col-span-3">
          {/* Match the bumped section-label scale across sections. */}
          <p
            className="font-mono-label mb-2"
            style={{
              color: "var(--color-accent)",
              fontSize: "clamp(1.125rem, 1.6vw, 1.625rem)",
              letterSpacing: "0.05em",
            }}
          >
            Endorsement
          </p>
          <p
            className="font-mono-meta"
            style={{
              color: "var(--color-text-dim)",
              fontSize: "0.8125rem",
              lineHeight: 1.55,
            }}
          >
            Letter of Recommendation
            <br />
            The Dow Chemical Company
            <br />
            July 2021
          </p>
        </div>

        {/* Pull-quote at display-italic scale — the moment */}
        <div className="col-span-12 lg:col-span-9">
          <blockquote
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-foreground)",
              borderLeft: "4px solid var(--color-accent)",
              paddingLeft: "1.75rem",
              maxWidth: "44ch",
            }}
          >
            “{closingLine}”
          </blockquote>

          {/* Attribution + link to full letter */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <p
              className="font-mono-meta"
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.9375rem",
              }}
            >
              —{" "}
              <strong
                style={{
                  color: "var(--color-foreground)",
                  fontWeight: 600,
                }}
              >
                {dowLetterOfRecommendation.author}
              </strong>
              , {dowLetterOfRecommendation.authorTitle},{" "}
              {dowLetterOfRecommendation.authorOrganization}
            </p>
            <a
              href="#maintainer-lor"
              className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              /* WCAG 2.1 SC 2.5.8 — 24x24 target size. */
              style={{
                color: "var(--color-accent)",
                minHeight: "24px",
                padding: "4px 0",
              }}
            >
              <span>Read full letter</span>
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
