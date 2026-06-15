export interface Metric {
  value: string;
  label: string;
}

export interface Experience {
  era: "raleigh" | "boston" | "mumbai";
  /** Section folder in the file tree. Defaults to "Systems" if absent.
      Teaching role uses "Teaching" so the file path renders as
      `Teaching / northeastern.md` and the anchor is `#teaching-northeastern`,
      keeping it visually parallel to but distinct from the engineering
      chapters. Per 2026-05-31 decision (5-lens shipping test passed): teaching
      gets its own section to preserve senior signal in Systems/ AND surface
      the multiplier-effect leverage (RESEARCH.md §5B). */
  section?: "Systems" | "Teaching";
  dates: string;
  title: string;
  company: string;
  client?: string;
  /** URL slug for the dedicated detail page at /career/[slug].
      Per Phase 2 ratification: detail pages remain accessible (URL permalinks
      stay intact) but the chapter on the home page IS the full chapter, not
      a teaser. Detail page mirrors the same content for sharable links. */
  slug: string;
  /** Featured tier flag. Featured chapters get full editorial treatment;
      non-featured render in shorter book-chapter form. */
  featured: boolean;
  /** Compact 1-2 sentence preview, used for SEO description and as the
      detail-page lede. Pulled from Jinal's authored material — never invented. */
  summary: string;
  /** Chapter epigraph — Fraunces italic lede that opens the chapter.
      Each pulled verbatim or near-verbatim from Jinal's LinkedIn / resume,
      ratified 2026-05-08. CHAPTERS.md §X defense table per chapter. */
  thesis?: string;
  /** Chapter narrative — paragraphs separated by \n\n. Sourced from
      LinkedIn About + LinkedIn role bullets + Jinal-authored portfolio
      content. CLAUDE.md #15 satisfied via Phase 2 ratification 2026-05-08. */
  narrative: string;
  /** Marginalia (per SPEC.md §9 → `Marginalia` component): engineering
      decision callouts rendered in the desktop margin or inline on mobile.
      Each entry positions itself after a specific paragraph index (0-based). */
  decisions?: { afterParagraph: number; text: string }[];
  /** Hero numbers — pulled out as design elements in the chapter card. */
  metrics: Metric[];
  /** Outcome statement — the "why it mattered" line, no numbers. */
  outcome: string;
  testimonial?: { quote: string; author: string; role: string };
  awards?: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    era: "raleigh",
    dates: "May 2023 — Present",
    title: "Senior Software Engineer",
    company: "LexisNexis",
    slug: "lexisnexis",
    featured: true,
    summary:
      "An opportunity to take a working system and make it ready for what was coming next. Rearchitected services, rebuilt the data layer, shipped async patterns that eliminated the biggest bottlenecks. Today the platform runs at nearly double the speed at 99.95% uptime, with deployments that don’t make anyone hold their breath.",
    thesis:
      "Making software faster is engineering. Making an engineering org faster — that’s the work I care about.",
    /* Five-paragraph chapter from CHAPTERS.md §Chapter 1. Voice spine drawn
       from LinkedIn About + LinkedIn LexisNexis bullets. Ratified 2026-05-08. */
    narrative:
      "At LexisNexis the constraint was scale without disruption — six teams, 40+ engineers, microservices behind an API gateway, micro-frontends on top. The work was architectural: async processing where synchronous service paths broke at six-figure event volume, gateway routing redesigned around the boundary lines production load actually exposes. The platform now runs at nearly twice the speed, holds 99.95% uptime, and ships deploys without anyone holding their breath.\n\nOn my team I work full stack across the data layer, caching, and the public API surface — partnering with the Product Owner on scope and deadlines, the architect on integration contracts, and UX on the workflows the API actually serves. Rewrote SQL queries where the query plan was the bottleneck — 70% off database response time. Distributed Redis decided which reads survived a restart — application speed doubled. The public API exposes the queries and mutations downstream systems depend on; designing it means picking what fails fast, what degrades gracefully, and what stays backward-compatible across releases. When the platform slows or blocks users, the work is finding the root cause and shipping a fix that holds.\n\nThe exception-handling middleware I implemented catches errors and applies PII masking bidirectionally — masking for external API consumers, unmasking for trusted internal apps. Caching is distributed Redis so the cache survives service restarts and serves all instances from one source. Async processing handles six-figure daily event volume. Resilient retry mechanisms via Polly framework hold 99.95% API availability and reduced errors by 82%.\n\nOn the data side, the most distinctive piece of work was an ETL feature where users upload entities through Excel. I owned the design end-to-end and walked it through with the DBA and architect at each stage. Raw rows land in a staging table — same shape as the upload, with extra columns for row index, processing status, and error trail so the system can report failures at the row level. A validation stored procedure runs against staging, applying the business rules that decide what counts as valid. Rows that pass get massaged into the main-table shape and promoted to the main load; rows that fail stay in staging with their error attached, so the user knows exactly which row to fix and why. Validation lives in the stored procedure because the business rules belong with the schema — optimizable in one place, debuggable from the database side. SSMS Copilot accelerated the test-script side of that work — generating representative malformed-row fixtures for each rule so the validation stayed honest.\n\nOn the frontend, I led the Angular v12 → v15 migration alongside the GraphQL framework upgrade — refactoring 30+ Material components in the process. Client-side GraphQL with Apollo dropped query execution from 200 ms to 120 ms. Two framework moves running in parallel.\n\nOn my own team — closer to ten — code reviews aren’t bug-hunts. They’re how you teach the next senior engineer what done looks like: how to write code that doesn’t come back as a bug ticket, how to design for the engineer who reads it six months later, how to make technical decisions that hold up under production reality. Post-release defects dropped 18%. Domain-driven design workshops shifted how the team thinks — business needs, technical architecture, and the boundaries between them get named before they become load-bearing. New capabilities ship 40% faster because architecture and product speak the same language now.",
    decisions: [
      {
        afterParagraph: 2,
        text: "Centralized exception middleware. Every code path goes through middleware, so compliance changes land in one place, not twelve.",
      },
      {
        afterParagraph: 3,
        text: "Stored procedures over ORM. The dynamic query patterns for entity matching landed cleaner in SQL — optimizable in one place, debuggable from the database side.",
      },
      {
        afterParagraph: 4,
        text: "Staging-first ETL. Excel uploads land in a staging table shaped like the upload — row-index, status, and error-trail columns — so failures report at the row level. The user sees exactly which row to fix and why, instead of a whole upload failing silently.",
      },
      {
        afterParagraph: 4,
        text: "AI-augmented validation testing. SSMS Copilot generated representative malformed-row fixtures for each validation rule — keeping the staging validation honest as the rules grew.",
      },
    ],
    /* 2026-06-13: chapter metric strip rotated from user/latency
       framing to throughput/error framing. The previous 3 metrics
       (15K users, 42% latency) read as user-count + abstract perf;
       the new 3 surface "what handles scale + doesn't break" — the
       harder-engineering signal. Both replacement values trace to the
       chapter narrative directly (six-figure event volume = 100K+
       in para 3; 82% error reduction in para 3). No new claims, no
       conflict with NDA scope — the broker name remains abstracted. */
    metrics: [
      { value: "99.95%", label: "Availability" },
      { value: "100K+", label: "Daily events" },
      { value: "82%", label: "Error ↓" },
    ],
    outcome:
      "Six teams moving independently — 40% faster delivery, 18% fewer defects.",
    tags: [
      "C#",
      "TypeScript",
      ".NET Core",
      "NodeJS",
      "Microservices",
      "Micro-Frontends",
      "GraphQL",
      "Apollo",
      "Polly",
      "OAuth2.0 / JWT",
      "Redis",
      "RabbitMQ",
      "SQL Server",
      "Angular",
      "Material UI",
      "React",
      "Redux",
      "BEM / SASS",
    ],
  },
  {
    era: "boston",
    dates: "May 2022 — Dec 2022",
    title: "Software Engineer & Cloud Services Co-Op",
    company: "Motorola Solutions",
    slug: "motorola",
    featured: false,
    summary:
      "Built the REST API surface for the public safety dispatch platform. Every endpoint had to hold up, every retry had to land, every error had to be caught before it reached a dispatcher’s screen.",
    thesis: "Public safety software doesn’t get to be flaky.",
    /* Three-paragraph chapter from CHAPTERS.md §Chapter 2. Voice from
       LinkedIn Motorola verbatim where possible. Ratified 2026-05-08. */
    narrative:
      "At Motorola I built the REST API surface for the public safety dispatch platform. The bar was simple: every endpoint had to hold up, every retry had to land, every error had to be caught before it reached a dispatcher’s screen.\n\nOn the backend: REST APIs in .NET Core with C#, designed around Repository + Unit-of-Work patterns and EF Core custom repositories — testable in isolation, optimizable per query. Wrote the kind of database code that doesn’t need to be revisited every quarter. Error-handling middleware caught exceptions centrally so the application code stayed focused on what mattered. When things broke, the system told us exactly where and why instead of failing silently.\n\nNUnit and integration tests held coverage at 95% — not because a metric required it, but because public safety software doesn’t get to be flaky. On the frontend: Angular with MVVM patterns and RxJS observables, custom Angular Material theming with animations, responsive layouts across device breakpoints — reduced design-to-implementation time by 45%. Collaborated across the API boundary, paired on architectural decisions, code-reviewed end to end.",
    decisions: [
      {
        afterParagraph: 1,
        text: "Repository + Unit-of-Work. Made the codebase easier to test, easier to extend, easier for the next engineer to understand.",
      },
    ],
    metrics: [
      { value: "68%", label: "Query speed ↑" },
      { value: "65%", label: "Resolution ↑" },
      { value: "95%", label: "Test coverage" },
    ],
    outcome:
      "A codebase built cleanly enough — and reviewed thoroughly enough — that the next engineer could pick it up and extend it confidently.",
    tags: [
      "C#",
      ".NET Core",
      "REST API",
      "Microservices",
      "Repository / Unit of Work",
      "Entity Framework Core",
      "NUnit",
      "Azure",
      "Docker",
      "Kubernetes",
      "Angular",
      "Angular Material",
      "MVVM",
      "RxJS",
    ],
  },
  /* Northeastern teaching role — reinstated 2026-05-31 in its own
     `Teaching/` section. Prior reasoning (TA chapter in Systems/ diluted
     senior signal) is preserved: this entry lives in Teaching/ rather
     than Systems/, so file tree shows Teaching/ as a separate folder
     parallel to Showcase/ and Notes/ — visually distinct from senior
     engineering work, while still surfacing the mentorship-as-multiplier
     signal that RESEARCH.md §5B Senior Patterns explicitly cites.
     Voice/content sourced verbatim or near-verbatim from LinkedIn
     bullets for the two TA semesters; honors rule #15 (no fake data). */
  {
    era: "boston",
    section: "Teaching",
    dates: "Jan 2022 — Apr 2023",
    title: "Graduate Teaching Assistant",
    company: "Northeastern University",
    slug: "northeastern",
    featured: false,
    summary:
      "Two semesters across full-stack development and Web Design & UX — INFO6150 with Professor Vishal Chawla in Spring 2023. 95 students per cohort. Live technical debugging, hands-on exercises, no slides. Designed assignments testing how students think through problems, not how well they memorize syntax.",
    thesis:
      "Teaching during troubleshooting is the work — not a separate activity.",
    /* Three-paragraph narrative. Each paragraph drawn verbatim or
       near-verbatim from LinkedIn TA Spring 2023 + Spring 2022 bullets.
       Rule #15 honored — no invented content. */
    narrative:
      "Two semesters as a graduate teaching assistant at Northeastern, 95 students per cohort, 190 total across both terms.\n\nSpring 2023, I managed and taught lab sessions for Professor Vishal Chawla's INFO6150 (Web Design & User Experience) course — live technical debugging, hands-on exercises, no slides. Designed the assignments, quizzes, and project evaluations focused on practical application — testing how students think through problems, not how well they memorize syntax. Held office hours to troubleshoot technical issues, review code, and walk students through front-end and UX concepts one-on-one. Collaborated with the professor to shape course content and grading rubrics — not just delivering curriculum but helping build it.\n\nSpring 2022, taught lab sessions and supported students through assignments, project reviews, and technical troubleshooting across full-stack development concepts. Held regular office hours — breaking down complex topics into practical explanations that connected classroom theory to real-world engineering. Guided students on code structure, debugging strategies, and thinking through problems systematically before writing a single line. Evaluated assignments and provided detailed feedback focused on understanding, not just correctness — the kind of feedback that helps someone grow, not just pass.\n\nMentored students on bridging the gap between academic projects and production-quality thinking — how to write code that someone else can maintain.",
    decisions: [
      {
        afterParagraph: 1,
        text: "No slides — live technical debugging instead. Tested how students think through problems, not how well they memorize syntax.",
      },
    ],
    metrics: [
      { value: "190", label: "Students taught" },
      { value: "2", label: "Semesters" },
      { value: "95", label: "Per cohort" },
    ],
    outcome:
      "The kind of feedback that helps someone grow, not just pass.",
    tags: [
      "Teaching",
      "Mentorship",
      "Web Design & UX",
      "INFO6150",
      "Full-Stack",
      "Code Review",
      "Office Hours",
    ],
  },
  {
    era: "mumbai",
    dates: "Dec 2015 — Aug 2021",
    title: "Full Stack Developer",
    company: "Tata Consultancy Services",
    client: "Dow Chemical Company",
    /* Slug renamed dow → tcs on 2026-05-31. Per Jinal's correction:
       the EMPLOYER was TCS; Dow was the CLIENT. The file path should
       name the employer (matches resume + LinkedIn convention).
       Displayed chapter title still surfaces Dow as the client (in
       cobalt) — that part was already correct. */
    slug: "tcs",
    featured: true,
    summary:
      "Nearly six years on the Dow Operations Dashboard — 17,000 daily users, 650 plants globally, 13 languages, tens of thousands of transactions seven days per week. Architected backend services for high availability; the data layer was always my responsibility, not someone else’s. Knowledge transfer earned a Letter of Recommendation from the client tool owner.",
    thesis:
      "The data layer was always my responsibility, not someone else’s.",
    /* Four-paragraph chapter from CHAPTERS.md §Chapter 4. Corrected per
       Phase 2: "nearly six years" (5 yr 9 mo). Voice spine drawn from
       LinkedIn TCS verbatim. The closing bridges to the LOR insertion. */
    narrative:
      "Nearly six years on the Dow Operations Dashboard. 17,000 daily users · 650 plants globally · 13 languages · tens of thousands of transactions, seven days per week.\n\nBuilt and owned backend services serving 17K+ daily active users — designed for high availability, wrote the kind of code that handled production load without surprises, and ensured uninterrupted support for critical issues around the clock. Lazy loading earned its keep when navigation property graphs were wide and access was partial — eager loading would have pulled more than the page needed. 35% performance gain across the REST APIs. Wrote and tuned SQL queries that cut database response times — the data layer was always my responsibility, not someone else’s. Bridged the UI patterns with the API contracts so the design and the data layer stopped drifting. 40% acceleration on feature delivery — the design work wasn’t getting re-coordinated every sprint.\n\nAdvocated for clean architecture across the 20+ services I worked on, following SOLID principles — not as a theoretical exercise, but because reducing complexity meant the team shipped faster and spent less time debugging someone else’s shortcuts. Built validation frameworks that reduced data entry errors by 60% — the kind of invisible work that prevents entire categories of bugs from ever reaching users. A custom exception-handling strategy with logging and notification — the system told us where it failed before users noticed. Downtime dropped 75%.\n\nMentored junior developers on design patterns, code structure, and production thinking. Ran knowledge-sharing sessions for a team of 40 developers. Grew from developer to team supervisor and global SME — recognized with Star of the Month (×2), Service & Commitment, and Contextual Master awards. When it was time to hand the system over, I led a knowledge transfer thorough enough that the client stakeholder wrote a letter of recommendation.",
    decisions: [
      {
        afterParagraph: 2,
        text: "Clean architecture across 20+ services. SOLID wasn’t a theoretical exercise. Reducing complexity meant the team shipped faster and spent less time debugging someone else’s shortcuts.",
      },
    ],
    metrics: [
      { value: "17,000", label: "Daily users" },
      { value: "650", label: "Plants" },
      { value: "13", label: "Languages" },
      { value: "75%", label: "Downtime ↓" },
    ],
    outcome:
      "Faster queries, faster delivery, less downtime — at the scale of a global enterprise.",
    testimonial: {
      quote:
        "Jinal truly took partnership of this tool along with us… We are sad to see her leave.",
      author: "Jacky S. Aikin",
      role: "OPD Tool Owner, The Dow Chemical Company",
    },
    awards: [
      "Star of the Month (×2)",
      "Service & Commitment Award",
      "Contextual Master Award",
    ],
    tags: [".NET Core", "React", "Angular", "NodeJS", "SQL Server"],
  },
  {
    era: "mumbai",
    dates: "Jul 2013 — Dec 2015",
    title: "Software Developer",
    company: "LTI (Larsen & Toubro)",
    slug: "lti",
    featured: false,
    summary:
      "Where it started. Full .NET stack, 3K+ daily users — owned everything from database design to the responsive front-end. The thinking learned here is still the foundation I build on.",
    thesis:
      "The database is never just a storage layer — it’s an engineering decision.",
    /* Three-paragraph chapter from CHAPTERS.md §Chapter 5. Voice from
       LinkedIn LTI verbatim where possible. Replaces the prior invented
       second clause with the LinkedIn epigraph. */
    narrative:
      "Where it started. Built full-stack applications using the .NET web stack serving 3K+ daily users — owned everything from database design to the responsive front-end, shipping features that worked across browsers and devices.\n\nWrote complex SQL integrating 25+ stored procedures and optimized query performance, reducing execution time by 40%. This was where I learned that the database is never just a storage layer — it’s an engineering decision. LINQ, custom generic constraints, extension methods — the C# habits that scaled with everything after. Created reusable UI components and established a component-driven development approach that accelerated feature delivery by 40% — introduced a pattern the team continued using long after I moved on.\n\nMiddleware-based error tracking — observability up 70% because the team could now see what was breaking before users reported it. Built the foundation for how the team understood and responded to production issues. The thinking learned here — how to model data, how to debug across layers, how to ship something a team could actually maintain — is still the foundation I build on.",
    decisions: [
      {
        afterParagraph: 1,
        text: "Database-first was the call. 25+ stored procedures kept the data model in SQL — versioned with the schema, optimizable in one place, debuggable from the database side.",
      },
    ],
    metrics: [
      { value: "3,000+", label: "Daily users" },
      { value: "40%", label: "Query time ↓" },
      { value: "70%", label: "Observability ↑" },
    ],
    outcome:
      "First production systems. The thinking that scaled with everything that came after.",
    tags: ["C#", "SQL Server", "JavaScript", "Entity Framework", "MVC"],
  },
];
