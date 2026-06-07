import { credentials } from "@/data/unconventional";
import { EngineeringDecisionTree } from "@/components/figures/EngineeringDecisionTree";

/**
 * Readme — the project's actual README, rendered with Pentagram/Vignelli
 * compositional discipline.
 *
 * Strict departures from the earlier "literary essay with markdown emoji":
 *   — No `#`/`##` mono prefix decorations. That was raw-source cosplay.
 *     Rendered markdown uses size hierarchy, period.
 *   — Heading scale carries weight contrast: README at clamp(2.5–5rem),
 *     H2 sub-sections at clamp(1.5–2.5rem). Order-of-magnitude type
 *     differences in the same view are the point.
 *   — Asymmetric layouts inside sub-sections — numbered grid for Operating
 *     principles, two-column for Stack reach/avoid, side-by-side for
 *     Credentials. No more single-column scroll-forever.
 *   — Strategic use of the full canvas width. Section meta sits in a
 *     narrow left column; content uses the rest. Grid composition.
 *   — Real list semantics, not custom `▸` triangle decoration.
 */
export function Readme() {
  return (
    <section
      id="readme"
      className="px-6 sm:px-10 pt-40 pb-24 scroll-mt-12 border-t mx-auto max-w-screen-2xl"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-16">
        {/* File path + role assertion — sits in left margin.
            Pattern P1 fix: Recruiter / Hiring Manager / CTO catches the
            5-second scan needs a level claim. Resume asserts "Senior
            Software Engineer with 9+ years" verbatim; mirrored here in
            the engineering-doc register (lowercase mono tag, no shouting
            badge) so it reads as fact-statement, not marketing. */}
        <div className="col-span-12 lg:col-span-2">
          {/* File path uses .font-mono-path so it matches the sidebar's
              `README.md` exactly. Per rule #6 consistency. */}
          <p
            className="font-mono-path"
            style={{
              color: "var(--color-cool-meta)",
            }}
          >
            README.md
          </p>
          <div
            className="mt-4 pt-4 border-t font-mono-label"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
              lineHeight: 1.7,
            }}
          >
            <p>
              <span style={{ color: "var(--color-cool-meta)" }}>role:</span>{" "}
              senior software engineer
            </p>
            <p>
              <span style={{ color: "var(--color-cool-meta)" }}>years:</span>{" "}
              10
            </p>
            <p>
              <span style={{ color: "var(--color-cool-meta)" }}>base:</span>{" "}
              raleigh, NC
            </p>
            {/* `since:` traces verbatim to projects.ts:175 ("my 2013
                engineering start") and experience.ts:250 (TCS Jul 2013
                onwards). Surfaces career-start year next to years count
                so reader can cross-check the 10y claim against a
                concrete date — engineering-doc register. */}
            <p>
              <span style={{ color: "var(--color-cool-meta)" }}>since:</span>{" "}
              2013
            </p>
          </div>
        </div>

        {/* Headline — massive, no `#` prefix */}
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
          The handoff document
          <br />
          for a decade of work.
        </h2>

        {/* Thesis — sits between headline and lede.
            Pattern P2 fix: Hiring Manager / Principal / CTO / Conference-
            organizer all want a stance, not just a frame. This line is
            verbatim from Jinal's own /01 package.json "belief" field, so
            it's her authored voice elevated to the scan zone — no
            manufactured copy (rule #15). */}
        <p
          className="col-span-12 lg:col-span-9 lg:col-start-3 mt-6"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "var(--color-foreground)",
            fontStyle: "italic",
          }}
        >
          The framework is incidental; judgment scales.
        </p>

        {/* Lede — sits right of the file path label.
            Reading-measure cap at 75ch so the line stays in the
            Bringhurst-optimal 50-75 character range at 1920+ viewports. */}
        <p
          className="col-span-12 lg:col-span-7 lg:col-start-3 mt-2"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "var(--color-text-muted)",
            maxWidth: "75ch",
          }}
        >
          Ten years across legal-tech, public-safety, and enterprise. Different
          scale, different stakes, different trade-offs. That&apos;s where real
          engineering judgment comes from.
        </p>

        {/* Business-impact strip — horizontal scan-zone metrics.
            Pattern P4 fix: VP Eng / CTO / CEO all want measurable
            impact visible without scrolling to /01. Every value here
            traces verbatim to resume-fullstack.pdf (rule #15):
              17K daily users — TCS Dow OPD summary
              99.95% availability — LexisNexis Polly bullet
              100K+ events — LexisNexis RabbitMQ bullet
              42% latency / 70% DB / 80% app speed — LexisNexis summary */}
        {/* Metric strip — cap max-width at large viewports so the 4 values
            don't spread into 300px+ inter-metric gutters at 1920. Keeps the
            strip tight on wide screens, doesn't change 1440 or below. */}
        {/* Inner grid breakpoint at `lg` (not `sm`) — the composite
            "42 · 70 · 80%" value + "latency · DB · app speed" label is
            wider than the other three pairs. At sm (640) and md (768)
            the 4-up split shrinks each cell to ~150px which forces the
            longer label to wrap to two lines, breaking row rhythm.
            Holding 2-up until lg (1024) keeps every label single-line
            at tablet, then opens to 4-up only when there's genuine
            horizontal room. */}
        <ul
          className="col-span-12 lg:col-span-10 lg:col-start-3 mt-8 pt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 border-t"
          style={{
            borderColor: "var(--color-border)",
            maxWidth: "64rem",
          }}
        >
          {/* Labels render as JSON key-paths (lowercase, dot-notation)
              rather than prose. The strip becomes a zoom-out preview
              of the `~/jinal/package.json` block that follows — same
              artifact at different zoom levels, tied together by one
              typography decision. Every key here resolves verbatim to
              a value in the JSON block below:
                metrics.users              → "17K+ daily (TCS Dow OPD)..."
                metrics.availability       → "99.95% API (LexisNexis Polly)..."
                metrics.throughput         → "100K+ daily events (LexisNexis)..."
                metrics.latency_reduction  → "42% system · 70% DB · 80% app speed (LexisNexis)"
              Source trail self-documents at the cell label level
              (rule #16). 42/70/80% composite traces to LexisNexis
              summary bullet on resume-fullstack.pdf. */}
          {/* Each metric carries its dominant Stack Atlas craft dimension.
              The digit displays render in the dimensional color so the
              hero scan-zone IMMEDIATELY signals "four distinct craft
              dimensions in play" before the reader scrolls anywhere.
              Mapping:
                17K+ users           → multiplier (people scale, magenta)
                99.95% availability  → discipline (reliability, orange)
                100K+ throughput     → runtime (throughput at scale, slate)
                42·70·80% latency    → judgment (perf optimization as a
                                       judgment call, cobalt)
              Semantic categorical per rule #31 — same exemption as
              Shiki tokens. Atlas remains the legend. */}
          {[
            {
              value: "17K+",
              label: "metrics.users",
              color: "var(--color-atlas-multiplier)",
            },
            {
              value: "99.95%",
              label: "metrics.availability",
              color: "var(--color-atlas-discipline)",
            },
            {
              value: "100K+",
              label: "metrics.throughput",
              color: "var(--color-atlas-runtime)",
            },
            {
              value: "42 · 70 · 80%",
              label: "metrics.latency_reduction",
              color: "var(--color-atlas-judgment)",
            },
          ].map((m, i) => (
            <li key={i}>
              <p
                className="tabular-nums"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: m.color,
                }}
              >
                {m.value}
              </p>
              {/* Override font-mono-label's `text-transform: uppercase`
                  and `letter-spacing: 0.1em` — JSON key-paths render as
                  lowercase code identifiers with default mono tracking.
                  Mono family + 11px size carry over from the base class
                  so the visual register stays consistent with the rest
                  of the engineering-doc mono labels on the page. */}
              <p
                className="font-mono-label mt-2"
                style={{
                  color: "var(--color-cool-meta)",
                  textTransform: "none",
                  letterSpacing: "0",
                }}
              >
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== WHAT I BUILD — package.json register =====
          Rendered as a literal package.json file rather than editorial
          prose. Per RESEARCH.md §3E (engineering-doc native alternative
          to editorial 2-column body): JSON-schema / config-block
          personality fits the README-genre register specifically.
          Every key/value traces verbatim to resume + LinkedIn (rule #15).
          The package.json convention itself is the creative move — it's
          a file every engineer recognizes intimately, which signals
          "she knows this genre" without requiring engineer-niche
          interaction (slip pattern #9 cleared). */}
      <SectionTitle label="01" title="What I build" />
      <div className="grid grid-cols-12 gap-x-6 mb-20">
        <div className="col-span-12 lg:col-span-9 lg:col-start-3">
          <div
            className="rounded-sm overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Header bar — just the filename, like GitHub's file viewer.
                Prior version showed `@jinal/career · v10.0.0` on the right
                which duplicated the first two lines of JSON. Real file
                viewers (GitHub, VS Code) show path/filename only. */}
            <div
              className="flex items-center px-4 py-2 border-b font-mono-label"
              style={{
                background: "var(--color-foreground)",
                borderColor: "var(--color-foreground)",
                color: "var(--color-background)",
              }}
            >
              <span>~/jinal/package.json</span>
            </div>
            {/* JSON body — hand-styled syntax highlighting:
                  keys      → accent (cobalt)
                  strings   → foreground
                  numbers   → foreground
                  punctuation → cool-meta (subdued) */}
            <pre
              className="overflow-x-auto p-5 m-0"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                lineHeight: 1.65,
                background: "transparent",
                margin: 0,
                color: "var(--color-text)",
              }}
            >
              <code>
                <JsonLine indent={0}>{"{"}</JsonLine>
                <JsonPair indent={2} k="name" v={`"@jinal/career"`} comma />
                {/* CalVer "2026.5" instead of semver "10.0.0" — career
                    doesn't have "breaking changes" so semver was wrong
                    semantically. CalVer (YYYY.M) is used in real production
                    (Ubuntu, JetBrains) and conveys "currently shipping as
                    of this date." Experience moves to a custom top-level
                    field so the 10-years signal stays visible. */}
                <JsonPair indent={2} k="version" v={`"2026.5"`} comma />
                <JsonPair indent={2} k="experience" v={`"10 years"`} comma />
                <JsonPair
                  indent={2}
                  k="description"
                  v={`"Most of the software I've built, people never think about — and that's the point."`}
                  comma
                />
                {/* Metrics expanded 2026-05-31 from 3 entries to 12 — prior
                    was a shortcut that left ~25 documented achievements out.
                    LexisNexis daily-users metric specifically removed per
                    Jinal's call (current-employer NDA-prudent — other LN
                    numbers stay because they're in the public resume).
                    Every metric traces to resume + LinkedIn; each attribution
                    names the system + technique. */}
                <JsonObjectOpen indent={2} k="metrics" />
                <JsonPair indent={4} k="users" v={`"17K+ daily (TCS Dow OPD) · 3K+ (LTI early)"`} comma />
                <JsonPair indent={4} k="global_reach" v={`"650 plants · 13 languages (TCS Dow OPD)"`} comma />
                <JsonPair indent={4} k="availability" v={`"99.95% API (LexisNexis · Polly resilience)"`} comma />
                <JsonPair indent={4} k="throughput" v={`"100K+ daily events (LexisNexis)"`} comma />
                <JsonPair indent={4} k="latency_reduction" v={`"42% system · 70% DB · 80% app speed (LexisNexis)"`} comma />
                <JsonPair indent={4} k="downtime_reduction" v={`"75% (TCS Dow · exception handling)"`} comma />
                <JsonPair indent={4} k="error_reduction" v={`"82% (LexisNexis Polly) · 60% (TCS Fluent Validation)"`} comma />
                <JsonPair indent={4} k="test_coverage" v={`"95% (Motorola public safety · NUnit)"`} comma />
                <JsonPair indent={4} k="code_quality" v={`"18% post-release defects ↓ (LexisNexis code reviews)"`} comma />
                <JsonPair indent={4} k="delivery_speed" v={`"40% time-to-market (LexisNexis DDD) · 40% feature delivery (TCS)"`} comma />
                <JsonPair indent={4} k="deployment" v={`"automated end-to-end (LexisNexis Azure CI/CD)"`} comma />
                <JsonPair indent={4} k="scope" v={`"20+ clean-architecture services (TCS) · 25+ stored procedures (LTI)"`} />
                <JsonClose indent={2} closer="}" comma />
                <JsonInlineArray
                  indent={2}
                  k="domains"
                  items={["legal-tech", "public-safety", "enterprise"]}
                  comma
                />
                {/* "stack" mirrors the Stack Atlas dimensions (rule #6 —
                    same taxonomy throughout the document). The atlas is
                    the portfolio's central organizing principle; this
                    JSON block is a zoom-out preview of the atlas below.
                    Same six dimensions:
                      discipline · data_craft · ai_augmented ·
                      multiplier · judgment · runtime
                    Earlier 4-category structure (languages/frameworks/
                    databases/infra) was traditional engineering-doc
                    convention but ignored the portfolio's own thesis.

                    Every item traces to techRadar.ts or stackAtlas.ts —
                    rule #15 honored (no fabricated tech). Replaced
                    "Express" with "Express.js" matching techRadar name.
                    Added "avoid" key after stack — anti-patterns from
                    techRadar "hold" ring, surfaces engineering judgment
                    that "what I don't use and why" is senior signal. */}
                <JsonObjectOpen indent={2} k="stack" />
                <JsonInlineArray
                  indent={4}
                  k="discipline"
                  items={[
                    "NUnit",
                    "xUnit",
                    "Cypress",
                    "Jest",
                    "Jasmine",
                    "Karma",
                    "React Testing Library",
                    "Fluent Validation",
                    "Custom error middleware",
                    "PII masking",
                    "Polly retry",
                    "Polly circuit breaker",
                    "OAuth 2.0",
                    "JWT",
                    "Observability",
                  ]}
                  comma
                />
                <JsonInlineArray
                  indent={4}
                  k="data_craft"
                  items={[
                    "SQL",
                    "T-SQL",
                    "LINQ",
                    "SQL Server",
                    "PostgreSQL",
                    "MongoDB",
                    "Stored procedures",
                    "Indexed views",
                    "CTEs + window functions",
                    "Constraints + computed cols",
                    "Scalar + TVF functions",
                    "DbContext + transactions",
                    "EF Core",
                    "Entity Framework",
                    "EF + raw SQL hybrid",
                    "Schema-first design",
                    "Multi-tenant schema",
                    "Normalization",
                    "i18n schema",
                    "ETL pipelines",
                    "Redis caching",
                    "Distributed Caching",
                  ]}
                  comma
                />
                <JsonInlineArray
                  indent={4}
                  k="ai_augmented"
                  items={[
                    "GitHub Copilot",
                    "Claude / Claude Code",
                    "AI-assisted code review",
                    "Agent-augmented debugging",
                    "Agent-augmented workflow",
                    "Prompt as code",
                  ]}
                  comma
                />
                <JsonInlineArray
                  indent={4}
                  k="multiplier"
                  items={[
                    "Code review as teaching",
                    "Mentorship + Teaching",
                    "Mentoring juniors",
                    "Knowledge transfer",
                    "Cross-team collaboration",
                    "Onboarding new engineers",
                    "Technical writing",
                  ]}
                  comma
                />
                <JsonInlineArray
                  indent={4}
                  k="judgment"
                  items={[
                    "Microservices",
                    "Micro-Frontends",
                    "Monolith ↔ microservices",
                    "API Gateway",
                    "REST",
                    "Domain-Driven Design",
                    "Clean Architecture",
                    "Repository + Unit-of-Work",
                    "MVVM",
                    "MVC",
                    "SOLID",
                    "ADR convention",
                  ]}
                  comma
                />
                <JsonInlineArray
                  indent={4}
                  k="runtime"
                  items={[
                    "C#",
                    "TypeScript",
                    "JavaScript",
                    "HTML5",
                    "CSS3",
                    ".NET Core",
                    "Node.js",
                    "Express.js",
                    "Angular",
                    "Angular Material",
                    "React",
                    "Redux",
                    "RxJS",
                    "Material UI",
                    "GraphQL",
                    "Apollo",
                    "D3.js",
                    "Async Processing",
                    "RabbitMQ",
                    "Docker",
                    "Kubernetes",
                    "Azure DevOps CI/CD",
                    "CI/CD pipelines",
                    "Git",
                    "GitHub",
                    "Postman",
                    "BEM",
                    "SASS / SCSS",
                  ]}
                />
                <JsonClose indent={2} closer="}" comma />
                {/* "avoid" surfaces anti-patterns from techRadar "hold"
                    ring. Documenting what you DON'T use and why is a
                    Principal-tier engineering signal — RESEARCH.md §5B
                    cites this explicitly as senior register. */}
                <JsonInlineArray
                  indent={2}
                  k="avoid"
                  items={[
                    "Framework Zealotry",
                    "Kubernetes Without Earned Topology",
                    "Microservices for Single-Team",
                    "ORM-only for Complex Dynamic Queries",
                    "Test Coverage % as Goal",
                    "jQuery (legacy)",
                    "Bootstrap (legacy)",
                    ".NET MVC (legacy)",
                  ]}
                  comma
                />
                {/* scripts values are normal English prose in quotes.
                    `mentor` script removed — teaching/mentorship is a
                    different theme than "what I build"; lives in the
                    LexisNexis chapter narrative + Notes essay 03. */}
                <JsonObjectOpen indent={2} k="scripts" />
                <JsonPair indent={4} k="default" v={`"asking what the system actually needs"`} comma />
                <JsonPair indent={4} k="belief" v={`"the framework is incidental; judgment scales"`} />
                <JsonClose indent={2} closer="}" />
                <JsonLine indent={0}>{"}"}</JsonLine>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* ===== OPERATING PRINCIPLES ===== */}
      <SectionTitle label="02" title="Operating principles" />
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-12">
        {[
          "Making software faster is engineering. Making an engineering org faster — that's the work I care about.",
          "Public safety software doesn't get to be flaky.",
          "The database is never just a storage layer — it's an engineering decision.",
          "The engineers I help think more clearly about systems — that's the work that compounds.",
        ].map((text, i) => (
          <div
            key={i}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          >
            <p
              className="font-mono-label"
              style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}
            >
              No. {String(i + 1).padStart(2, "0")}
            </p>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
                fontWeight: 500,
                lineHeight: 1.4,
                color: "var(--color-foreground)",
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* ===== What I push back on — anti-pattern stances =====
          G3 fix per CLAUDE.md Operating Roles / expanded catalog #7 + #10:
          Principal-peer + CTO catches need contrarian opinion visible at
          scan zone. /02 already has 4 reach-for stances; this adds 3
          push-back stances. Every item grounded:
            01 → decisionTree.ts leaf-ps-anti (direct, verbatim direction)
            02 → inverted operating principle #3
            03 → inverted operating principle #1
          Rule #15 honored — nothing manufactured.

          Visual register: same card structure as principles above but
          mono-label uses cool-meta (not accent) and "Not." prefix instead
          of "No." — signals negation without restructuring. 3 cards in
          col-span-3 leaves 4th column empty; the asymmetry reads honest
          ("more reach-for than push-back" — which is the truth). */}
      <div className="grid grid-cols-12 gap-x-6 mb-4">
        <div
          className="col-span-12 pt-6 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="font-mono-label"
            style={{
              color: "var(--color-cool-meta)",
              letterSpacing: "0.1em",
            }}
          >
            What I push back on
          </p>
        </div>
      </div>
      {/* Push-back row uses 3-col grid (not 4-col with empty 4th) so 1920+
          viewports don't show 300px of dead column. The "asymmetric reads
          honest" design intent was right at 1440 but turned into visible
          waste at 1920. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mb-20">
        {[
          "Coverage % as the goal — the discipline is reviewing the uncovered 5%, not chasing the headline number.",
          "Treating the database as a storage layer — that's an engineering decision, not infra.",
          "Making software faster without making the org faster — the wrong scale of work.",
        ].map((text, i) => (
          <div key={i}>
            <p
              className="font-mono-label"
              style={{
                color: "var(--color-cool-meta)",
                letterSpacing: "0.1em",
              }}
            >
              Not. {String(i + 1).padStart(2, "0")}
            </p>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
                fontWeight: 500,
                lineHeight: 1.4,
                color: "var(--color-text)",
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* ===== /03 STACK — Engineering Decision Tree =====================
          Replaces the prior 2-column "I reach for / I don't" treatment
          (and the broken Tech Radar attempt) with an actual INTERACTIVE
          decision tree of Jinal's engineering judgment. Visitor clicks
          through a scenario, walks the decision points, and lands on a
          full recommended stack with reasoning trail + trade-offs +
          chapter citation.

          Why this is the creative move no senior portfolio does (verified
          against all 9 portfolios in RESEARCH.md §1 + the engineering
          blogs in §2): every other senior portfolio LISTS tools or
          DESCRIBES preferences. None lets the visitor walk the decision
          chain interactively.

          Pattern: Microsoft Azure WAF decision trees + AWS Well-Architected
          + Google Cloud "choose the right X" decision matrices. Real
          engineering-doc convention applied to the portfolio register. */}
      <SectionTitle label="03" title="Stack" />
      {/* Atlas console spans the full content width — the 6-column
          vertical map needs the horizontal room the other sections don't
          claim. col-start-3 offset removed here intentionally. */}
      <div className="grid grid-cols-12 gap-x-6 mb-20">
        <div className="col-span-12">
          <EngineeringDecisionTree />
        </div>
      </div>

      {/* ===== HOW I GOT HERE =====
          Was a 7-col body + 4-col col-start-9 sidebar. Col-8 was a dead
          gap; the 3-stop Arc ended at ~250px while body ran ~600px,
          leaving canvas empty below the sidebar. Converted Arc to a
          horizontal trajectory strip above the body — horizontal flow
          is the natural register for a geographic journey anyway. Body
          widens to col-3-12 with 68ch reading-measure caps on paragraphs. */}
      <SectionTitle label="04" title="How I got here" />

      {/* Arc — horizontal city trajectory */}
      <div className="grid grid-cols-12 gap-x-6 mb-8">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <p
            className="font-mono-label mb-4 pb-2 border-b-2"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Arc
          </p>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-5">
            {[
              { city: "Mumbai", years: "2013 — 2021", role: "LTI · TCS" },
              { city: "Boston", years: "2021 — 2023", role: "Northeastern · Motorola" },
              { city: "Raleigh", years: "2023 — now", role: "LexisNexis" },
            ].map((stop, i, arr) => (
              <div key={stop.city} className="flex items-baseline gap-3">
                {/* City arc markers — bumped from default ~11px to 15-18px
                    so the trajectory step numbers read at scan speed without
                    competing with the city name at 18-20px. */}
                <span
                  className="font-mono-label tabular-nums"
                  style={{
                    color: "var(--color-text-dim)",
                    fontSize: "clamp(0.9375rem, 1.1vw, 1.125rem)",
                    letterSpacing: "0.04em",
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1.125rem, 1.4vw, 1.25rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color:
                        i === arr.length - 1
                          ? "var(--color-accent)"
                          : "var(--color-foreground)",
                    }}
                  >
                    {stop.city}
                  </p>
                  <p
                    className="font-mono-meta"
                    style={{
                      color: "var(--color-text-dim)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {stop.years} · {stop.role}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="ml-2 font-mono-label"
                    style={{
                      color: "var(--color-cool-meta)",
                      fontSize: "1rem",
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body — chapter-aligned reading column */}
      <div className="grid grid-cols-12 gap-x-6 mb-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3 space-y-4">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.6,
              color: "var(--color-text)",
              maxWidth: "68ch",
            }}
          >
            Started in Mumbai — LTI right out of college, then nearly six
            years at Tata Consultancy Services building the Operations
            Dashboard for Dow Chemical: 17,000 daily users, 650 plants, 13
            languages. Grew from developer to team supervisor and global SME.
            Moved to Boston for a master&apos;s at Northeastern, then Motorola
            Solutions. Now in Raleigh at LexisNexis.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.6,
              color: "var(--color-text)",
              maxWidth: "68ch",
            }}
          >
            Along the way, I taught 190 students as a graduate teaching
            assistant across two semesters, mentored engineers across teams on
            architecture patterns, and led knowledge transfers that outlasted
            my time on the team. The code I write matters. But the engineers
            I help think more clearly about systems —{" "}
            <strong style={{ color: "var(--color-accent)" }}>
              that&apos;s the work that compounds.
            </strong>
          </p>
        </div>
      </div>

      {/* ===== CREDENTIALS ===== */}
      <SectionTitle label="05" title="Credentials" />
      <div className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 lg:col-span-6">
          <p
            className="font-mono-label mb-4 pb-2 border-b"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Certifications
          </p>
          <ul className="space-y-3">
            {credentials.certifications.map((c) => (
              <li key={c.name}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
                    fontWeight: 600,
                    color: "var(--color-foreground)",
                  }}
                >
                  {c.name}
                </p>
                <p
                  className="font-mono-meta mt-0.5"
                  style={{
                    color: "var(--color-text-dim)",
                    fontSize: "0.8125rem",
                  }}
                >
                  {c.issuer} · {c.kind}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <p
            className="font-mono-label mb-4 pb-2 border-b"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            Education
          </p>
          <ul className="space-y-3">
            {credentials.education.map((e) => (
              <li key={e.degree}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
                    fontWeight: 600,
                    color: "var(--color-foreground)",
                  }}
                >
                  {e.degree}
                </p>
                <p
                  className="font-mono-meta mt-0.5"
                  style={{
                    color: "var(--color-text-dim)",
                    fontSize: "0.8125rem",
                  }}
                >
                  {e.institution} · {e.location} · {e.dates}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ===== JSON syntax-highlight helpers for the package.json render in
   /01 What I build. Hand-styled (no shiki) so the colors map directly
   to theme tokens — cobalt for keys, foreground for values, cool-meta
   for punctuation. Renders correctly in both light + dark mode via the
   theme variables. ===== */

const PUNCT = "var(--color-cool-meta)";
const KEY = "var(--color-accent)";
const VAL = "var(--color-text)";

function JsonLine({
  indent = 0,
  children,
}: {
  indent?: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>{children}</div>
  );
}

function JsonPair({
  indent = 2,
  k,
  v,
  comma = false,
}: {
  indent?: number;
  k: string;
  v: string;
  comma?: boolean;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span style={{ color: KEY }}>{`"${k}"`}</span>
      <span style={{ color: PUNCT }}>{`: `}</span>
      <span style={{ color: VAL }}>{v}</span>
      {comma && <span style={{ color: PUNCT }}>,</span>}
    </div>
  );
}

function JsonString({
  indent = 4,
  v,
  comma = false,
}: {
  indent?: number;
  v: string;
  comma?: boolean;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span style={{ color: VAL }}>{v}</span>
      {comma && <span style={{ color: PUNCT }}>,</span>}
    </div>
  );
}

function JsonObjectOpen({
  indent = 2,
  k,
}: {
  indent?: number;
  k: string;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span style={{ color: KEY }}>{`"${k}"`}</span>
      <span style={{ color: PUNCT }}>{`: {`}</span>
    </div>
  );
}

function JsonArrayOpen({
  indent = 2,
  k,
}: {
  indent?: number;
  k: string;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span style={{ color: KEY }}>{`"${k}"`}</span>
      <span style={{ color: PUNCT }}>{`: [`}</span>
    </div>
  );
}

/* Inline single-line array — for short collections like
   "languages": ["C#", "TypeScript", "JavaScript"]. Avoids expanding
   short arrays to multi-line which would make the section taller
   than necessary. Compact JSON convention. */
function JsonInlineArray({
  indent = 4,
  k,
  items,
  comma = false,
}: {
  indent?: number;
  k: string;
  items: string[];
  comma?: boolean;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span style={{ color: KEY }}>{`"${k}"`}</span>
      <span style={{ color: PUNCT }}>{`: [`}</span>
      {items.map((item, i) => (
        <span key={item}>
          <span style={{ color: VAL }}>{`"${item}"`}</span>
          {i < items.length - 1 && (
            <span style={{ color: PUNCT }}>{`, `}</span>
          )}
        </span>
      ))}
      <span style={{ color: PUNCT }}>{`]`}</span>
      {comma && <span style={{ color: PUNCT }}>,</span>}
    </div>
  );
}

function JsonClose({
  indent = 2,
  closer,
  comma = false,
}: {
  indent?: number;
  closer: string;
  comma?: boolean;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span style={{ color: PUNCT }}>{closer}</span>
      {comma && <span style={{ color: PUNCT }}>,</span>}
    </div>
  );
}

/* ===== Shared section title — number + heading, no `#` symbol cosplay.
   Sits as a left-margin marker with the title big to the right. */
function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 mb-8 items-baseline">
      {/* Second pass on label size (Jinal called the first bump still tiny).
          Now clamp(1.125rem, 1.4vw, 1.25rem) ~ 18-26px so the / 0N label
          reads as actual section nav, not as buried metadata. The title is
          clamp(1.75rem, 3vw, 2.5rem) ~ 28-40px, so ratio is now ~1.5× —
          clear hierarchy without the label disappearing. */}
      <p
        className="col-span-12 lg:col-span-2 font-mono-label"
        style={{
          color: "var(--color-accent)",
          fontSize: "clamp(1.125rem, 1.4vw, 1.25rem)",
          letterSpacing: "0.05em",
        }}
      >
        / {label}
      </p>
      <h3
        className="col-span-12 lg:col-span-10"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
    </div>
  );
}
