/**
 * DirectoryCloser — explicit "end of directory" marker between sections.
 *
 * Inserted between the LAST chapter of a directory and the next
 * directory's intro. Signals "previous directory AND all its children
 * are closed; the next thing is a new directory."
 *
 * Per engineering-doc / README register: rendered as a code-comment-style
 * mono italic line. Same family as the rest of the file-tree convention
 * (lowercase, regular weight, no decoration). Light visual touch — the
 * 160px breath into the next directory's intro does the heavy lifting;
 * this is the explicit textual confirmation.
 *
 * Example rendering:
 *   // end of Systems/ · 4 chapters
 */
interface DirectoryCloserProps {
  name: string;
  chapters?: number;
  unit?: string; // "chapter" (default), "essay", "page", etc.
}

export function DirectoryCloser({
  name,
  chapters,
  unit = "chapter",
}: DirectoryCloserProps) {
  const tally =
    chapters != null
      ? ` · ${chapters} ${unit}${chapters === 1 ? "" : "s"}`
      : "";
  return (
    <div
      className="px-6 sm:px-10 pt-12 pb-2 mx-auto max-w-screen-2xl"
      aria-hidden="true"
    >
      <p
        className="font-mono-path text-right"
        style={{
          color: "var(--color-text-dim)",
          fontStyle: "italic",
        }}
      >
        // end of {name}/{tally}
      </p>
    </div>
  );
}
