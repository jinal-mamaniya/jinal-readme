/**
 * decisionTree.ts — Jinal's engineering judgment encoded as a clickable
 * decision tree.
 *
 * What makes this distinctive: most senior portfolios list tools or describe
 * preferences. This one lets the visitor click through the actual decision
 * chain Jinal would make for a given system shape, then see the recommended
 * stack with full reasoning trail.
 *
 * Every node's question + option text + final stack recommendation traces
 * to:
 *   - references/resume-fullstack.pdf
 *   - references/linkedin-profile.pdf
 *   - src/data/experience.ts chapter decisions
 *   - src/data/techRadar.ts inventory + reasoning
 * Rule #15 honored — no fabricated technical opinions.
 *
 * Tree shape:
 *   Each node has either `options` (branching) OR `recommendation`
 *   (terminal leaf). Visitors click options to advance; the trail of
 *   answered questions accumulates as breadcrumbs.
 *
 * Pattern citation:
 *   - Microsoft Azure Well-Architected Framework decision trees
 *   - AWS Well-Architected Framework decision flowcharts
 *   - Google Cloud "choose the right X" decision matrices
 *   - ThoughtWorks Tech Radar reasoning (per RESEARCH.md §3B-prelim)
 */

export interface RecommendedStack {
  /** One-line summary of the recommended approach. */
  summary: string;
  /** Categorized stack components, each citing why. */
  components: {
    label: string;
    choice: string;
    why: string;
  }[];
  /** Trade-offs accepted (per ADR convention). */
  tradeOffs: string[];
  /** Chapter cross-reference where Jinal shipped this pattern. */
  citation?: {
    chapter: string;
    href: string;
  };
}

export interface DecisionNode {
  /** Unique node id for state management. */
  id: string;
  /** The question or scenario at this node. */
  question: string;
  /** Optional clarifying subtext shown below the question. */
  subtext?: string;
  /** Branch children — present on internal nodes. */
  options?: {
    label: string;
    /** Short rationale shown on hover/focus before clicking. */
    blurb?: string;
    /** Next node id this option leads to. */
    next: string;
  }[];
  /** Terminal recommendation — present on leaf nodes. */
  recommendation?: RecommendedStack;
}

