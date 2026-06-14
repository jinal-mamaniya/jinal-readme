/**
 * Project data — the BTS Evolution case study.
 *
 * Two consumers:
 *   • Showcase.tsx (home /#showcase)            — teaser shape: title /
 *     tagline / heroImage / teaserLede / stats / signatureInsight / tags /
 *     "Read the case study →" CTA → /projects/bts-evolution
 *   • app/projects/bts-evolution/page.tsx (detail) — full shape: detailEssay
 *     / decisions / views / rulesArtifact + everything the teaser uses
 *
 * Every engineering claim in `views[].body`, `decisions[].body`,
 * `signatureInsight.body`, and `rulesArtifact.rules[]` traces to a verified
 * read of the BTS codebase at D:\ramapir\bts-evolution. No invention.
 * Live URL: https://bts-evolution.netlify.app
 */

export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
}

/** A single numbered callout pointing at something in a view's screenshot. */
export interface ProjectAnnotation {
  marker: string;
  label: string;
}

/**
 * A "view" is one of the six interconnected experiences inside the live BTS
 * platform. Each renders as a cinematic spread on the detail page: large
 * screenshot with numbered annotation overlays + engineering paragraph + live
 * deep-link + narrative thread to the next view.
 */
export interface ProjectView {
  slug: string;
  number: string;
  name: string;
  /** Eyebrow above the view — the question this view answers. */
  whatItAnswers: string;
  /** The engineering paragraph. Verified against code reads. */
  body: string;
  /** Hash appended to liveUrl for direct deep-link (e.g. "#standard"). */
  liveHash: string;
  image?: SectionImage;
  /** Numbered callouts overlaid on the screenshot. */
  annotations?: ProjectAnnotation[];
  /**
   * Closer line that threads to the next view. null on the last view.
   * Creates narrative continuity across the six spreads.
   */
  whatItLeavesOpen: string | null;
}

/** Marginalia callout — an engineering decision in the engineer's own voice. */
export interface ProjectDecision {
  title: string;
  body: string;
}

/** One number in the three-number stats strip. */
export interface ProjectStat {
  value: string;
  label: string;
  /** Accessible reading of `value` when it contains separators (→, ·) that
   *  screen readers won't pronounce naturally. Set on stats whose visible
   *  text is "444 → 6" or "BTS · HYBE" style. Optional. */
  ariaValue?: string;
}

/** A single rule surfaced from the project's CLAUDE.md as a found artifact. */
export interface ProjectRule {
  number: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  liveUrl: string;
  /** Hostname for display in the live-site chip (no scheme, no path). */
  liveUrlDisplay: string;

  /** One paragraph for the home Showcase — the WHY-frame lede. */
  teaserLede: string;

  /** Three paragraphs for the detail page — why · how · what. */
  detailEssay: string[];

  /** Three hard numbers shown as a strip on both Showcase and detail page. */
  stats: ProjectStat[];

  /** Four engineering decisions, rendered as marginalia on the detail page. */
  decisions: ProjectDecision[];

  /** Six cinematic view-spreads. */
  views: ProjectView[];

  /** The signature contribution — full version lives on detail page. */
  signatureInsight: {
    label: string;
    body: string;
  };

  /** The project's own CLAUDE.md surfaced as a closing found-document. */
  rulesArtifact: {
    title: string;
    rules: ProjectRule[];
    footer: string;
  };

  /** Hero image used on both Showcase and detail page. */
  heroImage: SectionImage;

  /**
   * Tech stack grouped by role. Rendered inline-mono on both surfaces:
   * label column + slash-separated items column. Replaces the prior flat
   * `tags: string[]` chip grid — the chip grid read as a generic
   * capability checklist rather than a curated, story-aware stack.
   */
  techStack: Array<{ label: string; items: string[] }>;
}

const BTS_LIVE = "https://bts-evolution.netlify.app";

