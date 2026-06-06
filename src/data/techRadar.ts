/**
 * techRadar.ts — Jinal's Tech Radar data model.
 *
 * Format follows ThoughtWorks Tech Radar convention (since 2010):
 *   4 quadrants:  Languages & Frameworks · Tools · Platforms · Techniques
 *   4 rings:      Adopt · Trial · Assess · Hold
 *
 * References:
 *   - https://www.thoughtworks.com/radar
 *   - https://adr.github.io/
 *   - https://github.com/joelparkerhenderson/architecture-decision-record
 *
 * Every item traces verbatim to references/resume-fullstack.pdf,
 * references/resume-frontend.pdf, references/linkedin-profile.pdf,
 * or to chapter decision callouts already documented in the portfolio
 * (rule #15: no fake data).
 *
 * Ring placement reasoning:
 *   ADOPT  = currently using, recommend, production-shipped within last 3 years
 *   TRIAL  = used but not primary; legacy heritage; selective application
 *   ASSESS = (empty by Jinal's call — nothing she's "watching but not adopted")
 *   HOLD   = anti-patterns to avoid (from current /03 "I don't" column)
 *
 * Quadrant placement follows ThoughtWorks convention strictly:
 *   Languages & Frameworks = programming languages + application frameworks
 *   Tools                  = libraries / utilities used inside the stack
 *   Platforms              = runtimes, databases, infrastructure, services
 *   Techniques             = methods, patterns, practices, anti-patterns
 */

export type Quadrant =
  | "languages-frameworks"
  | "tools"
  | "platforms"
  | "techniques";

export type Ring = "adopt" | "trial" | "assess" | "hold";

export interface RadarItem {
  /** Display name as rendered on the radar dot. */
  name: string;
  /** Quadrant assignment per ThoughtWorks convention. */
  quadrant: Quadrant;
  /** Ring assignment — informs distance from center on the radar. */
  ring: Ring;
  /** Reasoning shown on hover. Traces to resume/LinkedIn/chapter. */
  reasoning: string;
}

