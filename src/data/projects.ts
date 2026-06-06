export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectSection {
  slug: string;
  number: string;
  name: string;
  description: string;
  /** Primary hero image for this section — shown at top of detail page */
  heroImage?: SectionImage;
  /** Additional supporting images shown in the detail page */
  galleryImages?: SectionImage[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  liveUrl: string;
  caseStudyUrl?: string;
  /** Confident, story-form essay describing the project. Each paragraph is one beat. */
  essay: string[];
  /** The single most distinctive contribution — surfaced visually. */
  signatureInsight: {
    label: string;
    body: string;
  };
  /** Hero image shown on the Projects homepage section. */
  heroImage?: SectionImage;
  /** The 7 UX sections of the live product, in app order. */
  sections: ProjectSection[];
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "bts-music-evolution",
    title: "BTS Music Evolution",
    tagline:
      "A data-viz platform built end-to-end \u2014 six interconnected views, harmonic synthesis, d3-force layouts.",
    liveUrl: "https://bts-evolution.netlify.app/",
    /* Essay reordered so engineering brief leads, personal motivation closes.
       The strict-reviewer concern was that the prior open ("In March 2025 I
       discovered BTS through Carpool Karaoke...") was personal-anecdote-first,
       which pattern-matched hiring managers to "data viz about a boy band"
       before they reached the technical substance. Same content, beats
       reordered: platform brief \u2192 architectural decisions \u2192 motivation. */
    essay: [
      "A data-visualization platform: six interconnected views, built solo end-to-end. A living discography timeline; sonic fingerprints generated through harmonic synthesis math; emotional mapping on Russell's Circumplex Model; a decade of live tours visualized with d3-force layouts and auto-lane assignment; cultural footprint measured via a standardized 8-day Wikipedia impact methodology; and a personal bookend.",
      "Each view stands alone but talks to every other \u2014 bidirectional state sync between timeline and grid, scientifically standardized 3-angle impact comparison (album / band / genre), 120-point harmonic radius modulated by 5 audio features, d3-force marker collision on the regional map. React 19, Vite, TypeScript, D3.",
      "The project exists because of music I love. In March 2025 I discovered BTS through Carpool Karaoke and recognized a pattern other engineers might miss: a decade of compound dedication produces measurable signals. Patterns you can prove with data.",
      "Built with the same discipline I bring to enterprise systems.",
    ],
    signatureInsight: {
      label: "The signature contribution",
      body: "The 3-angle impact view. When an album drops, the world doesn\u2019t just look up the album \u2014 they look up the band, the genre, and the label. The platform measures all three, using scientifically standardized 8-day before/after Wikipedia comparisons. The pattern holds across every release of a 13-year career.",
    },
    heroImage: {
      src: "/images/projects/bts/01_bts-discography.png",
      alt: "BTS Music Evolution \u2014 Discography timeline",
      caption: "Discography \u2014 every album positioned by date and emotional mood",
    },
    sections: [
      {
        slug: "overview",
        number: "01",
        name: "Overview",
        description:
          "The landing experience \u2014 introducing the platform's five differentiators and the data-driven thesis behind it.",
      },
      {
        slug: "discography",
        number: "02",
        name: "Discography",
        description:
          "A living timeline of every album, positioned by release date and average emotional mood. Curved connection lines, animated cascades, bidirectional state sync between timeline and grid.",
        heroImage: {
          src: "/images/projects/bts/01_bts-discography.png",
          alt: "Discography timeline showing every BTS album",
          caption: "Living timeline \u2014 every album positioned by date and emotional mood",
        },
        galleryImages: [
          {
            src: "/images/projects/bts/02_album-details.png",
            alt: "Album details panel with full track list",
            caption: "Album detail panel \u2014 cover, tracklist, breathing radar of song features",
          },
        ],
      },
      {
        slug: "sound-signature",
        number: "03",
        name: "Sound Signature",
        description:
          "Each album's sonic fingerprint, drawn through harmonic synthesis math \u2014 120 points around a circle, radius modulated by 5 audio features. Two albums never look the same.",
        heroImage: {
          src: "/images/projects/bts/03_sound-signature.png",
          alt: "Sound Signature harmonic blob visualization",
          caption: "Sound Signature \u2014 sin/cos harmonics modulated by 5 audio features",
        },
      },
      {
        slug: "emotional-map",
        number: "04",
        name: "Emotional Map",
        description:
          "Russell's Circumplex Model translated into a visual quadrant scatter. Every song positioned by valence and energy \u2014 Joyful, Intense, Peaceful, Melancholic.",
        heroImage: {
          src: "/images/projects/bts/04_emotional-map.png",
          alt: "Emotional Map quadrant scatter plot of songs",
          caption: "Russell's Circumplex Model translated into a visual quadrant scatter",
        },
      },
      {
        slug: "concert-evolution",
        number: "05",
        name: "Concert Evolution",
        description:
          "A decade of live tours \u2014 Gantt timeline with auto-lane assignment, song-journey heatmap revealing tour patterns invisible elsewhere, regional dual-map with d3-force collision detection.",
        heroImage: {
          src: "/images/projects/bts/05_concert-evolution-tour-timeline.png",
          alt: "Tour timeline Gantt chart of all BTS world tours",
          caption: "Tour timeline \u2014 every world tour, auto-lane assignment for overlaps",
        },
        galleryImages: [
          {
            src: "/images/projects/bts/05_concert-evolution-tour-metrics.png",
            alt: "Tour metrics dashboard with growth arc and head-to-head comparison",
            caption: "Tour metrics \u2014 growth arc, head-to-head comparison, country \u00d7 tour matrix",
          },
          {
            src: "/images/projects/bts/05_a_ce-tour-details-song-frequency.png",
            alt: "Song frequency chart with stage-position color coding",
            caption: "Song frequency \u2014 ranked by play count, color-coded by opener / main / closer",
          },
          {
            src: "/images/projects/bts/05_b_ce-tour-details-song-journey.png",
            alt: "Song journey heatmap showing setlist evolution across concerts",
            caption: "Song journey heatmap \u2014 reveals tour patterns invisible elsewhere",
          },
          {
            src: "/images/projects/bts/05_c_ce-tour-details-regional-map.png",
            alt: "Regional dual-map showing tour path across world and detail regions",
            caption: "Regional dual-map \u2014 d3-force marker collision, direction arrows at each leg",
          },
        ],
      },
      {
        slug: "global-reach",
        number: "06",
        name: "Global Reach",
        description:
          "Cultural footprint measured \u2014 the 3-angle Wikipedia impact methodology, multi-language comparison across 10 editions, and historic UN speeches as 4-act story flows.",
        heroImage: {
          src: "/images/projects/bts/06_global-reach-release-impact.png",
          alt: "Release Impact panel with 3-angle Wikipedia analysis",
          caption: "Release Impact \u2014 the 3-angle methodology for measuring cultural spike",
        },
        galleryImages: [
          {
            src: "/images/projects/bts/06_global-reach-un-speeches.png",
            alt: "UN Speeches story cards with impact analysis",
            caption: "UN Speeches \u2014 three historic moments as 4-act story flows",
          },
        ],
      },
      {
        slug: "my-story",
        number: "07",
        name: "My Story",
        description:
          "The personal bookend. A parallel timeline maps BTS's 2013 debut alongside my 2013 engineering start \u2014 two arcs running in parallel, converging in 2025.",
      },
    ],
    tags: [
      "React 19",
      "Vite",
      "D3",
      "TypeScript",
      "Netlify",
      "MusicBrainz",
      "Wikipedia API",
      "YouTube API",
      "Setlist.fm",
    ],
  },
];
