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

import { type AtlasDimension } from "@/components/ui/DimensionalDot";

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
 * A "view" is one of the six experiences inside the live BTS platform
 * (three of which share a live album selection). Each renders as a
 * cinematic spread on the detail page: large
 * screenshot with numbered annotation overlays + engineering paragraph + live
 * deep-link + narrative thread to the next view.
 */
export interface ProjectView {
  slug: string;
  number: string;
  name: string;
  /** Eyebrow above the view — the question this view answers. */
  whatItAnswers: string;
  /**
   * Short evocative one-liner for the home Showcase six-lens preview index.
   * Brand-voice (HYBE/Spotify/Netflix register), not the detail-page question.
   * Every line traced to a direct code read — see the per-view source notes.
   */
  previewLine: string;
  /** The engineering paragraph. Verified against code reads. */
  body: string;
  /** Hash appended to liveUrl for direct deep-link (e.g. "#standard"). */
  liveHash: string;
  /**
   * Atlas craft dimension this view exercises — renders a gated
   * DimensionalDot on the view-spread eyebrow, same as every chapter
   * section (rule #6 / #31). GATED: set only when the dimension is
   * genuinely true. Omitted on My Story — that's the human "why," not a
   * craft view, so it carries no craft marker.
   */
  dimension?: AtlasDimension;
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
  /**
   * Short scan-zone tagline used by the home Showcase teaser. Keeps the
   * project's signature line at a tight, scannable length.
   */
  tagline: string;
  /**
   * Thesis-shaped headline used as the detail page H1. Names the BIG
   * IDEA rather than repeating the project title — the title already
   * lives in the breadcrumb + metadata. Set this on Plate-tier case
   * studies where the hero block should assert the engineering thesis
   * in the scan zone.
   */
  detailHeadline?: string;
  /**
   * Expanded tagline used as the detail page pull-quote — earns the
   * room the detail surface gives it (defines load-bearing phrases,
   * asserts solo build, signals engineering rigor). The Showcase
   * teaser keeps the shorter `tagline` for scan rhythm.
   */
  detailTagline?: string;
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
    /* Thesis-as-headline for the detail page H1. Names the BIG IDEA
       (most music analytics lie quietly — this one doesn't) rather
       than repeating the project title. Authored 2026-06-14 in the
       Round-A strict-review pass, replacing an earlier H1 that just
       rendered `title` ("BTS Evolution") — the project name still
       lives in the breadcrumb + metadata, freeing the H1 slot to
       carry engineering posture in the scan zone. */
    detailHeadline: "Most music analytics lie quietly.",
    /* Expanded tagline for the detail page pull-quote. Defines
       "queryable history" inline (thirteen-year career → query),
       asserts the solo build, signals engineering rigor with
       "verified end-to-end". The Showcase teaser keeps the shorter
       tagline above — that surface earns its rhythm with scan
       brevity. */
    detailTagline:
      "A solo-built artist-intelligence platform that doesn’t lie — engineering a thirteen-year career as queryable history, verified end-to-end.",
    liveUrl: BTS_LIVE,
    liveUrlDisplay: "bts-evolution.netlify.app",

    /* Showcase teaser — the standout hook. Reworked 2026-06-16 after a
       direct re-study of the bts-evolution codebase: the earlier lede led
       with the data-integrity plumbing (frozen cache / Wikipedia
       versioning), which sells the foundation, not the product. The real
       story is DISCOVERY — six lenses you can interrogate down to the
       song.
       ARCHITECTURE (reworked 2026-06-16): the lede is now a TIGHT LOGLINE,
       not a four-question paragraph. The six lenses moved into a dedicated
       interactive preview index (<LensPreview>, driven by the `views`
       array's `previewLine` + `image`) that renders beneath the lede in
       Showcase.tsx. Rationale: the brands this teaser emulates
       (HYBE/Spotify/Netflix) reach "premium" through compression + STRUCTURE,
       never a swelling paragraph — so the richness gets a structure that can
       hold it (one evocative line + a live screenshot per lens) instead of
       being crammed into prose. Logline voice: staccato bookend
       ("One artist. Thirteen years. ..." ↔ "Six lenses. One discography.
       Nothing invented, nothing hidden."). "Nothing invented, nothing
       hidden" is exact, not a flourish: no fabricated features, and
       clip-estimate values are FLAGGED via the `source` field, never buried
       (spotifyFeatures.ts:10-13). Eight eras verified (eras.ts); 437 songs ×
       seven features (spotifyFeatures.ts, types/data.ts). */
    teaserLede:
      "One artist. Thirteen years. Eight eras. 437 songs, each broken down to its sonic DNA. Read six ways. One discography. Nothing invented, nothing hidden.",