export const radarItems: RadarItem[] = [
  /* ===== LANGUAGES & FRAMEWORKS ===== */
  {
    name: "C#",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "10 years across 4 jobs — the language that consistently held up at production scale across legal-tech, public-safety, enterprise.",
  },
  {
    name: "TypeScript",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "LexisNexis modern stack. Type safety for the frontend systems that have to hold up at 15K+ daily users.",
  },
  {
    name: "JavaScript",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "All four jobs. Universal frontend foundation.",
  },
  {
    name: "SQL",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "The schema is the design — every system I've worked on. LTI chapter thesis.",
  },
  {
    name: "LINQ",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "C# data querying since LTI. 15+ custom generic constraints and 20+ extension methods shipped.",
  },
  {
    name: "HTML5",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "Frontend foundation across all jobs.",
  },
  {
    name: "CSS3",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "All jobs. Frontend craft fundamental.",
  },
  {
    name: ".NET Core",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "Motorola, TCS modern era, LexisNexis microservices. Production-scale runtime.",
  },
  {
    name: ".NET",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "Core platform across all jobs.",
  },
  {
    name: "Node.js",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "LexisNexis backend services. TCS architected scalable backend services using NodeJS.",
  },
  {
    name: "Express.js",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "Node backend framework. LexisNexis API surface.",
  },
  {
    name: "Angular",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "LexisNexis v12 → v15 migration, 25% load time reduction. Motorola Material theming. TCS user interfaces — 40% engagement increase.",
  },
  {
    name: "React",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "LexisNexis hooks + context API + Redux toolkit — 39% efficiency improvement. TCS compound components and render props.",
  },
  {
    name: "Redux",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "LexisNexis Redux toolkit for state management at scale.",
  },
  {
    name: "GraphQL",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning:
      "LexisNexis client-side query shape control. Query execution: 200ms → 120ms.",
  },
  {
    name: "Apollo Client",
    quadrant: "languages-frameworks",
    ring: "adopt",
    reasoning: "LexisNexis GraphQL client. Pairs with Redux for cache management.",
  },
  {
    name: ".NET MVC",
    quadrant: "languages-frameworks",
    ring: "trial",
    reasoning:
      "LTI era foundation. Legacy but still relevant where teams are committed. Not first choice for greenfield.",
  },
  {
    name: "Bootstrap",
    quadrant: "languages-frameworks",
    ring: "trial",
    reasoning:
      "Shipped at LTI and TCS for responsive grids. Production-tested but not the modern primary against Material UI / SASS.",
  },
  {
    name: "jQuery",
    quadrant: "languages-frameworks",
    ring: "trial",
    reasoning:
      "Production-shipped across roles — published essay 'Why I stopped caring about which framework to use' names it explicitly. Not banned; selective.",
  },

  /* ===== TOOLS ===== */
  {
    name: "Entity Framework",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "Primary data access ORM across .NET work. TCS scalable REST APIs with lazy loading — 35% performance improvement.",
  },
  {
    name: "EF Core",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "Motorola custom repository patterns + EF Core — 68% query performance improvement.",
  },
  {
    name: "raw SQL",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "When EF doesn't fit the query shape. LexisNexis dynamic match patterns.",
  },
  {
    name: "stored procedures",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "LexisNexis decision callout #2: dynamic patterns land cleaner in SQL — optimizable in one place. LTI: 25+ stored procedures shipped.",
  },
  {
    name: "Material UI",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "LexisNexis 30+ Material components refactored during the Angular v12 → v15 migration.",
  },
  {
    name: "Angular Material",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "Motorola custom theming with animations — 45% design-to-implementation time reduction.",
  },
  {
    name: "BEM",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "LexisNexis CSS architecture — 33% developer productivity improvement (frontend resume).",
  },
  {
    name: "SASS / SCSS",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "LexisNexis sophisticated CSS architecture with BEM methodology and SASS variables/mixins.",
  },
  {
    name: "NUnit",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "Motorola 95% test coverage with NUnit + integration tests. Public safety bar.",
  },
  {
    name: "xUnit",
    quadrant: "tools",
    ring: "adopt",
    reasoning: ".NET testing alternative. Resume technical skills.",
  },
  {
    name: "Jasmine",
    quadrant: "tools",
    ring: "adopt",
    reasoning: "JS unit testing. LexisNexis frontend coverage 90%.",
  },
  {
    name: "Karma",
    quadrant: "tools",
    ring: "adopt",
    reasoning: "JS test runner paired with Jasmine.",
  },
  {
    name: "Jest",
    quadrant: "tools",
    ring: "adopt",
    reasoning: "React testing across LexisNexis components.",
  },
  {
    name: "Postman",
    quadrant: "tools",
    ring: "adopt",
    reasoning: "API testing across .NET REST surfaces.",
  },
  {
    name: "React Testing Library",
    quadrant: "tools",
    ring: "adopt",
    reasoning: "LexisNexis React component coverage.",
  },
  {
    name: "Polly",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "LexisNexis resilience — retry + circuit breaker policies. 99.95% API availability, 82% error reduction.",
  },
  {
    name: "RabbitMQ",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "LexisNexis async processing — 100K+ daily events. When workload is async and consumer needs durability.",
  },
  {
    name: "Fluent Validation",
    quadrant: "tools",
    ring: "adopt",
    reasoning:
      "TCS error-checking mechanism — 60% reduction in data entry errors.",
  },
  {
    name: "Cypress",
    quadrant: "tools",
    ring: "trial",
    reasoning:
      "Frontend resume Technical Skills entry. Less primary than Jest + RTL for LexisNexis testing.",
  },
  {
    name: "D3.js",
    quadrant: "tools",
    ring: "trial",
    reasoning:
      "BTS Music Evolution personal data-viz platform. Not production work at the senior roles.",
  },

  /* ===== PLATFORMS ===== */
  {
    name: "SQL Server",
    quadrant: "platforms",
    ring: "adopt",
    reasoning:
      "Primary database across all four jobs. LexisNexis advanced indexing + query tuning — 70% response time reduction.",
  },
  {
    name: "PostgreSQL",
    quadrant: "platforms",
    ring: "adopt",
    reasoning:
      "Alternative primary RDBMS. Resume Technical Skills.",
  },
  {
    name: "Redis",
    quadrant: "platforms",
    ring: "adopt",
    reasoning:
      "LexisNexis + Motorola cache layer — doubled application speed. Distributed cache that survives restarts.",
  },
  {
    name: "MongoDB",
    quadrant: "platforms",
    ring: "trial",
    reasoning:
      "LexisNexis document-based schemas — 40% faster development for specific feature shapes. Secondary, not primary.",
  },
  {
    name: "Docker",
    quadrant: "platforms",
    ring: "adopt",
    reasoning:
      "Container runtime across LexisNexis and Motorola DevOps surfaces.",
  },
  {
    name: "Kubernetes",
    quadrant: "platforms",
    ring: "trial",
    reasoning:
      "Used in production. Only when the deployment topology genuinely earns the operational complexity — I won't add it if the system would be fine on a smaller surface.",
  },
  {
    name: "Azure DevOps CI/CD",
    quadrant: "platforms",
    ring: "adopt",
    reasoning:
      "LexisNexis pipeline overhaul — deployment time 2 hours → 1.2 hours. 40% reduction.",
  },
  {
    name: "Git",
    quadrant: "platforms",
    ring: "adopt",
    reasoning: "Version control across all roles.",
  },
  {
    name: "GitHub",
    quadrant: "platforms",
    ring: "adopt",
    reasoning: "Code hosting + collaboration across all roles.",
  },

  /* ===== TECHNIQUES ===== */
  {
    name: "SOLID",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "TCS clean architecture across 20+ services. Not theoretical — discipline against shortcuts.",
  },
  {
    name: "Domain-Driven Design",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis DDD workshops with product stakeholders — 40% time-to-market improvement.",
  },
  {
    name: "Clean Architecture",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "TCS across 20+ services. Reducing complexity meant the team shipped faster.",
  },
  {
    name: "Microservices (multi-team)",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis monolith → microservices — system latency dropped 42%. Worked because teams scaled.",
  },
  {
    name: "Monolith (single-team)",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "Default for single-team systems. Microservices solve people-problems first, technical second.",
  },
  {
    name: "Repository + Unit-of-Work",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "Motorola — testable in isolation, optimizable per query. Made the codebase easier for the next engineer to extend.",
  },
  {
    name: "CI/CD pipelines",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis Azure DevOps automation — 40% decrease in deployment time.",
  },
  {
    name: "Async Processing",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis async patterns + RabbitMQ — eliminated biggest performance bottlenecks.",
  },
  {
    name: "Distributed Caching",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis + Motorola Redis layer — 80% application speed boost (LexisNexis), 55% response time (Motorola).",
  },
  {
    name: "API Gateway",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis API Gateway patterns with OAuth 2.0 + JWT — protecting sensitive data for 15K+ users.",
  },
  {
    name: "Middleware (exception + PII)",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis centralized exception handling + bidirectional PII masking. Compliance changes land in one place.",
  },
  {
    name: "OAuth 2.0",
    quadrant: "techniques",
    ring: "adopt",
    reasoning: "LexisNexis API authentication. 15K+ user surface.",
  },
  {
    name: "JWT",
    quadrant: "techniques",
    ring: "adopt",
    reasoning: "LexisNexis token-based auth.",
  },
  {
    name: "Lazy Loading Optimization",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "TCS REST APIs with lazy loading — 35% performance improvement.",
  },
  {
    name: "MVVM",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "Motorola Angular with MVVM + RxJS observables — 30% error recovery improvement.",
  },
  {
    name: "RxJS / Observables",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "Motorola reactive patterns paired with MVVM.",
  },
  {
    name: "Code Reviews as Teaching",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis code reviews — 18% post-release defect prevention. Not bug-hunts; teaching the next senior engineer.",
  },
  {
    name: "Mentorship + Teaching",
    quadrant: "techniques",
    ring: "adopt",
    reasoning:
      "LexisNexis engineers — post-release defects ↓ 18%. Northeastern 190 students across two semesters. The engineers I help think more clearly compound.",
  },

  /* ===== HOLD (anti-patterns from current /03 "I don't") ===== */
  {
    name: "Framework Zealotry",
    quadrant: "techniques",
    ring: "hold",
    reasoning:
      "Published essay 'Why I stopped caring about which framework to use.' I've shipped Angular, React, .NET, Node, Express, jQuery, Bootstrap — all in production. The framework debate is almost always the wrong conversation.",
  },
  {
    name: "Microservices for Single-Team",
    quadrant: "techniques",
    ring: "hold",
    reasoning:
      "Microservices solve people-problems first, technical second. If one team owns the whole domain, a well-structured monolith is the cleaner choice.",
  },
  {
    name: "ORM-only for Complex Dynamic Queries",
    quadrant: "techniques",
    ring: "hold",
    reasoning:
      "LexisNexis decision callout: stored procedures over ORM when query patterns are complex enough that they land cleaner in SQL — optimizable in one place, debuggable from the database side.",
  },
  {
    name: "Test Coverage % as Goal",
    quadrant: "techniques",
    ring: "hold",
    reasoning:
      "95% coverage at Motorola was the right bar for public safety; the discipline was that the uncovered 5% had to be deliberately scoped and reviewed. Coverage is a proxy.",
  },
  {
    name: "Kubernetes Without Earned Topology",
    quadrant: "techniques",
    ring: "hold",
    reasoning:
      "I won't add operational complexity if the system would be fine on a smaller surface. Topology earns the orchestrator, not the other way around.",
  },
];

