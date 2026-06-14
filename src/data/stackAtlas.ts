/**
 * stackAtlas.ts — Jinal's stack expressed as 6 craft dimensions, not as
 * an infrastructure inventory.
 *
 * What makes this distinctive: most senior portfolios list TOOLS by
 * category (frontend / backend / data / devops). This one organizes
 * around what makes the work senior — engineering discipline, the data
 * craft (her depth signal), AI-augmented practice (2026 reality), the
 * multiplier work (mentoring + cross-team), the architectural judgment
 * frame, and the runtime stack as supporting layer.
 *
 * Rendered two ways:
 *   - Desktop: subway-style map (StackSubwayMap.tsx)
 *   - Mobile:  vertical chapters with chip clouds (StackChapters.tsx)
 *
 * Same data, two artifacts — form follows the device, not a shrunken map.
 *
 * Rule #15: every station traces to Jinal's chapters or her direct
 * confirmation (Copilot/Claude usage, mentoring + cross-team focus,
 * SP/view/function/integration depth). No fabricated capabilities.
 */

export type LineId =
  | "discipline"
  | "data"
  | "ai"
  | "multiplier"
  | "judgment"
  | "runtime";

export interface AtlasLine {
  id: LineId;
  label: string;
  thesis: string;
  /* Visual stroke color — muted oklch tuned to coexist with the cobalt
     brand accent. Each line gets a distinct color because color carries
     categorization information here (subway-map convention), not
     decoration. */
  color: string;
  /* SVG X coordinate for the line's vertical track on desktop. Lines
     run top-to-bottom; stations descend along each line. */
  xDesktop: number;
}

export interface AtlasStation {
  id: string;
  label: string;
  /* Line IDs this station belongs to. Multiple = junction (visual
     emphasis + connector). */
  lines: LineId[];
  /* One-line context — why Jinal reaches for it, where she shipped it.
     Renders in the detail panel on click. */
  context?: string;
  /* Chapter cross-references for the side panel. */
  chapters?: { label: string; href: string }[];
  /* Visual emphasis. Terminal stations sit at line ends and signal
     signature depth. */
  emphasis?: "terminal" | "junction";
  /* Y position along the vertical line (0–100 normalized; component
     maps to SVG coords based on the line's vertical extent). */
  y: number;
}

/* ===== Lines ============================================================
 *
 * Y positions are spaced ~80px apart on desktop. Data Craft is line 2
 * because it's the densest visually — central placement gives it room
 * to breathe and lets junctions connect upward to Discipline and
 * downward to Judgment cleanly.
 * ===================================================================== */

/* Six vertical lines, side-by-side, top-to-bottom reading. xDesktop
   positions are SVG x-coords for each line's vertical track. Data is
   the densest line — visually it's the tallest column, which signals
   depth at a glance without needing a label. */
export const ATLAS_LINES: AtlasLine[] = [
  {
    id: "discipline",
    label: "Discipline",
    thesis:
      "The work that makes the rest possible. Error handling, observability, validation, coverage as discipline — not as a number.",
    /* Colors hoisted to --color-atlas-* design tokens (see globals.css).
       Each token has light + dark variants and is reused outside the atlas
       in Notes/DecisionTree/Glossary/chapter eyebrows wherever content
       semantically references the dimension. */
    color: "var(--color-atlas-discipline)",
    xDesktop: 75,
  },
  {
    id: "data",
    label: "Data craft",
    thesis:
      "Schema is the design. SPs, views, functions, EF, ETL — the database as architectural surface plus the bridge to the application.",
    color: "var(--color-atlas-data)",
    xDesktop: 245,
  },
  {
    id: "ai",
    label: "AI-augmented",
    thesis:
      "Engineering with AI agents in the loop — Copilot for velocity, Claude for the harder reasoning. Prompt as code, review as collaboration.",
    color: "var(--color-atlas-ai)",
    xDesktop: 415,
  },
  {
    id: "multiplier",
    label: "Multiplier",
    thesis:
      "Mentoring, code review as teaching, cross-team coordination. The work that compounds — making other engineers faster is engineering.",
    color: "var(--color-atlas-multiplier)",
    xDesktop: 585,
  },
  {
    id: "judgment",
    label: "Judgment",
    thesis:
      "When to distribute, when not to. When the schema carries the load, when the application does. ADR-shaped decisions, not framework preferences.",
    color: "var(--color-atlas-judgment)",
    xDesktop: 755,
  },
  {
    id: "runtime",
    label: "Runtime",
    thesis:
      "The tools, not the headline — runtimes and frameworks where I've shipped at production scale, picked per team depth.",
    color: "var(--color-atlas-runtime)",
    xDesktop: 935,
  },
];

