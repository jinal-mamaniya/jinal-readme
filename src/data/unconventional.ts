/**
 * unconventional.ts — README-genre content that doesn't exist in the
 * book version. These sections push the portfolio from "well-built README"
 * (7/10) to "Staff/Principal-tier intellectual posture" (10/10).
 *
 * Status: DRAFTS, 2026-05-30, revised after full /references/ read.
 * Drafted by Claude from:
 *   1. src/data/experience.ts (chapter narratives + decisions + metrics)
 *   2. references/resume-fullstack.pdf (the canonical full-stack resume)
 *   3. references/resume-frontend.pdf (the front-end-emphasis resume)
 *   4. references/dow-lor.pdf (Dow LOR — Jacky S. Aikin, July 20, 2021)
 *   5. content/blog/*.mdx (3 published essays)
 *   6. components/sections/FrontMatter.tsx (bio prose)
 *
 * Jinal should review and edit before publication. Each section below
 * cites which source(s) it pulls from. Edits in-place are expected.
 */

export interface SystemUnconventional {
  /** What I'd qualify now with hindsight. Not regret — reflection. */
  selfCritique: string;
  /** Explicit out-of-scope. What this system / role did NOT cover.
      Optional — when omitted, the "What this system DOESN'T do"
      block is suppressed for that chapter. */
  limitations?: string;
}

/* Per-system unconventional content. Keys match experience.ts slugs. */
export const systemUnconventional: Record<string, SystemUnconventional> = {
  lexisnexis: {
    /* DRAFT — Sources: experience.ts LN chapter narrative + resume-fullstack
       LN section (specific metrics: GraphQL 200→120ms, microservices 42%
       latency, app speed 80%, deployment 2h→1.2h, code reviews 18%+25%,
       Polly 99.95%/82% error, RabbitMQ 100K+ events).
       Frames hindsight as engineering wisdom; does not invent specific
       failures. EDIT TO YOUR VOICE. */
    selfCritique:
      "Looking at this chapter now, I'd qualify how I present the headline metrics. The 42% system-latency reduction and 80% application-speed boost are real for the paths I rebuilt — but both are aggregates, and the wins were uneven across the platform's surface. The middleware caught everything in its scope; the platform is bigger than what was in mine. I'd also revisit the GraphQL execution numbers (200ms → 120ms) — that's true for the queries we instrumented; the long-tail of complex queries didn't always follow the same curve.",
    /* `limitations` field removed 2026-06-06 per user direction —
       "What this system DOESN'T do" block suppressed for LexisNexis.
       Other chapters keep their limitations callouts. */
  },

  motorola: {
    /* DRAFT — Sources: experience.ts Motorola chapter + resume-fullstack
       Motorola section ("Mastered advanced C# patterns implementing
       repository and unit of work patterns, reducing code duplication by
       40%", 68% query performance, 65% error resolution, 95% test
       coverage). Self-critique grounded in the public-safety bar. */
    selfCritique:
      "Public safety holds a uniform bar — every endpoint has to land. The 95% test coverage with NUnit + integration tests means 5% of cases were covered by review-and-scenario instead of automation. That's defensible for the time-box of an 8-month co-op, but I'd revisit which untested paths actually carry production traffic now. Coverage percentage is a proxy; uncovered paths in the wrong place matter more than the headline. The Repository + Unit of Work patterns I shipped were the right architectural call for that domain — but they're a heavier abstraction than smaller systems need; I'd be more careful about prescribing them universally.",
    /* DRAFT — Sources: chapter dates ("May 2022 — Dec 2022", co-op),
       resume scope details. */
    limitations:
      "This was an 8-month co-op engagement focused on the REST API surface (.NET Core with EF Core custom repositories) and the Angular Material front-end with MVVM patterns for one product within the dispatch platform. The platform as a whole has many adjacent systems — radio integration, alerting, GIS, ops dashboards — that weren't in my scope. The patterns I shipped (Repository + Unit of Work, custom error middleware, Redis caching for high-frequency queries) were for the domain I owned; treating the whole dispatch platform as 'mine' would overclaim a co-op's actual scope.",
  },

  tcs: {
    /* DRAFT — Sources: experience.ts TCS chapter ("Nearly six years on the
       Dow Operations Dashboard") + dow-lor.pdf (Jacky Aikin LOR, July
       20, 2021, "the past four years" on OPD specifically) + resume
       TCS section. Long-tenure perspective; honest about cumulative
       wins vs single acts. */
    selfCritique:
      "Six years on one system is long enough to see your own decisions age. The clean-architecture posture across 20+ services held up — but I'd qualify how much of that was 'architecture' versus 'the discipline of refusing to take shortcuts week to week.' I'd also be more careful now about presenting the 75% downtime-reduction headline as a single act; it was the cumulative effect of many incremental fixes — the exception-handling strategy, the Fluent Validation framework (60% data-entry-error reduction), attribute-based routing (28% performance), lazy-loading optimization (35%), and discipline at code-review time. No single change carried it. The clean-architecture pattern was right for that team; I'd be more careful about prescribing it universally now.",
    /* DRAFT — Sources: dow-lor.pdf (TCS as contractor; Dow as client),
       experience.ts ("client: Dow Chemical Company"), resume ("Tata
       Consultancy Services" employer). Models the engagement
       transparency the LOR itself emphasizes. */
    limitations:
      "This was a TCS engagement; Dow was the client. The Operations Dashboard system itself is Dow's; my role was as the engineer (and later supervisor + global SME) on the TCS side that built and maintained the dashboard for them. Many product-owner-level decisions (what features, what platforms, what release cadence) lived on the Dow side. The architecture and code-level decisions named above were mine; the product roadmap was not. The Letter of Recommendation specifically covers the four years I led the OPD tool support; the full TCS tenure (Dec 2015 — Aug 2021) included earlier work on adjacent accounts before the Dow alignment formalized.",
  },

  lti: {
    /* DRAFT — Sources: experience.ts LTI chapter + resume LTI section
       (15+ custom generic constraints, 20+ extension methods, 25+
       stored procedures, .NET MVC + EF + Bootstrap stack).
       Senior-looking-back-at-first-job perspective. */
    selfCritique:
      "This was the foundation, but it was also my first production code. I led with 'database-first' and 25+ stored procedures because that's how the team had always shipped — and at the time I thought it was the only way. Today I'd qualify it: database-first was right FOR THAT SYSTEM (data-heavy, low-velocity, single team, .NET web stack), but I'd name it as a contextual decision now, not a universal principle. The thinking that scaled was the discipline of treating the data model as design, not as storage. The specific tool (stored procedures) was incidental. The 15+ custom generic constraints and 20+ extension methods I wrote here are the C# habits I still carry; the over-reliance on stored procedures isn't.",
    limitations:
      "This is the on-ramp, not the destination. The 3K+ daily users and 25+ stored procedures were real but small relative to what came later. I owned 'database design to responsive front-end' for a single product team's surface — not the company-wide platform, not the cross-team data layer, not the deployment pipeline. The role taught me how to ship; later roles taught me how to scale what shipping looks like.",
  },
};