    /* Detail page essay — three beats, DISCOVERY-FIRST. Reworked
       2026-06-16 after re-reading the bts-evolution codebase directly
       (not via an agent — an agent study had fabricated a "13 tours"
       count). The earlier essay led with the data-integrity plumbing;
       the real story is the six-lens, song-level discovery surface,
       with the integrity engineering as the trustworthy foundation
       (P3), not the headline.
       P1: WHAT it is — six lenses, song-level audio DNA; three share a
           live selection (verified: only standard/signature/emotional in
           MainPage.tsx, not all six).
       P2: HOW each lens works — the analytical depth (Discography river +
           the four analytical lenses).
       P3: WHY it's trustworthy — the spine.
       P4: WHY THIS — the personal arc (the sixth lens, My Story). Added
           2026-06-17 to complete the "six" honestly (essay detailed five)
           and give it an emotional landing. Verified: BTS debuted Seoul
           June 2013, Jinal started engineering Mumbai July 2013 — one month
           apart (CreatorContent.tsx:25-26). Closer "brief is mine to
           choose" moved here from P3.
       Also corrects a STALE claim: the old P3 said "120-point harmonic
       shape modulated by five audio features" — that described an old
       SoundSignature implementation that no longer exists (verified
       absent 2026-06-16: no "120"/"breathing"/"five" in
       SoundSignature.tsx). Current code is a cardinal-spline curve
       through SIX traits. Every figure traces to a file read directly:
       437 songs + 7 features (spotifyFeatures.ts, data.ts), honest
       album-vs-song overlay (SoundSignature.tsx:18-22), 4 mood quadrants
       (EmotionalMapping.tsx), setlist-position frequency
       (SongJourneyMap.tsx), 3-angle 8-day impact (data.ts:48-56,
       ReleaseImpactGrouped.tsx:275). */
    detailEssay: [
      "BTS Evolution reads a thirteen-year discography six different ways. Every one of ++437 songs++ carries a seven-dimension audio fingerprint — energy, valence, danceability, and four more. Albums become coordinates in mood space and organic harmonic signatures; tours decompose into the songs that defined them; releases get measured for their global footprint. The six views aren't separate dashboards — they're lenses on one dataset. Three of them share a live selection: pick an album in Discography, Sound Signature, or Emotional Map and its sound, mood, and tracklist all turn to face it, the timeline staying mounted across the switch.",
      "Discography lays the whole decade out as one continuous river of album covers, auto-panning across thirteen years on demand, every release tagged to its era. Sound Signature draws each album as a smooth curve through its six audio traits, then overlays a single song on top — same mapping for both, so where the song bulges past the album, that trait genuinely dominates the track. Emotional Map plots every album by valence and energy into four mood quadrants. Concert Evolution tracks not just which songs were played but **where in the setlist they landed** — the openers, the closers, the staples that survived every tour. Global Reach measures each release's Wikipedia impact across three separate angles — the artist, the genre, the label — over an eight-day window before and after, because a single blended number hides which audience actually moved.",
      "None of this holds if the numbers can't be trusted — and music data rarely is, straight from the source: release dates drift, Wikipedia renamed both the band and the label mid-history, audio features get faked. So the spine underneath is **built to refuse that**. A frozen cache pins every number. Wikipedia article-name versioning sends historical queries to the era-correct page. Audio features are cross-validated against an independent dataset and flagged when a value is only a thirty-second-clip estimate. Six confirmed lenses over one spine that labels its own uncertainty.",
      "And the sixth lens isn't about the music at all — it's about why this exists. BTS debuted in Seoul in June 2013; I started shipping production software in Mumbai a month later. My Story runs those two timelines side by side — two arcs that began a continent apart and compounded for a decade before either was worth pointing at. The discipline is the same one I bring to any enterprise platform: traceability, validation, the refusal to fabricate. Here it's just turned on something I love. **This is what the engineering looks like when the brief is mine to choose.**",
    ],