/* ===== Stations =========================================================
 *
 * Organized by line then top-to-bottom along the line. Y positions are
 * 0–100 normalized; consumer component scales to actual SVG height.
 *
 * Junctions appear on multiple lines (e.g. ADR convention = discipline +
 * judgment). Code review = discipline + multiplier. TypeScript =
 * runtime + discipline (typed code IS discipline).
 * ===================================================================== */

export const ATLAS_STATIONS: AtlasStation[] = [
  /* === DISCIPLINE LINE ============================================ */
  {
    id: "error-middleware",
    label: "Custom error middleware",
    lines: ["discipline"],
    context:
      "Centralized cross-cutting concern; service code stays free of resilience boilerplate. Motorola — 65% incident-response time reduction.",
    chapters: [{ label: "Motorola", href: "#systems-motorola" }],
    y:8,
  },
  {
    id: "polly-retry",
    label: "Polly retry",
    lines: ["discipline", "judgment"],
    context:
      "Transient-failure handling as policy, not as catch-block. Composable, testable, replaceable.",
    chapters: [{ label: "LexisNexis", href: "#systems-lexisnexis" }],
    emphasis: "junction",
    y:22,
  },
  {
    id: "polly-cb",
    label: "Polly circuit breaker",
    lines: ["discipline"],
    context:
      "Cascade prevention. The marginal nine is the most expensive one to buy.",
    y:32,
  },
  {
    id: "observability",
    label: "Observability",
    lines: ["discipline"],
    context:
      "Structured logs + metrics + distributed tracing. Without it, microservices is just a more expensive monolith with worse bugs.",
    y:46,
  },
  {
    id: "validation",
    label: "Fluent Validation",
    lines: ["discipline", "data"],
    context:
      "Composable rules outside the domain. TCS — 60% data-entry error reduction.",
    chapters: [{ label: "TCS Dow OPD", href: "#systems-tcs" }],
    emphasis: "junction",
    y:58,
  },
  {
    id: "testing",
    label: "NUnit + integration",
    lines: ["discipline"],
    context: "Test the integrations where things actually break.",
    y:70,
  },
  {
    id: "coverage-discipline",
    label: "Coverage as discipline",
    lines: ["discipline"],
    context:
      "Motorola public-safety bar — 95% coverage + deliberate review of the uncovered 5%. The number is a side effect of the discipline, not the goal.",
    chapters: [{ label: "Motorola", href: "#systems-motorola" }],
    emphasis: "terminal",
    y:84,
  },
  {
    id: "code-review",
    label: "Code review rigor",
    lines: ["discipline", "multiplier"],
    context:
      "Review as both quality gate and teaching surface. The artifact and the conversation matter equally.",
    emphasis: "junction",
    y:94,
  },

  /* === DATA CRAFT LINE (the depth signal — tallest column) ============
   * 21 stations from y=2 to y=100, ~5-unit spacing. Schema/T-SQL stations
   * on top half, integration/ETL on bottom half. */
  {
    id: "schema-first",
    label: "Schema-first design",
    lines: ["data", "judgment"],
    context:
      "The data model IS the design. When data is the work, the schema is the architecture.",
    chapters: [{ label: "LTI", href: "#systems-lti" }],
    emphasis: "junction",
    y: 2,
  },
  {
    id: "multi-tenant-schema",
    label: "Multi-tenant schema",
    lines: ["data"],
    context: "Tenant isolation as a first-class schema property, not a bolted-on filter.",
    y: 7,
  },
  {
    id: "i18n-schema",
    label: "i18n schema",
    lines: ["data"],
    context:
      "TCS Dow Chemical OPD — 13 languages × 650 plants. Schema-encoded localization.",
    chapters: [{ label: "TCS Dow OPD", href: "#systems-tcs" }],
    y: 12,
  },
  {
    id: "normalization",
    label: "Normalization",
    lines: ["data"],
    context: "Knowing when to denormalize on purpose, not by accident.",
    y: 17,
  },
  {
    id: "constraints",
    label: "Constraints + cols",
    lines: ["data"],
    context: "Integrity as contract, not as application convention. FKs, check constraints, computed columns.",
    y: 22,
  },
  {
    id: "sp-design",
    label: "Stored procedures",
    lines: ["data"],
    context:
      "25+ SPs at LTI — dynamic patterns optimizable in SQL, one source for query planning.",
    chapters: [{ label: "LTI", href: "#systems-lti" }],
    y: 27,
  },
  {
    id: "tsql",
    label: "T-SQL craft",
    lines: ["data"],
    context:
      "Parameterized execution, TRY/CATCH/THROW, transaction control inside the procedure.",
    y: 32,
  },
  {
    id: "sp-architecture",
    label: "SPs as architecture",
    lines: ["data", "judgment"],
    context:
      "LTI thesis — when data is the work, the stored procedure IS the architecture layer.",
    chapters: [{ label: "LTI", href: "#systems-lti" }],
    emphasis: "junction",
    y: 37,
  },
  {
    id: "views",
    label: "Indexed views",
    lines: ["data"],
    context:
      "Read abstraction + materialized perf + security boundary in one artifact.",
    y: 42,
  },
  {
    id: "udfs",
    label: "Scalar + TVF functions",
    lines: ["data"],
    context: "Composable building blocks — function-as-query-fragment.",
    y: 47,
  },
  {
    id: "ctes",
    label: "CTEs + window fns",
    lines: ["data"],
    context:
      "Recursive readability + RANK/ROW_NUMBER/PARTITION as expressive set operations.",
    y: 52,
  },
  {
    id: "indexing",
    label: "Indexes + plans",
    lines: ["data"],
    context:
      "Read the plan, fix the index. 40% query-time reduction at LTI; 68% at Motorola.",
    y: 57,
  },
  {
    id: "ef-core",
    label: "EF Core",
    lines: ["data", "runtime"],
    context: "ORM owns the 80% case the framework was built for — fighting it costs more than using it.",
    emphasis: "junction",
    y: 62,
  },
  {
    id: "ef-sp-hybrid",
    label: "EF + raw SQL hybrid",
    lines: ["data", "judgment"],
    context:
      "ORM for the 80%, raw SQL for the long tail of dynamic patterns. Hybrid judgment.",
    emphasis: "junction",
    y: 67,
  },
  {
    id: "repo-uow",
    label: "Repository + UoW",
    lines: ["data", "judgment"],
    context:
      "Testable in isolation, optimizable per call site without polluting the domain. Motorola — 68% query perf.",
    chapters: [{ label: "Motorola", href: "#systems-motorola" }],
    emphasis: "junction",
    y: 72,
  },
  {
    id: "lazy-loading",
    label: "Lazy loading",
    lines: ["data"],
    context: "Earns its keep when navigation graphs are wide and access is partial. TCS — 35% perf gain.",
    chapters: [{ label: "TCS Dow OPD", href: "#systems-tcs" }],
    y: 77,
  },
  {
    id: "dbcontext",
    label: "DbContext + tx",
    lines: ["data"],
    context: "Transaction scope across DB + application code — coherence as discipline.",
    y: 82,
  },
  {
    id: "sql-server",
    label: "SQL Server",
    lines: ["data"],
    context: "Depth. The runtime where the schema is the design.",
    emphasis: "terminal",
    y: 87,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    lines: ["data"],
    context: "Document modeling for schema-flexible feature shapes.",
    y: 91,
  },
  {
    id: "redis",
    label: "Redis caching",
    lines: ["data", "discipline"],
    context:
      "Distributed cache — survives restarts, serves all instances coherently. Strategy + invalidation, not just put/get.",
    emphasis: "junction",
    y: 95,
  },
  {
    id: "etl",
    label: "ETL pipelines",
    lines: ["data"],
    context:
      "LexisNexis — Excel ingestion + structured ingestion with validation. Data movement as engineered surface, not script glue.",
    chapters: [{ label: "LexisNexis", href: "#systems-lexisnexis" }],
    emphasis: "terminal",
    y: 100,
  },

  /* === AI-AUGMENTED CRAFT LINE (2026 senior reality) ============= */
  {
    id: "copilot",
    label: "GitHub Copilot",
    lines: ["ai"],
    context: "Velocity at the keystroke layer. Boring, useful, daily.",
    y:15,
  },
  {
    id: "claude",
    label: "Claude / Claude Code",
    lines: ["ai"],
    context:
      "Reasoning layer — multi-file refactors, architectural review, the harder thinking.",
    y:30,
  },
  {
    id: "ai-review",
    label: "AI-assisted code review",
    lines: ["ai", "discipline"],
    context: "Review as collaboration — agents catch the obvious; humans catch the judgment.",
    emphasis: "junction",
    y:45,
  },
  {
    id: "ai-debug",
    label: "Agent debugging",
    lines: ["ai"],
    context: "Hypothesis generation at scale. Triangulation, not single-shot.",
    y:60,
  },
  {
    id: "prompt-craft",
    label: "Prompt as code",
    lines: ["ai", "discipline"],
    context: "Versioned, reviewed, tested. Prompts are interfaces; treat them as such.",
    emphasis: "junction",
    y:75,
  },
  {
    id: "ai-workflow",
    label: "Agent workflow",
    lines: ["ai"],
    context: "Engineering with AI in the loop — when to delegate, when to drive.",
    emphasis: "terminal",
    y:90,
  },

  /* === MULTIPLIER LINE (the people work) ========================= */
  {
    id: "mentoring",
    label: "Mentoring juniors",
    lines: ["multiplier"],
    context:
      "The work that compounds — making other engineers faster is engineering.",
    emphasis: "terminal",
    y:10,
  },
  {
    id: "review-teaching",
    label: "Code review as teaching",
    lines: ["multiplier", "discipline"],
    context: "Review comments are the longest-lived documentation a team produces.",
    emphasis: "junction",
    y:25,
  },
  {
    id: "cross-team",
    label: "Cross-team collaboration",
    lines: ["multiplier"],
    context:
      "Coordinating across teams without owning them. Staff-shape work.",
    y:40,
  },
  {
    id: "knowledge-transfer",
    label: "Knowledge transfer",
    lines: ["multiplier"],
    context:
      "TCS Dow Chemical handoff — making the codebase legible to the team that inherits it.",
    chapters: [{ label: "TCS Dow OPD", href: "#systems-tcs" }],
    y:55,
  },
  {
    id: "onboarding",
    label: "Onboarding new engineers",
    lines: ["multiplier"],
    context: "Time-to-first-PR as the metric, not seat-time.",
    y:70,
  },
  {
    id: "tech-writing",
    label: "Technical writing",
    lines: ["multiplier"],
    context:
      "ADRs, runbooks, design docs, code-review comments. Writing is engineering leverage.",
    emphasis: "terminal",
    y:85,
  },

  /* === JUDGMENT LINE ============================================= */
  {
    id: "solid",
    label: "SOLID",
    lines: ["judgment"],
    context: "Defaults-in costs less than retrofitted-in once a team scales.",
    y:8,
  },
  {
    id: "clean-arch",
    label: "Clean architecture",
    lines: ["judgment"],
    context: "Dependency direction as the contract; framework is incidental.",
    y:20,
  },
  {
    id: "ddd",
    label: "Domain-Driven Design",
    lines: ["judgment"],
    context:
      "Architecture and product speak the same language — bounded contexts as the team boundary.",
    chapters: [{ label: "LexisNexis", href: "#systems-lexisnexis" }],
    y:32,
  },
  {
    id: "adr",
    label: "ADR convention",
    lines: ["judgment", "discipline"],
    context:
      "Decisions versioned, reviewed, retrievable. The artifact a Staff engineer leaves behind.",
    emphasis: "junction",
    y:44,
  },
  {
    id: "mono-vs-micro",
    label: "Monolith ↔ microservices",
    lines: ["judgment"],
    context:
      "Distribute when coordination cost outgrows operational cost. Not before, not because it's the headline.",
    y:56,
  },
  {
    id: "mvvm",
    label: "MVVM",
    lines: ["judgment", "runtime"],
    context:
      "Motorola — observable streams model real-time state naturally. The right model for state that changes mid-render.",
    chapters: [{ label: "Motorola", href: "#systems-motorola" }],
    emphasis: "junction",
    y:68,
  },
  {
    id: "api-gateway",
    label: "API Gateway",
    lines: ["judgment"],
    context: "Cross-cutting concerns at the boundary, not in every service.",
    y:80,
  },
  {
    id: "oauth-jwt",
    label: "OAuth 2.0 + JWT",
    lines: ["judgment", "runtime"],
    context: "Standard token flow — stays out of the application; survives identity-provider swaps.",
    emphasis: "junction",
    y:92,
  },

  /* === RUNTIME LINE (the supporting layer) ====================== */
  {
    id: "csharp",
    label: "C#",
    lines: ["runtime"],
    context: "10 years production-tested across legal-tech, public-safety, enterprise.",
    emphasis: "terminal",
    y:5,
  },
  {
    id: "dotnet-core",
    label: ".NET Core",
    lines: ["runtime"],
    context: "Mature runtime — boring is a feature when correctness is the bar.",
    y:14,
  },
  {
    id: "dotnet-mvc",
    label: ".NET MVC",
    lines: ["runtime"],
    context: "LTI-era stack that earned its patterns.",
    y:22,
  },
  {
    id: "nodejs",
    label: "Node.js",
    lines: ["runtime"],
    context: "Velocity for document-shaped data; runtime model matches data model.",
    y:32,
  },
  {
    id: "typescript",
    label: "TypeScript",
    lines: ["runtime", "discipline"],
    context: "Typed code is discipline. The contract the framework can't carry.",
    emphasis: "junction",
    y:42,
  },
  {
    id: "angular",
    label: "Angular",
    lines: ["runtime"],
    context: "v12 → v15. Material UI + RxJS for real-time UI. Depth.",
    emphasis: "terminal",
    y:54,
  },
  {
    id: "react",
    label: "React",
    lines: ["runtime"],
    context: "Hooks + context. Composition model matches the data model.",
    y:64,
  },
  {
    id: "rest",
    label: "REST",
    lines: ["runtime"],
    context: "Resource-oriented contracts at the network boundary.",
    y:72,
  },
  {
    id: "graphql-apollo",
    label: "GraphQL + Apollo",
    lines: ["runtime"],
    context:
      "LexisNexis — 200ms → 120ms query execution by collapsing over-fetching.",
    chapters: [{ label: "LexisNexis", href: "#systems-lexisnexis" }],
    y:82,
  },
  {
    id: "rabbitmq",
    label: "RabbitMQ",
    lines: ["runtime"],
    context: "Durability + consumer fanout at mid volume; the broker pays for itself in incidents avoided.",
    y:92,
  },
];
