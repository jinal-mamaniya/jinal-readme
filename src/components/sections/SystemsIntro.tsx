/**
 * SystemsIntro — opens the Systems/ directory.
 *
 * Pentagram-tier composition: directory-marker label + massive headline +
 * asymmetric description column. No `#` prefix cosplay.
 */
export function SystemsIntro() {
  return (
    <section
      id="systems"
      className="px-6 sm:px-10 pt-24 pb-12 scroll-mt-12 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-4">
        <p
          className="col-span-12 lg:col-span-2 font-mono-path"
          style={{ color: "var(--color-cool-meta)" }}
        >
          Systems/
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
          Four production systems.
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
          Each its own file below. Framed the way I&apos;d hand it off — what
          it does, what I decided and why, what it doesn&apos;t cover, what
          I&apos;d qualify now with hindsight, and the operating metrics that
          held while I was maintaining it.
        </p>
      </div>
    </section>
  );
}
