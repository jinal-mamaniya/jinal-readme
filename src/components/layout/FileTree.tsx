"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * FileTree — sticky left sidebar (xl+) + mobile drawer (< xl).
 *
 * Desktop ≥1280px: pinned left sidebar, always visible, scroll-spy active.
 * Mobile / tablet < 1280px: floating menu button bottom-right, opens
 * full-height drawer from the right with the same tree. Tap a file → close
 * drawer + scroll to anchor.
 *
 * SPEC §13 mandates mobile verified at 375 / 768 / 1280 / 1920. Without
 * the mobile drawer, mobile readers had zero navigation — a critical
 * usability failure flagged in the connector audit.
 */

interface TreeNode {
  href: string;
  name: string;
  depth: number;
  isDir?: boolean;
}

const TREE: TreeNode[] = [
  { href: "#about", name: "About.md", depth: 0 },
  { href: "#readme", name: "README.md", depth: 0 },
  { href: "#systems", name: "Systems/", depth: 0, isDir: true },
  { href: "#systems-lexisnexis", name: "lexisnexis.md", depth: 1 },
  { href: "#systems-motorola", name: "motorola.md", depth: 1 },
  { href: "#systems-tcs", name: "tcs.md", depth: 1 },
  { href: "#systems-lti", name: "lti.md", depth: 1 },
  { href: "#showcase", name: "Showcase/", depth: 0, isDir: true },
  { href: "#showcase-bts", name: "bts-evolution.md", depth: 1 },
  { href: "#teaching", name: "Teaching/", depth: 0, isDir: true },
  { href: "#teaching-northeastern", name: "northeastern.md", depth: 1 },
  { href: "#notes", name: "Notes/", depth: 0, isDir: true },
  { href: "#notes-frameworks", name: "01-frameworks.md", depth: 1 },
  { href: "#notes-slow-query", name: "02-slow-query.md", depth: 1 },
  { href: "#notes-mentoring", name: "03-mentoring.md", depth: 1 },
  { href: "#glossary", name: "Index.md", depth: 0 },
  { href: "#maintainer", name: "Maintainer.md", depth: 0 },
];

export function FileTree() {
  const [activeHref, setActiveHref] = useState("#about");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  /* Scroll-spy via IntersectionObserver. */
  useEffect(() => {
    const sectionIds = TREE.map((t) => t.href.replace(/^#/, ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Close drawer on Escape (mobile only). */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  /* Lock body scroll while drawer is open (mobile). */
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const handleAnchorClick = () => {
    setDrawerOpen(false);
  };

  /* ===== Render helpers ===== */
  const renderTreeItems = (compact = false) => (
    <ol className="space-y-0.5">
      {TREE.map((node) => {
        const isActive = activeHref === node.href;
        const indent =
          node.depth === 0 ? "pl-3" : node.depth === 1 ? "pl-7" : "pl-10";
        return (
          <li key={node.href}>
            <a
              href={node.href}
              onClick={handleAnchorClick}
              aria-current={isActive ? "location" : undefined}
              /* py-1.5 (6px each side) + 13px font = 25px row height.
                 Satisfies WCAG 2.1 SC 2.5.8 (24x24 target minimum).
                 Reference: https://www.w3.org/TR/WCAG21/#target-size-minimum
                 Desktop used to be py-0.5 (17px row, failed); now matches
                 mobile compact mode in padding. */
              className={`font-mono-path block ${indent} py-1.5 rounded-sm transition-colors duration-150 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`}
              style={{
                color: isActive
                  ? "var(--color-accent)"
                  : node.isDir
                    ? "var(--color-cool-meta)"
                    : "var(--color-text-dim)",
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                {node.depth > 0 && (
                  <span
                    aria-hidden="true"
                    className="opacity-50"
                    style={{ color: "var(--color-text-dim)" }}
                  >
                    └
                  </span>
                )}
                {node.isDir && (
                  <span aria-hidden="true" className="opacity-70">
                    ▾
                  </span>
                )}
                <span
                  className={
                    isActive
                      ? "border-b"
                      : "border-b border-transparent"
                  }
                  style={
                    isActive
                      ? { borderColor: "var(--color-accent)" }
                      : undefined
                  }
                >
                  {node.name}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  const treeHeader = (
    <p
      className="font-mono-label mb-3 flex items-center gap-2"
      style={{ color: "var(--color-cool-meta)" }}
    >
      <span aria-hidden="true">▾</span>
      <span>jinal-mamaniya/</span>
    </p>
  );

  /* Footer replaced 2026-05-30: was the decorative "main · clean" line
     that mimicked `git status` output without any function. Now hosts
     the ThemeToggle — functional engineering UI element (real localStorage
     persistence, real prefers-color-scheme detection) that holds the same
     mono-label register the rest of the tree uses. Two wins in one
     change: removes one piece of decorative cosplay, adds the dark-mode
     toggle the research mandated. */
  const treeFooter = <ThemeToggle />;

  return (
    <>
      {/* === DESKTOP sidebar (xl+) === */}
      <nav
        aria-label="File tree"
        className="hidden xl:block fixed left-6 top-12 z-40 w-[15rem] max-h-[calc(100vh-6rem)] overflow-y-auto pointer-events-auto"
      >
        {treeHeader}
        {renderTreeItems()}
        {treeFooter}
      </nav>

      {/* === MOBILE floating menu button (< xl). Bottom-right corner so
          it doesn't conflict with thumb-reach typical drawer position
          patterns on either thumb. Two-toned design matching the About
          page badges for visual consistency. === */}
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setDrawerOpen((v) => !v)}
        aria-label={drawerOpen ? "Close file tree" : "Open file tree"}
        aria-expanded={drawerOpen}
        aria-controls="filetree-drawer"
        className="xl:hidden fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-[3px] transition-all duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 shadow-lg"
        style={{
          border: "1px solid var(--color-foreground)",
        }}
      >
        <span
          className="px-3 py-2 font-mono-label"
          style={{
            background: "var(--color-foreground)",
            color: "var(--color-background)",
            letterSpacing: "0.08em",
          }}
        >
          {drawerOpen ? "close" : "menu"}
        </span>
        <span
          className="px-3 py-2 font-mono-meta whitespace-nowrap"
          style={{
            background: "var(--color-background)",
            color: "var(--color-accent)",
            fontWeight: 600,
            fontSize: "12px",
          }}
        >
          jinal-mamaniya/
        </span>
      </button>

      {/* === MOBILE drawer (< xl). Slides in from right; backdrop dims
          the content. Tap backdrop or any file link to close. === */}
      {drawerOpen && (
        <div
          id="filetree-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="File tree navigation"
          className="xl:hidden fixed inset-0 z-40"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close file tree"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 motion-safe:transition-opacity motion-safe:duration-300"
            style={{
              background: "var(--color-overlay)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer panel */}
          <nav
            ref={drawerRef}
            aria-label="File tree"
            className="absolute right-0 top-0 bottom-0 w-[20rem] max-w-[85vw] px-6 pt-8 pb-24 overflow-y-auto"
            style={{
              background: "var(--color-background)",
              borderLeft: "1px solid var(--color-border)",
              boxShadow:
                "-8px 0 32px -8px color-mix(in oklch, var(--color-foreground), transparent 80%)",
            }}
          >
            {treeHeader}
            {renderTreeItems(true)}
            {treeFooter}
          </nav>
        </div>
      )}
    </>
  );
}