    /* Four stats as a SCALING STORY, read left to right — a decade →
       hundreds of songs → measured deep → reconciled across sources.
       The arc ends on TRUST, the strongest senior signal, not on a
       product count. Slot 4 was "6 / Ways to read it" until 2026-06-16:
       dropped because it merely echoed the lede (which already says
       "read six ways" and "Six lenses on one verified discography"), and
       a soft verb-phrase label sat oddly beside three hard quantities.
       Replaced with the dataset's independent-source count — the one big
       number the strip didn't already state. Those facts also live in
       detailEssay ¶3 + the decision cards, with full context. Every
       figure verified directly:
         13  — 2013→2026 discography span
         437 — songs with audio features (spotifyFeatures.ts)
         7   — audio dimensions per song (SongFeatures, data.ts)
         4   — independent dataset sources: UCLA, Olivia, ReccoBeats,
               Huggingface (decision card "Verified dataset over
               fabricated features"); cross-validation + clip-estimate
               flagging detailed in detailEssay ¶3 */
    stats: [
      { value: "13", label: "Years, one discography" },
      { value: "437", label: "Songs fingerprinted" },
      { value: "7", label: "Audio dimensions each" },
      { value: "4", label: "Independent sources" },
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
        title: "Verified dataset over fabricated features",
        body: "Early prototypes generated audio features from album metadata — a small story dressed as data. The project froze, the audio analysis came out, and the rebuild used only a 437-song dataset stitched from UCLA, Olivia, ReccoBeats, and Huggingface sources — with clip-estimated values flagged so the curve never claims more certainty than it has. Better to ship six confirmed views than seven with one lying.",
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
        previewLine:
          "A decade of releases, flowing past as one river of covers.",
        dimension: "data",
        body: "A chapter-aware dossier per album, sitting inside a horizontal Cover River that auto-pans the decade on demand. The layout reshapes between two and three columns depending on whether a track is selected; the pacing sparkline is computed from per-track tempo arcs; chapter taglines render only for albums in the curated spine. The River has a one-time drift hint gated by sessionStorage and prefers-reduced-motion.",
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
        previewLine: "What makes a track sound like itself.",
        dimension: "data",
        body: "Each album is drawn as a smooth organic curve — a cardinal-closed spline through six points, one per audio trait (energy, valence, danceability, acousticness, instrumentalness, speechiness). A high radius floor keeps even a zero-value trait a rounded lobe, so the shape always reads as an identity rather than collapsing to a pinch. Three modes — album, song, comparison: overlay a single track on its album and, because both use the same mapping, where the song bulges past the album that trait genuinely dominates. Album averages exclude tracks with no audio data, so a few feature-less interludes never drag the signature toward zero.",
        liveHash: "#signature",
        image: {
          src: "/images/projects/bts/03_sound-signature.png",
          alt: "Sound Signature — harmonic shape modulated by audio features",
          caption: "Sound Signature — a smooth curve through six audio traits per album",
        },
        annotations: [
          { marker: "1", label: "Cardinal spline through six audio-trait points" },
          { marker: "2", label: "Same mapping for album + song — honest overlay" },
          { marker: "3", label: "Album / song / comparison modes" },
        ],
        whatItLeavesOpen:
          "The shape tells you how it sounds. But how does it feel?",
      },
      {
        slug: "emotional-map",
        number: "03",
        name: "Emotional Map",
        whatItAnswers: "Where do these songs cluster on the emotion graph?",
        previewLine:
          "Where an era lives — between joy and melancholy, calm and chaos.",
        dimension: "data",
        body: "Russell’s Circumplex Model rendered as a quadrant scatter. Every track positioned by valence (sad → happy) and energy (calm → intense), distributed across four named quadrants: Joyful, Intense, Peaceful, Melancholic. The same 437-song dataset behind Sound Signature, here read as feeling instead of sound.",
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
        previewLine:
          "Which songs survived every tour: the openers, the closers, the ones that never left the stage.",
        dimension: "runtime",
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
        previewLine:
          "How far each release traveled — across the band, the genre, the label.",
        dimension: "discipline",
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
        previewLine:
          "A developer who started building in 2013 — the year the band started singing.",
        body: "Two arcs run in parallel on the timeline view. BTS debuted in 2013. I started shipping production systems at LTI in Mumbai the same year. A decade later both bodies of work compounded into something pointable-at. Traceability, validation, the refusal to fabricate — same engineering discipline whether the brief is an enterprise platform or a thirteen-year career rendered as queryable history. This is what the engineering looks like when the brief is mine.",
        liveHash: "#creator",
        image: {
          src: "/images/projects/bts/my-story.png",
          alt: "My Story — two parallel arcs, BTS and the engineer, both starting in 2013",
          caption: "My Story — the personal arc that runs parallel to the data",
        },
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
        /* Frontend group — each entry verified imported in the BTS
           Evolution source tree before listing here.
           Three.js + Tone.js removed 2026-06-14 in the Round-D strict-
           review pass: both were installed in package.json (three
           ^0.175, tone ^15) but had ZERO `from "three"` / `from "tone"`
           imports anywhere under bts-evolution/src. Listing them as
           load-bearing case-study stack was rule #15 fabrication-
           adjacent — installed-but-unused deps don't earn the slot.
           Remaining five are all import-verified: D3 in 3+ chart
           components, Framer Motion in TourDetailPanel, the rest
           foundational. */
        label: "Frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite 6",
          "D3 v7",
          "Framer Motion 12",
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