/* ===== Stack preferences =====
   Sources:
     1. Actually-used stacks across 4 jobs (experience.ts + resume-fullstack
        + resume-frontend Technical Skills sections)
     2. Published essay "Why I stopped caring about which framework to use"
        (content/blog/why-i-stopped-caring-about-frameworks.mdx)
     3. FrontMatter line: "My default isn't loyalty to a stack — it's
        asking what the system actually needs."
   EDIT WITH CONVICTION — these are your opinions, they should sound
   like yours. */
export const stackPreferences = {
  /* What I reach for — patterns demonstrated across 4 roles. */
  reachFor: [
    {
      tool: "C# / .NET Core",
      reason:
        "10 years across legal-tech, public-safety, enterprise — the language and runtime that consistently held up at production scale with my teams. From the .NET MVC stack at LTI through .NET Core microservices at LexisNexis.",
    },
    {
      tool: "SQL Server / PostgreSQL",
      reason:
        "Data-heavy systems with relational integrity. The schema is the design; the database is the engineering decision (LTI chapter thesis).",
    },
    {
      tool: "Entity Framework + raw SQL + stored procedures",
      reason:
        "I write whichever fits the query shape. EF for the 80% case; raw SQL or stored procedures when the dynamic patterns land cleaner in the database (LN decision callout #2).",
    },
    {
      tool: "Redis",
      reason:
        "Distributed cache that survives restarts and serves all instances from one source. Used at LexisNexis and Motorola for the cache layer that doubled application speed.",
    },
    {
      tool: "RabbitMQ for async / heavy event volume",
      reason:
        "When the workload is asynchronous and the consumer needs durability. LexisNexis: 100K+ daily events.",
    },
    {
      tool: "Polly for resilient retry",
      reason:
        "When transient failures matter and 99.95% availability is the bar. LexisNexis: 82% error reduction.",
    },
    {
      tool: "GraphQL with Apollo (client-side)",
      reason:
        "When the client needs to choose its query shape. LexisNexis: dropped query execution from 200ms to 120ms.",
    },
    {
      tool: "Angular OR React (both, depending on team)",
      reason:
        "I've shipped both at production scale across roles. The frontend framework matters less than the team's depth with it. (Published essay: 'Why I stopped caring about which framework to use'.)",
    },
    {
      tool: "Azure DevOps CI/CD",
      reason:
        "What's worked for the .NET ecosystem teams I've shipped with. Deployment time at LexisNexis went from 2 hours to 1.2 hours after the pipeline overhaul.",
    },
    {
      tool: "Docker + Kubernetes when the topology earns them",
      reason:
        "When the deployment surface is genuinely heterogeneous. I've used both in production; I won't add the operational complexity if the system would be fine on a smaller surface.",
    },
  ],
  /* What I avoid — priors against defaulting to these, not bans on
     the tech. Each is a stance grounded in real production experience. */
  avoid: [
    {
      pattern: "Framework zealotry",
      reason:
        "I've used Angular, React, .NET, Node, NodeJS, Express, jQuery, Bootstrap — all in production. The framework debate is almost always the wrong conversation. (Published essay: 'Why I stopped caring about which framework to use'.)",
    },
    {
      pattern: "Microservices applied to single-team systems",
      reason:
        "Microservices solve people-problems first, technical problems second. If one team owns the whole domain, a well-structured monolith is usually the cleaner choice. The LexisNexis monolith-to-microservices move worked because there were six teams.",
    },
    {
      pattern: "ORM-only for complex dynamic queries",
      reason:
        "Stored procedures over ORM when the query patterns are complex enough that they land cleaner in SQL — optimizable in one place, debuggable from the database side. (LexisNexis decision callout.)",
    },
    {
      pattern: "Test-coverage percentages as the goal",
      reason:
        "95% coverage at Motorola was the right bar for public safety; the discipline was that the uncovered 5% had to be deliberately scoped and reviewed. Coverage is a proxy. Untested paths in the wrong place matter more than the headline.",
    },
  ],
};

