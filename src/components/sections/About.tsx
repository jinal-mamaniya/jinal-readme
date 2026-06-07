import { siteConfig } from "@/data/siteConfig";

/**
 * About — the 5-second test for the entire portfolio.
 *
 * Composition committed (not half-measured):
 *   — Massive `#` graphic now at L=82% (was L=92% — too faint to register).
 *     Present enough to be the design moment without competing with the
 *     name typography.
 *   — Tightened vertical rhythm so name, description, and pull-quote read
 *     as one connected hero — not three blocks separated by dead space.
 *     Description sits directly below the name (not at viewport mid-line),
 *     pull-quote sits to its right on the same row.
 *   — Hero occupies natural height (not forced min-h-screen) so the badges
 *     row sits close to the content, not at the bottom of an artificially
 *     stretched viewport.
 *   — Top meta row stays compact at the top edge.
 *   — Bottom badges row tight against the content above.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden flex flex-col"
    >
      {/* === Top meta row — file path only ===
          Cleaned 2026-05-31. Was a three-part faux-git status line:
            jinal-mamaniya/About.md — last updated 2026 — main
          Same family of strict-review failure as the `#` markdown graphic
          and the `main · clean` file-tree footer, both already dropped:
            (1) "last updated 2026" was a year-only timestamp masquerading
                as commit metadata. Real engineering documents ship dates
                or version numbers, not bare years.
            (2) "main" in cobalt implied a live branch indicator. It was
                static text. Decorative cosplay of git UI, not real state.
          The file path (jinal-mamaniya/About.md) is kept — it functions
          as document orientation, matches the file-tree register, and
          earns its place as the one mark that supports the engineering-
          doc thesis instead of decorating it. === */}
      {/* Page-top file path — bumped to match SectionTitle scale so the
          engineering-doc orientation reads at scan speed. */}
      <div
        className="px-6 sm:px-10 pt-8 font-mono-label"
        style={{
          color: "var(--color-cool-meta)",
          fontSize: "clamp(1.125rem, 1.4vw, 1.25rem)",
          letterSpacing: "0.05em",
        }}
      >
        <span>jinal-mamaniya/About.md</span>
      </div>

      {/* === `#` GRAPHIC REMOVED 2026-05-30 ===
          Two converging issues retired this element:

          (1) Markdown-source cosplay (strict-review finding). The `#`
              is literally the markdown header character. The portfolio's
              thesis is "this IS a README" — a *rendered* markdown
              document. Rendered markdown does not display its own source
              characters; viewers see headings, not the `#`. The graphic
              decorated the page with the symbol the document is supposed
              to render away — violating the conceit it was meant to
              support. Same family of error as `▸` triangle decoration
              and `## h2 ##` prefix display that earlier code cycles
              already rejected.

          (2) Theme-blind hardcoded color. `oklch(82% 0 0)` was tuned for
              cream backgrounds — subtle on light, the `#` did not
              compete with the name. Dark mode (oklch 15% background)
              flipped the relationship: the mid-gray graphic now sat
              brightly against the dark surface, only 10 L-units below
              the near-white name itself. The decoration that worked by
              luck in one mode broke as soon as the second mode shipped.

          Removing it tightens the hero: the massive name carries the
          composition alone, the cobalt-ruled thesis carries the claim,
          the bio carries the supporting facts. No replacement decoration
          — Pentagram/Vignelli/Helvetica convention is that display type
          at 13vw IS the design moment. It does not need a graphic
          behind it. === */}

      {/* === Hero content. INVERSION (2026-05-30): the italic thesis used
          to sit as a sidebar to the description paragraph — equal weight,
          equal scale, sharing a row. A hiring manager's 5-second scan read
          "name + bio + side quote," not "name + claim." Inverting the
          composition: thesis is promoted to dominant lower copy at display
          scale; bio drops to small supporting meta. The hero now opens with
          a claim, not a category. Content is identical (rule #15: same
          siteConfig.cover.title and same bio prose) — only weight is
          redistributed. === */}
      <div className="relative z-10 px-6 sm:px-10 pt-12 pb-10">
        {/* Name — display scale, dominant identity anchor. */}
        <h1
          className="mb-8"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(3.5rem, 13vw, 14rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.88,
            color: "var(--color-foreground)",
          }}
        >
          {siteConfig.name}
        </h1>

        {/* Thesis — promoted from sidebar pull-quote to the hero's primary
            claim. Display scale italic with cobalt left rule retains the
            editorial register the rest of the document uses for thesis
            statements (SystemFile chapters, Notes pull-quotes). The eye
            now lands on Jinal's claim, not on her job category. */}
        <p
          className="mb-7"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: "var(--color-foreground)",
            borderLeft: "3px solid var(--color-accent)",
            paddingLeft: "1.75rem",
            maxWidth: "30ch",
          }}
        >
          {siteConfig.cover.title}
        </p>

        {/* Bio — supporting meta. Quiet sans paragraph anchored at the
            name's left edge (no indent), text-muted color, smaller scale.
            Reads as the citation for the claim above it.

            Two phrases lifted into colored emphasis:
              - "Senior Software Engineer" → --color-accent (cobalt):
                role/identity is the brand-emphasis token's exact use case.
              - "Raleigh, NC" → --color-now (green): location maps to the
                already-reserved "currently active here" semantic, same
                token that powers the status: active badge above.
            Per rule #31 — both are existing tokens (one brand accent +
            one semantic), no new colors added. */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            /* Bio floor bumped 0.9375rem (15px) → 1rem (16px) on 2026-05-31.
               iOS Safari zooms text below 16px on form inputs and the
               16px floor is the universally cited mobile body standard
               (Apple HIG, Material Design, NN/g). The clamp's max stays
               at 1.0625rem so desktop reads are unchanged. */
            fontSize: "clamp(1rem, 1.05vw, 1.0625rem)",
            fontWeight: 400,
            lineHeight: 1.55,
            color: "var(--color-text-muted)",
            maxWidth: "60ch",
          }}
        >
          <span
            style={{ color: "var(--color-accent)", fontWeight: 600 }}
          >
            {siteConfig.title}
          </span>{" "}
          based in{" "}
          <span style={{ color: "var(--color-now)", fontWeight: 600 }}>
            Raleigh, NC
          </span>
          . Ten years across legal-tech, public-safety, and enterprise. This
          document is the handoff I&apos;d want from anyone whose work I was
          about to inherit.
        </p>
      </div>

      {/* === Bottom strip — GitHub-spec two-toned badges, tight under content === */}
      <div
        className="relative z-10 px-6 sm:px-10 pb-12 pt-6 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge label="experience" value="10 years" valueColor="var(--color-accent)" />
          <Badge label="lanes" value="legal-tech · public-safety · enterprise" valueColor="var(--color-foreground)" />
          <Badge label="role" value="senior" valueColor="var(--color-foreground)" />
          <Badge label="status" value="active" valueColor="var(--color-now)" />
          {/* G1 fix: multiplier signal in scan zone. EM + Director lens
              catches it in 5 sec. Value traces to Northeastern chapter
              (190 students total) + TCS/LN narratives (mentored engineers
              on multi-team codebase). Rule #15 honored. */}
          <Badge label="mentored" value="190 students · engineering teams" valueColor="var(--color-foreground)" />
          <Badge label="current" value="LexisNexis" valueColor="var(--color-foreground)" />
          <Badge label="based" value="Raleigh, NC, USA" valueColor="var(--color-foreground)" />
        </div>
      </div>
    </section>
  );
}

/* ===== Badge — GitHub-style two-toned rectangular pill ===== */
function Badge({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <span
      className="inline-flex items-stretch text-[11px] rounded-[3px] overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <span
        className="px-2 py-1 font-mono-label"
        style={{
          background: "var(--color-foreground)",
          color: "var(--color-background)",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
      {/* Rule #28 mobile-responsive fix: at mobile (<640px) allow value to
          wrap inside the chip so long values (LANES, BASED, MENTORED) don't
          overflow the viewport. Keep nowrap at sm+ so desktop chips stay
          single-line per the GitHub-badge convention. */}
      <span
        className="px-2 py-1 font-mono-meta whitespace-normal sm:whitespace-nowrap break-words"
        style={{
          background: "var(--color-background)",
          color: valueColor,
          fontWeight: 600,
          /* Constrain max-width on mobile so chip can't push past viewport */
          maxWidth: "100%",
        }}
      >
        {value}
      </span>
    </span>
  );
}