/* Lookup map — every node by id. */
export const decisionTree: Record<string, DecisionNode> = {
  /* ===== ROOT ===== */
  root: {
    id: "root",
    question: "What are you shipping?",
    subtext:
      "Pick the scenario closest to your system. Each path leads to a real recommendation based on what I've shipped.",
    options: [
      {
        label: "High-availability API at scale",
        blurb: "99.95%+ uptime, multi-team, transient-failure tolerant",
        next: "ha-team-count",
      },
      {
        label: "Public-safety / regulated",
        blurb: "Compliance bar, can't be flaky — Motorola territory",
        next: "ps-coverage",
      },
      {
        label: "Data-heavy enterprise dashboard",
        blurb: "17K+ users, global plants, multi-language — TCS Dow territory",
        next: "de-data-shape",
      },
      {
        label: "Single-team product",
        blurb: "One team owns the whole domain, ship fast",
        next: "st-data-shape",
      },
    ],
  },

  /* ===== BRANCH A: High-availability API at scale ===== */
  "ha-team-count": {
    id: "ha-team-count",
    question: "How many teams will own this?",
    subtext:
      "Microservices solve people-problems first, technical problems second.",
    options: [
      {
        label: "One team owns the whole domain",
        blurb: "Don't over-distribute — monolith wins",
        next: "ha-mono-data",
      },
      {
        label: "Multiple teams sharing the codebase",
        blurb: "Microservices earn their complexity here",
        next: "ha-async-load",
      },
    ],
  },
  "ha-mono-data": {
    id: "ha-mono-data",
    question: "What's the data complexity?",
    options: [
      {
        label: "Simple CRUD",
        blurb: "EF Core handles it",
        next: "leaf-ha-mono-crud",
      },
      {
        label: "Mixed shapes",
        blurb: "EF for 80%, raw SQL for the long tail",
        next: "leaf-ha-mono-mixed",
      },
      {
        label: "Complex dynamic queries",
        blurb: "Match patterns that resist ORM",
        next: "leaf-ha-mono-complex",
      },
    ],
  },
  "ha-async-load": {
    id: "ha-async-load",
    question: "What's the async event load?",
    options: [
      {
        label: "Under 1K events/day",
        blurb: "In-process queue is fine",
        next: "ha-multi-avail-low",
      },
      {
        label: "1K to 100K events/day",
        blurb: "RabbitMQ territory",
        next: "ha-multi-avail-mid",
      },
      {
        label: "Over 100K events/day",
        blurb: "Durable consumer + topic partitioning",
        next: "ha-multi-avail-high",
      },
    ],
  },
  "ha-multi-avail-low": {
    id: "ha-multi-avail-low",
    question: "Availability target?",
    options: [
      {
        label: "99% (standard SaaS)",
        next: "leaf-ha-multi-low-99",
      },
      {
        label: "99.9% (business critical)",
        next: "leaf-ha-multi-low-999",
      },
      {
        label: "99.95%+ (mission-critical bar)",
        next: "leaf-ha-multi-low-9995",
      },
    ],
  },
  "ha-multi-avail-mid": {
    id: "ha-multi-avail-mid",
    question: "Availability target?",
    options: [
      {
        label: "99% (standard SaaS)",
        next: "leaf-ha-multi-mid-99",
      },
      {
        label: "99.9% (business critical)",
        next: "leaf-ha-multi-mid-999",
      },
      {
        label: "99.95%+ (mission-critical bar)",
        next: "leaf-ha-multi-mid-9995",
      },
    ],
  },
  "ha-multi-avail-high": {
    id: "ha-multi-avail-high",
    question: "Availability target?",
    options: [
      {
        label: "99% (standard SaaS)",
        next: "leaf-ha-multi-high-99",
      },
      {
        label: "99.9% (business critical)",
        next: "leaf-ha-multi-high-999",
      },
      {
        label: "99.95%+ (mission-critical bar)",
        next: "leaf-ha-multi-high-9995",
      },
    ],
  },

  /* ===== BRANCH B: Public-safety / regulated ===== */
  "ps-coverage": {
    id: "ps-coverage",
    question: "What's the test coverage discipline?",
    subtext:
      "95% coverage at Motorola was the right bar — but the discipline was that the uncovered 5% had to be deliberately scoped and reviewed.",
    options: [
      {
        label: "Coverage as discipline + deliberate-review of gaps",
        next: "ps-frontend",
      },
      {
        label: "Coverage % as target",
        blurb: "I avoid this — coverage is a proxy",
        next: "leaf-ps-anti",
      },
    ],
  },
  "ps-frontend": {
    id: "ps-frontend",
    question: "Frontend constraint?",
    options: [
      {
        label: "Real-time dispatch UI",
        next: "leaf-ps-dispatch",
      },
      {
        label: "Internal tooling for operators",
        next: "leaf-ps-internal",
      },
    ],
  },

  /* ===== BRANCH C: Data-heavy enterprise ===== */
  "de-data-shape": {
    id: "de-data-shape",
    question: "What's the data shape?",
    subtext:
      "TCS Dow OPD: 17,000 daily users, 650 plants, 13 languages. The schema is the design.",
    options: [
      {
        label: "Highly relational, multi-tenant",
        next: "de-team-size",
      },
      {
        label: "Document-flexible with structured edges",
        blurb: "MongoDB territory at LN",
        next: "leaf-de-doc",
      },
    ],
  },
  "de-team-size": {
    id: "de-team-size",
    question: "Team size?",
    options: [
      {
        label: "Single team, one product",
        next: "leaf-de-mono",
      },
      {
        label: "Multiple teams, shared platform",
        next: "leaf-de-multi",
      },
    ],
  },

  /* ===== BRANCH D: Single-team product ===== */
  "st-data-shape": {
    id: "st-data-shape",
    question: "What's the data shape?",
    options: [
      {
        label: "Simple CRUD",
        next: "leaf-st-crud",
      },
      {
        label: "Complex with stored-procedure logic",
        blurb: "LTI heritage — database-first when it earns it",
        next: "leaf-st-sp",
      },
      {
        label: "Document-flexible",
        next: "leaf-st-doc",
      },
    ],
  },

  /* ===========================================================
     LEAF NODES — terminal recommendations with full reasoning
     =========================================================== */

  "leaf-ha-mono-crud": {
    id: "leaf-ha-mono-crud",
    question: "Recommended: Ship-it monolith",
    recommendation: {
      summary:
        "Don't outrun the team. Single-team CRUD doesn't need to be impressive — it needs to be done. A well-structured monolith with EF Core ships fast, debugs in one place, and scales when scale arrives.",
      components: [
        {
          label: "service shape",
          choice: "Well-structured monolith",
          why: "Microservices solve people-problems first — a single team has none of those problems to solve",
        },
        {
          label: "runtime",
          choice: "C# / .NET Core",
          why: "Mature runtime — boring is a feature when the team is small and the bar is correctness",
        },
        {
          label: "data",
          choice: "EF Core + SQL Server",
          why: "Simple CRUD lives inside the 80% case the ORM was designed for — fighting that costs more than it saves",
        },
        {
          label: "auth",
          choice: "OAuth 2.0 + JWT (if API-fronted)",
          why: "Standard token flow — stays out of the application code and survives identity-provider swaps",
        },
        {
          label: "testing",
          choice: "NUnit + integration tests",
          why: "Coverage as discipline, not target — what gets reviewed is the gap, not the percentage",
        },
      ],
      tradeOffs: [
        "Single deployment surface — accepts uniform scaling because a single team can't coordinate per-service scaling at this size anyway",
        "Coordination cost grows past ~10 engineers — paying the refactor cost then is cheaper than paying the distribution cost now",
      ],
    },
  },
  "leaf-ha-mono-mixed": {
    id: "leaf-ha-mono-mixed",
    question: "Recommended: Monolith + hybrid data layer",
    recommendation: {
      summary:
        "Monolith for the team shape; hybrid data for the query shape. EF Core handles the 80% case cleanly — raw SQL takes the long tail of dynamic patterns that resist the ORM.",
      components: [
        { label: "service shape", choice: "Well-structured monolith", why: "Single-team coordination — no distributed-system tax to pay" },
        { label: "runtime", choice: "C# / .NET Core", why: "Mature runtime across legal-tech, public-safety, enterprise — boring is appropriate" },
        { label: "data primary", choice: "Entity Framework Core", why: "ORM owns the 80% case the framework was built for — fighting it costs more than using it" },
        { label: "data secondary", choice: "Raw SQL + stored procedures", why: "Long-tail dynamic patterns land cleaner in SQL — one source for query planning, one place to optimize" },
        { label: "database", choice: "SQL Server", why: "Schema-first design — relational integrity is the contract, not an afterthought" },
        { label: "testing", choice: "NUnit + integration tests", why: "Coverage as discipline, not target — reviewer reads the gap, not the percentage" },
      ],
      tradeOffs: [
        "Two data-layer technologies — accepted because the long tail of query shapes costs more in ORM gymnastics than in raw-SQL discipline",
        "Database becomes load-bearing — schema migration discipline is the price of treating the data model as a design surface",
      ],
      citation: { chapter: "LexisNexis decision callout #2", href: "#systems-lexisnexis" },
    },
  },
  "leaf-ha-mono-complex": {
    id: "leaf-ha-mono-complex",
    question: "Recommended: Monolith + stored-procedure hybrid",
    recommendation: {
      summary:
        "When dynamic query patterns dominate, the data model becomes the design. Stored procedures land cleaner in SQL — optimizable in one place, debuggable from the database side, versioned with the schema they depend on.",
      components: [
        { label: "service shape", choice: "Well-structured monolith", why: "Single-team coordination — no distributed tax to pay" },
        { label: "runtime", choice: "C# / .NET Core", why: "Mature runtime — boring is a feature when complexity already lives in the data layer" },
        { label: "data layer", choice: "Stored procedures + EF Core", why: "Dynamic match patterns optimize cleaner in SQL — query planning lives next to the data, not in the application" },
        { label: "database", choice: "SQL Server", why: "Schema + stored procs as the design surface — the LTI thesis: when the data is the work, the data layer is the architecture" },
        { label: "validation", choice: "Fluent Validation", why: "Composable rules outside the domain layer — testable and replaceable as the schema grows" },
      ],
      tradeOffs: [
        "Stored procs are versioned with schema — migration discipline is the price of single-source optimizability",
        "Stored-proc code review is a team-skill investment — pays back when query patterns get harder, not before",
      ],
      citation: { chapter: "LexisNexis decision callout · LTI chapter", href: "#systems-lti" },
    },
  },
  "leaf-ha-multi-low-99": {
    id: "leaf-ha-multi-low-99",
    question: "Recommended: Microservices + lightweight resilience",
    recommendation: {
      summary:
        "Microservices for the team shape, not the uptime — the resilience layer stays light at 99%. Distribution earns its cost in coordination, not in availability theater.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "Multi-team independence — each service is one team's deployment cadence" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — the runtime is incidental when the service boundary is right" },
        { label: "async", choice: "In-process queue", why: "Under 1K events/day, a broker is overhead — in-process is the appropriate ceiling" },
        { label: "resilience", choice: "Standard try/catch + retry-once", why: "99% target doesn't pay for circuit breakers — premature resilience is a cost, not a hedge" },
        { label: "data", choice: "Per-service database", why: "Service boundaries are data boundaries — cross-service data sharing rebuilds the monolith you just left" },
      ],
      tradeOffs: [
        "Distributed complexity costs less than team-coupling cost at multi-team scale — even when the availability bar is modest",
        "Observability earns its keep on day one — without it, microservices is a more expensive monolith with worse bugs",
      ],
    },
  },
  "leaf-ha-multi-low-999": {
    id: "leaf-ha-multi-low-999",
    question: "Recommended: Microservices + Polly retry",
    recommendation: {
      summary:
        "Microservices for the team shape; Polly carries the resilience for the 99.9% bar. Retry policies belong in a framework, not in every service's hand-rolled catch block.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "Multi-team independence — service boundaries match team boundaries" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental when service boundaries are right" },
        { label: "async", choice: "In-process queue", why: "Under 1K events/day, a broker is overhead the budget doesn't earn" },
        { label: "resilience", choice: "Polly retry policies", why: "When transient failures matter — Polly centralizes retry policy so service code stays free of resilience boilerplate" },
        { label: "data", choice: "Per-service database", why: "Service boundaries are data boundaries — anything else rebuilds the monolith you left" },
      ],
      tradeOffs: [
        "Polly framework dependency — accepted because hand-rolled retry is nobody's craft and silently rots in every service",
        "Retry logic needs idempotency discipline — without it, retry turns transient failures into duplicate writes",
      ],
    },
  },
  "leaf-ha-multi-low-9995": {
    id: "leaf-ha-multi-low-9995",
    question: "Recommended: Microservices + Polly + circuit breaker",
    recommendation: {
      summary:
        "The LexisNexis recipe at modest async volume — Polly retry plus circuit breaker plus full observability for the 99.95% bar.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "LN pattern — 6 teams coordinated" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "LN production stack" },
        { label: "async", choice: "In-process queue", why: "Under 1K events/day" },
        { label: "resilience", choice: "Polly retry + circuit breaker", why: "99.95% bar — battle-tested patterns" },
        { label: "observability", choice: "Structured logging + metrics", why: "Without it, you can't measure the SLA" },
        { label: "auth", choice: "OAuth 2.0 + JWT", why: "LN API Gateway pattern" },
      ],
      tradeOffs: [
        "Heavier operational surface",
        "Circuit-breaker tuning requires production data",
      ],
      citation: { chapter: "LexisNexis", href: "#systems-lexisnexis" },
    },
  },
  "leaf-ha-multi-mid-99": {
    id: "leaf-ha-multi-mid-99",
    question: "Recommended: Microservices + RabbitMQ + standard resilience",
    recommendation: {
      summary:
        "Mid-volume async earns a broker — RabbitMQ for durability and fanout, standard error handling for the 99% bar. Don't pay for resilience the SLA doesn't ask for.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "Multi-team independence — service boundary matches team boundary" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental at the right boundary" },
        { label: "async queue", choice: "RabbitMQ", why: "Mid volume makes durability and consumer fanout cheap to reason about — the broker pays for itself in incidents avoided" },
        { label: "resilience", choice: "Standard try/catch + retry-once", why: "99% bar — circuit breakers are premature; the SLA doesn't ask for them yet" },
        { label: "data", choice: "Per-service database + Redis cache", why: "Read-heavy hot paths don't need to hit the database every time — cache where the access pattern earns it" },
      ],
      tradeOffs: [
        "RabbitMQ operational cost — accepted because at mid volume the broker is what makes durability and fanout cheap to reason about",
        "Eventual consistency boundary — names where the system lives with stale reads, not whether",
      ],
    },
  },
  "leaf-ha-multi-mid-999": {
    id: "leaf-ha-multi-mid-999",
    question: "Recommended: Microservices + RabbitMQ + Polly",
    recommendation: {
      summary:
        "Mid-volume async + 99.9% bar — the broker takes the load, Polly takes the transient failures, Redis takes the read pressure. Three pieces, three failure modes, each in its right place.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "Multi-team independence — boundaries match the team graph" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental at the right boundary" },
        { label: "async queue", choice: "RabbitMQ", why: "Durability + consumer fanout at mid volume — the broker pays for itself in incidents avoided" },
        { label: "resilience", choice: "Polly retry policies", why: "Centralizes retry policy so service code stays free of resilience boilerplate" },
        { label: "data", choice: "Per-service database + Redis cache", why: "Cache layer doubled app speed at LN" },
      ],
      tradeOffs: [
        "RabbitMQ + Polly + Redis surface — three technologies because each owns a different failure mode; collapsing them costs more in incidents than in ops",
        "Three durability layers to keep coherent — schema drift between them is the silent killer",
      ],
    },
  },
  "leaf-ha-multi-mid-9995": {
    id: "leaf-ha-multi-mid-9995",
    question: "Recommended: The LexisNexis recipe",
    recommendation: {
      summary:
        "Microservices + API Gateway + RabbitMQ + Polly (retry + circuit breaker) + Redis cache + OAuth 2.0/JWT. This is what I shipped at LexisNexis at 99.95% availability and 100K+ daily events.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "6-team codebase coordination" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Production-scale legacy + modern" },
        { label: "async queue", choice: "RabbitMQ", why: "100K+ daily events — durability + fanout" },
        { label: "resilience", choice: "Polly retry + circuit breaker", why: "82% error reduction measured" },
        { label: "cache", choice: "Redis distributed", why: "Survives restarts, serves all instances — doubled app speed" },
        { label: "auth", choice: "OAuth 2.0 + JWT", why: "Protecting 15K+ user surface" },
        { label: "data", choice: "SQL Server + EF Core + stored procs (hybrid)", why: "Dynamic match patterns land cleaner in SQL" },
        { label: "frontend", choice: "Angular v15 + React + GraphQL with Apollo", why: "Team-depth-driven choice; 200ms → 120ms query execution" },
      ],
      tradeOffs: [
        "Heavy operational surface — requires dedicated SRE attention",
        "Multi-technology data layer needs migration discipline",
        "Polly + circuit breaker tuning requires production telemetry",
      ],
      citation: { chapter: "LexisNexis", href: "#systems-lexisnexis" },
    },
  },
  "leaf-ha-multi-high-99": {
    id: "leaf-ha-multi-high-99",
    question: "Recommended: Microservices + topic-partitioned queue",
    recommendation: {
      summary:
        "At 100K+ events/day, RabbitMQ pushes its limits. Topic-partitioned queue (Kafka-like) earns its operational complexity by paying back in throughput headroom and replay semantics.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "Multi-team independence at scale — service boundaries match team boundaries" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental when the boundary is right" },
        { label: "async queue", choice: "Topic-partitioned (Kafka)", why: "100K+/day load earns the operational complexity — replay semantics and partition parallelism are what RabbitMQ doesn't offer cleanly at this volume" },
        { label: "resilience", choice: "Standard try/catch", why: "99% target — the queue handles most of the durability story; service-level resilience stays light" },
        { label: "data", choice: "Per-service database + Redis", why: "Read-heavy hot paths cached where access patterns earn it" },
      ],
      tradeOffs: [
        "Kafka cluster operations are non-trivial — accepted because RabbitMQ at 100K+/day costs more in incident response than Kafka costs in setup",
        "Topic schema migration is a real discipline — the price of evolving an async contract that producers and consumers both depend on",
      ],
    },
  },
  "leaf-ha-multi-high-999": {
    id: "leaf-ha-multi-high-999",
    question: "Recommended: Microservices + Kafka + Polly",
    recommendation: {
      summary:
        "High async + 99.9% bar — Kafka carries the volume, Polly carries the retries, Redis carries the read pressure. Each piece owns one failure mode; the architecture names where each one lives.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway", why: "Multi-team independence at scale — service boundary matches team graph" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental at the right boundary" },
        { label: "async queue", choice: "Topic-partitioned (Kafka)", why: "100K+/day load — replay semantics and partition parallelism earn the operational complexity" },
        { label: "resilience", choice: "Polly retry", why: "Centralized retry policy — service code stays free of resilience boilerplate" },
        { label: "data", choice: "Per-service DB + Redis", why: "Distributed cache survives restarts — serves all instances coherently" },
      ],
      tradeOffs: [
        "Kafka + Polly + Redis — three technologies because each owns a different failure mode; collapsing them costs more in incidents than in ops",
        "Three durability layers to keep coherent across producers, retries, and reads — schema drift is the silent killer",
      ],
    },
  },
  "leaf-ha-multi-high-9995": {
    id: "leaf-ha-multi-high-9995",
    question: "Recommended: Highest-availability stack",
    recommendation: {
      summary:
        "The upper bound of my recipe — maximum-tolerance synthesis. Kafka for durable async, Polly with circuit breaker and bulkhead, Redis with edge cache, distributed tracing throughout. Every piece of the architecture is also a piece of the SLA.",
      components: [
        { label: "service shape", choice: "Microservices + API Gateway + service mesh", why: "Multi-team independence plus traffic management — the mesh handles retries, timeouts, and routing as policy, not as application code" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental at the right boundary" },
        { label: "async queue", choice: "Topic-partitioned (Kafka)", why: "100K+/day with durability — replay semantics are part of the SLA story, not an afterthought" },
        { label: "resilience", choice: "Polly retry + circuit breaker + bulkhead", why: "Bulkhead isolates failure domains; circuit breaker prevents cascade; retry handles transients — three patterns, three failure modes" },
        { label: "cache", choice: "Redis distributed + CDN edge cache", why: "Multi-layer cache — distributed for instance-coherent state, edge for read locality" },
        { label: "observability", choice: "Distributed tracing + metrics + structured logs", why: "Required to meet the SLA — what isn't measured can't be defended at the post-incident review" },
        { label: "auth", choice: "OAuth 2.0 + JWT", why: "Standard token flow — stays out of the application and survives identity-provider swaps" },
      ],
      tradeOffs: [
        "Beyond what a single SRE can hold — accepts team SRE capacity as part of the architecture, not adjacent to it",
        "Cost surface grows significantly — appropriate only where downtime cost > infra cost; not the default",
        "99.95% to 99.99% is a 10x effort jump — the marginal nine is the most expensive one to buy",
      ],
    },
  },

  "leaf-ps-anti": {
    id: "leaf-ps-anti",
    question: "I don't reach for this — and here's why.",
    recommendation: {
      summary:
        "Coverage % as a target is something I actively avoid. The discipline isn't the percentage — it's that the uncovered surface has to be deliberately scoped and reviewed. The number is a side effect of the discipline, not the goal of it.",
      components: [
        {
          label: "anti-pattern",
          choice: "Coverage % as goal",
          why: "Coverage is a proxy — untested paths in the wrong place matter more than the headline, and tests written to hit the number are tests written to lie",
        },
        {
          label: "instead",
          choice: "95% coverage + deliberate review of the uncovered 5%",
          why: "The Motorola public-safety bar — what gets reviewed is the gap, not the percentage; the discipline outlasts the number",
        },
      ],
      tradeOffs: [
        "Requires senior-reviewer time at code review — accepts coverage debate today for catch quality at deployment",
        "Harder to report up as a single number — coverage % is what executives want; deliberate review of gaps is what survives production",
      ],
      citation: { chapter: "Motorola", href: "#systems-motorola" },
    },
  },
  "leaf-ps-dispatch": {
    id: "leaf-ps-dispatch",
    question: "Recommended: The Motorola dispatch stack",
    recommendation: {
      summary:
        "Public-safety dispatch — every endpoint has to hold up. .NET Core REST + EF Core custom repositories + Angular with MVVM + RxJS for real-time UI. Shipped this at Motorola Solutions — 68% query-perf gain, 65% incident-response time reduction, 55% response-time improvement on dispatch hot paths.",
      components: [
        { label: "service shape", choice: "REST APIs on .NET Core", why: "Public safety doesn't get to be flaky — the framework is table stakes; the discipline around it is the differentiator" },
        { label: "data layer", choice: "Repository + Unit-of-Work + EF Core", why: "Testable in isolation, optimizable per call site without polluting the domain — the abstraction earns its weight at this uptime bar" },
        { label: "resilience", choice: "Custom error middleware + Polly retry", why: "Centralized retry policy in middleware keeps service code free of resilience boilerplate — the cross-cutting concern lives where cross-cutting belongs" },
        { label: "frontend", choice: "Angular + Material + MVVM + RxJS", why: "Observable streams model real-time dispatch state naturally; Material lets the team move fast on layout without building a design system from scratch" },
        { label: "testing", choice: "NUnit + integration tests", why: "95% coverage as discipline, 5% deliberately scoped — what gets reviewed is the gap, not the headline number" },
        { label: "cache", choice: "Redis high-frequency cache", why: "Read-heavy hot paths don't need to hit SQL on every dispatch lookup — cache where the access pattern earns it" },
      ],
      tradeOffs: [
        "Repository + UoW is overhead a smaller system wouldn't pay — accepted because public-safety query optimizability isn't negotiable",
        "MVVM with observables is a team-knowledge cost up front — ongoing-velocity gain afterward, and the right model for state that changes mid-render anyway",
      ],
      citation: { chapter: "Motorola Solutions", href: "#systems-motorola" },
    },
  },
  "leaf-ps-internal": {
    id: "leaf-ps-internal",
    question: "Recommended: Internal-tool stack with discipline",
    recommendation: {
      summary:
        "Same backend discipline, lighter frontend — internal operators need correct, not pixel-perfect. EF Core + Angular Material + integration tests; the operator-facing surface earns the design-system shortcut.",
      components: [
        { label: "service shape", choice: "REST APIs on .NET Core", why: "Same backend bar — internal-facing doesn't lower the correctness ceiling, just the polish ceiling" },
        { label: "data layer", choice: "Repository + EF Core", why: "Testable in isolation — the abstraction is consistent with the public-safety stack so the team's habits transfer cleanly" },
        { label: "frontend", choice: "Angular + Material UI", why: "Internal tools earn the design-system shortcut — building custom UI for operators is cost without payoff" },
        { label: "auth", choice: "Internal SSO + JWT", why: "Operator-only access — SSO is what the org already runs; JWT keeps the application stateless" },
        { label: "testing", choice: "NUnit + integration", why: "Coverage discipline carries over — what gets reviewed is the gap, not the percentage" },
      ],
      tradeOffs: [
        "Less polish than public-safety dispatch — appropriate; internal operators don't need pixel-perfect, they need correct",
      ],
    },
  },

  "leaf-de-mono": {
    id: "leaf-de-mono",
    question: "Recommended: TCS Dow OPD recipe (single team)",
    recommendation: {
      summary:
        "Data-heavy enterprise on a single team — clean architecture + SOLID across services + the schema is the design. Shipped at TCS for Dow Chemical's Operations Dashboard (17K daily users, 650 plants, 13 languages) — 35% performance gain, 60% data-entry error reduction, 40% engagement lift after redesign.",
      components: [
        { label: "service shape", choice: "Service-oriented monolith (20+ services)", why: "Clean architecture across services without paying the microservices ops tax — a single team can't coordinate per-service deployment at this scale anyway" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Mature runtimes — boring is a feature when the system has 17K daily users and 650 plants depending on it" },
        { label: "data", choice: "SQL Server + EF + lazy loading", why: "Lazy loading earns its keep when navigation property graphs are wide and access is partial — eager loading would pull more than the page needs" },
        { label: "validation", choice: "Fluent Validation", why: "Composable rules outside the domain layer — testable and replaceable as the schema grows" },
        { label: "frontend", choice: "Angular + Bootstrap", why: "Component-first framework with a design system that doesn't require building one — appropriate for enterprise-internal where polish ceiling is functional, not editorial" },
        { label: "discipline", choice: "SOLID + clean architecture", why: "Reducing complexity is the work — the framework is just where the discipline lives" },
      ],
      tradeOffs: [
        "Service-oriented monolith — accepts architectural discipline upfront in exchange for not paying the microservices ops tax with a single team",
        "SOLID needs team buy-in at code review — defaulted-in costs less than retrofitted-in once the team scales past first growth",
      ],
      citation: { chapter: "TCS Dow OPD", href: "#systems-tcs" },
    },
  },
  "leaf-de-multi": {
    id: "leaf-de-multi",
    question: "Recommended: Multi-team enterprise platform",
    recommendation: {
      summary:
        "Multi-team enterprise platform — microservices with shared data conventions, per-domain ownership.",
      components: [
        { label: "service shape", choice: "Microservices by business domain", why: "Multi-team coordination" },
        { label: "data shared", choice: "SQL Server with domain schemas", why: "Schema-first relational integrity" },
        { label: "data per-service", choice: "Domain-owned databases", why: "Service-bounded" },
        { label: "communication", choice: "REST + RabbitMQ for async", why: "Sync where simple, async where durable" },
        { label: "frontend", choice: "Per-domain frontend, shared design system", why: "Team velocity" },
        { label: "discipline", choice: "Domain-Driven Design", why: "Architecture and product speak the same language" },
      ],
      tradeOffs: [
        "Cross-domain queries require composition",
        "Schema governance is a real discipline",
      ],
      citation: { chapter: "LexisNexis (DDD pattern)", href: "#systems-lexisnexis" },
    },
  },
  "leaf-de-doc": {
    id: "leaf-de-doc",
    question: "Recommended: Document-flexible enterprise stack",
    recommendation: {
      summary:
        "Don't pretend document data is relational — pick the storage that fits the shape, then bridge the edges. MongoDB for the document side, SQL Server for the structured edges, microservices split by data shape rather than by team graph.",
      components: [
        { label: "service shape", choice: "Microservices by data shape", why: "Different storage per domain — the service boundary names which data store owns the truth" },
        { label: "data primary", choice: "MongoDB", why: "Document-flexible schema fits feature shapes that evolve faster than a relational migration cadence — the storage shape matches the work shape" },
        { label: "data structured", choice: "SQL Server for relational edges", why: "Joins and integrity where they matter — forcing relational data into a document store is a discipline tax with no payoff" },
        { label: "runtime", choice: ".NET Core + Node.js", why: "Pick per team depth — runtime is incidental when the data boundary is right" },
        { label: "frontend", choice: "Angular or React (team-depth)", why: "Framework is incidental; judgment scales" },
      ],
      tradeOffs: [
        "Two data stores to operate — accepted because forcing one shape into the wrong store costs more in query gymnastics than in operations",
        "Cross-store queries require composition — names where the system lives with that constraint, not whether",
      ],
    },
  },

  "leaf-st-crud": {
    id: "leaf-st-crud",
    question: "Recommended: Single-team CRUD stack",
    recommendation: {
      summary:
        "One team, simple CRUD — monolith + EF Core. Don't over-engineer; ship fast. Architecture is what you defer until the team or the load forces you to build it.",
      components: [
        { label: "service shape", choice: "Monolith", why: "Single team, no distributed-system tax to pay — the monolith is the appropriate ceiling" },
        { label: "runtime", choice: ".NET Core OR Node.js", why: "Pick per team depth — runtime is incidental when the boundary is right" },
        { label: "data", choice: "EF Core + SQL Server or PostgreSQL", why: "Simple CRUD lives inside the ORM's 80% case — fighting that costs more than using it" },
        { label: "frontend", choice: "Angular or React (team depth)", why: "Framework is incidental; judgment scales" },
        { label: "testing", choice: "Integration + smoke tests", why: "Don't over-test CRUD — test the integrations where things actually break" },
      ],
      tradeOffs: [
        "Uniform scaling — accepted because a single team can't coordinate per-service scaling at this size anyway",
        "Refactor cost arrives if the team grows past ~10 — paid then is cheaper than paid prematurely now",
      ],
    },
  },
  "leaf-st-sp": {
    id: "leaf-st-sp",
    question: "Recommended: LTI heritage stack",
    recommendation: {
      summary:
        "Single team, complex with stored-procedure logic — database-first. The data model is the design. Shipped at LTI — 40% query-time reduction once the dynamic patterns moved into SQL where they belonged.",
      components: [
        { label: "service shape", choice: "Monolith", why: "Single team, no distributed tax to pay — complexity already lives in the data layer" },
        { label: "runtime", choice: ".NET MVC + EF", why: "LTI-era stack that earned the pattern — mature, predictable, debuggable end-to-end" },
        { label: "data layer", choice: "Database-first + 25+ stored procedures", why: "Dynamic patterns optimizable in SQL — one source for query planning, one place to read it" },
        { label: "frontend", choice: "Bootstrap responsive UI", why: "Cross-browser compatibility without a custom design system — appropriate when the work is server-rendered and the brand isn't editorial" },
        { label: "discipline", choice: "LINQ + custom generic constraints + extension methods", why: "C# habits that scaled — type system carries the contracts the framework can't" },
      ],
      tradeOffs: [
        "Stored procedures versioned with schema — migration discipline is the price of single-source optimizability",
        "Database becomes a load-bearing wall — by design, not by accident; the data model carries the load the application layer doesn't",
      ],
      citation: { chapter: "LTI (Larsen & Toubro)", href: "#systems-lti" },
    },
  },
  "leaf-st-doc": {
    id: "leaf-st-doc",
    question: "Recommended: Document-store single-team stack",
    recommendation: {
      summary:
        "Single team, document-flexible data — MongoDB + Node.js + React. Velocity stack: pick the storage that fits the feature shape, then move fast inside that shape.",
      components: [
        { label: "service shape", choice: "Monolith", why: "Single team, no distributed tax to pay" },
        { label: "runtime", choice: "Node.js + Express", why: "Velocity for document-shaped data — runtime model matches data model" },
        { label: "data", choice: "MongoDB", why: "Schema-flexible — fast iteration on feature shape when the shape is still being learned" },
        { label: "frontend", choice: "React + hooks + context", why: "Velocity stack pair — composition model matches the data model" },
        { label: "testing", choice: "Jest + React Testing Library", why: "Test the integrations where things actually break — don't over-test glue code" },
      ],
      tradeOffs: [
        "Schema flexibility means schema discipline lives in the team, not the database — accepted because the velocity gain pays for the discipline cost",
        "Cross-document queries require composition — the price of document-flexibility, paid in application code rather than schema migration",
      ],
    },
  },
};

export const ROOT_NODE_ID = "root";

/* ===========================================================================
   PARAMETRIC LEAF MATRIX
   ---------------------------------------------------------------------------
   Used by ParametricPanel.tsx — a 3-knob console that morphs the recommended
   recipe as the visitor tunes constraints (the AWS-pricing-calculator UX
   register applied to architectural judgment).

   Indices:
     [serviceShape]  0 = Monolith
                     1 = Microservices, modest scale
                     2 = Microservices, hyperscale

     [workload]      0 = Standard CRUD
                     1 = Async + real-time
                     2 = Data-intensive

     [failureBar]    0 = Best-effort (99%)
                     1 = Business-critical (99.9%)
                     2 = Hardened (99.95%+)

   Total cells: 3 × 3 × 3 = 27. Coverage: 13 of 21 leaves. The other 8 leaves
   (public-safety family, single-team CRUD/SP/Doc, the anti-pattern leaf)
   are qualitatively-different scenarios that don't map onto continuous
   dials and remain accessible via the walk-the-tree mode.
   =========================================================================== */
export type ServiceShapeIdx = 0 | 1 | 2;
export type WorkloadIdx = 0 | 1 | 2;
export type FailureBarIdx = 0 | 1 | 2;

export const SERVICE_SHAPE_LABELS = [
  "Monolith",
  "Microservices · modest",
  "Microservices · hyperscale",
] as const;

export const WORKLOAD_LABELS = [
  "Standard CRUD",
  "Async + real-time",
  "Data-intensive",
] as const;

export const FAILURE_BAR_LABELS = [
  "Best-effort · 99%",
  "Business · 99.9%",
  "Hardened · 99.95%+",
] as const;

/**
 * LEAF_MATRIX[serviceShape][workload][failureBar] → leafId
 *
 * Default (1, 1, 2) lands on `leaf-ha-multi-mid-9995` — the LexisNexis
 * recipe — for the headline first-paint signal.
 */
export const LEAF_MATRIX: string[][][] = [
  /* [0] Monolith */
  [
    /* [0][0] CRUD */
    ["leaf-ha-mono-crud", "leaf-ha-mono-crud", "leaf-ha-mono-mixed"],
    /* [0][1] Async + real-time */
    ["leaf-ha-mono-mixed", "leaf-ha-mono-mixed", "leaf-ha-mono-complex"],
    /* [0][2] Data-intensive */
    ["leaf-de-mono", "leaf-de-mono", "leaf-ha-mono-complex"],
  ],
  /* [1] Microservices, modest */
  [
    /* [1][0] CRUD */
    ["leaf-ha-multi-low-99", "leaf-ha-multi-low-999", "leaf-ha-multi-low-9995"],
    /* [1][1] Async + real-time */
    ["leaf-ha-multi-mid-99", "leaf-ha-multi-mid-999", "leaf-ha-multi-mid-9995"],
    /* [1][2] Data-intensive */
    ["leaf-de-multi", "leaf-de-multi", "leaf-ha-multi-mid-9995"],
  ],
  /* [2] Microservices, hyperscale */
  [
    /* [2][0] CRUD */
    [
      "leaf-ha-multi-high-99",
      "leaf-ha-multi-high-999",
      "leaf-ha-multi-high-9995",
    ],
    /* [2][1] Async + real-time */
    [
      "leaf-ha-multi-high-99",
      "leaf-ha-multi-high-999",
      "leaf-ha-multi-high-9995",
    ],
    /* [2][2] Data-intensive */
    ["leaf-de-doc", "leaf-de-multi", "leaf-ha-multi-high-9995"],
  ],
];

export const PARAMETRIC_DEFAULTS = {
  /* First-paint lands on the synthesis leaf (leaf-ha-multi-high-9995 —
     Highest-availability stack). No single-company citation; frames as
     the upper bound of Jinal's recipe rather than any one job's stack. */
  serviceShape: 2 as ServiceShapeIdx, // Microservices · hyperscale
  workload: 2 as WorkloadIdx, // Data-intensive
  failureBar: 2 as FailureBarIdx, // Hardened · 99.95%+
};
