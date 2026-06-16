import { type AtlasDimension } from "@/components/ui/DimensionalDot";

/**
 * keywords.ts — the Stack Atlas keyword catalog for chapter narratives.
 *
 * Each entry maps a term (case-sensitive substring) to its dominant
 * atlas dimension. Consumed by `<ColoredText>` to scan paragraph
 * strings and color matching terms — readers can scan "which dimensions
 * does this chapter exercise" at paragraph speed.
 *
 * Why this lives in /data not in the component:
 *   - These are CONTENT decisions, not rendering decisions. Adding a
 *     new term is editorial work; the rendering logic is separate.
 *   - Discoverable to anyone editing chapters — open this file to see
 *     "what gets colored" without spelunking into figures/.
 *   - Same separation pattern as experience.ts / projects.ts /
 *     stackAtlas.ts / techRadar.ts — content lives in /data, view
 *     logic in /components.
 *
 * Discipline (rule #31): every dimension below maps to ONE of the six
 * existing `--color-atlas-*` semantic categorical tokens. No new brand
 * accents. Same exemption as Shiki syntax tokens — categorical, not
 * decorative.
 *
 * Maintenance: extend the array as new technical terms appear in
 * chapter narratives. The renderer sorts longest-first so "API
 * gateway" matches before "API"; you don't need to maintain order.
 */

export interface KeywordEntry {
  term: string;
  dimension: AtlasDimension;
}

