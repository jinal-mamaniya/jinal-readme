export const siteConfig = {
  name: "Jinal Mamaniya",
  title: "Senior Software Engineer",
  /* Publication metadata — the site is "Look Inside" for a real published
     first edition. Strategy move 2026-05-30: register an ISBN via the US
     ISBN Agency, set up KDP listing for the hardcover, ship the same chapter
     content from web → print via the Pandoc pipeline in scripts/build-book.
     Until ISBN registration completes, every field below shows the honest
     pending state (CLAUDE.md rule #15: no fake data, surface gaps).
     See PUBLISHING.md for the workflow. */
  book: {
    /* Working title — sourced from the Career section through-line
       (Career.tsx). Subject to final ratification before ISBN registration. */
    title: "Build Systems the Next Engineer Can Own",
    subtitle: "A Decade in Software, Across Legal-tech, Public-safety, and Enterprise",
    author: "Jinal Mamaniya",
    edition: "First edition",
    year: "2026",
    publisher: "Self-published",
    /* ISBN: pending registration with US ISBN Agency.
       Block of 10 ISBNs ≈ $295 (2026), single ISBN ≈ $125.
       Once registered, replace null with the assigned 979-8-####### format. */
    isbn: null as string | null,
    /* KDP listing URL — pending Amazon KDP setup. Until then, this is null
       and the "Order the hardcover" CTA renders as a "coming soon" state
       rather than a broken link. */
    orderUrl: null as string | null,
    /* Format(s) — hardcover at launch, paperback + ebook to follow.
       Pricing TBD by KDP listing. */
    formats: ["Hardcover"] as const,
  },
  /* Cover content — Phase 4 step 2 / SPEC.md §10 / CHAPTERS.md Cover.
     Title + subtitle traced verbatim to LinkedIn About; byline phrasing
     traced to LinkedIn headline lanes. */
  cover: {
    /* Non-breaking spaces ( ) around the em-dash glue "about — and" as
       a single typographic unit so the dash never orphans at end of a wrapped
       line. The visible characters are identical to the LinkedIn-About source
       — only the inter-word spacing differs (a typesetting choice, not a copy
       edit). Editorial-grade convention: em-dashes are flanked, never leading
       or trailing a line. */
    title:
      "Most of the software I've built, people never think about — and that's the point.",
    subtitle:
      "Legal platforms that just work when a lawyer needs an answer at midnight. Public safety systems that hold up when it actually matters. Enterprise tools that thousands of people open every morning without wondering what's underneath.",
    byline: "10 years across legal-tech, public-safety, enterprise",
  },
  description:
    "A decade of building across legal tech, public safety, and enterprise — from Mumbai to Raleigh.",
  domains: ["Legal tech", "Public safety", "Enterprise"],
  /* Email split into parts to defeat simple HTML-scraping bots.
     Reassembled client-side via <ObfuscatedEmail />. The full address
     never appears in the server-rendered HTML. */
  emailUser: "mamaniya.jinals",
  emailDomain: "gmail.com",
  /* socialLinks: only non-email channels live in plain links.
     Email is intentionally excluded to keep it out of static HTML. */
  socialLinks: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/jinal-mamaniya" },
  ],
  navItems: [
    { label: "About", href: "#about" },
    { label: "Career", href: "#career" },
    { label: "Projects", href: "#projects" },
    { label: "Writing", href: "#writing" },
    { label: "Connect", href: "#connect" },
  ],
} as const;
