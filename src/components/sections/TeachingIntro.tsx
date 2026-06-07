/**
 * TeachingIntro — opens the Teaching/ directory.
 *
 * Per rule #6 consistency: every directory in the file tree has an intro
 * section before its chapters (Systems → "Four production systems.",
 * Showcase → "Side project.", Notes → "Maintainer's notes.", Glossary
 * → "Topic index."). Teaching/ was the lone exception — went straight
 * from the file-tree anchor into the Northeastern chapter with no
 * directory-level intro. This component closes that gap.
 *
 * Pattern mirrors SystemsIntro exactly: directory marker label +
 * massive headline + asymmetric description column.
 */
export function TeachingIntro() {
  return (
    <section
      id="teaching"
      className="px-6 sm:px-10 pt-40 pb-12 scroll-mt-12 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-4">
        <p
          className="col-span-12 lg:col-span-2 font-mono-path"
          style={{ color: "var(--color-cool-meta)" }}
        >
          Teaching/
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
          Teaching role.
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
          Two semesters at Northeastern — 190 students across both cohorts,
          no slides, lab sessions as live debugging. Teaching what production-
          quality thinking looks like before the code gets written.
        </p>
      </div>
    </section>
  );
}