/* ===== Credentials =====
   Sources: both resumes' Certifications section. Not in experience.ts.
   These are methodology credentials, surfaced for readers who screen by
   them. */
export const credentials = {
  certifications: [
    {
      name: "Microsoft Azure AZ-900",
      issuer: "Microsoft",
      kind: "Cloud fundamentals",
    },
    {
      name: "Professional Scrum Master",
      issuer: "Scrum.org",
      kind: "Methodology",
    },
  ],
  education: [
    {
      degree: "Master of Science in Information Systems",
      institution: "Northeastern University",
      location: "Boston, USA",
      dates: "Sep 2021 — Apr 2023",
    },
    {
      degree: "Bachelor of Engineering in Information Technology",
      institution: "Mumbai University",
      location: "Mumbai, India",
      dates: "Sep 2010 — Jun 2013",
    },
  ],
  /* Awards + LOR added 2026-06-06 — were buried in TCS chapter only.
     Surface here at Credentials level so the formal-credibility scan-zone
     includes both academic + recognition signals. Sources:
       - 3 TCS awards: experience.ts:241-245 (TCS chapter awards array)
       - LOR: experience.ts:235-240 (TCS chapter testimonial — already
              rendered in Endorsement at page-top; surface here too as
              a formal credential). */
  awards: [
    /* Letter of Recommendation leads the column — it's the strongest
       recognition (external, from the Dow client tool owner), so it
       outranks the internal TCS awards below it. */
    {
      name: "Letter of Recommendation",
      issuer: "The Dow Chemical Company",
      context: "Jacky S. Aikin, OPD Tool Owner · 2021",
    },
    {
      name: "Star of the Month (×2)",
      issuer: "Tata Consultancy Services",
      context: "Recognized twice during Dow OPD tenure",
    },
    {
      name: "Service & Commitment Award",
      issuer: "Tata Consultancy Services",
    },
    {
      name: "Contextual Master Award",
      issuer: "Tata Consultancy Services",
    },
  ],
};

