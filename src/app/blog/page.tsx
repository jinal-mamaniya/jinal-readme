import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ESSAY_DIMENSION } from "@/components/sections/Notes";

/**
 * Notes index — the landing page for `/blog`.
 *
 * Why this route exists: `src/app/blog/` previously contained only
 * `[slug]/page.tsx`, so `/blog` itself had no route and returned 404 —
 * while that exact URL is printed on the resume and in the site footer.
 * A visitor following the printed link hit a dead end.
 *
 * Register matches the rest of the document rather than inventing a
 * blog-template look: mono file-path header, display title, numbered
 * markers recolored to each essay's Stack Atlas dimension (same mapping
 * the home-page Notes section uses — imported, not duplicated, so the
 * two views can never drift), cobalt reserved for links.
 *
 * Server component; no client JS added. Post data comes from the same
 * getAllPosts() used by Notes.tsx and generateStaticParams().
 */

export const metadata = {
  title: "Notes — Jinal Mamaniya",
  description:
    "Engineering essays on architecture, database performance, and mentorship.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main id="main-content" className="min-h-screen px-6 sm:px-10 py-16">
      <div className="mx-auto max-w-[64rem]">
        {/* File path + back link — mirrors the essay page header. */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-10">
          <p
            className="font-mono-label"
            style={{ color: "var(--color-cool-meta)" }}
          >
            jinal-mamaniya / Notes /
          </p>
          <Link
            href="/#notes"
            className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            /* WCAG 2.1 SC 2.5.8 — 24x24 minimum target size. */
            style={{
              color: "var(--color-accent)",
              minHeight: "24px",
              padding: "4px 0",
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span>back to README</span>
          </Link>
        </div>

        <h1
          className="mb-5"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "var(--color-foreground)",
            maxWidth: "24ch",
          }}
        >
          Notes
        </h1>

        <p
          className="mb-14"
          style={{
            color: "var(--color-text-dim)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            maxWidth: "58ch",
          }}
        >
          Essays on the parts of engineering that outlast the stack —
          architecture, the real cost of a slow query, and what mentoring
          actually is.
        </p>

        {posts.length === 0 ? (
          <p
            className="font-mono-meta"
            style={{ color: "var(--color-text-dim)" }}
          >
            No notes published yet.
          </p>
        ) : (
          <ol className="list-none m-0 p-0">
            {posts.map((post, i) => {
              const dateLabel = post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "";
              const marker =
                ESSAY_DIMENSION[post.slug] ?? "var(--color-accent)";

              return (
                <li
                  key={post.slug}
                  className="py-8 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex gap-5 sm:gap-8">
                    {/* Numbered marker — recolored to the essay's atlas
                        dimension so the index scans the same way the
                        home-page Notes section does. */}
                    <span
                      aria-hidden="true"
                      className="font-mono-label shrink-0 pt-1"
                      style={{ color: marker }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <h2
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                          fontWeight: 700,
                          letterSpacing: "-0.015em",
                          lineHeight: 1.15,
                          maxWidth: "28ch",
                        }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm hover:text-accent"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <div
                        className="flex items-baseline gap-3 flex-wrap font-mono-meta mt-3"
                        style={{
                          color: "var(--color-text-dim)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {dateLabel && <span>{dateLabel}</span>}
                        {dateLabel && (
                          <span
                            aria-hidden="true"
                            style={{ color: "var(--color-border)" }}
                          >
                            —
                          </span>
                        )}
                        <span>{post.readingTime}</span>
                      </div>

                      {post.excerpt && (
                        <p
                          className="mt-4"
                          style={{
                            color: "var(--color-text-dim)",
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            maxWidth: "62ch",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}

                      {post.tags?.length > 0 && (
                        <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-4 list-none m-0 p-0">
                          {post.tags.map((tag) => (
                            <li
                              key={tag}
                              className="font-mono-meta"
                              style={{
                                color: "var(--color-cool-meta)",
                                fontSize: "0.8125rem",
                              }}
                            >
                              #{tag}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="group inline-flex items-center gap-1.5 font-mono-label mt-5 transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                        style={{
                          color: "var(--color-accent)",
                          minHeight: "24px",
                          padding: "4px 0",
                        }}
                      >
                        <span>Read full essay</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </main>
  );
}
