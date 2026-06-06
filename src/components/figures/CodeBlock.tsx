import { codeToHtml } from "shiki";

/**
 * CodeBlock — server-rendered syntax-highlighted code via Shiki.
 *
 * Replaces the plain-text `<pre><code>` rendering in chapter code samples
 * (C#, SQL, etc.). Tokens are resolved using VS Code's TextMate grammars
 * — same accuracy as VS Code itself, not the heuristic token guessing of
 * highlight.js. Vercel docs, Next.js docs, Astro docs, and Anthropic docs
 * all use this exact pipeline.
 *
 * Dual-theme strategy:
 *   Shiki emits `--shiki-light` and `--shiki-dark` CSS variables on every
 *   token span. globals.css picks one based on `[data-theme="dark"]`. No
 *   client JS, no FOUC, no double-render — the theme swap is pure CSS.
 *
 * Why server component (async):
 *   Shiki's WASM grammars are large; loading them in the browser would
 *   ship megabytes of JS just to color code. Server-rendering pre-resolves
 *   every token at build/request time; the client receives plain HTML.
 *
 * Theme choice (github-light + github-dark):
 *   GitHub's themes are the engineering-doc default. Cobalt-family keyword
 *   colors map cleanly to the portfolio's `--color-accent` register. If a
 *   custom palette is ever wanted, Shiki accepts inline theme JSON.
 */
interface CodeBlockProps {
  language: string;
  code: string;
}

export async function CodeBlock({ language, code }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    /* defaultColor: false → Shiki emits both CSS variables on every span
     * without applying either as the inline default. globals.css decides
     * which variable wins based on data-theme attribute. */
    defaultColor: false,
  });

  /* dangerouslySetInnerHTML is safe here — `code` is server-controlled
   * static data from `codePatterns.ts`, never user input. Shiki's output
   * is a single <pre class="shiki"> with span tokens, no scripts. */
  return (
    <div
      className="shiki-host"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
