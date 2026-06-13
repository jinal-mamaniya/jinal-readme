export const siteConfig = {
  name: "Jinal Mamaniya",
  title: "Senior Software Engineer",
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
} as const;
