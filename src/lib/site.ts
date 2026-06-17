/**
 * SITE_URL — the single canonical absolute base for og:image, og:url,
 * canonical links, and JSON-LD structured data. One source so every surface
 * agrees and nothing points at a host that isn't serving the build.
 *
 * Resolves to a domain that ACTUALLY responds, so social scrapers (LinkedIn,
 * X) never hang resolving a dead host:
 *   - VERCEL_PROJECT_PRODUCTION_URL — the custom domain once one is attached
 *     to the Vercel project, otherwise the project's *.vercel.app.
 *   - falls back to the intended brand domain for local dev.
 *
 * Auto-upgrades to jinalmamaniya.com the day it's attached in Vercel — no
 * code change needed.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jinalmamaniya.com";