export const projects: Project[] = [
  {
    slug: "bts-evolution",
    title: "BTS Evolution",
    tagline: "Engineering a discography as queryable history.",
    liveUrl: BTS_LIVE,
    liveUrlDisplay: "bts-evolution.netlify.app",

    /* Showcase teaser — single paragraph. Frames the WHY without crowding the
       hero. The full essay lives on the detail page. */
    teaserLede:
      "Six interconnected views over one verified data spine. The platform reads thirteen years of releases, tours, and global attention as queryable history — built with the same discipline I bring to enterprise systems.",

    /* Detail page essay — three beats.
       P1: spark + thesis. Hooks the reader with the personal moment,
       pivots HARD to the engineering complaint (most music analytics
       lie quietly), states the case-study thesis. The BIG IDEA across
       the whole artifact lives here: historical integrity in music
       data, where most analytics quietly fail.
       P2: how it works (data spine + cache + Wikipedia versioning).
       P3: what it does (each view's engineering substance).
       Replaces an earlier P1 that contained three fabricated specifics
       ("three world tours across twenty-five countries, two billion
       BANGTANTV views") and a P2 that contained a fabricated count
       ("Fourteen validation scripts"). All fabrications removed
       2026-06-14 per the Tier 1 strict-review pass; every numeric or
       categorical specific now traces to a verified read of
       D:\\ramapir\\bts-evolution. */
    detailEssay: [
      "It started with a Carpool Karaoke clip in March 2025 — but the case study isn't about that. It's about what I noticed within weeks: most music analytics platforms lie quietly. Release dates drift. Wikipedia article names change mid-history. Third-party APIs serve stale data dressed as fresh. This is the case study of building one that doesn't.",
      "Six interconnected views read from one verified data spine. Curated MusicBrainz release-group IDs (because upstream release dates are wrong often enough to matter — LOVE YOURSELF ‘Her’ would land in the WINGS era if you trusted the source). A frozen-cache pattern that drops 444 third-party API calls to six per refresh. Validation scripts that cross-check audio features against ReccoBeats, Wikipedia article names against history, tour data against setlist.fm, song titles against MusicBrainz. Wikipedia article-name versioning that knows BTS_(band) was renamed to BTS in March 2020 and Big_Hit_Entertainment to Hybe_Corporation a year later — so historical impact queries hit the era-correct page. The data discipline is the work.",
      "Sound Signature renders each album as a 120-point harmonic shape modulated by five audio features, verified against a 189-song UCLA-curated dataset that itself was independently validated against ReccoBeats. Emotional Map plots tracks in Russell’s Circumplex. Concert Evolution maps the actual setlist progression of every tour from 2014 forward. Global Reach measures release-day attention across three angles — the artist, the genre, the label — because conflating them is how analytics lies.",
    ],

    /* Three stats, three NON-OVERLAPPING engineering stories.
       Position 1 — architecture (frozen cache).
       Position 2 — historical integrity, set as the twist (names, not
                    a number — Wikipedia renamed BTS_(band) → BTS in
                    March 2020 and Big_Hit_Entertainment → Hybe_
                    Corporation a year later; this slot calls out the
                    two real renames the pipeline catches).
       Position 3 — data integrity (independent cross-validation).
       The earlier strip had "6 interconnected views" and "14
       validation scripts" — the count of views is already prose
       (paragraph 2 of detailEssay) and "14" was fabricated. Both
       removed 2026-06-14 per the Tier 1 strict-review pass.
       ariaValue is set on the two values containing separators
       (→ and ·) so screen readers say "from 444 to 6" and "BTS and
       HYBE" instead of pronouncing the glyphs.  */
    stats: [
      {
        value: "444 → 6",
        ariaValue: "from 444 to 6",
        label: "API calls per refresh",
      },
      {
        value: "BTS · HYBE",
        ariaValue: "BTS and HYBE",
        label: "Wikipedia article renames tracked",
      },
      {
        value: "189",
        label: "Songs cross-validated against ReccoBeats",
      },
    ],

    /* Engineering decisions — marginalia on the detail page. Engineer's
       annotation on her own work, not editor-pulled. */
    decisions: [
      {
        title: "Frozen cache over live API",
        body: "Read paths never hit MusicBrainz, Setlist.fm, Wikipedia, or YouTube. A scheduled refresh writes one canonical JSON blob to Netlify Blobs; every visitor reads from edge. Eliminates rate-limit risk, lets the UI animate at 60fps, and means a viral spike doesn’t break the data layer.",
      },
      {
        title: "Curated spine over algorithmic discovery",
        body: "Seventeen chapter-defining albums hardcoded by MusicBrainz release-group ID. Which records define each era is editorial — not detectable from chart position. The era boundaries and the eight chapter taglines were researched against tier-1 press and verified against sources before they landed in code.",
      },
      {
        title: "Wikipedia article-name versioning",
        body: "Wikipedia renamed BTS_(band) → BTS in March 2020 and Big_Hit_Entertainment → Hybe_Corporation a year later. A naive impact query against today’s article would miss the day the rename happened — the analytics version of asking “what was traffic before this domain existed?” The pipeline pulls the era-correct article name for every release date in the 8-day impact window.",
      },
      {
        title: "189-song UCLA dataset over fabricated features",
        body: "Early prototypes generated audio features from album metadata — a small story dressed as data. The project froze, the audio analysis came out, and the rebuild used only a 189-song UCLA-curated dataset, independently verified against ReccoBeats. Better to ship six confirmed views than seven with one lying.",
      },
    ],

    /* The six views — each its own cinematic spread on the detail page.
       Order matches the live app's navigation order. */
    views: [
      {
        slug: "discography",
        number: "01",
        name: "Discography",
        whatItAnswers: "How do you read a decade of releases as a single arc?",
        body: "A chapter-aware dossier per album, sitting inside a horizontal Cover River that auto-pans the decade on demand. The layout reshapes between two and three columns depending on whether a track is selected; the pacing sparkline is computed from per-track tempo arcs; chapter taglines render only for albums in the curated spine. The River uses the View Transitions API for cover morphs and has a one-time drift hint gated by sessionStorage + prefers-reduced-motion.",
        liveHash: "#standard",
        image: {
          src: "/images/projects/bts/01_bts-discography.png",
          alt: "BTS Discography view — chapter-aware album timeline",
          caption: "Discography — every album positioned by date and emotional mood",
        },
        annotations: [
          { marker: "1", label: "Cover River with Play-the-decade auto-pan" },
          { marker: "2", label: "Chapter taglines only for spine albums" },
          { marker: "3", label: "Era-themed color band beneath the river" },
        ],
        whatItLeavesOpen:
          "Each release has a date, a position, a chapter. But what does each one sound like?",
      },
      {
        slug: "sound-signature",
        number: "02",
        name: "Sound Signature",
        whatItAnswers:
          "How does each album sound different from every other one?",
        body: "Each album is rendered as a 120-point harmonic shape: radius is modulated by sin and cos of five audio features (energy, valence, acousticness, speechiness, danceability). Higher-energy albums literally breathe faster — the animation cycle is computed as Math.max(1.5, 4 − energy × 3) seconds. Three view modes: album, song, comparison. Album art clips to a 14-pixel circle at center with a colored-circle fallback if the image fails. Audio data comes from a 189-song UCLA dataset, never generated.",
        liveHash: "#signature",
        image: {
          src: "/images/projects/bts/03_sound-signature.png",
          alt: "Sound Signature — harmonic shape modulated by audio features",
          caption: "Sound Signature — sin·cos harmonics modulated by 5 audio features",
        },
        annotations: [
          { marker: "1", label: "120 harmonic points around the circle" },
          { marker: "2", label: "Album art at 14px center, 0.7 opacity" },
          { marker: "3", label: "Breath cycle tied to energy value" },
        ],
        whatItLeavesOpen:
          "The shape tells you how it sounds. But how does it feel?",
      },
      {
        slug: "emotional-map",
        number: "03",
        name: "Emotional Map",
        whatItAnswers: "Where do these songs cluster on the emotion graph?",
        body: "Russell’s Circumplex Model rendered as a quadrant scatter. Every track positioned by valence (sad → happy) and energy (calm → intense), distributed across four named quadrants: Joyful, Intense, Peaceful, Melancholic. Selecting an album triggers a 70-second auto-cycle through its tracks; selecting a single song surfaces its lyrics excerpt. Same 189-song dataset — the same audio truth shown a different way.",
        liveHash: "#emotional",
        image: {
          src: "/images/projects/bts/04_emotional-map.png",
          alt: "Emotional Map — valence × energy quadrant scatter",
          caption: "Russell’s Circumplex translated into a visual quadrant scatter",
        },
        annotations: [
          { marker: "1", label: "Valence axis: sad → happy" },
          { marker: "2", label: "Energy axis: calm → intense" },
          { marker: "3", label: "Four quadrants: Joyful / Intense / Peaceful / Melancholic" },
        ],
        whatItLeavesOpen:
          "Studio output is one half of an artist. The other half happens on stage.",
      },
      {
        slug: "concert-evolution",
        number: "04",
        name: "Concert Evolution",
        whatItAnswers:
          "How do you visualize a decade of live tours without flattening the data?",
        body: "Three layers. The Tour Timeline is a Gantt chart with auto-lane assignment — ten lanes maximum, era-themed colors per tour — so overlapping arcs don’t crush each other. The Regional dual-map uses d3-force collision (radius padded by three pixels, sixty simulation ticks) so dense venue clusters don’t overlap. The Tour Growth Dashboard generates head-to-head narrative dynamically: “Map of the Soul Tour was 2.5× the scale of Wings Tour — 87 vs 35 concerts. 18 songs survived both setlists.” Real numbers, prose generated, no fixed copy.",
        liveHash: "#concert",
        image: {
          src: "/images/projects/bts/05_concert-evolution-tour-timeline.png",
          alt: "Concert Evolution — era-themed Gantt timeline of every tour",
          caption: "Tour timeline — every world tour, auto-lane assignment for overlaps",
        },
        annotations: [
          { marker: "1", label: "Auto-lane assignment for overlapping tours" },
          { marker: "2", label: "Era-themed color per tour" },
          { marker: "3", label: "Continuous coverage 2014 → 2026" },
        ],
        whatItLeavesOpen:
          "Where they played is one signal. Who looked them up afterward is another.",
      },
      {
        slug: "global-reach",
        number: "05",
        name: "Global Reach",
        whatItAnswers:
          "How do you measure cultural footprint without conflating signal sources?",
        body: "Every release impact is measured against three Wikipedia article queries in parallel — the artist (BTS), the genre (K-pop), the label (HYBE / Big Hit Entertainment) — with standardized 8-day before/after windows. Article-name versioning handles the rename history: BTS_(band) → BTS in March 2020, Big_Hit_Entertainment → Hybe_Corporation a year later, so historical queries always hit the era-correct page. Ten language editions tracked in parallel (German, French, Japanese, Korean, etc.) with per-language article names verified against each Wikipedia edition.",
        liveHash: "#global",
        image: {
          src: "/images/projects/bts/06_global-reach-release-impact.png",
          alt: "Global Reach — the three-angle Wikipedia impact methodology",
          caption: "Release Impact — the 3-angle methodology for measuring cultural spike",
        },
        annotations: [
          { marker: "1", label: "BTS / K-pop / HYBE — three angles, one release" },
          { marker: "2", label: "8-day before/after window per query" },
          { marker: "3", label: "Era-correct Wikipedia article per release date" },
        ],
        whatItLeavesOpen:
          "Every data point belongs to one of seven people on a thirteen-year arc. Why this artist, and why this much engineering?",
      },
      {
        slug: "my-story",
        number: "06",
        name: "My Story",
        whatItAnswers: "Why this artist, and why this much engineering?",
        body: "Two arcs run in parallel on the timeline view. BTS debuted in 2013. I started shipping production systems at LTI in Mumbai the same year. A decade later both bodies of work compounded into something pointable-at. The discipline I bring to enterprise systems — traceability, validation, refusal to fabricate — is the same discipline that turns a thirteen-year career into queryable history. This is what the engineering looks like when the brief is mine.",
        liveHash: "#creator",
        whatItLeavesOpen: null,
      },
    ],

    /* The signature contribution — the single most defensible engineering
       judgment moment. Full version lives on detail page. */
    signatureInsight: {
      label: "The signature contribution",
      body: "When an album drops, three things spike: the artist, the genre, and the label. Most analytics tools count one and call it impact. Global Reach measures all three — against the era-correct Wikipedia page for each, with an 8-day before/after window standardized across every release back to 2013. The pattern holds. It’s the kind of methodological discipline you only catch by reading thirteen years of revision history.",
    },

    /* The project's own CLAUDE.md — surfaced as a found document at the
       foot of the detail page. Selected rules verified verbatim from
       D:\\ramapir\\bts-evolution\\CLAUDE.md. */
    rulesArtifact: {
      /* Header in present tense — the rules are LIVING (still in the
         project's CLAUDE.md, still applied). "Hold myself to" signals
         active enforcement, not authorship.
         Footer is opinion-forward: the case study's most unguarded
         direct-to-reader moment, used to assert the THESIS that solo
         work benefits from a written rules contract — a position most
         engineers don't bother to take. Provocative on purpose; the
         claim is defensible (most solo engineers don't write CLAUDE.md
         for themselves).
         Earlier footer said "authored before the build" — git history
         contradicts this (src/ first commit 2025-04-24, CLAUDE.md first
         commit 2026-03-21 — rules came ~11 months INTO the build).
         Fabricated timeline removed 2026-06-14 per the Tier 1
         strict-review pass. */
      title: "RULES I HOLD MYSELF TO",
      rules: [
        {
          number: "17",
          body: "Trace both producers AND consumers of any variable used in a fix — verify every code path that writes to it, not just every code path that reads from it.",
        },
        {
          number: "18",
          body: "Never claim confidence without proof. If you can’t prove it, say “I don’t know yet.”",
        },
        {
          number: "19",
          body: "Don’t speculate on causes — prove them. “Probably” and “likely” are not root causes.",
        },
      ],
      footer:
        "BTS Evolution / CLAUDE.md · 3 of 29 rules · the senior move most engineers skip.",
    },

    heroImage: {
      src: "/images/projects/bts/01_bts-discography.png",
      alt: "BTS Evolution — Discography timeline",
      caption: "Discography — every album positioned by date and emotional mood",
    },

    /* Tech stack — actual verified stack from package.json + code reads.
       Grouped by role: frontend (the rendering + animation surface),
       data (third-party APIs the refresh pipeline hits), infra (where
       the cache lives + how the read paths serve it). Inline-mono
       rendering on both surfaces — label column + slash-separated items
       — replaces the prior flat chip grid that read as a generic
       capability checklist. */
    techStack: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite 6",
          "D3 v7",
          "Framer Motion 12",
          "Three.js",
          "Tone.js",
        ],
      },
      {
        label: "Data",
        items: ["MusicBrainz API", "Setlist.fm API", "Wikipedia API"],
      },
      {
        label: "Infra",
        items: ["Netlify Functions", "Netlify Blobs"],
      },
    ],
  },
];