/* ===== Onboarding for the next engineer =====
   Sources:
     1. FrontMatter prose: "The engineers I help think more clearly about
        systems — that's the work that compounds."
     2. Career narratives' mentorship details (code reviews, knowledge
        transfer, teaching 190 students at Northeastern, mentoring
        engineers across teams on architecture patterns)
     3. dow-lor.pdf — this is the key source. The LOR LITERALLY documents
        that Jinal did this:
          • "Jinal always did a good job of taking the time to teach
             during troubleshooting"
          • "outstanding efforts to help with transitioning the
             development and support of the application to a third party"
          • "She held them accountable to provide the same level of
             support she has been giving us"
     4. The portfolio's whole thesis ("build systems the next engineer
        can own"). This section literalizes the thesis — speaking
        directly to the reader as the next engineer.
   The LOR is the strongest external validation of this section's
   premise. Worth surfacing nearby. */
export const onboardingForNextEngineer = `If you're inheriting any of the systems above, here's what I'd tell you over coffee.

Start by reading the schema. Every system I worked on had a data model that explained more than the code did. If you understand the entities, the constraints, and the relationships, the rest of the code becomes annotations on top of a structure that already made sense.

Don't refactor for elegance in your first month. The system you're inheriting got to where it is for reasons that aren't all written down. Sit with it long enough to know which parts are load-bearing before you start moving walls.

Make the next engineer the lens. Every decision you make — schema, naming, architecture, where a service boundary lands — is a message to whoever inherits this from you. If the message is hard to read, the work that compounds gets harder for everyone after you.

Teach during the troubleshooting, not after. When something breaks and you're tracing it with someone less senior, the teaching IS the work — not a separate activity. Jacky at Dow specifically called this out in the recommendation letter that closes this README; he wasn't praising a side-effort, he was praising the way the work itself transmits.

If you can't reach me through the channels in the Maintainer section, the comments in the code and the commit history are the second-best source. I tried to leave them honest.

— Jinal`;

/* ===== Letter of Recommendation — full text =====
   Source: dow-lor.pdf, Jacky S. Aikin, OPD Tool Owner, The Dow Chemical
   Company, July 20, 2021. The chapter currently surfaces a single quoted
   line ("Jinal proved herself..."); the full letter is much richer and
   directly validates the portfolio's whole thesis. Reproducing the full
   letter as an inserted artifact (akin to the book version's
   ArtifactDocument) lets the reader see the full original source.
   The text below is verbatim except where I've reflowed for in-component
   rendering. EDIT IF NEEDED FOR PUBLICATION. */
export const dowLetterOfRecommendation = {
  author: "Jacky S. Aikin",
  authorTitle: "OPD Tool Owner",
  authorEmail: "Jaikin@Dow.com",
  authorOrganization: "The Dow Chemical Company",
  date: "July 20, 2021",
  greeting: "To whom it may concern,",
  body: [
    "I am writing this letter of recommendation for Jinal Mamaniya as she has been a contracted software developer supporting The Dow Chemical Company for the past four years. Jinal has been instrumental in developing and supporting our enterprise Operations Dashboard (OPD) application. OPD is a large, complex application that is used by more than 17,000 people in 650 plants and facilities in Dow globally. It has been translated into 13 languages and handles tens of thousands of transactions seven days per week.",
    "During her time supporting OPD, Jinal's duties included defect analysis, troubleshooting and writing code changes for the application. Jinal also grew into her role of supervising the support team from her company that was aligned to OPD tool support. She has become very effective at coordinating her team and making sure that her team members lived up to her expectations and standards.",
    "I can testify that while at Dow, Jinal proved herself to be very dependable and a very hard worker. Not only during normal hours but also during off hours. Jinal truly took partnership of this tool along with us. She not only provided support when requested but she would also recommend improvements that have helped build the sustainability of the tool. When troubleshooting defects, Jinal always did a good job of taking the time to teach during troubleshooting. Our team is comprised of people of different skill levels, so teaching is always important as it brings the knowledge level of our team members to a higher level.",
    "Last but not least, a special mention is justified for Jinal's outstanding efforts to help with transitioning the development and support of the application to a third party: It is not easy to hand over responsibility to others for an application that you spent years developing and supporting, but Jinal has been very forthcoming and went out of her way to accommodate the incoming support team during the entire knowledge transfer and transition period. She held them accountable to provide the same level of support she has been giving us over the past years.",
    "We are sad to see her leave. But I am happy to recommend Jinal for any position as a lead developer or team lead for a software development team.",
  ],
  signoff: "Sincerely,",
  signature: "Jacky S. Aikin",
  signatureTitle: "OPD Tool Owner, The Dow Chemical Company",
};