export const KEYWORDS: KeywordEntry[] = [
  /* ===== judgment (cobalt) — architectural / design decisions =====
     Sourced from full read of all 5 chapter narratives on 2026-06-06.
     Includes only terms with clear architectural-decision semantics. */
  { term: "Domain-driven design", dimension: "judgment" },
  { term: "component-driven development", dimension: "judgment" },
  { term: "Repository + Unit-of-Work", dimension: "judgment" },
  { term: "Repository · Unit-of-Work", dimension: "judgment" },
  { term: "Unit-of-Work", dimension: "judgment" },
  { term: "architecture patterns", dimension: "judgment" },
  { term: "clean architecture", dimension: "judgment" },
  { term: "SOLID principles", dimension: "judgment" },
  { term: "micro-frontends", dimension: "judgment" },
  { term: "design patterns", dimension: "judgment" },
  { term: "microservices", dimension: "judgment" },
  { term: "API gateway", dimension: "judgment" },
  { term: "public API", dimension: "judgment" },
  { term: "REST APIs", dimension: "judgment" },
  { term: "REST API", dimension: "judgment" },
  { term: "SOLID", dimension: "judgment" },
  { term: "MVVM", dimension: "judgment" },
  { term: "MVC", dimension: "judgment" },
  { term: "ADR", dimension: "judgment" },
  { term: "DDD", dimension: "judgment" },

  /* ===== data (teal) — data craft, schema, query language ===== */
  { term: "queries and mutations", dimension: "data" },
  { term: "Stored procedures", dimension: "data" },
  { term: "stored procedures", dimension: "data" },
  { term: "stored procedure", dimension: "data" },
  { term: "Entity Framework", dimension: "data" },
  { term: "database design", dimension: "data" },
  { term: "EF Core", dimension: "data" },
  { term: "SQL queries", dimension: "data" },
  { term: "SQL Server", dimension: "data" },
  { term: "query performance", dimension: "data" },
  { term: "query plan", dimension: "data" },
  { term: "data layer", dimension: "data" },
  { term: "lazy loading", dimension: "data" },
  { term: "schema", dimension: "data" },
  { term: "GraphQL", dimension: "data" },
  { term: "Apollo", dimension: "data" },
  { term: "LINQ", dimension: "data" },
  { term: "ETL", dimension: "data" },

  /* ===== runtime (slate) — runtimes, infrastructure, frontend libs,
     async surfaces. "Caching" added per direction. */
  { term: "Material components", dimension: "runtime" },
  { term: "distributed Redis", dimension: "runtime" },
  { term: "RxJS observables", dimension: "runtime" },
  { term: "Angular Material", dimension: "runtime" },
  { term: "async processing", dimension: "runtime" },
  { term: "Async processing", dimension: "runtime" },
  { term: "Material UI", dimension: "runtime" },
  { term: "Azure CI/CD", dimension: "runtime" },
  { term: "full-stack applications", dimension: "runtime" },
  { term: "responsive front-end", dimension: "runtime" },
  { term: "full-stack", dimension: "runtime" },
  { term: "front-end", dimension: "runtime" },
  { term: "web stack", dimension: "runtime" },
  { term: "JavaScript", dimension: "runtime" },
  { term: "extension methods", dimension: "runtime" },
  { term: "UI components", dimension: "runtime" },
  { term: "RabbitMQ", dimension: "runtime" },
  { term: "Kubernetes", dimension: "runtime" },
  { term: ".NET Core", dimension: "runtime" },
  { term: "C#", dimension: "runtime" },
  { term: "NodeJS", dimension: "runtime" },
  { term: "Angular", dimension: "runtime" },
  { term: "Caching", dimension: "runtime" },
  { term: "caching", dimension: "runtime" },
  { term: "Docker", dimension: "runtime" },
  { term: "RxJS", dimension: "runtime" },
  { term: "Redux", dimension: "runtime" },
  { term: "React", dimension: "runtime" },
  { term: "Redis", dimension: "runtime" },
  { term: "Polly", dimension: "runtime" },
  { term: "Azure", dimension: "runtime" },
  { term: ".NET", dimension: "runtime" },

  /* ===== discipline (orange) — reliability rigor, error handling.
     Multiple exception-handling variants explicitly added so each
     phrasing in the narratives colors consistently. */
  { term: "exception-handling middleware", dimension: "discipline" },
  { term: "exception middleware", dimension: "discipline" },
  { term: "Error-handling middleware", dimension: "discipline" },
  { term: "exception-handling strategy", dimension: "discipline" },
  { term: "validation frameworks", dimension: "discipline" },
  { term: "OAuth2.0 / JWT", dimension: "discipline" },
  { term: "system observability", dimension: "discipline" },
  { term: "exception-handling", dimension: "discipline" },
  { term: "exception handling", dimension: "discipline" },
  { term: "integration tests", dimension: "discipline" },
  { term: "circuit breaker", dimension: "discipline" },
  { term: "resilient retry", dimension: "discipline" },
  { term: "Resilient retry", dimension: "discipline" },
  { term: "high availability", dimension: "discipline" },
  { term: "test coverage", dimension: "discipline" },
  { term: "error tracking", dimension: "discipline" },
  { term: "error logging", dimension: "discipline" },
  { term: "observability", dimension: "discipline" },
  { term: "PII masking", dimension: "discipline" },
  { term: "validation", dimension: "discipline" },
  { term: "NUnit", dimension: "discipline" },

  /* ===== multiplier (magenta) — people, cross-functional collaboration,
     teaching, mentorship. Surfaces the senior multiplier signal. */
  { term: "Letter of Recommendation", dimension: "multiplier" },
  { term: "letter of recommendation", dimension: "multiplier" },
  { term: "knowledge-sharing sessions", dimension: "multiplier" },
  { term: "teaching assistant", dimension: "multiplier" },
  { term: "Knowledge transfers", dimension: "multiplier" },
  { term: "Knowledge transfer", dimension: "multiplier" },
  { term: "knowledge transfers", dimension: "multiplier" },
  { term: "knowledge transfer", dimension: "multiplier" },
  { term: "DDD workshops", dimension: "multiplier" },
  { term: "Product Owner", dimension: "multiplier" },
  { term: "junior developers", dimension: "multiplier" },
  { term: "pair programming", dimension: "multiplier" },
  { term: "team supervisor", dimension: "multiplier" },
  { term: "Web Design & UX", dimension: "multiplier" },
  { term: "office hours", dimension: "multiplier" },
  { term: "code reviews", dimension: "multiplier" },
  { term: "code review", dimension: "multiplier" },
  { term: "lab sessions", dimension: "multiplier" },
  { term: "INFO6150", dimension: "multiplier" },
  { term: "Mentored", dimension: "multiplier" },
  { term: "mentorship", dimension: "multiplier" },
  { term: "Professor", dimension: "multiplier" },
  { term: "professor", dimension: "multiplier" },
  { term: "mentoring", dimension: "multiplier" },
  { term: "mentored", dimension: "multiplier" },
  { term: "architect", dimension: "multiplier" },
  { term: "SME", dimension: "multiplier" },
  { term: "UX", dimension: "multiplier" },
  { term: "PO", dimension: "multiplier" },

  /* ===== 2026-06-09 additions — LN ETL paragraph keywords =====
     Surfaces the staging-first ETL + AI-augmented testing pattern.
     Includes the first `ai` dimension keyword in any chapter narrative —
     ties the package.json ai_augmented stack declaration to a concrete
     chapter mention. */
  { term: "SSMS Copilot", dimension: "ai" },
  { term: "staging table", dimension: "data" },
  { term: "business rules", dimension: "judgment" },
  { term: "test-script", dimension: "discipline" },
  { term: "DBA", dimension: "multiplier" },
];