/* ===== Helpers for the SVG component ===== */

export const QUADRANT_LABELS: Record<Quadrant, string> = {
  "languages-frameworks": "Languages & Frameworks",
  tools: "Tools",
  platforms: "Platforms",
  techniques: "Techniques",
};

export const RING_LABELS: Record<Ring, string> = {
  adopt: "Adopt",
  trial: "Trial",
  assess: "Assess",
  hold: "Hold",
};

/* Ring radii as fractions of the radar's outer radius.
   Adopt is innermost (closest to center = strongest endorsement).
   Hold is outermost (furthest from center = pushed away). */
export const RING_RADII: Record<Ring, { inner: number; outer: number }> = {
  adopt: { inner: 0, outer: 0.25 },
  trial: { inner: 0.25, outer: 0.5 },
  assess: { inner: 0.5, outer: 0.75 },
  hold: { inner: 0.75, outer: 1.0 },
};

/* Quadrant angle ranges in degrees, starting from 0 = right (east),
   going counter-clockwise per math convention.
   Standard ThoughtWorks layout:
     top-right    (0-90)    = Languages & Frameworks
     top-left     (90-180)  = Tools
     bottom-left  (180-270) = Techniques
     bottom-right (270-360) = Platforms */
export const QUADRANT_ANGLES: Record<Quadrant, { start: number; end: number }> = {
  "languages-frameworks": { start: 0, end: 90 },
  tools: { start: 90, end: 180 },
  techniques: { start: 180, end: 270 },
  platforms: { start: 270, end: 360 },
};
