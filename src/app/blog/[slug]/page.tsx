import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Jinal Mamaniya`,
    description: post.excerpt,
  };
}

/**
 * Full essay page — the destination for the Notes section's
 * "Read full essay →" link. README-genre register: file-path mono
 * header, display title, sans-serif body, cobalt accent for links.
 *
 * Style discipline matches the main page: system fonts, near-black on
 * cream surface, cobalt for accents, no `#` markdown-source decoration.
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dateLabel = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  /* Anchor slug for matching the home-page Notes/ entries. */
  const noteAnchor = slug
    .replace("why-i-stopped-caring-about-frameworks", "frameworks")
    .replace("the-real-cost-of-a-slow-query", "slow-query")
    .replace("mentoring-isnt-about-code-reviews", "mentoring");

  return (
    <main
      id="main-content"
      className="min-h-screen px-6 sm:px-10 py-16"
    >
      <article className="mx-auto max-w-[64rem]">
        {/* File path + back link */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-10">
          <p
            className="font-mono-label"
            style={{ color: "var(--color-cool-meta)" }}
          >
            jinal-mamaniya / Notes / {noteAnchor}.md
          </p>
          <Link
            href={`/#notes-${noteAnchor}`}
            className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            /* WCAG 2.1 SC 2.5.8 — 24x24 target size. */
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

        {/* Title */}
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
          {post.title}
        </h1>

        {/* Metadata row */}
        <div
          className="flex items-baseline gap-3 flex-wrap font-mono-meta mb-6"
          style={{
            color: "var(--color-text-dim)",
            fontSize: "0.875rem",
          }}
        >
          <span>{dateLabel}</span>
          <span aria-hidden="true" style={{ color: "var(--color-border)" }}>
            —
          </span>
          <span>{post.readingTime}</span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono-meta"
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.5rem",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Body — MDX rendered through next-mdx-remote with prose styling
            via inline CSS for h2/p/strong/code/a since the project doesn't
            use @tailwindcss/typography. Compact, readable, on-register. */}
        <div className="essay-body">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      /* Dual-theme syntax highlighting. rehype-pretty-code
                         emits color data per theme via CSS variables that
                         flip on [data-theme]. Hardcoded "github-light" was
                         a latent dark-mode bug — code blocks would render
                         light-theme tokens (light foreground colors) on a
                         dark page. Today the MDX essays have no code blocks
                         so the bug isn't visible — fixing preventively
                         before someone adds one. */
                      theme: {
                        light: "github-light",
                        dark: "github-dark",
                      },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {/* Bottom back-link */}
        <div
          className="mt-16 pt-8 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Link
            href={`/#notes-${noteAnchor}`}
            className="group inline-flex items-center gap-1.5 font-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            /* WCAG 2.1 SC 2.5.8 — 24x24 target size. */
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
      </article>

      {/* Essay body styling — applied via plain CSS targeting the
          .essay-body container so MDX-rendered h2/p/strong/code inherit
          the cobalt + sans + cream register without needing the Tailwind
          typography plugin. */}
      <style>{`
        .essay-body p {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.2vw, 1.125rem);
          line-height: 1.65;
          color: var(--color-text);
          margin-bottom: 1.25rem;
          max-width: 68ch;
        }
        .essay-body h2 {
          font-family: var(--font-sans);
          font-size: clamp(1.5rem, 2.2vw, 1.875rem);
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.2;
          color: var(--color-foreground);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .essay-body h3 {
          font-family: var(--font-sans);
          font-size: clamp(1.125rem, 1.6vw, 1.375rem);
          font-weight: 700;
          color: var(--color-foreground);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .essay-body strong {
          color: var(--color-foreground);
          font-weight: 700;
        }
        .essay-body em {
          color: var(--color-text);
        }
        .essay-body a {
          color: var(--color-accent);
          text-decoration: underline;
          text-decoration-color: color-mix(in oklch, var(--color-accent), transparent 70%);
          text-underline-offset: 2px;
        }
        .essay-body a:hover {
          text-decoration-color: var(--color-accent);
        }
        .essay-body code {
          font-family: var(--font-mono);
          font-size: 0.875em;
          background: var(--color-surface);
          padding: 0.1em 0.35em;
          border-radius: 2px;
        }
        .essay-body pre {
          background: var(--color-surface);
          padding: 1.25rem;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-size: 0.875rem;
          line-height: 1.55;
          max-width: 68ch;
        }
        .essay-body pre code {
          background: transparent;
          padding: 0;
        }
        .essay-body ul,
        .essay-body ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
          max-width: 68ch;
        }
        .essay-body li {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.2vw, 1.125rem);
          line-height: 1.65;
          color: var(--color-text);
          margin-bottom: 0.4rem;
        }
        .essay-body blockquote {
          border-left: 3px solid var(--color-accent);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--color-text-muted);
          font-size: clamp(1.0625rem, 1.3vw, 1.25rem);
          line-height: 1.5;
          max-width: 60ch;
        }
      `}</style>
    </main>
  );
}
